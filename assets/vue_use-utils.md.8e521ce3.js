import"./chunks/iconify.7da723db.js";import{_ as c}from"./chunks/ApiReference.f8e5e2b7.js";import{D as t,o as l,c as r,e as n,q as s,d as i,a as o,b as p}from"./app.bdf7b8e8.js";const u=i("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),k=o(`<h2 id="formatters" class="mt-8 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100"> General functionality and utils </h2><p>General utils used by Vue Components you may also find useful in your Apps:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useUtils <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@servicestack/vue&quot;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>
    dateInputFormat<span class="token punctuation">,</span>  <span class="token comment">// Format Date into required input[type=date] format</span>
    timeInputFormat<span class="token punctuation">,</span>  <span class="token comment">// Format TimeSpan or Date into required input[type=time] format</span>
    setRef<span class="token punctuation">,</span>           <span class="token comment">// Double set reactive Ref&lt;T&gt; to force triggering updates</span>
    unRefs<span class="token punctuation">,</span>           <span class="token comment">// Returns a dto with all Refs unwrapped</span>
    transition<span class="token punctuation">,</span>       <span class="token comment">// Update reactive \`transition\` class based on Tailwind animation transition rule-set</span>
    focusNextElement<span class="token punctuation">,</span> <span class="token comment">// Set focus to the next element inside a HTML Form</span>
    getTypeName<span class="token punctuation">,</span>      <span class="token comment">// Resolve Request DTO name from a Request DTO instance</span>
    htmlTag<span class="token punctuation">,</span>          <span class="token comment">// HTML Tag builder</span>
    htmlAttrs<span class="token punctuation">,</span>        <span class="token comment">// Convert object dictionary into encoded HTML attributes</span>
    linkAttrs<span class="token punctuation">,</span>        <span class="token comment">// Convert HTML Anchor attributes into encoded HTML attributes</span>
    toAppUrl<span class="token punctuation">,</span>         <span class="token comment">// Resolve Absolute URL from relative path</span>
    isPrimitive<span class="token punctuation">,</span>      <span class="token comment">// Check if value is a scalar type</span>
    isComplexType<span class="token punctuation">,</span>    <span class="token comment">// Check if value is a non-scalar type</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useUtils</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div>`,3),d=o(`<p>TypeScript definition of the API surface area and type information for correct usage of <code>useUtils()</code></p><div class="language-ts"><pre><code><span class="token comment">/** Format Date into required input[type=date] format */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">dateInputFormat</span><span class="token punctuation">(</span>d<span class="token operator">:</span> Date<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format TimeSpan or Date into required input[type=time] format */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">timeInputFormat</span><span class="token punctuation">(</span>s<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> Date <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Double set reactive Ref&lt;T&gt; to force triggering updates */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">setRef</span><span class="token punctuation">(</span>$ref<span class="token operator">:</span> Ref<span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Returns a dto with all Refs unwrapped */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">unRefs</span><span class="token punctuation">(</span>o<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token comment">/** Update reactive \`transition\` class based on Tailwind animation transition rule-set */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">transition</span><span class="token punctuation">(</span>rule<span class="token operator">:</span> TransitionRules<span class="token punctuation">,</span> transition<span class="token operator">:</span> Ref<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> show<span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Set focus to the next element inside a HTML Form */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">focusNextElement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve Request DTO name from a Request DTO instance */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">getTypeName</span><span class="token punctuation">(</span>dto<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token comment">/** HTML Tag builder */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">htmlTag</span><span class="token punctuation">(</span>tag<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> child<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Convert object dictionary into encoded HTML attributes */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">htmlAttrs</span><span class="token punctuation">(</span>attrs<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Convert HTML Anchor attributes into encoded HTML attributes */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">linkAttrs</span><span class="token punctuation">(</span>attrs<span class="token operator">:</span> <span class="token punctuation">{</span>
    href<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    cls<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    target<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    rel<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    target<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    rel<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span>
    href<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    cls<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
    target<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
    rel<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve Absolute URL from relative path */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">toAppUrl</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

<span class="token comment">/** Check if value is a scalar type */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">isPrimitive</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

<span class="token comment">/** Check if value is a non-scalar type */</span>
<span class="token keyword">declare</span> <span class="token keyword">function</span> <span class="token function">isComplexType</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>
</code></pre></div>`,2),T='{"title":"General Utils","description":"","frontmatter":{"title":"General Utils"},"headers":[],"relativePath":"vue/use-utils.md"}',m={},v=Object.assign(m,{__name:"use-utils",setup(f){return(y,b)=>{const a=t("Breadcrumb"),e=t("Breadcrumbs");return l(),r("div",null,[u,n(e,{class:"not-prose my-4 mb-8","home-href":"/vue/"},{default:s(()=>[n(a,{href:"/vue/gallery/"},{default:s(()=>[p("gallery")]),_:1}),n(a,null,{default:s(()=>[p("useUtils")]),_:1})]),_:1}),k,n(c,{component:"TypeScript Definition"}),d])}}});export{T as __pageData,v as default};
