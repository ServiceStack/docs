---
title: OrmLite INSERT APIs
---

## Insert Examples

In most cases INSERT's in OrmLite is as straight forward as passing the POCO you want inserted:

```csharp
public record Artist(int Id, string Name);

//INSERT one row
db.Insert(new Artist { Id = 1, Name = "Faith No More" });

db.Insert( //INSERT multiple rows (params)
    new Artist { Id = 2, Name = "Live" },
    new Artist { Id = 3, Name = "Nirvana" });

//INSERT multiple rows (IEnumerable<T>)
db.InsertAll(new[] { 
    new Artist { Id = 4, Name = "Pearl Jam" },
    new Artist { Id = 5, Name = "Tool" } });

var artists = db.Select<Artist>();
$"All Artists: {artists.Dump()}".Print();
```

To see the behaviour of the different APIs, the examples below uses the following data models:

```csharp
public class Person
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int? Age { get; set; }
}

public class Artist 
{
    public int Id { get; set; }
    public string Name { get; set; }
    [Reference] public List<Track> Tracks { get; set; }
    public override string ToString() => Name;
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

## Full Inserts

An `Insert` will insert every field by default:

```csharp
db.Insert(new Person { Id = 1, FirstName = "Jimi", LastName = "Hendrix", Age = 27 });
```

## Partial Inserts

You can use `InsertOnly` for the cases you don't want to insert every field

```csharp
db.InsertOnly(() => new Person { FirstName = "Amy" });
```

Alternative API using an SqlExpression

```csharp
var q = db.From<Person>()
    .Insert(p => new { p.FirstName });

db.InsertOnly(new Person { FirstName = "Amy" }, onlyFields: q)
```

## Insert by Dictionary

```csharp
var row = new Person { FirstName = "John", LastName = "Smith" };
Dictionary<string,object> obj = row.ToObjectDictionary();
obj[nameof(Person.LastName)] = null;

row.Id = (int) db.Insert<Person>(obj, selectIdentity:true);
```

## Insert records with AutoIncrement Ids

OrmLite provides a couple of different ways to handle Inserting records with AutoIncrementing Ids:

```csharp
var autoId = db.Insert(new Track { 
    Name = "Everything's Ruined", Album = "Angel Dust", Year = 1992 
}, selectIdentity:true);

var track = db.SingleById<Track>(autoId);

var savedTrack = new Track { Name = "Ashes to Ashes", Album = "Album of the Year", Year = 1997 };
db.Save(savedTrack); // Populates savedTrack.Id

$"\nSaved AutoIncrement Id: {savedTrack.Id}".Print();
$"\nSaved Track: {savedTrack.Dump()}".Print();
```

## Save API

OrmLite's Save() API offers high-level functionality over Insert() including auto populating AutoIncrementing Ids, transparently handling Insert or Updates and saving reference data:

```csharp
db.Save(new Artist { 
    Id = 1, Name = "Faith No More", 
    Tracks = new List<Track> { 
        new Track { Name = "Everythings Ruined", Album = "Angel Dust", Year = 1992 },
        new Track { Name = "Ashes to Ashes", Album = "Album of the Year", Year = 1997 },
    }
}, references:true);

var artist = db.SingleById<Artist>(1);
var tracks = db.Select<Track>();
var artistWithTracks = db.LoadSingleById<Artist>(1);

var track = new Track { Name = "The Gentle Art of Making Enemies", Album = "King for a Day", Year = 1995, ArtistId=1 };
db.Save(track); // Inserts new Track
$"\nInserted Track: {db.SingleById<Track>(track.Id).Dump()}".Print();

track.Name = "King for a Day... Fool for a Lifetime";
db.Save(track); // Updates existing Track
$"\nUpdated Track: {db.SingleById<Track>(track.Id).Dump()}".Print();
```

## InsertOnly

Use InsertOnly() for the rare cases when you don't want to insert an entire record. One instance when you would want to do this is to use the default value defined on the underlying CREATE TABLE RDBMS Schema:

```csharp
db.InsertOnly(() => new Track { Name = "State of Love and Trust", Album = "Singles" });

//Using explicit fields
db.InsertOnly(new Track { Name = "I Got ID", Album = "Merkin Ball" }, x => new { x.Name, x.Album });

var tracks = db.Select<Track>();
```