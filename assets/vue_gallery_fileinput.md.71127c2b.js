import"./chunks/iconify.087e3548.js";import{m}from"./chunks/metadata.54494a71.js";import{a as g,c as y}from"./chunks/data.bf37f567.js";import{G as w,D as t,o as f,c as q,e as n,q as e,u as p,C as _,d as b,a as c,b as k}from"./app.7707a74f.js";const v=b("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),h=c(`<p>The <code>&lt;FileInput&gt;</code> component beautifies the browsers default HTML file Input, supporting both Single file uploads:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FileInput</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>profileUrl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Single File Upload<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>contact.profileUrl<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div>`,2),F=c(`<p>and Multiple File Uploads:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FileInput</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>profileUrls<span class="token punctuation">&quot;</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Multiple File Uploads<span class="token punctuation">&quot;</span></span> <span class="token attr-name">multiple</span> <span class="token attr-name">:files</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>contact.files<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div>`,2),T=c(`<p>Use <strong>files</strong> when your binding to a <code>UploadedFile</code> complex type or <strong>values</strong> when binding to a <code>string[]</code> of file paths. When binding to relative paths, absolute URLs are resolved using <a href="/vue/use-config">assetsPathResolver</a>.</p><h3 class="my-4 text-lg font-semibold">Invoking APIs containing uploaded files</h3><p>When uploading files, you&#39;ll need to submit API requests using the <code>apiForm</code> or <code>apiFormVoid</code> methods to send a populated <code>FormData</code> instead of a Request DTO, e.g:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">@submit.prevent</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>submit<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>FileInput</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>profileUrls<span class="token punctuation">&quot;</span></span> <span class="token attr-name">label</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Multiple File Uploads<span class="token punctuation">&quot;</span></span> <span class="token attr-name">multiple</span> <span class="token attr-name">:files</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>files<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PrimaryButton</span><span class="token punctuation">&gt;</span></span>Save<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>PrimaryButton</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ts<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> useClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@servicestack/vue&quot;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> CreateContact <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;/mjs/dtos.mjs&quot;</span>

<span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token function">useClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">submit</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">e</span><span class="token operator">:</span>Event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> form <span class="token operator">=</span> e<span class="token punctuation">.</span>target <span class="token keyword">as</span> HTMLFormElement
    <span class="token keyword">const</span> api <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">apiForm</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">CreateContact</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">FormData</span><span class="token punctuation">(</span>form<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>api<span class="token punctuation">.</span>succeeded<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//...</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><h3 class="my-4 text-lg font-semibold">Integrates with Managed File Uploads</h3><p>Using <a href="/locode/files">Managed File Uploads</a> is a productive solution for easily managing file uploads where you can declaratively specify which location uploaded files should be written to, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UpdateContact</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IPatchDb<span class="token punctuation">&lt;</span>Contact<span class="token punctuation">&gt;</span></span><span class="token punctuation">,</span> <span class="token class-name">IReturn<span class="token punctuation">&lt;</span>Contact<span class="token punctuation">&gt;</span></span></span>
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
</code></pre></div><p>This metadata information is also available to <a href="/vue/gallery/autoform">AutoForm components</a> which supports invoking APIs with uploaded files:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>AutoEditForm</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>UpdateContact<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>contact<span class="token punctuation">&quot;</span></span> <span class="token attr-name">formStyle</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>card<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div>`,9),x='{"title":"FileInput Component","description":"","frontmatter":{"title":"FileInput Component"},"headers":[],"relativePath":"vue/gallery/fileinput.md"}',I={},E=Object.assign(I,{__name:"fileinput",setup(U){const s=g[0],{setMetadata:i}=w();return i(m),(C,a)=>{const l=t("Breadcrumb"),r=t("Breadcrumbs"),u=t("FileInput"),d=t("AutoEditForm");return f(),q("div",null,[v,n(r,{class:"not-prose my-4","home-href":"/vue/"},{default:e(()=>[n(l,{href:"/vue/gallery/"},{default:e(()=>[k("gallery")]),_:1}),n(l,null,{default:e(()=>[k("FileInput")]),_:1})]),_:1}),h,n(u,{id:"profileUrl",label:"Single File Upload",modelValue:p(s).profileUrl,"onUpdate:modelValue":a[0]||(a[0]=o=>p(s).profileUrl=o),class:"max-w-lg mb-4"},null,8,["modelValue"]),F,n(u,{id:"profileUrls",label:"Multiple File Uploads",multiple:"",files:p(y),class:"max-w-lg not-prose mb-4"},null,8,["files"]),T,n(d,{id:"updatecontact","data-id":"UpdateContact",type:"UpdateContact",modelValue:p(s),"onUpdate:modelValue":a[1]||(a[1]=o=>_(s)?s.value=o:null),formStyle:"card",class:"not-prose max-w-3xl"},null,8,["modelValue"])])}}});export{x as __pageData,E as default};
