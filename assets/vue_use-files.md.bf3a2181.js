import"./chunks/iconify.d8b8c8f4.js";import{_ as c}from"./chunks/ApiReference.5210adcb.js";import{D as t,o as l,c as i,e as n,q as s,d as r,a as o,b as e}from"./app.df00b96f.js";const k=r("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),u=o(`<h2 id="formatters" class="mt-8 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100"> File Utils </h2><p>The file utils are utilized by the <code>&lt;FileInput&gt;</code> <a href="/vue/gallery/form-inputs">Input component</a> and <code>icon</code>, <code>iconRounded</code> and <code>attachment</code> <a href="/vue/use-formatters">formatters</a> for resolving file SVG Icons and MIME Types that Apps can also utilize in <code>useFiles()</code></p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useFiles <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@servicestack/vue&#39;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>
    extSvg<span class="token punctuation">,</span>           <span class="token comment">// Resolve SVG XML for file extension</span>
    extSrc<span class="token punctuation">,</span>           <span class="token comment">// Resolve SVG Data URI for file extension</span>
    getExt<span class="token punctuation">,</span>           <span class="token comment">// Resolve File extension from file name or path</span>
    canPreview<span class="token punctuation">,</span>       <span class="token comment">// Check if path or URI is of a supported web image type</span>
    getFileName<span class="token punctuation">,</span>      <span class="token comment">// Resolve file name from /file/path</span>
    getMimeType<span class="token punctuation">,</span>      <span class="token comment">// Resolve the MIME type for a file path name or extension</span>
    formatBytes<span class="token punctuation">,</span>      <span class="token comment">// Format file size in human readable bytes</span>
    filePathUri<span class="token punctuation">,</span>      <span class="token comment">// Resolve the Icon URI to use for file</span>
    encodeSvg<span class="token punctuation">,</span>        <span class="token comment">// Encode SVG XML for usage in Data URIs</span>
    svgToDataUri<span class="token punctuation">,</span>     <span class="token comment">// Convert SVG XML to data:image URL</span>
    fileImageUri<span class="token punctuation">,</span>     <span class="token comment">// Resolve image preview URL for file</span>
    objectUrl<span class="token punctuation">,</span>        <span class="token comment">// Create and track an Object URL for an uploaded file</span>
    flush<span class="token punctuation">,</span>            <span class="token comment">// Release all tracked Object URLs</span>
    inputFiles<span class="token punctuation">,</span>       <span class="token comment">// Resolve file metadata for all uploaded HTML input files</span>
    iconOnError<span class="token punctuation">,</span>      <span class="token comment">// Error handler for broken images to return a fallbackSrc</span>
    iconFallbackSrc<span class="token punctuation">,</span>  <span class="token comment">// Resolve the fallback URL for a broken Image URL</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div>`,3),m=o(`<p>TypeScript definition of the API surface area and type information for correct usage of <code>useFiles()</code></p><div class="language-ts"><pre><code><span class="token comment">/** Resolve SVG XML for file extension */</span>
<span class="token keyword">function</span> <span class="token function">extSvg</span><span class="token punctuation">(</span>ext<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve SVG URI for file extension */</span>
<span class="token keyword">function</span> <span class="token function">extSrc</span><span class="token punctuation">(</span>ext<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve File extension from file name or path */</span>
<span class="token keyword">function</span> <span class="token function">getExt</span><span class="token punctuation">(</span>path<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">/** Check if path or URI is of a supported web image type */</span>
<span class="token keyword">function</span> <span class="token function">canPreview</span><span class="token punctuation">(</span>path<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve file name from /file/path */</span>
<span class="token keyword">function</span> <span class="token function">getFileName</span><span class="token punctuation">(</span>path<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve the MIME type for a file path name or extension */</span>
<span class="token keyword">function</span> <span class="token function">getMimeType</span><span class="token punctuation">(</span>fileNameOrExt<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format file size in human readable bytes */</span>
<span class="token keyword">function</span> <span class="token function">formatBytes</span><span class="token punctuation">(</span>bytes<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> d<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve the Icon URI to use for file */</span>
<span class="token keyword">function</span> <span class="token function">filePathUri</span><span class="token punctuation">(</span>path<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">/** Encode SVG XML for usage in Data URIs */</span>
<span class="token keyword">function</span> <span class="token function">encodeSvg</span><span class="token punctuation">(</span>s<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Convert SVG XML to data:image URL */</span>
<span class="token keyword">function</span> <span class="token function">svgToDataUri</span><span class="token punctuation">(</span>svg<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve image preview URL for file */</span>
<span class="token keyword">function</span> <span class="token function">fileImageUri</span><span class="token punctuation">(</span>file<span class="token operator">:</span> <span class="token builtin">any</span> <span class="token operator">|</span> <span class="token punctuation">{</span>
    name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">/** Create and track Image URL for an uploaded file */</span>
<span class="token keyword">function</span> <span class="token function">objectUrl</span><span class="token punctuation">(</span>file<span class="token operator">:</span> Blob <span class="token operator">|</span> MediaSource<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Release all tracked Object URLs */</span>
<span class="token keyword">function</span> <span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve file metadata for all uploaded HTML file input files */</span>
<span class="token keyword">function</span> <span class="token function">inputFiles</span><span class="token punctuation">(</span>input<span class="token operator">:</span> HTMLInputElement<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    fileName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    contentLength<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
    filePath<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

<span class="token comment">/** Error handler for broken images to return a fallbackSrc */</span>
<span class="token keyword">function</span> <span class="token function">iconOnError</span><span class="token punctuation">(</span>img<span class="token operator">:</span> HTMLImageElement<span class="token punctuation">,</span> fallbackSrc<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Resolve the fallback URL for a broken Image URL */</span>
<span class="token keyword">function</span> <span class="token function">iconFallbackSrc</span><span class="token punctuation">(</span>src<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> fallbackSrc<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre></div>`,2),v='{"title":"File Utils","description":"","frontmatter":{"title":"File Utils"},"headers":[],"relativePath":"vue/use-files.md"}',f={},R=Object.assign(f,{__name:"use-files",setup(d){return(g,b)=>{const a=t("Breadcrumb"),p=t("Breadcrumbs");return l(),i("div",null,[k,n(p,{class:"not-prose my-4 mb-8","home-href":"/vue/"},{default:s(()=>[n(a,{href:"/vue/gallery/"},{default:s(()=>[e("gallery")]),_:1}),n(a,null,{default:s(()=>[e("useFiles")]),_:1})]),_:1}),u,n(c,{component:"TypeScript Definition"}),m])}}});export{v as __pageData,R as default};
