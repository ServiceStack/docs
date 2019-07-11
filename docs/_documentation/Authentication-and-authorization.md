---
slug: authentication-and-authorization
title: Authentication and Authorization
---

Built into ServiceStack is a simple and extensible Authentication Model that implements standard HTTP Session Authentication where 
[Session Cookies](/sessions) are used to send Authenticated Requests which reference Users Custom UserSession POCO's in your App's 
registered [Caching Provider](/caching). 

ServiceStack also includes a number of Auth Providers which "Authenticate per-request" in this case the Authenticated User Session
is only attached to and lasts during the lifetime of the current `IRequest`. The implementation details of each Auth Provider are 
transparent to your Application where the same Attributes and APIs are used to retrieve, validate, authenticate and authorize Users.

ServiceStack's Authentication support is encapsulated in the optional `AuthFeature` plugin which provides an easy way to declaratively 
register and configure multiple Auth Providers you want to allow in your Application. It's highly configurable with a number of 
additional features like whether to enable built-in Registration for Registering new Users as well as Assign/UnAssign Roles Services
that Admins can use to assign Roles/Permissions to existing users.

### Highly customizable and versatile

ServiceStack's Authentication is also highly customizable and versatile from being able to choose from the plethora of Auth Providers
available or inheriting from them to create your own customized Auth Provider, inheriting `AuthUserSession` to use your own Custom POCO
with additional info you want to maintain for your Users, storing User Sessions in any of the available [Caching Providers](/caching), 
adding custom logic by handling any of the [Auth and Session Events](/sessions#session-events) raised throughout the Auth lifecycle,
to specifying which back-end Auth Repository you want to persist your Authenticated Users in - supporting most popular RDBMS's and 
popular NoSQL data stores as seen in the high-level overview below:

### High Level Overview

![Authentication Overview](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-highlevel-overview.svg?sanitize=true)

The `AuthenticateService` is the primary Service that manages Authentication which delegates to the specified Auth Provider that 
performs the Authentication, made available via its following endpoints:

 - `/auth/{provider}` - Authenticate against a specific Auth Provider
 - `/auth` - API to check if a Request is authenticated: returns **200** with basic session info if authenticated or **401** if not.
 - `/auth/logout` - Removes the Authenticated Session from the registered cache and clears Session Cookies.

### Credentials Auth Providers

If you would like ServiceStack to manage your Apps entire Authentication and persistence of Users you would use one of the available Auth Repositories
and authenticate against one of the following Auth Providers:

<div class='markdown-body pb-3'>
{% capture table %}
| Provider          | Class Name                  | Route                    | Description |
|-|-|-|-|
| **Credentials**   | `CredentialsAuthProvider`   | **/auth/credentials**    | Standard Authentication using Username/Password |
| **Basic Auth**    | `BasicAuthProvider`         | HTTP Basic Auth          | Username/Password sent via [HTTP Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication) |
| **Digest Auth**   | `DigestAuthProvider`        | HTTP Digest Auth         | Username/Password hash via [HTTP Digest Auth](https://en.wikipedia.org/wiki/Digest_access_authentication) |
{% endcapture %}
{{ table | markdownify }}
</div>

New Users can be created via the `/register` Registration Service which be enabled with:

```csharp
Plugins.Add(new RegistrationFeature());
```

### OAuth Providers

The following OAuth Providers are built into ServiceStack and can be used in both ASP.NET Core and .NET Framework Apps:

<div class='markdown-body pb-3'>
{% capture table %}
| Provider          | Class Name                   | Route                    | Create OAuth App Link |
|-|-|-|-|
| **Facebook**      | `FacebookAuthProvider`       | **/auth/facebook**       | [developers.facebook.com/apps](https://developers.facebook.com/apps) |
| **Twitter**       | `TwitterAuthProvider`        | **/auth/twitter**        | [dev.twitter.com/apps](https://dev.twitter.com/apps) |
| **Google**        | `GoogleAuthProvider`         | **/auth/google**         | [console.developers.google.com](https://console.developers.google.com/apis/credentials) |
| **GitHub**        | `GithubAuthProvider`         | **/auth/github**         | [github.com/settings/applications/new](https://github.com/settings/applications/new) |
| **Microsoft**     | `MicrosoftGraphAuthProvider` | **/auth/microsoftgraph** | [apps.dev.microsoft.com](https://apps.dev.microsoft.com) |
| **LinkedIn**      | `LinkedInAuthProvider`       | **/auth/linkedin**       | [www.linkedin.com/secure/developer](https://www.linkedin.com/secure/developer) |
| **Yammer**        | `YammerAuthProvider`         | **/auth/yammer**         | [www.yammer.com/client_applications](http://www.yammer.com/client_applications) |
| **Yandex**        | `YandexAuthProvider`         | **/auth/yandex**         | [oauth.yandex.ru/client/new](https://oauth.yandex.ru/client/new) |
| **VK**            | `VkAuthProvider`             | **/auth/vkcom**          | [vk.com/editapp?act=create](http://vk.com/editapp?act=create) |
| **Odnoklassniki** | `OdnoklassnikiAuthProvider`  | **/auth/odnoklassniki**  | [www.odnoklassniki.ru/devaccess](http://www.odnoklassniki.ru/devaccess) |
{% endcapture %}
{{ table | markdownify }}
</div>

### Session Authentication Overview

The diagram below outlines how standard session based Authentication works and how the different providers interact in more detail:

![Session Based Authentication](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-session-auth.svg?sanitize=true)

Where the **Auth Provider** are unique for each Auth Provider but otherwise adopt the same Authentication process that results
in the same end result where an Authenticated `AuthUserSession` is persisted in the registered `ICacheClient` against the `ss-pid` Permanent Cookie
if the `Authenticate` request `RememberMe=true` otherwise against `ss-id` Temporary Session Cookie if not.

After a Request is Authenticated its Session Cookies are sent on subsequent requests and validated by ServiceStack's built in `[Authenticate]` and 
other `[Require*]` attributes to restrict access to valid users:

![Session Requests](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-session-requests.svg?sanitize=true)

Once authenticated the Users Session can be accessed in your **Services** using the Typed and minimal `IAuthSession` APIs:

```csharp
AuthUserSession session = base.SessionAs<AuthUserSession>();
IAuthSession session = base.GetSession();
```

Of if you've registered to use a Custom UserSession POCO in the `AuthFeature` constructor use that instead of `AuthUserSession`.

Typed User Sessions also accessible in all Filters and handlers that have access to the current `IRequest` with:

```csharp
AuthUserSession session = req.SessionAs<AuthUserSession>();
IAuthSession session = req.GetSession();
```

See the [Session docs](/sessions) for more info about customizing Sessions and handling different Session and Auth events.

### Authentication per Request Auth Providers

These Auth Providers include authentication with each request so the Authenticated User Session is only populated on the HTTP `IRequest` and not saved in the registered Cache Client. Unlike traditional Auth Providers above where there is a separate "Authentication" request to establish authentication, 
Auth Providers that implement `IAuthWithRequest` instead send their Authentication "per-request" where it's only populated on the current `IRequest`:

![Auth with Request Auth Providers](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-auth-with-request-providers.svg?sanitize=true)

Whilst the Authentication Process is different you'd continue to use the same APIs and Attributes to access and validate the Users Session. 

The following Auth Providers below implement `IAuthWithRequest` and Authenticate per-request:

<div class='markdown-body pb-3'>
{% capture table %}
| Provider          | Class Name                   | Auth Method  | Description |
|-|-|-|-|
| **JWT**           | `JwtAuthProvider`            | Bearer Token | Stateless Auth Provider using [JSON Web Tokens](/jwt-authprovider)  |
| **API Keys**      | `ApiKeyAuthProvider`         | Bearer Token | Allow 3rd Parties access to [authenticate without a password](/api-key-authprovider) |
| **Basic Auth**    | `BasicAuthProvider`          | Basic Auth   | Authentication using [HTTP Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication) |
| **Digest Auth**   | `DigestAuthProvider`         | Digest Auth  | Authentication using [HTTP Digest Auth](https://en.wikipedia.org/wiki/Digest_access_authentication) |
{% endcapture %}
{{ table | markdownify }}
</div>

Some other special Auth Providers that Authenticate per-request include:

 - **Windows Auth** in `AspNetWindowsAuthProvider`  - Authentication using [Windows Auth](https://support.microsoft.com/en-us/help/323176/how-to-implement-windows-authentication-and-authorization-in-asp-net) built into ASP.NET.
 - **Claims Auth** in `NetCoreIdentityAuthProvider` - Pass through Auth Provider that delegates to ASP.NET Core Identity Auth or Identity Server.

### Integrated ASP.NET Core Authentication

The `NetCoreIdentityAuthProvider` is a bi-directional Authentication adapter that enables ServiceStack to use the same Authentication as the 
rest of your ASP.NET Core and MVC Application where it enables the following popular scenarios:

 - [Using ServiceStack Auth in MVC](/authentication-identity-servicestack) - Use ServiceStack Auth to power ASP.NET Identity Auth, pre-configured in the [mvcauth](https://github.com/NetCoreTemplates/mvcauth) project template. 
 - [Using ASP.NET Identity Auth in ServiceStack](/authentication-identity-aspnet) - Use ASP.NET Identity Auth to Authenticate ServiceStack Services, pre-configured in the [mvcidentity](https://github.com/NetCoreTemplates/mvcidentity) project template.
 - [Using IdentityServer4 Auth in ServiceStack](/authentication-identityserver) - Use IdentityServer4 to Authenticate ASP.NET Core and ServiceStack Services, 
pre-configured in the [mvcidentityserver](https://github.com/NetCoreTemplates/mvcidentityserver) project template.

### Legacy OAuth and Open ID Auth Providers

There are also a number Auth Providers have a dependency on `DotNetOpenAuth` that can only be used in classic ASP.NET System.Web projects:

<div class='markdown-body pb-3'>
{% capture table %}
| Provider          | Class Name                   | Route                    | Create OAuth App Link |
|-|-|-|-|
| **Instagram**     | `InstagramOAuth2Provider`    | **/auth/instagram**      | [instagram.com/developer/authentication](http://instagram.com/developer/authentication/) |
| **Custom OpenId** | `OpenIdOAuthProvider`        | **/auth/openid**         | |
| **My OpenId**     | `MyOpenIdOAuthProvider`      | **/auth/myopenid**       | |
| **Yahoo OpenId**  | `YahooOpenIdOAuthProvider`   | **/auth/yahooopenid**    | |
{% endcapture %}
{{ table | markdownify }}
</div>

The OAuth2 Providers are in [ServiceStack.Authentication.OAuth2](https://www.nuget.org/packages/ServiceStack.Authentication.OAuth2/) whilst the Open ID providers 
are in [ServiceStack.Authentication.OpenId](https://www.nuget.org/packages/ServiceStack.Authentication.OpenId/) NuGet packages. More info available in [OAuth2 and OpenId 2.0 docs](/openid). Although they should be considered legacy as DotNetOpenAuth is no longer maintained and can't be used in ASP.NET Core projects.

### Community Auth Providers

  - [Azure Active Directory](https://github.com/jfoshee/ServiceStack.Authentication.Aad) - Allow Custom App to login with Azure Active Directory
  - [Azure Active Directory via Azure Graph for ServiceStack](https://github.com/ticky74/ServiceStack.Authentication.Azure)
  - [ServiceStack.Authentication.IdentityServer](https://github.com/MacLeanElectrical/servicestack-authentication-identityserver) - Integration with ASP.NET IdentityServer and provides OpenIDConnect / OAuth 2.0 Single Sign-On Authentication

### Basic Configuration

A minimal configuration needed to get Basic Authentication up and running is the following in `AppHost.Config()` (derived from the [AuthTests unit test](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/AuthTests.cs)):

```csharp 
public override void Configure(Container container)
{
    Plugins.Add(new AuthFeature(() => new AuthUserSession(),
        new IAuthProvider[] { 
            new BasicAuthProvider(),       //Sign-in with HTTP Basic Auth
            new CredentialsAuthProvider(), //HTML Form post of UserName/Password credentials
        }));

    container.Register<ICacheClient>(new MemoryCacheClient());

    var userRepo = new InMemoryAuthRepository();
    container.Register<IAuthRepository>(userRepo);
    
    //The IAuthRepository is used to store the user credentials etc.
    //Implement this interface to adjust it to your app's data storage
}
```

[AuthWebTests](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/) is a simple project that shows all Auth Providers configured and working in the same app. See the [AppHost](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/AppHost.cs) for an example of the code and the [Web.config](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/Web.config) for an example of the configuration required to enable each Auth Provider.

### OAuth Configuration

Once you have the `ConsumerKey` and `ConsumerSecret` you need to configure it with your ServiceStack host, via [Web.config](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.AuthWeb.Tests/Web.config), e.g:

```xml
<add key="oauth.RedirectUrl"            value="https://yourhostname.com"/>
<add key="oauth.CallbackUrl"            value="https://yourhostname.com/auth/{0}"/>    
<add key="oauth.twitter.ConsumerKey"    value="3H1FHjGbA1N0n0aT5yApA"/>
<add key="oauth.twitter.ConsumerSecret" value="MLrZ0ujK6DwyjlRk2YLp6HwSdoBjtuqwXeHDQLv0Q"/>
```

For [.NET Core](/web-new) or [ASP.NET Core Apps](/templates-corefx) you can add the same keys to your `appsettings.json`, e.g:

```json
{
    "oauth.RedirectUrl":            "https://yourhostname.com",
    "oauth.CallbackUrl":            "https://yourhostname.com/auth/{0}",
    "oauth.twitter.ConsumerKey":    "3H1FHjGbA1N0n0aT5yApA",
    "oauth.twitter.ConsumerSecret": "MLrZ0ujK6DwyjlRk2YLp6HwSdoBjtuqwXeHDQLv0Q",
}
```

Each OAuth Config option fallbacks to the configuration without the provider name. If needed you provide OAuth specific configuration
by including the Auth Provider Name in the configuration, e.g:

```xml
<add key="oauth.twitter.RedirectUrl"    value="https://yourhostname.com"/>
<add key="oauth.twitter.CallbackUrl"    value="https://yourhostname.com/auth/twitter"/>    
```

Configuration can also be specified in code when registering the Auth Provider in the `AuthFeature` plugin in your AppHost, e.g:

```csharp
Plugins.Add(new AuthFeature(() => new AuthUserSession(), new IAuthProvider[] {
    new TwitterAuthProvider(appSettings) { 
        RedirectUrl = "http://yourhostname.com/",
        CallbackUrl = "http://yourhostname.com/auth/twitter",
        ConsumerKey = "3H1FHjGbA1N0n0aT5yApA",
        ConsumerSecret = "MLrZ0ujK6DwyjlRk2YLp6HwSdoBjtuqwXeHDQLv0Q",
    },
}));
```

> Note: The Callback URL in each Application should match the CallbackUrl for your application which is typically: http://yourhostname.com/auth/{Provider}, e.g. http://yourhostname.com/auth/twitter for Twitter.

### User Auth Repository

The Authentication module allows you to use your own persistence back-ends but for the most part you should be able to reuse one of the existing [IAuthRepository](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/IAuthRepository.cs): 

  - **OrmLite**: `OrmLiteAuthRepository` in [ServiceStack.Server](https://nuget.org/packages/ServiceStack.Server)
    - [OrmLiteAuthRepositoryMultitenancy](/multitenancy#multitenancy-rdbms-authprovider)
  - **Redis**: `RedisAuthRepository` in [ServiceStack](https://nuget.org/packages/ServiceStack)
  - **Memory**: `InMemoryAuthRepository` in [ServiceStack](https://nuget.org/packages/ServiceStack)
  - **AWS DynamoDB**: `DynamoDbAuthRepository` in [ServiceStack.Aws](https://nuget.org/packages/ServiceStack.Aws)
  - **Mongo DB**: `MongoDBAuthRepository` in [ServiceStack.Authentication.MongoDB](https://nuget.org/packages/ServiceStack.Authentication.MongoDB)
  - **Raven DB**: `RavenUserAuthRepository` in [ServiceStack.Authentication.RavenDB](https://nuget.org/packages/ServiceStack.Authentication.RavenDB)
  - **Marten**: `MartenAuthRepository` in [ServiceStack.Authentication.Marten](https://www.nuget.org/packages/ServiceStack.Authentication.Marten) - [GitHub project](https://github.com/migajek/ServiceStack.Authentication.Marten)
  - **LiteDB**: `LiteDBAuthRepository` in [ServiceStack.Authentication.LiteDB](https://github.com/CaveBirdLabs/ServiceStack.Authentication.LiteDB)

#### Registering an Auth Repository

The `OrmLiteAuthRepository` is the most common Auth Repository which will let you persist User Info in any of the [RDBMS's that OrmLite supports](https://github.com/ServiceStack/ServiceStack.OrmLite#8-flavours-of-ormlite-is-on-nuget). All Auth Repositories are registered by adding a `IAuthRepository` dependency in your IOC, e.g:

```csharp
container.Register<IDbConnectionFactory>(c =>
    new OrmLiteConnectionFactory(connectionString, SqlServer2012Dialect.Provider));

container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()));

container.Resolve<IAuthRepository>().InitSchema();
```

Calling `InitSchema()` will create the necessary RDBMS `UserAuth` and `UserAuthDetails` tables if they don't already exist. By default the Users Roles and Permissions are blobbed on the `UserAuth` table, but if preferred they can optionally be maintained in a separate `UserAuthRole` table with:

```csharp
container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()) {
        UseDistinctRoleTables = true
    });
```

#### Extending UserAuth tables

There are a number of [different extensibility options](https://stackoverflow.com/a/11118747/85785) for extending ServiceStack Authentication by linking to external tables with its `RefId` and `RefIdStr` fields or storing custom info in the `Meta` Dictionaries. 

Some Auth Repositories like OrmLite also supports utilizing custom `UserAuth` tables with extended fields which can be configured using its generic Constructor, e.g:

```csharp
public class MyUserAuth : UserAuth { .... }
public class MyUserAuthDetails : UserAuthDetails { .... }
```

```csharp
container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository<MyUserAuth, MyUserAuthDetails>(c.Resolve<IDbConnectionFactory>()) {
        UseDistinctRoleTables = true
    });
```

### Session Persistence

Once authenticated the **AuthUserSession** model is populated and stored in the Cache using one of ServiceStack's [supported Caching providers](/caching). ServiceStack's Sessions simply uses the 
[ICacheClient](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Caching/ICacheClient.cs)
API so any new provider added can be used for both Session and Caching, which currently includes:

  - **Memory**: `MemoryCacheClient` in [ServiceStack](https://nuget.org/packages/ServiceStack)
  - **Redis**: `RedisClient`, `PooledRedisClientManager` or `BasicRedisClientManager` in [ServiceStack.Redis](https://nuget.org/packages/ServiceStack.Redis)
  - **OrmLite**: `OrmLiteCacheClient` in [ServiceStack.Server](https://nuget.org/packages/ServiceStack.Server)
  - **AWS DynamoDB**: `DynamoDbCacheClient` in [ServiceStack.Aws](https://nuget.org/packages/ServiceStack.Aws)
  - **Memcached**: `MemcachedClientCache` in [ServiceStack.Caching.Memcached](https://nuget.org/packages/ServiceStack.Caching.Memcached)
  - **Azure**: `AzureTableCacheClient` in [ServiceStack.Azure](https://nuget.org/packages/ServiceStack.Azure)

The Auth Feature also allows you to specify your own custom `IUserAuthSession` type where you can capture additional metadata with your users session which will also get persisted and hydrated from the cache, e.g: 

```csharp
Plugins.Add(new AuthFeature(() => new CustomUserSession(), 
    ...
));
```

> Note: If you're using Custom Sessions and have `JsConfig.ExcludeTypeInfo=true`, you need to [explicitly enable it](http://stackoverflow.com/q/18842685/85785) with `JsConfig<TCustomSession>.IncludeTypeInfo=true`.

After authentication the client will receive a cookie with a session id, which is used to fetch the correct session from the `ICacheClient` internally by ServiceStack. Thus, you can access the current session in a service:

```csharp
public class SecuredService : Service
{
    public object Get(Secured request)
    {
        var session = this.SessionAs<AuthUserSession>();
        return new SecuredResponse() { Test = "You're" + session.FirstName };
    }
}
```

ServiceStack's Authentication, Caching and Session providers are completely new, clean, dependency-free testable APIs that doesn't rely on and is devoid of ASP.NET's existing membership, caching or session provider models. 

## World Validation

See the annotated [World Validation Docs](/world-validation) for a detailed walks through and showcases the implementation 
of how the most popular **Server HTML rendered** approaches and **Client UI rendered** technologies use the same built-in
Authentication, Registration and protected Services.

## Live Demos

To illustrate Authentication integration with ServiceStack, see the authentication-enabled 
[Live Demos](https://github.com/ServiceStackApps/LiveDemos) below:

### .NET Core

  - [New TechStacks](https://github.com/NetCoreApps/TechStacks)
    - GitHub, Twitter and JWT Auth
  - [SimpleAuth.Mvc](https://github.com/NetCoreApps/SimpleAuth.Mvc)
    - Twitter, Facebook, GitHub, VK, Yandex and Credentials Auth
  - [Chat](https://github.com/NetCoreApps/Chat)
    - Twitter, Facebook and GitHub Auth

### Mobile

  - [Android Java Chat](https://github.com/ServiceStackApps/AndroidJavaChat)
    - Facebook, Twitter and Google Auth
  - [Android Xamarin Chat](https://github.com/ServiceStackApps/AndroidXamarinChat)
    - Twitter Auth

### .NET Framework

  - [HttpBenchmarks Application](https://github.com/ServiceStackApps/HttpBenchmarks)
    - [Step-by-Step Authentication Guide](https://github.com/ServiceStackApps/HttpBenchmarks#authentication)
    - Twitter, Facebook, Google, LinkedIn and Credentials Auth
  - [Angular TechStacks](https://github.com/ServiceStackApps/TechStacks)
    - Twitter, GitHub and JWT Auth
  - [Gistlyn](https://github.com/ServiceStack/Gistlyn)
    - GitHub and JWT Auth
  - [AWS Auth](http://awsapps.servicestack.net/awsauth/) 
    - Twitter, Facebook, GitHub, Google, Yahoo, LinkedIn, and Credentials Auth
  - [MVC and WebForms Example](/servicestack-integration) 
    - Twitter, Facebook, GitHub, Google, Yahoo, LinkedIn, VK, Credentials and Windows Auth
  - [Chat](https://github.com/ServiceStackApps/LiveDemos#chat)
    - Twitter, Facebook and GitHub Auth
  - [React Chat](https://github.com/ServiceStackApps/ReactChat)
    - Twitter, Facebook and GitHub Auth
  - [SocialBootstrap Api](https://github.com/ServiceStackApps/LiveDemos#social-bootstrap-api)
    - Twitter, Facebook, Yahoo and Credentials Auth

## Custom authentication and authorization

A good starting place to create your own Auth provider that relies on username/password validation is to subclass `CredentialsAuthProvider` and override the `bool TryAuthenticate(service, username, password)` method where you can provide your custom implementation. If you instead wanted to authenticate via HTTP Basic Auth
you would subclass `BasicAuthProvider` instead.

Both the default [BasicAuthProvider](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/BasicAuthProvider.cs) and [CredentialsAuthProvider](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/CredentialsAuthProvider.cs) (which it extends) can be extended, and their behavior overwritten. An example is below:

```csharp
using ServiceStack;
using ServiceStack.Auth;

public class CustomCredentialsAuthProvider : CredentialsAuthProvider
{
    public override bool TryAuthenticate(IServiceBase authService, 
        string userName, string password)
    {
        //Add here your custom auth logic (database calls etc)
        //Return true if credentials are valid, otherwise false
    }

    public override IHttpResult OnAuthenticated(IServiceBase authService, 
        IAuthSession session, IAuthTokens tokens, 
        Dictionary<string, string> authInfo)
    {
        //Fill IAuthSession with data you want to retrieve in the app eg:
        session.FirstName = "some_firstname_from_db";
        //...

        //Call base method to Save Session and fire Auth/Session callbacks:
        return base.OnAuthenticated(authService, session, tokens, authInfo);

        //Alternatively avoid built-in behavior and explicitly save session with
        //session.IsAuthenticated = true;
        //authService.SaveSession(session, SessionExpiry);
        //authService.Request.Items[Keywords.DidAuthenticate] = true;
        //return null;
    }
}
```
 
Then you need to register your custom credentials auth provider: 
 
```csharp
//Register all Authentication methods you want to enable for this web app.
Plugins.Add(new AuthFeature(() => new AuthUserSession(),
    new IAuthProvider[] {
        new CustomCredentialsAuthProvider(), //HTML Form post of User/Pass
    }
));
```

By default the AuthFeature plugin automatically registers the following (overridable) Service Routes:

```csharp
new AuthFeature = {
  ServiceRoutes = new Dictionary<Type, string[]> {
    { typeof(AuthenticateService),  new[]{ "/auth", "/auth/{provider}" }},
    { typeof(AssignRolesService),   new[]{ "/assignroles" }},
    { typeof(UnAssignRolesService), new[]{ "/unassignroles" }},
  }
};
```

### Assigning Roles and Permissions

Super Users with the **Admin** role or Requests with an [AdminAuthSecret](/debugging#authsecret) can call the built-in `/assignroles` and `/unassignroles` Services to add Roles/Permissions to existing users from an external Request, e.g:

```csharp
var client = new JsonServiceClient(baseUrl);
var response = client.Post(new AssignRoles
{
    UserName = userName,
    Roles = new List<string> { "TheRole" },
    Permissions = new List<string> { "ThePermission" }
});
```

Inside ServiceStack you can use the `AssignRoles` API to add Roles and Permissions to an existing User:

```csharp
var userAuth = base.AuthRepository.GetUserAuthByUserName(userName);
if (userAuth == null)
    throw HttpError.NotFound(userName);

base.AuthRepository.AssignRoles(userAuth, new[]{ "TheRole" }, new[]{ "ThePermission" });
```

Alternatively you can add Roles when creating a new User with:

```csharp
base.AuthRepository.CreateUserAuth(new UserAuth
{
    UserName = userName,
    FirstName = "John",
    LastName = "Doe",
    DisplayName = "John Doe",
    Roles = new List<string> { "TheRole" }
}, userPassword);
```

> You can use `HostContext.AppHost.GetAuthRepository(Request)` to access the registered `IAuthRepository` outside of a ServiceStack Service.

### Logout

You can do a GET or POST to `/auth/logout` to logout the authenticated user or if you're using C# client you can logout with:

```csharp
client.Post(new Authenticate { provider = "logout" });
```

> Logging out will remove the Users Session from the Server and Session Cookies from the Client and redirect to the url in Authenticate.Continue, session.ReferrerUrl, 'Referer' HTTP Header or AuthProvider.CallbackUrl.

***

### Authenticating with .NET Service Clients

On the client you can use the [C#/.NET Service Clients](/csharp-client) to easily consume your authenticated Services.

To authenticate using your `CustomCredentialsAuthProvider` by POST'ing a `Authenticate` Request, e.g:

```csharp
var client = new JsonServiceClient(BaseUrl);

var authResponse = client.Post(new Authenticate {
    provider = CredentialsAuthProvider.Name, //= credentials
    UserName = "test@gmail.com",
    Password = "p@55w0rd",
    RememberMe = true,
});
```

If authentication was successful the Service Client `client` instance will be populated with authenticated session cookies which then allows calling Authenticated services, e.g:

```csharp
var response = client.Get(new GetActiveUserId());
```

If you've also registered the `BasicAuthProvider` it will enable your Services to accept [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication) which is built-in the Service Clients that you can populate on the Service Client with:

```csharp
client.UserName = "test@gmail.com";
client.Password = "p@55w0rd";
```

Which will also let you access protected Services, e.g:

```csharp
var response = client.Get(new GetActiveUserId());
```

Although behind-the-scenes it ends up making 2 requests, 1st request sends a normal request which will get rejected with a `401 Unauthorized` and if the Server indicates it has the `BasicAuthProvider` enabled it will resend the request with the HTTP Basic Auth credentials. 

You could instead save the latency of the additional auth challenge request by specifying the client should always send the Basic Auth with every request:

```csharp
client.AlwaysSendBasicAuthHeader = true;
```

### Authenticating with HTTP

To Authenticate with your `CustomCredentialsAuthProvider` (which inherits from CredentialsAuthProvider) you would POST:

**POST** localhost:60339/auth/credentials?format=json

```json
{
    "UserName": "admin",
    "Password": "test",
    "RememberMe": true
}
```

When the client now tries to authenticate with the request above and the auth succeeded, the client will retrieve some cookies with a session id which identify the client on each Web Service call.

### Authentication via OAuth AccessTokens 

To improve OAuth Sign In integration from native Mobile or Desktop Apps you can also Authenticate via AccessTokens which can dramatically simplify the Development and User Experience by being able to leverage the Native Facebook, Twitter and Google Client SDK's to Sign In users locally then reuse their local **AccessToken** to Authenticate with back-end ServiceStack Servers. 

Example usage of this feature is in the [Integrated Facebook, Twitter and Google Logins](https://github.com/ServiceStackApps/AndroidJavaChat/#integrated-facebook-twitter-and-google-logins)
in Android Java Chat which is also able to [Automatically Sign In users with saved AccessTokens](https://github.com/ServiceStackApps/AndroidJavaChat#automatically-sign-in-previously-signed-in-users).

This capability is available on the popular OAuth Providers below:

- `FacebookAuthProvider` - Sign in with Facebook
- `TwitterAuthProvider` - Sign in with Twitter
- `GithubAuthProvider` - Sign in with Github
- `GoogleOAuth2Provider` - Sign in with Google

It can also be enabled in other OAuth2 Providers by implementing `VerifyAccessToken` to manually 
validate whether the provided AccessToken is valid with the registered OAuth App. The API to validate Access 
Tokens isn't part of the OAuth2 specification and is different (and often missing) for other OAuth2 providers. 

As an example, the `GoogleOAuth2Provider` uses a `VerifyAccessToken` implementation that's similar to:

```csharp
new GoogleOAuth2Provider {
    VerifyAccessToken = accessToken => {
        var url = $"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={accessToken}";
        var json = url.GetJsonFromUrl();
        var obj = JsonObject.Parse(json);
        return obj["issued_to"] == ConsumerKey;
    }
}
```

#### Client Authentication with AccessToken

Clients can utilize this feature with the new `AccessToken` and `AccessTokenSecret` properties on the existing
`Authenticate` request DTO, sent with the **provider** that the AccessToken is for, e.g:

```csharp
var response = client.Post(new Authenticate {
    provider = "facebook",
    AccessToken = facebookAccessToken,
    RememberMe = true,
});
```

> Most OAuth Providers only require sending an `AccessToken` with Twitter being the exception which also requires sending an `AccessTokenSecret`.

### User Sessions Cache

ServiceStack uses the [Cache Provider](/caching) which was registered in the IoC container:

```csharp
//Register to use an In Memory Cache Provider (default)
container.Register<ICacheClient>(new MemoryCacheClient());

//Configure an alt. distributed persisted cache, E.g Redis:
//container.Register<IRedisClientsManager>(c => 
//    new RedisManagerPool("localhost:6379"));
```

> Tip: If you've got multiple servers which run the same ServiceStack service, you can use Redis to share the sessions between these servers.

***

Please look at [SocialBootstrapApi](https://github.com/ServiceStack/SocialBootstrapApi/tree/master/src/SocialBootstrapApi) to get a full example.

> Of course you can also implement your own - custom - authentication mechanism. You aren't forced to use the built-in ServiceStack auth mechanism.

## The `Authenticate` attribute

The `[Authenticate]` [Request Filter Attribute](https://github.com/ServiceStack/ServiceStack/wiki/Filter-attributes) tells ServiceStack which Services needs authentication by adding it to your Service implementations, e.g:

```csharp
[Authenticate]
public class SecuredService : Service
{
    public object Get(Secured request)
    {
        IAuthSession session = this.GetSession();
        return new SecuredResponse() { Test = "You're" + session.FirstName };
    }

    public object Put(Secured request)
    {
        return new SecuredResponse() { Test = "Valid!" };
    }

    public object Post(Secured request)
    {
        return new SecuredResponse() { Test = "Valid!" };
    }

    public object Delete(Secured request)
    {
        return new SecuredResponse() { Test = "Valid!" };
    }
}
```

If you want, that authentication is only required for GET and PUT requests for example, you have to provide some extra parameters to the `Authenticate` attribute.

```csharp
[Authenticate(ApplyTo.Get | ApplyTo.Put)] 
```

## `RequiredRole` and `RequiredPermission` attributes

ServiceStack also includes a built-in permission based authorization mechanism. More details about how Roles and Permissions work is in this [StackOverflow Answer](http://stackoverflow.com/a/12096813).

Your request DTO can require specific permissions:

```csharp
[Authenticate]
//All HTTP (GET, POST...) methods need "CanAccess"
[RequiredRole("Admin")]
[RequiredPermission("CanAccess")]
[RequiredPermission(ApplyTo.Put | ApplyTo.Post, "CanAdd")]
[RequiredPermission(ApplyTo.Delete, "AdminRights", "CanDelete")]
public class Secured
{
    public bool Test { get; set; }
} 
```

Now the client needs the permissions...

- **CanAccess** to make a GET request
- **CanAccess**, **CanAdd** to make a PUT/POST request
- **CanAccess**, **AdminRights** and **CanDelete** to make a DELETE request

If instead you want to allow access to users in **ANY** Role or Permission use: 

```csharp
[RequiresAnyRole("Admin","Member")]
[RequiresAnyRole(ApplyTo.Post, "Admin","Owner","Member")]
[RequiresAnyPermission(ApplyTo.Delete, "AdminRights", "CanDelete")]
public class Secured
{
    public bool Test { get; set; }
} 
```

Normally ServiceStack calls the method `bool HasPermission(string permission)` in [IAuthSession](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.ServiceInterface/Auth/IAuthSession.cs). This method checks if the list `List<string> Permissions` in [IAuthSession](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.ServiceInterface/Auth/IAuthSession.cs) contains the required permission.

> [IAuthSession](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.ServiceInterface/Auth/IAuthSession.cs) is stored in a cache client as explained above

You can fill this list in the method `OnAuthenticated` you've overridden in the first part of this tutorial.

As with `Authenticate`, you can mark services (instead of DTO) with `RequiredPermission` attribute, too.

## Enabling Authentication at different levels

### Using the [Authenticate] Attribute

You can protect services by adding the `[Authenticate]` attribute on either the Action:

```csharp
class MyService : Service 
{
    [Authenticate] 
    public object Get(Protected request) { ... }
}
```

The Request DTO

```csharp
[Authenticate] 
class Protected { ... }
```

Or the service implementation

```csharp
[Authenticate] 
class MyService : Service 
{
    public object Get(Protected request) { ... }
}
```

Or by inheriting from a base class

```csharp
[Authenticate] 
class MyServiceBase : Service { ... }

class MyService : MyServiceBase {
    public object Get(Protected request) { ... }
}
```

### Using a Global Request Filter

Otherwise you can use a [global Request Filter](/request-and-response-filters) if you wanted to restrict all requests any other way, e.g something like:

```csharp
GlobalRequestFilters.Add((req, res, requestDto) =>
{
    if (ShouldProtectRequest(requestDto)) 
    {
        new AuthenticateAttribute().Execute(req, res, requestDto);
    }
});
```

## Extending UserAuth tables

Different customization and extension points and strategies to extend the UserAuth tables with your own data are explained in this [StackOverflow answer](http://stackoverflow.com/a/11118747/85785).

## Customizing AuthProviders

### Customizing User Roles and Permissions

The default implementation of User Roles and Permissions on [AuthUserSession](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/AuthUserSession.cs) shows how ServiceStack's `[RequiredRole]` and `[RequiredPermission]` [Roles and Permission attributes](/authentication-and-authorization#the-requiredrole-and-requiredpermission-attributes) are validated:
 
```csharp
public virtual bool HasPermission(string permission)
{
    var managesRoles = HostContext.TryResolve<IAuthRepository>() as IManageRoles;
    if (managesRoles != null)
    {
        return managesRoles.HasPermission(this.UserAuthId, permission);
    }

    return this.Permissions != null && this.Permissions.Contains(permission);
}

public virtual bool HasRole(string role)
{
    var managesRoles = HostContext.TryResolve<IAuthRepository>() as IManageRoles;
    if (managesRoles != null)
    {
        return managesRoles.HasRole(this.UserAuthId, role);
    }

    return this.Roles != null && this.Roles.Contains(role);
}
```

These APIs are `virtual` so they can be overridden in both your Custom `AuthUserSession`. They default to looking at the `Roles` and `Permissions` collections stored on the Session. These collections are normally sourced from the `AuthUserRepository` when persisting the [UserAuth and UserAuthDetails POCO's](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/UserAuth.cs) and are used to populate the `UserAuthSession` on successful Authentication. These collections can be further customized by AuthProviders which is what `AspNetWindowsAuthProvider` does to add [Authenticated WindowsAuth Roles](https://github.com/ServiceStack/ServiceStack/blob/9773b7fccc31ac4d715a02221f396b46cd14d7db/src/ServiceStack/Auth/AspNetWindowsAuthProvider.cs#L126).

As seen above Roles/Permissions can instead be managed by AuthProviders that implement `IManageRoles` API which is what OrmLiteAuthProvider uses to look at distinct RDBMS tables to validate Roles/Permissions:

### IManageRoles API

The [IManageRoles API](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/IAuthRepository.cs#L26) 
can be implemented by any `IAuthRepository` to provide an alternative strategy for querying and managing Users Roles and permissions. 

This API is being used in the `OrmLiteAuthRepository` to provide an alternative way to store 
Roles and Permission in their own distinct table rather than being blobbed with the rest of the User Auth data. 
You can enable this new behavior by specifying `UseDistinctRoleTables=true` when registering the OrmLiteAuthRepository, e.g:

```csharp
container.Register<IAuthRepository>(c =>
    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()) {
        UseDistinctRoleTables = true,
    });
```

When enabled, roles and permissions are persisted in the distinct **UserAuthRole** table instead of being blobbed on the UserAuth. The `IAuthSession.HasRole()` and `IAuthSession.HasPermission()` on the Users Session should be used to check if a User has a specified Role or Permission.
 
More examples of this are in [ManageRolesTests.cs](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.Common.Tests/ManageRolesTests.cs).

#### CustomValidationFilter

The `CustomValidationFilter` on all AuthProviders lets you add post verification logic after a user has signed in with an OAuth provider and their OAuth metadata is retrieved. The filter lets you return a `IHttpResult` to control what error response is returned, e.g: 

```csharp
new FacebookAuthProvider(appSettings) { 
    CustomValidationFilter = authCtx => CustomIsValid(authCtx) 
        ? authCtx.Service.Redirect(authCtx.Session.ReferrerUrl
            .AddHashParam("f","CustomErrorCode"))
        : null,
}
```

Or could be used to redirect a network or users to a "Not Available in your Area" page with:

```csharp
Plugins.Add(new AuthFeature(..., 
    new IAuthProvider[] {
        new CredentialsAuthProvider {
            CustomValidationFilter = authCtx => 
                authCtx.Request.UserHostAddress.StartsWith("175.45.17")
                    ? HttpResult.Redirect("http://host.com/are-not-available")
                    : null
        }   
    }));
```

#### UserName Validation

The UserName validation for all Auth Repositories are configurable at:

```csharp
Plugins.Add(new AuthFeature(...){
    ValidUserNameRegEx = new Regex(@"^(?=.{3,20}$)([A-Za-z0-9][._-]?)*$", RegexOptions.Compiled),
})
```

Instead of RegEx you can choose to validate using a Custom Predicate. The example below ensures UserNames don't include specific chars:

```csharp
Plugins.Add(new AuthFeature(...){
    IsValidUsernameFn = userName => userName.IndexOfAny(new[] { '@', '.', ' ' }) == -1
})
```

#### AccountLocked Validator

Use `AccountLockedValidator` to override logic to determine when an account is locked, e.g. by default an Account is Locked when it has a `LockedDate` but
can be changed to allow locking accounts at a future date with:

```csharp
new CredentialsAuthProvider {
    AccountLockedValidator = (authRepo, userAuth, tokens) => 
        userAuth.LockedDate != null && userAuth.LockedDate <= DateTime.UtcNow;
}
```

Alternatively if you're using a Custom Auth Provider you can just override `IsAccountLocked()` to override this behavior.


#### Saving Extended OAuth Metadata

The new `SaveExtendedUserInfo` property (enabled by default) on all OAuth providers let you control whether to save the extended OAuth metadata available (into `UserAuthDetails.Items`) when logging in via OAuth.

#### MaxLoginAttempts

The `MaxLoginAttempts` feature lets you lock a User Account after multiple invalid login attempts, e.g:
 
```csharp
Plugins.Add(new AuthFeature(...) {
    MaxLoginAttempts = 5   // Lock user after 5 Invalid attempts
});
```

### Adding AuthProviders with Plugins

Plugins can register AuthProviders by calling `RegisterAuthProvider()` before the `AuthFeature` plugin is registered, which can be achieved in Plugins by having them implement `IPreInitPlugin`:

```csharp
public class MyPlugin : IPreInitPlugin
{
    public void Configure(IAppHost appHost)
    {
        appHost.GetPlugin<AuthFeature>().RegisterAuthProvider(new MyAuthProvider());
    }
}
```

### AuthFilterContext

Auth Providers can customize the `AuthenticateResponse` returned by implementing `IAuthResponseFilter` where 
it will get called back with a populated [AuthFilterContext](https://github.com/ServiceStack/ServiceStack/blob/dfefd50b6ab5f03fce4f6dbbf445ec08150e0cba/src/ServiceStack/Auth/IAuthProvider.cs#L51):

```csharp
public class AuthFilterContext
{
    public AuthenticateService AuthService    // Instance of AuthenticateService
    public IAuthProvider AuthProvider         // Selected Auth Provider for Request
    public IAuthSession Session               // Users Session
    public Authenticate AuthRequest           // Auth Request DTO
    public AuthenticateResponse AuthResponse  // Auth Response DTO
    public bool AlreadyAuthenticated          // User was already authenticated
    public bool DidAuthenticate               // User Authenticated in this request
}
```

The filters can be used to modify properties on the `AuthenticateResponse` DTO or to completely replace what `AuthenticateResponse` is returned, specify a `AuthFeature.AuthResponseDecorator`.

### ICustomUserAuth

The `ICustomUserAuth` interface can be implemented on User Auth Repositories that allow replacing the custom 
`UserAuth` and `UserAuthDetails` tables by returning the concrete Type that should be used instead:

```csharp
public interface ICustomUserAuth
{
    IUserAuth CreateUserAuth();
    IUserAuthDetails CreateUserAuthDetails();
}
```

This allows using the same `RegistrationFeature` and `RegisterService` to handle registering new users
with the substituted `IUserAuth` and `IUserAuthDetails` Types.

#### LoadUserAuthFilter

The LoadUserAuthFilter on `AspNetWindowsAuthProvider` lets you retrieve more detailed information about Windows Authenticated users during Windows Auth Authentication by using the .NET's ActiveDirectory services, e.g:

```csharp
//...
new AspNetWindowsAuthProvider(this) {
    LoadUserAuthFilter = LoadUserAuthInfo
}
//...

public void LoadUserAuthInfo(AuthUserSession userSession, 
    IAuthTokens tokens, Dictionary<string, string> authInfo)
{
    if (userSession == null) return;
    using (PrincipalContext pc = new PrincipalContext(ContextType.Domain))
    {
        var user = UserPrincipal.FindByIdentity(pc, userSession.UserAuthName);
        tokens.DisplayName = user.DisplayName;
        tokens.Email = user.EmailAddress;
        tokens.FirstName = user.GivenName;
        tokens.LastName = user.Surname;
        tokens.FullName = (String.IsNullOrWhiteSpace(user.MiddleName))
            ? $"{user.GivenName} {user.Surname}"
            : $"{user.GivenName} {user.MiddleName} {user.Surname}";
        tokens.PhoneNumber = user.VoiceTelephoneNumber;
    }
}
```

### Customizable PopulateUserRoles on AspNetWindowsAuthProvider

The `AspNetWindowsAuthProvider` uses the public `IPrincipal.IsInRole()` API to determine if a User is in a particular Windows Auth role, however this can be slow when needing to query a large number of roles in LDAP as it would need to make an LDAP lookup for each role. 

Performance of this can now be improved by specifying a custom `PopulateUserRoles` implementation that overrides how User Roles are resolved, e.g:

```csharp
new AspNetWindowsAuthProvider (AppSettings) {
    PopulateUserRoles = (request, user, session) => {
        using (WindowsIdentity userId = request?.LogonUserIdentity)
        {
            List roles = new List();
            if (userId?.Groups != null)
            {
                foreach (var group in userId.Groups)
                {
                    // Remove the domain name from the name of the group, 
                    // if it has it, and you don't need it. 
                    var groupName = new SecurityIdentifier(group.Value)
                        .Translate(typeof(NTAccount)).ToString();
                    if (groupName.Contains("\")) 
                    groupName = groupName.Split('\')[1]; 
                    roles.Add(groupName);
                }
            }
            session.Roles = roles;
        }
    }
}
```

### In Process Authenticated Requests

You can enable the `CredentialsAuthProvider` to allow **In Process** requests to Authenticate without a Password with:

```csharp
new CredentialsAuthProvider {
    SkipPasswordVerificationForInProcessRequests = true,
}
```

When enabled this lets **In Process** Service Requests to login as a specified user without needing to provide their password. 

For example this could be used to create an [Intranet Restricted](/restricting-services) **Admin-Only** Service that lets you login as another user so you can debug their account without knowing their password with:

```csharp
[RequiredRole("Admin")]
[Restrict(InternalOnly=true)]
public class ImpersonateUser 
{
    public string UserName { get; set; }
}

public class MyAdminServices : Service
{
    public object Any(ImpersonateUser request)
    {
        using (var service = base.ResolveService<AuthenticateService>()) //In Process
        {
            return service.Post(new Authenticate {
                provider = AuthenticateService.CredentialsProvider,
                UserName = request.UserName,
                UseTokenCookie = true, // if using JWT
            });
        }
    }
}
```

> Your Services can use the new `Request.IsInProcessRequest()` to identify Services that were executed in-process.

### Custom User Sessions using JWT Tokens

The [JWT Auth Provider](/jwt-authprovider) allows for a more flexible approach to impersonating users as they allow
[Manually creating JWT Tokens](/jwt-authprovider#creating-jwt-tokens-manually) to construct a custom User Session with Custom metadata, 
Roles and Permissions.

### IAuthMetadataProvider

An IAuthMetadataProvider provides a way to customize the authInfo in all AuthProviders. It also allows overriding of how extended Auth metadata like profileUrl is returned.

```csharp
public interface IAuthMetadataProvider
{
   void AddMetadata(IAuthTokens tokens, Dictionary<string,string> authInfo);

   string GetProfileUrl(IAuthSession authSession, string defaultUrl = null);
}
```

> To override with a custom implementation, register `IAuthMetadataProvider` in the IOC

### PBKDF2 Password Hashing implementation

ServiceStack uses the same [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) password hashing algorithm ASP.NET Identity v3 by default for both new users and successful authentication logins where their password will automatically be re-hashed with the new implementation.

This also means if you wanted to switch, you'll be able to import ASP.NET Identity v3 User Accounts and their Password Hashes into ServiceStack.Auth's `UserAuth` tables and vice-versa.

#### Retain previous Password Hashing implementation

If preferred you can revert to using the existing `SaltedHash` implementation with:

```csharp
SetConfig(new HostConfig { 
    UseSaltedHash = true
});
```

This also supports "downgrading" passwords that were hashed with the new `IPasswordHasher` provider where it will revert to using the older/weaker `SaltedHash` implementation on successful authentication.

#### Override Password Hashing Strength

The new [PasswordHasher](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Auth/PasswordHasher.cs) implementation can also be made to be computationally stronger or weaker by adjusting the iteration count (default 10000), e.g:

```csharp
container.Register<IPasswordHasher>(new PasswordHasher(1000));
```

#### Versionable Password Hashing

The new [IPasswordHasher](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Auth/IPasswordHasher.cs) interface includes support for versioning future Password Hashing algorithms and rehashing:

```csharp
public interface IPasswordHasher
{
    // First byte marker used to specify the format used. The default implementation uses format:
    // { 0x01, prf (UInt32), iter count (UInt32), salt length (UInt32), salt, subkey }
    byte Version { get; }

    // Returns a boolean indicating whether the providedPassword matches the hashedPassword
    // The needsRehash out parameter indicates whether the password should be re-hashed.
    bool VerifyPassword(string hashedPassword, string providedPassword, out bool needsRehash);

    // Returns a hashed representation of the supplied password
    string HashPassword(string password);
}
```

Which is implemented in all ServiceStack Auth Repositories where it will rehash passwords that used a different version or weaker strength, by utilizing the new API for verifying passwords:

```csharp
if (userAuth.VerifyPassword(password, out var needsRehash))
{
    this.RecordSuccessfulLogin(userAuth, needsRehash, password);
    return true;
}
```

If you're using a Custom Auth Repository it will need to use the new password verification APIs, please refer to [OrmLiteAuthRepository](https://github.com/ServiceStack/ServiceStack/blob/bed1d900de93f889cca05299df4c33a04b7ad7a7/src/ServiceStack.Server/Auth/OrmLiteAuthRepository.cs#L325-L359) for a complete concrete example.

#### Fallback PasswordHashers

The list of `Config.FallbackPasswordHashers` can be used for migrating to a new Password Hashing algorithm by registering older Password Hashing implementations that were previously used to hash Users passwords. Failed password verifications will fallback to see if the password was hashed with any of the registered `FallbackPasswordHashers`, if any are valid, the password attempt will succeed and the password re-hashed with the registered `IPasswordHasher` implementation.

### Digest Auth Hashes only created when needed

Digest Auth Hashes are only populated if the `DigestAuthProvider` is registered. If you ever intend to support Digest access authentication in future but don't want to register the DigestAuthProvider just yet, you can force ServiceStack to continue to maintain Digest Auth Hashes with:

```csharp
new AuthFeature {
    CreateDigestAuthHashes = true
}
```

Users that don't have Digest Auth Hashes will require logging in again in order to have it populated. If you don't intend to use Digest Auth you can clear the `DigestHa1Hash` column in your `UserAuth` table which is otherwise unused.

### Generate New Session Cookies on Authentication 

The AuthFeature also regenerates new Session Cookies each time users login, this behavior can be disabled with:

```csharp
Plugins.Add(new AuthFeature(...) {
    GenerateNewSessionCookiesOnAuthentication = false
});
```

### ClientId and ClientSecret OAuth Config Aliases
 
OAuth Providers can use `ClientId` and `ClientSecret` aliases instead of `ConsumerKey` and `ConsumerSecret`, e.g:

```xml 
<appSettings>
    <add key="oauth.twitter.ClientId" value="..." />
    <add key="oauth.twitter.ClientSecret" value="..." />
</appSettings>
```

### Override Authorization HTTP Header

Request Filters can override the Authorization HTTP Header used in Auth Providers with:

```csharp
httpReq.Items[Keywords.Authorization] = $"Bearer {token}";
```

### GET Authenticate Requests are disabled by default

**GET** `/auth/{provider}` requests are disabled by default to discourage sending confidential information in the URL.

The current exceptions which still allow **GET** requests include:

 - `/auth` - Used to check if a User is Authenticated
 - `/auth/logout` - Logging Out
 - All OAuth Providers who starts their OAuth flow by navigating to `/auth/{provider}`

You can allow **GET** Authentication requests with:

```csharp
new AuthFeature {
    AllowGetAuthenticateRequests = req => true
}
```

Although it's recommended to change your code to use `POST` instead of `GET` requests. 
Otherwise you can use the `IRequest req` parameter to check against a white list of known requests types.


<a name="community"></a>

# Community Resources

  - [Using IdentityServer 4 with ServiceStack and Angular](http://estynedwards.com/blog/2016/01/30/ServiceStack-IdentityServer-Angular/) by [@estynedwards](https://twitter.com/estynedwards)
  - [Adding Facebook Authentication using ServiceStack](http://buildclassifieds.com/2016/01/14/facebookauth/) by [@markholdt](https://twitter.com/markholdt)
  - [How to return JSV formatted collection types from SQL Server in OrmLite](http://blog.falafel.com/Blogs/adam-anderson/2013/10/28/how-to-return-jsv-formatted-collection-types-from-sql-server-to-servicestack.ormlite) by [AdamAnderson](http://blog.falafel.com/blogs/AdamAnderson)
  - [How to migrate ASP.NET Membership users to ServiceStack](http://blog.falafel.com/Blogs/adam-anderson/2013/10/23/how-to-migrate-asp.net-membership-users-to-servicestack) by [AdamAnderson](http://blog.falafel.com/blogs/AdamAnderson)
  - [Authentication in ServiceStack REST Services](http://www.binaryforge-software.com/wpblog/?p=242) by [@binaryforge](https://twitter.com/binaryforge)
  - [Building a ServiceStack OAuth2 resource server using DotNetOpenAuth](http://dylanbeattie.blogspot.com/2013/08/building-servicestack-based-oauth2.html) by [@dylanbeattie](https://twitter.com/dylanbeattie)
  - [Declarative authorization in REST services in SharePoint with F#](http://sergeytihon.wordpress.com/2013/06/28/declarative-authorization-in-rest-services-in-sharepoint-with-f-and-servicestack/) by [@sergey_tihon](https://twitter.com/sergey_tihon)
  - [Authenticate ServiceStack services against an Umbraco membership provider](http://stackoverflow.com/a/16845317/85785) by [Gavin Faux](http://stackoverflow.com/users/1664508/gavin-faux)
  - [Using OAuth with ArcGIS Online and ServiceStack](http://davetimmins.com/post/2013/april/oauth-with-arcgisonline-servicestack) by [@davetimmins](https://twitter.com/davetimmins)
  - [LinkedIn Provider for ServiceStack Authentication](http://www.binoot.com/2013/03/30/linkedin-provider-for-servicestack-authentication/) by [@binu_thayamkery](https://twitter.com/binu_thayamkery)
  - [A Step by Step guide to create a Custom IAuthProvider](http://enehana.nohea.com/general/customizing-iauthprovider-for-servicestack-net-step-by-step/) by [@rngoodness](https://twitter.com/rngoodness)
  - [Simple API Key Authentication With ServiceStack](http://rossipedia.com/blog/2013/03/simple-api-key-authentication-with-servicestack/) by [@rossipedia](https://twitter.com/rossipedia)
  - [CORS BasicAuth on ServiceStack with custom authentication](http://joeriks.com/2013/01/12/cors-basicauth-on-servicestack-with-custom-authentication/) by [@joeriks](https://twitter.com/joeriks)
  - [Authenticating ServiceStack REST API using HMAC](https://www.jokecamp.com/blog/authenticating-servicestack-rest-api-using-hmac/) by [@jokecamp](https://twitter.com/jokecamp)
  - ServiceStack Credentials Authentication and EasyHttp: [Part 1](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/servicestack-credentialsauthentication-and-easyhtpp-of), [Part 2](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/servicestack-credentialsauthentication-and-easyhtpp-of-1), [Part 3](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/servicestack-credentialsauthentication-and-easyhtpp-of-2) by [@chrissie1](https://twitter.com/chrissie1)
