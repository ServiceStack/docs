---
title: Typed SqlExpression support for JOINs
---

Whilst OrmLite aims to provide a light-weight typed wrapper around SQL, it offers a number of convenient features that makes working with relational databases a clean and enjoyable experience.

Starting with the most basic example you can simply specify the table you want to join with:

```csharp
var q = db.From<Customer>()
          .Join<CustomerAddress>();

var dbCustomers = db.Select<Customer>(q);
```

This query roughly maps to the following SQL:

```sql
SELECT Customer.* 
  FROM Customer 
       INNER JOIN 
       CustomerAddress ON (Customer.Id == CustomerAddress.CustomerId)
```

Just like before `q` is an instance of `SqlExpression<Customer>` which is bounded to the base `Customer` type (and what any subsequent implicit API's apply to).

To better illustrate the above query, lets expand it to the equivalent explicit query:

```csharp
SqlExpression<Customer> q = db.From<Customer>();
q.Join<Customer,CustomerAddress>((cust,address) => cust.Id == address.CustomerId);

List<Customer> dbCustomers = db.Select(q);
```

## Reference Conventions

The above query implicitly joins together the `Customer` and `CustomerAddress` POCO's using the same `{ParentType}Id` property convention used in [OrmLite's support for References](https://github.com/ServiceStack/ServiceStack.OrmLite/blob/master/tests/ServiceStack.OrmLite.Tests/LoadReferencesTests.cs), e.g:

```csharp
class Customer {
    public int Id { get; set; }
    ...
}
class CustomerAddress {
    public int Id { get; set; }
    public int CustomerId { get; set; }  // Reference based on Property name convention
}
```

References based on matching alias names is also supported, e.g:

```csharp
[Alias("LegacyCustomer")]
class Customer {
    public int Id { get; set; }
    ...
}
class CustomerAddress {
    public int Id { get; set; }

    [Alias("LegacyCustomerId")]             // Matches `LegacyCustomer` Alias
    public int RenamedCustomerId { get; set; }  // Reference based on Alias Convention
}
```

## Self References

Self References are also supported for **1:1** relations where the Foreign Key can instead be on the parent table:

```csharp
public class Customer
{
    ...
    public int CustomerAddressId { get; set; }

    [Reference]
    public CustomerAddress PrimaryAddress { get; set; }
}
```

## Foreign Key and References Attributes

References that don't follow the above naming conventions can be declared explicitly using
the `[References]` and `[ForeignKey]` attributes:

```csharp
public class Customer
{
    [References(typeof(CustomerAddress))]
    public int PrimaryAddressId { get; set; }

    [Reference]
    public CustomerAddress PrimaryAddress { get; set; }
}
```

::: info
Reference Attributes take precedence over naming conventions
:::

### Multiple Self References

The example below shows a customer with multiple `CustomerAddress` references which are able to be matched with
the `{PropertyReference}Id` naming convention, e.g:

```csharp
public class Customer
{
    [AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }

    [References(typeof(CustomerAddress))]
    public int? HomeAddressId { get; set; }

    [References(typeof(CustomerAddress))]
    public int? WorkAddressId { get; set; }

    [Reference]
    public CustomerAddress HomeAddress { get; set; }

    [Reference]
    public CustomerAddress WorkAddress { get; set; }
}
```

Once defined, it can be saved and loaded via OrmLite's normal Reference and Select API's, e.g:

```csharp
var customer = new Customer
{
    Name = "The Customer",
    HomeAddress = new CustomerAddress {
        Address = "1 Home Street",
        Country = "US"
    },
    WorkAddress = new CustomerAddress {
        Address = "2 Work Road",
        Country = "UK"
    },
};

db.Save(customer, references:true);

var c = db.LoadSelect<Customer>(x => x.Name == "The Customer");
c.WorkAddress.Address.Print(); // 2 Work Road

var ukAddress = db.Single<CustomerAddress>(x => x.Country == "UK");
ukAddress.Address.Print();     // 2 Work Road
```

## Implicit Reference Conventions are applied by default

The implicit relationship above allows you to use any of these equivalent APIs to JOIN tables:

```csharp
q.Join<CustomerAddress>();
q.Join<Customer,CustomerAddress>();
q.Join<Customer,CustomerAddress>((cust,address) => cust.Id == address.CustomerId);
```

## Selecting multiple columns across joined tables

The `SelectMulti` API lets you select from multiple joined tables into a typed tuple

```csharp
var q = db.From<Customer>()
    .Join<Customer, CustomerAddress>()
    .Join<Customer, Order>()
    .Where(x => x.CreatedDate >= new DateTime(2016,01,01))
    .And<CustomerAddress>(x => x.Country == "Australia");

var results = db.SelectMulti<Customer, CustomerAddress, Order>(q);

foreach (var tuple in results)
{
    Customer customer = tuple.Item1;
    CustomerAddress custAddress = tuple.Item2;
    Order custOrder = tuple.Item3;
}
```

Thanks to Micro ORM's lightweight abstractions over ADO.NET that maps to clean POCOs, we can also use
OrmLite's embedded version of [Dapper's QueryMultiple](http://stackoverflow.com/a/37420341/85785):

```csharp
var q = db.From<Customer>()
    .Join<Customer, CustomerAddress>()
    .Join<Customer, Order>()
    .Select("*");

using (var multi = db.QueryMultiple(q.ToSelectStatement()))
{
    var results = multi.Read<Customer, CustomerAddress, Order, 
        Tuple<Customer,CustomerAddress,Order>>(Tuple.Create).ToList();

    foreach (var tuple in results)
    {
        Customer customer = tuple.Item1;
        CustomerAddress custAddress = tuple.Item2;
        Order custOrder = tuple.Item3;
    }
}
```

## SELECT DISTINCT in SelectMulti

[SelectMulti](typed-joins) APIs for populating
multiple tables now supports **SELECT DISTINCT** with:

```csharp
var tuples = db.SelectMulti<Customer, CustomerAddress>(q.SelectDistinct());
```

## Select data from multiple tables into a Custom POCO

Another implicit behaviour when selecting from a typed SqlExpression is that results are mapped to the
`Customer` POCO. To change this default we just need to explicitly specify what POCO it should map to instead:

```csharp
List<FullCustomerInfo> customers = db.Select<FullCustomerInfo>(
    db.From<Customer>().Join<CustomerAddress>());
```

Where `FullCustomerInfo` is any POCO that contains a combination of properties matching any of the joined
tables in the query.

The above example is also equivalent to the shorthand `db.Select<Into,From>()` API:

```csharp
var q = db.From<Customer>()
          .Join<CustomerAddress>();

var customers = db.Select<FullCustomerInfo,Customer>(q);
```

Rules for how results are mapped is simply each property on `FullCustomerInfo` is mapped to the first matching property in any of the tables in the order they were added to the SqlExpression.

The mapping also includes a fallback for referencing fully-qualified names in the format: `{TableName}{FieldName}` allowing you to reference ambiguous fields, e.g:

- `CustomerId` => **"Customer"."Id"**
- `OrderId` => **"Order"."Id"**
- `CustomerName` => **"Customer"."Name"**
- `OrderCost` => **"Order"."Cost"**


### SELECT JOIN examples

You can SELECT all fields for a table by returning the entire instance in the custom anonymous type, e.g:

```csharp
var q = db.From<Table>()
    .Join<JoinedTable>()
    .OrderBy(x => x.Id)
    .Select<Table, JoinedTable>((a, b) => new { a, b.TableId });

var rows = db.Select<CombinedResult>(q);
```

Which selects all columns from the primary `Table` as well as `TableId` from `JoinedTable`.

You can also specify SQL Aliases for ambiguous columns using anonymous properties, e.g:

```csharp
var q = db.From<Table>()
    .Join<JoinedTable>()
    .Select<Table, JoinedTable>((a, b) => new { a, JoinId = b.Id, JoinName = b.Name });
```

Which is roughly equivalent to:

    SELECT a.*, b.Id AS JoinId, b.Name AS JoinName

Where it selects all columns from the primary `Table` as well as `Id` and `Name` columns from `JoinedTable,` 
returning them in the `JoinId` and `JoinName` custom aliases.

Being able to select all columns works in other areas as well, e.g. you can **GROUP BY** all columns of 
a table with:

```csharp
var q = db.From<Table>()
    .GroupBy(x => new { x });
```

Which would return the same results as a **SELECT DISTINCT** on all columns of `Table`.