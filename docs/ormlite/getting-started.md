---
title: Getting started with OrmLite
---

After [installing OrmLite](installation) we now need to configure OrmLite's DB Connection Factory containing the RDBMS Dialect you want to use and the primary DB connection string you wish to connect to. Most NuGet OrmLite packages only contain a single provider listed below:

```csharp
SqlServerDialect.Provider      // SQL Server Version 2012+
SqliteDialect.Provider         // Sqlite
PostgreSqlDialect.Provider     // PostgreSQL 
MySqlDialect.Provider          // MySql
OracleDialect.Provider         // Oracle
FirebirdDialect.Provider       // Firebird
```

### SQL Server Dialects

Except for SQL Server which has a number of different dialects to take advantage of features available in each version, please use the best matching version closest to your SQL Server version:

```csharp
SqlServer2008Dialect.Provider  // SQL Server <= 2008
SqlServer2012Dialect.Provider  // SQL Server 2012
SqlServer2014Dialect.Provider  // SQL Server 2014
SqlServer2016Dialect.Provider  // SQL Server 2016
SqlServer2017Dialect.Provider  // SQL Server 2017+
```

## OrmLite Connection Factory

To configure OrmLite you'll need your App's DB Connection string along the above RDBMS Dialect Provider, e.g:

```csharp
var dbFactory = new OrmLiteConnectionFactory(
    connectionString,  
    SqlServerDialect.Provider);
```

If you're using an IOC register `OrmLiteConnectionFactory` as a **singleton**:

```csharp
services.AddSingleton<IDbConnectionFactory>(
    new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider)); //InMemory Sqlite DB
```

Which can then be used to open DB Connections to your RDBMS.

### Creating Table and Seed Data Example

If connecting to an empty database you can use OrmLite's Create Table APIs to create any missing tables you need, which OrmLite creates
based solely on the Schema definition of your POCO data models.

`CreateTableIfNotExists` returns **true** if the table didn't exist and OrmLite created it, where it can be further populated with any initial seed data it should have, e.g:

```csharp
using var db = dbFactory.Open();

if (db.CreateTableIfNotExists<Poco>())
{
    db.Insert(new Poco { Id = 1, Name = "Seed Data"});
}

var result = db.SingleById<Poco>(1);
result.PrintDump(); //= {Id: 1, Name:Seed Data}
```

### Multiple database connections

Any number of named RDBMS connections can be registered OrmLite's DbFactory `RegisterConnection`, e.g:

```csharp
// SqlServer with a named "Reporting" PostgreSQL connection as a part of the same `dbFactory`
var dbFactory = new OrmLiteConnectionFactory(connString, SqlServer2012Dialect.Provider);
container.Register<IDbConnectionFactory>(dbFactory);

dbFactory.RegisterConnection("Reporting", pgConnString, PostgreSqlDialect.Provider);
```

Named connections can be opened by its name:

```csharp
using var db = dbFactory.Open("Reporting");
```

If using ServiceStack the `[NamedConnection]` attribute can be used to configure Services `base.Db` connection with the named connection RDBMS, e.g:

```csharp
[NamedConnection("Reporting")]
public class QueryReports {}

public class ReportServices : Service
{
    public object Any(QueryReports request) => Db.Select<Reports>();
}
```

Or if using [AutoQuery](/autoquery) it can be used to associate Data Models with the named connection:

```csharp
[NamedConnection("Reporting")]
public class Reports { ... }

public class QueryReports : QueryDb<Reports> {}
```

More examples available in [Multitenancy](/multitenancy) docs.

# Detailed Walkthrough

OrmLite is a lightweight, convention-based Object-Relational Mapper (ORM) offered within the ServiceStack suite of libraries. This tutorial aims to guide you through the basic functionality of OrmLite, covering its usage both as a standalone library and as an integrated part of a ServiceStack service. You will learn how to set up OrmLite, create data models, perform standard CRUD operations, and utilize the library's unique query functionalities. This tutorial provides a comprehensive starting point for developers looking to understand and effectively use OrmLite in their .NET projects.

