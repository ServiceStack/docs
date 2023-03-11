import{_ as t,D as e,o,c as p,d as a,b as n,e as c,q as l,a as m}from"../app.778d384d.js";const r={},u=a("h2",{id:"formatters",class:"mt-8 mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100"}," Using Formatters ",-1),i=m(`<div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useFormatters <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@servicestack/vue&#39;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span>
    Formats<span class="token punctuation">,</span>             <span class="token comment">// Available format methods to use in &lt;PreviewFormat /&gt;</span>
    formatValue<span class="token punctuation">,</span>         <span class="token comment">// Format any value or object graph</span>
    currency<span class="token punctuation">,</span>            <span class="token comment">// Format number as Currency</span>
    bytes<span class="token punctuation">,</span>               <span class="token comment">// Format number in human readable disk size</span>
    link<span class="token punctuation">,</span>                <span class="token comment">// Format URL as &lt;a&gt; link</span>
    linkTel<span class="token punctuation">,</span>             <span class="token comment">// Format Phone Number as &lt;a&gt; tel: link</span>
    linkMailTo<span class="token punctuation">,</span>          <span class="token comment">// Format email as &lt;a&gt; mailto: link</span>
    icon<span class="token punctuation">,</span>                <span class="token comment">// Format Image URL as an Icon</span>
    iconRounded<span class="token punctuation">,</span>         <span class="token comment">// Format Image URL as a full rounded Icon</span>
    attachment<span class="token punctuation">,</span>          <span class="token comment">// Format File attachment URL as an Attachment</span>
    hidden<span class="token punctuation">,</span>              <span class="token comment">// Format as empty string</span>
    time<span class="token punctuation">,</span>                <span class="token comment">// Format duration in time format</span>
    relativeTime<span class="token punctuation">,</span>        <span class="token comment">// Format Date as Relative Time from now</span>
    relativeTimeFromMs<span class="token punctuation">,</span>  <span class="token comment">// Format time in ms as Relative Time from now</span>
    formatDate<span class="token punctuation">,</span>          <span class="token comment">// Format as Date</span>
    formatNumber<span class="token punctuation">,</span>        <span class="token comment">// Format as Number</span>
<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useFormatters</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre></div><p>Many of these formatting functions return rich HTML markup which will need to be rendered using Vue&#39;s <strong>v-html</strong> directive:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-html</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>formatValue(value)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">&gt;</span></span>
</code></pre></div>`,3);function k(d,f,g,v,F,h){const s=e("TextLink");return o(),p("div",null,[u,a("p",null,[n("Your App and custom templates can also utilize @servicestack/vue's "),c(s,{href:"/vue/use-formatters"},{default:l(()=>[n("built-in formatting functions")]),_:1}),n(" from:")]),i])}var b=t(r,[["render",k]]);export{b as F};
