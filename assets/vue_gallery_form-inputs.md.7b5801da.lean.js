import"./chunks/iconify.2b69f84d.js";import{a as T,A as I}from"./chunks/data.39e3af40.js";import{f as N,P as D,O,x as M,M as z,r as S,Q,C as u,o as m,c as y,d as n,e as a,u as g,L as W,q as l,b as t,B as V,H as U,A as f,F as G,G as H,E as J,a as w}from"./app.3d2ffb6e.js";import{U as $,Q as K,D as X,a as Y}from"./chunks/dtos.a1341e41.js";import{m as Z}from"./chunks/metadata.54494a71.js";const nn=["onSubmit"],an={class:"shadow sm:overflow-hidden sm:rounded-md"},sn={class:"space-y-6 py-6 px-4 sm:p-6 bg-white dark:bg-black"},tn=n("div",null,[n("h3",{class:"text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"}," Update an existing Booking ")],-1),pn={class:"grid grid-cols-6 gap-6"},on={class:"col-span-6 sm:col-span-3"},en={class:"col-span-6 sm:col-span-3"},cn={class:"col-span-6 sm:col-span-3"},ln={class:"col-span-6 sm:col-span-3"},un={class:"col-span-6 sm:col-span-3"},kn={class:"col-span-6 sm:col-span-3"},rn={class:"col-span-6"},gn={class:"mt-4 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-right sm:px-12"},dn={class:"flex justify-between space-x-3"},mn=N({__name:"BookingsForm",props:{id:null},emits:["done"],setup(C,{emit:i}){const c=C,{enumOptions:q,toFormValues:_}=D(),o="name,roomType,roomNumber,bookingStartDate,bookingEndDate,cost,notes",{hasRole:v,user:d,isAuthenticated:s}=O(),k=M(()=>v("Manager")),b=z(),p=S(new $);Q(async()=>{var e;const h=await b.api(new K({id:c.id}));h.succeeded&&(p.value=new $(_((e=h.response)==null?void 0:e.results[0])))});async function A(h){(await b.api(p.value)).succeeded&&E()}async function B(){(await b.apiVoid(new X({id:c.id}))).succeeded&&E()}const E=()=>i("done");return(h,e)=>{const P=u("ErrorSummary"),x=u("TextInput"),F=u("SelectInput"),L=u("TextareaInput"),R=u("ConfirmDelete"),j=u("PrimaryButton");return m(),y("form",{onSubmit:U(A,["prevent"])},[n("div",an,[n("div",sn,[tn,n("fieldset",null,[a(P,{except:o,class:"mb-4"}),n("div",pn,[n("div",on,[a(x,{id:"name",modelValue:p.value.name,"onUpdate:modelValue":e[0]||(e[0]=r=>p.value.name=r),required:"",placeholder:"Name for this booking"},null,8,["modelValue"])]),n("div",en,[a(F,{id:"roomType",modelValue:p.value.roomType,"onUpdate:modelValue":e[1]||(e[1]=r=>p.value.roomType=r),options:g(q)("RoomType")},null,8,["modelValue","options"])]),n("div",cn,[a(x,{type:"number",id:"roomNumber",modelValue:p.value.roomNumber,"onUpdate:modelValue":e[2]||(e[2]=r=>p.value.roomNumber=r),min:"0",required:""},null,8,["modelValue"])]),n("div",ln,[a(x,{type:"number",id:"cost",modelValue:p.value.cost,"onUpdate:modelValue":e[3]||(e[3]=r=>p.value.cost=r),min:"0",required:""},null,8,["modelValue"])]),n("div",un,[a(x,{type:"date",id:"bookingStartDate",modelValue:p.value.bookingStartDate,"onUpdate:modelValue":e[4]||(e[4]=r=>p.value.bookingStartDate=r),required:""},null,8,["modelValue"])]),n("div",kn,[a(x,{type:"date",id:"bookingEndDate",modelValue:p.value.bookingEndDate,"onUpdate:modelValue":e[5]||(e[5]=r=>p.value.bookingEndDate=r)},null,8,["modelValue"])]),n("div",rn,[a(L,{id:"notes",modelValue:p.value.notes,"onUpdate:modelValue":e[6]||(e[6]=r=>p.value.notes=r),placeholder:"Notes about this booking",class:"h-24"},null,8,["modelValue"])])])])]),n("div",gn,[n("div",dn,[n("div",null,[g(k)?(m(),W(R,{key:0,onDelete:B},{default:l(()=>[t("Delete")]),_:1})):V("",!0)]),n("div",null,[a(j,{onClick:A},{default:l(()=>[t("Update Booking")]),_:1})])])])])],40,nn)}}}),qn={class:"p-4 shadow sm:rounded-md"},vn={class:"max-w-xl grid grid-cols-6 gap-6"},yn={class:"col-span-12"},_n={class:"mb-3"},fn={class:"block truncate"},wn={class:"mt-2 flex justify-end"},bn=n("b",{class:"text-gray-500"},"Single:",-1),hn={key:0,class:"flex"},xn=["src"],Tn={class:"text-lg"},Cn={class:"mb-3"},In={class:"flex items-center"},Sn={class:"ml-3 truncate"},Vn={class:"mt-2 flex justify-end"},Nn=n("b",{class:"text-gray-500"},"Single with Icon:",-1),An={key:0,class:"flex"},En=["src"],$n={class:"text-lg"},Dn={class:"mb-3"},Un={class:"flex items-center"},Bn={class:"ml-3 truncate"},Pn={class:"mt-2"},Fn=n("div",{class:"text-right"},[n("b",{class:"text-gray-500"},"Multiple with Icon:")],-1),Ln={key:0,class:"flex flex-wrap"},Rn={class:"flex ml-4 mb-2"},jn=["src"],On=N({__name:"AutocompleteExamples",setup(C){const i=S(null),c=S(null),q=S([]);return(_,o)=>{const v=u("Autocomplete"),d=u("Icon");return m(),y("div",qn,[n("div",vn,[n("form",yn,[n("div",_n,[a(v,{id:"simple",options:g(T),modelValue:i.value,"onUpdate:modelValue":o[0]||(o[0]=s=>i.value=s),label:"Single Contact",match:(s,k)=>s.displayName.toLowerCase().includes(k.toLowerCase()),placeholder:"Select Contact"},{item:l(({displayName:s})=>[n("span",fn,f(s),1)]),_:1},8,["options","modelValue","match"]),n("div",wn,[n("p",null,[bn,i.value?(m(),y("div",hn,[n("img",{src:i.value.profileUrl,class:"w-8 h-8 rounded-full mr-2"},null,8,xn),n("b",Tn,f(i.value.displayName),1)])):V("",!0)])])]),n("div",Cn,[a(v,{id:"contact",options:g(T),modelValue:c.value,"onUpdate:modelValue":o[1]||(o[1]=s=>c.value=s),label:"Single Contact with Icon",match:(s,k)=>s.displayName.toLowerCase().includes(k.toLowerCase()),placeholder:"Select Contact"},{item:l(({displayName:s,profileUrl:k})=>[n("div",In,[a(d,{class:"h-6 w-6 flex-shrink-0 rounded-full",src:k,loading:"lazy"},null,8,["src"]),n("span",Sn,f(s),1)])]),_:1},8,["options","modelValue","match"]),n("div",Vn,[n("p",null,[Nn,c.value?(m(),y("div",An,[n("img",{src:c.value.profileUrl,class:"w-8 h-8 rounded-full mr-2"},null,8,En),n("b",$n,f(c.value.displayName),1)])):V("",!0)])])]),n("div",Dn,[a(v,{id:"contacts",options:g(T),modelValue:q.value,"onUpdate:modelValue":o[2]||(o[2]=s=>q.value=s),multiple:"",label:"Single Contact with Icon",match:(s,k)=>s.displayName.toLowerCase().includes(k.toLowerCase()),placeholder:"Select Contact"},{item:l(({displayName:s,profileUrl:k})=>[n("div",Un,[a(d,{class:"h-6 w-6 flex-shrink-0 rounded-full",src:k,loading:"lazy"},null,8,["src"]),n("span",Bn,f(s),1)])]),_:1},8,["options","modelValue","match"]),n("div",Pn,[Fn,n("p",null,[q.value.length?(m(),y("div",Ln,[(m(!0),y(G,null,H(q.value,s=>(m(),y("div",Rn,[n("img",{src:s.profileUrl,class:"w-6 h-6 rounded-full mr-2"},null,8,jn),n("span",null,f(s.displayName),1)]))),256))])):V("",!0)])])])])])])}}}),Mn=["onSubmit"],zn={class:"shadow sm:rounded-md bg-white dark:bg-black"},Qn={class:"relative px-4 py-5 sm:p-6"},Wn=n("legend",{class:"text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"}," TagInput Examples ",-1),Gn={class:"grid grid-cols-12 gap-6"},Hn={class:"col-span-6"},Jn={class:"col-span-6"},Kn={class:"col-span-12"},Xn={class:"mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between"},Yn=n("div",null,null,-1),Zn={class:"flex justify-end"},na=N({__name:"TagInputExamples",setup(C){const i="firstName,lastName,skills",c=new Y(T[0]);function q(_){}return(_,o)=>{const v=u("ErrorSummary"),d=u("TextInput"),s=u("TagInput"),k=u("SecondaryButton"),b=u("PrimaryButton");return m(),y("form",{onSubmit:U(q,["prevent"])},[n("div",zn,[n("div",Qn,[n("fieldset",null,[Wn,a(v,{except:i}),n("div",Gn,[n("div",Hn,[a(d,{modelValue:g(c).firstName,"onUpdate:modelValue":o[0]||(o[0]=p=>g(c).firstName=p)},null,8,["modelValue"])]),n("div",Jn,[a(d,{modelValue:g(c).lastName,"onUpdate:modelValue":o[1]||(o[1]=p=>g(c).lastName=p)},null,8,["modelValue"])]),n("div",Kn,[a(s,{modelValue:g(c).skills,"onUpdate:modelValue":o[2]||(o[2]=p=>g(c).skills=p),label:"Technology Skills"},null,8,["modelValue"])])])])]),n("div",Xn,[Yn,n("div",Zn,[a(k,{class:"mr-4"},{default:l(()=>[t("Cancel")]),_:1}),a(b,{type:"submit"},{default:l(()=>[t("Submit")]),_:1})])])])],40,Mn)}}}),aa=n("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),sa={class:"mb-4 text-lg"},ta=n("code",null,"TextInput",-1),pa=n("code",null,"SelectInput",-1),oa=n("code",null,"CheckboxInput",-1),ea=n("code",null,"TextAreaInput",-1),ca=w("",1),la=w("",2),ua={class:"my-4 text-lg"},ka=n("code",null,"enumOptions",-1),ia=w("",2),ra=w("",2),ga=w("",3),da=w("",1),wa='{"title":"Form Inputs Components","description":"","frontmatter":{"title":"Form Inputs Components"},"headers":[],"relativePath":"vue/gallery/form-inputs.md"}',ma={},ba=Object.assign(ma,{__name:"form-inputs",setup(C){const i=T[0],{load:c}=D();return c(Z),(q,_)=>{const o=u("Breadcrumb"),v=u("Breadcrumbs"),d=u("TextLink"),s=u("AutoEditForm");return m(),y("div",null,[aa,a(v,{class:"mt-4","home-href":"/vue/"},{default:l(()=>[a(o,{href:"/vue/gallery/"},{default:l(()=>[t("gallery")]),_:1}),a(o,null,{default:l(()=>[t("Form Input Examples")]),_:1})]),_:1}),a(I,{Component:"TextInput"},{default:l(()=>[t("Bookings Form")]),_:1}),n("p",sa,[t(" The "),ta,t(", "),pa,t(", "),oa,t(" and "),ea,t(" contains the most popular Input controls used by C# POCOs which can be bound directly to Request DTOs and includes support for "),a(d,{href:"/declarative-validation"},{default:l(()=>[t("declarative")]),_:1}),t(" and "),a(d,{href:"/validation"},{default:l(()=>[t("Fluent Validation")]),_:1}),t(" binding. ")]),ca,a(mn,{id:1}),la,n("p",ua,[t(" This also shows how we can utilize "),ka,t(" from our "),a(d,{href:"/vue/use-appmetadata"},{default:l(()=>[t("App Metadata")]),_:1}),t(" to populate select drop downs from C# enums. ")]),a(I,{Component:"Autocomplete"},{default:l(()=>[t("Autocomplete")]),_:1}),ia,a(On,{class:"max-w-prose"}),a(I,{Component:"TagInput"},{default:l(()=>[t("TagInput")]),_:1}),ra,a(s,{formStyle:"card",type:"UpdateContact",modelValue:g(i),"onUpdate:modelValue":_[0]||(_[0]=k=>J(i)?i.value=k:null)},null,8,["modelValue"]),ga,a(I,{Component:"TagInput"},{default:l(()=>[t("Custom Form")]),_:1}),a(na,{class:"max-w-screen-md"}),da])}}});export{wa as __pageData,ba as default};
