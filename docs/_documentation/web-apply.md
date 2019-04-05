---
slug: web-apply
title: Customize .NET Core Apps with 'web +'
---

Whilst we believe [web new](/web-new) is a super simple way to create and maintain project templates, we've also created an even 
simpler and lighter way to create projects - from gists!

We can use `web +` (read as "apply gist") to create light-weight customized projects by applying multiple gists on top of each other. 
One of the major benefits of this approach is that it's not only limited at project creation time as it's also a great way to easily add 
"layered functionality" to existing projects.

We can see an example of this earlier with how we can use this to 
[easily update dependencies in "lite" projects](/templates-lite#updating-lite-project-dependencies)
which is just applying the **vue-lite-lib** and **react-lite-lib** gists to your existing "lite" projects:

    $ web +vue-lite-lib

### Usage

Similar to `web` other features, we get the full user experience where we can list, search and apply gists from the commands below:

```
Usage: 
  web +                       Show available gists
  web +<name>                 Write gist files locally, e.g:
  web + #<tag>                Search available gists
  web gist <gist-id>          Write all Gist text files to current directory
```

Where we can view all available gists that we can apply to our projects with:

    $ web +

Which as of this writing lists:

```
   1. init                 Empty .NET Core 2.2 ServiceStack App                                   to: .                            by @ServiceStack  [project]
   2. init-lts             Empty .NET Core 2.1 LTS ServiceStack App                               to: .                            by @ServiceStack  [project]
   3. init-corefx          Empty ASP.NET Core 2.1 LTS on .NET Framework                           to: .                            by @ServiceStack  [project]
   4. init-sharp-app       Empty ServiceStack Sharp App                                           to: .                            by @ServiceStack  [project]
   5. bootstrap-sharp      Bootstrap + Sharp Pages Starter Template                               to: $HOST                        by @ServiceStack  [ui,sharp]
   6. sqlserver            Use OrmLite with SQL Server                                            to: $HOST                        by @ServiceStack  [db]
   7. sqlite               Use OrmLite with SQLite                                                to: $HOST                        by @ServiceStack  [db]
   8. postgres             Use OrmLite with PostgreSQL                                            to: $HOST                        by @ServiceStack  [db]
   9. mysql                Use OrmLite with MySql                                                 to: $HOST                        by @ServiceStack  [db]
  10. auth-db              AuthFeature with OrmLite AuthRepository, CacheClient (requires ui,db)  to: $HOST                        by @ServiceStack  [auth]
  11. auth-memory          AuthFeature with Memory AuthRepository, CacheClient (requires ui)      to: $HOST                        by @ServiceStack  [auth]
  12. validation-contacts  Contacts Validation Example                                            to: $HOST                        by @ServiceStack  [example,sharp]
  13. vue-lite-lib         Update vue-lite projects libraries                                     to: $HOST                        by @ServiceStack  [lib,vue]
  14. react-lite-lib       Update react-lite projects libraries                                   to: $HOST                        by @ServiceStack  [lib,react]
  15. nginx                Nginx reverse proxy config for .NET Core Apps                          to: /etc/nginx/sites-available/  by @ServiceStack  [config]
  16. supervisor           Supervisor config for managed execution of .NET Core Apps              to: /etc/supervisor/conf.d/      by @ServiceStack  [config]
  17. docker               Dockerfile example for .NET Core Web Apps                              to: .                            by @ServiceStack  [config]

 Usage:  web +<name>
         web +<name> <UseName>

Search:  web + #<tag>      Available tags: auth, config, db, example, lib, project, react, sharp, ui, vue
```

### apply.md

The way we populate this list is by extending the multi-purpose functionality of Markdown and using it as an "Executable Document" 
where the human-friendly [apply.md](https://gist.github.com/gistlyn/f3fa8c016bbd253badc61d80afe399d9) document below is also 
reused as the datasource to populate the above list:

{% include apply.md.html %}

This self-documenting list lets you browse all available gists and their contents the same way as the `web` tool does. 

That just like `web new` can be configured to use your own `apply.md` Gist document with:

    APP_SOURCE_GISTS=<gist id>

### Available Gists

As we expect to see this list of available gists expand greatly in future we've also included support for grouping related gists by `<tag>`, 
e.g. you can view available starting projects with:

    $ web + #project

```
Results matching tag [project]:

   1. init            Empty .NET Core 2.2 ServiceStack App          to: .  by @ServiceStack  [project]
   2. init-lts        Empty .NET Core 2.1 LTS ServiceStack App      to: .  by @ServiceStack  [project]
   3. init-corefx     Empty ASP.NET Core 2.1 LTS on .NET Framework  to: .  by @ServiceStack  [project]
   4. init-sharp-app  Empty ServiceStack Sharp App                  to: .  by @ServiceStack  [project]

 Usage:  web +<name>
         web +<name> <UseName>

Search:  web + #<tag> Available tags: auth, config, db, example, lib, project, react, sharp, ui, vue
```

Which can be chained together to search for all `project` and `sharp` gists we can use for [Sharp Pages](https://sharpscript.net/docs/sharp-pages) projects:

    $ web + #project,sharp

```
Results matching tags [project,sharp]:

   1. init                 Empty .NET Core 2.2 ServiceStack App          to: .      by @ServiceStack  [project]
   2. init-lts             Empty .NET Core 2.1 LTS ServiceStack App      to: .      by @ServiceStack  [project]
   3. init-corefx          Empty ASP.NET Core 2.1 LTS on .NET Framework  to: .      by @ServiceStack  [project]
   4. init-sharp-app       Empty ServiceStack Sharp App                  to: .      by @ServiceStack  [project]
   5. bootstrap-sharp      Bootstrap + Sharp Pages Starter Template      to: $HOST  by @ServiceStack  [ui,sharp]
   6. validation-contacts  Contacts Validation Example                   to: $HOST  by @ServiceStack  [example,sharp]

 Usage:  web +<name>
         web +<name> <UseName>

Search:  web + #<tag>      Available tags: auth, config, db, example, lib, project, react, sharp, ui, vue
```

### Creating customized projects

From this list we can see that we can create an **Empty .NET Core 2.2 ServiceStack App** by starting in a new App Folder:

    $ md ProjectName && cd ProjectName

Then applying the `init` labelled gist which will be saved to the `'.'` current directory:

    $ web +init

```
Write files from 'init' https://gist.github.com/gistlyn/58030e271595520d87873c5df5e4c2eb to:
  C:\projects\Example\ProjectName.csproj
  C:\projects\Example\Program.cs
  C:\projects\Example\Properties\launchSettings.json
  C:\projects\Example\ServiceInterface\MyServices.cs
  C:\projects\Example\ServiceModel\Hello.cs
  C:\projects\Example\Startup.cs
  C:\projects\Example\appsettings.Development.json
  C:\projects\Example\appsettings.json

Proceed? (n/Y):
```

Where its output will let you inspect and verify the gist it's writing and all the files that it will write to before accepting, by typing `y` or `Enter`.

To instead start with the **latest .NET Core LTS release**, run:

    $ web +init-lts

After we've created our empty .NET Core project we can configure it to use **PostgreSQL** with:

    $ web +postgres

Or we can give it a **Bootstrap Sharp Pages UI** with:

    $ web +bootstrap-sharp

What's even better is that gists can be chained, so we can create a **.NET Core 2.2 Bootstrap Sharp Pages App using PostgreSQL** with:

    $ web +init+bootstrap-sharp+postgres

A **Bootstrap Sharp Pages App** that includes a complete **Contacts Validation example** with:

    $ web +init+bootstrap-sharp+validation-contacts

The same as above, but its Auth replaced to persist in a **PostgreSQL** backend:

    $ web +init+bootstrap-sharp+validation-contacts+postgres+auth-db

If we decided later we wanted to switch to use **SQL Server** instead we can just layer it over the top of our existing App:

    $ web +sqlserver

This isn't just limited to gist projects, you can also apply gists when **creating new projects**:

    $ web new sharp+postgres+auth-db

Which will create a [sharp](https://github.com/NetCoreTemplates/sharp) project configured to use **PostgreSQL Auth**.

This works despite the `sharp` project being a [multi-project solution](/physical-project-structure) 
thanks to the `to: $HOST` modifier which says to **apply the gists files** to the `HOST` project.

### Apply Gist Modifiers

To enable a versatile and fine-grained solution you can use the modifiers below to control how gists are applied:

The modifiers next to each gist specify where the gist files should be written to:

 * `{to:'.'}` - Write to current directory (default)
 * `{to:'$HOST'}` - Write to host project (1st folder containing either `appsettings.json,Web.config,App.config,Startup.cs`)
 * `{to:'wwwroot/'}` - Write to first sub directories named `wwwroot`
 * `{to:'package.json'}` - Write to first directory containing `package.json`
 * `{to:'/etc/nginx/sites-available/'}` - Write to absolute folder
 * `{to:'$HOME/.my-app/'}` - Write to `$HOME` in unix or `%USERPROFILE%` on windows
 * `{to:'${EnumName}/.my-app/'}` - Write to `Environment.SpecialFolder.{EnumName}`, e.g:
 * `{to:'$UserProfile/.my-app/'}` - Write to `Environment.SpecialFolder.UserProfile`

#### File Name features

Use `\` in gist file names to write files to sub directories, e.g:

 * `wwwroot\js\script.js` - Writes gist file to `wwwroot/js/script.js`

Use `?` at end of filename to indicate optional file that **should not be overridden**, e.g: 

 * `wwwroot\login.html?` - Only writes to `wwwroot\login.html` if it doesn't already exist.

#### Replacement rules

Just like `web new` any gist file name or contents with different "MyApp" text styles will be replaced with the Project Name in that style, e.g:

 - `MyApp` will be replaced with `ProjectName`
 - `my-app` will be replaced with `project-name`
 - `My App` will be replaced with `Project Name`
 
#### Adding packages

To include nuget package dependencies, create a file in your gist called `_init` with the list of `dotnet` or `nuget` commands:

```
dotnet add package ServiceStack.OrmLite.Sqlite
```

### Open for Gists!

Whilst we intend to use this feature extensively to be able to deliver "pre-set layered functionality" to ServiceStack Users, we're
happy to maintain a curated list of gists that can **help any .NET Core project** as we've done with the `config` gists:

    $ web + #config

```
Results matching tag [config]:

   1. nginx       Nginx reverse proxy config for .NET Core Apps              to: /etc/nginx/sites-available/  by @ServiceStack  [config]
   2. supervisor  Supervisor config for managed execution of .NET Core Apps  to: /etc/supervisor/conf.d/      by @ServiceStack  [config]
   3. docker      Dockerfile example for .NET Core Web Apps                  to: .                            by @ServiceStack  [config]
```

Where being able to apply pre-configured configuration files like this reduces the required steps and effort to 
[Configure .NET Core Apps to run on Linux](/netcore-deploy-rsync).

#### How to include your gist

To add your gist to the public list [add a comment to apply.md](https://gist.github.com/gistlyn/f3fa8c016bbd253badc61d80afe399d9) with 
a link to your gist and the modifiers you want it to use.

### Apply adhoc Gists

Alternatively you can share and apply any gists by **gist id** or **URL**, e.g:

    $ web gist 58030e271595520d87873c5df5e4c2eb
    $ web gist https://gist.github.com/58030e271595520d87873c5df5e4c2eb
