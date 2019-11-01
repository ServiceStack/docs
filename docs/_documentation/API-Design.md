---
slug: api-design
title: ServiceStack’s API design
---

ServiceStack Services lets you return any kind of POCO, including naked collections:

```csharp
[Route("/reqstars")]
public class GetReqstars : IReturn<List<Reqstar>> { }

public class ReqstarsService : Service
{
    public object Get(GetReqstars request) => Db.Select<Reqstar>();
}
```

That your C# clients can call with just:

```csharp
List<Reqstar> response = client.Get(new GetReqstars());
```

This will make a **GET** call to the custom `/reqstars` url, making it the **minimum effort required in any Typed REST API in .NET!** When the client doesn't contain the `[Route]` definition it automatically falls back to using ServiceStack's [pre-defined routes](http://www.servicestack.net/ServiceStack.Hello/#predefinedroutes) - saving an extra LOC!

### Using explicit Response DTO

A popular alternative to returning naked collections is to return explicit Response DTO, e.g:

```csharp
[Route("/reqstars")]
public class GetReqstars : IReturn<GetReqstarsResponse> { }

public class GetReqstarsResponse 
{
    public List<Reqstar> Results { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}

public class ReqstarsService : Service
{
    public object Get(GetReqstars request) 
    {
        return new GetReqstarsResponse {
            Results = Db.Select<Reqstar>()
        };
    }
}
```

Whilst slightly more verbose this style benefits from better versionability and more coarse-grained APIs as additional results can be added to the Response DTO without breaking existing clients. You'll also need to follow the above convention if you also wanted to [support SOAP clients and endpoints](/soap-support) or if you want to be able to handle Typed [Response Messages in MQ Services](/messaging#message-workflow).

## ServiceStack's API Design

We'll walk through a few examples here but for a more detailed look into the usages and capabilities of ServiceStack's API design checkout its
[Comprehensive Test Suite](https://github.com/ServiceStack/ServiceStack/blob/master/tests/RazorRockstars.Console.Files/ReqStarsService.cs)

At a minimum ServiceStack Services only need to implement the `IService` empty interface:

```csharp
public interface IService {}
```

The interface is used as a Marker interface that ServiceStack uses to find, register and auto-wire your existing services. Although you're more likely going to want to inherit from ServiceStack's convenience concrete `Service` class which contains easy access to ServiceStack's providers:

```csharp
public class Service : IService 
{
    IRequest Request { get; }                 //HTTP Request Wrapper
    IResponse Response { get; }               //HTTP Response Wrapper
    IServiceGateway Gateway { get; }          //Built-in Service Gateway
    IVirtualPathProvider VirtualFileSources   //Virtual FileSystem Sources
    IVirtualFiles VirtualFiles { get; }       //Writable Virtual FileSystem
    ICacheClient Cache { get; }               //Registered Caching Provider
    MemoryCacheClient LocalCache { get; }     //Local InMemory Caching Provider
    IDbConnection Db { get; }                 //Registered ADO.NET IDbConnection
    IRedisClient Redis { get; }               //Registered RedisClient 
    IMessageProducer MessageProducer { get; } //Message Producer for Registered MQ Server
    IAuthRepository AuthRepository { get; }   //Registered User Repository
    ISession SessionBag { get; }              //Dynamic Session Bag
    TUserSession SessionAs<TUserSession>();   //Resolve Typed UserSession
    T TryResolve<T>();                        //Resolve dependency at runtime
    T ResolveService<T>();                    //Resolve an auto-wired service
    void PublishMessage(T message);           //Publish messages to Registered MQ Server
    bool IsAuthenticated { get; }             //Is Authenticated Request
    void Dispose();                           //Override to implement custom Dispose
}
```

### Basic example - Handling Any HTTP Verb

Lets revisit the Simple example from earlier:

```csharp
[Route("/reqstars")]
public class GetReqstars : IReturn<List<Reqstar>> { }

public class ReqstarsService : Service
{
    public object Get(GetReqstars request) => Db.Select<Reqstar>();
}
```

ServiceStack maps HTTP Requests to your Services **Actions**. An Action is any method that:

  - Is public 
  - Only contains a single argument - the typed Request DTO
  - Has a Method name matching a HTTP Method or **Any** which is used as a fallback if it exists
  - Can specify either `T` or `object` Return type, both have same behavior 

The above example will handle any `GetReqstars` request made on any **HTTP Verb** or **endpoint** and will return the complete `List<Reqstar>` contained in your configured RDBMS. 

### Micro ORMs and ADO.NET's IDbConnection

Code-First Micro ORMS like [OrmLite](https://github.com/ServiceStack/ServiceStack.OrmLite) and 
[Dapper](https://github.com/StackExchange/Dapper) provides a pleasant high-level experience whilst working directly against ADO.NET's low-level `IDbConnection`. They both support all major databases so you immediately have access to a flexible RDBMS option out-of-the-box. At the same time you're not limited to using the providers contained in the `Service` class and can continue to use your own register IOC dependencies (inc. an alternate IOC itself). 

### Micro ORM POCOs make good DTOs

The POCOs used in Micro ORMS are particularly well suited for re-using as DTOs since they don't contain any circular references that the Heavy ORMs have (e.g. EF). OrmLite goes 1-step further and borrows pages from NoSQL's playbook where any complex property e.g. `List<MyPoco>` is transparently blobbed in a schema-less text field, promoting the design of frictionless **Pure POCOS** that are uninhibited by RDBMS concerns. In many cases these POCO data models already make good DTOs and can be returned directly instead of mapping to domain-specific DTOs.

### Calling Services from a Typed C# Client

In Service development your services DTOs provides your technology agnostic **Service Layer** which you want to keep clean and as 'dependency-free' for maximum accessibility and potential re-use. Our recommendation is to follow our [Recommended Physical Project Structure](/physical-project-structure) and keep your DTOs in a separate ServiceModel project which ensures a well-defined
ServiceContract [decoupled from their implemenation and accessible from any client](/service-complexity-and-dto-roles#data-transfer-objects---dtos). This recommended Physical project structure is embedded in each [ServiceStack VS.NET Template](/templates-overview).

One of ServiceStack's strengths is its ability to re-use your Server DTOs on the client enabling ServiceStack's productive end-to-end typed API. 
ServiceStack's use of Typed DTOs in its message-based design enable greater resiliency for your Services where the exact DTOs aren't needed, only the shape of the DTOs is important and clients can also opt to use partial DTOs containing just the fields they're interested in. In the same way extending existing Services with new optional properties wont break existing clients using older DTOs.

When developing both Server and Client applications the easiest way to call typed Services from clients is to just have them reference the same ServiceModel .dll the Server uses to define its Service Contract, or for clients that only need to call a couple of Service you can choose to 
instead copy the class definitions as-is, in both cases calling Services is exactly the same where the Request DTO can be used with any of the generic [C#/.NET Service Clients](/csharp-client) to call Services using a succinct typed API, e.g:

#### Service Model Classes

```csharp
[Route("/reqstars")]
public class GetReqstars : IReturn<List<Reqstar>> { }
public class Reqstar { ... }
```

Which can used in any ServiceClient with:

```csharp
var client = new JsonServiceClient(BaseUri);
List<Reqstar> response = client.Get(new GetReqstars());
```

Which makes a **GET** web request to the `/reqstars` route. Custom Routes on Request DTO's are also not required as when none are defined the client automatically falls back to using ServiceStack's [pre-defined routes](/routing#pre-defined-routes).

### Generating Typed DTOs

In addition to being able to share your `ServiceModel.dll` on .NET Clients enable a typed end-to-end API without code-gen, clients 
can alternatively choose to use [Add ServiceStack Reference](http://docs.servicestack.net/csharp-add-servicestack-reference) support to provide an 
alternative way to get the Services typed DTOs on the client. In both cases the exact same source code is used to call the Services:

```csharp
var client = new JsonServiceClient(BaseUri);
var response = client.Get(new GetReqstars());
```

Add ServiceStack Reference is also available for [most popular languages](http://docs.servicestack.net/add-servicestack-reference) used in developing Web, Mobile and Desktop Apps.

#### Custom API Requests

When preferred, you can also use the previous more explicit client API (ideal for when you don't have the `IReturn<>` marker) which 
lets you call the Service using just its route:

```csharp
var response = client.Get<List<Reqstar>>("/reqstars");
```

> All these Service Client APIs **have async equivalents** with an `*Async` suffix.

## Everything Just Works

A nice property of ServiceStack's message-based design is all functionality is centered around Typed Request DTOs which easily lets you take advantage of high-level value-added functionality like [Auto Batched Requests](/auto-batched-requests) or [Encrypted Messaging](/encrypted-messaging) which are enabled automatically without any effort or easily opt-in to enhanced functionality by decorating Request DTOs or thier Services with Metadata and [Filter Attributes](/filter-attributes) and everything works together, binded against typed models naturally.

E.g. you can take advantage of [ServiceStack's Razor support](http://razor.servicestack.net/) and create a web page for this service by just adding a Razor view with the same name as the Request DTO in the `/Views` folder,
which for the `GetReqstars` Request DTO you can just add `/Views/GetReqstars.cshtml` and it will get rendered with the Services Response DTO as its View Model when the Service is called from a browser (i.e. HTTP Request with `Accept: text/html`). 

Thanks to ServiceStack's built-in Content Negotiation you can fetch the HTML contents calling the same url: 

```csharp
var html = $"{BaseUri}/reqstars".GetStringFromUrl(accept:"text/html");
```

This [feature is particularly nice](http://razor.servicestack.net/#unified-stack) as it lets you **re-use your existing services** to serve both Web and Native Mobile and Desktop clients.

### Action Filters

Service actions can also contain fine-grained application of Request and Response filters, e.g:

```csharp
public class ReqstarsService : Service
{
    [ClientCanSwapTemplates]
    public object Get(GetReqstars request) => Db.Select<Reqstar>();
}
```

This Request Filter allows the client to [change the selected Razor **View** and **Template**](http://razor.servicestack.net/#unified-stack) used at runtime. By default the view with the same name as the **Request** or **Response** DTO is used.

## Handling different HTTP Verbs

ServiceStack Services lets you handle any HTTP Verb in the same way, e.g this lets you respond with CORS headers to a HTTP **OPTIONS** request with:

```csharp
public class ReqstarsService : Service
{
    [EnableCors]
    public void Options(GetReqstar request) {}
}
```

Which if you now make an OPTIONS request to the above service, will emit the default `[EnableCors]` headers:

```csharp
var webReq = (HttpWebRequest)WebRequest.Create(Host + "/reqstars");
webReq.Method = "OPTIONS";
using (var webRes = webReq.GetResponse())
{
    webRes.Headers["Access-Control-Allow-Origin"]     // *
    webRes.Headers["Access-Control-Allow-Methods"]    // GET, POST, PUT, DELETE, OPTIONS
    webRes.Headers["Access-Control-Allow-Headers"]    // Content-Type
}
```

### PATCH request example

Handling a PATCH request is just as easy, e.g. here's an example of using PATCH to handle a partial update of a Resource:

```csharp
[Route("/reqstars/{Id}", "PATCH")]
public class UpdateReqstar : IReturn<Reqstar>
{
    public int Id { get; set; }
    public int Age { get; set; }
}

public Reqstar Patch(UpdateReqstar request)
{
    var reqstar = request.ConvertTo<Reqstar>();
    Db.UpdateNonDefaults(reqstar);
    return Db.SingleById<Reqstar>(request.Id);
}
```

And the client call is just as easy as you would expect:

```csharp
var response = client.Patch(new UpdateReqstar { Id = 1, Age = 18 });
```

Although sending different HTTP Verbs are unrestricted in native clients, they're unfortunately not allowed in some web browsers and proxies. So to simulate a PATCH from an AJAX request you need to set the **X-Http-Method-Override** HTTP Header.

## Structured Error Handling

When following the [explicit Response DTO Naming convention](/error-handling#error-response-types) ServiceStack will automatically populate the `ResponseStatus` property with a structured Error Response otherwise if returning other DTOs like naked collections ServiceStack will instead return a generic `ErrorResponse`, although this is mostly a transparent technical detail you don't need to know about as for schema-less formats like JSON they return the exact same wire-format.

[Error Handling](/error-handling) works naturally in ServiceStack where you can simply throw C# Exceptions, e.g:

```csharp
public List<Reqstar> Post(Reqstar request)
{
    if (!request.Age.HasValue)
        throw new ArgumentException("Age is required");

    Db.Insert(request.ConvertTo<Reqstar>());
    return Db.Select<Reqstar>();
}
```

This will result in an Error thrown on the client if it tried to create an empty Reqstar:

```csharp
try
{
    var response = client.Post(new Reqstar());
}
catch (WebServiceException webEx)
{
    webEx.StatusCode                    // 400
    webEx.StatusDescription             // ArgumentException
    webEx.ResponseStatus.ErrorCode      // ArgumentException
    webEx.ResponseStatus.Message        // Age is required
    webEx.ResponseDto is ErrorResponse  // true
}
```

The same Service Clients Exception handling is also used to handle any HTTP error generated in or outside of your service, e.g. here's how to detect if a HTTP Method isn't implemented or disallowed:

```csharp
try
{
    var response = client.Send(new SearchReqstars());
}
catch (WebServiceException webEx)
{
    webEx.StatusCode                   // 405
    webEx.StatusDescription            // Method Not Allowed
}
```

In addition to standard C# exceptions your services can also return multiple, rich and detailed validation errors as enforced by [Fluent Validation's validators](/validation).

### Overriding the default Exception handling

You can override the default exception handling in ServiceStack by registering a `ServiceExceptionHandlers`, e.g:

```csharp
void Configure(Container container) 
{
    this.ServiceExceptionHandlers.Add((req, reqDto, ex) => {
        return ...;
    });
}
```

## Smart Routing

For the most part you won't need to know about this as ServiceStack's routing works as you would expect. Although this should still serve as a good reference to describe the resolution order of ServiceStack's Routes:

  1. Any exact Literal Matches are used first
  2. Exact Verb match is preferred over All Verbs
  3. The more variables in your route the less weighting it has
  4. When Routes have the same weight, the order is determined by the position of the Action in the service or Order of Registration (FIFO)

These Rules only come into play when there are multiple routes that matches the pathInfo of an incoming request.

Lets see some examples of these rules in action using the routes defined in the [API Design test suite](https://github.com/ServiceStack/ServiceStack/blob/master/tests/RazorRockstars.Console.Files/ReqStarsService.cs):

```csharp
[Route("/reqstars")]
public class Reqstar {}

[Route("/reqstars", "GET")]
public class GetReqstars {}

[Route("/reqstars/{Id}", "GET")]
public class GetReqstar {}

[Route("/reqstars/{Id}/{Field}")]
public class ViewReqstar {}

[Route("/reqstars/{Id}/delete")]
public class DeleteReqstar {}

[Route("/reqstars/{Id}", "PATCH")]
public class UpdateReqstar {}

[Route("/reqstars/reset")]
public class ResetReqstar {}

[Route("/reqstars/search")]
[Route("/reqstars/aged/{Age}")]
public class SearchReqstars {}
```

These are results for these HTTP Requests

	GET   /reqstars           =>	GetReqstars
	POST  /reqstars           =>	Reqstar
	GET   /reqstars/search    =>	SearchReqstars
	GET   /reqstars/reset     =>	ResetReqstar
	PATCH /reqstars/reset     =>	ResetReqstar
	PATCH /reqstars/1         =>	UpdateReqstar
	GET   /reqstars/1         =>	GetReqstar
	GET   /reqstars/1/delete  =>	DeleteReqstar
	GET   /reqstars/1/foo     =>	ViewReqstar

And if there were multiple of the exact same routes declared like:

```csharp
[Route("/req/{Id}", "GET")]
public class Req2 {}

[Route("/req/{Id}", "GET")]
public class Req1 {}

public class MyService : Service {
    public object Get(Req1 request) { ... }		
    public object Get(Req2 request) { ... }		
}
```

The Route on the Action that was declared first gets selected, i.e:

    GET /req/1              => Req1

## Advanced Usages

### Custom Hooks

The ability to extend ServiceStack's service execution pipeline with Custom Hooks is an advanced customisation feature that for most times is not needed as the preferred way to add composable functionality to your services is to use [Request / Response Filter attributes](/filter-attributes) or apply them globally with [Global Request/Response Filters](/request-and-response-filters).

The [IServiceRunner](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack.Interfaces/Web/IServiceRunner.cs) decouples the execution of your service from the implementation of it which provides an alternative custom hook which lets you add custom behavior to all Services without needing to use a base Service class. 

To add your own Service Hooks you just need to override the default Service Runner in your AppHost from its default implementation:

```csharp
public virtual IServiceRunner<TRequest> CreateServiceRunner<TRequest>(ActionContext actionContext)
{           
    return new ServiceRunner<TRequest>(this, actionContext); //Cached per Service Action
}
```

With your own:

```csharp
public override IServiceRunner<TRequest> CreateServiceRunner<TRequest>(ActionContext actionContext)
{           
    return new MyServiceRunner<TRequest>(this, actionContext); //Cached per Service Action
}
```

Where `MyServiceRunner<T>` is just a custom class implementing the custom hooks you're interested in, e.g:

```csharp
public class MyServiceRunner<T> : ServiceRunner<T> 
{
    public override void OnBeforeExecute(IRequest req, TRequest requestDto) {
      // Called just before any Action is executed
    }

    public override Task<object> ExecuteAsync(IRequest req, object serviceInstance, TRequest requestDto) {
        // Called to execute the Service instance with the requestDto
        return base.ExecuteAsync(req, serviceInstance, requestDto);
    }

    public override object OnAfterExecute(IRequest req, object response) {
      // Called just after any Action is executed, you can modify the response returned here as well
    }

    public override Task<object> HandleExceptionAsync(IRequest req, TRequest requestDto, Exception ex) {
      // Called whenever an exception is thrown in your Services Action
    }
}
```

## Limitations

One limitation of Services is that you can't split the handling of a single Resource (i.e. Request DTO) over multiple service implementations. If you find you need to do this because your service is getting too big, consider using partial classes to spread the implementation over multiple files. Another option is encapsulating some of the re-usable functionality into Logic dependencies and inject them into your service.

## Other Notes

Although they're not needed or used anywhere [you can also use HTTP Verb interfaces](https://github.com/ServiceStack/ServiceStack/blob/34acc429ee04053ea766e4fb183e7aad7321ef5e/src/ServiceStack.Interfaces/IService.cs#L27) to enforce the correct signature required by the services, e.g:

```csharp
public class MyService : Service, IAny<GetReqstars>, IGet<SearchReqstars>, IPost<Reqstar>
{
    public object Any(GetReqstars request) { .. }
    public object Get(SearchReqstars request) { .. }
    public object Post(Reqstar request) { .. }
}
```

This has no effect to the runtime behaviour and your services will work the same way with or without the added interfaces.

