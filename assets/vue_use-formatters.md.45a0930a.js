import"./chunks/iconify.5edea4b0.js";import{_ as t}from"./chunks/ApiReference.ddaacc72.js";import{D as e,o as l,c as r,e as n,q as s,d as u,a,b as p}from"./app.1dfbaa1d.js";const i=u("link",{rel:"stylesheet",href:"/css/tailwind-components.css"},null,-1),k=a(`<h2 id="formatters" class="mt-8 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100"> Using Formatters </h2><p>Your App and components can also utilize the built-in formatting functions in <code>useFormatters()</code>:</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useFormatters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@servicestack/vue&#39;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>
    Formats<span class="token punctuation">,</span>              <span class="token comment">// Available format methods to use in &lt;PreviewFormat /&gt;</span>
    formatValue<span class="token punctuation">,</span>          <span class="token comment">// Format any value or object graph</span>
    currency<span class="token punctuation">,</span>             <span class="token comment">// Format number as Currency</span>
    bytes<span class="token punctuation">,</span>                <span class="token comment">// Format number in human readable disk size</span>
    link<span class="token punctuation">,</span>                 <span class="token comment">// Format URL as &lt;a&gt; link</span>
    linkTel<span class="token punctuation">,</span>              <span class="token comment">// Format Phone Number as &lt;a&gt; tel: link</span>
    linkMailTo<span class="token punctuation">,</span>           <span class="token comment">// Format email as &lt;a&gt; mailto: link</span>
    icon<span class="token punctuation">,</span>                 <span class="token comment">// Format Image URL as an Icon</span>
    iconRounded<span class="token punctuation">,</span>          <span class="token comment">// Format Image URL as a full rounded Icon</span>
    attachment<span class="token punctuation">,</span>           <span class="token comment">// Format File attachment URL as an Attachment</span>
    hidden<span class="token punctuation">,</span>               <span class="token comment">// Format as empty string</span>
    time<span class="token punctuation">,</span>                 <span class="token comment">// Format duration in time format</span>
    relativeTime<span class="token punctuation">,</span>         <span class="token comment">// Format Date as Relative Time from now</span>
    relativeTimeFromMs<span class="token punctuation">,</span>   <span class="token comment">// Format time in ms as Relative Time from now</span>
    relativeTimeFromDate<span class="token punctuation">,</span> <span class="token comment">// Format difference between dates as Relative Time</span>
    formatDate<span class="token punctuation">,</span>           <span class="token comment">// Format as Date</span>
    formatNumber<span class="token punctuation">,</span>         <span class="token comment">// Format as Number</span>

    setDefaultFormats<span class="token punctuation">,</span>    <span class="token comment">// Set default locale, number and Date formats</span>
    setFormatters<span class="token punctuation">,</span>        <span class="token comment">// Register additional formatters for use in &lt;PreviewFormat /&gt;</span>
    indentJson<span class="token punctuation">,</span>           <span class="token comment">// Prettify an API JSON Response</span>
    truncate<span class="token punctuation">,</span>             <span class="token comment">// Truncate text that exceeds maxLength with an ellipsis</span>
    apiValueFmt<span class="token punctuation">,</span>          <span class="token comment">// Format an API Response value</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useFormatters</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>Many of these formatting functions return rich HTML markup which will need to be rendered using Vue&#39;s <strong>v-html</strong> directive:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-html</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>formatValue(value)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>See the <a href="/vue/gallery/formats">PreviewFormat</a> for examples for what each of these format functions render to.</p>`,6),m=a(`<p>Global default formats can be customized with <code>setDefaultFormats</code>:</p><div class="language-js"><pre><code><span class="token function">setDefaultFormats</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">locale</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>     <span class="token comment">// Use Browsers default local</span>
    <span class="token literal-property property">assumeUtc</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>     <span class="token comment">// Use locale Number format</span>
    <span class="token literal-property property">date</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">&quot;Intl.DateTimeFormat&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token string">&quot;{dateStyle:&#39;medium&#39;}&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">maxFieldLength</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
    <span class="token literal-property property">maxNestedFields</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
    <span class="token literal-property property">maxNestedFieldLength</span><span class="token operator">:</span> <span class="token number">150</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,2),d=a(`<p>Use <code>setFormatters</code> to register new formatters that you want to use in <code>[Format(&quot;method&quot;)]</code> or within <code>&lt;PreviewFormat/&gt;</code> components, e.g. you could register a formatter that renders a QR Code image of the content with:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> QRCode <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;qrcode-svg&quot;</span>

<span class="token keyword">function</span> <span class="token function">qrcode</span><span class="token punctuation">(</span>content<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">QRCode</span><span class="token punctuation">(</span><span class="token punctuation">{</span> content<span class="token punctuation">,</span> padding<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">,</span> width<span class="token operator">:</span><span class="token number">256</span><span class="token punctuation">,</span> height<span class="token operator">:</span><span class="token number">256</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">svg</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">setFormatters</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    qrcode<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Where it will be able to be used within format components, e.g:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>PreviewFormat</span> <span class="token attr-name">:value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>url<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:format</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ method:&#39;qrcode&#39; }<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div><p>That can also be used to decorate properties in C# DTOs with the <a href="/locode/formatters">Format Attribute</a>, e.g:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Format</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;qrcode&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Code <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre></div>`,6),f=a(`<p><code>setFormatters</code> can also be to override the built-in formatting functions by registering alternative implementations for:</p><div class="language-ts"><pre><code><span class="token function">setFormatters</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    currency<span class="token punctuation">,</span>
    bytes<span class="token punctuation">,</span>
    link<span class="token punctuation">,</span>
    linkTel<span class="token punctuation">,</span>
    linkMailTo<span class="token punctuation">,</span>
    icon<span class="token punctuation">,</span>
    iconRounded<span class="token punctuation">,</span>
    attachment<span class="token punctuation">,</span>
    hidden<span class="token punctuation">,</span>
    time<span class="token punctuation">,</span>
    relativeTime<span class="token punctuation">,</span>
    relativeTimeFromMs<span class="token punctuation">,</span>
    formatDate<span class="token punctuation">,</span>
    formatNumber<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div>`,2),b=a(`<p>TypeScript definition of the API surface area and type information for correct usage of <code>useFormatters()</code></p><div class="language-ts"><pre><code><span class="token keyword">class</span> <span class="token class-name">Formats</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> currency<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> bytes<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> link<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> linkTel<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> linkMailTo<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> icon<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> iconRounded<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> attachment<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> time<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> relativeTime<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> relativeTimeFromMs<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> date<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token builtin">number</span><span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
    <span class="token keyword">static</span> hidden<span class="token operator">:</span> FormatInfo<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/** Format any value or object graph */</span>
<span class="token keyword">function</span> <span class="token function">formatValue</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> format<span class="token operator">?</span><span class="token operator">:</span> FormatInfo <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token comment">/** Format number as Currency */</span>
<span class="token keyword">function</span> <span class="token function">currency</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format number in human readable disk size */</span>
<span class="token keyword">function</span> <span class="token function">bytes</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>


<span class="token comment">/** Format URL as &lt;a&gt; link */</span>
<span class="token keyword">function</span> <span class="token function">link</span><span class="token punctuation">(</span>href<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> opt<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    cls<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    target<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    rel<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format email as &lt;a&gt; mailto: link */</span>
<span class="token keyword">function</span> <span class="token function">linkMailTo</span><span class="token punctuation">(</span>email<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> opt<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    subject<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    body<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    cls<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    target<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    rel<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format Phone Number as &lt;a&gt; tel: link */</span>
<span class="token keyword">function</span> <span class="token function">linkTel</span><span class="token punctuation">(</span>tel<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> opt<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    cls<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    target<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    rel<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format Image URL as an Icon */</span>
<span class="token keyword">function</span> <span class="token function">icon</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format Image URL as a full rounded Icon */</span>
<span class="token keyword">function</span> <span class="token function">iconRounded</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format File attachment URL as an Attachment */</span>
<span class="token keyword">function</span> <span class="token function">attachment</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format as empty string */</span>
<span class="token keyword">function</span> <span class="token function">hidden</span><span class="token punctuation">(</span>o<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format duration in time format */</span>
<span class="token keyword">function</span> <span class="token function">time</span><span class="token punctuation">(</span>o<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format Date as Relative Time from now */</span>
<span class="token keyword">function</span> <span class="token function">relativeTime</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> Date <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> rtf<span class="token operator">?</span><span class="token operator">:</span> Intl<span class="token punctuation">.</span>RelativeTimeFormat<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

<span class="token comment">/** Format difference between dates as Relative Time */</span>
<span class="token keyword">function</span> <span class="token function">relativeTimeFromDate</span><span class="token punctuation">(</span>d<span class="token operator">:</span> Date<span class="token punctuation">,</span> from<span class="token operator">?</span><span class="token operator">:</span> Date<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

<span class="token comment">/** Format time in ms as Relative Time from now */</span>
<span class="token keyword">function</span> <span class="token function">relativeTimeFromMs</span><span class="token punctuation">(</span>elapsedMs<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> rtf<span class="token operator">?</span><span class="token operator">:</span> Intl<span class="token punctuation">.</span>RelativeTimeFormat<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

<span class="token comment">/** Format as Date */</span>
<span class="token keyword">function</span> <span class="token function">formatDate</span><span class="token punctuation">(</span>d<span class="token operator">:</span> Date <span class="token operator">|</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format as Number */</span>
<span class="token keyword">function</span> <span class="token function">formatNumber</span><span class="token punctuation">(</span>n<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Set default locale, number and Date formats */</span>
<span class="token keyword">function</span> <span class="token function">setDefaultFormats</span><span class="token punctuation">(</span>newFormat<span class="token operator">:</span> DefaultFormats<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Register additional formatters for use in &lt;PreviewFormat /&gt; */</span>
<span class="token keyword">function</span> <span class="token function">setFormatters</span><span class="token punctuation">(</span>formatters<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span>name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">Function</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>

<span class="token comment">/** Prettify an API JSON Response */</span>
<span class="token keyword">function</span> <span class="token function">indentJson</span><span class="token punctuation">(</span>o<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Truncate text that exceeds maxLength with an ellipsis */</span>
<span class="token keyword">function</span> <span class="token function">truncate</span><span class="token punctuation">(</span>str<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> maxLength<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">/** Format an API Response value */</span>
<span class="token keyword">function</span> <span class="token function">apiValueFmt</span><span class="token punctuation">(</span>o<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">,</span> format<span class="token operator">?</span><span class="token operator">:</span> FormatInfo <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span> attrs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
</code></pre></div>`,2),T='{"title":"Formatting Functions and Methods","description":"","frontmatter":{"title":"Formatting Functions and Methods"},"headers":[],"relativePath":"vue/use-formatters.md"}',g={},I=Object.assign(g,{__name:"use-formatters",setup(y){return(F,_)=>{const o=e("Breadcrumb"),c=e("Breadcrumbs");return l(),r("div",null,[i,n(c,{class:"not-prose my-4 mb-8","home-href":"/vue/"},{default:s(()=>[n(o,{href:"/vue/gallery/"},{default:s(()=>[p("gallery")]),_:1}),n(o,null,{default:s(()=>[p("useFormatters")]),_:1})]),_:1}),k,n(t,{component:"setDefaultFormats"},{default:s(()=>[p("Set global default formats")]),_:1}),m,n(t,{component:"setFormatters"},{default:s(()=>[p("Register custom formatters")]),_:1}),d,n(t,{component:"Overriding built-in formatters"}),f,n(t,{component:"TypeScript Definition"}),b])}}});export{T as __pageData,I as default};
