---
title: License Registration
slug: register
---

The ServiceStack license key allows un-restricted access to ServiceStack packages and is available in your My Account Section after purchasing a commercial license.

There are multiple ways of registering your license key, all options only need to be added to your top-level host projects:

### a) Add it to your Web.Config or appsettings.json

The easiest way to register your license key is in to copy the servicestack:license appSetting into your Web.config or App.config's <appSettings/> config section, e.g:

```xml
<appSettings>
    <add key="servicestack:license" value="{licenseKeyText}" />
</appSettings>
```

For ASP.NET Core Apps add it to your appsettings.json instead:

```json
{
    "servicestack": {
        "license": "{licenseKeyText}"
    }
}
```

### b) Add it in code before your Application Starts Up

By calling Licensing.RegisterLicense() before your application starts up, E.g. For ASP.NET, place it in the Global.asax Application_Start event:

```csharp
protected void Application_Start(object sender, EventArgs e)
{
    Licensing.RegisterLicense(licenseKeyText);
    new AppHost().Init();
}
```

Otherwise for a self-hosting Console Application, place it before initializing the AppHost, as shown above.

### c) Add the System Environment Variable

To simplify license key registration when developing multiple ServiceStack solutions you can register the License Key once in the SERVICESTACK_LICENSE Environment Variable on each pc using ServiceStack libraries:

    Variable               Value    
    SERVICESTACK_LICENSE   {licenseKeyText}

> Note: you'll need to restart IIS or VS.NET for them to pickup any new Environment Variables.

### d) Copy license key text into an external text file

Similar to above, we can register the license from an external plain-text file containing the license key text, e.g:

```csharp
protected void Application_Start(object sender, EventArgs e)
{
    Licensing.RegisterLicenseFromFileIfExists("~/license.txt".MapHostAbsolutePath());
    new AppHost().Init();
}
```

For Self-Hosting set the BuildAction to Copy if Newer and use "~/license.txt".MapAbsolutePath() extension method.

> Note: the license key is white-space insensitive so can be broken up over multiple lines.



