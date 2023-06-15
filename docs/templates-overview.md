---
title: ServiceStack Project Templates
slug: templates-overview
---

<script setup>
import JamstackTemplates from "./src/components/JamstackTemplates.vue"
</script>


ServiceStack has its strong foundations as a Web and MQ Services framework whose [easy and versatile HTML support](https://razor.netcore.io/) makes it the ideal services framework to create Backend Systems and Web APIs, Websites, Single Page Apps, Windows Services, Self-Hosting Console Apps and Rich OSX and Winforms Desktop Apps.

## x new

All ServiceStack Project Templates can be found and installed using the [x new](/web-new) .NET Core tool that can be installed with:

:::sh
dotnet tool install --global x 
:::

### Apple M1

Install on Apple's new M1 Pro and M1 Max ARM chips with:

:::sh
dotnet tool install -g -a x64 x
:::

### Update

Or if you had a previous version installed, update with:

:::sh
dotnet tool update -g x
:::

## Explore available templates

Then run `x new` to view the list of available project templates:

:::sh
x new
:::

## Available Project Templates

ServiceStack is available in a number of popular starting configurations below:

## Jamstack

<a href="https://jamstacks.net" class="my-8 py-8 flex justify-center text-gray-600 hover:no-underline" title="jamstacks.net">
    <div class="flex justify-center items-end p-4 pt-0 border-2 border-solid border-transparent rounded hover:border-indigo-600">
        <svg viewBox="0 0 256 256" class="w-20 h-20 mr-2" alt="Jamstacks logo"><path d="M128 0C57.221 0 0 57.221 0 128c0 70.778 57.221 128 128 128c70.778 0 128-57.222 128-128V0H128z" fill="#F0047F"></path><path d="M121.04 134.96v93.312c-49.663-2.837-89.64-42.345-93.215-91.81l-.097-1.502h93.312zm90.962 0c-2.6 49.664-38.816 89.64-84.159 93.215l-1.377.097V134.96h85.536zm.112-91.074v85.648h-85.648V43.886h85.648z" fill="#FFF"></path></svg>
        <h1 class="text-8xl font-bold">Jamstacks</h1>
        <div class="ml-4 bg-purple-600 text-white py-1 pb-2 px-3 rounded-md text-7xl">.NET</div>
    </div>
</a>


[Jamstack](https://jamstack.org/what-is-jamstack) (**J**avaScript, **A**PIs, and **M**arkup) is a modern architecture pattern to build fast, secure and easy to scale web applications where pre-rendering content, enhancing with JavaScript and leveraging CDN static hosting results in a highly productive, flexible and performant system that takes advantage of CDN edge caches to deliver **greater performance** & efficiency at **lower cost**. 

### Jamstack Benefits

It's quickly becoming the preferred architecture for modern web apps with 
[benefits](https://jamstack.org/why-jamstack/) extending beyond performance to improved: 

 - **Security** from a reduced attack surface from hosting read-only static resources and requiring fewer App Servers
 - **Scale** with non-essential load removed from App Servers to CDN's architecture capable of incredible scale & load capacity
 - **Maintainability** resulting from reduced hosting complexity and the clean decoupling of UI and server logic
 - **Portability** with your static UI assets being easily capable from being deployed and generically hosted from any CDN or web server
 - **Developer Experience** with major JavaScript Frameworks embracing Jamstack in their dev model, libraries & tooling  

Ultimately, it's hosting your App's pre-rendered static UI assets on Content Delivery Network (CDN) edge caches close to users locations that's primarily responsible for its lightning performance.

<h3 class="text-center">Download new C# Jamstack Project Template</h3>

<JamstackTemplates class="pb-8" />

::: info
An updated list of available Jamstack project templates will be maintained at https://jamstacks.net (built with Vue SSG)
:::

### Blazor WebAssembly

The [Blazor WebAssembly (WASM)](/templates-blazor) template offers a pure end-to-end integrated C# solution to building a high performance web application with [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) and ServiceStack. Due to the integrated dev model we've been able to achieve in Blazor it's become **our preferred technology** to use to develop **Line of Business Apps** since it's the only C# Razor solution adopting our preferred [API First Development](/api-first-development) model with Web UIs reusing the same well-defined APIs as Mobile and Desktop Apps.

<iframe width="980" height="551" src="https://www.youtube.com/embed/TIgjMf_vtCI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Razor SSG

The [razor-ssg](https://razor-ssg.web-templates.io/posts/razor-ssg) ServiceStack template leverages the power of .NET Razor to provide seamless static site generation (SSG) capabilities. It's perfect for building content-rich applications like product websites, blogs, portfolios, and more. 

This template streamlines the development process while offering versatility in customizing and extending your project. With GitHub Codespaces integration, you can develop, test, and manage your application all within your browser, eliminating the need for a dedicated development environment and expediting your workflow.

<iframe width="980" height="551" src="https://www.youtube.com/embed/MRQMBrXi5Sc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Next.js

For those preferring working with **React**, there's a clear choice in Nextjs.org - currently the flagship & [most popular Jamstack](https://jamstack.org/generators/) framework backed by the folks over at [Vercel](https://vercel.com), where it enjoys deep engineering talent committed to maintaining and continually improving it, so you can be confident in the longevity of the technology and the React framework maintained by [Meta](https://meta.com) (Facebook).

<iframe width="980" height="551" src="https://www.youtube.com/embed/3pPLRyPsO5A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Vite

Vite is being [built for speed](https://vitejs.dev/guide/why.html) in the modern era and takes advantage of modern browser features like native ES modules support to remove bundling entirely during development and adopts performance leading technologies like [esbuild](https://github.com/evanw/esbuild) to pre-bundle dependencies and [transpile TypeScript](https://vitejs.dev/guide/features.html#typescript) which is able to do **20-30x** faster than TypeScript's own `tsc` compiler.

Ultimately its architectural choices allows Vite to deliver Lightning Fast **Hot Module Reload** (HMR) to remain at the developer-experience forefront of modern web development serving a [growing ecosystem](https://vitejs.dev/guide/) of frameworks with a rich typed suite of [Universal Plugins](https://vitejs.dev/plugins/).

<iframe width="980" height="551" src="https://www.youtube.com/embed/D-rU0lU_B4I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Webpack-powered Single Page App Templates

All [ServiceStack Single Page App templates](/templates-single-page-apps) are powered by [Webpack](https://webpack.js.org) which handles the development, testing and production builds of your Web App. See the [Webpack Template Docs](/templates-single-page-apps) for an overview for how to utilize the templates features.


[![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/spa-templates-overview.png)](/templates-single-page-apps)


### [Vue SPA Template](https://github.com/NetCoreTemplates/vue-spa)

<iframe class="video-hd" src="https://www.youtube.com/embed/4HphWPrKwb0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

> YouTube: [https://youtu.be/4HphWPrKwb0](https://youtu.be/4HphWPrKwb0)

### [AWS Lambda Template](https://github.com/NetCoreTemplates/aws-lambda)

This project lets you create a .NET 6 empty ServiceStack web project ready for deployment as a AWS Lambda Function wired with API GateWay and packaged via a Docker image.

<iframe class="video-hd" src="https://www.youtube.com/embed/8mpGNTsSlvE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

> YouTube: [https://youtu.be/8mpGNTsSlvE](https://youtu.be/8mpGNTsSlvE)

### Website Templates

![](https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/web.png)

[Website Templates](/templates-websites) contain popular starting Templates for creating Server HTML Generated Websites and HTTP APIs with ServiceStack.

### Empty Starting Templates

[Empty Web and Self Hosting Console and Windows Service Templates](/templates-websites).

### ASP.NET Core Web Apps on .NET Framework

Popular starting templates for creating [ASP.NET Core templates on the .NET Framework](/templates-corefx).

### Desktop Templates

[Desktop Templates](/templates-desktop) for packaging your ServiceStack Web App into different Native Desktop UIs.

## ServiceStackVS VS.NET Extension

[ServiceStackVS](https://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7) supports Visual Studio 2019-2022 and can be installed from within VS.NET:

### Install ServiceStackVS 

Install the ServiceStackVS VS.NET Extension by going to `Tools > Extensions and Updates...`

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/vs-extensions-manage.png)

Then searching the Visual Studio Gallery for **ServiceStack**

![](https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/ssvs/vs-extensions-ssvs.png)

Optionally it can be downloaded and installed from the [VS.NET Gallery](http://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7)

[![VS.NET Gallery Download](https://raw.githubusercontent.com/ServiceStack/Assets/master/img/servicestackvs/vsgallery-download.png)](http://visualstudiogallery.msdn.microsoft.com/5bd40817-0986-444d-a77d-482e43a48da7)

::: info
For older versions, see the [install ServiceStackVS page for more options](/templates-install-servicestackvs#visual-studio-2013-2017).
:::

## Example Projects

The Example projects below contain a working demo including further documentation about each of their templates they were built with:

### TypeScript React Template

[TypeScript React Template](https://github.com/ServiceStackApps/typescript-react-template/) incorporates today's best-in-class 
technologies for developing rich, complex JavaScript Apps within VS.NET and encapsulated within ServiceStack's new
[TypeScript React Template](https://github.com/ServiceStackApps/typescript-react-template/)
providing an instant integrated client and .NET server solution where you'll be immediately productive 
out-of-the-box whilst enabling an optimal iterative development experience with pre-configured Gulp tasks 
that takes care of effortlessly packaging, bundling and deploying your next App. 

### React Desktop Apps

[React Desktop Apps](https://github.com/ServiceStackApps/ReactDesktopApps) take advantage of the adaptability, navigation and deep-linking benefits of a Web-based UI, the productivity and responsiveness of the 
[React framework](https://facebook.github.io/react/),
the performance, rich features and functionality contained in 
[ServiceStack](https://github.com/ServiceStack/ServiceStack/wiki) and the .NET Framework combined with the native experience and OS Integration possible from a Native Desktop App - all within a single VS .NET template!

### React App Template

The [ReactJS App Template](https://github.com/ServiceStackApps/ReactChat) enables an optimal iterative dev experience for creating optimized Single Page React.js Apps. It shares the same approach for developing modern Single Page Apps in VS.NET as the [AngularJS App Template](https://github.com/ServiceStack/ServiceStackVS/blob/master/docs/angular-spa.md) by leveraging the node.js ecosystem for managing all aspects of Client App development and using the best-in-class libraries.

### AngularJS App Template

The [AngularJS App](https://github.com/ServiceStack/ServiceStackVS/blob/master/docs/angular-spa.md) template in [ServiceStackVS](/create-your-first-webservice) provides a modern opinionated web technology stack for developing rich Single Page Apps with [AngularJS](https://angularjs.org) and ServiceStack.

### [Integrated HTML, CSS and JavaScript Minifiers](/html-css-and-javascript-minification)

For normal server-generated websites that don't leverage Webpack to bundle their outputs you can take advantage of ServiceStack's integrated and non-invasive minification features to effortlessly enable [HTML, CSS and JavaScript minification to your existing Website](/html-css-and-javascript-minification).


# Community Resources

  - [Hosting an ember-cli app inside a ServiceStack (or any) MVC app](http://iwayneo.blogspot.co.uk/2014/10/hosting-ember-cli-app-inside.html) by [@wayne_douglas](https://twitter.com/wayne_douglas)
  - [ServiceStack + AngularDart - Getting Started](http://www.layoric.org/2014/01/servicestack-angulardart-getting-started.html) by [@layoric](https://twitter.com/layoric)
  - [License manager for Portable.Licensing using AngularJS and ServiceStack](https://github.com/dnauck/License.Manager) by [@dnauck](https://github.com/dnauck)
  - [StarBucks-like real-time ordering fulfillment Single Page App built with ServiceStack, AngularJS, SignalR and Redis](https://github.com/paaschpa/ordersDemo) by [@paaschpa](https://twitter.com/paaschpa) 
  - [Some thoughts in between SPA projects](http://joeriks.com/2013/05/02/some-thoughts-in-between-spa-projects/) by [@joeriks](https://twitter.com/joeriks)
  - [Zippy Tips Working With ServiceStack, Backbone.js, jQuery & Mono-Develop on Mac](http://openlandscape.net/2011/07/30/zippy-tips-working-with-servicestack-backbone-js-jquery-mono-develop-on-mac/) by [Jacques du Preez](http://openlandscape.net/about/)

## Example Single Page App Projects

  - [Meal planning per configured interval powered by AngularJS, Bower and GruntJS](https://github.com/bradgearon/whats-cookin)
  - [Backbone.js + Twitter Social Bootstrap API](https://github.com/ServiceStack/SocialBootstrapApi/)
  - [StackOverflow clone with Redis back-end](http://www.servicestack.net/RedisStackOverflow/)
  - [Redis Admin UI built with Google Closure Library](http://www.servicestack.net/RedisAdminUI/AjaxClient/)
  - [Backbone Todos with Redis back-end](http://www.servicestack.net/Backbone.Todos/)
  - [GitHub-like browser with complete remote file management over REST](http://www.servicestack.net/RestFiles/#!files)
  - [ServiceStack Docs with PushState support](http://www.servicestack.net/docs/)
  - [Angular JS View in RazorRockstars](https://razor.netcore.io/rockstars?View=AngularJS)
