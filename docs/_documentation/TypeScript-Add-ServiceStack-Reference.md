---
slug: typescript-add-servicestack-reference
title: TypeScript Add ServiceStack Reference
---

![ServiceStack and TypeScript Banner](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/servicestack-heart-typescript.png)

ServiceStack's **Add ServiceStack Reference** feature allows clients to generate Native Types from directly within VS.NET using [ServiceStackVS VS.NET Extension](/create-your-first-webservice) - providing a simple way to give clients typed access to your ServiceStack Services.

### First class development experience

[TypeScript](https://www.typescriptlang.org/) has become a core part of our overall recommended solution 
for Web Apps that's integrated into all ServiceStackVS's 
[React and Aurelia Single Page App VS.NET Templates](https://github.com/ServiceStack/ServiceStackVS) 
offering a seamless development experience with access to advanced ES6 features like modules, classes 
and arrow functions whilst still being able to target most web browsers with its down-level ES5 support. 
TypeScript also goes beyond ES6 with optional Type Annotations enabling better tooling support and compiler 
type feedback than what's possible in vanilla ES6 - invaluable when scaling large JavaScript codebases.

### Ideal Typed Message-based API

The TypeScript `JsonServiceClient` available in the 
[@servicestack/client npm package](https://www.npmjs.com/package/@servicestack/client) enables the same 
productive, typed API development experience available in our other 1st-class supported client platforms. 

ServiceStack embeds additional type hints in each Request DTO in order to achieve the ideal typed, 
message-based API. You can see an example of this is below which shows how to create a C# Gist in 
[Gislyn](http://gistlyn.com) after adding a ServiceStack Reference to `gistlyn.com` and installing the 
[@servicestack/client](https://www.npmjs.com/package/@servicestack/client) npm package: 

```ts
import { JsonServiceClient } from 'servicestack-client';
import { StoreGist, GithubFile } from './Gistlyn.dtos';

var client = new JsonServiceClient("http://gistlyn.com");

var request = new StoreGist();
var file = new GithubFile();
file.filename = "main.cs";
file.content = 'var greeting = "Hi, from TypeScript!";';
request.files = { [file.filename]: file };

try {
    var r = await client.post(request); // r:StoreGistResponse
    console.log(`New C# Gist was created with id: ${r.gist}`);
    location.href = `http://gistlyn.com?gist=${r.gist}`;
} catch (e) {
    console.log("Failed to create Gist: ", e.responseStatus);
}
```

Where the `r` param in the returned `then()` Promise callback is typed to `StoreGistResponse` DTO Type.

## TypeScript ServiceClient

The `@servicestack/client` is a clean "jQuery-free" implementation based on JavaScript's new 
[Fetch API standard](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), 
utilizing the [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) implementation
so it can be used in both JavaScript client web apps as well as node.js server projects.

### [@servicestack/client](https://www.npmjs.com/package/@servicestack/client)

The easiest way to use TypeScript with ServiceStack is to start with one of 
[ServiceStackVS TypeScript projects](https://github.com/ServiceStack/ServiceStackVS). 

Other TypeScript or ES6 projects can install `@servicestack/client` from npm with:

    npm install --save @servicestack/client

#### Enabling TypeScript async/await 

To make API requests using TypeScript's async/await feature you'll need to create a TypeScript `tsconfig.json` config file that imports ES6 promises and W3C fetch definitions with:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": [ "es2015", "dom" ]
  }
}
```

The W3C `fetch` definitions are built into TypeScript **2.3+**, if using older versions of TypeScript they can be installed with:

    npm install --save-dev @types/whatwg-fetch

### TypeScript Ambient Interface Definitions or Concrete Types

You can get both concrete types and interface definitions for your Services at the following routes:

  - [/types/typescript](http://techstacks.io/types/typescript) - for generating concrete types
  - [/types/typescript.d](http://techstacks.io/types/typescript.d) - for generating ambient interface definitions

## Simple command-line utilities for TypeScript

The [@servicestack/cli](https://github.com/ServiceStack/servicestack-cli) npm package lets you quickly and easily Add and Update ServiceStack References via a simple `typescript-ref` command-line utility.

### Installation

Prerequisites: Node.js (>=4.x, 6.x preferred), npm version 3+.

    $ npm install -g @servicestack/cli

### Adding a ServiceStack Reference

To Add a TypeScript ServiceStack Reference just call `typescript-ref` with the URL of a remote ServiceStack instance:

    $ typescript-ref http://techstacks.io

Result:

    Saved to: techstacks.dtos.ts

Calling `typescript-ref` with just a URL will save the DTOs using the Host name, you can override this by specifying a FileName as the 2nd argument:

    $ typescript-ref http://techstacks.io Tech

Result:

    Saved to: Tech.dtos.ts

### Updating a ServiceStack Reference

To Update an existing ServiceStack Reference, call `typescript-ref` with the Filename:

    $ typescript-ref techstacks.dtos.ts

Result:

    Updated: techstacks.dtos.ts

Which will update the File with the latest TypeScript Server DTOs from [techstacks.io](http://techstacks.io). You can also customize how DTOs are generated by uncommenting the [TypeScript DTO Customization Options](http://docs.servicestack.net/typescript-add-servicestack-reference#dto-customization-options) and updating them again.

### Updating all TypeScript DTOs

Calling `typescript-ref` without any arguments will update all TypeScript DTOs in the current directory:

    $ typescript-ref

Result:

    Updated: Tech.dtos.ts
    Updated: techstacks.dtos.ts

To make it more wrist-friendly you can also use the shorter `ts-ref` alias instead of `typescript-ref`.

## Add TypeScript Reference

The easiest way to 
[Add a ServiceStack Reference](](/add-servicestack-reference)) 
to your project is to **right-click** on a folder to bring up 
[ServiceStackVS's](/create-your-first-webservice)
VS.NET context-menu item, then click on `Add -> TypeScript Reference...`. This opens a dialog where you can 
add the url of the ServiceStack instance you want to typed DTO's for, as well as the name of the DTO source 
file that's added to your project.

![Add ServiceStack Reference](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackvs/add-typescript-reference-js.png)

After clicking OK, the servers DTO's are added to the project, yielding an instant typed API:

![TypeScript native types](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackvs/add-typescript-reference-dtos.png)

### Update ServiceStack Reference

If your server has been updated and you want to update the client DTOs, simply **right-click** on the DTO file 
within VS.NET and select **Update ServiceStack Reference** for **ServiceStackVS** to download a fresh update. 

### TypeScript Reference Example

Lets walk through a simple example to see how we can use ServiceStack's TypeScript DTO annotations in our 
JavaScript clients. Firstly we'll need to add a TypeScript Reference to the remote ServiceStack Service by 
**right-clicking** on your project and clicking on `Add > TypeScript Reference...` 
(as seen in the above screenshot).

This will import the remote Services dtos into your local project which looks similar to:

```ts
/* Options:
Date: 2016-08-11 22:23:24
Version: 4.061
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://techstacks.io

//GlobalNamespace: 
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/

// @Route("/technology/{Slug}")
export class GetTechnology implements IReturn<GetTechnologyResponse>
{
    Slug: string;
    createResponse() { return new GetTechnologyResponse(); }
    getTypeName() { return "GetTechnology"; }
}

export class GetTechnologyResponse
{
    Created: string;
    Technology: Technology;
    TechnologyStacks: TechnologyStack[];
    ResponseStatus: ResponseStatus;
}
```

In keeping with idiomatic style of local `.ts` sources, generated types are not wrapped within a module 
by default. This lets you reference the types you want directly using normal import destructuring syntax:

```ts
import { GetTechnology, GetTechnologyResponse } from './dtos';
```

Or import all Types into your preferred variable namespace with:

```ts
import * as dtos from './dtos';

const request = new dtos.GetTechnology();
```

Or if preferred, you can instead have the types declared in a module by specifying a `GlobalNamespace`:

```ts
/* Options:
...

GlobalNamespace: dtos
*/
```

Looking at the types we'll notice the DTO's are plain TypeScript Types with any .NET attributes 
added in comments using AtScript's proposed 
[meta-data annotations format](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/mobilebasic?viewopt=127). 
This lets you view helpful documentation about your DTO's like the different custom routes available 
for each Request DTO.

By default DTO properties are optional but can be made a required field by annotating the .NET property 
with the `[Required]` attribute or by uncommenting `MakePropertiesOptional: False` in the header comments 
which instead defaults to using required properties.

Properties always reflect to match the remote servers JSON Serialization configuration, 
i.e. will use **camelCase** properties when the `AppHost` is configured with:

```csharp
JsConfig.Init(new Config { TextCase = TextCase.CamelCase });
```

### Making Typed API Requests

Making API Requests in TypeScript is the same as all other
[ServiceStack's Service Clients](/clients-overview)
by sending a populated Request DTO using a `JsonServiceClient` which returns typed Response DTO.

So the only things we need to make any API Request is the `JsonServiceClient` from the `@servicestack/client` 
package and any DTO's we're using from generated TypeScript ServiceStack Reference, e.g:

```ts
import { JsonServiceClient } from '@servicestack/client';
import { GetTechnology } from './dtos';

const client = new JsonServiceClient("http://techstacks.io");

const request = new GetTechnology();
request.Slug = "ServiceStack";

var r = await client.get(request);  // typed to GetTechnologyResponse
cont tech = r.Technology;           // typed to Technology

console.log(`${tech.Name} by ${tech.VendorName} (${tech.ProductUrl})`);
console.log(`${tech.Name} TechStacks:`, r.TechnologyStacks);
```

### Partial Constructors

All TypeScript Reference DTOs also includes support for **Partial Constructors**
making them much nicer to populate using object initializer syntax we're used to in C#, so instead of:

```ts
const request = new Authenticate();
request.provider = 'credentials'
request.userName = this.userName;
request.password = this.password;
request.rememberMe = this.rememberMe;
const response = await client.post(request);
```

You can populate DTOs with object literal syntax without any loss of TypeScript's Type Safety benefits:

```ts
const response = await client.post(new Authenticate({
    provider: 'credentials',
    userName: this.userName,
    password: this.password,
    rememberMe: this.rememberMe,
}));
```

### Sending additional arguments with Typed API Requests

Many AutoQuery Services utilize [implicit conventions](/autoquery-rdbms#implicit-conventions) to 
query fields that aren't explicitly defined on AutoQuery Request DTOs, these can be queried by specifying
additional arguments with the typed Request DTO, e.g:

```ts
const request = new FindTechStacks();

var r = client.get(request, { VendorName: "ServiceStack" }); // typed to QueryResponse<TechnologyStack>
```

### Making API Requests with URLs

In addition to making Typed API Requests you can also call Services using relative or absolute urls, e.g:

```ts
client.get<GetTechnologyResponse>("/technology/ServiceStack")

client.get<GetTechnologyResponse>("http://techstacks.io/technology/ServiceStack")

// http://techstacks.io/technology?Slug=ServiceStack
client.get<GetTechnologyResponse>("/technology", { Slug: "ServiceStack" }) 
```

as well as POST Request DTOs to custom urls:

```ts
client.postToUrl("/custom-path", request, { Slug: "ServiceStack" });

client.putToUrl("http://example.org/custom-path", request);
```

### Raw Data Responses

The `JsonServiceClient` also supports Raw Data responses like `string` and `byte[]` which also get a Typed API 
once declared on Request DTOs using the `IReturn<T>` marker:

```csharp
public class ReturnString : IReturn<string> {}
public class ReturnBytes : IReturn<byte[]> {}
```

Which can then be accessed as normal, with their Response typed to a JavaScript `string` or `Uint8Array` for 
raw `byte[]` responses:

```ts
let str:string = await client.get(new ReturnString());

let data:Uint8Array = await client.get(new ReturnBytes());
```

### Authenticating using Basic Auth

Basic Auth support is implemented in `JsonServiceClient` and follows the same API made available in the C# 
Service Clients where the `userName/password` properties can be set individually, e.g:

```ts
var client = new JsonServiceClient(baseUrl);
client.userName = user;
client.password = pass;

const response = await client.get(new SecureRequest());
```

Or use `client.setCredentials()` to have them set both together.

### Authenticating using Credentials

Alternatively you can authenticate using userName/password credentials by 
[adding a TypeScript Reference](http://docs.servicestack.net/typescript-add-servicestack-reference#add-typescript-reference) 
to your remote ServiceStack Instance and sending a populated `Authenticate` Request DTO, e.g:

```ts
let request = new Authenticate();
request.provider = "credentials";
request.userName = userName;
request.password = password;
request.rememberMe = true;

const response = await client.post(request);
```

This will populate the `JsonServiceClient` with 
[Session Cookies](http://docs.servicestack.net/sessions#cookie-session-ids) 
which will transparently be sent on subsequent requests to make authenticated requests.

### Authenticating using JWT

Use the `bearerToken` property to Authenticate with a [ServiceStack JWT Provider](http://docs.servicestack.net/jwt-authprovider) using a JWT Token:

```ts
client.bearerToken = jwtToken;
```

Alternatively you can use a [Refresh Token](http://docs.servicestack.net/jwt-authprovider#refresh-tokens) instead:

```ts
client.refreshToken = refreshToken;
```

### Authenticating using an API Key

Use the `bearerToken` property to Authenticate with an [API Key](http://docs.servicestack.net/api-key-authprovider):

```ts
client.bearerToken = apiKey;
```

### Transparently handle 401 Unauthorized Responses

If the server returns a 401 Unauthorized Response either because the client was Unauthenticated or the 
configured Bearer Token or API Key used had expired or was invalidated, you can use `onAuthenticationRequired`
callback to re-configure the client before automatically retrying the original request, e.g:

```ts
client.onAuthenticationRequired = async () => {
    const authClient = new JsonServiceClient(authBaseUrl);
    authClient.userName = userName;
    authClient.password = password;
    const response = await authClient.get(new Authenticate());
    client.bearerToken = response.bearerToken;
};

//Automatically retries requests returning 401 Responses with new bearerToken
var response = await client.get(new Secured());
```

### Automatically refresh Access Tokens

With the [Refresh Token support in JWT](http://docs.servicestack.net/jwt-authprovider#refresh-tokens) 
you can use the `refreshToken` property to instruct the Service Client to automatically fetch new 
JWT Tokens behind the scenes before automatically retrying failed requests due to invalid or expired JWTs, e.g:

```ts
//Authenticate to get new Refresh Token
const authClient = new JsonServiceClient(authBaseUrl);
authClient.userName = userName;
authClient.password = password;
const authResponse = await authClient.get(new Authenticate());

//Configure client with RefreshToken
client.refreshToken = authResponse.RefreshToken;

//Call authenticated Services and clients will automatically retrieve new JWT Tokens as needed
const response = await client.get(new Secured());
```

Use the `refreshTokenUri` property when refresh tokens need to be sent to a different ServiceStack Server, e.g:

```ts
client.refreshToken = refreshToken;
client.refreshTokenUri = authBaseUrl + "/access-token";
```

## DTO Customization Options 

In most cases you'll just use the generated TypeScript DTO's as-is, however you can further customize how
the DTO's are generated by overriding the default options.

The header in the generated DTO's show the different options TypeScript native types support with their 
defaults. Default values are shown with the comment prefix of `//`. To override a value, remove the `//` 
and specify the value to the right of the `:`. Any uncommented value will be sent to the server to override 
any server defaults.

The DTO comments allows for customizations for how DTOs are generated. The default options that were used 
to generate the DTO's are repeated in the header comments of the generated DTOs, options that are preceded 
by a TypeScript comment `//` are defaults from the server, any uncommented value will be sent to the server 
to override any server defaults.

```ts
/* Options:
Date: 2018-05-01 08:09:43
Version: 5.10
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: https://www.techstacks.io

//GlobalNamespace: 
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/
```

We'll go through and cover each of the above options to see how they affect the generated DTO's:

### Change Default Server Configuration

The above defaults are also overridable on the ServiceStack Server by modifying the default config on the 
`NativeTypesFeature` Plugin, e.g:

```csharp
//Server example in CSharp
var nativeTypes = this.GetPlugin<NativeTypesFeature>();
nativeTypes.MetadataTypesConfig.GlobalNamespace = "dtos";
...
```

We'll go through and cover each of the above options to see how they affect the generated DTO's:

### GlobalNamespace

Changes the name of the module that contain the generated TypeScript definitions:

```ts
declare module dtos
{
    ...
}
```

### ExportAsTypes

Changes whether types should be generated as ambient interface definitions or exported as concrete Types:

```ts
module dtos
{
    export interface IReturnVoid
    {
    }
    ...
}
```

### MakePropertiesOptional

Changes whether the default of whether each property is optional or not:

```ts
interface Answer
{
    AnswerId: number;
    Owner: User;
    IsAccepted: boolean;
    Score: number;
    LastActivityDate: number;
    LastEditDate: number;
    CreationDate: number;
    QuestionId: number;
}
```

### AddResponseStatus

Automatically add a `ResponseStatus` property on all Response DTO's, regardless if it wasn't already defined:

```ts
interface GetAnswers extends IReturn<GetAnswersResponse>
{
    ...
    ResponseStatus: ResponseStatus;
}
```

### AddImplicitVersion

Lets you specify the Version number to be automatically populated in all Request DTO's sent from the client: 

```ts
interface GetAnswers extends IReturn<GetAnswersResponse>
{
    Version: number; //1
    ...
}
```

This lets you know what Version of the Service Contract that existing clients are using making it easy 
to implement ServiceStack's [recommended versioning strategy](http://stackoverflow.com/a/12413091/85785). 

### IncludeTypes

Is used as a Whitelist to specify only the types you would like to have code-generated:

```
/* Options:
IncludeTypes: GetTechnology,GetTechnologyResponse
```

Will only generate `GetTechnology` and `GetTechnologyResponse` DTO's:

```csharp
export class class GetTechnology { ... }
export class class GetTechnologyResponse { ... }
```

#### Include Request DTO and its dependent types

You can include a Request DTO and all its dependent types with a `.*` suffix on the Request DTO, e.g:

```
/* Options:
IncludeTypes: GetTechnology.*
```

Which will include the `GetTechnology` Request DTO, the `GetTechnologyResponse` Response DTO and all Types that they both reference.

#### Include All Types within a C# namespace

If your DTOs are grouped into different namespaces they can be all included using the `/*` suffix, e.g:

```
/* Options:
IncludeTypes: MyApp.ServiceModel.Admin/*
```

This will include all DTOs within the `MyApp.ServiceModel.Admin` C# namespace. 

### ExcludeTypes
Is used as a Blacklist to specify which types you would like excluded from being generated:

```
/* Options:
ExcludeTypes: GetTechnology,GetTechnologyResponse
```

Will exclude `GetTechnology` and `GetTechnologyResponse` DTOs from being generated.

### DefaultImports

The `Symbol:module` short-hand syntax can be used for specifying additional imports in your generated TypeScript DTOs, e.g:

```ts
/* Options:
...
DefaultImports: Symbol:module,Zip:./ZipValidator
*/
```

Which will generate the popular import form of:

```ts
import { Symbol } from "module";
import { Zip } from "./ZipValidator";
```

## TypeScript Interface Definitions

By checking **Only TypeScript Definitions** check-box on the dialog when Adding a TypeScript Reference
you can instead import Types as a
[TypeScript declaration file](http://www.typescriptlang.org/Handbook#writing-dts-files) (.d.ts).

TypeScript declarations are just pure static type annotations, i.e. they don't generate any code or 
otherwise have any effect on runtime behavior. This makes them useful as a non-invasive drop-in into 
existing JavaScript code where it's just used to provide type annotations on existing JavaScript objects, 
letting you continue using your existing data types and ajax libraries.

### Referencing TypeScript DTO's

Once added to your project, use VS.NET's JavaScript doc comments to reference the TypeScript definitions 
in your `.ts` scripts. The example below shows how to use the above TypeScript definitions to create a 
typed Request/Response utilizing jQuery's Ajax API to fire off a new Ajax request on every keystroke:

```html
/// <reference path="MyApis.dtos.d.ts"/>
...

<input type="text" id="txtHello" data-keyup="sayHello" /> 
<div id="result"></div>

<script>
$(document).bindHandlers({
    sayHello: function () {
        var request: dtos.Hello = {};
        request.title = "Dr";
        request.name = this.value;
        
        $.getJSON(createUrl("/hello", request), request, 
            function (r: dtos.HelloResponse) {
                $("#result").html(r.result);
            });
    }
});

function createUrl(path: string, params: any): string {
    for (var key in params) {
        path += path.indexOf('?') < 0 ? "?" : "&";
        path += key + "=" + encodeURIComponent(params[key]);
    }
    return path;
}
</script>
```

Here we're just using a simple inline `createUrl()` function to show how we're creating the url for the 
**GET** HTTP Request by appending all Request DTO properties in the QueryString, resulting in a HTTP GET 
Request that looks like:

    /hello?title=Dr&name=World

There's also a new `$.ss.createUrl()` API in 
[ss-utils.js](/ss-utils-js)
which also handles .NET Route definitions where it will populate any variables in the `/path/{info}` 
instead of adding them to the `?QueryString`, e.g:

```js
$(document).bindHandlers({
    sayHello: function () {
        var request: dtos.Hello = {};
        request.title = "Dr";
        request.name = this.value;
        
        $.getJSON($.ss.createUrl("/hello/{Name}", request), request, 
            function (r: dtos.HelloResponse) {
                $("#result").html(r.result);
            });
    }
});
```

Which results in a HTTP GET request with the expected Url:

    /hello/World?title=Dr

### [ServerEvents Client](/typescript-server-events-client)

The [TypeScript ServerEventClient](/typescript-server-events-client) is an idiomatic port of ServiceStack's 
[C# Server Events Client](/csharp-server-events-client) in native TypeScript providing a productive 
client to consume ServiceStack's [real-time Server Events](/server-events) that can be used in both 
TypeScript Web and node.js server applications.

```ts
const channels = ["home"];
const client = new ServerEventsClient("/", channels, {
    handlers: {
        onConnect: (sub:ServerEventConnect) => {  // Successful SSE connection
            console.log("You've connected! welcome " + sub.displayName);
        },
        onJoin: (msg:ServerEventJoin) => {        // User has joined subscribed channel
            console.log("Welcome, " + msg.displayName);
        },
        onLeave: (msg:ServerEventLeave) => {      // User has left subscribed channel
            console.log(user.displayName + " has left the building");
        },
        onUpdate: (msg:ServerEventUpdate) => {    // User's subscribed channels have changed
            console.log(user.displayName + " channels subscription were updated");
        },        
        onMessage: (msg:ServerEventMessage) => {} // Invoked for each other message
        //... Register custom handlers
        CustomMessage: (msg:CustomMessage) = {}   // Handle CustomMessage Request DTO
    },
    receivers: { 
        //... Register any receivers
        tv: {
            watch: function (id) {                 // Handle 'tv.watch {url}' messages 
                var el = document.querySelector("#tv");
                if (id.indexOf('youtu.be') >= 0) {
                    var v = splitOnLast(id, '/')[1];
                    el.innerHTML = templates.youtube.replace("{id}", v);
                } else {
                    el.innerHTML = templates.generic.replace("{id}", id);
                }
                el.style.display = 'block'; 
            },
            off: function () {                     // Hanndle 'tv.off' messages
                var el = document.querySelector("#tv");
                el.style.display = 'none';
                el.innerHTML = '';
            }
        }
    }
}).start();
```

When publishing a DTO Type for your Server Events message, your clients will be able to benefit from 
the generated DTOs in [TypeScript ServiceStack References](/typescript-add-servicestack-reference).

## ServiceStackIDEA plugin

<img align="right" src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackidea/supported-ides.png" />
ServiceStackIDEA is a plugin for JetBrains IntelliJ based IDEs to simplify development of client applications for ServiceStack services with integrated support for Add ServiceStack Reference feature.

ServiceStackIDEA now supports many of the most popular JetBrains IDEs including:

 - WebStorm, RubyMine, PhpStorm & PyCharm
   - TypeScript
 - IntelliJ
   - Java, Kotlin and TypeScript

### TypeScript Support

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackidea/webstorm-add-typescript.png)

By right clicking on any folder in your Project explorer, you can add a TypeScript reference by simply providing any based URL of your ServiceStack server.

![](https://raw.githubusercontent.com/ServiceStack/Assets/7474c03bdb0ea1982db2e7be57567ad1b8a4ad38/img/servicestackidea/add-typescript-ref.png)

Once this file as been added to your project, you can update your service DTOs by right clicking `Update ServiceStack Reference` or using the light bulb action (`Alt+Enter` by default).

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackidea/webstorm-update-typescript.png)

This now means you can integrate with a ServiceStack service easily from your favorite JetBrains IDE when working with TypeScript!

#### Install ServiceStack IDEA from the Plugin repository

The ServiceStack IDEA is now available to install directly from within a supported IDE Plugins Repository, to Install Go to: 

 1. `File -> Settings...` Main Menu Item
 2. Select **Plugins** on left menu then click **Browse repositories...** at bottom
 3. Search for **ServiceStack** and click **Install plugin**
 4. Restart to load the installed ServiceStack IDEA plugin

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackidea/android-plugin-download.gif)
