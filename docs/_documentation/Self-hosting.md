---
slug: self-hosting
---
The quickest way to create a Self-Hosting application is to Create a new self-hosting VS.NET Project Template from [ServiceStackVS VS.NET Extension](https://github.com/ServiceStack/ServiceStackVS#servicestack-vsnet-templates).

Otherwise it's very easy to host ServiceStack in a Console App or Windows Service. You just have to Install the [ServiceStack NuGet package](https://www.nuget.org/packages/ServiceStack) and derive your AppHost from `AppSelfHostBase` instead of `AppHostBase`:

If using this in a .NET standard console app, you should reference ServiceStack.Kestrel NuGet package](https://www.nuget.org/packages/ServiceStack.Kestrel).

### Complete C# Console Host Example

```csharp
using System;
using ServiceStack;

class Program 
{
    [Route("/hello/{Name}")]
    public class Hello {
        public string Name { get; set; }
    }

    public class HelloResponse {
        public string Result { get; set; }
    }

    public class HelloService : Service
    {
        public object Any(Hello request) 
        {
            return new HelloResponse { Result = "Hello, " + request.Name };
        }
    }

    //Define the Web Services AppHost
    public class AppHost : AppSelfHostBase {
        public AppHost() 
          : base("HttpListener Self-Host", typeof(HelloService).Assembly) {}

        public override void Configure(Funq.Container container) { }
    }

    //Run it!
    static void Main(string[] args)
    {
        var listeningOn = args.Length == 0 ? "http://*:1337/" : args[0];
        var appHost = new AppHost()
            .Init()
            .Start(listeningOn);

        Console.WriteLine("AppHost Created at {0}, listening on {1}", 
            DateTime.Now, listeningOn);
            
        Console.ReadKey();
    }
}
```

### Complete VB.NET Console Host Example
```vbnet
Imports System
Imports ServiceStack

Public Class Program

    <Route("/hello/{Name}")>
    Public Class Hello
        Public Property Name As String
    End Class


    Public Class HelloResponse
        Public Property Result As String
    End Class


    Public Class HelloService
        Inherits Service
        Public Function Any(Request As Hello) As Object
            Return New HelloResponse() With {.Result = "Hello" & Request.Name}
        End Function
    End Class

    ' Define the Web Services AppHost
    Public Class AppHost
        Inherits AppSelfHostBase

        Public Sub New()
            MyBase.New("HttpListener Self-Host", GetType(HelloService).Assembly)
        End Sub

        Public Overrides Sub Configure(container As Funq.Container)
        End Sub
    End Class

    ' Run it!
    Overloads Shared Sub Main(ByVal Args() As String)        
        Dim listeningOn As String = If(Args.Length = 0, "http://*:1337/", Args(0))

        Dim AppHost As IAppHost = New AppHost().Init().Start(listeningOn)

        Console.WriteLine("AppHost Created at {0}, listening on {1}",
            DateTime.Now, listeningOn)

        Console.ReadKey()

    End Sub
End Class
```

### Complete F# Console Host Example

```fsharp
open System
open ServiceStack
 
type Hello = { mutable Name: string; }
type HelloResponse = { mutable Result: string; }
type HelloService() =
    interface IService with
        member this.Any (req:Hello) = { Result = "Hello, " + req.Name }
 
//Define the Web Services AppHost
type AppHost =
    inherit AppSelfHostBase 
    new() = { inherit AppSelfHostBase("Hello F# Services", typeof<HelloService>.Assembly) }
    override this.Configure container =
        base.Routes
            .Add<Hello>("/hello")
            .Add<Hello>("/hello/{Name}") |> ignore
 
//Run it!
[<EntryPoint>]
let main args =
    let host = if args.Length = 0 then "http://*:1337/" else args.[0]
    printfn "listening on %s ..." host
    let appHost = new AppHost()
    appHost.Init()
    appHost.Start host
    Console.ReadLine() |> ignore
    0
```

When any of these are running, you can call your hello service at `http://localhost:1337/hello/World!`

### Serving Razor Views or Static Files from HttpListener

The PhysicalPath for self-hosted HttpListener hosts is at the same directory where the `.exe` is run (e.g. in `/bin`). To serve any static files or execute any Razor Views you need to set the **Copy Output Directory** of all static assets you want available to `Copy if newer`. The [ServiceStack.Gap](https://github.com/ServiceStack/ServiceStack.Gap) feature provides an alternative packaging approach that can embed static resources and pre-compile razor views into a single `.exe` for the most optimal deployment.

### Serve Static Files from your Project Path

An alternative way for the Self-Hosted Console Application to find your Static files and Razor Views is to change the physical path so it points at your project directory. This enables an optimal **Live Reloading** development experience since its serving the original source Views you edit directly in your Project and not any copies that are copied to your `/bin`. 

You can change the Physical Path from the location where the **.exe** is run in `\bin\Debug` to your Project folder in `DEBUG` builds with: 

```csharp
SetConfig(new HostConfig {
#if DEBUG
    DebugMode = true,
    WebHostPhysicalPath = "~/../..".MapServerPath(),
#endif
});
```

> You will still need to "Copy to Output Directory" in RELEASE builds if you're not using [Embedded Resources](/virtual-file-system#embedded-resources) so the Console App can locate the Razor Views and Static files at runtime.

### Host as a Windows or Linux Console Host, Windows Service or Linux Daemon

This will run in as a Console Host in any Operating System with .NET 3.5 or Mono installed. In addition this can also be wrapped-up and run inside a [Windows Service](https://github.com/ServiceStack/ServiceStack.Examples/tree/master/src/StarterTemplates/WinServiceAppHost) or run as a [Linux Daemon](/servicestack-as-daemon-on-linux) which you can optionally elect to serve behind [Apache or Nginx reverse proxies](/servicestack-as-daemon-on-linux).

### Easily Convert to an ASP.NET Web Service

As both AppHostBase and AppHostHttpListenerBase follow the same API they are easily convertible between the two. Here's some step-by-step instructions showing you how to convert an [F# Console Host to an ASP.NET Web Service on OSX!](http://www.servicestack.net/mythz_blog/?p=785)


# Community Resources

  - [ServiceStack how to: SelfHost + Razor + WebForm Auth](http://lderache.github.io/servicestack-how-to-selfhost-plus-razor-plus-webform/) by [@laurentderache](https://twitter.com/laurentderache)  
  - [ServiceStack SelfHosted Performance Boost](http://en.rdebug.com/2013/05/servicestack-selfhosted-performance-boost/) by [@rudygt](https://twitter.com/rudygt)
  - [Self-hosting ServiceStack serving razor'd HTML](http://www.ienablemuch.com/2012/12/self-hosting-servicestack-serving.html) by [@ienablemuch](http://twitter.com/ienablemuch)
