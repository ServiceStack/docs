import{r as m,P as b,D as p,o as e,c as v,e as n,q as s,E as r,B as h,u as S,A as w,d as o,a as c,b as a}from"./app.bdf7b8e8.js";import"./chunks/iconify.7da723db.js";import{_ as d}from"./chunks/ApiReference.f8e5e2b7.js";const D=o("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),I=c("",2),B=o("h3",{class:"p-8 text-3xl"},"Hello @servicestack/vue!",-1),C=c("",2),P=o("b",null,"subtitle",-1),x={class:"md:p-4"},V=o("p",null,[a("As seen in this example we can use "),o("strong",null,"content-class"),a(" to customize the inner body contents and the "),o("code",null,"<template #subtitle>"),a(" slot to include an optional rich HTML subtitle, with all other inner contents is displayed in the SlideOver's body.")],-1),M=c("",2),N={key:3,class:"text-2xl my-4"},O=c("",5),L='{"title":"Modal Components","description":"","frontmatter":{"title":"Modal Components"},"headers":[],"relativePath":"vue/gallery/modals.md"}',E={},F=Object.assign(E,{__name:"modals",setup(R){const l=m(!1),u=m(!1),{signIn:H,user:g}=b();return($,t)=>{const _=p("Breadcrumb"),f=p("Breadcrumbs"),i=p("SecondaryButton"),q=p("ModalDialog"),y=p("Alert"),T=p("SlideOver"),A=p("SignIn");return e(),v("div",null,[D,n(f,{class:"not-prose mt-4","home-href":"/vue/"},{default:s(()=>[n(_,{href:"/vue/gallery/"},{default:s(()=>[a("gallery")]),_:1}),n(_,null,{default:s(()=>[a("Modal Components")]),_:1})]),_:1}),n(d,{component:"ModalDialog"}),I,n(i,{onClick:t[0]||(t[0]=k=>l.value=!0)},{default:s(()=>[a("Show Modal")]),_:1}),l.value?(e(),r(q,{key:0,onDone:t[1]||(t[1]=k=>l.value=!1)},{default:s(()=>[B]),_:1})):h("",!0),n(d,{component:"SlideOver"}),C,n(i,{onClick:t[2]||(t[2]=k=>u.value=!0),class:"mt-4"},{default:s(()=>[a("Show Slide")]),_:1}),u.value?(e(),r(T,{key:1,title:"The Title",onDone:t[3]||(t[3]=k=>u.value=!1),class:"not-prose","content-class":"relative flex-1"},{subtitle:s(()=>[a("a "),P]),default:s(()=>[n(y,{type:"error"},{default:s(()=>[a("Authentication Required")]),_:1}),o("div",x,[n(i,null,{default:s(()=>[a("Sign In")]),_:1})])]),_:1})):h("",!0),V,n(d,{component:"SignIn"}),M,S(g)?(e(),v("h3",N,"Hello, "+w(S(g).displayName),1)):(e(),r(A,{key:2,tabs:!1,class:"not-prose"})),O])}}});export{L as __pageData,F as default};
