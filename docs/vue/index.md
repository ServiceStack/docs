---
title: "@servicestack/vue"
---

<script setup>
import { Icon } from "@iconify/vue"
import VueTailwindTemplates from "../src/components/VueTailwindTemplates.vue"
import VueComponentGallery from "../src/components/VueComponentGallery.vue"
</script>


**@servicestack/vue** is a component library for Vue.js and Tailwind CSS offering a wide range of beautifully designed, highly productive components that can be easily customized to fit into Tailwind's expert design system whose deep integration 
with your ServiceStack APIs unlocks end-to-end productivity. With a focus on performance, accessibility and modern design, this library is the perfect choice for developers looking to rapidly develop fast, beautiful modern Vue.js Tailwind websites.

<VueComponentGallery />

<div class="flex justify-center">
<iframe class="video-hd" src="https://www.youtube.com/embed/YIa0w6whe2U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

## Getting Started

Starting with one of ServiceStack's Vue + Tailwind Project templates below is the easiest way to get started which are pre-configured with 
**@servicestack/client** and **@servicestack/vue** libraries:

<VueTailwindTemplates class="mb-8" />

All Razor Pages and MVC templates utilize the JS Modules support in modern browsers to avoid any needing any npm build system, 
for access to more advanced npm library features and to learn about Jamstack CDN and SSG benefits checkout [Jamstack Templates docs](/templates-jamstack).

### Vue.js Razor Pages & MVC Templates Overview

To help choosing which template to start with, here's a quick summary of their differences:

 - **vue-mjs** - Flagship Vue.mjs template complete with [OrmLite](/ormlite/), [AutoQuery](/autoquery) & [blogs](https://vue-mjs.web-templates.io/blog)
 - **razor-tailwind** - Simpler Razor Pages Template without a configured DB
 - **mvc-tailwind** - Want to use MVC Identity Auth and Entity Framework
 - **web-tailwind** - Empty tailwind template who don't want to use Razor Pages or MVC
 - **razor-ssg** - Want to create a static generated App with Razor to host on CDNs for free
 - **vue-vite** - Want to use TypeScript in a simpler JAMStack Vite SPA App
 - **vue-ssg** - Want to use TypeScript in an advanced JAMStack Vite SSG App

 For a more in-depth look we've created an overview covering the differences between the Razor Pages & MVC templates:

<div class="flex justify-center">
<iframe class="video-hd" src="https://www.youtube.com/embed/SyppvQB7IPs" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

### Manual Installation

Alternatively it can be added to existing Vue SPA Apps by installing via npm:

```bash
$ npm install @servicestack/vue
```

Where it will also install its **vue** and **@servicestack/client** dependencies.

### Installation-less option

Alternatively you can take advantage of modern browsers [JS Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) support to 
use these libraries without installation by registering an [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) to define where it should load the ESM builds of these libraries from, e.g:

```html
<script type="importmap">
{
    "imports": {
        "vue":                  "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js",
        "@servicestack/client": "https://unpkg.com/@servicestack/client@2/dist/servicestack-client.min.mjs",
        "@servicestack/vue":    "https://unpkg.com/@servicestack/vue@3/dist/servicestack-vue.min.mjs"
    }
}
</script>
```

For intranet Web Apps that need to work without internet access, save and reference local copies of these libraries, e.g:

```html
<script type="importmap">
{
    "imports": {
        "vue":                  "/lib/mjs/vue.mjs",
        "@servicestack/client": "/lib/mjs/servicestack-client.mjs",
        "@servicestack/vue":    "/lib/mjs/servicestack-vue.mjs"
    }
}
</script>
```

### @Html.ImportMap

Razor Pages or MVC Apps can use the `Html.ImportMaps()` to use local debug builds during development and optimal CDN hosted minified production builds in production:

```csharp
@Html.ImportMap(new()
{
    ["vue"]                  = ("/lib/mjs/vue.mjs",                 "https://unpkg.com/vue@3/dist/vue.esm-browser.prod.js"),
    ["@servicestack/client"] = ("/lib/mjs/servicestack-client.mjs", "https://unpkg.com/@servicestack/client@2/dist/servicestack-client.min.mjs"),
    ["@servicestack/vue"]    = ("/lib/mjs/servicestack-vue.mjs",    "https://unpkg.com/@servicestack/vue@3/dist/servicestack-vue.min.mjs")
})
```

> It's recommended to use exact versions to eliminate redirect latencies and to match the local version your App was developed against

#### Polyfill for Safari

Unfortunately Safari is the last modern browser to [support import maps](https://caniuse.com/import-maps) which is only now in
Technical Preview. Luckily this feature can be polyfilled with the pre-configured [ES Module Shims](https://github.com/guybedford/es-module-shims):

```html
@if (Context.Request.Headers.UserAgent.Any(x => x.Contains("Safari") && !x.Contains("Chrome")))
{
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.6.3/dist/es-module-shims.js"></script>
}
```

### Registration

Then register the `@servicestack/vue` component library with your Vue app with:

```js
import { JsonApiClient } from "@servicestack/client"
import ServiceStackVue from "@servicestack/vue"

const client = JsonApiClient.create()

const app = createApp(component, props)
app.provide('client', client)
app.use(ServiceStackVue)

//...
app.mount('#app')
```

The **client** instance is used by API-enabled components to call your APIs using the [/api predefined route](/routing#json-api-pre-defined-route). ServiceStack Apps not running on .NET 6+ or have the **/api** route disabled should use
`JsonServiceClient` instead:

```js
const client = new JsonServiceClient()
```

### Not using Vue Router

Non SPA Vue Apps that don't use [Vue Router](https://router.vuejs.org) should register a replacement `<router-link>` component 
that uses the browser's native navigation in [navigational components](/vue/gallery/navigation):

```js
app.component('RouterLink', ServiceStackVue.component('RouterLink'))
```
