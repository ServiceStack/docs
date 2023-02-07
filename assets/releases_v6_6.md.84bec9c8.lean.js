import{I as e}from"./chunks/iconify.c0b0301b.js";import{_ as x}from"./chunks/VueTailwindTemplates.8d83f406.js";import{_ as S}from"./chunks/VueComponentGallery.0bc75fb7.js";import{f as v,o as i,c as k,A as f,r as h,u as a,C as _,D as g,e as s,q as b,b as r,E as j,B as T,d as n,G as A,i as C,H as I,a as o}from"./app.fe084fcc.js";import{H as P}from"./chunks/dtos.4367c6ea.js";import{m as V}from"./chunks/metadata.54494a71.js";var M="/assets/js-modules-dev-console.6aad9839.png",R="/assets/js-modules-bookings-crud.e3529d05.png",D="/assets/js-modules-bookings-crud-update.cafc7cd2.png",J="/assets/mjs-intellisense.f1943334.png",E="/assets/mjs-update-reference-vs.53e48ae3.png",z="/assets/mjs-update-reference-rider.b826f12c.png",H="/assets/edit-contact-validation.8628c2aa.png";const B=v({__name:"Hello",props:{name:null},setup(u){return(t,c)=>(i(),k("b",null,"Hello, "+f(u.name)+"!",1))}}),N=v({__name:"Counter",setup(u){let t=h(1);return(c,p)=>(i(),k("b",{onClick:p[0]||(p[0]=l=>_(t)?t.value++:t++)},"Counter "+f(a(t)),1))}}),O=n("div",{class:"p-8"},"Hello @servicestack/vue!",-1),F=v({__name:"Plugin",setup(u){const t=h(!1);return(c,p)=>{const l=g("PrimaryButton"),m=g("ModalDialog");return i(),k("div",null,[s(l,{onClick:p[0]||(p[0]=d=>t.value=!0)},{default:b(()=>[r("Open Modal")]),_:1}),t.value?(i(),j(m,{key:0,onDone:p[1]||(p[1]=d=>t.value=!1)},{default:b(()=>[O]),_:1})):T("",!0)])}}}),W={class:"flex flex-wrap justify-center"},L={class:"ml-3 mt-2 text-lg"},U=v({__name:"HelloApi",props:{value:null},setup(u){let c=h(u.value),p=h(""),l=A();async function m(){let d=await l.api(new P(l.unRefs({name:c})));d.succeeded&&(p.value=d.response.result)}return C(m),(d,y)=>{const q=g("TextInput");return i(),k("div",W,[s(q,{id:"name",label:"",modelValue:a(c),"onUpdate:modelValue":y[0]||(y[0]=w=>_(c)?c.value=w:c=w),onKeyup:m},null,8,["modelValue"]),n("div",L,f(a(p)),1)])}}}),G=n("link",{rel:"stylesheet",href:"/css/not-prose.css"},null,-1),$=n("link",{rel:"stylesheet",href:"/css/release.css"},null,-1),Q=o("",7),Z={id:"vue-templates",class:"mt-12 flex flex-col items-center"},Y=n("div",{class:"relative bg-white py-4"},[n("div",{class:"mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"},[n("p",{class:"mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"},"Vue.js Tailwind Templates")])],-1),K=o("",6),X=n("div",{class:"flex justify-center"},[n("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/SyppvQB7IPs",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""})],-1),nn=n("h3",{id:"vue-js-bootstrap-razor-pages-template",tabindex:"-1"},[r("Vue.js Bootstrap Razor Pages Template "),n("a",{class:"header-anchor",href:"#vue-js-bootstrap-razor-pages-template","aria-hidden":"true"},"#")],-1),sn={class:"flex justify-center"},an=n("div",{class:"not-prose flex justify-center"},[n("a",{class:"block max-w-xl group border hover:border-indigo-700",href:"https://razor-pages.web-templates.io"},[n("img",{class:"p-2",src:"https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/razor-pages.png"}),n("div",{class:"bg-gray-50 text-gray-600 font-semibold group-hover:bg-indigo-700 group-hover:text-white text-center py-2"},"razor-pages.web-templates.io")])],-1),tn=n("p",null,"For devs preferring Bootstrap, we've also created a new Razor Pages template integrated with JS Modules, that can be installed with:",-1),en=n("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-800"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[n("p",null,"x new razor-pages MyApp")])]),n("div",{class:"flex"},[n("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),on=o("",39),pn=n("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-800"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[n("p",null,"npm run dtos")])]),n("div",{class:"flex"},[n("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),cn=o("",9),ln=n("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-800"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[n("p",null,"x mjs")])]),n("div",{class:"flex"},[n("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),rn=n("p",null,"But the best thing about JS Module DTOs is using them in the exciting new node_modules free world enabled in the new Vue.js templates!",-1),un=n("h2",{id:"multi-page-apps",tabindex:"-1"},[r("Multi Page Apps "),n("a",{class:"header-anchor",href:"#multi-page-apps","aria-hidden":"true"},"#")],-1),kn=n("div",{id:"multi-page-apps",class:"relative bg-white py-4"},[n("div",{class:"mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"},[n("p",{class:"mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"},"Back to Multi Page Apps"),n("p",{class:"mx-auto mt-5 max-w-prose text-xl text-gray-500"}," Discover the productive build tools free world of modern JS Module MPAs")])],-1),dn={class:"flex justify-around"},mn={class:"sm:float-left mr-4 w-24 h-24",style:{"margin-top":"0"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 630 630"},hn=n("rect",{width:"630",height:"630",fill:"#f7df1e"},null,-1),gn=n("path",{d:"m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"},null,-1),vn=[hn,gn],fn=o("",10),yn=n("h3",{id:"tailwind",tabindex:"-1"},[r("Tailwind "),n("a",{class:"header-anchor",href:"#tailwind","aria-hidden":"true"},"#")],-1),wn=n("p",null,[n("a",{href:"https://tailwindcss.com/docs/installation",target:"_blank",rel:"noopener noreferrer"},"Tailwind CLI"),r(" enables a responsive, utility-first CSS framework for creating maintainable CSS at scale without the need for any CSS preprocessors like Sass, which is configured to run from an npx script to avoid needing any node_module dependencies.")],-1),bn=o("",4),_n={"data-id":"Hello",class:"text-center"},qn=o("",2),xn={"data-id":"Counter",class:"text-center"},Sn=o("",6),jn={"data-id":"Plugin",class:"text-center not-prose"},Tn=n("h3",{id:"vue-js-tailwind-components-library",tabindex:"-1"},[r("Vue.js Tailwind Components Library "),n("a",{class:"header-anchor",href:"#vue-js-tailwind-components-library","aria-hidden":"true"},"#")],-1),An=n("p",null,[n("a",{href:"https://github.com/ServiceStack/servicestack-vue",target:"_blank",rel:"noopener noreferrer"},"@servicestack/vue"),r(" is our growing Vue 3 Tailwind component library with a number of rich Tailwind components useful in .NET Web Apps, including DataGrids, Auto Forms and Input Components with integrated contextual validation binding.")],-1),Cn=n("p",null,"For a quick preview of the rapid development workflow of using these components in a Razor Pages App checkout:",-1),In=n("div",{class:"py-8 flex justify-center"},[n("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/YIa0w6whe2U",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""})],-1),Pn=o("",11),Vn={class:"not-prose w-full font-semibold"},Mn=o("",26),Rn={"data-id":"AutoCreateForm",class:"not-prose"},Dn=o("",44),Jn=o("",35),Wn='{"title":"ServiceStack v6.6","description":"","frontmatter":{"title":"ServiceStack v6.6"},"headers":[{"level":3,"title":"JavaScript Modules","slug":"javascript-modules"},{"level":2,"title":"Modern Vue.js Tailwind .NET Apps","slug":"modern-vue-js-tailwind-net-apps"},{"level":2,"title":"Vue.js Tailwind Live Demos","slug":"vue-js-tailwind-live-demos"},{"level":3,"title":"Vue.js Bootstrap Razor Pages Template","slug":"vue-js-bootstrap-razor-pages-template"},{"level":2,"title":"JS Modules Quick Look","slug":"js-modules-quick-look"},{"level":3,"title":"Dynamically Loading Multiple JS Modules","slug":"dynamically-loading-multiple-js-modules"},{"level":3,"title":"Best mix of Productivity vs Simplicity","slug":"best-mix-of-productivity-vs-simplicity"},{"level":3,"title":"Various WebApp DTO Options","slug":"various-webapp-dto-options"},{"level":3,"title":"Common.js ES3 DTOs","slug":"common-js-es3-dtos"},{"level":3,"title":"TypeScript DTOs","slug":"typescript-dtos"},{"level":3,"title":"JS Module ES6 class DTOs","slug":"js-module-es6-class-dtos"},{"level":3,"title":".mjs Add ServiceStack Reference","slug":"mjs-add-servicestack-reference"},{"level":2,"title":"Multi Page Apps","slug":"multi-page-apps"},{"level":3,"title":"Bringing Simplicity Back","slug":"bringing-simplicity-back"},{"level":3,"title":"Best libraries for progressive Multi Page Apps","slug":"best-libraries-for-progressive-multi-page-apps"},{"level":3,"title":"Tailwind","slug":"tailwind"},{"level":3,"title":"Vue 3","slug":"vue-3"},{"level":3,"title":"Vue.js Tailwind Components Library","slug":"vue-js-tailwind-components-library"},{"level":3,"title":"@servicestack/client","slug":"servicestack-client"},{"level":3,"title":"useClient","slug":"useclient"},{"level":3,"title":"Form Validation","slug":"form-validation"},{"level":3,"title":"AutoForm Components","slug":"autoform-components"},{"level":3,"title":"useAuth","slug":"useauth"},{"level":3,"title":"Import Maps","slug":"import-maps"},{"level":3,"title":"Fast Component Loading","slug":"fast-component-loading"},{"level":3,"title":"Fast Page Loading","slug":"fast-page-loading"},{"level":3,"title":"Fast pre-rendered Razor Pages","slug":"fast-pre-rendered-razor-pages"},{"level":2,"title":"Develop using JetBrains Rider","slug":"develop-using-jetbrains-rider"},{"level":2,"title":"Develop using Visual Studio","slug":"develop-using-visual-studio"},{"level":2,"title":"Feedback Welcome!","slug":"feedback-welcome"},{"level":2,"title":"@servicestack/client now dependency-free","slug":"servicestack-client-now-dependency-free"},{"level":3,"title":"ServerEventsClient in Node.js","slug":"servereventsclient-in-node-js"},{"level":3,"title":"JsonServiceClient in Node.js < v18","slug":"jsonserviceclient-in-node-js-v18"},{"level":2,"title":"MSVR 76883","slug":"msvr-76883"}],"relativePath":"releases/v6_6.md"}',En={},Ln=Object.assign(En,{__name:"v6_6",setup(u){const{setMetadata:t}=I();return t(V),(c,p)=>{const l=g("AutoCreateForm");return i(),k("div",null,[G,$,n("div",null,[s(a(e),{icon:"vscode-icons:file-type-js-official",class:"w-80 h-80 block mx-auto"})]),Q,n("div",Z,[n("div",null,[s(a(e),{icon:"vscode-icons:file-type-vue",class:"w-24 h-24 mr-8"}),s(a(e),{icon:"logos:tailwindcss-icon",class:"w-28 h-28"})])]),Y,s(x),K,X,nn,n("div",sn,[s(a(e),{icon:"logos:bootstrap",class:"my-8 w-24 h-24"})]),an,tn,en,on,pn,cn,ln,rn,un,n("div",null,[kn,n("div",dn,[s(a(e),{icon:"clarity:rack-server-line",class:"w-40 h-40 text-slate-500"}),s(a(e),{icon:"mdi:horizontal-line",class:"w-40 h-40 text-slate-500"}),s(a(e),{icon:"mdi:cloud-print-outline",class:"w-40 h-40 text-slate-500"}),s(a(e),{icon:"mdi:horizontal-line",class:"w-40 h-40 text-slate-500"}),s(a(e),{icon:"ps:browser",class:"mt-4 w-36 h-36 text-slate-500"})])]),n("p",null,[(i(),k("svg",mn,vn))]),fn,n("div",null,[s(a(e),{icon:"logos:tailwindcss-icon",class:"mx-auto block w-20 h-20"})]),yn,wn,n("div",null,[s(a(e),{icon:"vscode-icons:file-type-vue",class:"mx-auto block mt-8 w-20 h-20"})]),bn,n("div",_n,[s(B,{id:"hello",name:"Vue 3",class:"text-2xl py-4"})]),qn,n("div",xn,[s(N,{class:"text-2xl py-4 select-none cursor-pointer"})]),Sn,n("div",jn,[s(F,{class:"text-center text-2xl py-4"})]),Tn,An,s(S,{"data-id":"VueComponentGallery"}),Cn,In,Pn,n("div",Vn,[s(U,{value:"Vue 3",class:""})]),Mn,n("div",Rn,[s(l,{type:"CreateBooking",formStyle:"card"})]),Dn,s(a(e),{icon:"logos:jamstack-icon",class:"w-24 h-24 ml-4 float-right"}),Jn])}}});export{Wn as __pageData,Ln as default};
