import"./chunks/iconify.d8b8c8f4.js";import{_ as f}from"./chunks/ApiReference.5210adcb.js";import{f as T,D as p,o as y,c as _,d as n,e as s,u as o,q as e,b as u,L as x,G as h,C as I,a as g}from"./app.df00b96f.js";import{a as C}from"./chunks/dtos.a1341e41.js";import{a as q}from"./chunks/data.11f47279.js";import{m as S}from"./chunks/metadata.54494a71.js";const V=["onSubmit"],E={class:"shadow sm:rounded-md bg-white dark:bg-black"},N={class:"relative px-4 py-5 sm:p-6"},A=n("legend",{class:"text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4"}," TagInput Examples ",-1),P={class:"grid grid-cols-12 gap-6"},B={class:"col-span-6"},F={class:"col-span-6"},U={class:"col-span-12"},D={class:"mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between"},L=n("div",null,null,-1),R={class:"flex justify-end"},$=T({__name:"TagInputExamples",setup(v){const c="firstName,lastName,skills",t=new C(q[0]);function m(k){}return(k,a)=>{const r=p("ErrorSummary"),i=p("TextInput"),d=p("TagInput"),b=p("SecondaryButton"),w=p("PrimaryButton");return y(),_("form",{onSubmit:x(m,["prevent"])},[n("div",E,[n("div",N,[n("fieldset",null,[A,s(r,{except:c}),n("div",P,[n("div",B,[s(i,{modelValue:o(t).firstName,"onUpdate:modelValue":a[0]||(a[0]=l=>o(t).firstName=l)},null,8,["modelValue"])]),n("div",F,[s(i,{modelValue:o(t).lastName,"onUpdate:modelValue":a[1]||(a[1]=l=>o(t).lastName=l)},null,8,["modelValue"])]),n("div",U,[s(d,{modelValue:o(t).skills,"onUpdate:modelValue":a[2]||(a[2]=l=>o(t).skills=l),label:"Technology Skills"},null,8,["modelValue"])])])])]),n("div",D,[L,n("div",R,[s(b,{class:"mr-4"},{default:e(()=>[u("Cancel")]),_:1}),s(w,{type:"submit"},{default:e(()=>[u("Submit")]),_:1})])])])],40,V)}}}),j=n("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),G=g(`<p>The <code>TagInput</code> component provides a user friendly control for managing a free-form <code>List&lt;string&gt;</code> tags or symbols which is also supported in declarative Auto Forms using the <code>[Input(Type=&quot;tag&quot;)]</code> attribute as seen in the <strong>UpdateContact</strong> example using the <a href="/vue/gallery/autoform">AutoForm components</a>:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AutoEditForm</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UpdateContact<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>contact<span class="token punctuation">&quot;</span></span> <span class="token attr-name">formStyle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div>`,2),M=g(`<p>Generated from the <strong>UpdateContact</strong> C# Request DTO:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UpdateContact</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IPatchDb<span class="token punctuation">&lt;</span>Contact<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturn<span class="token punctuation">&lt;</span>Contact<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ValidateNotEmpty</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> FirstName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ValidateNotEmpty</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> LastName <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Input</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Type <span class="token operator">=</span> <span class="token string">&quot;file&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">UploadTo</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;profiles&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> ProfileUrl <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> SalaryExpectation <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ValidateNotEmpty</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> JobType <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> AvailabilityWeeks <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">EmploymentType<span class="token punctuation">?</span></span> PreferredWorkType <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> PreferredLocation <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ValidateNotEmpty</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> Email <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> Phone <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Input</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Type <span class="token operator">=</span> <span class="token string">&quot;tag&quot;</span><span class="token punctuation">)</span></span><span class="token punctuation">,</span> <span class="token class-name">FieldCss</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Field <span class="token operator">=</span> <span class="token string">&quot;col-span-12&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">?</span></span> Skills <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Input</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Type <span class="token operator">=</span> <span class="token string">&quot;textarea&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">FieldCss</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Field <span class="token operator">=</span> <span class="token string">&quot;col-span-12 text-center&quot;</span><span class="token punctuation">,</span> Input <span class="token operator">=</span> <span class="token string">&quot;h-48&quot;</span><span class="token punctuation">,</span> Label<span class="token operator">=</span> <span class="token string">&quot;text-xl text-indigo-700&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> About <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Alternatively <code>&lt;TagInput&gt;</code> can be used in Custom Forms directly by binding to a <code>List&lt;string&gt;</code> or <code>string[]</code> model:</p>`,3),O=g(`<div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>shadow sm:rounded-md bg-white dark:bg-black<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>relative px-4 py-5 sm:p-6<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>fieldset</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>legend</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text-base font-medium text-gray-900 dark:text-gray-100 text-center mb-4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                    TagInput Examples
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>legend</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ErrorSummary</span> <span class="token attr-name">:except</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>visibleFields<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>grid grid-cols-12 gap-6<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>col-span-6<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextInput</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>request.firstName<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>col-span-6<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TextInput</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>request.lastName<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>col-span-12<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TagInput</span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>request.skills<span class="token punctuation">&quot;</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Technology Skills<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>fieldset</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mt-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 sm:px-6 flex flex-wrap justify-between<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>flex justify-end<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>SecondaryButton</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mr-4<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Cancel<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>SecondaryButton</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PrimaryButton</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Submit<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>PrimaryButton</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,1),Y='{"title":"TagInput Component","description":"","frontmatter":{"title":"TagInput Component"},"headers":[],"relativePath":"vue/gallery/taginput.md"}',W={},Z=Object.assign(W,{__name:"taginput",setup(v){const c=q[0],{setMetadata:t}=h();return t(S),(m,k)=>{const a=p("Breadcrumb"),r=p("Breadcrumbs"),i=p("AutoEditForm");return y(),_("div",null,[j,s(r,{class:"not-prose my-4","home-href":"/vue/"},{default:e(()=>[s(a,{href:"/vue/gallery/"},{default:e(()=>[u("gallery")]),_:1}),s(a,null,{default:e(()=>[u("TagInput")]),_:1})]),_:1}),G,s(i,{id:"updatecontact","data-id":"UpdateContact",type:"UpdateContact",modelValue:o(c),"onUpdate:modelValue":k[0]||(k[0]=d=>I(c)?c.value=d:null),formStyle:"card",class:"not-prose max-w-3xl mb-4"},null,8,["modelValue"]),M,s(f,{component:"TagInput"},{default:e(()=>[u("Custom Form")]),_:1}),O,s($,{"data-id":"TagInputExamples",class:"max-w-screen-md"})])}}});export{Y as __pageData,Z as default};
