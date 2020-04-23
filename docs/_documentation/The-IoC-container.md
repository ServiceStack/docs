---
slug: ioc
title: ServiceStack's IOC 
---

ServiceStack uses a slightly modified version of [Funq](http://funq.codeplex.com/) - which was adopted because 
of its excellent [performance and memory characteristics](http://www.servicestack.net/benchmarks/). 
ServiceStack's version of Funq has been enhanced with Expression-based Auto-wiring and lifetime Request Scope.

If you so wish, you can still elect to use your favourite IOC by creating an `IContainerAdapter` for them. 
See below for examples of adapters for popular IOC's. All ServiceStack's customizable hooks support 
Auto-wiring out-of-the-box, namely:

- [Services](/your-first-webservice-explained)
- [Request and Response Filter attributes](/filter-attributes) _(are executed before a service gets called)_
- [Validators](/validation) _(validates a request DTO before the service gets called)_

For each of these features, dependencies are resolved for all parameters in the constructor that has the most arguments as well as all public properties.

## .NET Core Compatible Registration APIs

To retain the same nomenclature that .NET Core uses to register dependencies you can use the 
[.NET Core-compatible overloads](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/ContainerNetCoreExtensions.cs)
letting you use a single consistent API to register dependencies in both ServiceStack's and .NET Core's IOC 
making it easy to move registrations between the two, e.g:

```csharp
public void Configure(Container container)
{
    //Register Singleton instance using Factory function
    container.AddSingleton<IBar>(c => new Bar { Name = "bar" }); //Equivalent to:
    container.Register<IBar>(c => new Bar { Name = "bar" });

    //Register Auto-Wired Transient instance
    container.AddTransient<IFoo, Foo>(); //Equivalent to:
    container.RegisterAutoWiredAs<Foo,IFoo>().ReusedWithin(ReuseScope.None);
    
    //Register Auto-Wired Request Scope instance
    container.AddScoped<IScoped, Scoped>(); //Equivalent to:
    container.RegisterAutoWiredAs<Foo,IFoo>().ReusedWithin(ReuseScope.Request);    
}
```

## Autowire Registration

You can register dependencies so that all the dependencies are automatically auto-wired. Just like the hooks 
above, once resolved Funq will create a new instance resolving dependencies for the constructor that has the 
most arguments as well as all public properties.

```csharp
public override void Configure(Container container)
{
   container.RegisterAutoWired<MyType>();
   container.RegisterAutoWiredAs<MyType,IMyType>();
}
```

There's also support for registration of run-time types with these APIs below:

```csharp
container.RegisterAutoWiredType(typeof(MyType));
container.RegisterAutoWiredType(typeof(MyType),typeof(IMyType));
container.RegisterAutoWiredTypes(typeof(MyType),typeof(MyType2),typeof(MyType3));
```

## Custom Registration

Funq also supports custom creation of instances. When used no auto-wiring is performed and it's left up to you 
to explicitly resolve all your dependencies.

### Using Custom Factories

In addition to Auto-wiring Funq allows you to customize the creation of your instance with custom delegates. 
This is useful when your dependencies require custom configuration. E.g:

```csharp
container.Register(c => new MyType(c.Resolve<IDependency>(), connectionString));
container.Register<IMyType>(c => new MyType(c.Resolve<IDependency>(), connectionString));
container.Register(c => CreateAndInitializeMyType(c.Resolve<IDependency1>(), c.Resolve<IDependency2>));
```

### Register instances

Other than factories, you can also register custom instances where instead of returning a lambda above you 
can return an instance:

```csharp
container.Register(new MyType(c.Resolve<IDependency>(), connectionString));
```

> **Note:** When using the methods above, the properties and the constructor of the registered type aren't 
auto-wired (ie **the properties and the constructor are not injected**). You would need to do that manually 
like that:

```csharp
container.Register<T>(c => new Foo(c.Resolve<Some>(), c.Resolve<Other>(), c.Resolve<Dependencies>());
```

## Object lifetime

By default all dependencies registered in Funq have singleton scope, where the same instance is injected into all dependencies. This behaviour can be changed by defining the scope explicitly, which is supported with the following APIs:

```csharp
container.Register(c => new MyType()).ReusedWithin(ReuseScope.None); 
container.RegisterAutoWired<MyType>().ReusedWithin(ReuseScope.None); 
container.RegisterAutoWiredAs<MyType,IMyType>().ReusedWithin(ReuseScope.None); 
container.RegisterAutoWiredType(typeof(MyType), ReuseScope.None); 
container.RegisterAutoWiredType(typeof(MyType), typeof(IMyType), ReuseScope.None); 
```

### Supported Lifetime Scopes

- `ReuseScope.Container`: Singleton scope (a instance is used per application lifetime)
- `ReuseScope.Request`: Request scope (a instance is used per request lifetime)
- `ReuseScope.None`: Transient scope (a new instance is created every time)


### ASP.NET Core IServiceProvider APIs

Registering dependencies in ServiceStack's IOC are only available within ServiceStack, you can access 
**scoped ASP.NET Core dependencies** and create Custom IOC Scopes using the `IRequest` APIs below:

 - `IRequest.TryResolveScoped<T>()`
 - `IRequest.TryResolveScoped()`
 - `IRequest.ResolveScoped<T>()`
 - `IRequest.ResolveScoped()`
 - `IRequest.CreateScope()`
 - `IRequest.GetServices()`
 - `IRequest.GetServices<T>()`

Which can be used to create custom scopes that utilizes ASP.NET Entity Framework Identity classes in your ServiceStack Services:

```csharp
using (var scope = Request.CreateScope())
{
    var RoleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var UserManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    var managerUser = await UserManager.FindByEmailAsync("manager@gmail.com");
    if (managerUser == null)
    {
        assertResult(await UserManager.CreateAsync(new ApplicationUser {
            DisplayName = "Test Manager",
            Email = "manager@gmail.com",
            UserName = "manager@gmail.com",
            FirstName = "Test",
            LastName = "Manager",
        }, "p@55wOrd"));
        
        managerUser = await UserManager.FindByEmailAsync("manager@gmail.com");
        await UserManager.AddToRoleAsync(managerUser, "Manager");
    }
}
```

## Advanced Usages

### Autowiring Generic Type Definitions

Whilst ServiceStack's IOC doesn't have a native support for registering types based on a generic type definition, it's easy to use the Runtime Type APIs and register them yourself. E.g the example below will register and autowire all types that implement `ICommand<T>` in the current assembly:

```csharp
GetType().Assembly.GetTypes()
    .Where(x => x.IsOrHasGenericInterfaceTypeOf(typeof(ICommand<>)))
    .Each(x => container.RegisterAutoWiredType(x));
```

## Use another IoC container

```csharp
public interface IResolver {
    T TryResolve<T>();
}

public interface IContainerAdapter : IResolver {
    T Resolve<T>();
}
```

#### Example Usage

```csharp
IKernel kernel = new StandardKernel();
container.Adapter = new NinjectIocAdapter(kernel);
```

Adding a custom ContainerAdapter allows your services to resolve its dependencies from an alternative IOC, in this way they act like a **dependency repository** where the services are still registered in Funq but all their dependencies are resolved by the ContainerAdapter specified. Dependencies in constructors are resolved by calling `IContainerAdapter.Resolve<T>()` whilst public property dependencies are resolved with `IContainerAdapter.TryResolve<T>()`, the idea is you can have missing constructor dependencies throw an exception whilst you can be more lax about property dependencies, where your service can continue to execute without them (should you wish).

Here are some example how to use some popular IoC containers side-by-side with Funq. Of course you're not only limited to the these IoC containers here:

### Use Ninject

```csharp
public class NinjectIocAdapter : IContainerAdapter
{
    private readonly IKernel kernel;

    public NinjectIocAdapter(IKernel kernel)
    {
        this.kernel = kernel;
    }

    public T Resolve<T>()
    {
        return this.kernel.Get<T>();
    }

    public T TryResolve<T>()
    {
        return this.kernel.CanResolve<T>() ? this.kernel.Get<T>() : default(T);
    }
}
```

Then in the `AppHost` `Configure(Container container)` method you need to enable this adapter:

```csharp
//Create Ninject IoC container
IKernel kernel = new StandardKernel();
//Now register all depedencies to your custom IoC container
//...

//Register Ninject IoC container, so ServiceStack can use it
container.Adapter = new NinjectIocAdapter(kernel);
```

### Use StructureMap

```csharp
public class StructureMapContainerAdapter : IContainerAdapter
{
	public T TryResolve<T>()
	{
		return ObjectFactory.TryGetInstance<T>();
	}

	public T Resolve<T>()
	{
		return ObjectFactory.TryGetInstance<T>();
	}
}
```

In `AppHost` `Configure`:

```csharp
//Configure User Defined REST Paths
container.Adapter = new StructureMapContainerAdapter();

//Register your dependencies
ObjectFactory.Inject(typeof(IFoo), new Foo());
```

> **Note:** Due to a behavior of StructureMap, you need your `AppHost` declare as `internal`, eg: 
`internal class AppHost : AppHostBase`

### Use Windsor

```csharp
// The "ApplicationAssemblyFilter" is a custom class that just helps to 
// automate registration to assemblies which match a particular pattern 
// in the app path
public class ApplicationAssemblyFilter : AssemblyFilter
{
    public ApplicationAssemblyFilter()
        : base(AppDomain.CurrentDomain.BaseDirectory, Assembly.GetExecutingAssembly().GetName().Name + ".*.dll"){}
}

public class WindsorContainerAdapter : IContainerAdapter, IDisposable 
{ 
    private readonly IWindsorContainer container; 

    public WindsorContainerAdapter() 
    { 
        container = new WindsorContainer().Install(FromAssembly.InThisApplication(), 
             FromAssembly.InDirectory(new ApplicationAssemblyFilter())); 
    } 

    public T TryResolve<T>() 
    { 
       if (container.Kernel.HasComponent(typeof(T)))
       {
          return (T)container.Resolve(typeof(T));
       }

       return default(T); 
    } 

    public T Resolve<T>() 
    { 
        return container.Resolve<T>(); 
    } 

    public void Dispose() 
    { 
        container.Dispose(); 
    } 
} 
```

### Use Autofac

```csharp
public class AutofacIocAdapter : IContainerAdapter
{
    private readonly IContainer container;

    public AutofacIocAdapter(IContainer container)
    {
        this.container = container;
    }

    public T Resolve<T>()
    {
        return container.Resolve<T>();
    }

    public T TryResolve<T>()
    {
        if (container.TryResolve(typeof(T), out var result))
	{
	    return (T)result;
	}

	return default;
    }
}
```

Then in the `AppHost` `Configure(Container container)` method you need to enable this adapter:

```csharp
//Create Autofac builder
var builder = new ContainerBuilder();
//Now register all depedencies to your custom IoC container
//...

//Register Autofac IoC container adapter, so ServiceStack can use it
IContainerAdapter adapter = new AutofacIocAdapter(builder.Build());
container.Adapter = adapter;
```

### Use SimpleInjector

```csharp
public class SimpleInjectorIocAdapter : IContainerAdapter
{
    private readonly Container container;

    public SimpleInjectorIocAdapter(Container container)
    {
        this.container = container;
    }

    public T Resolve<T>() 
    {
        return (T)this.container.GetInstance(typeof(T));
    }

    public T TryResolve<T>()
    {
        var registration = this.container.GetRegistration(typeof(T));
        return registration == null ? default(T) : (T)registration.GetInstance();
    }
}
```

Then in the `AppHost` `Configure(Container container)` method you need to enable this adapter:

```csharp
//Create SimpleInjector IoC container
Container container = new Container();
//Now register all depedencies to your custom IoC container
//...

//Register SimpleInjector IoC container, so ServiceStack can use it
container.Adapter = new SimpleInjectorIocAdapter (container);
```

### Use Unity

```csharp
public class UnityIocAdapter : IContainerAdapter
{
    private readonly IUnityContainer container;

    public UnityIocAdapter(IUnityContainer container)
    {
        this.container = container;
    }

    public T Resolve<T>()
    {
        return container.Resolve<T>();
    }

    public T TryResolve<T>()
    {
        if(container.IsRegistered<T>())
        {
            return container.Resolve<T>();
        }

        return default(T);
    }
}
```

Then in the `AppHost` `Configure(Container container)` method you need to enable this adapter:

```csharp
//Create Unity IoC container
var unityContainer = new UnityContainer();
//Now register all depedencies to your custom IoC container
//...

//Register SimpleInjector IoC container, so ServiceStack can use it
container.Adapter = new UnityIocAdapter(unityContainer);
```

### Disposing of your services

The `AppHost.Release(instance)` method gets called for every resolved service right after it's used. 
This is the [default implementation](https://github.com/ServiceStack/ServiceStack/blob/f2d8eadaf5f4eecf1eadae918243472b039e5dfe/src/ServiceStack/ServiceStackHost.cs#L787-L805) (which can be overridden):

```csharp
var iocAdapterReleases = Container.Adapter as IRelease;
if (iocAdapterReleases != null)
{
    iocAdapterReleases.Release(instance);
}
else 
{
    var disposable = instance as IDisposable;
    if (disposable != null)
        disposable.Dispose();
}
```

Which will first try to call your ContainerAdapter if it implements `IRelease` otherwise if the service is `IDisposable` it will just dispose of it itself.

So to have resolved services released back into your IOC, implement the `IRelease` interface on your IContainerAdapter, e.g:

```csharp
public class WindsorContainerAdapter : IContainerAdapter, IRelease
{ 
    private readonly IWindsorContainer _container; 

    public void Release(object instance)
    { 
        _container.Release(instance);
    }
}
```
 
Otherwise you can override default implementation in your `AppHost.Release(instance)` if you want to do something other than the default implementation.

# Community Resources

  - [ServiceStack: IoC with Microsoft Unity](http://www.agile-code.com/blog/servicestack-ioc-with-microsoft-unity/) by [@zoranmax](https://twitter.com/zoranmax)
  - [ServiceStack extensibility using MEF](http://bhameyie.com/2013/09/03/servicestack-extensibility-using-mef/) by [@bhameyie](https://twitter.com/bhameyie)
