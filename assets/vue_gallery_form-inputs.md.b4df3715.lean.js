import"./chunks/iconify.a8882387.js";import{_ as N}from"./chunks/ApiReference.0136c1ae.js";import{f as U,Z as w,Q as A,x as F,O as P,r as O,R,D as o,o as g,c as h,d as a,e as t,u as _,E as M,q as e,b as l,B as Q,K as $,a as x}from"./app.f226abaa.js";import{U as b,Q as j,D as z}from"./chunks/dtos.c5cf3f3f.js";import{a as Z}from"./chunks/data.f742b32f.js";import{m as K}from"./chunks/metadata.46b41fb9.js";const W=["onSubmit"],G={class:"shadow sm:overflow-hidden sm:rounded-md"},H={class:"space-y-6 py-6 px-4 sm:p-6 bg-white dark:bg-black"},J=a("div",null,[a("h3",{class:"text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"}," Update an existing Booking ")],-1),L={class:"grid grid-cols-6 gap-6"},X={class:"col-span-6 sm:col-span-3"},Y={class:"col-span-6 sm:col-span-3"},nn={class:"col-span-6 sm:col-span-3"},an={class:"col-span-6 sm:col-span-3"},sn={class:"col-span-6 sm:col-span-3"},tn={class:"col-span-6 sm:col-span-3"},pn={class:"col-span-6"},on={class:"mt-4 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-12"},en={class:"flex justify-between space-x-3"},cn=U({__name:"BookingsForm",props:{id:null},emits:["done"],setup(q,{emit:i}){const r=q,{enumOptions:v,toFormValues:k}=w(),d="name,roomType,roomNumber,bookingStartDate,bookingEndDate,cost,notes",{hasRole:T,user:dn,isAuthenticated:mn}=A(),V=F(()=>T("Manager")),m=P(),s=O(new b);R(async()=>{var n;const c=await m.api(new j({id:r.id}));c.succeeded&&(s.value=new b(k((n=c.response)==null?void 0:n.results[0])))});async function y(c){(await m.api(s.value)).succeeded&&f()}async function D(){(await m.apiVoid(new z({id:r.id}))).succeeded&&f()}const f=()=>i("done");return(c,n)=>{const B=o("ErrorSummary"),u=o("TextInput"),I=o("SelectInput"),S=o("TextareaInput"),C=o("ConfirmDelete"),E=o("PrimaryButton");return g(),h("form",{onSubmit:$(y,["prevent"])},[a("div",G,[a("div",H,[J,a("fieldset",null,[t(B,{except:d,class:"mb-4"}),a("div",L,[a("div",X,[t(u,{id:"name",modelValue:s.value.name,"onUpdate:modelValue":n[0]||(n[0]=p=>s.value.name=p),required:"",placeholder:"Name for this booking"},null,8,["modelValue"])]),a("div",Y,[t(I,{id:"roomType",modelValue:s.value.roomType,"onUpdate:modelValue":n[1]||(n[1]=p=>s.value.roomType=p),options:_(v)("RoomType")},null,8,["modelValue","options"])]),a("div",nn,[t(u,{type:"number",id:"roomNumber",modelValue:s.value.roomNumber,"onUpdate:modelValue":n[2]||(n[2]=p=>s.value.roomNumber=p),min:"0",required:""},null,8,["modelValue"])]),a("div",an,[t(u,{type:"number",id:"cost",modelValue:s.value.cost,"onUpdate:modelValue":n[3]||(n[3]=p=>s.value.cost=p),min:"0",required:""},null,8,["modelValue"])]),a("div",sn,[t(u,{type:"date",id:"bookingStartDate",modelValue:s.value.bookingStartDate,"onUpdate:modelValue":n[4]||(n[4]=p=>s.value.bookingStartDate=p),required:""},null,8,["modelValue"])]),a("div",tn,[t(u,{type:"date",id:"bookingEndDate",modelValue:s.value.bookingEndDate,"onUpdate:modelValue":n[5]||(n[5]=p=>s.value.bookingEndDate=p)},null,8,["modelValue"])]),a("div",pn,[t(S,{id:"notes",modelValue:s.value.notes,"onUpdate:modelValue":n[6]||(n[6]=p=>s.value.notes=p),placeholder:"Notes about this booking",class:"h-24"},null,8,["modelValue"])])])])]),a("div",on,[a("div",en,[a("div",null,[_(V)?(g(),M(C,{key:0,onDelete:D},{default:e(()=>[l("Delete")]),_:1})):Q("",!0)]),a("div",null,[t(E,{onClick:y},{default:e(()=>[l("Update Booking")]),_:1})])])])])],40,W)}}}),un=a("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),ln=x("",2),kn=x("",3),bn='{"title":"Form Inputs Components","description":"","frontmatter":{"title":"Form Inputs Components"},"headers":[],"relativePath":"vue/gallery/form-inputs.md"}',rn={},wn=Object.assign(rn,{__name:"form-inputs",setup(q){Z[0];const{setMetadata:i}=w();return i(K),(r,v)=>{const k=o("Breadcrumb"),d=o("Breadcrumbs");return g(),h("div",null,[un,t(d,{class:"not-prose mt-4","home-href":"/vue/"},{default:e(()=>[t(k,{href:"/vue/gallery/"},{default:e(()=>[l("gallery")]),_:1}),t(k,null,{default:e(()=>[l("Form Input Examples")]),_:1})]),_:1}),t(N,{component:"TextInput"},{default:e(()=>[l("Bookings Form")]),_:1}),ln,t(cn,{id:1,class:"mb-4"}),kn])}}});export{bn as __pageData,wn as default};
