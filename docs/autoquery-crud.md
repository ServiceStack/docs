---
slug: autoquery-crud
title: AutoQuery CRUD
---

AutoQuery Services includes support for implementing much of a CRUD Services logic declaratively, including support for multi-tenancy, 
optimistic concurrency, declarative validation, Auto Mapping external of Request/Respond DTOs to data model properties, 
auto populating then using full #Script Expressions that can be used for example to populate timestamps, 
authenticating user information, generating new UUIDs, etc.

Just like AutoQuery, CRUD Services are ServiceStack Services where you can continue using the same functionality to 
specify optimal user-defined routes for HTTP APIs, same Request/Response and Attribute filters to apply custom logic and 
continue enjoying the entire ecosystem around ServiceStack Services including being able to invoke them via 
[gRPC](/grpc), [MQ endpoints](/messaging) and its rich client ecosystem for enabling end-to-end Typed APIs with 
[Add ServiceStack Reference](/add-servicestack-reference).

AutoQuery Services are fast & emit clean optimal "pure serialized POCO" wire-format, they're built on OrmLite's high-performance 
APIs where all AutoQuery APIs are `async` by default but also also offers native sync APIs if needing to enlist any of
AutoQuery's functionality in custom sync methods (that are unable to be converted into viral async APIs).

Importantly AutoQuery Services are "future-proofed" and can be overridden with a custom implementation that can either choose to augment 
the existing AutoQuery functionality and enhance it with custom behavior (e.g. if not possible to implement declaratively) or if needed its 
entire implementation can be replaced without breaking its design contract & existing client integrations, should it be necessary to
reimplement later if the Service needs to be constructed to use alternative data sources.

### Rapidly develop data-driven systems

As AutoQuery lets you declaratively develop Services by just defining their API Contract with POCO DTOs you're able to develop entire 
data-driven systems in a fraction of the time that it would take to implement them manually. In addition AutoQuery Services are semantically
richer as all capabilities are declaratively defined around typed data models which makes it possible to build higher-level generic features
like ServiceStack's Studio [Instant UI for AutoQuery Services](/studio-autoquery).

