---
slug: api-explorer
title: API Explorer
---

API Explorer is a Postman & Swagger UI alternative built into every ServiceStack **v6+** App that lets you explore, discover & call your APIs with an Auto UI dynamically generated from your APIs typed C# classes. 

It's built from the ground up with multiple levels of customizations, supporting both declarative & programmatic models for customizing each properties Input UI control, each APIs form grid layout whilst also providing the ability to provide rich interactive HTML Components to document each of your APIs & their Types.

This video provides a quick overview of API Explorer's v1 featureset:

<iframe class="video-hd" src="https://www.youtube.com/embed/lUDlTMq9DHU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

::: info DEMO
A Live demo is available at **/ui** in all ServiceStack **v6+** Apps, e.g: [blazor-wasm-api.jamstacks.net/ui](https://blazor-wasm-api.jamstacks.net/ui)
:::

The entire API Explorer UI is driven by the **rich metadata** around your APIs typed Service Contracts and AppHost's **registered plugins**.

- The **Sidebar** - Displaying a list of APIs each user has access to
- The **API** tab - Providing dynamic form to call & inspect your APIs
- The **Details** tab - Containing a complete description of your APIs & its dependent types
- The **Code** tab - Letting API consumers browse API Service contracts in their preferred language ([9 languages supported](https://servicestack.net/service-reference))

<p class="text-center py-4 text-xl">Lets learn about each feature with screenshots 📷</p>

If your AppHost has the ServiceStack [AuthFeature](/authentication-and-authorization) plugin registered, the home page will display a **Sign In** dialog based on the its **configured Auth Providers**. 

This is what you'll see in a new [Blazor WASM](https://blazor-wasm-api.jamstacks.net/ui) project which has **Credentials** Auth, **JWT** as well as **Facebook**, **Google** and **Microsoft** OAuth providers registered in [Configure.Auth.cs](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/Configure.Auth.cs)

```csharp
Plugins.Add(new AuthFeature(() => new CustomUserSession(),
    new IAuthProvider[] {
        new JwtAuthProvider(appSettings) {
            AuthKeyBase64 = appSettings.GetString("AuthKeyBase64"),
        },
        new CredentialsAuthProvider(appSettings),
        new FacebookAuthProvider(appSettings),
        new GoogleAuthProvider(appSettings),
        new MicrosoftGraphAuthProvider(appSettings),
    })
{
    IncludeDefaultLogin = false
});
```

Where it will dynamically render the **Sign Up** form with the App's enabled Auth capabilities.

<a href="https://blazor-wasm-api.jamstacks.net/ui" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/signin.png">
</a>

Custom Auth Providers can provide their own Form Layout by overriding the `FormLayout`, e.g. the above Credentials UI is creatable with:

```csharp
public class CustomCredentialsAuthProvider : CredentialsAuthProvider
{
    public CustomCredentialsAuthProvider()
    {
        FormLayout = new() {
            Input.For<Authenticate>(x => x.UserName, c =>
            {
                c.Label = "Email address";
                c.Required = true;
            }),
            Input.For<Authenticate>(x => x.Password, c =>
            {
                c.Type = "Password";
                c.Required = true;
            }),
            Input.For<Authenticate>(x => x.RememberMe),
        };
    }
    //...
}
```

Where the `Input` utility can be used to configure most HTML Form Input control properties that automatically configures to use the desired Input control for each property Type.

You can Sign In with any of the users in the [Blazor WASM Sign In](https://blazor-wasm.jamstacks.net/signin) page configured in 
[Configure.AuthRepository.cs](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/Configure.AuthRepository.cs), i.e:

| Username           | Password | Role     |
| ------------------ | -------- | -------- |
| admin@email.com    | p@55wOrd | Admin    |
| manager@email.com  | p@55wOrd | Manager  |
| employee@email.com | p@55wOrd | Employee |

If signed in with the **Admin** User and the [Admin Users](/admin-users) plugin is configured:

```csharp
Plugins.Add(new AdminUsersFeature());
```

It also displays **Admin UI** links that only **Admin** Users have access to.

<a href="https://blazor-wasm-api.jamstacks.net/ui" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/admin-user.png">
</a>

If you'd like to, you can add personalized links for users in different roles, e.g. this is what's used to populate the above UI for Admins:

```csharp
appHost.AddToAppMetadata(meta =>
{
    meta.Plugins.Auth.RoleLinks[RoleNames.Admin] = new List<LinkInfo>
    {
        new() { Href = "../admin-ui", Label = "Dashboard", Icon = Svg.ImageSvg(Svg.Create(Svg.Body.Home)) },
        new() { Href = "../admin-ui/users", Label = "Manage Users", Icon = Svg.ImageSvg(Svg.GetImage(Svg.Icons.Users, "currentColor")) },
    };
});
```

Once signed in, API Explorer expands to include all the protected APIs the signed in user has access to, identifiable with the padlock icon.

::: info
API Explorer is powered by the rich API metadata provided by the `MetadataFeature` and can be customized through the `UiFeature` plugin. 
Removing either plugin disables API Explorer.
:::

## API Tab

After selecting an API to use from the left-hand menu, you will be greeted with a way to **call APIs** through an **Auto UI** generated based on the **Request DTO** schema. Submitting the form returns API results with:

- **Body** displaying a syntax highlighted JSON response
- **Raw** showing raw JSON output in a textarea
- **Preview** tab displaying results in a human-friendly view

<a href="https://blazor-wasm-api.jamstacks.net/ui/QueryBookings?body=preview" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-form-QueryBookings.png">
</a>

Control types are based on the property types in your DTOs. 

| UI Input                | Data Types |
| ----------------------- | ---------- |
| `<select>`              | Enum, Custom Values |
| `<input type=number>`   | Numeric Types |
| `<input type=date>`     | DateTime, DateTimeOffset, DateOnly |
| `<input type=time>`     | TimeSpan, TimeOnly |
| `<input type=checkbox>` | Boolean |
| `<input type=text>`     | default |

Where the `CreateBooking` Request DTO defined in [Bookings.cs](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.ServiceModel/Bookings.cs):

```csharp
[Tag("bookings"), Description("Create a new Booking")]
[Route("/bookings", "POST")]
[ValidateHasRole("Employee")]
[AutoApply(Behavior.AuditCreate)]
public class CreateBooking : ICreateDb<Booking>, IReturn<IdResponse>
{
    [Description("Name this Booking is for"), ValidateNotEmpty]
    public string Name { get; set; }
    public RoomType RoomType { get; set; }
    [ValidateGreaterThan(0)]
    public int RoomNumber { get; set; }
    [ValidateGreaterThan(0)]
    public decimal Cost { get; set; }
    public DateTime BookingStartDate { get; set; }
    public DateTime? BookingEndDate { get; set; }
    [Input(Type = "textarea")]
    public string? Notes { get; set; }
}
```

Generates the following UI:

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/ui/CreateBooking">
        <img src="/images/apiexplorer/api-form-CreateBooking.png" style="max-width:850px;">
    </a>
</div>


This also shows how we can use the [[Input]](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/InputAttribute.cs) attribute
to further customize the Input UI control for each property as a **declarative alternative** to using `Input.For<T>()` above that the `Notes` property utilizes to change to use a **textarea** control instead.

API Form also supports auto binding [Argument Exceptions](/error-handling) or [Fluent](/validation) & [Declarative](/declarative-validation) Validation rules where any validation errors will be contextually displayed next to the invalid property. Here's both the resulting invalid UI & the Error Response DTO that generated it:

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/ui/CreateBooking">
        <img src="/images/apiexplorer/api-form-CreateBooking-invalid.png" style="max-width:850px;">
    </a>
</div>

Contextual validation errors is used where possible, otherwise an **Error Summary** notification is displayed along with the API Response body containing the full API error information.

### JSON Form

Another useful API form feature is being able to call APIs with a **JSON request payload** which maintains a **2-way sync** with the Form's UI allowing you to quickly cycle between input modes to quickly construct your API request.

Real-time JSON validation is also displayed for added assistance, warning you whenever the JSON is malformed.

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/ui/CreateBooking">
        <img src="/images/apiexplorer/api-form-CreateBooking-json.png" style="max-width:850px;">
    </a>
</div>

## Details Tab

API Explorer also provides a place for users to find out more about your API through documentation generated by metadata about in your API and optionally custom HTML modules to give additional context. 

This is where API consumers would go to learn about each API where it displays all relevant information about the API at a glance. For `CreateBooking` it shows that:

 - **POST** is the APIs **preferred** HTTP Method 
 - List its **user-defined** and **pre-defined** routes 
 - It's a **protected** API limited to Authenticated Users with the **Employee** role
 - It's categorized in the **bookings** tag group 
 - It's an [AutoQuery CRUD](/autoquery-crud) API implementing `ICreateDb<Booking>` indicating it creates entries in the **Booking** RDBMS Table 
 - It returns an `IdResponse` which we can intuitively infer returns the new Booking **Id** for successfully created Bookings

<a href="https://blazor-wasm-api.jamstacks.net/ui/CreateBooking?tab=details" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-details-CreateBooking.png">
</a>

This API Definition was generated from the `CreateBooking` DTO shows that the **Required** column used to document the APIs required properties is required for all properties except for the **nullable** Value and Reference Types when `#nullable` is enabled. 

```csharp
public class CreateBooking : ICreateDb<Booking>, IReturn<IdResponse>
{
    [Description("Name this Booking is for"), ValidateNotEmpty]
    public string Name { get; set; }
    public RoomType RoomType { get; set; }
    [ValidateGreaterThan(0)]
    public int RoomNumber { get; set; }
    [ValidateGreaterThan(0)]
    public decimal Cost { get; set; }
    public DateTime BookingStartDate { get; set; }
    public DateTime? BookingEndDate { get; set; }
    [Input(Type = "textarea")]
    public string? Notes { get; set; }
}
```

::: info
Importantly **Required** annotations are only documentative, your API still has to validate **required reference types** like `string` using your preferred validation method, e.g. Using the `[ValidateNotEmpty]` declarative attribute, [Fluent Validation](/validation) or manual verification in your Service C# implementation and throwing `ArgumentException` for invalid properties
:::

All this data is inferred from your services, with the ability to present data from additional metadata attributes such as:

| Attribute name          | Description                                                     |
|-------------------------|-----------------------------------------------------------------|
| `[Description]`         | Class and properties text only description.                     |
| `[Notes]`               | Class only text and HTML description.                           |
| `[Tag]`                 | Class only categorization of services, a way to group services. |
| `[Input]`               | Properties only presentation data for input fields.             |

If services require authentication using `Authenticate` or validation checking for role or permission, services will be shown with a padlock (🔒) signifying requiring authentication.

Request and response names are links to show C# generated code representations of your DTOs and dependent types. Text metadata such as `[Description]` will also flow down into the generated code as comments for additional context. 

<a class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-details-QueryBookings-code.png">
</a>

## Code Tab

The **Code** tab allows developers consuming your APIs from different programming backgrounds explore each APIs in their **preferred programming language** - currently supporting [9 different languages](https://servicestack.net/service-reference).

It includes the necessary steps to call your APIs from client Apps, following the same pattern for each language:

 1. Copy your API DTOs
 2. Copy and install the package containing ServiceStack's generic JSON Service Client
 3. Copy the initial source code pre-configured to call the API they want

At which point without any code-gen or build tools, they'll end up with an Typed API configured to your APIs endpoint. E.g. this is what it looks like to **Python** developers utilizing our [most recently supported language](/releases/v5_12):

<a href="https://blazor-wasm-api.jamstacks.net/ui/QueryBookings?tab=code&lang=python" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-code-QueryBookings-python.png">
</a>

That they can follow to quickly incorporate your API into their existing Apps, in addition **Python**, **C#** or **F#** developers could also copy this source code to their [Jupyter Notebooks](/jupyter-notebooks) for an instant typed visual REPL to explore your APIs.

This is driven by the services that power the [Add ServiceStack Reference](./add-servicestack-reference.md) feature. This growing list of support languages shows example code using the specific API as well as required ServiceStack client libraries to use, and how to update the APIs DTOs.

## Responsive Design

API Explorer's responsive layout works well in Smart Phones and Tablets letting you comfortably browse and call APIs on the go:

<div class="bg-gray-200 flex justify-center py-8">
    <img src="/images/apiexplorer/api-explorer.gif" style="width:500px; border-left:1px solid #CACACA;border-bottom:1px solid #CACACA;">
</div>


## API Customizations

To become the preferred solution to document APIs, API Explorer was designed from scratch to support multiple customization levels, from being able to customize each properties Input control, its Form Grid Layout and further annotating each API or Type with declarative attributes & rich markup. 

### API Annotations

Whilst the capability of adding rich API Docs is essential when needed, we expect plain C# attributes will often be used to document APIs where `[Description]` can be used to provide a short summary on a **Type** and its **Properties** whilst richer HTML markup can be added to any Type using `[Notes]` 
as done in [Bookings.cs](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.ServiceModel/Bookings.cs):

```csharp
[Tag("bookings"), Description("Find Bookings")]
[Notes("Find out how to quickly create a <a class='svg-external' target='_blank' href='https://youtu.be/nhc4MZufkcM'>C# Bookings App from Scratch</a>")]
[Route("/bookings", "GET")]
[Route("/bookings/{Id}", "GET")]
[AutoApply(Behavior.AuditQuery)]
public class QueryBookings : QueryDb<Booking> 
{
    public int? Id { get; set; }
}

[Description("Booking Details")]
[Notes("Captures a Persons Name & Room Booking information")]
public class Booking : AuditBase
{
    [AutoIncrement]
    public int Id { get; set; }
    //...
}
```

Where it generates clean API docs displayed in a human-friendly table layout containing properties of its **Request DTO** Type and inherited **base class** properties, starting with the APIs Request DTO followed by all its referenced dependent types - resulting in the details page containing a complete snapshot of all types used in the API:

<a href="https://blazor-wasm-api.jamstacks.net/ui/QueryBookings?tab=details" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-details-QueryBookings.png">
</a>


## API Docs

We can further enhance API Explorer with our own custom **HTML Components** by adding them to your Host projects local `/modules` folder which the Blazor WASM project template utilizes to showcase some customization examples:

<ul class="list-none">
    <li>
        <a href="https://github.com/NetCoreTemplates/blazor-wasm/tree/main/MyApp/wwwroot/modules" class="font-medium">/modules</a>
        <ul class="list-none">
            <li>
                <span class="font-medium">/ui</span>
                <ul class="list-none">
                    <li>
                        <span class="font-medium">/docs</span>
                        <ul class="list-none">
                            <li>
                                <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/wwwroot/modules/ui/docs/CreateBookingsDocs.html">
                                    CreateBookingsDocs.html
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/wwwroot/modules/ui/docs/TodosDocs.html">
                                    TodosDocs.html
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <span class="font-medium">/shared</span>
                <ul class="list-none">
                    <li>
                        <a href="https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/wwwroot/modules/shared/Brand.html">
                            Brand.html
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

Where you can enhance any of your APIs or DTOs with rich API docs by adding **HTML Components** to `/modules/ui/docs/*.html` which gets included together with API Explorers own components in its single file download. API Explorer is built using [petite-vue](https://github.com/vuejs/petite-vue) which is a **6kb** subset of Vue optimized for progressive enhancement your components can also take advantage of to enhance it with rich dynamic UIs. 

The `*.html` file names aren't important, to create an API doc component it just needs to be named `{Type}Docs`. Here's the simple component example 
[CreateBookingsDocs.html](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/wwwroot/modules/ui/docs/CreateBookingsDocs.html) uses to generate its custom UI that just references the id of its `<template>` UI:

```html
<script>App.components({ CreateBookingDocs: '#create-booking-docs' })</script>
<template id="create-booking-docs">
<div class="text-center my-3">
    <div class="flex justify-center">
        <svg>...</svg>
        <h2 class="text-3xl ml-3 mb-3">Create Bookings API</h2>
    </div>
    <div class="text-gray-500 text-lg">
        <p>
            Create a new room Booking for our {{serviceName}} hotels.
        </p>
        <p>
            Here are some 
            <a class="svg-external text-blue-800" target="_blank" 
                href="https://edition.cnn.com/travel/article/scoring-best-hotel-rooms/index.html">
                good tips on making room reservations
            </a>
        </p>
    </div>
</div>
</template>
```

[QueryTodos](https://blazor-wasm-api.jamstacks.net/ui/QueryTodos?tab=details) is a more advanced example that generates a dynamic UI shared by all TODO APIs:

```html
<script>
(function (){
    let apis = {
        QueryTodos:  'Query Todos, returns all Todos by default',
        CreateTodo:  'Create a Todo',
        UpdateTodo:  'Update a Todo',
        DeleteTodo:  'Delete Todo by Id',
        DeleteTodos: 'Delete multiple Todos by Ids',
    }
    let apiNames = Object.keys(apis)
    function TodosDocs({ op, store, routes, breakpoints }) {
        return {
            $template: '#Todos-docs',
            get op() { return resolve(op) }, 
            routes,
            apis,
            get otherApis() { return apiNames.filter(x => x !== this.op.request.name)
                .reduce((acc,x) => { acc[x] = apis[x]; return acc }, {}) },
        }
    }
    App.components(apiNames.reduce((acc, x) => { acc[x + 'Docs'] = TodosDocs; return acc }, {}))
})() 
</script>
<template id="Todos-docs">
<div class="mx-auto max-w-screen-md text-center py-8">
    <h2 class="text-center text-3xl">{{humanize(op.request.name)}}</h2>
    <p class="text-gray-500 text-lg my-3">{{apis[op.request.name]}}</p>
    <div class="flex justify-center text-left">
        <table>
            <caption class="mt-3 text-lg font-normal">Other Todo APIs</caption>
            <tr v-for="(info,name) in otherApis">
                <th class="text-right font-medium pr-3">
                    <a v-href="{ op:name }" class="text-blue-800">{{humanize(name)}}</a>
                </th>
                <td class="text-gray-500">{{info}}</td>
            </tr>
        </table>
    </div>
</div>
</template>
```

To generate its reactive **Mini Navigation UI** users can use to cycle through **all TODO API docs** with a `v-href="{ op }"` custom directive:

<a href="https://blazor-wasm-api.jamstacks.net/ui/QueryTodos?tab=details" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-details-docs-Todos.png">
</a>

API Doc HTML components are injected with the following properties:

 - `op` - Operation metadata about your API
 - [store](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/modules/ui/js/stores.js) - API Explorer's Reactive object model
 - [routes](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/modules/shared/plugins/usePageRoutes.js) - App `usePageRoutes` plugin Reactive store to manage its SPA routing
 - [breakpoints](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/modules/shared/plugins/useBreakpoints.js) - App `useBreakpoints` plugin Reactive store used that maintains responsive layout breakpoint properties

Components also have access to the entire functionality in the `@servicestack/client` library:

 - [index.d.ts](https://github.com/ServiceStack/servicestack-client/blob/master/src/index.d.ts) - TypeScript library declaration
 - [index.ts](https://github.com/ServiceStack/servicestack-client/blob/master/src/index.ts) - Source code implementation

You're also not limited with what's in API Explorer, with full access to HTML you can also import & use any `<script>` library features.

As we explore differing API Docs requirements we'll document useful functionality available to API doc components, in the meantime you can browse 
[API Explorer's source code](https://github.com/ServiceStack/ServiceStack/tree/master/src/ServiceStack/modules) or 
use JavaScript's reflective capabilities to discover what's available, e.g:

```js
[store,routes,breakpoints].map(Object.keys) // available methods & getters on reactive stores
Object.keys(exports)                        // all imported functionality e.g. @servicestack/client + DTOs
```

### Built-in API Docs

ServiceStack's own built-in APIs uses custom API Doc components itself to document its APIs, e.g. [/ui/docs/RegisterDocs.html](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/modules/ui/docs/RegisterDocs.html) 

```html
<script>App.components({ RegisterDocs:'#register-docs-template' })</script>
<template id="register-docs-template">
<div class="max-w-screen-md mx-auto text-center">
    <h2 class="text-2xl font-medium mb-3">Register API</h2>
    <p class="text-gray-500">
        Public API users can use to create a new User Account, can be added to your AppHost with:
    </p>
    <pre class="my-3"><code v-html="highlight(`Plugins.Add(new RegistrationFeature());`)"></code></pre>
</div>
</template>
```

Generates docs for the built-in **Register** API that includes **C#** Syntax highlighting:

<a href="https://blazor-wasm-api.jamstacks.net/ui/Register?tab=details" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-details-docs-Register.png">
</a>

Whilst [/ui/docs/AuthenticateDocs.html](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/modules/ui/docs/AuthenticateDocs.html) demonstrates a more advanced example in generating a responsive dynamic tab layout containing multiple relevant ServiceStack Auth YouTube videos:

<a href="https://blazor-wasm-api.jamstacks.net/ui/Authenticate?tab=details" class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/api-details-docs-Authenticate.png">
</a>

### Live Reload

When your App is run with `dotnet watch` it takes advantage ASP .NET Core's built-in file watcher to enable an instant **live reload** developer UX when contributing API Docs.

<div class="flex justify-center py-8">
    <a href="https://youtu.be/lUDlTMq9DHU?t=521">
        <img src="/images/apiexplorer/api-docs-livereload.gif">
    </a>
</div>

Which results in being more productive then using C# attributes as changes are immediately visible without a restart.

## Override built-in Components

You're also able to completely replace **any of API Explorers built-in components** by adding a local file with the same path used in [/ServiceStack/modules](https://github.com/ServiceStack/ServiceStack/tree/master/src/ServiceStack/modules). The Blazor WASM template does with its local 
[/modules/shared/Brand.html](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp/wwwroot/modules/shared/Brand.html) which overrides the top-right branding navigation for all API Explorer and Admin UIs:

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/ui/">
        <img src="/images/apiexplorer/brand-blazor-wasm.png" style="max-width:850px;border:1px solid rgb(229 231 235);">
    </a>
</div>

Although a less invasive option if you just want to use your own logo is to configure the `UiFeature` plugin to override the default `BrandIcon` as the other Jamstack templates do in their [Configure.AppHost.cs](https://github.com/NetCoreTemplates/nextjs/blob/main/api/MyApp/Configure.AppHost.cs):

```csharp
ConfigurePlugin<UiFeature>(feature => {
    feature.Info.BrandIcon.Uri = "/assets/img/logo.svg";
    feature.Info.BrandIcon.Cls = "inline-block w-8 h-8 mr-2";
});
```

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/ui/Register">
        <img src="/images/apiexplorer/brand-vue-ssg.png" style="max-width:850px;border:1px solid rgb(229 231 235);">
    </a>
</div>

## Custom Form Layouts

Generated forms default to a two column layout, but this can be controlled using `FormLayout` for a specific operation.
The `appHost.ConfigureOperation<T>` method can be used to change the layout and order of the form used in API Explorer.

For example, a `CreateCustomer` operation by default has the following properties.

```csharp
[Route("/customers", "POST")]
public class CreateCustomers
    : IReturn<IdResponse>, IPost, ICreateDb<Customers>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Company { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Country { get; set; }
    public string PostalCode { get; set; }
    public string Phone { get; set; }
    public string Fax { get; set; }
    public string Email { get; set; }
    public long? SupportRepId { get; set; }
}
```

### Default Form UI

And is presented in API Explorer using the following generated form by default.

<a class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/create-customer-default.png">
</a>

### Custom Form Layout

Customizing this layout using `ConfigureOperation`, we can control the placement and other attributed of each `InputInfo`.
When overriding the `FormLayout`, it is in the structure of Rows, then columns in the nested list. So grouping controls like `City`, `State` and `PostalCode` in the same row allows us to control the presentation.

```csharp
appHost.ConfigureOperation<CreateCustomers>(operation => operation.FormLayout = new() {
    Input.For<CreateCustomers>(x => x.FirstName,    c => c.FieldsPerRow(2)),
    Input.For<CreateCustomers>(x => x.LastName,     c => c.FieldsPerRow(2)),

    Input.For<CreateCustomers>(x => x.Email),
    Input.For<CreateCustomers>(x => x.Company),
    Input.For<CreateCustomers>(x => x.Address),

    Input.For<CreateCustomers>(x => x.City,         c => c.FieldsPerRow(3)),
    Input.For<CreateCustomers>(x => x.State,        c => c.FieldsPerRow(3)),
    Input.For<CreateCustomers>(x => x.PostalCode,   c => c.FieldsPerRow(3)),
    
    Input.For<CreateCustomers>(x => x.Country),
    
    Input.For<CreateCustomers>(x => x.Phone,        c => c.FieldsPerRow(2)),
    Input.For<CreateCustomers>(x => x.Fax,          c => c.FieldsPerRow(2)),

    Input.For<CreateCustomers>(x => x.SupportRepId),
});
```

Gives us the updated layout in API Explorer.

<a class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/create-customer-custom-layout.png">
</a>

### Custom Input Controls

Each input field can be customized with client side visual and behavioural changes by using `InputInfo` when customizing `FormLayout`.

```csharp
Input.For<CreateCustomers>(x => x.Email, info => {
    info.Label = "Personal Email Address";
    info.Placeholder = "me@email.com";
    info.Type = "email";
}) 
```

Now our `label` and `placeholder` changes are visible and trying to submit a value without an `@` we get a client side warning.

<a class="block my-8 p-4 rounded shadow hover:shadow-lg">
    <img src="/images/apiexplorer/create-customer-custom-input.png">
</a>

Values for `InputInfo` are merged with the `[Input]` attribute that can be used on request DTO class properties.
This allows you to keep the default layout while still controlling `Input` options directly on your request DTO class.

```csharp
public class CreateCustomers
        : IReturn<IdResponse>, IPost, ICreateDb<Customers>
{
    [Input(Placeholder = "me@email.com", Type = "email", Label = "Personal Email Address")]
    public string Email { get; set; }
}
```

### Register Form Layout

The built-in `RegistrationFeature` also uses a custom Form layout to mask its password fields:

```csharp
appHost.ConfigureOperation<Register>(op => op.FormLayout = new()
{
    Input.For<Register>(x => x.DisplayName,     x => x.Help = "Your first and last name"),
    Input.For<Register>(x => x.Email,           x => x.Type = Input.Types.Email),
    Input.For<Register>(x => x.Password,        x => x.Type = Input.Types.Password),
    Input.For<Register>(x => x.ConfirmPassword, x => x.Type = Input.Types.Password),
});
```

Which overrides the default Auto UI Form to use this custom layout:

<div class="flex justify-center py-8">
    <a href="https://blazor-wasm-api.jamstacks.net/ui/Register">
        <img src="/images/apiexplorer/api-form-Register.png" style="max-width:850px;">
    </a>
</div>
