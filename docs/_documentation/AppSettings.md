---
slug: appsettings
title: Configuration & AppSettings
---

Instead of building verbose nested XML configSection classes our preference is to instead store structured configuration in Web.config's `<appSetting/>` which can still express rich config graphs but in a much more human-friendly and manageable way.

ServiceStack's pluggable `IAppSettings` API is a cleaner alternative for storing your Application structured configuration, providing a high-level API to read your Web.config's `<appSetting/>` values into a `List`, `Dictionary` or your own clean Custom POCO Types using the human friendly [JSV format](/jsv-format). 

```csharp
public interface IAppSettings
{
    Dictionary<string, string> GetAll();
         
    List<string> GetAllKeys();

    bool Exists(string key);

    void Set<T>(string key, T value);

    string GetString(string name);

    IList<string> GetList(string key);

    IDictionary<string, string> GetDictionary(string key);

    T Get<T>(string name);

    T Get<T>(string name, T defaultValue);
}
``` 

Benefits over existing Configuration API include the ability to store rich data structures in appSettings values, more succinct access to typed data and since its an interface it's decoupled from .NET Configuration classes and can easily be swapped to source your configuration from an different sources without a rewrite, e.g. from a text file or central DB.

### Example Usage

```xml
<appSettings>
    <add key="LastUpdated" value="01/01/2012 12:00:00" />
    <add key="AllowedUsers" value="Tom,Mick,Harry" />
    <add key="RedisConfig" 
         value="{Host:localhost,Port:6379,Database:1,Timeout:10000}" />
</appSettings>
```

Reading the above configuration in code:

```csharp
IAppSettings appSettings = new AppSettings();
DateTime lastUpdate = appSettings.Get<DateTime>("LastUpdated");
IList<string> allowedUsers = appSettings.GetList("AllowedUsers");
RedisConfig redisConf = appSettings.Get<RedisConfig>("RedisConf");

//use default value if no config exists
var searchUrl = appSettings.Get("SearchUrl", "http://www.google.com"); 
```

The last default value provides a convenient way to maintain workable default options in code (allowing re-use in Unit/Integration tests) whilst still being overridable in the **Web.config** when you need to.

## Multi AppSettings

The `MultiAppSettings` AppSettings provider enables reading configuration from multiple configuration sources.

### Example Usage 

The example below creates a cascading configuration that first checks Environment variables, then looks in a local `~/appsettings.txt` plain-text file before falling back to `Web.config`: 

```csharp
AppSettings = new MultiAppSettings(
    new EnvironmentVariableSettings(),
    new TextFileSettings("~/appsettings.txt".MapHostAbsolutePath()),
    new AppSettings());
```

### Multi AppSettings Builder

An alternative is to use `MultiAppSettingsBuilder` if you prefer to use a fluent discoverable API:

```csharp
AppSettings = new MultiAppSettingsBuilder()
    .AddAppSettings()
    .AddDictionarySettings(new Dictionary<string,string> { "override" : "setting" })
    .AddEnvironmentalVariables()
    .AddTextFile("~/path/to/settings.txt".MapProjectPath())
    .Build();
```

## OrmLite AppSettings

