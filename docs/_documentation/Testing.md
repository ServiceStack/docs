---
slug: testing
title: Testing
---

The tests in [ServiceStack.WebHost.Endpoints.Tests](https://github.com/ServiceStack/ServiceStack/tree/master/tests/ServiceStack.WebHost.Endpoints.Tests) show good examples of how to create stand-alone integration tests that just use a self-hosted HttpListener AppHost. 

## Example Stand-alone Integration tests

  - [BufferedRequestTests](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/BufferedRequestTests.cs)
  - [AuthTests](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/AuthTests.cs)

## Integration Testing

If your test project is targeting netcore, `AppSelfHostBase` is available in the `ServiceStack.Kestrel` package.

The [CustomerRestExample.cs](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/CustomerRestExample.cs) shows an example of a stand-alone integration test. Integration tests in ServiceStack just involves starting a standard [self-host](/self-hosting) ServiceStack Instance when the Test Fixture Starts up and disposing it when it tears down. Your integration tests can then communicate with the self-host exactly the same as if it were a remote ServiceStack instance (since that's all it is), e.g:

```csharp
//Create your ServiceStack AppHost with only the dependencies it needs
public class AppHost : AppSelfHostBase
{
    public AppHost() : base("Customer REST Example", typeof(CustomerService).Assembly) {}

    public override void Configure(Container container)
    {
        container.Register<IDbConnectionFactory>(c => 
            new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider));

        using (var db = container.Resolve<IDbConnectionFactory>().Open())
        {
            db.CreateTableIfNotExists<Customer>();
        }
    }
}

//Add Service Contract DTO's and Data Models
[Route("/customers", "GET")]
public class GetCustomers : IReturn<GetCustomersResponse> {}

public class GetCustomersResponse
{
    public List<Customer> Results { get; set; } 
}

[Route("/customers", "POST")]
public class CreateCustomer : IReturn<Customer>
{
    public string Name { get; set; }
}

public class Customer
{
    [AutoIncrement]
    public int Id { get; set; }

    public string Name { get; set; }
}

//Implement your Service Contracts
public class CustomerService : Service
{
    public object Get(GetCustomers request)
    {
        return new GetCustomersResponse { Results = Db.Select<Customer>() };
    }

    public object Post(CreateCustomer request)
    {
        var customer = new Customer { Name = request.Name };
        Db.Save(customer);
        return customer;
    }
}

//Write your Integration tests
public class CustomerRestExample
{
    const string BaseUri = "http://localhost:2000/";
    ServiceStackHost appHost;

    public CustomerRestExample()
    {
        //Start your AppHost on TestFixtureSetUp
        appHost = new AppHost() 
            .Init()
            .Start(BaseUri);
    }

    [OneTimeTearDown]
    public void OneTimeTearDown() => appHost.Dispose();

    /* Write your Integration Tests against the self-host instance */

    [Test]
    public void Can_GET_and_Create_Customers()
    {
        var client = new JsonServiceClient(BaseUri);

        //GET /customers
        var all = client.Get(new GetCustomers());
        Assert.That(all.Results.Count, Is.EqualTo(0));

        //POST /customers
        var customer = client.Post(new CreateCustomer { Name = "Foo" });
        Assert.That(customer.Id, Is.EqualTo(1));

        //GET /customers
        all = client.Get(new GetCustomers());
        Assert.That(all.Results.Count, Is.EqualTo(1));
    }
}
```

## Unit testing

If you want to unit test a ServiceStack Service in isolation there are a couple of different approaches you can take. The base [Service](https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Service.cs) class itself is just a simple C# class which lets you define and inject dependencies manually or by using the built-in IOC container. 

We'll illustrate both approaches using this [simple unit test example](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/UnitTestExample.cs) that tests this simple Service:

```csharp
// DTOs
public class FindRockstars
{
   public int? Aged { get; set; }
   public bool? Alive { get; set; }
}

public class GetStatus
{
   public string LastName { get; set; }
}

public class RockstarStatus
{
   public int Age { get; set; }
   public bool Alive { get; set; }
}

public class Rockstar
{
   [AutoIncrement]
   public int Id { get; set; }
   public string FirstName { get; set; }
   public string LastName { get; set; }
   public int? Age { get; set; }
}

// Implementation
public class SimpleService : Service
{
   public IRockstarRepository RockstarRepository { get; set; }

   public List<Rockstar> Get(FindRockstars request)
   {
      return request.Aged.HasValue
          ? Db.Select<Rockstar>(q => q.Age == request.Aged.Value)
          : Db.Select<Rockstar>();
   }

   public RockstarStatus Get(GetStatus request)
   {
      var rockstar = RockstarRepository.GetByLastName(request.LastName);
      if (rockstar == null)
          throw HttpError.NotFound("'{0}' is not a Rockstar".Fmt(request.LastName));

      var status = new RockstarStatus
      {
          Alive = RockstarRepository.IsAlive(request.LastName)
      }.PopulateWith(rockstar); //Populates with matching fields

      return status;
   }
}
```

This Service provides 2 operations, `FindRockstars` which makes db queries directly in the service class itself, and `GetStatus` which uses a repository instead for all its Data access.

### Using an in-memory database

If you're accessing `Db` from directly within your service implementation you're going to want to make use of a real DB given the [ADO.NET IDbConnection](http://msdn.microsoft.com/en-us/library/system.data.idbconnection.aspx) requires a lot of effort to mock. You can do this in the same way you would register your dependencies in ServiceStack itself, by using the built-in IOC. For a unit test we can do this without an AppHost by just use a new `Container` in your `TestFixtureSetup`, e.g:

### Test Setup

```csharp
private ServiceStackHost appHost;

[OneTimeSetUp]
public void OneTimeSetUp()
{
    appHost = new BasicAppHost().Init();
    var container = appHost.Container;

    container.Register<IDbConnectionFactory>(
        new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider));

    container.RegisterAutoWiredAs<RockstarRepository, IRockstarRepository>();

    container.RegisterAutoWired<SimpleService>();

    using (var db = container.Resolve<IDbConnectionFactory>().Open())
    {
        db.DropAndCreateTable<Rockstar>();
        db.InsertAll(SeedData);
    }
}

[OneTimeTearDown]
public void OneTimeTearDown() => appHost.Dispose();
```

With everything setup we can now test the service just like a normal C# class in isolation independently of ServiceStack itself:

```csharp
[Test]
public void Using_in_memory_database()
{
    //Resolve the autowired service from IOC and set Resolver for the base class
    var service = appHost.Container.Resolve<SimpleService>(); 

    var rockstars = service.Get(new FindRockstars { Aged = 27 });

    rockstars.PrintDump(); //Print a dump of the results to Console

    Assert.That(rockstars.Count, Is.EqualTo(SeedData.Count(x => x.Age == 27)));

    var status = service.Get(new GetStatus { LastName = "Vedder" });
    Assert.That(status.Age, Is.EqualTo(48));
    Assert.That(status.Alive, Is.True);

    status = service.Get(new GetStatus { LastName = "Hendrix" });
    Assert.That(status.Age, Is.EqualTo(27));
    Assert.That(status.Alive, Is.False);

    Assert.Throws<HttpError>(() =>
        service.Get(new GetStatus { LastName = "Unknown" }));
}
```

### Manually injecting dependencies

If you prefer your unit tests not to use an in-memory database, you can instead choose to mock your dependencies. In this example we'll use a stand-alone Mock, but you can reduce boilerplate by using mocking library like [Moq](https://github.com/Moq/moq) instead.

```csharp
public class RockstarRepositoryMock : IRockstarRepository
{
    public Rockstar GetByLastName(string lastName)
    {
        return lastName == "Vedder"
            ? new Rockstar(6, "Eddie", "Vedder", 48)
            : null;
    }

    public bool IsAlive(string lastName)
    {
        return lastName == "Grohl" || lastName == "Vedder";
    }
}

[Test]
public void Using_manual_dependency_injection()
{
    var service = new SimpleService
    {
        RockstarRepository = new RockstarRepositoryMock()
    };

    var status = service.Get(new GetStatus { LastName = "Vedder" });
    Assert.That(status.Age, Is.EqualTo(48));
    Assert.That(status.Alive, Is.True);

    Assert.Throws<HttpError>(() =>
        service.Get(new GetStatus { LastName = "Hendrix" }));
}
```

This example doesn't need a container as we're injecting all the dependencies manually.

## Testing ServiceStack classes in Unit Tests

Much of ServiceStack functionality assumes there's an AppHost is available which for Unit Tests you can just use an In Memory AppHost, e.g:

```csharp
[Test]
public void My_unit_test()
{
    using (new BasicAppHost().Init())
    {
        //test ServiceStack classes
    }
}
```

If preferred this can be set up once per test fixture following this pattern:

```csharp
public class MyUnitTests
{
    ServiceStackHost appHost;
    public MyUnitTests() => appHost = new BasicAppHost().Init();

    [OneTimeTearDown]
    public void OneTimeTearDown() => appHost.Dispose();

    [Test]
    public void My_unit_test()
    {
        //test ServiceStack classes
   }
}
```


# Community Resources

  - [ServiceStack 4 HTTP Utilities: Contract Testing](http://kylehodgson.com/2014/06/03/servicestack-4-http-utilities-contract-testing/) by [@kylehodgson](https://twitter.com/kylehodgson)
  - [Regression testing ServiceStack services with RavenDB embedded](http://iwayneo.blogspot.co.uk/2014/05/regression-testing-servicestack.html) by [@wayne_douglas](https://twitter.com/wayne_douglas)
  - [ServiceStack – Testing services with Chrome REST Console](http://dilanperera.wordpress.com/2014/02/23/servicestack-testing-services-with-chrome-rest-console/)
  - [ServiceStack and RavenDB End to End Testing](http://tech.pro/tutorial/1276/servicestack-and-ravendb-end-to-end-testing) by [@aquabirdconsult](https://twitter.com/AquaBirdConsult)
  - [Integration Testing With ServiceStack](http://rossipedia.com/blog/2013/02/integration-testing-with-servicestack/) by [@rossipedia](https://twitter.com/rossipedia)
  - [How to unit test your database code when using ServiceStack OrmLite](http://www.rickardnilsson.net/post/2013/01/19/how-to-unit-test-your-database-code-when-using-servicestack-ormlite.aspx) by [@rickardn](https://twitter.com/rickardn)
  - [EasyHttp and ServiceStack, making the mspec tests better](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/easyhttp-and-servicestack-making-it) by [@chrissie1](https://twitter.com/chrissie1)
  - [Using ServiceStack for the EasyHttp integration tests](http://blogs.lessthandot.com/index.php/DesktopDev/MSTech/using-servicestack-for-the-easyhttp) by [@chrissie1](https://twitter.com/chrissie1)
  - [Parameterized Tests for ServiceStack Web Services](http://nikosbaxevanis.com/2012/02/18/parameterized-tests-for-servicestack-web-services/)

### Stack Overflow

  - [Unit Test HTTPRequest Headers with ServiceStack](http://stackoverflow.com/a/14791657/85785)
  - [ServiceStack and Mocking, any tutorials?](http://stackoverflow.com/a/9587745/85785)
  - [How do you mock ServiceStack ISession using Moq and StructureMap?](http://stackoverflow.com/a/15012300/85785)
