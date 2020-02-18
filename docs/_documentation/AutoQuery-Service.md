---
slug: autoquery-service
title: AutoQuery Service Data Source
---

The next step after [MemorySource](/autoquery-memory) in querying for even richer result-sets, whether you want to add custom validation, access multiple dependencies, construct complex queries or other custom business logic, you can use a **Service Source** instead which lets you call a Service and use its Response as the dynamic Data Source that you can apply Auto Querying logic on.

`ServiceSource` is very similar to `MemorySource` however instead of passing in the in-memory collection 
you want to query directly, you'll need to pass a **Request DTO** of the Service you want called instead.
The response of the Service is then further queried just as if its results were passed into a MemorySource 
directly.

We'll illustrate with a few examples how to register and use ServiceSources, explore some of their capabilities 
and provide some examples of when you may want to use them below. 

### Register Data Sources

The `UserLogin` ServiceSouce shows you can just pass an empty Request DTO as-is to execute its Service. 
The `RockstarAlbum` and `GithubRepo` Service Sources are however leveraging the built-in
[Auto Mapping](/auto-mapping) to copy any matching 
properties from the AutoQuery Request DTO to the downstream `GetRockstarAlbums` and `GetGithubRepos` 
Request DTO's. Finally the responses for the `GithubRepo` Service is **cached for 5 minutes** so any 
subsequent matching requests end up querying the cached result set instead of re-executing the `GetGithubRepos` 
Service:

```csharp
Plugins.Add(new AutoQueryDataFeature { MaxLimit = 100 }
    .AddDataSource(ctx => ctx.ServiceSource<UserLogin>(new GetTodaysUserActivity())),
    .AddDataSource(ctx => ctx.ServiceSource<RockstarAlbum>(ctx.Dto.ConvertTo<GetRockstarAlbums>())),
    .AddDataSource(ctx => ctx.ServiceSource<GithubRepo>(ctx.Dto.ConvertTo<GetGithubRepos>(), 
        HostContext.Cache, TimeSpan.FromMinutes(5)));
);
```

The implementation of `GetTodaysUserActivity` Service uses an async OrmLite RDBMS call to get all User Logins 
within the last day, fetches the Live Activity data from Redis, then 
[merges the disconnected POCO result sets](https://github.com/ServiceStack/ServiceStack.OrmLite#merge-disconnected-poco-result-sets)
into the `UserLogin` POCO which it returns:

```csharp
[Route("/useractivity/today")]
public class QueryTodaysUserActivity : QueryData<UserLogin> {}

public async Task<List<UserLogin>> Any(GetTodaysUserActivity request)
{
    var logins = await Db.SelectAsync<UserLogin>(x => x.LastLogin >= DateTime.UtcNow.AddDays(-1));
    var activities = Redis.As<Activity>().GetAll();
    logins.Merge(activities);
    return logins;
}
```

### GetRockstarAlbums

The `GetRockstarAlbums` Service shows an example of a calling an existing ad hoc DB Service executing an 
arbitrary custom Query. It uses the Request DTO Auto-Mapping at the `ServiceSource` registration to 
first copy any matching properties from the initial `QueryRockstarAlbums` Request DTO to populate a new 
`GetRockstarAlbums` instance which is what's used to execute the Service with. 

In this way the `QueryRockstarAlbums` AutoQuery Service is essentially decorating the underlying 
`GetRockstarAlbums` Service giving it access to AutoQuery features where clients are able to apply 
further post-querying server logic to an existing Service implementation which now lets them filter, 
sort, select only a partial list of fields, include additional aggregate queries, etc.

```csharp
public class QueryRockstarAlbums : QueryData<RockstarAlbum> 
{
    public string Name { get; set; }
    public int[] IdBetween { get; set; }
}

public object Any(GetRockstarAlbums request)
{
    var q = Db.From<RockstarAlbum>();

    if (request.IdBetween != null)
        q.Where(x => x.Id >= request.IdBetween[0] && x.Id <= request.IdBetween[1]);

    if (request.Name != null)
        q.Where(x => x.Name == request.Name);

    return new GetRockstarAlbumsResponse { Results = Db.Select(q) };
}
```

One thing to notice is that ServiceSource still works whether the results are wrapped in a Response DTO 
instead of a naked `IEnumerable<RockstarAlbum>` collection. This is transparently supported as `ServiceSource` 
will use the first matching `IEnumerable<T>` property for Services that don't return a collection.

It should be noted that decorating an existing OrmLite Service is rarely necessary as in most cases you'll
be able to get by with just a simple AutoQuery RDBMS query as seen in the Service below which replaces 
the above 2 Services:

```csharp
public class QueryRockstarAlbums : QueryDb<RockstarAlbum> {}
```

### GetGithubRepos

The final `GetGithubRepos` ServiceSource example shows an example of a slightly more complex implementation
than a single 3rd Party API call where it adds custom validation logic and call different 3rd Party API 
Endpoints depending on user input:

```csharp
public class QueryGithubRepo : QueryData<GithubRepo> 
{
    public string User { get; set; }
    public string Organization { get; set; }
}

public object Get(GetGithubRepos request)
{
    if (request.User == null && request.Organization == null)
        throw new ArgumentNullException("User");

    var url = request.User != null
        ? $"https://api.github.com/users/{request.User}/repos"
        : $"https://api.github.com/orgs/{request.Organization}/repos";

    return url.GetJsonFromUrl(requestFilter:req => req.UserAgent = GetType().Name)
        .FromJson<List<GithubRepo>>();
}
```

A hidden feature ServiceSources are naturally able to take advantage of due to its behind-the-scenes usage 
of the new [Service Gateway](/service-gateway) is that the exact code above could still function if the
`QueryGithubRepo` AutoQuery Data Service and underlying `GetGithubRepos` Service were moved to different
hosts :)