`OrmLiteAppSettings` provides an alternative read/write API that lets you maintain your applications configuration in any [RDBMS back-end OrmLite supports](https://github.com/ServiceStack/ServiceStack.OrmLite/#download). It works like a mini Key/Value database in which can store any serializable value against any key which is maintained into the simple Id/Value `ConfigSettings` table.

### Usage

Registration just uses an OrmLite DB Factory, e.g:

```csharp
container.Register(c => 
    new OrmLiteAppSettings(c.Resolve<IDbConnectionFactory>()));
//Create the ConfigSettings table if it doesn't exist
container.Resolve<OrmLiteAppSettings>().InitSchema(); 
```

It then can be accessed like any [AppSetting APIs](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.Common.Tests/Configuration/AppSettingsTests.cs). The example below reads the `MyConfig` POCO stored at `config` otherwise use default value if it doesn't exist: 

```csharp
var config = appSettings.Get("config", 
    new MyConfig { Key = "DefaultValue" });
```

In addition to the AppSettings read-only API's, it also supports writing config values , e.g:

```csharp
var latestStats = appSettings.GetOrCreate("stats", 
    () => statsProvider.GetLatest());
```

## EnvironmentVariableSettings

The new `EnvironmentVariableSettings` AppSettings provider to source configuration from Environment variables:

```csharp
var appSettings = new EnvironmentVariableSettings();
```

## TextFileSettings

The `TextFileSettings` lets you read your Applications configuration in a plain-text file, which can easily be overridden with custom environment settings as part of the CI deployment process, providing a nice alternative to custom Web.config configurations.

### Example Usage

To use just provide the path to the plain-text file that contains the app-settings: 

```csharp
var appSettings = new TextFileSettings("~/app.settings".MapHostAbsolutePath());
```

### TextFile Format

Each appSetting is on a new line with the **Key** and **Value** separated by a space:

    {Key} {Value}\n

> The delimiter can be changed in the constructor e.g. `new TextFileSettings(path,delimiter:": ");`

### Extract key / value settings from text file

Under the hood TextFileSettings uses the ParseKeyValueText extension method to extract key / value data from a string, e.g: 

```csharp
var configText = @"
# comments starting with '#' and blank lines are ignored

StringKey string value
IntKey 42
ListKey A,B,C,D,E
DictionaryKey A:1,B:2,C:3,D:4,E:5
PocoKey {Foo:Bar,Key:Value}";

Dictionary<string, string> configMap = 
    configText.ParseKeyValueText(delimiter:" ");
```

## DictionarySettings

When combined with the existing `DictionarySettings`, enables a rich, simple and clean alternative to .NET's App.config config section for reading structured configuration into clean data structures, e.g:

```csharp
IAppSettings settings = new DictionarySettings(configMap);

string value = settings.Get("StringKey");

int value = settings.Get("IntKey", defaultValue:1);

List<string> values = settings.GetList("ListKey");

Dictionary<string,string> valuesMap = settings.GetDictionary("key");

MyConfig config = settings.Get("key", new MyConfig { Key = "default"});
```

### SimpleAppSettings

`SimpleAppSettings` is an alternative Dictionary-based provider that only requires a dependency to `ServiceStack.Common`, e.g:

```csharp
AppSettings = new SimpleAppSettings(new Dictionary<string, string> {
    ["string"] = "value",
    ["EnableFeature.1"] = "true",
    ["AllowedUsers"] = "Tom,Mick,Harry",
}));

string value = AppSettings.GetString("string");
bool enableFeature1 = AppSettings.Get("EnableFeature.1", defaultValue:false);
bool enableFeature2 = AppSettings.Get("EnableFeature.2", defaultValue:false);
IList<string> allowedUsers = AppSettings.GetList("AllowedUsers");
```

## [DynamoDbAppSettings](https://github.com/ServiceStack/ServiceStack/blob/master/docs/2015/release-notes.md#dynamodbappsettings)

Storing production config in DynamoDB reduces the effort for maintaining production settings decoupled from source code. 
Here `DynamoDbAppSettings` is registered first in a `MultiAppSettings` collection it checks entries in the DynamoDB `ConfigSetting` Table first before falling back to local **Web.config** appSettings:

```csharp
#if !DEBUG
    AppSettings = new MultiAppSettings(
        new DynamoDbAppSettings(new PocoDynamo(awsDb), initSchema:true),
        new AppSettings()); // fallback to Web.confg
#endif
```

## First class AppSettings

After proving its value over the years we've decided to make it a first-class property on `IAppHost.AppSettings` which defaults to looking at .NET's App/Web.config's. 

The new [Chat.zip](https://github.com/ServiceStack/ServiceStack.Gap/raw/master/deploy/Chat.zip) App explores different ways AppSettings can be used: 

If there's an existing `appsettings.txt` file where the **.exe** is run it will use that, otherwise it falls back to **Web.config** appSettings:

```csharp
public AppHost() : base("Chat", typeof (ServerEventsServices).Assembly)
{
    var customSettings = new FileInfo("appsettings.txt");
    AppSettings = customSettings.Exists
        ? (IAppSettings)new TextFileSettings(customSettings.FullName)
        : new AppSettings();
}
```

As a normal property in your AppHost, AppSettings can be accessed directly in `AppHost.Configure()`:

```csharp
public void Configure(Container container)
{
    ...
    var redisHost = AppSettings.GetString("RedisHost");
    if (redisHost != null)
    {
        container.Register<IServerEvents>(c => 
            new RedisServerEvents(new PooledRedisClientManager(redisHost)));
        
        container.Resolve<IServerEvents>().Start();
    }
}
```

Inside your services or IOC dependencies, like any other auto-wired dependency:

```csharp
public class ServerEventsServices : Service
{
    public IAppSettings AppSettings { get; set; }

    public void Any(PostRawToChannel request)
    {
        if (!IsAuthenticated && AppSettings.Get("LimitRemoteControlToAuthenticatedUsers", false))
            throw new HttpError(HttpStatusCode.Forbidden, "You must be authenticated to use remote control.");
        ...
    }   
}
```

Directly within Razor views:

```html
<style>
    body {
        background-image: url(@AppSettings.Get("background","/img/bg.jpg")) 
    }
</style>
```

As well as outside ServiceStack, via the `HostContext` static class:

```csharp
var redisHost = HostContext.AppSettings.GetString("redis");
```

## AppSettings are Writable

A new `Set()` API was added to [IAppSettings](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Configuration/IAppSettings.cs) letting you save any serializable property that works for all providers:

```csharp
public interface IAppSettings
{
    void Set<T>(string key, T value);
    ...
}

AppSettings.Set("Poco", new MyConfig { Foo = "Baz" });
```

In providers that support writable configuration natively like `OrmLiteAppSettings` and `DictionarySettings`, the settings get written through to the underlying provider. For read-only providers like Web.config's `AppSettings` or `TextFileSettings` a **shadowed** cache is kept that works similar to prototypal shadowing in JavaScript where if a property doesn't exist, setting a property will be stored on the top-level object instance which also takes precedence on subsequent property access.

# IConfiguration

To create AppSettings from IConfiguration object

```csharp
AppSettings = new NetCoreAppSettings(configuration);
```

# Community AppSettings

## [ServiceStack.Configuration.Consul](https://github.com/MacLeanElectrical/servicestack-configuration-consul)

An implementation of IAppSettings that uses Consul.io key/value store as backing storage
