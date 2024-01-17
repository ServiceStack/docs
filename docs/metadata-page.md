---
title: Metadata Pages
---

ServiceStack will automatically generate a metadata page about the webservice. The metadata can be found under the URL `/metadata`:

![Example](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/metadata-chat.png)

The Metadata page contains:

  - List of all visible web services and the endpoints they're accessible on
  - Links to a detailed page of each format, with example request and responses
  - Links to SOAP 1.1/1.2 WSDLs
  - Links to all XSD types for all services
  - Links to internally available debug metadata info
  - Links to Client examples documentation

The metadata pages provide automatic generated documentation around your services, allowing consumers of your APIs to more easily introspect and provide greater visibility of your services. 

## Annotating Services

You can also optionally add custom annotations and documentation on services which will automatically appear on the metadata pages. Here is an example of a fully annotated Service:

```csharp
[Api("Service Description")]
[Route("/swagger/{Name}", "GET", Summary = "GET Summary", Notes="Notes")]
[Route("/swagger/{Name}", "POST", Summary ="POST Summary", Notes="Notes")]
public class SwaggerTest
{
    [ApiMember(Name="Name", Description = "Name Description", 
        ParameterType = "path", DataType = "string", IsRequired = true)]
    public string Name { get; set; }
}
```

If now the detail page of the specific service is inspected, the description configured above will be displayed on both the [Open API](/openapi) and Metadata Detail Page:

![Metadata Detail Page](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/metadata-swagger-api.png)

### Group Services by Tag

Services can also be [grouped by Tag](/api-design#group-services-by-tag) by annotating them with the `[Tag]` attribute:

```csharp
[Tag("web")]
public class WebApi : IReturn<MyResponse> {}

[Tag("mobile")]
public class MobileApi : IReturn<MyResponse> {}

[Tag("web"),Tag("mobile")]
public class WebAndMobileApi : IReturn<MyResponse> {}
```

Where they'll appear as a tab to additionally filter APIs in metadata pages:

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/metadata/tag-groups.png)


## Adding Links to Metadata page

### Debug Links

A good place to provide better visibility of functionality in ServiceStack is with the **Plugin Links** and **Debug Info** links section to the `/metadata` page which add links to any Plugins with Web UI's, e.g:

![Debug Info Links](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/debug-links.png)

The Debug Links section is only available in **DebugMode** (recap: set by default in Debug builds or explicitly with `Config.DebugMode = true`). In addition, users with the **Admin** role (or if `Config.AdminAuthSecret` is enabled) can also view the debug Plugins UI's in production.

You can add links to your own [Plugins](/plugins) in the metadata pages with:

```csharp
appHost.GetPlugin<MetadataFeature>()
    .AddPluginLink("swagger-ui/", "Swagger UI");
appHost.GetPlugin<MetadataFeature>()
    .AddDebugLink("?debug=requestinfo", "Request Info");
```

`AddPluginLink` adds links under the **Plugin Links** section and should be used if your plugin is publicly visible, otherwise use `AddDebugLink` for plugins only available during debugging or development.

## Metadata Page Filters 

Use the `IndexPageFilter` and `DetailPageFilter` on the `MetadataFeature` plugin to customize the Master and detail metadata pages before they're rendered. E.g. you can reverse the order of operation names with:

```csharp
var metadata = appHost.GetPlugin<MetadataFeature>();
metadata.IndexPageFilter = page => {
    page.OperationNames.Sort((x,y) => y.CompareTo(x));
};
```

## Updating HTML and Metadata Page Templates

The HTML templates for the metadata pages are maintained as [embedded html template resources](https://github.com/ServiceStack/ServiceStack/tree/master/src/ServiceStack/Templates). 

The VFS lets you replace built-in ServiceStack templates with your own by simply copying the metadata or [HtmlFormat Template files](http://bit.ly/164YbrQ) you want to customize and placing them in your Website Directory at:

```
/Templates/HtmlFormat.html        // The auto HtmlFormat template
/Templates/IndexOperations.html   // The /metadata template
/Templates/OperationControl.html  // Individual operation template
```

Which you can customize locally that ServiceStack will pick up and use instead.

## How to disable the metadata page?

The metadata page is a feature and can be removed by setting:
```csharp
SetConfig(new HostConfig { 
    EnableFeatures = Feature.All.Remove(Feature.Metadata)
});
```

***

This can be extended to disable as many selected features are required, e.g. to also disable SOAP support you can combine with:

```csharp
SetConfig(new HostConfig { 
    EnableFeatures = Feature.All.Remove(
        Feature.Metadata | Feature.Soap11 | Feature.Soap12)
});
```

## Matching Requests with their Response DTOs

There are a number of different ways to match Requests with their Response DTO's for use in metadata services:

### IReturn Marker Interface

The recommended way to associate Request with their Response DTO's is to annotate the Request DTO with an `IReturn<T>` marker, e.g:

```csharp
public class Hello : IReturn<GreetingResponse> { ... }

public class GreetingResponse { ... }
```

This also has the primary benefit of enabling a terse and typed generic Client API as the Response type is captured in the Request DTO:

```csharp
GreetingResponse = client.Get(new Hello { ... });
```

Without the `IReturn<T>` marker the Response DTO would need to be specified on all call-sites, e.g:

```csharp
GreetingResponse = client.Get<GreetingResponse>(new Hello { ... });
```

### Response Type Naming Convention

An alternative way to specify the Response Type is to use the built-in naming convention:

```
{Request DTO Name} + Response
```

Where the Response DTO adds a `Response` suffix to the Request DTO, e.g:

```csharp
public class Hello { ... }

public class HelloResponse { ... }
```

### Service Response Type

You can also specify the Response Type by specifying it on the Services method signature, e.g:

```csharp
public class MyServices : Service
{
    public GreetingResponse Get(Hello request} { ... }
}
``` 

## Auth Info in [Metadata Pages](/metadata-page)

The Metadata pages also label protected Services. On the metadata index page it displays a yellow key next to
each Service requiring Authentication:

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/metadata-auth-summary.png)

Hovering over the key will show which also permissions or roles the Service needs.

This information is also shown the metadata detail pages which will list which permissions/roles are required (if any), e.g:

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/release-notes/metadata-auth.png)

## DTOs in multiple languages

Whilst [API Explorer](/api-explorer) will continue to receive most of our efforts for providing a built-in UI/UX around ServiceStack APIs, we've also added the ability to browse an API Contract in the viewers preferred language in the existing API **/metadata** pages, e.g:

[![](/images/apiexplorer/metadata-languages.png)](https://blazor-wasm-api.jamstacks.net/json/metadata?op=CreateBooking&lang=csharp)

The difference between them is that API Explorer is an entirely client rendered SPA that only supports modern browsers, whilst the **/metadata** pages are server rendered and should be visible in all browsers.
