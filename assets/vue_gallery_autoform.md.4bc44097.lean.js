import{I as x}from"./chunks/iconify.cabc3c10.js";import{_}from"./chunks/ApiReference.d7cfb190.js";import{f as A,L as q,N as T,r as h,i as F,C as e,u as l,o as f,c as b,d as n,e as a,E as v,q as p,b as t,H as B,B as C,a as k}from"./app.0b863c35.js";import{Q as S,U as V}from"./chunks/dtos.a1341e41.js";import{m as D}from"./chunks/metadata.54494a71.js";import{b as I}from"./chunks/data.48d62431.js";const P=["onSubmit"],R={class:"shadow sm:overflow-hidden sm:rounded-md"},E={class:"space-y-6 py-6 px-4 sm:p-6 bg-white dark:bg-black"},U=n("div",null,[n("h3",{class:"text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"}," Change an existing Room Booking "),n("p",{class:"notes mt-1 text-sm text-gray-500 dark:text-gray-400"},[t(" Find out how to quickly create a "),n("a",{class:"svg-external",target:"_blank",href:"https://youtu.be/rSFiikDjGos"}," C# Bookings App from Scratch ")])],-1),N={class:"bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-12"},M=A({__name:"Fields",setup(w){const{toFormValues:m}=q(),o=T();let g=h(),s=h();async function i(c){g.value=await o.api(s.value)}return F(async()=>{let c=await o.api(new S({id:1}));c.succeeded&&(s.value=new V(m(c.response.results[0])))}),(c,r)=>{const y=e("AutoFormFields"),d=e("PrimaryButton");return l(s)?(f(),b("form",{key:0,onSubmit:B(i,["prevent"])},[n("div",R,[n("div",E,[U,a(y,{modelValue:l(s),"onUpdate:modelValue":r[0]||(r[0]=u=>v(s)?s.value=u:s=u),api:l(g)},null,8,["modelValue","api"])]),n("div",N,[a(d,null,{default:p(()=>[t("Save")]),_:1})])])],40,P)):C("",!0)}}}),j=n("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),G=k("",2),H={class:"py-8"},L=k("",4),O=k("",5),z=n("h3",{class:"text-xl font-semibold text-green-600"},"Change an existing Room Booking",-1),Q=k("",4),$=k("",2),W=n("p",null,[n("code",null,"toFormValues"),t(" is used when updating the data bound "),n("code",null,"request"),t(" DTO to convert API response values into the required format that HTML Inputs expect.")],-1),sn='{"title":"Auto Form Components","description":"","frontmatter":{"title":"Auto Form Components"},"headers":[],"relativePath":"vue/gallery/autoform.md"}',J={},tn=Object.assign(J,{__name:"autoform",setup(w){const{setMetadata:m}=q();m(D);const o=I[0];return h(!1),(g,s)=>{const i=e("Breadcrumb"),c=e("Breadcrumbs"),r=e("AutoCreateForm"),y=e("TextLink"),d=e("AutoEditForm");return f(),b("div",null,[j,a(c,{class:"not-prose mt-4","home-href":"/vue/"},{default:p(()=>[a(i,{href:"/vue/gallery/"},{default:p(()=>[t("gallery")]),_:1}),a(i,null,{default:p(()=>[t("Auto Form Examples")]),_:1})]),_:1}),a(_,{Component:"AutoCreateForm"},{default:p(()=>[t("Create Form")]),_:1}),G,n("div",H,[a(r,{class:"mx-auto max-w-3xl",type:"CreateBooking",formStyle:"card"})]),L,a(_,{component:"AutoEditForm"},{default:p(()=>[t("Edit Form")]),_:1}),O,a(d,{class:"mx-auto max-w-3xl mb-4",modelValue:l(o),"onUpdate:modelValue":s[0]||(s[0]=u=>v(o)?o.value=u:null),formStyle:"card",type:"UpdateBooking",deleteType:"DeleteBooking"},{heading:p(()=>[z]),"sub-heading":p(()=>[n("p",null,[t("Here are some "),a(y,{href:"https://youtu.be/rSFiikDjGos"},{default:p(()=>[t("good tips on making room reservations "),a(l(x),{class:"inline-block",icon:"lucide:external-link"})]),_:1})])]),_:1},8,["modelValue"]),Q,a(d,{class:"mx-auto max-w-3xl",modelValue:l(o),"onUpdate:modelValue":s[1]||(s[1]=u=>v(o)?o.value=u:null),formStyle:"card",type:"UpdateBooking",deleteType:"DeleteBooking"},null,8,["modelValue"]),a(_,{component:"AutoFormFields"},{default:p(()=>[t("Form Fields")]),_:1}),$,n("div",null,[a(M,{class:"my-4 mx-auto max-w-screen-md"})]),W])}}});export{sn as __pageData,tn as default};
