---
slug: dump-utils
title: Dump Utils
---

ServiceStack.Text has extension methods which recursively dumps all the public properties of any type into a human readable **pretty formatted** string. The `Dump()` utils are invaluable when explanatory coding or creating tests as you can quickly see what's in an object without having to set breakpoints and navigate nested properties in VS.NET's Watch window.

#### Extension Methods

```csharp
string Dump<T>(this T instance);
string DumpTable<T>(this T instance);

void Print(this string text, params object[] args);
void PrintDump<T>(this T instance);
void PrintDumpTable<T>(this T instance);
```

The convenient `Print()`, `PrintDump()` and `PrintDumpTable()` extension just writes the output to the Console to provide a wrist-friendly API for a common use-case, e.g:

```
var response = client.Send(request);
response.PrintDump(); // Dumps contents to Console in human-friendly format

$"Top Technologies: {response.TopTechnologies.Dump()}".Print();
```

## Example Usage

After importing the **ServiceStack.Text** namespace you can view the values of all fields as seen in [the following example](https://github.com/ServiceStack/ServiceStack.Text/blob/master/tests/ServiceStack.Text.Tests/Utils/JsvFormatterTests.cs):

```csharp
var model = new TestModel();
model.PrintDump();
```

### Example Output

```csharp
{
    Int: 1,
    String: One,
    DateTime: 2010-04-11,
    Guid: c050437f6fcd46be9b2d0806a0860b3e,
    EmptyIntList: [],
    IntList:
    [
        1,
        2,
        3
    ],
    StringList:
    [
        one,
        two,
        three
    ],
    StringIntMap:
    {
        a: 1,
        b: 2,
        c: 3
    }
}
```

### Dump Table

Whilst to quickly visualize tabular data, e.g. returned from [OrmLite](https://github.com/ServiceStack/ServiceStack.OrmLite) or an API Response
you can use the `PrintDumpTable()` extension method to return the results formatted in an easy to read Markdown table, e.g:

```csharp
public class GithubRepo
{
    public string Name { get; set; }
    public string Language { get; set; }
    public int Watchers { get; set; }
    public int Forks { get; set; }
}

var orgRepos = "https://api.github.com/orgs/dotnet/repos"
    .GetJsonFromUrl(httpReq => httpReq.UserAgent = "ServiceStack")
    .FromJson<GithubRepo[]>()
    .OrderByDescending(x => x.Watchers)
    .Take(10);

orgRepos.PrintDumpTable();
```

Which will output:

```
| #  | Name            | Language | Watchers | Forks |
|----|-----------------|----------|----------|-------|
| 1  | aspnetcore      | C#       | 20376    | 5793  |
| 2  | corefx          |          | 17905    | 5340  |
| 3  | core            | Shell    | 14975    | 3762  |
| 4  | roslyn          | C#       | 13757    | 3186  |
| 5  | coreclr         |          | 12436    | 2852  |
| 6  | efcore          | C#       | 9765     | 2454  |
| 7  | AspNetCore.Docs | C#       | 8268     | 20654 |
| 8  | orleans         | C#       | 7147     | 1622  |
| 9  | BenchmarkDotNet | C#       | 6048     | 639   |
| 10 | reactive        | C#       | 4679     | 587   |
```

### Circular References

The `T.PrintDump()` and `T.Dump()` extension methods can also be used on objects with cyclical references 
where it will display the first-level `ToString()` value of properties that have circular references.

Whilst our Text Serializers don't support serializing DTOs with cyclical dependencies (which are actively discouraged), 
the APIs below can be used instead to partially serialize objects where it uses the `ToString()` on any properties containing Circular references:

 - `T.ToSafeJson()`
 - `T.ToSafeJsv()`
 - `T.ToSafePartialObjectDictionary()`

The API used to detect whether an object has Circular References is also available for your use: 

```csharp
if (obj.HasCircularReferences()) {
}
```

### Inbuilt into ServiceStack JSV web service endpoint

As this feature has come in super useful for debugging, it's also included it as part of the JSV endpoint by simply appending `&debug` anywhere in the request’s query string. 

Even if you don’t use the new JSV endpoint you can still benefit from it by instantly being able to read the data provided by your web service. Here are some live examples showing the same web services called from the XML and JSV endpoint that shows the difference in readability:

  - [GetNorthwindCustomerOrders](http://northwind.netcore.io/json/reply/Orders?debug)