### Custom AutoQuery Data Implementation

Just like you can 
[Create a Custom implementation](/autoquery#custom-autoquery-implementations)
in AutoQuery, you can do the same in AutoQuery Data by just defining an implementation for your AutoQuery 
Data Request DTO. But instead of `IAutoQueryDb` you'd reference the `IAutoQueryData` dependency to construct 
and execute your custom AutoQuery Data query.

When overriding the default implementation of an AutoQuery Data Service you also no longer need to register 
a Data Source as you can specify the Data Source in-line when calling `AutoQuery.CreateQuery()`.

For our custom AutoQuery Data implementation we'll look at creating a useful Service which reads the
daily CSV Request and Error Logs from the new [CsvRequestLogger](/request-logger#csv-request-logger) and queries it by 
wrapping the POCO `RequestLogEntry` results into a `MemoryDataSource`:

```csharp
[Route("/query/requestlogs")]
[Route("/query/requestlogs/{Date}")]
public class QueryRequestLogs : QueryData<RequestLogEntry>
{
    public DateTime? Date { get; set; }
    public bool ViewErrors { get; set; }
}

public class CustomAutoQueryDataServices : Service
{
    public IAutoQueryData AutoQuery { get; set; }

    public object Any(QueryRequestLogs query)
    {
        var date = query.Date.GetValueOrDefault(DateTime.UtcNow);
        var logSuffix = query.ViewErrors ? "-errors" : "";
        var csvLogsFile = VirtualFileSources.GetFile(
            "requestlogs/{0}-{1}/{0}-{1}-{2}{3}.csv".Fmt(
                date.Year.ToString("0000"),
                date.Month.ToString("00"),
                date.Day.ToString("00"),
                logSuffix));

        if (csvLogsFile == null)
            throw HttpError.NotFound("No logs found on " + date.ToShortDateString());

        var logs = csvLogsFile.ReadAllText().FromCsv<List<RequestLogEntry>>();

        var q = AutoQuery.CreateQuery(query, Request,
            db: new MemoryDataSource<RequestLogEntry>(logs, query, Request));

        return AutoQuery.Execute(query, q);
    }
}
```

This Service now lets you query the Request Logs of any given day, letting you filter, page and sort 
through the Request Logs of the day. While we're at it, let's also create multiple Custom AutoQuery 
Data implementations to act as canonical smart links for the above Service:

```csharp
[Route("/logs/today")]
public class TodayLogs : QueryData<RequestLogEntry> { }
[Route("/logs/today/errors")]
public class TodayErrorLogs : QueryData<RequestLogEntry> { }

[Route("/logs/yesterday")]
public class YesterdayLogs : QueryData<RequestLogEntry> { }
[Route("/logs/yesterday/errors")]
public class YesterdayErrorLogs : QueryData<RequestLogEntry> { }
```

The implementations of which just delegates to `QueryRequestLogs` with the selected Date and whether or 
not to show just the error logs:

```csharp
public object Any(TodayLogs request) =>
    Any(new QueryRequestLogs { Date = DateTime.UtcNow });

public object Any(TodayErrorLogs request) =>
    Any(new QueryRequestLogs { Date = DateTime.UtcNow, ViewErrors = true });

public object Any(YesterdayLogs request) =>
    Any(new QueryRequestLogs { Date = DateTime.UtcNow.AddDays(-1) });

public object Any(YesterdayErrorLogs request) =>
    Any(new QueryRequestLogs { Date = DateTime.UtcNow.AddDays(-1), ViewErrors = true });
```

### View Request Logs in [AutoQuery Viewer](https://github.com/ServiceStack/Admin)

And with no more effort we can jump back to `/ss_admin/` and use [AutoQuery Viewer's](https://github.com/ServiceStack/Admin) nice UI to quickly 
inspect Todays and Yesterdays Request and Error Logs :)

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/autoqueryviewer-csv-logs.png)
