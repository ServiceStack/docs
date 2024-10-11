import{_ as a,o as n,c as s,a as t}from"./app.3ff27770.js";const d='{"title":"Razor Notes","description":"","frontmatter":{"slug":"razor-notes","title":"Razor Notes"},"headers":[{"level":2,"title":"VS.NET Intelli-sense for self-hosting projects","slug":"vs-net-intelli-sense-for-self-hosting-projects"},{"level":3,"title":"Intelli-sense for View Models","slug":"intelli-sense-for-view-models"},{"level":3,"title":"Web Configuration for Razor","slug":"web-configuration-for-razor"}],"relativePath":"razor-notes.md"}',e={},o=t(`<h2 id="vs-net-intelli-sense-for-self-hosting-projects" tabindex="-1"><a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> Intelli-sense for self-hosting projects <a class="header-anchor" href="#vs-net-intelli-sense-for-self-hosting-projects" aria-hidden="true">#</a></h2><p><a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> Intelli-sense relies on the <code>Web.config</code> that <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> looks for in the root directory of your host projects. As self-hosting projects are <strong>Console Applications</strong> they instead use <code>App.config</code> instead which is all ServiceStack looks at for configuring Razor.</p><p>Unfortunately as <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a>&#39;s Razor intelli-sense is coupled to <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> MVC, it requires a dummy Web.config in your self-hosted projects which just contains a copy of the Razor configuration in your <strong>App.config</strong> (which was originally populated when adding the <a href="http://www.nuget.org/packages/ServiceStack.Razor" target="_blank" rel="noopener noreferrer">ServiceStack.Razor</a> NuGet Package to your project). The Web.config is otherwise benign and has no other effect other than enabling <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a>&#39;s intelli-sense.</p><h3 id="intelli-sense-for-view-models" tabindex="-1">Intelli-sense for View Models <a class="header-anchor" href="#intelli-sense-for-view-models" aria-hidden="true">#</a></h3><p>The <code>@model T</code> attribute isn&#39;t known to <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> intelli-sense when self-hosting which means you need to its more verbose alias:</p><div class="language-cs"><pre><code>@inherits ViewPage<span class="token operator">&lt;</span>T<span class="token operator">&gt;</span>
</code></pre></div><h3 id="web-configuration-for-razor" tabindex="-1">Web Configuration for Razor <a class="header-anchor" href="#web-configuration-for-razor" aria-hidden="true">#</a></h3><p>All <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> Razor <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> Templates in <a href="https://github.com/ServiceStack/ServiceStackVS" target="_blank" rel="noopener noreferrer">ServiceStackVS</a> uses the optimal <code>Web.config</code> template below <code>Web.config</code> for editing Razor pages without designer errors in <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> 2015:</p><div class="language-xml"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configuration</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>configSections</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>sectionGroup</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>system.web.webPages.razor<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>System.Web.WebPages.Razor.Configuration.RazorWebSectionGroup, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>host<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>System.Web.WebPages.Razor.Configuration.HostSection, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35<span class="token punctuation">&quot;</span></span> <span class="token attr-name">requirePermission</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>section</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>pages<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>System.Web.WebPages.Razor.Configuration.RazorPagesSection, System.Web.WebPages.Razor, Version=3.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35<span class="token punctuation">&quot;</span></span> <span class="token attr-name">requirePermission</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>sectionGroup</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configSections</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>appSettings</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>webPages:Enabled<span class="token punctuation">&quot;</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>false<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>appSettings</span><span class="token punctuation">&gt;</span></span>

    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>system.web.webPages.razor</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>host</span> <span class="token attr-name">factoryType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>System.Web.Mvc.MvcWebRazorHostFactory, System.Web.Mvc, Version=5.0.0.0, Culture=neutral, PublicKeyToken=31BF3856AD364E35<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>pages</span> <span class="token attr-name">pageBaseType</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.Razor.ViewPage<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>namespaces</span><span class="token punctuation">&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>System<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>System.Linq<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.Html<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.Razor<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.Text<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ServiceStack.OrmLite<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ProjectNamespace<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>add</span> <span class="token attr-name">namespace</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>ProjectNamespace.ServiceModel<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>namespaces</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>pages</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>system.web.webPages.razor</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>configuration</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>The <a href="https://www.nuget.org/packages/ServiceStack.Razor" target="_blank" rel="noopener noreferrer">ServiceStack.Razor</a> NuGet package uses the official <a href="https://www.nuget.org/packages/Microsoft.AspNet.Razor/" target="_blank" rel="noopener noreferrer">Microsoft.AspNet.Razor</a> but to minimize errors in <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a>&#39;s Razor editor, the ServiceStack&#39; Razor templates also reference MVC&#39;s <a href="https://www.nuget.org/packages/Microsoft.AspNet.WebPages/" target="_blank" rel="noopener noreferrer">Microsoft.AspNet.WebPages</a> NuGet package which is only used to assist Razor intellisense as ServiceStack doesn&#39;t use or need itself.</p><p>To remove the last designer error <strong>Content pages</strong> can inherit:</p><div class="language-html"><pre><code>@inherits ViewPage
</code></pre></div><p>And Typed <strong>View Pages</strong> can inherit:</p><div class="language-html"><pre><code>@inherits ViewPage<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>TResponse</span><span class="token punctuation">&gt;</span></span>
</code></pre></div><p>Which also doesn&#39;t affect the pages behavior, but can remove the final design-time warning showing up in <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a>&#39;s error list.</p><h4 id="only-configuration-section-used" tabindex="-1">Only configuration section used <a class="header-anchor" href="#only-configuration-section-used" aria-hidden="true">#</a></h4><p>ServiceStack doesn&#39;t use the <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> WebPages implementation itself, the configuration is primarily included to enable <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> intelli-sense and provide a way to configure the default namespaces added to Razor pages.</p><p>This can also be done in code by adding to the <code>Config.RazorNamespaces</code> collection, but adding them to the config section lets <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> knows about them so you can get proper intelli-sense.</p>`,18),p=[o];function c(r,l,u,i,k,g){return n(),s("div",null,p)}var f=a(e,[["render",c]]);export{d as __pageData,f as default};