With AutoQuery you can now build entire Apps declaratively to develop high-performance capable Services accessible via ServiceStack's 
industry leading [myriad of Service endpoints](/why-servicestack#features-overview) and rich metadata services, all without needing to write any implementation!

For a sample of the productivity enabled checkout the [Bookings CRUD](https://github.com/NetCoreApps/BookingsCrud) demo to create a multi-user ASP.NET Core Booking System from scratch within minutes with full Audit History, fine-grained permissions, declarative validation, run adhoc queries & export to Excel by just defining code-first high-performance AutoQuery CRUD Typed APIs 

<iframe width="896" height="525" src="https://www.youtube.com/embed/XpHAaCTV7jE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Creating AutoQuery CRUD Services

Just like [AutoQuery](/autoquery-rdbms), you just need to provide the typed Request DTOs definition for your DB Table APIs and 
AutoQuery automatically provides the implementation for the Service. 

To enlist Auto CRUD behavior your Request DTOs need to implement one of the following interfaces which dictates the behavior of the Service:

  - `ICreateDb<Table>` - Create new Table Entry
  - `IUpdateDb<Table>` - Update existing Table Entry 
  - `IPatchDb<Table>`  - Partially update existing Table Entry 
  - `IDeleteDb<Table>` - Delete existing Table Entry 

All Request DTOs also require either an `IReturn<T>` or `IReturnVoid` marker interface to specify the return type of the Service. 

::: info
Can use built-in `IReturn<EmptyResponse>` for an "empty" response where as `IReturnVoid` returns "no" response.
:::

Let's go through a simple example, starting with a simple POCO OrmLite data model we want to add to our RDBMS:

```csharp
public class Rockstar
{
    [AutoIncrement]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime? DateDied { get; set; }
    public LivingStatus LivingStatus { get; set; }
}
```

We can create a Service that **inserts** a new `Rockstar` by defining all the properties we want to allow API consumers to provide when creating a new Rockstar:

```csharp
public class CreateRockstar : ICreateDb<Rockstar>, IReturn<CreateRockstarResponse> 
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
    public DateTime DateOfBirth { get; set; }
}

public class CreateRockstarResponse
{
    public int Id { get; set; } // Id is auto populated with RDBMS generated Id
    public ResponseStatus ResponseStatus { get; set; }
}
```

When ServiceStack starts it generates the implementation for this Service, which can now insert Rockstars using your populated Request DTO:

```csharp
var client = new JsonServiceClient(baseUrl);

client.Post(new CreateRockstar {
    FirstName = "Kurt",
    LastName = "Cobain",
    Age = 27,
    DateOfBirth = new DateTime(20,2,1967),
});
```

Similarly you can define **Update** and **Delete** Services the same way, e.g:

```csharp
public class UpdateRockstar : Rockstar,
    IUpdateDb<Rockstar>, IReturn<UpdateRockstarResponse> {}

public class UpdateRockstarResponse
{
    public int Id { get; set; } // Id is auto populated with RDBMS generated Id
    public Rockstar Result { get; set; } // selects & returns latest DB Rockstar
    public ResponseStatus ResponseStatus { get; set; }
}
```

By convention if your Response DTO contains any of these properties it will be automatically populated:

 - `T Id` - The Primary Key
 - `T Result` - The POCO you want to return (can be a subset of DB model)
 - `int Count` - Return the number of rows affected (typically 1, but Deletes can be >1)

Delete Services need only a Primary Key, e.g:

```csharp
public class DeleteRockstar : IDeleteDb<Rockstar>, IReturnVoid 
{
    public int Id { get; set; }
}
```

and to Query the Rockstar table you have the [full featureset of AutoQuery](/autoquery-rdbms) for a complete set of CRUD Services without needing to provide any implementations.

### AutoQuery CRUD Attributes

AutoQuery CRUD extends existing [querying functionality in AutoQuery](/autoquery-rdbms) with additional features covering common functionality in CRUD operations:

 - `[AutoApply]` - Apply built-in composite generic behavior
 - `[AutoPopulate]` - Populate data models with generic user & system info
 - `[AutoFilter]` - Apply pre-configured filters to query operations
 - `[AutoMap]` - Map System Input properties to Data Model fields
 - `[AutoDefault]` - Specify to fallback default values when not provided
 - `[AutoIgnore]` - Ignore mapping Request DTO property to Data Model

Each of these are covered in more detail in the docs and examples below.

### Advanced CRUD Example

Lets now explore a more advanced example that implements Audit information as well as layered support for multi-tenancy to see how you can easily compose features.

So lets say you have an interface that all tables you want to contain Audit information implements:

```csharp
public interface IAudit 
{
    DateTime CreatedDate { get; set; }
    string CreatedBy { get; set; }
    string CreatedInfo { get; set; }
    DateTime ModifiedDate { get; set; }
    string ModifiedBy { get; set; }
    string ModifiedInfo { get; set; }
    DateTime? SoftDeletedDate { get; set; }
    string SoftDeletedBy { get; set; }
    string SoftDeletedInfo { get; set; }
}
```

It's not required, but it's also useful to have a concrete base table which could be annotated like:

```csharp
public abstract class AuditBase : IAudit
{
    public DateTime CreatedDate { get; set; }
    [Required]
    public string CreatedBy { get; set; }
    [Required]
    public string CreatedInfo { get; set; }

    public DateTime ModifiedDate { get; set; }
    [Required]
    public string ModifiedBy { get; set; }
    [Required]
    public string ModifiedInfo { get; set; }

    [Index] //Check if Deleted
    public DateTime? SoftDeletedDate { get; set; }
    public string SoftDeletedBy { get; set; }
    public string SoftDeletedInfo { get; set; }
}
```

We can then create a base Request DTO that all Audit Create Services will implement:

```csharp
[ValidateIsAuthenticated]
[AutoPopulate(nameof(IAudit.CreatedDate),  Eval = "utcNow")]
[AutoPopulate(nameof(IAudit.CreatedBy),    Eval = "userAuthName")] //or userAuthId
[AutoPopulate(nameof(IAudit.CreatedInfo),  Eval = "`${userSession.DisplayName} (${userSession.City})`")]
[AutoPopulate(nameof(IAudit.ModifiedDate), Eval = "utcNow")]
[AutoPopulate(nameof(IAudit.ModifiedBy),   Eval = "userAuthName")] //or userAuthId
[AutoPopulate(nameof(IAudit.ModifiedInfo), Eval = "`${userSession.DisplayName} (${userSession.City})`")]
public abstract class CreateAuditBase<Table,TResponse> : ICreateDb<Table>, IReturn<TResponse> {}
```
These all call [#Script Methods](https://sharpscript.net/docs/methods) which you can [add/extend yourself](https://sharpscript.net/docs/sharp-pages#extend).

The `*Info` examples is a superfluous example showing that you can basically evaluate any `#Script` expression. Typically you'd only save User Id or Username

### AutoPopulate

The `[AutoPopulate]` attribute tells AutoCrud that you want the DB Table to automatically populate these properties, which can be populated using any of its
properties below:

 - **Value** - A constant value that can be used in C# Attributes, e.g `Value="Foo"`
 - **Expression** - A Lightweight [#Script](https://sharpscript.net/) Expression that results in a constant value that's only evaluated once and cached globally, e.g. `Expression = "date(2001,1,1)"`, useful for values that can't be defined in C# Attributes like `DateTime`, can be any [#Script Method](https://sharpscript.net/docs/default-scripts).
 - **Eval** - A [#Script](https://sharpscript.net/) Expression that's cached per request. E.g. `Eval="utcNow"` calls the `utcNow` Script method which returns `DateTime.UtcNow` which is cached for that request so all other `utcNow` expressions will return the same exact value. 
 - **NoCache** - Don't cache the expression, evaluate it each time.

AutoCrud makes extensive usage of `#Script` expressions for much of its declarative functionality which always executes their cached ASTs so expressions are only parsed once and still fast to evaluate even when results are not cached.

Lets now layer on additional generic functionality by inheriting and extending the base class with additional functionality, e.g. if we want our table to support [Multitenancy](/multitenancy) we could extend it with:

```csharp
[AutoPopulate(nameof(IAuditTenant.TenantId), Eval = "Request.Items.TenantId")]
public abstract class CreateAuditTenantBase<Table,TResponse> 
    : CreateAuditBase<Table,TResponse> {}
```

Where `TenantId` is added in a Global Request Filter (e.g. after inspecting the authenticated UserSession to determine the tenant they belong to), e.g:

```csharp
const string TenantId = nameof(TenantId);

void SetTenant(IRequest req, IResponse res, object dto)
{
    var userSession = req.SessionAs<AuthUserSession>();
    if (userSession.IsAuthenticated)
    {
        req.SetItem(TenantId, userSession.City switch {
            "London" => 10,
            "Perth"  => 11,
            //...
            _        => 100,
        });
    }
}
    
GlobalRequestFilters.Add(SetTenant);        // HTTP Requests
GlobalMessageRequestFilters.Add(SetTenant); // MQ Requests
```

Now we easily implement custom "Audited" and "Multi Tenant" CRUD Services by inheriting these base Services. 

Here's an example of our custom Table that implements our `AuditBase` class with a `TenantId` to capture the Tenant the record should be saved to:

```csharp
public class RockstarAuditTenant : AuditBase
{
    [Index]
    public int TenantId { get; set; }
    [AutoIncrement]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public DateTime? DateDied { get; set; }
    public LivingStatus LivingStatus { get; set; }
}
```

Our service can now implement our base Audit & Multitenant enabled service:

```csharp
public class CreateRockstarAuditTenant 
    : CreateAuditTenantBase<RockstarAuditTenant, CreateRockstarResponse>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
    public DateTime DateOfBirth { get; set; }
}
```

And all the decorated properties will be automatically populated when creating the Rockstar with `CreateRockstarAuditTenant`, e.g:

```csharp
client.Post(new CreateRockstarAuditTenant {
    FirstName = "Kurt",
    LastName = "Cobain",
    Age = 27,
    DateOfBirth = new DateTime(20,2,1967),
});
```

We can create the same base classes for Updates:

```csharp
[ValidateIsAuthenticated]
[AutoPopulate(nameof(IAudit.ModifiedDate), Eval = "utcNow")]
[AutoPopulate(nameof(IAudit.ModifiedBy),   Eval = "userAuthName")] //or userAuthId
[AutoPopulate(nameof(IAudit.ModifiedInfo), Eval = "`${userSession.DisplayName} (${userSession.City})`")]
public abstract class UpdateAuditBase<Table,TResponse> 
    : IUpdateDb<Table>, IReturn<TResponse> {}

[AutoFilter(nameof(IAuditTenant.TenantId), Eval="Request.Items.TenantId")]
public abstract class UpdateAuditTenantBase<Table,TResponse> 
    : UpdateAuditBase<Table,TResponse> {}

public class UpdateRockstarAuditTenant 
    : UpdateAuditTenantBase<RockstarAuditTenant, RockstarWithIdResponse>
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public LivingStatus? LivingStatus { get; set; }
}
```

::: info
the `[AutoPopulate]` properties only appear on the Data Model, not the external Request DTO since we don't want external API consumers to populate them.
:::

For Apps that prefer to never delete rows and instead mark records as deleted so an audit trail is retained, we can implement "Soft Deletes" using an UPDATE to populate the `SoftDelete*` fields behind-the-scenes:

```csharp
[ValidateIsAuthenticated]
[AutoPopulate(nameof(IAudit.SoftDeletedDate), Eval = "utcNow")]
[AutoPopulate(nameof(IAudit.SoftDeletedBy),   Eval = "userAuthName")] //or userAuthId
[AutoPopulate(nameof(IAudit.SoftDeletedInfo), Eval = "`${userSession.DisplayName} (${userSession.City})`")]
public abstract class SoftDeleteAuditBase<Table,TResponse> 
    : IUpdateDb<Table>, IReturn<TResponse> {}

[AutoFilter(QueryTerm.Ensure, nameof(IAuditTenant.TenantId),  Eval = "Request.Items.TenantId")]
public abstract class SoftDeleteAuditTenantBase<Table,TResponse> 
    : SoftDeleteAuditBase<Table,TResponse> {}

public class SoftDeleteAuditTenant 
    : SoftDeleteAuditTenantBase<RockstarAuditTenant, RockstarWithIdResponse>
{
    public int Id { get; set; }
}
```

To implement a "Real" permanently destructive DELETE you would instead implement `IDeleteDb<T>`:

```csharp
[ValidateIsAuthenticated]
[AutoFilter(QueryTerm.Ensure, nameof(IAuditTenant.TenantId),  Eval = "Request.Items.TenantId")]
public class RealDeleteAuditTenant 
    : IDeleteDb<RockstarAuditTenant>, IReturn<RockstarWithIdResponse>
{
    public int Id { get; set; }
    public int? Age { get; set; }
}
```

### Multi RDBMS Services

As they're just regular ServiceStack Services everything you’re used to that works with normal services also works with new Auto Crud Services, to
recap you can annotate the **DB Model** with the `[NamedConnection]` attribute to specify which 
[registered named connection](/multitenancy#changedb-apphost-registration) AutoQuery should use:

```csharp
[NamedConnection("Reporting")]
public class NamedRockstar : Rockstar { } //DB Model
```

Where all AutoQuery Services for that data model will query the **Reporting** database instead:

```csharp
public class CreateNamedRockstar : RockstarBase, 
    ICreateDb<NamedRockstar>, IReturn<RockstarWithIdAndResultResponse>
{
    public int Id { get; set; }
}

public class UpdateNamedRockstar : RockstarBase, 
    IUpdateDb<NamedRockstar>, IReturn<RockstarWithIdAndResultResponse>
{
    public int Id { get; set; }
}
```

#### Custom AutoQuery CRUD Services

Alternatively the `[ConnectionInfo]` can be [used on Service implementations](/multitenancy#connectioninfo-attribute), but as AutoQuery doesn't 
have them you'd need to provide custom implementations that can delegate to their respective Auto Crud API, e.g:

```csharp
[ConnectionInfo(NamedConnection = MyDatabases.Reporting)]
public class MyReportingServices : Service
{
    public IAutoQueryDb AutoQuery { get; set; }

    public Task<object> Any(CreateConnectionInfoRockstar request) => 
        AutoQuery.CreateAsync(request, Request);

    public Task<object> Any(UpdateConnectionInfoRockstar request) => 
        AutoQuery.UpdateAsync(request, Request);
}
```

### AutoFilter

If you're creating Soft Delete & Multi tenant services you'll want to ensure that every query only returns records in their tenant and doesn't return deleted items, which we can implement using an `[AutoFilter]`, e.g:

```csharp
[ValidateIsAuthenticated]
[AutoFilter(QueryTerm.Ensure, nameof(IAudit.SoftDeletedDate), Template = SqlTemplate.IsNull)]
[AutoFilter(QueryTerm.Ensure, nameof(IAuditTenant.TenantId),  Eval = "Request.Items.TenantId")]
public abstract class QueryDbTenant<From, Into> : QueryDb<From, Into> {}
```

The `[AutoFilter]` lets you add pre-configured filters to the query, `QueryTerm.Ensure` utilizes OrmLite's new `Ensure()` APIs which forces always applying this filter, even if the query contains other `OR` conditions.

This base class will then let you create concrete queries that doesn't return soft deleted rows and only returns rows from the same tenant as the authenticated user, e.g:

```csharp
public class QueryRockstarAudit : QueryDbTenant<RockstarAuditTenant, Rockstar>
{
    public int? Id { get; set; }
}
```

To coincide with AutoCRUD there's also support for [declarative validation](https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.WebHost.Endpoints.Tests/AutoQueryCrudTests.Validate.cs) which thanks to [#Script](https://sharpscript.net/) lets you define your Fluent Validation Rules by annotating your Request DTO properties. As it's essentially a different way to define Fluent Validation Rules, it still [needs Validation enabled](/validation#validation-feature) to run:

```csharp
Plugins.Add(new ValidationFeature());
```

### AutoMap and AutoDefault Attributes

The `[AutoDefault]` attribute allows you to specify default values that the Data Model should be populated with using the same `#Script` expression support 
available in `[AutoPopulate]` to populate constant values, cached constant expressions or results of full evaluated expressions.

The `[AutoMap]` attributes enables the flexibility of being able to maintain different external property names from their internal data models, but still
be able to declaratively map them.

Here's an example `ICreateDb<T>` AutoCrud Service that makes use of both these attributes to achieve its desired behavior:


```csharp
public class CreateRockstarAutoMapDefault : ICreateDb<Rockstar>, IReturn<RockstarWithIdResponse>
{
    [AutoMap(nameof(Rockstar.FirstName))]
    public string MapFirstName { get; set; }

    [AutoMap(nameof(Rockstar.LastName))]
    public string MapLastName { get; set; }
    
    [AutoMap(nameof(Rockstar.Age))]
    [AutoDefault(Value = 21)]
    public int? MapAge { get; set; }
    
    [AutoMap(nameof(Rockstar.DateOfBirth))]
    [AutoDefault(Expression = "date(2001,1,1)")]
    public DateTime MapDateOfBirth { get; set; }

    [AutoMap(nameof(Rockstar.DateDied))]
    [AutoDefault(Eval = "utcNow")]
    public DateTime? MapDateDied { get; set; }
    
    [AutoMap(nameof(Rockstar.LivingStatus))]
    [AutoDefault(Value = LivingStatus.Dead)]
    public LivingStatus? MapLivingStatus { get; set; }
}
```

### AutoIgnore Attributes

To send additional properties with your AutoQuery CRUD Request DTO which doesn't match the data model you can ignore the validation check
by annotating properties with the `[AutoIgnore]` Attribute, e.g:

```csharp
public class CustomRockstarService : ICreateDb<Rockstar>, IReturn<RockstarWithIdResponse>
{
    public int Id { get; set; }
    public int? Age { get; set; }
    [AutoIgnore]
    public CustomInfo CustomInfo { get;set; }
}
```

Or you can ignore validation for all properties with the same name by registering it to `AutoQuery.IgnoreCrudProperties`, e.g:

```csharp
AutoQuery.IgnoreCrudProperties.Add(nameof(CustomInfo));
```

### Apply Generic CRUD Behaviors

The AutoQuery Attributes are used to construct a metadata model of each operation used to enlist the desired functionality that each Service should have.
This metadata model can also be programmatically constructed allowing you to codify conventions by grouping annotated attributes under a single `[AutoApply]`
attribute resulting in the same behavior had the AutoQuery Request been annotated with the attributes directly, e.g:

```csharp
[AutoApply(Behavior.AuditQuery)]
public class QueryBookings { ... } // Equivalent to:

[AutoFilter(QueryTerm.Ensure, nameof(AuditBase.DeletedDate), Template = SqlTemplate.IsNull)]
public class QueryBookings { ... }


[AutoApply(Behavior.AuditCreate)]
public class CreateBooking { ... } // Equivalent to:

[AutoPopulate(nameof(AuditBase.CreatedDate),  Eval = "utcNow")]
[AutoPopulate(nameof(AuditBase.CreatedBy),    Eval = "userAuthName")]
[AutoPopulate(nameof(AuditBase.ModifiedDate), Eval = "utcNow")]
[AutoPopulate(nameof(AuditBase.ModifiedBy),   Eval = "userAuthName")]
public class CreateBooking { ... }
```

The `[AutoApply]` attribute is itself an inert marker for capturing what generic behavior you want applied to AutoQuery Services. 
All built-in behavior is declared on the `Behavior` static class:

```csharp
public static class Behavior
{
    // Auto Filter SoftDeleted Results
    public const string AuditQuery = nameof(AuditQuery);
    
    // Auto Populate CreatedDate, CreatedBy, ModifiedDate & ModifiedBy fields
    public const string AuditCreate = nameof(AuditCreate);
    
    // Auto Populate ModifiedDate & ModifiedBy fields
    public const string AuditModify = nameof(AuditModify);
    
    // Auto Populate DeletedDate & DeletedBy fields
    public const string AuditDelete = nameof(AuditDelete);
    
    // Auto Populate DeletedDate & DeletedBy fields and changes IDeleteDb operation to Update
    public const string AuditSoftDelete = nameof(AuditSoftDelete);
}
```

This functionality is implemented by extending the metadata for AutoQuery CRUD Services with additional attributes in `AutoQueryFeature.AutoCrudMetadataFilters` delegate filters where they result in the same behavior as if the Request DTOs were annotated with attributes directly. E.g. Here's the built-in filter for implementing the above behaviors:

```csharp
public static void AuditAutoCrudMetadataFilter(AutoCrudMetadata meta)
{
    foreach (var applyAttr in meta.AutoApplyAttrs)
    {
        switch (applyAttr.Name)
        {
            case Behavior.AuditQuery:
                meta.Add(new AutoFilterAttribute(
                    QueryTerm.Ensure, nameof(AuditBase.DeletedDate), SqlTemplate.IsNull));
                break;
            case Behavior.AuditCreate:
            case Behavior.AuditModify:
                if (applyAttr.Name == Behavior.AuditCreate)
                {
                    meta.Add(new AutoPopulateAttribute(nameof(AuditBase.CreatedDate)) {
                        Eval = "utcNow"
                    });
                    meta.Add(new AutoPopulateAttribute(nameof(AuditBase.CreatedBy)) {
                        Eval = "userAuthName"
                    });
                }
                meta.Add(new AutoPopulateAttribute(nameof(AuditBase.ModifiedDate)) {
                    Eval = "utcNow"
                });
                meta.Add(new AutoPopulateAttribute(nameof(AuditBase.ModifiedBy)) {
                    Eval = "userAuthName"
                });
                break;
            case Behavior.AuditDelete:
            case Behavior.AuditSoftDelete:
                if (applyAttr.Name == Behavior.AuditSoftDelete)
                    meta.SoftDelete = true;

                meta.Add(new AutoPopulateAttribute(nameof(AuditBase.DeletedDate)) {
                    Eval = "utcNow"
                });
                meta.Add(new AutoPopulateAttribute(nameof(AuditBase.DeletedBy)) {
                    Eval = "userAuthName"
                });
                break;
        }
    }
}
```

You can use this same functionality to describe your own custom generic functionality, e.g. Lets say you wanted to instead populate your base class with Audit Info containing different named properties with **local** `DateTime` and UserAuth `Id`. You can define your own Behavior name for this functionality:

```csharp
[AutoApply("MyUpdate")]
public class UpdateBooking { ... }
```

and implement it with a custom `AutoCrudMetadataFilters` that populates the Audit `[AutoPopulate]` attributes on all Request DTOs marked with your Behavior name, e.g:

```csharp
void MyAuditFilter(AutoCrudMetadata meta)
{
    if (meta.HasAutoApply("MyUpdate"))
    {
        meta.Add(new AutoPopulateAttribute(nameof(MyBase.MyModifiedDate)) {
            Eval = "now"
        });
        meta.Add(new AutoPopulateAttribute(nameof(MyBase.MyModifiedBy)) {
            Eval = "userAuthId"
        });
    }
}

Plugins.Add(new AutoQueryFeature {
    AutoCrudMetadataFilters = { MyAuditFilter },
});
```

### AutoQuery CRUD Events

AutoQuery includes `OnBefore*` and `OnAfter*` (sync & async) events for `Create`, `Update`, `Patch` & `Delete` that can be used to execute custom logic before or after each AutoQuery CRUD operation. E.g. if your system implements their own Audit history via RDBMS triggers, you can use the `OnBefore` **Delete** event to update the record with deleted info before the AutoQuery CRUD operation deletes it:

```csharp
Plugins.Add(new AutoQueryFeature {
    OnBeforeDeleteAsync = async ctx => {
        if (ctx.Dto is DeleteBooking deleteBooking)
        {
            var session = await ctx.Request.GetSessionAsync();
            await ctx.Db.UpdateOnlyAsync(() => new Booking {
                DeletedBy = session.UserAuthName,
                DeletedDate = DateTime.UtcNow,
            }, where: x => x.Id == deleteBooking.Id);
        }                
    },
});
```

::: info
AutoQuery generates **async** Services by default which will invoke the `*Async` events, but if you implement a [sync Custom AutoQuery CRUD Service](/autoquery-crud#custom-autoquery-crud-services) it executes the **sync** events instead so you'd need to implement the `OnBeforeDelete` custom hook instead.
:::

### Custom Complex Mapping

Another opportunity to apply more complex custom mapping logic before resorting to creating an actual Service implementation is to make use of
ServiceStack's built-in [Auto Mapping Populator API](/auto-mapping#intercept-automapping-conversions) to intercept an AutoMapping conversion
between 2 types and apply custom logic after `ConvertTo<T>` or `PopulateWith<T>` APIs, e.g:

```csharp
AutoMapping.RegisterPopulator((Dictionary<string,object> target, CreateRockstar source) => 
{
    if (!IsAlive(source))
    {
        target[nameof(source.LivingStatus)] = LivingStatus.Dead;
    }
});
```
 
### Auto Guid's

In addition to supporting `[AutoIncrement]` to insert records with Auto Incrementing Ids, you can use `[AutoId]` to insert entities with
[RDBMS generated UUIDs](/ormlite/reference-support#auto-populated-guid-ids) where they're supported otherwise
OrmLite populates them with `Guid.NewGuid()`.

::: info
usage of inheritance isn't required & has the same behavior as using explicit properties
:::

```csharp
public abstract class RockstarBase
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
    public DateTime DateOfBirth { get; set; }
}

public class Rockstar : RockstarBase
{
    [AutoId]
    public Guid Id { get; set; }
}

public class CreateRockstarWithAutoGuid : RockstarBase, ICreateDb<Rockstar>, IReturn<RockstarWithIdResponse>
{
}
```

Or if you prefer for Id's to always be populated with `Guid.NewGuid()`, remove `[AutoId]` and populate it with `[AutoPopulate]` instead:

```csharp
[AutoPopulate(nameof(Rockstar.Id),  Eval = "nguid")]
public class CreateRockstarWithAutoGuid : RockstarBase, ICreateDb<Rockstar>, IReturn<RockstarWithIdResponse>
{
}
```

### Optimistic Concurrency

We can declaratively add support for [OrmLite's Optimistic Concurrency](/ormlite/optimistic-concurrency) by
including `ulong RowVersion` property on Auto Crud Request/Response DTOs and Data Models, e.g:

```csharp
// Data Model
public class RockstarVersion : RockstarBase
{
    [AutoIncrement]
    public int Id { get; set; }

    public ulong RowVersion { get; set; }
}

public class CreateRockstarVersion : RockstarBase, ICreateDb<RockstarVersion>,
    IReturn<RockstarWithIdAndRowVersionResponse> { }

public class UpdateRockstarVersion : RockstarBase, IPatchDb<RockstarVersion>,
    IReturn<RockstarWithIdAndRowVersionResponse>
{
    public int Id { get; set; }
    public ulong RowVersion { get; set; }
}

// Response DTO
public class RockstarWithIdAndRowVersionResponse
{
    public int Id { get; set; }
    public ulong RowVersion { get; set; }
    public ResponseStatus ResponseStatus { get; set; }
}
```

AutoQuery will populate the `RowVersion` in Response DTOs which will need to be provided whenever making changes to that entity where it will fail to update the entity if no `RowVersion` was provided or has since been modified:

```csharp
var createResponse = client.Post(new CreateRockstarVersion {
    FirstName = "Original",
    LastName = "Version",
    Age = 20,
    DateOfBirth = new DateTime(2001,7,1),
    LivingStatus = LivingStatus.Dead,
});

// throws OptimisticConcurrencyException: No RowVersion provided
client.Patch(new UpdateRockstarVersion {
    Id = createResponse.Id, 
    LastName = "UpdatedVersion",
});

// succeeds if "Original Version" wasn't modified otherwise throws OptimisticConcurrencyException 
var response = client.Patch(new UpdateRockstarVersion {
    Id = createResponse.Id, 
    LastName = "UpdatedVersion",
    RowVersion = createResponse.RowVersion,
});
```

### MQ AutoQuery CRUD Requests

As AutoQuery CRUD Services are just ServiceStack Services they can partake in its ecosystem of features like being able to 
[invoke Services via MQ](/messaging), although there's some extra consideration needed to account for the differences between HTTP and MQ Requests.
First whatever filters you've added to populate the `IRequest.Items` like tenant Id you'll also need to register in `GlobalMessageRequestFilters`
so they're executed for MQ Requests as well:

```csharp
GlobalRequestFilters.Add(SetTenant);        // HTTP Requests
GlobalMessageRequestFilters.Add(SetTenant); // MQ Requests
```

Secondly Auth Information is typically sent in the HTTP Request Headers, but they need to be included in the Request DTO to send Authenticated 
MQ Requests, which can either implement `IHasSessionId` for normal [Session Auth Providers](/authentication-and-authorization#session-authentication-overview), e.g:

```csharp
public class CreateRockstarAuditTenant 
  : CreateAuditTenantBase<RockstarAuditTenant, RockstarWithIdAndResultResponse>, IHasSessionId
{
    public string SessionId { get; set; } //Authenticate MQ Requests
    //...
}
```

Alternatively they can implement `IHasBearerToken` for [stateless Bearer Token](/authentication-and-authorization#authentication-per-request-auth-providers)
Auth providers like JWT or API Keys.

If you're publishing an MQ Request inside a HTTP Service you can use the `PopulateRequestDtoIfAuthenticated` extension method which populates the Request 
DTO from the Authenticated HTTP Request, e.g:

```csharp
public class AutoCrudMqServices : Service
{        
    public void Any(CreateRockstarAuditTenantMq request)
    {
        var mqRequest = request.ConvertTo<CreateRockstarAuditTenant>();
        Request.PopulateRequestDtoIfAuthenticated(mqRequest);
        PublishMessage(mqRequest);
    }
}
```

In this case if using [Background MQ](/background-mq), it will execute the `CreateRockstarAuditTenant` request in a background thread, populating the MQ Request Context with the session identified by the `IRequest.GetSessionId()`.

#### Publishing Requests to OneWay Endpoint

You can also send MQ requests directly by [publishing to the OneWay HTTP endpoint](/messaging#oneway-http-requests-are-published-to-mq-then-executed), which if your AppHost is registered with an MQ Server, it will publish the message to the MQ and auto populate Request DTOs that implements `IHasSessionId` or `IHasBearerToken`, either if implicitly sent from an Authenticated client:

```csharp
var authResponse = authClient.Post(new Authenticate {
    provider = "credentials",
    UserName = "admin@email.com",
    Password = "p@55wOrd",
    RememberMe = true,
});

authClient.SendOneWay(new CreateRockstarAuditTenant {
    FirstName = nameof(CreateRockstarAuditTenant),
    LastName = "SessionId",
    Age = 20,
    DateOfBirth = new DateTime(2002,2,2),
});
```

Or from an anonymous client with the explicit `BearerToken` or `SessionId` properties populated, e.g:

```csharp
client.SendOneWay(new CreateRockstarAuditMqToken {
    BearerToken = JwtUserToken,
    FirstName = nameof(CreateRockstarAuditMqToken),
    LastName = "JWT",
    Age = 20,
    DateOfBirth = new DateTime(2002,2,2),
});
```

To save populating the `BearerToken` in each request, you can set it once on the Service Client which will automatically populate it on Request DTOs:

```csharp
client.BearerToken = jwtUserToken;
```

## AutoQuery CRUD Features

Building upon AutoQuery is a number of other features that increase the capabilities of AutoQuery Services & provide instant utility, including:

 - [Declarative Validation](/declarative-validation)
 - [Executable Audit Log](/autoquery-audit-log)
 - [Instantly Servicify with AutoGen](/autoquery-autogen)
 