## Setup and Installation

To begin using OrmLite, you'll need to install it in your project. For a basic Console application, you'll want to add the OrmLite NuGet package for the database you're planning to use. This tutorial will use SQLite as an example. So, within your Package Manager Console, input `Install-Package ServiceStack.OrmLite.Sqlite`.

The next step is creating a connection to your database. Here's how you do it:

```csharp
var dbFactory = new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider);
```

This snippet establishes an in-memory SQLite database connection. In a real-world application, you'd replace `":memory:"` with your SQLite database's connection string.

OrmLite supports multiple database types, including MS SQL Server, MySQL, and PostgreSQL. To use these, simply install the corresponding NuGet package and replace `SqliteDialect.Provider` with the appropriate provider (i.e., `SqlServerDialect.Provider`, `MySqlDialect.Provider`, or `PostgreSqlDialect.Provider`).

If you're planning on using OrmLite within a ServiceStack project, you can streamline the setup process with the ServiceStack .NET tool `x` and the command `x mix <database technology>`. For SQLite, use `x mix sqlite`.

After setup, you're now ready to establish a database connection and execute queries from your project.

# Basic Usage (Standalone)

OrmLite is designed for simplicity and efficiency, enabling you to perform CRUD operations directly from your .NET classes. Here's an example of how you can utilize OrmLite in a standalone context.

## Creating a Connection

Creating a connection with your database is as simple as calling `OpenDbConnection` on your `IDbConnectionFactory` instance.

```csharp
using var db = dbFactory.OpenDbConnection();
```

This line establishes a connection to your database and ensures it is correctly disposed of once you're finished.

## Creating a Model

OrmLite maps C# classes to database tables. Here's an example model class `Order`:

```csharp
public class Order
{
    [AutoIncrement]
    public int Id { get; set; }
    public string Customer { get; set; }
    public DateTime OrderDate { get; set; }
}
```

In this class, the `Id` property is annotated with `[AutoIncrement]`, telling OrmLite to auto-increment this field for new records.

## Creating a Table

Once your model is defined, you can use it to create a new table:

```csharp
db.CreateTableIfNotExists<Order>();
```

This method creates a new `Order` table if it doesn't already exist in your database.

## Inserting Data

To insert data, use the `Insert` method:

```csharp
var order = new Order
{
    Customer = "John Doe",
    OrderDate = DateTime.UtcNow
};

db.Insert(order);
```

The `Insert` method adds a new record to the `Order` table. If you want to retrieve the auto-incremented Id after the insert, use `Insert` and `selectIdentity` together:

```csharp
var orderId = db.Insert(order, selectIdentity: true);
```

## Updating Data

Updating records is just as easy. Make sure your instance includes the primary key value:

```csharp
order.Customer = "Jane Doe";
db.Update(order);
```

This updates the `Order` record that has the same `Id` as `order`.

## Deleting Data

Finally, deleting a record is a simple call to `Delete`:

```csharp
db.Delete(order);
```

This deletes the `Order` record with the same `Id` as `order`. To delete a record based on a condition, use `Delete<T>(predicate)`:

```csharp
db.Delete<Order>(x => x.Customer == "Jane Doe");
```

This covers the basics of standalone OrmLite usage - creating a connection, defining a model, and performing CRUD operations. In the next sections, we'll dive into how to use OrmLite within a ServiceStack service and cover more complex queries and operations.

**Usage from a ServiceStack Service**

Utilizing OrmLite from a ServiceStack service is straightforward, due to ServiceStack's built-in integration with OrmLite. ServiceStack services can access a `Db` property which provides access to an OrmLite database connection.

## Registering the Database Connection Factory

Before you can use the `Db` property, you need to register an `IDbConnectionFactory` instance with ServiceStack's IoC container. This is usually done in your `ConfigureDb.cs` file:

```csharp
public class ConfigureDb : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            services.AddSingleton<IDbConnectionFactory>(new OrmLiteConnectionFactory(
                context.Configuration.GetConnectionString("DefaultConnection")
                ?? ":memory:",
                SqliteDialect.Provider));
        });
}
```

