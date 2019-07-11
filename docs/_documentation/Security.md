---
slug: security
title: Security Overview
---

## Authentication

See the [Authentication and Authorization](/authentication-and-authorization) docs to learn about Authentication in ServiceStack which
is encompassed by the high-level Overview:

![Authentication Overview](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-highlevel-overview.svg?sanitize=true)

ServiceStack uses a standard HTTP Session implementation which uses an **Auth Repository** to persist users and a [Caching Provider](/caching) to 
store Authenticated User Sessions:

![Session Based Authentication](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-session-auth.svg?sanitize=true)

Once Authentication is established [Session Cookies](/sessions) are used to reference a Users typed Authenticated User Session:

![Session Requests](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-session-requests.svg?sanitize=true)

ServiceStack also supports Auth Providers that "Authenticate per request" where both Authentication and Validation are performed within the same request:

![Auth with Request Auth Providers](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/security/auth-auth-with-request-providers.svg?sanitize=true)

## Auth Providers

ServiceStack's built-in Auth Providers fall into 3 main categories:

### Credentials Auth Providers

If using ServiceStack to manage your Apps entire Authentication and persistence of Users you would use one of the available Auth Repositories
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

### IAuthWithRequest Auth Providers

The following Auth Providers all implement `IAuthWithRequest` and "Authenticate per-request":

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

Other special Auth Providers that Authenticate per-request:

 - **Windows Auth** in `AspNetWindowsAuthProvider`  - Authentication using [Windows Auth](https://support.microsoft.com/en-us/help/323176/how-to-implement-windows-authentication-and-authorization-in-asp-net) built into ASP.NET.
 - **Claims Auth** in `NetCoreIdentityAuthProvider` - Pass through Auth Provider that delegates to ASP.NET Core Identity Auth or Identity Server.

Additional documentation for specific Auth Providers:

  - [JWT Auth Provider](/jwt-authprovider)
  - [API Key Auth Provider](/api-key-authprovider)
  - [Open Id 2.0 Support](/openid)     

## ASP.NET Core Project Templates with integrated Auth 

  - [Using ServiceStack Auth in MVC](/authentication-identity-servicestack) - using the [mvcauth](https://github.com/NetCoreTemplates/mvcauth) project template
  - [Using ASP.NET Identity Auth](/authentication-identity-aspnet) - using the [mvcidentity](https://github.com/NetCoreTemplates/mvcidentity) project template
  - [Using IdentityServer4 Auth](/authentication-identityserver) - using the [mvcidentityserver](https://github.com/NetCoreTemplates/mvcidentityserver) project template

## [World Validation](/world-validation)

See the annotated [World Validation Docs](/world-validation) for a detailed walks through and showcases the implementation 
of how the most popular **Server HTML rendered** approaches and **Client UI rendered** technologies use the same Authentication and Registration Services.

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


## Sessions

See the [Session docs](/sessions) for more info about customizing Sessions and handling different Session and Auth events.

### Restricting Services

See the [Restricting Services docs](/restricting-services) for learning how to control the Visibility and Access restrictions on any service using the `[Restrict]` attribute. 


<a name="community"></a>

# Community Resources

  - [Building a ServiceStack OAuth2 resource server using DotNetOpenAuth](http://dylanbeattie.blogspot.com/2013/08/building-servicestack-based-oauth2.html) by [@dylanbeattie](https://twitter.com/dylanbeattie)
  - [Declarative authorization in REST services in SharePoint with F#](http://sergeytihon.wordpress.com/2013/06/28/declarative-authorization-in-rest-services-in-sharepoint-with-f-and-servicestack/) by [@sergey_tihon](https://twitter.com/sergey_tihon)
  - [Authenticate ServiceStack services against an Umbraco membership provider](http://stackoverflow.com/a/16845317/85785) by [Gavin Faux](http://stackoverflow.com/users/1664508/gavin-faux)
  - [Using OAuth with ArcGIS Online and ServiceStack](http://davetimmins.com/2013/April/OAuth-with-ArcGISOnline-ServiceStack/) by [@davetimmins](https://twitter.com/davetimmins)
  - [LinkedIn Provider for ServiceStack Authentication](http://www.binoot.com/2013/03/30/linkedin-provider-for-servicestack-authentication/) by [@binu_thayamkery](https://twitter.com/binu_thayamkery)
  - [A Step by Step guide to create a Custom IAuthProvider](http://enehana.nohea.com/general/customizing-iauthprovider-for-servicestack-net-step-by-step/) by [@rngoodness](https://twitter.com/rngoodness)
  - [Simple API Key Authentication With ServiceStack](http://rossipedia.com/blog/2013/03/simple-api-key-authentication-with-servicestack/) by [@rossipedia](https://twitter.com/rossipedia)
  - [Authenticating ServiceStack REST API using HMAC](http://jokecamp.wordpress.com/2012/12/16/authenticating-servicestack-rest-api-using-hmac/) by [@jokecamp](https://twitter.com/jokecamp)
  - ServiceStack Credentials Authentication and EasyHttp: [Part 1](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/servicestack-credentialsauthentication-and-easyhtpp-of), [Part 2](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/servicestack-credentialsauthentication-and-easyhtpp-of-1), [Part 3](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/servicestack-credentialsauthentication-and-easyhtpp-of-2) by [@chrissie1](https://twitter.com/chrissie1)
