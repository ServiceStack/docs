import{_ as s}from"./chunks/admin-ui-database.a4fdf62a.js";import{_ as n,a as e,b as t,c as o,d as p,e as i,f as c,g as r}from"./chunks/admin-ui-database-api-url.3185772c.js";import{_ as l,c as u,o as d,b as a,a as m}from"./app.debf38f2.js";const N='{"title":"Database Admin","description":"","frontmatter":{"title":"Database Admin"},"headers":[{"level":2,"title":"Database Admin Customizations","slug":"database-admin-customizations"},{"level":2,"title":"Feedback Welcome","slug":"feedback-welcome"}],"relativePath":"admin-ui-database.md"}',k={},h=a("p",null,"The Database Admin UI lets you quickly browse and navigate your App's configured RDBMS schemas and tables:",-1),g=a("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/NZkeyuc_prg",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1),b=m(`<p>It can be enabled by registering the <code>AdminDatabaseFeature</code> plugin from <a href="https://nuget.org/packages/ServiceStack.Server" target="_blank" rel="noopener noreferrer">ServiceStack.Server</a>:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AdminDatabaseFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Which without any additional configuration your App&#39;s configured databases will be listed on the home page, including their schemas, tables and any registered <a href="/ormlite/getting-started#multiple-database-connections">named connections</a>:</p><p><img src="`+s+'" alt=""></p><p>Selecting a table takes us to a familiar tabular search results grid, similar in appearance and functionality to <a href="/locode/">Locode&#39;s Auto UI</a>:</p><p><img src="'+n+'" alt=""></p><p>Whilst Locode gives you an entire Auto Management UI with all modifications performed through managed <a href="/autoquery">AutoQuery APIs</a>, Database Admin instead focuses on providing a great readonly UX for querying &amp; inspecting your App&#39;s data, starting with multiple views or quickly previewing every row in either <strong>Pretty</strong> JSON format:</p><div class="block flex justify-center items-center"><img class="max-w-screen-md" src="'+e+'"></div><p>Where it will also let you copy every row in JSON format, whilst the <strong>Preview</strong> tab shows a friendlier view of the row&#39;s fields:</p><div class="block flex justify-center items-center"><img class="max-w-screen-md" src="'+t+'"></div><p>The tabular grid is highly personalizable where it lets change the query preferences and display fields for each table, where they&#39;re persisted in localStorage and preserved across browser restarts:</p><div class="block flex justify-center items-center"><img class="max-w-screen-md" src="'+o+'"></div><p>Likewise so are the flexible filtering options allowing any number of filters per column:</p><div class="block flex justify-center items-center"><img class="max-w-screen-md" src="'+p+'"></div><p>The number and type of filters are readily available from the <strong>Filters</strong> dropdown showing all filters grouped under their column name where they&#39;re easily cleared per filter, column or using <strong>Clear All</strong> to clear all filters:</p><p><img src="'+i+'" alt=""></p><p>After you&#39;ve finished customizing your table search view, you can export the data with the <strong>Excel</strong> button to download the results in <a href="/csv-format">CSV Format</a> where it can be opened in your favorite spreadsheet, e.g:</p><p><img src="'+c+'" alt=""></p><p>Alternatively the <strong>Copy URL</strong> button can be used to generate the API data URL to return results in JSON:</p><div class="block flex justify-center items-center"><img class="max-w-screen-md" src="'+r+`"></div><h2 id="database-admin-customizations" tabindex="-1">Database Admin Customizations <a class="header-anchor" href="#database-admin-customizations" aria-hidden="true">#</a></h2><p>Some customizations is available on the <code>AdminDatabaseFeature</code> plugin where you can control the maximum size of resultsets returned and you can use the <code>DatabaseFilter</code> to control which databases and schemas are displayed as well as changing the labels shown by setting their <code>Alias</code> properties, e.g:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AdminDatabaseFeature</span> <span class="token punctuation">{</span>
    QueryLimit <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">,</span>
    DatabasesFilter <span class="token operator">=</span> dbs <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> db <span class="token keyword">in</span> dbs<span class="token punctuation">)</span> 
        <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>db<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;main&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                db<span class="token punctuation">.</span>Alias <span class="token operator">=</span> <span class="token string">&quot;Northwind&quot;</span><span class="token punctuation">;</span>
                db<span class="token punctuation">.</span>Schemas<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Alias <span class="token operator">=</span> <span class="token string">&quot;Traders&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>db<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">&quot;chinook&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                db<span class="token punctuation">.</span>Alias <span class="token operator">=</span> <span class="token string">&quot;Chinook&quot;</span><span class="token punctuation">;</span>
                db<span class="token punctuation">.</span>Schemas<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Alias <span class="token operator">=</span> <span class="token string">&quot;Music&quot;</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="feedback-welcome" tabindex="-1">Feedback Welcome <a class="header-anchor" href="#feedback-welcome" aria-hidden="true">#</a></h2><p>We hope you&#39;ll find the Database Admin feature useful, please let us know what other features you would like in <a href="https://github.com/ServiceStack/Discuss/discussions" target="_blank" rel="noopener noreferrer">ServiceStack/Discuss</a>.</p>`,25),f=[h,g,b];function y(w,_,v,A,S,x){return d(),u("div",null,f)}var T=l(k,[["render",y]]);export{N as __pageData,T as default};