In this code, an `OrmLiteConnectionFactory` is created and registered as a singleton service. This factory will create database connections when needed, using the provided connection string and dialect provider.

## Creating a ServiceStack Service

Here's an example of a ServiceStack service that performs basic CRUD operations on an `Order`:

```csharp
public class OrderService : Service
{
    public object Any(GetOrder request)
    {
        return Db.SingleById<Order>(request.Id);
    }

    public object Any(CreateOrder request)
    {
        var order = new Order
        {
            Customer = request.Customer,
            OrderDate = DateTime.UtcNow
        };

        var orderId = Db.Insert(order, selectIdentity: true);
        return new CreateOrderResponse { Id = orderId };
    }

    public void Any(UpdateOrder request)
    {
        var order = Db.SingleById<Order>(request.Id);
        order.Customer = request.Customer;
        Db.Update(order);
    }

    public void Any(DeleteOrder request)
    {
        Db.DeleteById<Order>(request.Id);
    }
}
```

In this service, we're utilizing the `Db` property, which gives us a handle to the database connection. We can then use this handle to perform CRUD operations in the same way we did in a standalone context.

The service methods match HTTP verbs based on their prefix: `Any` methods can respond to any HTTP verb, `Get` methods respond to GET requests, `Post` methods respond to POST requests, and so on.

**Code-First Models**

OrmLite uses a code-first approach to data modeling, which means you define your data model using C# classes, and OrmLite will take care of creating the corresponding database schema. This includes creating tables, defining columns and their types, and setting up relationships between tables.

In OrmLite, you can add various attributes to your class and property definitions that control how they're treated by OrmLite when generating schema or performing database operations. Here's an example `Order` class with some of these attributes:

```csharp
[Alias("Orders")]
public class Order
{
    [AutoIncrement]
    [PrimaryKey]
    public int Id { get; set; }
    
    [Required]
    [Index(Unique = true)]
    public string OrderNumber { get; set; }

    [Reference]
    public List<OrderLine> OrderLines { get; set; }
}
```

In this class definition:

- The `[Alias]` attribute changes the name of the generated table to `Orders`.
- The `[AutoIncrement]` attribute specifies that the `Id` column should automatically increment its value.
- The `[PrimaryKey]` attribute designates `Id` as the primary key for the `Order` table.
- The `[Required]` attribute indicates that the `OrderNumber` property must have a value before an order can be inserted or updated in the database.
- The `[Index]` attribute creates an index on the `OrderNumber` column and the `Unique = true` property ensures that the `OrderNumber` value is unique across all orders.
- The `[Reference]` attribute enables us to use features like `LoadSelect<T>` to pull data from related tables.

The corresponding `OrderLine` class may look something like this:

```csharp
public class OrderLine
{
    [AutoIncrement]
    [PrimaryKey]
    public int Id { get; set; }

    [ForeignKey(typeof(Order))]
    public int OrderId { get; set; }

    public string Product { get; set; }

    public int Quantity { get; set; }
}
```

In this `OrderLine` class definition:

- The `[ForeignKey]` attribute defines a foreign key relationship from `OrderLine` to `Order`. The `OrderId` property in `OrderLine` corresponds to the `Id` property in `Order`.

# Different ways to Query

OrmLite offers several ways to query your database, catering to different levels of complexity and customization needs. Here, we will explore three methods: lambda expressions, the `From<T>` method, and plain SQL queries.

Let's use our `Order` and `OrderLine` models and assume we already have some data in our database.

## Lambda Expressions

Lambda expressions are the simplest way to query your database using OrmLite. You can use them directly within OrmLite's `Select<T>` method:

```csharp
var orders = db.Select<Order>(x => x.OrderNumber == "1234");
```

This line will fetch all orders where `OrderNumber` equals "1234". It's straightforward and easy to understand.

## `From<T>` Method

The `From<T>` method provides more flexibility than simple lambda expressions. It enables you to build more complex queries involving multiple tables and conditions:

