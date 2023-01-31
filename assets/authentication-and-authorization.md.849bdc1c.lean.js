import{_ as t,o as e,c as o,d as n,b as s,a}from"./app.bc89fa0e.js";const R='{"title":"Authentication and Authorization","description":"","frontmatter":{"slug":"authentication-and-authorization","title":"Authentication and Authorization"},"headers":[{"level":3,"title":"Highly customizable and versatile","slug":"highly-customizable-and-versatile"},{"level":3,"title":"High Level Overview","slug":"high-level-overview"},{"level":3,"title":"Credentials Auth Providers","slug":"credentials-auth-providers"},{"level":3,"title":"OAuth Providers","slug":"oauth-providers"},{"level":3,"title":"Session Authentication Overview","slug":"session-authentication-overview"},{"level":3,"title":"Authentication per Request Auth Providers","slug":"authentication-per-request-auth-providers"},{"level":3,"title":"Integrated ASP.NET Core Authentication","slug":"integrated-asp-net-core-authentication"},{"level":3,"title":"Community Auth Providers","slug":"community-auth-providers"},{"level":3,"title":"Basic Configuration","slug":"basic-configuration"},{"level":3,"title":"OAuth Configuration","slug":"oauth-configuration"},{"level":3,"title":"Auth Repository","slug":"auth-repository"},{"level":3,"title":"Session Persistence","slug":"session-persistence"},{"level":3,"title":"AuthSecret Admin Session","slug":"authsecret-admin-session"},{"level":3,"title":"Embedded Login Page","slug":"embedded-login-page"},{"level":2,"title":"World Validation","slug":"world-validation"},{"level":2,"title":"Project Templates","slug":"project-templates"},{"level":2,"title":"Live Demos","slug":"live-demos"},{"level":3,"title":".NET Core","slug":"net-core"},{"level":3,"title":"Mobile","slug":"mobile"},{"level":3,"title":".NET Framework","slug":"net-framework"},{"level":2,"title":"Custom authentication and authorization","slug":"custom-authentication-and-authorization"},{"level":3,"title":"Logout","slug":"logout"},{"level":3,"title":"Authenticating with .NET Service Clients","slug":"authenticating-with-net-service-clients"},{"level":3,"title":"Authenticating with HTTP","slug":"authenticating-with-http"},{"level":3,"title":"Authentication via OAuth AccessTokens","slug":"authentication-via-oauth-accesstokens"},{"level":3,"title":"User Sessions Cache","slug":"user-sessions-cache"},{"level":2,"title":"Declarative Validation Attributes","slug":"declarative-validation-attributes"},{"level":3,"title":"Authorization Attributes","slug":"authorization-attributes"},{"level":2,"title":"The Authenticate attribute","slug":"the-authenticate-attribute"},{"level":2,"title":"RequiredRole and RequiredPermission attributes","slug":"requiredrole-and-requiredpermission-attributes"},{"level":2,"title":"Enabling Authentication at different levels","slug":"enabling-authentication-at-different-levels"},{"level":3,"title":"Using the [Authenticate] Attribute","slug":"using-the-authenticate-attribute"},{"level":3,"title":"Using a Global Request Filter","slug":"using-a-global-request-filter"},{"level":2,"title":"Customizing AuthProviders","slug":"customizing-authproviders"},{"level":3,"title":"Adding AuthProviders with Plugins","slug":"adding-authproviders-with-plugins"},{"level":3,"title":"Auth Response Filter","slug":"auth-response-filter"},{"level":3,"title":"ICustomUserAuth","slug":"icustomuserauth"},{"level":3,"title":"Customizable PopulateUserRoles on AspNetWindowsAuthProvider","slug":"customizable-populateuserroles-on-aspnetwindowsauthprovider"},{"level":3,"title":"In Process Authenticated Requests","slug":"in-process-authenticated-requests"},{"level":3,"title":"Custom User Sessions using JWT Tokens","slug":"custom-user-sessions-using-jwt-tokens"},{"level":3,"title":"IAuthMetadataProvider","slug":"iauthmetadataprovider"},{"level":3,"title":"Generate New Session Cookies on Authentication","slug":"generate-new-session-cookies-on-authentication"},{"level":3,"title":"ClientId and ClientSecret OAuth Config Aliases","slug":"clientid-and-clientsecret-oauth-config-aliases"},{"level":3,"title":"Override Authorization HTTP Header","slug":"override-authorization-http-header"},{"level":3,"title":"GET Authenticate Requests are disabled by default","slug":"get-authenticate-requests-are-disabled-by-default"}],"relativePath":"authentication-and-authorization.md"}',p={},c=n("p",null,[s("Built into ServiceStack is a simple and extensible Authentication Model that implements standard HTTP Session Authentication where "),n("a",{href:"/sessions"},"Session Cookies"),s(" are used to send Authenticated Requests which reference Users Custom UserSession POCO's in your App's registered "),n("a",{href:"/caching"},"Caching Provider"),s(".")],-1),i=n("p",null,[s('ServiceStack also includes a number of Auth Providers which "Authenticate per-request" in this case the Authenticated User Session is only attached to and lasts during the lifetime of the current '),n("code",null,"IRequest"),s(". The implementation details of each Auth Provider are transparent to your Application where the same Attributes and APIs are used to retrieve, validate, authenticate and authorize Users.")],-1),r=n("p",null,[s("ServiceStack's Authentication support is encapsulated in the optional "),n("code",null,"AuthFeature"),s(" plugin which provides an easy way to declaratively register and configure multiple Auth Providers you want to allow in your Application. It's highly configurable with a number of additional features like whether to enable built-in Registration for Registering new Users as well as Assign/UnAssign Roles Services that Admins can use to assign Roles/Permissions to existing users.")],-1),u=n("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/XKq7TkZAzeg",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""},null,-1),l=a("",14),d=n("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/aQqF3Sf2fco",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""},null,-1),k=a("",18),h=n("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/NTCUT7atoLo",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""},null,-1),g=a("",46),m=n("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-800"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[n("p",null,"x new web ProjectName")])]),n("div",{class:"flex"},[n("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),v=n("p",null,[s("By "),n("a",{href:"/mix-tool#mix-in-auth-repository"},"mixing in your desired auth"),s(" features, e.g. to configure your App to enable auth & maintain in SQL Server run:")],-1),w=n("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-800"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[n("p",null,"x mix auth auth-db sqlserver")])]),n("div",{class:"flex"},[n("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),A=a("",164),b=[c,i,r,u,l,d,k,h,g,m,v,w,A];function f(y,S,q,P,T,C){return e(),o("div",null,b)}var _=t(p,[["render",f]]);export{R as __pageData,_ as default};
