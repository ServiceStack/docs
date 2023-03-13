import{_ as t,a,b as r,c as o}from"./chunks/autohtml-code.350b9b1f.js";import{_ as i,o as s,c as n,d as e,a as l}from"./app.bf02e2f8.js";const I='{"title":"Auto HTML API Page","description":"","frontmatter":{"title":"Auto HTML API Page"},"headers":[{"level":3,"title":"PREVIEW","slug":"preview"},{"level":3,"title":"JSON","slug":"json"},{"level":3,"title":"FORM","slug":"form"},{"level":3,"title":"CODE","slug":"code"},{"level":3,"title":"API Fallback HTML Page","slug":"api-fallback-html-page"}],"relativePath":"auto-html-api.md"}',h={},d=e("p",null,"The Auto HTML Page provides instant utility for API consumers in consuming your APIs with a built-in API Response Visualizer, JSON syntax highlighting, integrated Postman-like UI and API SDK integration all-in-one.",-1),c=e("div",{class:"my-16 px-4 sm:px-6"},[e("div",{class:"text-center"},[e("h3",{id:"autohtml",class:"text-4xl sm:text-5xl md:text-6xl tracking-tight font-extrabold text-gray-900"}," Auto HTML API ")]),e("p",{class:"mx-auto mt-5 max-w-prose text-xl text-gray-500"}," The best way to visualize, inspect and integrate with your APIs in an instant!"),e("div",{class:"my-8"},[e("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/3gjisRVqhLo",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""})])],-1),p=l('<p>Lets take a quick tour through each of these features:</p><h3 id="preview" tabindex="-1">PREVIEW <a class="header-anchor" href="#preview" aria-hidden="true">#</a></h3><p>Calling our APIs in a browser will greet us with the Preview page which uses the <a href="/vue/gallery/formats#htmlformat">HtmlFormat</a> to display the API response in a beautiful Tailwind style with links to different <a href="/formats">Content-Type Formats</a> and direct links to view it in <a href="/api-explorer">API Explorer</a> and <a href="/locode/">Locode</a> for <a href="/autoquery-rdbms">AutoQuery</a> APIs:</p><a href="https://northwind.netcore.io/customers/ALFKI" class="not-prose max-w-4xl"><div class="block flex justify-center shadow hover:shadow-lg rounded"><img class="" src="'+t+'"></div></a><h3 id="json" tabindex="-1">JSON <a class="header-anchor" href="#json" aria-hidden="true">#</a></h3><p>Developers who wish to view the actual JSON API Response can click on the <strong>JSON</strong> tab to view the JSON in pretty-formatted syntax-highlighted form with a 1-click button to copy:</p><a href="https://northwind.netcore.io/customers/ALFKI?tab=json" class="not-prose max-w-4xl"><div class="block flex justify-center shadow hover:shadow-lg rounded"><img class="" src="'+a+'"></div></a><h3 id="form" tabindex="-1">FORM <a class="header-anchor" href="#form" aria-hidden="true">#</a></h3><p>You don&#39;t need to build UIs before non-developers can access your APIs with the <strong>FORM</strong> tab which uses the new <a href="/vue/gallery/autoform">AutoForm</a> component to render an optimal UI to call an API that you can further customize from your C# Request DTOs:</p><a href="https://blazor-gallery.servicestack.net/bookings/1?tab=form" class="not-prose max-w-4xl"><div class="block flex justify-center shadow hover:shadow-lg rounded"><img class="" src="'+r+'"></div></a><h3 id="code" tabindex="-1">CODE <a class="header-anchor" href="#code" aria-hidden="true">#</a></h3><p>The <strong>CODE</strong> tab gives you an appealing API docs page you can immediately share with any 3rd Party Developers that want to consume your APIs, with simple step-by-step instructions for how to call your APIs from their preferred programming language:</p><a href="https://northwind.netcore.io/customers/ALFKI?tab=code" class="not-prose max-w-4xl"><div class="block flex justify-center shadow hover:shadow-lg rounded"><img class="" src="'+o+'"></div></a><p>A nice benefit of ServiceStack&#39;s API Design is that consuming APIs are fundamentally all done the same way in all languages, which just requires adding a dependency containing a generic ServiceClient which can be used to call any ServiceStack API using the typed DTOs copied directly from the API docs page to enable an end-to-end typed API without any external tooling or build steps.</p><h3 id="api-fallback-html-page" tabindex="-1">API Fallback HTML Page <a class="header-anchor" href="#api-fallback-html-page" aria-hidden="true">#</a></h3><p>The Auto HTML API is the fallback HTML page returned for APIs when calling user-defined routes from a browser (i.e. <strong>Accept: text/html</strong>):</p><h4 id="https-northwind-netcore-io-customers-alfki" tabindex="-1"><a href="https://northwind.netcore.io/customers/ALFKI" target="_blank" rel="noopener noreferrer">https://northwind.netcore.io/customers/ALFKI</a> <a class="header-anchor" href="#https-northwind-netcore-io-customers-alfki" aria-hidden="true">#</a></h4><p>When calling the <a href="/routing#json-api-pre-defined-route">/api pre-defined route</a> with the <code>.html</code> extension:</p><h4 id="https-northwind-netcore-io-api-getcustomerdetails-html-id-alfki" tabindex="-1"><a href="https://northwind.netcore.io/api/GetCustomerDetails.html?Id=ALFKI" target="_blank" rel="noopener noreferrer">https://northwind.netcore.io/api/GetCustomerDetails.html?Id=ALFKI</a> <a class="header-anchor" href="#https-northwind-netcore-io-api-getcustomerdetails-html-id-alfki" aria-hidden="true">#</a></h4><p>When calling the <a href="/routing#json-api-pre-defined-route">/api pre-defined route</a> with <code>?format=html</code>:</p><h4 id="https-northwind-netcore-io-api-getcustomerdetails-id-alfki-format-html" tabindex="-1"><a href="https://northwind.netcore.io/api/GetCustomerDetails?Id=ALFKI&amp;format=html" target="_blank" rel="noopener noreferrer">https://northwind.netcore.io/api/GetCustomerDetails?Id=ALFKI&amp;format=html</a> <a class="header-anchor" href="#https-northwind-netcore-io-api-getcustomerdetails-id-alfki-format-html" aria-hidden="true">#</a></h4>',21),u=[d,c,p];function m(f,g,w,A,_,b){return s(),n("div",null,u)}var v=i(h,[["render",m]]);export{I as __pageData,v as default};
