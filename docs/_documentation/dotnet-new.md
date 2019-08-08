---
slug: dotnet-new
title: .NET Core 2.1 and ASP.NET Project Templates
---

There are a number of the most popular starting ServiceStack v5 Project Templates available in the GitHub organizations:

 - **.NET Core 2.1 C# Templates** - [github.com/NetCoreTemplates](https://github.com/NetCoreTemplates)
 - **.NET Framework C# Templates** - [github.com/NetFrameworkTemplates](https://github.com/NetFrameworkTemplates)
 - **ASP.NET Core .NET Framework C# Templates** - [github.com/NetFrameworkCoreTemplates](https://github.com/NetFrameworkCoreTemplates)

The **dotnet-new** script included in [@servicestack/cli](https://github.com/ServiceStack/servicestack-cli) can be used to create projects from the available templates:

### Installing @servicestack/cli

    $ npm install -g @servicestack/cli

If you have an old version installed, you can upgrade to the latest version with:

    $ npm install -g @servicestack/cli@latest

### Create projects with dotnet-new

This will make the `dotnet-new` script available which you can use to view all the available templates by running it without any arguments:

    $ dotnet-new

Which displays a list of available templates:

![](/images/ssvs/dotnet-new-list.png)

You can then create a project from one of the templates, e.g:

    $ dotnet-new vue-spa Acme

Which will generate a new project with the folder names and source files replaced with your project name, e.g:

![](/images/ssvs/dotnet-new-spa-files.png)

### Visual Studio

You can open then run the `Acme.sln` in VS .NET 2017+ which will automatically restore and install both the .NET and npm packages when first loaded. This can take a bit of time to install everything, once it's finished you'll see the `wwwroot` folder populated with your generated Webpack app which includes a `dist` folder and `index.html` page. After these are generated you can run your App with **F5** as normal. 

### VS Code and Project Rider

If you're using JetBrains Rider you can install npm packages by opening `package.json` and run the "npm install" tooltip on the bottom right. In VS Code you'll need to run `npm install` from the command-line.

## Troubleshooting

If installing templates [fails on Windows with "EPERM, operation not permitted"](https://github.com/Medium/phantomjs/issues/19), you'll need to 
temporarily disable Windows Anti Virus real-time protection:

![](/images/troubleshooting/disable-av.png)
