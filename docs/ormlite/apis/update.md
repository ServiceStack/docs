---
title: OrmLite UPDATE APIs
---


To see the behaviour of the different APIs, the examples below uses the following data models:

```csharp
public class Person
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
}

public class Track 
{
    [AutoIncrement] 
    public int Id { get; set; }
    public string Name { get; set; }
    public int ArtistId { get; set; }
    public string Album { get; set; }
    public int Year { get; set; }
    public override string ToString() => Name;
}
```

## Updates

Updating any model without any filters will update every field, except the **Id** which
is used to filter the update to this specific record:

```csharp
db.Update(new Person { Id = 1, FirstName = "Jimi", LastName = "Hendrix", Age = 27});
```

Example updating existing data model in-place:

```csharp
var alive = db.Single<Track>(x => x.Name == "Alive"); 
alive.Name = "Still Alive";
alive.Year = 2000;
db.Update(alive); // Updates all fields except `Id` which is used to filter
var updatedTrackById = db.SingleById<Track>(alive.Id);
```

If you supply your own where expression, it updates every field (inc. Id) but uses your filter instead:

```csharp
db.Update(new Person { Id = 1, FirstName = "JJ" }, p => p.LastName == "Hendrix");
```

One way to limit the fields which gets updated is to use an **Anonymous Type**:

```csharp
db.Update<Person>(new { FirstName = "JJ" }, p => p.LastName == "Hendrix");
```

Updates ALL fields matching specified filter:

```csharp
db.Update(new Track { Id = 20, Name = "Partially Alive...", ArtistId = alive.ArtistId }, 
	where: x => x.Name == "Still Alive...");
```

Or by using `UpdateNonDefaults` which only updates the non-default values in your model using the filter specified:

```csharp
db.UpdateNonDefaults(new Person { FirstName = "JJ" }, p => p.LastName == "Hendrix");
```

Update only fields in anonymous type:

```csharp
db.Update<Track>(new { Year = 2000 }, where: x => x.Id == 20);
```

Multi update example:

```csharp
var pearlJamTracks = db.Select<Track>(x => x.ArtistId == alive.ArtistId);
pearlJamTracks.Each(x => x.Album = "Rear View Mirror (Greatest Hits 1991–2003)");
db.Update(pearlJamTracks[0], pearlJamTracks[1]); //Update by params
```

## UpdateOnly

As updating a partial row is a common use-case in Db's, we've added a number of methods for just
this purpose, named **UpdateOnly**.

The lambda syntax lets you update only the fields listed in property initializers, e.g:

```csharp
db.UpdateOnly(() => new Person { FirstName = "JJ" });
```

The second argument lets you specify a filter for updates:

```csharp
db.UpdateOnly(() => new Person { FirstName = "JJ" }, where: p => p.LastName == "Hendrix");
```

Alternatively you can pass in a POCO directly, in which case the first expression in an `UpdateOnlyFields`
statement is used to specify which fields should be updated:

```csharp
db.UpdateOnlyFields(new Person { FirstName = "JJ" }, onlyFields: p => p.FirstName);

db.UpdateOnlyFields(new Person { FirstName = "JJ", Age = 12 }, 
    onlyFields: p => new { p.FirstName, p.Age });

db.UpdateOnlyFields(new Person { FirstName = "JJ", Age = 12 }, 
    onlyFields: p => new[] { "Name", "Age" });
```

When present, the second expression is used as the where filter:

```csharp
db.UpdateOnlyFields(new Person { FirstName = "JJ" }, 
    onlyFields: p => p.FirstName, 
    where: p => p.LastName == "Hendrix");
```
Instead of using the expression filters above you can choose to use an SqlExpression builder which provides more flexibility when you want to programmatically construct the update statement:

```csharp
var q = db.From<Person>()
    .Update(p => p.FirstName);

db.UpdateOnlyFields(new Person { FirstName = "JJ", LastName = "Hendo" }, onlyFields: q);
```

Using an Object Dictionary:

```csharp
var updateFields = new Dictionary<string,object> {
    [nameof(Person.FirstName)] = "JJ",
};

db.UpdateOnly<Person>(updateFields, p => p.LastName == "Hendrix");
```

Using a typed SQL Expression:

```csharp
var q = db.From<Person>()
    .Where(x => x.FirstName == "Jimi")
    .Update(p => p.FirstName);
          
db.UpdateOnlyFields(new Person { FirstName = "JJ" }, onlyFields: q);
```

## Updating existing values

The `UpdateAdd` API provides several Typed API's for updating existing values:

```csharp
//Increase everyone's Score by 3 points
db.UpdateAdd(() => new Person { Score = 3 }); 

//Remove 5 points from Jackson Score
db.UpdateAdd(() => new Person { Score = -5 }, where: x => x.LastName == "Jackson");

//Graduate everyone and increase everyone's Score by 2 points 
db.UpdateAdd(() => new Person { Points = 2, Graduated = true });

//Add 10 points to Michael's score
var q = db.From<Person>()
    .Where(x => x.FirstName == "Michael");
db.UpdateAdd(() => new Person { Points = 10 }, q);

//UpdateAdd on non-numeric fields are updated normally:
db.UpdateAdd(() => new Track { Year = -10, Album = "Lost a decade" }, x => x.Year == 1997); 

//Add 10 years to all 1991 Tracks
var q = db.From<Track>()
    .Where(x => x.Year == 1991);
db.UpdateAdd(() => new Track { Year = 10 }, q);
```

::: info
Any non-numeric values in an `UpdateAdd` statement (e.g. strings) are replaced as normal.
:::

## Update by Dictionary

```csharp
Person row = db.SingleById<Person>(row.Id);
var obj = row.ToObjectDictionary();
obj[nameof(Person.LastName)] = "Smith";
db.Update<Person>(obj);
```

## UpdateOnly by Dictionary

```csharp
// By Primary Key Id
var fields = new Dictionary<string, object> {
    [nameof(Person.Id)] = 1,
    [nameof(Person.FirstName)] = "John",
    [nameof(Person.LastName)] = null,
};

db.UpdateOnly<Person>(fields);

// By Custom Where Expression
var fields = new Dictionary<string, object> {
    [nameof(Person.FirstName)] = "John",
    [nameof(Person.LastName)] = null,
};

db.UpdateOnly<Person>(fields, p => p.LastName == "Hendrix");
```
