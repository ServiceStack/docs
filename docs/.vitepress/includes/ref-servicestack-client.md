### Built-in @servicestack/client

HTML and VanillaJS Web Apps can use the built-in [ES Modules @servicestack/client](/javascript-add-servicestack-reference) either directly:

```html
<script type="module">
import { JsonApiClient } from '/js/servicestack-client.mjs'
import { Hello } from '/types/mjs'

const client = JsonApiClient.create()
async function callHello() {
    const api = await client.api(new Hello)
    if (api.succeeded) {
        document.getElementById('result').innerHTML = api.response.result
    }
}
</script>
```

Although we recommend using [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) so scripts can reference the `@servicestack/client` module instead of its physical location:

```html
<script type="importmap">
{
    "imports": {
        "@servicestack/client":"/js/servicestack-client.mjs"
    }
}
</script>

<script type="module">
import { JsonApiClient } from '@servicestack/client'
//...
</script>
```

### Import from CDN

If preferred a CDN hosted version of the latest ES Modules `@servicestack/client` is available on unpkg.com at:

```html
<script type="importmap">
{
    "imports": {
        "@servicestack/client":"https://unpkg.com/@servicestack/client@2/dist/servicestack-client.min.mjs"
    }
}
</script>
```

#### ES3 JavaScript Client

When needing to support older browsers you can use the [UMD @servicestack/client](/servicestack-client-umd) in **ServiceStack.dll** 
to call ServiceStack Services without any external dependencies, e.g:

```html
<script src="/js/require.js"></script>
<script src="/js/servicestack-client.js"></script>
<script src="/types/js"></script>
<script>
var { JsonServiceClient, Hello } = exports

var client = new JsonServiceClient()
function callHello(name) {
    client.get(new Hello({ name }))
        .then(function(r) {
            document.getElementById('result').innerHTML = r.result
        })
}
</script>
```

Which utilizes the [ES3 JavaScript Add ServiceStack Reference](//commonjs-add-servicestack-reference) **/types/js** to instantly generate JavaScript Types for all your APIs DTOs which can immediately be used with the [TypeScript JsonServiceClient](/typescript-add-servicestack-reference#typescript-serviceclient) to make Typed API requests.

### CDN unpkg

A CDN hosted version of UMD `@servicestack/client` is available on unpkg.com at:

```html
<script src="https://unpkg.com/@servicestack/client/dist/servicestack-client.min.js"></script>
```

### Reference in npm projects

If you started with any of the [SPA Project Templates](/dotnet-new) [@servicestack/client](https://www.npmjs.com/package/@servicestack/client) is already included, other TypeScript or ES6 projects can install `@servicestack/client` from npm with:

```bash
$ npm install @servicestack/client
```
