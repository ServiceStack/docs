---
title: C# Jamstack Project Templates
---

ServiceStack's Jamstack templates encapsulates the latest technologies at the forefront of modern web development to deliver both a great **developer experience** and **performant** end-user UX.

[Jamstack](https://jamstack.org/what-is-jamstack) (**J**avaScript, **A**PIs, and **M**arkup) is a modern architecture pattern to build fast, secure and easy to scale web applications where pre-rendering content, enhancing with JavaScript and leveraging CDN static hosting results in a highly productive, flexible and performant system that takes advantage of CDN edge caches to deliver **greater performance** & efficiency at **lower cost**. 

<a href="https://jamstacks.net" class="my-8 py-8 flex justify-center text-gray-600 hover:no-underline" title="jamstacks.net">
    <div class="flex justify-center items-end p-4 pt-0 border-2 border-solid border-transparent rounded hover:border-indigo-600">
        <svg viewBox="0 0 256 256" class="w-20 h-20 mr-2" alt="Jamstacks logo"><path d="M128 0C57.221 0 0 57.221 0 128c0 70.778 57.221 128 128 128c70.778 0 128-57.222 128-128V0H128z" fill="#F0047F"></path><path d="M121.04 134.96v93.312c-49.663-2.837-89.64-42.345-93.215-91.81l-.097-1.502h93.312zm90.962 0c-2.6 49.664-38.816 89.64-84.159 93.215l-1.377.097V134.96h85.536zm.112-91.074v85.648h-85.648V43.886h85.648z" fill="#FFF"></path></svg>
        <h1 class="text-8xl font-bold">Jamstacks</h1>
        <div class="ml-4 bg-purple-600 text-white py-1 pb-2 px-3 rounded-md text-7xl">.NET</div>
    </div>
</a>

### Jamstack Benefits

It's become the preferred architecture for modern performant web apps with 
[benefits](https://jamstack.org/why-jamstack/) extending beyond performance to improved: 

 - **Security** from a reduced attack surface from hosting read-only static resources and requiring fewer App Servers
 - **Scale** with non-essential load removed from App Servers to CDN's architecture capable of incredible scale & load capacity
 - **Maintainability** resulting from reduced hosting complexity and the clean decoupling of UI and server logic
 - **Portability** with your static UI assets being easily capable from being deployed and generically hosted from any CDN or web server
 - **Developer Experience** with major JavaScript Frameworks embracing Jamstack in their dev model, libraries & tooling  

Ultimately, it's hosting your App's pre-rendered static UI assets on Content Delivery Network (CDN) edge caches close to users locations that's primarily responsible for its lightning performance.

![](/images/jamstack/cdn-world-view.png)


### $0.40 /month

Other by-products of generating pre-computed CDN hostable assets, is interchangeable cost-effective hosting and great SEO - characteristics our Jamstack Demos take advantage of with free **UI** hosting on GitHub Pages CDN leaving their only cost to host its **.NET 6 API** back-ends, deployed with SSH in Docker compose containers to a vanilla [Digital Ocean](https://www.digitalocean.com) droplet costing only **[$0.40 /month each](https://vue-ssg.jamstacks.net/hosting)**.

### Recommended Templates

These templates represent the best-in class experiences for their respective **React**, **Vue** & **Blazor WASM** ecosystems each, packed with features & examples common in many websites including Integrated Auth, rich Markdown content as well as TODOs MVC and CRUD examples with built-in contextual validation binding. As such they're **now recommended** over our existing SPA and C# MVC Templates.

We've put together a quick check list to help decide which templates we'd recommend:

| Project     | Recommendation |
| -           | - |
| [Next.js](https://github.com/NetCoreTemplates/nextjs)   | If you prefer React |
| [Vue SSG](https://github.com/NetCoreTemplates/vue-ssg)  | If you prefer Vue and SEO is important |
| [Blazor Tailwind](/templates-blazor-tailwind)           | If you prefer a full C# Stack or are developing Line of Business (LOB) Apps |
| [Vue SPA](https://github.com/NetCoreTemplates/vue-vite) | If you prefer Vue and happy to trade SEO benefits of SSG for a simpler template |
| [Blazor WASM](/templates-blazor)                        | If you prefer using Blazor WASM with Bootstrap CSS |

Still not sure? familiarize yourself with their respective dev models by comparing their functionality equivalent TODOs MVC Examples:

<script setup>
import JamstackTodos from "./src/components/JamstackTodos.vue"
import JamstackBookingsCrud from "./src/components/JamstackBookingsCrud.vue"
import JamstackTemplates from "./src/components/JamstackTemplates.vue"
import { Icon } from "@iconify/vue"
</script>

### TODOs MVC

<JamstackTodos class="my-8 pb-8" />

All projects utilize the same back-end ServiceStack Services with **TODOs MVC** implemented in
[TodosServices.cs](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.ServiceInterface/TodosServices.cs).


As **Bookings CRUD** is an [AutoQuery CRUD](/autoquery-crud) API, it defines [all its functionality](/autoquery-crud-bookings) in its declarative
[Bookings.cs](https://github.com/NetCoreTemplates/blazor-wasm/blob/main/MyApp.ServiceModel/Bookings.cs) DTOs and serves as a good example for the minimal dev model effort required to implement a typical Authenticated CRUD UI in each framework:

### Bookings CRUD

<JamstackBookingsCrud body="max-w-screen-lg" class="my-8 pb-8" />

<p class="text-center">Once you know the framework you wish to use, create a new App using your preferred <b>Project Name</b> below:</p>

<h3 class="text-center">Download new C# Jamstack Project Template</h3>

<JamstackTemplates class="pb-8" />

::: info
An updated list of available Jamstack project templates will be maintained at https://jamstacks.net (built with Vue SSG)
:::

### Pre-configured Jamstack App Deployments

All project templates supports CDN hostable UI assets and include the [necessary GitHub Actions](https://vue-ssg.jamstacks.net/posts/deploy) that takes care of building and SSH deploying a Docker compose production build of your App to any Linux Host with just a few GitHub Action Secrets in your GitHub repo. 

The optional `DEPLOY_CDN` secret lets you control whether to deploy your App's static `/wwwroot` assets to your GitHub Pages CDN by specifying the custom domain to use and is what all JamStack Live demos used to deploy a copy of their UIs to GitHub Pages CDN:

| Project Source                                                         | GitHub Pages CDN              | Digital Ocean Docker .NET API     |
| -                                                                      | -                             | -                                 |
| [nextjs](https://github.com/NetCoreTemplates/nextjs)                   | nextjs.jamstacks.net          | nextjs-api.jamstacks.net          |
| [vue-ssg](https://github.com/NetCoreTemplates/vue-ssg)                 | vue-ssg.jamstacks.net         | vue-ssg-api.jamstacks.net         |
| [blazor-tailwind](https://github.com/NetCoreTemplates/blazor-tailwind) | blazor-tailwind.jamstacks.net | blazor-tailwind-api.jamstacks.net |
| [vue-spa](https://github.com/NetCoreTemplates/vue-spa)                 | vue-spa.jamstacks.net         | vue-spa-api.jamstacks.net         |
| [blazor-wasm](https://github.com/NetCoreTemplates/blazor-wasm)         | blazor-wasm.jamstacks.net     | blazor-wasm-api.jamstacks.net     |

## Blazor WebAssembly

The [Blazor WebAssembly (WASM)](/templates-blazor) template offers a pure end-to-end integrated C# solution to building a high performance web application with [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) and ServiceStack. Due to the integrated dev model we've been able to achieve in Blazor it's become **our preferred technology** to use to develop **Line of Business Apps** since it's the only C# Razor solution adopting our preferred [API First Development](/api-first-development) model with Web UIs reusing the same well-defined APIs as Mobile and Desktop Apps.

<iframe width="980" height="551" src="https://www.youtube.com/embed/TIgjMf_vtCI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Great Perceived Performance and SEO

Typically the **large download sizes** & slow initial load times of Blazor WASM Apps would make it a poor choice for Internet hosted sites. However, our Blazor WASM template has largely mitigated this with easily maintainable built-in pre-rendering techniques to make every page appear to load quickly, including **instant loading** of its Markdown Pages courtesy of the GitHub Actions publish task generating & deploying pre-rendered content pages.

<p class="pt-3 text-center">You can see the results of this in its live demo when loading the home page, which only has a slight delay:</p>

<a class="flex flex-col justify-center items-center hover:no-underline mb-8" href="https://blazor-wasm.jamstacks.net">
    <h3 class="mb-3">blazor-wasm.jamstacks.net</h3>
    <img src="/images/jamstack/blazor-wasm/home.png" class="border border-solid border-gray-200 max-w-screen-sm">
</a>

<p class="pt-3 text-center">Whilst the markdown page explaining how it's done <b>loads instantly</b></p>

<a class="flex flex-col justify-center items-center hover:no-underline mb-8" href="https://blazor-wasm.jamstacks.net/docs/prerender">
    <h3 class="mb-3">blazor-wasm.jamstacks.net/docs/prerender</h3>
    <img src="/images/jamstack/blazor-wasm/markdown-prerender.png" class="border border-solid border-gray-200 max-w-screen-sm">
</a>

In both cases pages are rendered before Blazor WASM has loaded allowing users to familiarize themselves with each page whilst Blazor WASM loads itself in the background. The resulting **SEO benefits** are especially valuable for the pre-rendered Markdown pages and lets users start reading your content instantly.

### Learn more

To find out more watch its [YouTube overview](https://youtu.be/TIgjMf_vtCI) and visit the [Blazor WASM docs](/templates-blazor).

## Razor SSG

The [razor-ssg](https://razor-ssg.web-templates.io/posts/razor-ssg) ServiceStack template leverages the power of .NET Razor to provide seamless static site generation (SSG) capabilities. It's perfect for building content-rich applications like product websites, blogs, portfolios, and more. 

This template streamlines the development process while offering versatility in customizing and extending your project. With GitHub Codespaces integration, you can develop, test, and manage your application all within your browser, eliminating the need for a dedicated development environment and expediting your workflow.

<iframe width="980" height="551" src="https://www.youtube.com/embed/MRQMBrXi5Sc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Next.js

For those preferring working with **React**, there's a clear choice in Nextjs.org - currently the flagship & [most popular Jamstack](https://jamstack.org/generators/) framework backed by the folks over at [Vercel](https://vercel.com), where it enjoys deep engineering talent committed to maintaining and continually improving it, so you can be confident in the longevity of the technology and the React framework maintained by [Meta](https://meta.com) (Facebook).

<a href="https://nextjs.jamstacks.net" title="nextjs.jamstacks.net"><img src="/images/jamstack/next-black.svg" class="mx-auto block" /></a>

Designed as an SSG framework from the start, its pre-defined patterns include static generation and UX focused functionality built-in. 

<iframe width="980" height="551" src="https://www.youtube.com/embed/3pPLRyPsO5A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Stale While Revalidate

Its [SWR](https://swr.vercel.app) Data Fetching React Hooks library is one innovative example utilizing the popular 
[stale-while-revalidate](https://web.dev/stale-while-revalidate/) UX pattern to help developers balance 
between **immediacy** — loading cached content right away — and **freshness** — ensuring updates to the cached content are used in the future.

To take advantage of this, the [nextjs](https://github.com/NetCoreTemplates/nextjs) template includes a `swrClient` that provides a typed wrapper for making typed SWR API Requests with ServiceStack's generic [JsonServiceClient](https://docs.servicestack.net/typescript-add-servicestack-reference):

```tsx
import { swrClient } from "../lib/gateway"
import { Hello } from "../lib/dtos"

const HelloApi = ({ name }) => {
  const {data, error} = swrClient.get(() => 
    new Hello({ name }))
  if (error) return <div>{error.message}</div>
  return <div>{data?data.result:'loading...'}</div>
}
```

This reactively sets up the UI to handle multiple states:
 - `loading` - displays **loading...** message whilst API request is in transit
 - `data` - when completed, populated with a `HelloResponse` and displayed
 - `error` - when failed, populated with `ResponseStatus` and displayed

The primary UX benefits are realized when re-making an existing request in which a locally-cached *stale* version
is **immediately** returned and displayed whilst a new API Request is made behind the scenes, updating the UI if the fresh response was modified.


## Vite

<a href="https://vitejs.dev" class="flex justify-center mt-8 py-8 hover:no-underline text-gray-700">
    <div class="flex flex-col align-center text-center">
        <div><Icon icon="logos:vitejs" class="w-60 h-60" /></div>
        <h3 class="text-6xl mb-3 mt-0">Vite</h3>
        <h4 class="text-2xl text-gray-400 font-normal">Next Generation Frontend Tooling</h4>
    </div>
</a>


Despite Vercel's full-time resources, Next.js is still reliant on the Webpack ecosystem, who although have done a formidable job managing complex tooling requirements for npm projects over a number of years, has since lost the Developer Experience (DX) crown to [vitejs.dev](https://vitejs.dev)

Vite is being [built for speed](https://vitejs.dev/guide/why.html) in the modern era and takes advantage of modern browser features like native ES modules support to remove bundling entirely during development and adopts performance leading technologies like [esbuild](https://github.com/evanw/esbuild) to pre-bundle dependencies and [transpile TypeScript](https://vitejs.dev/guide/features.html#typescript) which is able to do **20-30x** faster than TypeScript's own `tsc` compiler.

Ultimately its architectural choices allows Vite to deliver Lightning Fast **Hot Module Reload** (HMR) to remain at the developer-experience forefront of modern web development serving a [growing ecosystem](https://vitejs.dev/guide/) of frameworks with a rich typed suite of [Universal Plugins](https://vitejs.dev/plugins/).

<iframe width="980" height="551" src="https://www.youtube.com/embed/D-rU0lU_B4I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Vue SSG or SPA

Both Vue & Vite being led by [Evan You](https://github.com/yyx990803), which ensures both have stellar integration and delivers a well-supported & productive development experience making it the clear choice for any new Vue project.

Both vue-ssg.jamstacks.net and vue-vite.jamstacks.net utilizing the same high-end Vue3, TypeScript and Tailwind components means their included pages like **TODOs MVC**, **Bookings** and **Sign In** contain **identical source code**, the choice on which to use effectively becomes if you need advanced features like [Static Site Generation](https://www.cloudflare.com/en-au/learning/performance/static-site-generator/) **(SSG)** and **Dark Mode** or would otherwise prefer to start with a simpler template.

#### Features list comparison

 - vue-ssg.jamstacks.net/features
 - vue-vite.jamstacks.net/features

### Stale-while-revalidate in Vue3

Just like [Next.js's Stale While Revalidate](#stale-while-revalidate), both Vue templates includes a `swrClient` providing a typed wrapper around [SWVR](https://github.com/Kong/swrv) Vue3 composition library around making typed SWR API Requests using ServiceStack’s typed `JsonServiceClient`, e.g:

```html
<template>
  <div v-if="error">{{ error.message }}</div>
  <div v-else>{{data ? data.result :'loading...'}}</div>
</template>

<script setup lang="ts">
import { Hello } from "@/dtos"
import { swrClient } from "@/api"

const props = defineProps<{ name: string }>()

const { data, error } = swrClient.get(() => 
    new Hello({ name: props.name }))
</script>
```

Where it yields the same optimal UX with cached API responses rendered instantly before later updating itself if modified.

## Vue SSG

React & Next.js are primarily corporate-led efforts whilst the Vue ecosystem is largely community led, with one of Vue's lieutenants [Anthony Fu](https://github.com/antfu) being the primary developer behind many of the developer-experience focused features adopted in his [vite-ssg](https://github.com/antfu/vite-ssg) project. Most of these features are designed to reduce developer effort by auto registering routes and components by convention which effectively gives it [Nuxt](https://nuxtjs.org) like productivity by utilizing hand-picked quality dependencies without needing to be reliant on the slow development pace of a heavy framework like Nuxt.

Anthony's own opinionated Vite Starter Template - [Vitesse](https://github.com/antfu/vitesse) serves as a great resource for an experienced insight into a curated list of Vue & Vite packages offering the nicest developer experience, although Vue SSG will be more conservative and adopt more well-known technologies like [tailwindcss](https://tailwindcss.com/) in favor of [Windi CSS](https://github.com/windicss/windicss).

Otherwise, it's still jam-packed full of features for modern Web Apps, including built-in **Dark Mode** support:

<a class="flex flex-col justify-center items-center my-8" href="https://vue-ssg.jamstacks.net">
    <img src="/images/jamstack/vue-ssg-home.png" class="max-w-screen-md">
</a>

## Vue Vite

Don't need SSG or Dark mode? Try the simpler **SPA** template instead:

<a class="flex flex-col justify-center items-center my-8 pb-8" href="https://vue-vite.jamstacks.net">
    <img src="/images/jamstack/vue-vite-home.png" class="max-w-screen-md">
</a>

## /api route

Each Jamstack templates are configured to the `/api` predefined route for JSON APIs:

<h3 class="text-4xl text-center text-indigo-800 pb-3">/api/{Request}</h3>

This simple and popular convention makes it easy to remember the route new APIs are immediately available on & also pairs nicely with:

<h3 class="text-4xl text-center text-indigo-800 pb-3">/ui/{Request}</h3>

i.e. An easy to remember route for API Explorer's Auto Form UI, together we expect both to yield greater utility [out-of-the-box](https://en.wikipedia.org/wiki/Out_of_the_box_(feature)) in ServiceStack Apps. 

### Benefits in Jamstack Apps

The `/api` route is particularly useful in Jamstack Apps as the 2 ways to call back-end APIs from decoupled UIs hosted on CDNs is to make CORS requests which doesn't send pre-flight CORS requests for [Simple Browser requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests). As such, we can improve the latency of **GET** and **POST** API Requests by configuring our `JsonServiceClient` to use `/api` and to not send the `Content-Type: application/json` HTTP Header which isn't necessary for `/api` who always expects and returns JSON:

### Configuring in TypeScript

```ts
export const client = new JsonServiceClient(API_URL).apply(c => {
    c.basePath = "/api"
    c.headers = new Headers() //avoid pre-flight CORS requests
})
```

It also benefits the **alternative method** to CORS in only needing to define a **single reverse proxy rule** on the CDN host to proxy all API requests to downstream back-end servers.