```csharp
var q = db.From<Order>()
          .Join<Order, OrderLine>()
          .Where<Order>(x => x.OrderNumber == "1234");
var orders = db.Select<Order>(q);
```

This query fetches all orders, and their corresponding `OrderLine` entries, where `OrderNumber` equals "1234".

## Plain SQL

While OrmLite's query API is robust and handles a wide variety of query scenarios, there are times when you might need to drop down to raw SQL for the utmost control:

```csharp
var orders = db.Select<Order>("SELECT * FROM Orders WHERE OrderNumber = @orderNumber", new { orderNumber = "1234" });
```

This is a basic query but demonstrates that you can write and execute raw SQL queries in OrmLite.

# Inserting data

Inserting data into your database using OrmLite is as straightforward as querying. Let's dive into some examples using our `Order` and `OrderLine` models.

## Basic Insert

The simplest way to insert a new record into your database is by using the `Insert` method. You just need to create an instance of your model and pass it to the `Insert` method:

```csharp
var newOrder = new Order
{
    OrderNumber = "5678",
    OrderDate = DateTime.UtcNow
};

db.Insert(newOrder);
```

## Inserting with SelectIdentity

If your model has an `[AutoIncrement]` attribute on its primary key, you can retrieve the generated id during the insertion:

```csharp
var newOrder = new Order
{
    OrderNumber = "5678",
    OrderDate = DateTime.UtcNow
};

var newId = db.Insert(newOrder, selectIdentity: true);
```

## Inserting Multiple Records

OrmLite also allows you to insert multiple records at once:

```csharp
var orderLines = new List<OrderLine>
{
    new OrderLine { OrderId = newId, ProductName = "Product 1", Quantity = 2 },
    new OrderLine { OrderId = newId, ProductName = "Product 2", Quantity = 3 }
};

db.InsertAll(orderLines);
```

# Updating data

Updating records in your database with OrmLite is a simple task. Let's use our `Order` and `OrderLine` models for demonstration.

## Basic Update

The most straightforward way to update a record in your database is by using the `Update` method. You need to create an instance of your model with the desired changes and pass it to the `Update` method:

```csharp
var orderToUpdate = db.Single<Order>(x => x.OrderNumber == "5678");
orderToUpdate.OrderDate = DateTime.UtcNow;

db.Update(orderToUpdate);
```

In this example, the `Update` method uses the `Id` property (which is treated as the primary key by default) to identify the record to update.

## Conditional Update

In case you need to update multiple records based on a condition, you can use the `UpdateOnly` method. This method is powerful as it allows you to specify which properties to update and the condition for the records to be updated:

```csharp
db.UpdateOnly(() => new Order { OrderDate = DateTime.UtcNow },
    where: x => x.OrderNumber == "5678");
```

In this example, only the `OrderDate` property is updated for all `Order` records that have `"5678"` as their `OrderNumber`.

## Updating Related Records

Let's say you want to update the `ProductName` for a specific `OrderLine` associated with an `Order`. Here's how you can do it:

```csharp
var orderLineToUpdate = db.Single<OrderLine>(x => x.OrderId == 1 && x.ProductName == "Product 1");
orderLineToUpdate.ProductName = "Updated Product Name";

db.Update(orderLineToUpdate);
```

# Deleting data

Deleting records from your database is another straightforward operation with OrmLite. Once again, we'll use our `Order` and `OrderLine` models for demonstration.

## Basic Deletion

The simplest way to delete a record is by using the `Delete` method. You just need to pass an instance of your model with the ID of the record you want to delete:

```csharp
var orderToDelete = db.Single<Order>(x => x.OrderNumber == "5678");
db.Delete(orderToDelete);
```

In this example, the `Delete` method uses the `Id` property (which is treated as the primary key by default) to identify the record to delete.

## Conditional Deletion

If you need to delete multiple records based on a condition, you can also use the `Delete` method, but with a predicate:

```csharp
db.Delete<Order>(x => x.OrderNumber == "5678");
```

