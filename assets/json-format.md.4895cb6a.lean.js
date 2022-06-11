import{_ as a,c as t,o as e,a as s,b as n,e as p}from"./app.4c504493.js";const T=`{"title":"JSON Format","description":"","frontmatter":{"title":"JSON Format"},"headers":[{"level":3,"title":"Try out ServiceStack.Text Live","slug":"try-out-servicestack-text-live"},{"level":2,"title":"Install ServiceStack.Text","slug":"install-servicestack-text"},{"level":2,"title":"Simple API","slug":"simple-api"},{"level":3,"title":"Convenience Serialization Extension Methods","slug":"convenience-serialization-extension-methods"},{"level":3,"title":"Typed JSON","slug":"typed-json"},{"level":3,"title":"Dynamic JSON parsing API","slug":"dynamic-json-parsing-api"},{"level":3,"title":"Supports Dynamic JSON","slug":"supports-dynamic-json"},{"level":3,"title":"JS Utils","slug":"js-utils"},{"level":3,"title":"Install JS Utils","slug":"install-js-utils"},{"level":3,"title":"Register JS Utils in ServiceStack.Text","slug":"register-js-utils-in-servicestack-text"},{"level":3,"title":"Pretty Print JSON","slug":"pretty-print-json"},{"level":2,"title":"ServiceStack's JsonSerializer","slug":"servicestack-s-jsonserializer"},{"level":3,"title":"Serialization API","slug":"serialization-api"},{"level":3,"title":"Deserialization API","slug":"deserialization-api"},{"level":3,"title":"Extension methods","slug":"extension-methods"},{"level":2,"title":"JSON Format","slug":"json-format"},{"level":3,"title":"number, true, false types","slug":"number-true-false-types"},{"level":3,"title":"null type","slug":"null-type"},{"level":3,"title":"string type","slug":"string-type"},{"level":3,"title":"C# Structs and Value Types","slug":"c-structs-and-value-types"},{"level":3,"title":"array type","slug":"array-type"},{"level":3,"title":"object type","slug":"object-type"},{"level":3,"title":"Parsing JSON Dates","slug":"parsing-json-dates"},{"level":2,"title":"Global Default JSON Configuration","slug":"global-default-json-configuration"},{"level":3,"title":"DateHandler (dh)","slug":"datehandler-dh"},{"level":3,"title":"TimeSpanHandler (tsh)","slug":"timespanhandler-tsh"},{"level":3,"title":"TextCase (tc)","slug":"textcase-tc"},{"level":3,"title":"PropertyConvention (pc)","slug":"propertyconvention-pc"},{"level":3,"title":"Custom Config Scopes","slug":"custom-config-scopes"},{"level":3,"title":"Scoped Extension Methods","slug":"scoped-extension-methods"},{"level":3,"title":"Type Configuration","slug":"type-configuration"},{"level":2,"title":"Strict Parsing","slug":"strict-parsing"},{"level":2,"title":"Custom Serialization","slug":"custom-serialization"},{"level":3,"title":"Using Structs to Customize JSON","slug":"using-structs-to-customize-json"},{"level":3,"title":"Using Custom IEnumerable class to serialize a JSON array","slug":"using-custom-ienumerable-class-to-serialize-a-json-array"},{"level":2,"title":"Custom Deserialization","slug":"custom-deserialization"},{"level":2,"title":"Late-bound Object and Interface Runtime Types","slug":"late-bound-object-and-interface-runtime-types"},{"level":3,"title":"Runtime Type Whitelist","slug":"runtime-type-whitelist"},{"level":3,"title":"Custom Enum Serialization","slug":"custom-enum-serialization"}],"relativePath":"json-format.md"}`,o={},c=s("",3),i=n("iframe",{src:"https://gist.cafe/embed?gist=c71b3f0123b3d9d08c1b11c98c2ff379",frameborder:"0",style:{height:"750px",width:"100%",border:"1px solid #ddd"}},null,-1),l=n("h2",{id:"install-servicestack-text",tabindex:"-1"},[p("Install ServiceStack.Text "),n("a",{class:"header-anchor",href:"#install-servicestack-text","aria-hidden":"true"},"#")],-1),r=n("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-700"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[n("p",null,[n("code",null,'<PackageReference Include="ServiceStack.Text" Version="6.*" />')])])]),n("div",{class:"flex"},[n("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),u=s("",21),k=n("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-700"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[n("p",null,[n("code",null,'<PackageReference Include="ServiceStack.Common" Version="6.*" />')])])]),n("div",{class:"flex"},[n("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),d=s("",135),h=[c,i,l,r,u,k,d];function g(m,y,f,v,b,S){return e(),t("div",null,h)}var x=a(o,[["render",g]]);export{T as __pageData,x as default};
