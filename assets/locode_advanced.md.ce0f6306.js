import{_ as e,a}from"./chunks/locode-tags-filter.487e57fe.js";import{_ as t,c as s,o as n,a as o}from"./app.31c5a555.js";const m='{"title":"Advanced Locode Features","description":"","frontmatter":{"title":"Advanced Locode Features"},"headers":[{"level":3,"title":"Pre-populated Reference Data","slug":"pre-populated-reference-data"},{"level":3,"title":"Support for Large Apps","slug":"support-for-large-apps"},{"level":3,"title":"Localize Metadata","slug":"localize-metadata"}],"relativePath":"locode/advanced.md"}',r={},p=o('<h3 id="pre-populated-reference-data" tabindex="-1">Pre-populated Reference Data <a class="header-anchor" href="#pre-populated-reference-data" aria-hidden="true">#</a></h3><p>As we look for ways to improve productivity in Locode now pre-populates referential data from navigated references, e.g. when creating a new Job Application after navigating to a <a href="https://talent.locode.dev/locode/QueryJob" target="_blank" rel="noopener noreferrer">Job&#39;s Applications in Talent Blazor</a> it uses this context to pre-populate the Job it&#39;s filtered by:</p><p><img src="'+e+'" alt=""></p><h3 id="support-for-large-apps" tabindex="-1">Support for Large Apps <a class="header-anchor" href="#support-for-large-apps" aria-hidden="true">#</a></h3><p>The built-in capability-based UI&#39;s are powered from your APIs metadata, as more of our Customers start to make use of these new UIs in their workflow we&#39;ve had reports from some customers with <a href="https://forums.servicestack.net/t/api-explorer-hangs-on-large-service-layer/10743" target="_blank" rel="noopener noreferrer">Large Apps (550+ APIs)</a> that the UIs started to hang their browsers when it tried to process the <strong>9.5MB</strong> of generated metadata.</p><p>To support Larger Apps we&#39;ve added the ability to restrict the metadata and UIs to only related APIs in <a href="/api-design#group-services-by-tag">user-defined Tag Groups</a> by adding <code>?IncludeTypes</code> to the URL, e.g:</p><p><strong>/ui/?IncludeTypes={tag}</strong></p><p>This follows the Include Types pattern where you can view multiple tag groups with:</p><p><strong>/ui/?IncludeTypes={tag1},{tag2}</strong></p><p>This feature is supported in all built-in UIs and is now integrated on the <strong>/metadata</strong> page where if you select a tag the API Explorer link will be updated with <strong>?IncludeTypes={tag}</strong>:</p><p><img src="'+a+`" alt=""></p><p>Where you&#39;ll now be able to open API Explorer restricted to APIs with that tag without needing to manually craft the URL.</p><h3 id="localize-metadata" tabindex="-1">Localize Metadata <a class="header-anchor" href="#localize-metadata" aria-hidden="true">#</a></h3><p>To assist with with creating Localized Locode UIs, all user-defined descriptive text is now routed through to your AppHost&#39;s <code>ResolveLocalizedString()</code> method which you can use to return a localized string for the current request, e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">ResolveLocalizedString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">,</span> <span class="token class-name">IRequest</span> request <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">return</span> request <span class="token operator">!=</span> <span class="token keyword">null</span> 
        <span class="token punctuation">?</span> <span class="token function">MyResolveLocalizedString</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> request<span class="token punctuation">.</span>Headers<span class="token punctuation">[</span>HttpHeaders<span class="token punctuation">.</span>AcceptLanguage<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">:</span> text<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`,15),l=[p];function c(i,d,u,h,g,f){return n(),s("div",null,l)}var _=t(r,[["render",c]]);export{m as __pageData,_ as default};
