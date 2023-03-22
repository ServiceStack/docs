---
slug: api-key-authprovider
title: API Key Auth Provider
---

The API Key Auth Provider provides an alternative method for allowing external 3rd Parties access to 
your protected Services without needing to specify a password. API Keys is the preferred approach for 
many well-known public API providers used in system-to-system scenarios for several reasons:

 - **Simple** - It integrates easily with existing HTTP Auth functionality
 - **Independent from Password** - Limits exposure to the much more sensitive master user passwords that 
 should ideally never be stored in plain-text. Resetting User's Password or password reset strategies 
 wont invalidate existing systems configured to use API Keys
 - **Entropy** - API Keys are typically much more secure than most normal User Passwords. The configurable 
default has **24 bytes** of entropy (Guids have 16 bytes) generated from a secure random number generator 
that encodes to **32 chars** using URL-safe Base64 (Same as Stripe)
 - **Performance** - Thanks to their much greater entropy and independence from user-chosen passwords,
 API Keys are validated as fast as possible using a datastore Index. This is contrast to validating hashed 
 user passwords which as a goal require usage of slower and more computationally expensive algorithms to 
 try make brute force attacks infeasible

Like most ServiceStack providers the new API Key Auth Provider is simple to use, integrates seamlessly with
ServiceStack existing Auth model and includes Typed end-to-end client/server support. 

<iframe class="video-hd" src="https://www.youtube.com/embed/NTCUT7atoLo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

For familiarity and utility we've modeled our implementation around Stripe's API Key functionality whilst
sharing many of the benefits of ServiceStack's Auth Providers:

#### Simple and Integrated

To register `ApiKeyAuthProvider` add it to the `AuthFeature` list of Auth Providers:

```csharp
Plugins.Add(new AuthFeature(...,
    new IAuthProvider[] {
        new ApiKeyAuthProvider(AppSettings),
        new CredentialsAuthProvider(AppSettings),
        //...
    }
));
```

Or for Apps utilizing encapsulated [Modular Startup](/modular-startup) configuration blocks:

```csharp
[assembly: HostingStartup(typeof(MyApp.ConfigureAuth))]

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost => {
            appHost.Plugins.Add(new AuthFeature(() => new AuthUserSession(),
                new IAuthProvider[] {
                    new ApiKeyAuthProvider(appHost.AppSettings),
                    new CredentialsAuthProvider(appHost.AppSettings),
                    //...
                }));
        });
}
```