In this example, all `Order` records that have `"5678"` as their `OrderNumber` will be deleted.

# Using LoadSelect and Related Model Code Attributes

In real-world applications, it's quite common to deal with relationships between tables, like one-to-many or many-to-many relationships. OrmLite provides a set of `Load` prefixed methods to handle these relationships. These methods return the primary entity and populate its related entities.

For instance, to load an `Order` with its related `OrderLine`s, you can use the `LoadSelect` method:

```csharp
var orderWithLines = db.LoadSelect<Order>(x => x.Id == 1);
```

In this case, `LoadSelect` returns an `Order` object that also contains all the `OrderLine`s related to it. The relationship between `Order` and `OrderLine` is defined by the `ForeignKey` attribute:

```csharp
public class OrderLine
{
    [AutoIncrement]
    public int Id { get; set; }

    [ForeignKey(typeof(Order))]
    public int OrderId { get; set; }

    public string ProductName { get; set; }
    public decimal Price { get; set; }
}
```

The `ForeignKey` attribute in the `OrderLine` class establishes that the `OrderId` property is a foreign key that relates to the `Order` table.

# High-Level Features When Integrated with ServiceStack

While ServiceStack.OrmLite works effectively as a standalone micro ORM, it offers even more when integrated within the ServiceStack ecosystem. In this context, OrmLite can be leveraged to facilitate high-level features of ServiceStack such as AutoQuery, Locode, and code-first model generation.

## AutoQuery and Code First Models

In a typical ServiceStack application, OrmLite is commonly used to create code-first models that form the basis for database operations. One key advantage of this is the seamless integration with AutoQuery, a ServiceStack feature that enables automated generation of optimized, queryable services for defined models.

Here's an example of defining a model and an AutoQuery request DTO:

```csharp
public class Order
{
    [AutoIncrement]
    public int Id { get; set; }
    
    public string Customer { get; set; }
}

[Route("/orders")]
public class QueryOrders : QueryDb<Order>
{
}
```

## AutoQuery and Database First Approach

ServiceStack also supports a database-first approach, especially useful when working with an existing database. In this scenario, you can leverage AutoQuery's `GeneratedServices` feature. It allows you to create ready-to-use services based on your database schema.

```csharp
appHost.Plugins.Add(new AutoQueryFeature {
    MaxLimit = 1000,
    GenerateCrudServices = new GenerateCrudServices
    {
        AutoRegister = true
    }
}
```

## Locode

Locode is a built-in ServiceStack UI that provides an easy way to visualize, interact with your database and manage your data. When using OrmLite with AutoQuery, Locode can generate interfaces for your tables, enabling you to browse and manage your data.

## Code Generation with ServiceStack 'x' Tool

If you start with a database-first approach using `GeneratedServices`, ServiceStack provides a smooth transition to a code-first approach when you're ready. Using the `x` dotnet tool, you can generate all POCO model classes, as well as AutoQuery CRUD Request DTOs, all from an existing database schema. The command for this is:

```bash
x csharp https://localhost:5001 -path /crud/all/csharp
```

This will create a set of C# files that contain classes representing each table in your database, as well as the CRUD Request DTOs. From there, you can start to manipulate these models in a code-first manner while still leveraging all the powerful features of ServiceStack and OrmLite.

# Conclusion

We've journeyed through an introduction to ServiceStack.OrmLite, discussing its setup, basic usage, and how it can be used within a ServiceStack service. We've explored the power of code-first models, various ways of querying, inserting, updating, and deleting data using OrmLite, and how to leverage LoadSelect to handle related model data.

We also touched on some high-level features provided by OrmLite when integrated with ServiceStack, including AutoQuery, Locode, and transitioning from a database-first to a code-first approach using the 'x' dotnet tool.

The aim of this tutorial was to give you an understanding of the core concepts and capabilities of OrmLite and to demonstrate its potential as a reliable and efficient Micro ORM for your .NET projects. Whether used in a standalone context or as part of a wider ServiceStack application, OrmLite provides a lightweight, intuitive, and feature-rich data access solution.
