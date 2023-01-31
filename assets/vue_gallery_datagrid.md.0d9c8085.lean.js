import"./chunks/iconify.9ee294a8.js";import{f as q,b as w,A as v,t as l}from"./chunks/data.6e90b44b.js";import{f as b,C as i,o as g,M as f,q as s,b as n,A as u,u as o,d as a,O as D,L as x,c as T,e as t,a as k}from"./app.82363d70.js";import{m as S}from"./chunks/metadata.54494a71.js";const F=a("span",{class:"text-indigo-600"},"Date",-1),C=b({__name:"Custom",setup(h){return(r,d)=>{const m=i("DataGrid");return g(),f(m,{items:o(q),class:"max-w-screen-md",tableStyle:["stripedRows","uppercaseHeadings"],"header-titles":{temperatureC:"TEMP. (C)",temperatureF:"TEMP. (F)"}},{"date-header":s(()=>[F]),date:s(({date:e})=>[n(u(new Intl.DateTimeFormat().format(new Date(e))),1)]),temperatureC:s(({temperatureC:e})=>[n(u(e)+"\xB0 ",1)]),temperatureF:s(({temperatureF:e})=>[n(u(e)+"\xB0 ",1)]),summary:s(({summary:e})=>[n(u(e),1)]),_:1},8,["items","header-titles"])}}}),B={class:"text-gray-900"},A=a("span",{class:"hidden lg:inline"},"Room ",-1),I=a("span",{class:"hidden lg:inline"}," Date",-1),R=a("span",{class:"hidden lg:inline"}," Date",-1),E=b({__name:"Responsive",setup(h){const{currency:r}=D();function d(e){console.log("headerSelected",e)}function m(e){console.log("rowSelected",e)}return(e,_)=>{const c=i("DataGrid");return g(),f(c,{items:o(w),"visible-from":{name:"xl",bookingStartDate:"sm",bookingEndDate:"xl"},"allow-header-selection":!0,onHeaderSelected:d,"allow-selection":!0,onRowSelected:m},{id:s(({id:p})=>[a("span",B,u(p),1)]),name:s(({name:p})=>[n(u(p),1)]),"roomNumber-header":s(()=>[A,n("No ")]),cost:s(({cost:p})=>[n(u(o(r)(p)),1)]),"bookingStartDate-header":s(()=>[n(" Start"),I]),"bookingEndDate-header":s(()=>[n(" End"),R]),"createdBy-header":s(()=>[n(" Employee ")]),createdBy:s(({createdBy:p})=>[n(u(p),1)]),_:1},8,["items"])}}});var y=[{id:1,name:"First Booking!",roomType:"Queen",roomNumber:10,bookingStartDate:"/Date(1670620983771-0000)/",bookingEndDate:"/Date(1671225783771-0000)/",cost:100},{id:2,name:"Booking 2",roomType:"Double",roomNumber:12,bookingStartDate:"/Date(1670793783778-0000)/",bookingEndDate:"/Date(1671398583778-0000)/",cost:120},{id:3,name:"Booking the 3rd",roomType:"Suite",roomNumber:13,bookingStartDate:"/Date(1670880183778-0000)/",bookingEndDate:"/Date(1671484983778-0000)/",cost:130}];const N=a("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),G=k("",3),V=k("",3),P=k("",6),L=a("p",{class:"my-4 text-lg"},[n(" Behavior of the DataGrid can be customized with the "),a("code",null,"@header-selected"),n(" event to handle when column headers are selected to apply custom filtering to the "),a("b",null,"items"),n(" data source whilst the "),a("code",null,"@row-selected"),n(" event can be used to apply custom behavior when a row is selected. ")],-1),M=a("h2",{id:"table-styles",class:"mt-8 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100"}," Table Styles ",-1),U={class:"mb-4 text-lg"},z=a("b",null,"tableStyles",-1),H=a("h3",{class:"my-4 text-lg font-semibold"},"Default (Striped Rows)",-1),W=a("h3",{class:"my-4 text-lg font-semibold"},"Simple",-1),j=a("h3",{class:"my-4 text-lg font-semibold"},"Uppercase Headings",-1),$=a("h3",{class:"my-4 text-lg font-semibold"},"Vertical Lines",-1),O=a("h3",{class:"my-4 text-lg font-semibold"},"White Background",-1),J=a("h3",{class:"my-4 text-lg font-semibold"},"Full Width",-1),Q=a("h3",{class:"my-4 text-lg font-semibold"},"Full Width, Uppercase with Vertical Lines",-1),Y=k("",5),K=a("h2",{id:"app-metadata",class:"mt-8 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100"}," Using App Metadata ",-1),X=a("p",{class:"my-4 text-lg"}," By default DataGrid will render values using its default configured formatters, so results with strings, numbers and defaults will display a stock standard resultset: ",-1),Z=k("",4),nn={class:"my-4 text-lg"},on='{"title":"DataGrid Component","description":"","frontmatter":{"title":"DataGrid Component"},"headers":[],"relativePath":"vue/gallery/datagrid.md"}',an={},cn=Object.assign(an,{__name:"datagrid",setup(h){const{load:r}=x();return r(S),(d,m)=>{const e=i("Breadcrumb"),_=i("Breadcrumbs"),c=i("DataGrid"),p=i("TextLink");return g(),T("div",null,[N,a("div",null,[t(_,{class:"mt-4","home-href":"/vue/"},{default:s(()=>[t(e,{href:"/vue/gallery/"},{default:s(()=>[n("gallery")]),_:1}),t(e,null,{default:s(()=>[n("DataGrid Examples")]),_:1})]),_:1}),t(v,{class:"pt-8",Component:"DataGrid<Model>"},{default:s(()=>[n("Default")]),_:1}),G,t(c,{items:o(l)},null,8,["items"]),V,t(C),P,t(E),L,M,a("p",U,[n(" The appearance of DataGrids can use "),z,n(" to change to different "),t(p,{href:"https://tailwindui.com/components/application-ui/lists/tables"},{default:s(()=>[n("Tailwind Table Styles")]),_:1}),n(", e.g: ")]),H,t(c,{items:o(l)},null,8,["items"]),W,t(c,{items:o(l),tableStyle:"simple"},null,8,["items"]),j,t(c,{items:o(l),tableStyle:"uppercaseHeadings"},null,8,["items"]),$,t(c,{items:o(l),tableStyle:"verticalLines"},null,8,["items"]),O,t(c,{items:o(l),tableStyle:"whiteBackground"},null,8,["items"]),J,t(c,{items:o(l),tableStyle:"fullWidth"},null,8,["items"]),Q,t(c,{items:o(l),tableStyle:["uppercaseHeadings","fullWidth","verticalLines"]},null,8,["items"]),Y,a("p",null,[n("See "),t(p,{href:"/vue/use-formatters"},{default:s(()=>[n("useFormatters docs")]),_:1}),n(" for more info.")]),K,X,t(c,{items:o(y)},null,8,["items"]),Z,t(c,{items:o(y),type:"Booking"},null,8,["items"]),a("p",nn,[n(" Declaratively annotating your DTOs with preferred formatting hints makes this rich metadata information available to clients where it's used to enhance ServiceStack's built-in UI's and Components like "),t(p,{href:"/api-explorer"},{default:s(()=>[n("API Explorer")]),_:1}),n(", "),t(p,{href:"/locode/"},{default:s(()=>[n("Locode")]),_:1}),n(" and "),t(p,{href:"/templates-blazor-components"},{default:s(()=>[n("Blazor Tailwind Components")]),_:1}),n(". ")])])])}}});export{on as __pageData,cn as default};