The `ApiKeyAuthProvider` works similarly to the other ServiceStack `IAuthWithRequest` providers where a 
successful API Key initializes the current `IRequest` with the user's Authenticated Session. It also adds the 
[ApiKey](https://github.com/ServiceStack/ServiceStack/blob/c4a8f9741e496793d949c09cecb84e84fca86686/src/ServiceStack/Auth/ApiKeyAuthProvider.cs#L31) POCO Model to the request which can be accessed with:

```csharp
ApiKey apiKey = req.GetApiKey();
```

The `ApiKey` can be later inspected throughout the [request pipeline](/order-of-operations) to determine which API Key, Type and Environment was used.

#### Interoperable

Using existing HTTP Functionality makes it simple and interoperable to use with any HTTP Client even command-line clients like curl where API Keys can be specified in the **Username** of HTTP Basic Auth:

:::sh
curl https://api.stripe.com/v1/charges -u yDOr26HsxyhpuRB3qbG07qfCmDhqutnA:
:::

Or as a HTTP Bearer Token in the **Authorization** HTTP Request Header:

:::sh
curl https://api.stripe.com/v1/charges -H "Authorization: Bearer yDOr26HsxyhpuRB3qbG07qfCmDhqutnA"
:::
 
Both of these methods are built into most HTTP Clients. Here are a few different ways which you can send them using ServiceStack's [.NET Service Clients](/csharp-client):

```csharp
var client = new JsonServiceClient(baseUrl) {
    Credentials = new NetworkCredential(apiKey, "")
};

var client = new JsonHttpClient(baseUrl) {
    BearerToken = apiKey
};
```

Or using the [HTTP Utils](/http-utils) extension methods:

```csharp
var response = baseUrl.CombineWith("/secured").GetStringFromUrl(
    requestFilter: req => req.AddBasicAuth(apiKey, ""));
    
var response = await "https://example.org/secured".GetJsonFromUrlAsync(
    requestFilter: req => req.AddBearerToken(apiKey));
```

#### Sending API Key in Request DTOs

Similar to the `IHasSessionId` interface Request DTOs can also implement `IHasBearerToken` to send Bearer Tokens, e.g:

```csharp
public class Secure : IHasBearerToken
{
    public string BearerToken { get; set; }
    public string Name { get; set; }
}

var response = client.Get(new Secure { BearerToken = apiKey, Name = "World" });
```

Alternatively you can set the `BearerToken` property on the Service Client once where it will automatically populate all Request DTOs 
that implement `IHasBearerToken`, e.g:

```csharp
client.BearerToken = jwtToken;

var response = client.Get(new Secure { Name = "World" });
```

#### Supported Auth Repositories

The necessary functionality to support API Keys has been implemented in the following supported Auth Repositories:

 - `OrmLiteAuthRepository` - Supporting [most major RDBMS](/ormlite/#ormlite-rdbms-providers)
 - `RedisAuthRepository` - Uses Redis back-end data store
 - `DynamoDbAuthRepository` - Uses AWS DynamoDB data store
 - `MongoDbAuthRepository` - Uses MongoDB data store
 - `InMemoryAuthRepository` - Uses InMemory Auth Repository

And requires no additional configuration as it just utilizes the existing registered `IAuthRepository`.

#### Multiple API Key Types and Environments

You can specify any number of different Key Types for use in multiple environments for each user. Keys are 
generated upon User Registration where it generates both a **live** and **test** key for the **secret** 
Key Type by default. To also create both a "secret" and "publishable" API Key, configure it with:

```csharp
Plugins.Add(new AuthFeature(...,
    new IAuthProvider[] {
        new ApiKeyAuthProvider(AppSettings) {
            KeyTypes = new[] { "secret", "publishable" },
        }
    }
));
```

If preferred, any of the API Key Provider options can instead be specified in 
[App Settings](/appsettings) following the `apikey.{PropertyName}` format, e.g:

```xml
<add key="apikey.KeyTypes" value="secret,publishable" />
```

### Cached API Key Sessions

You can reduce the number of I/O Requests and improve the performance of API Key Auth Provider Requests by 
specifying a `SessionCacheDuration` to temporarily store the Authenticated UserSession against the API Key
which will reduce subsequent API Key requests down to 1 DB call to fetch and validate the API Key + 1 Cache Hit 
to restore the User's Session which if you're using the default in-memory Cache will mean it only requires 1 I/O 
call for the DB request.

This can be enabled with:

```csharp
Plugins.Add(new AuthFeature(...,
    new IAuthProvider[] {
        new ApiKeyAuthProvider(AppSettings) {
            SessionCacheDuration = TimeSpan.FromMinutes(10),
        }
    }));
```

#### Multitenancy

Thanks to the ServiceStack's trivial support for enabling 
[Multitenancy](/multitenancy), the minimal configuration required to register and API Key Auth Provider that persists to a **LiveDb** SQL Server database and also allows Services called with an Test API Key to query the alternative **TestDb** database instead, is just:

```csharp
class AppHost : AppSelfHostBase
{
    public AppHost() : base("API Key Multitenancy Example", typeof(AppHost).Assembly) { }

    public override void Configure(Container container)
    {
        //Create and register an OrmLite DB Factory configured to use Live DB by default 
        var dbFactory = new OrmLiteConnectionFactory(
            AppSettings.GetString("LiveDb"), SqlServerDialect.Provider);

        container.Register<IDbConnectionFactory>(dbFactory);

        // Register a "TestDb" Named Connection 
        dbFactory.RegisterConnection("TestDb", 
            AppSettings.GetString("TestDb"), SqlServerDialect.Provider);

        //Tell ServiceStack you want to persist User Auth Info in SQL Server
        container.Register<IAuthRepository>(c => new OrmLiteAuthRepository(dbFactory));
        
        //Register the AuthFeature with the API Key Auth Provider 
        Plugins.Add(new AuthFeature(() => new AuthUserSession(),
            new IAuthProvider[] {
                new ApiKeyAuthProvider(AppSettings)
            });
    }
    
    public override IDbConnection GetDbConnection(IRequest req = null)
    {
        //If an API Test Key was used return DB connection to TestDb instead: 
        return req.GetApiKey()?.Environment == "test"
            ? TryResolve<IDbConnectionFactory>().OpenDbConnection("TestDb")
            : base.GetDbConnection(req);
    }
}
```

Now whenever a Test API Key was used to call an Authenticated Service, all `base.Db` Queries or AutoQuery Services will query **TestDb** instead.

### API Key Defaults

The API Key Auth Provider has several options to customize its behavior with all but delegate Filters being able to be specified in AppSettings as well:

```csharp
new ApiKeyAuthProvider 
{
    // Whether to only permit access via API Key from a secure connection. (default true)
    public bool RequireSecureConnection { get; set; }

    // Generate different keys for different environments. (default live,test)
    public string[] Environments { get; set; }

    // Different types of Keys each user can have. (default secret)
    public string[] KeyTypes { get; set; }

    // How much entropy should the generated keys have. (default 24)
    public int KeySizeBytes { get; set; }

    /// Whether to automatically expire keys. (default no expiry)
    public TimeSpan? ExpireKeysAfter { get; set; }

    // Automatically create ApiKey Table for Auth Repositories which need it. (true)
    public bool InitSchema { get; set; }

    // Change how API Key is generated
    public CreateApiKeyDelegate GenerateApiKey { get; set; }

    // Run custom filter after API Key is created
    public Action<ApiKey> CreateApiKeyFilter { get; set; }

    // Cache the User Session so it can be reused between subsequent API Key Requests
    public TimeSpan? SessionCacheDuration { get; set; }

    // Whether to allow API Keys in 'apikey' QueryString or FormData (e.g. `?apikey={APIKEY}`) 
    public bool AllowInHttpParams { get; set; }
}
```

### IManageApiKeys API

Should you need to, you can access API Keys from the Auth Repository directly through the following interface:

```csharp
public interface IManageApiKeys
{
    void InitApiKeySchema();

    bool ApiKeyExists(string apiKey);

    ApiKey GetApiKey(string apiKey);

    List<ApiKey> GetUserApiKeys(string userId);

    void StoreAll(IEnumerable<ApiKey> apiKeys);
}
```

::: info
This interface also defines what's required in order to implement API Keys support on a Custom AuthRepository
:::

For Auth Repositories which implement it, you can access the interface by resolving `IAuthRepository` from the IOC and casting it to the above interface, e.g:

```csharp
var apiRepo = (IManageApiKeys)HostContext.TryResolve<IAuthRepository>();
var apiKeys = apiRepo.GetUserApiKeys(session.UserAuthId);
```

### Built-in API Key Services

To give end-users access to their keys the API Key Auth Provider enables 2 Services: the `GetApiKeys` Service to return all valid User API Keys for the specified environment:

```csharp
//GET /apikeys/live
var response = client.Get(new GetApiKeys { Environment = "live" }); 
response.Results.PrintDump(); //User's "live" API Keys 
```

And the `RegenerateApiKeys` Service to invalidate all current API Keys and generate new ones for the specified environment:

```csharp
//POST /apikeys/regenerate/live
var response = client.Post(new RegenerateApiKeys { Environment = "live" }); 
response.Results.PrintDump(); //User's new "live" API Keys 
```

You can modify which built-in Services you want registered, or modify the custom routes to where you want them to be available by modifying the `ServiceRoutes` collection. E.g. you can prevent it from registering any Services by setting `ServiceRoutes` to an empty collection:

```csharp
new ApiKeyAuthProvider { ServiceRoutes = new Dictionary<Type, string[]>() }
```

## Generating API Keys for Existing Users

Whilst the API Key Auth Provider will automatically generate API Keys for new users, if you also want to add API Keys for existing users you'll need to use the `ApiKeyAuthProvider` to generate new keys for all users that don't have keys. 

Here's a script you can use when using an `OrmLiteAuthRepository` to generate API Keys for all users with missing API Keys on startup:

```csharp
public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost =>
        {
            appHost.Plugins.Add(new AuthFeature(() => new AuthUserSession(),
                new IAuthProvider[] {
                    new ApiKeyAuthProvider(appHost.AppSettings)
                }));
        }, afterAppHostInit: appHost => {
            var authProvider = (ApiKeyAuthProvider)
                AuthenticateService.GetAuthProvider(ApiKeyAuthProvider.Name);
            
            using var db = appHost.TryResolve<IDbConnectionFactory>().Open();
            var userWithKeysIds = db.Column<string>(db.From<ApiKey>()
                .SelectDistinct(x => x.UserAuthId)).Map(int.Parse);

            var userIdsMissingKeys = db.Column<string>(db.From<UserAuth>() // Use custom UserAuth if configured
                .Where(x => userWithKeysIds.Count == 0 || !userWithKeysIds.Contains(x.Id))
                .Select(x => x.Id));

            foreach (var userId in userIdsMissingKeys)
            {
                var apiKeys = authProvider.GenerateNewApiKeys(userId);
                authRepo.StoreAll(apiKeys);
            }
        });
}
```

:::info
If using another Auth Repository backend this script will need to be modified to fetch the userIds for all users missing API Keys
:::

### .NET Framework Example

Older platforms can register Startup initialization logic using the `HostContext.ConfigureAppHost()` singleton: 

```csharp
HostContext.ConfigureAppHost(afterAppHostInit:appHost => ...);
```

Or adding to `AfterInitCallbacks` in their `AppHost.Configure()`, e.g:

```csharp
public override void Configure(Container container)
{
    AfterInitCallbacks.Add(appHost => ...);
}
```

