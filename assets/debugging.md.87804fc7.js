import{_ as e}from"./chunks/startup-errors.a67f3dfa.js";import{_ as n,c as a,o as t,a as s}from"./app.6a524bd5.js";const f='{"title":"Debugging","description":"","frontmatter":{"slug":"debugging","title":"Debugging"},"headers":[{"level":2,"title":"SourceLink Enabled Packages","slug":"sourcelink-enabled-packages"},{"level":3,"title":"All ServiceStack GitHub projects use CI NuGet feed","slug":"all-servicestack-github-projects-use-ci-nuget-feed"},{"level":3,"title":"Linking to Source projects","slug":"linking-to-source-projects"},{"level":3,"title":"Alternatives Debugging Solutions","slug":"alternatives-debugging-solutions"},{"level":2,"title":"Configuration","slug":"configuration"},{"level":3,"title":"DebugMode","slug":"debugmode"},{"level":3,"title":"StrictMode","slug":"strictmode"},{"level":3,"title":"Admin Role","slug":"admin-role"},{"level":3,"title":"AuthSecret","slug":"authsecret"},{"level":2,"title":"Debug Links","slug":"debug-links"},{"level":2,"title":"Startup Errors","slug":"startup-errors"},{"level":2,"title":"Debug Inspector","slug":"debug-inspector"},{"level":2,"title":"Lisp TCP Repl Server","slug":"lisp-tcp-repl-server"},{"level":3,"title":"Request Info","slug":"request-info"},{"level":2,"title":"Plugins","slug":"plugins"},{"level":3,"title":"Request Logger","slug":"request-logger"}],"relativePath":"debugging.md"}',o={},r=s(`<h2 id="sourcelink-enabled-packages" tabindex="-1">SourceLink Enabled Packages <a class="header-anchor" href="#sourcelink-enabled-packages" aria-hidden="true">#</a></h2><p>To maximize the debuggability of ServiceStack packages all ServiceStack projects utilize <strong>MSBuild generated NuGet packages</strong> where all packages are embed <strong>pdb symbols</strong> and are configured with <a href="https://github.com/dotnet/sourcelink/" target="_blank" rel="noopener noreferrer">support for SourceLink</a> to improve the debugging experience of ServiceStack Apps as source files can be downloaded on-the-fly from GitHub as you debug.</p><p>Scott Hanselman has written a <a href="https://www.hanselman.com/blog/ExploringNETCoresSourceLinkSteppingIntoTheSourceCodeOfNuGetPackagesYouDontOwn.aspx" target="_blank" rel="noopener noreferrer">nice post on Source Link</a> and how it can be enabled inside <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> by turning on <strong>Enable source link support</strong>:</p><p><a href="https://www.hanselman.com/blog/ExploringNETCoresSourceLinkSteppingIntoTheSourceCodeOfNuGetPackagesYouDontOwn.aspx" target="_blank" rel="noopener noreferrer"><img src="https://www.hanselman.com/blog/content/binary/Windows-Live-Writer/7e5fb7b6dad8_140AA/image_0c73cb8d-bd5a-406e-a51d-a2eb4af12117.png" alt=""></a></p><p>When enabled it should let you debug into the ServiceStack framework implementation, downloading the correct source files version from GitHub as and when needed.</p><h3 id="all-servicestack-github-projects-use-ci-nuget-feed" tabindex="-1">All ServiceStack GitHub projects use CI NuGet feed <a class="header-anchor" href="#all-servicestack-github-projects-use-ci-nuget-feed" aria-hidden="true">#</a></h3><p>In addition to using MSBuild generated packages all projects also utilize CI NuGet package feeds for external dependencies instead of copying .dll&#39;s in <code>/lib</code> folders. As a consequence you&#39;ll no longer have to build external ServiceStack GitHub projects or use GitHub published releases, as now the <strong>master</strong> repo of all GitHub projects can be built from a clean checkout at anytime.</p><p>The pre-release packages are still published using the <strong>same version number</strong> so if you get a build error from having a cached stale package you&#39;ll need to <a href="/myget#redownloading-myget-packages">clear your local packages cache</a> to download the latest build packages from the CI NuGet packages feed.</p><h3 id="linking-to-source-projects" tabindex="-1">Linking to Source projects <a class="header-anchor" href="#linking-to-source-projects" aria-hidden="true">#</a></h3><p>In order to get the best source-based development experience using the latest version of ServiceStack in your Projects, clone the ServiceStack Repos you want to use:</p><ul><li><a href="https://github.com/ServiceStack/ServiceStack" target="_blank" rel="noopener noreferrer">ServiceStack/ServiceStack</a></li><li><a href="https://github.com/ServiceStack/ServiceStack.Text" target="_blank" rel="noopener noreferrer">ServiceStack/ServiceStack.Text</a></li><li><a href="https://github.com/ServiceStack/ServiceStack.Text" target="_blank" rel="noopener noreferrer">ServiceStack/ServiceStack.Redis</a></li><li><a href="https://github.com/ServiceStack/ServiceStack.OrmLite" target="_blank" rel="noopener noreferrer">ServiceStack/ServiceStack.OrmLite</a></li><li><a href="https://github.com/ServiceStack/ServiceStack.Aws" target="_blank" rel="noopener noreferrer">ServiceStack/ServiceStack.Aws</a></li><li><a href="https://github.com/ServiceStack/ServiceStack.Azure" target="_blank" rel="noopener noreferrer">ServiceStack/ServiceStack.Azure</a></li></ul><p>Then reference the <code>*.Source.csproj</code> of each project you want to reference in your solution.</p><p>This approach is used in our <a href="https://github.com/NetCoreApps/Test/blob/master/src/Test/Test.csproj" target="_blank" rel="noopener noreferrer">Test.csproj</a> allowing us to debug directly into ServiceStack library source code just like any other project reference in our solution.</p><h3 id="alternatives-debugging-solutions" tabindex="-1">Alternatives Debugging Solutions <a class="header-anchor" href="#alternatives-debugging-solutions" aria-hidden="true">#</a></h3><p><a href="https://oren.codes/2015/09/23/enabling-source-code-debugging-for-your-nuget-packages-with-gitlink/" target="_blank" rel="noopener noreferrer">GitLink</a> is another solution for debugging source code in NuGet packages.</p><p>Otherwise the most reliable solution for debugging ServiceStack source code is to <a href="https://github.com/ServiceStack/ServiceStack/releases" target="_blank" rel="noopener noreferrer">download the source code for the release</a> on Github you want to debug, build the <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> Solution locally using <strong>Debug</strong> configuration then change your ServiceStack references to use your local <strong>.dll</strong>.</p><h2 id="configuration" tabindex="-1">Configuration <a class="header-anchor" href="#configuration" aria-hidden="true">#</a></h2><h3 id="debugmode" tabindex="-1">DebugMode <a class="header-anchor" href="#debugmode" aria-hidden="true">#</a></h3><p>ServiceStack allows additional debug information when in <strong>DebugMode</strong>, which is automatically set by default in <strong>Debug</strong> builds or explicitly with:</p><div class="language-csharp"><pre><code><span class="token function">SetConfig</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">HostConfig</span> <span class="token punctuation">{</span> DebugMode <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>In addition, users with the <strong>Admin</strong> role or Requests with an <strong>AuthSecret</strong> can also view Debug Info in production.</p><h3 id="strictmode" tabindex="-1">StrictMode <a class="header-anchor" href="#strictmode" aria-hidden="true">#</a></h3><p>You can configure Strict Mode in ServiceStack to enforce stricter behavior and have it throw Exceptions when it sees certain failure conditions. To enable Strict Mode across all libraries use:</p><div class="language-csharp"><pre><code>Env<span class="token punctuation">.</span>StrictMode <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre></div><p>Otherwise to just enable StrictMode for ServiceStack:</p><div class="language-csharp"><pre><code><span class="token function">SetConfig</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">HostConfig</span> <span class="token punctuation">{</span>
    StrictMode <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>When enabled ServiceStack will perform runtime checks to catch invalid state, currently:</p><ul><li>Checks if Services return Value Types</li><li>Checks if UserSession has circular dependencies</li><li>Fails fast for exceptions on Startup</li></ul><h3 id="admin-role" tabindex="-1">Admin Role <a class="header-anchor" href="#admin-role" aria-hidden="true">#</a></h3><p>Users in the <code>Admin</code> role have super-user access giving them access to any services or plugins protected with Roles and Permissions.</p><h3 id="authsecret" tabindex="-1">AuthSecret <a class="header-anchor" href="#authsecret" aria-hidden="true">#</a></h3><p>You can use <strong>Config.AdminAuthSecret</strong> to specify a special string to give you admin access without having to login by adding <code>?authsecret=xxx</code> to the query string, e.g:</p><div class="language-csharp"><pre><code><span class="token function">SetConfig</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">HostConfig</span> <span class="token punctuation">{</span> AdminAuthSecret <span class="token operator">=</span> <span class="token string">&quot;secretz&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>By-pass protected services using query string:</p><div class="language-"><pre><code>/my-service?authsecret=secretz
</code></pre></div><p>Or if using a Service Client it can be sent in the <code>authsecret</code> Cookie or <code>X-Param-Override-authsecret</code> HTTP Header.</p><h2 id="debug-links" tabindex="-1">Debug Links <a class="header-anchor" href="#debug-links" aria-hidden="true">#</a></h2><p>To provide better visibility to the hidden functionality in ServiceStack we&#39;ve added <strong>Debug Info</strong> links section to the <code>/metadata</code> page which add links to any Plugins with Web UI&#39;s, e.g:</p><p><img src="http://i.imgur.com/2Hf3P9L.png" alt=""></p><p>The <strong>Debug Links</strong> section is only available in <strong>DebugMode</strong>.</p><p>You can add links to your own <a href="/plugins">Plugins</a> in the metadata pages with:</p><div class="language-csharp"><pre><code>appHost<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetPlugin</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MetadataFeature<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddPluginLink</span><span class="token punctuation">(</span><span class="token string">&quot;swagger-ui/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Swagger UI&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

appHost<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetPlugin</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>MetadataFeature<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">AddDebugLink</span><span class="token punctuation">(</span><span class="token string">&quot;?debug=requestinfo&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Request Info&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p><code>AddPluginLink</code> adds links under the <strong>Plugin Links</strong> section and should be used if your plugin is publicly visible, otherwise use <code>AddDebugLink</code> for plugins only available during debugging or development.</p><h2 id="startup-errors" tabindex="-1">Startup Errors <a class="header-anchor" href="#startup-errors" aria-hidden="true">#</a></h2><p>When plugins are registered their Exceptions are swallowed and captured in <code>AppHost.StartupErrors</code> so an individual Rogue plugin won&#39;t prevent your ServiceStack AppHost from starting. But when a plugin doesn&#39;t work properly it can be hard to determine the cause was due to an Exception occuring at Startup.</p><p>Alternatively enable <a href="#strictmode">StrictMode</a> to have StartUp Exceptions thrown on StartUp.</p><h2 id="debug-inspector" tabindex="-1">Debug Inspector <a class="header-anchor" href="#debug-inspector" aria-hidden="true">#</a></h2><p><a href="https://sharpscript.net/metadata/debug" target="_blank" rel="noopener noreferrer"><img src="https://sharpscript.net/assets/img/screenshots/metadata-debug.png" alt=""></a></p><p>All ServiceStack Apps have access to rich introspection and queryability for inspecting remote ServiceStack instances with the new <a href="https://sharpscript.net/docs/servicestack-scripts#debug-template" target="_blank" rel="noopener noreferrer">Debug Inspector</a>.</p><p>The Debug Template is a Service in <code>SharpPagesFeature</code> that&#39;s pre-registered in <a href="#debugmode">DebugMode</a>. The Service can also be available when not in <strong>DebugMode</strong> by enabling it with:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SharpPagesFeature</span> <span class="token punctuation">{</span> 
    MetadataDebugAdminRole <span class="token operator">=</span> RoleNames<span class="token punctuation">.</span>Admin<span class="token punctuation">,</span>        <span class="token comment">// Only allow Admin users</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>This registers the Service but limits it to Users with the <code>Admin</code> role, alternatively you configure an <a href="https://docs.servicestack.net/debugging#authsecret" target="_blank" rel="noopener noreferrer">Admin Secret</a>:</p><div class="language-csharp"><pre><code><span class="token function">SetConfig</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">HostConfig</span> <span class="token punctuation">{</span> AdminAuthSecret <span class="token operator">=</span> <span class="token string">&quot;secret&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Which will let you access it by appending the authsecret to the querystring: <code>/metadata/debug?authsecret=secret</code></p><p>Alternatively if preferred you can make the Debug Template Service available to:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">SharpPagesFeature</span> <span class="token punctuation">{</span> 
    MetadataDebugAdminRole <span class="token operator">=</span> RoleNames<span class="token punctuation">.</span>AllowAnyUser<span class="token punctuation">,</span>  <span class="token comment">// Allow Authenticated Users</span>
    MetadataDebugAdminRole <span class="token operator">=</span> RoleNames<span class="token punctuation">.</span>AllowAnon<span class="token punctuation">,</span>     <span class="token comment">// Allow anyone</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre></div><p>Which is the configuration that allows <a href="https://sharpscript.net/metadata/debug" target="_blank" rel="noopener noreferrer">sharpscript.net/metadata/debug</a> to be accessible to anyone.</p><h2 id="lisp-tcp-repl-server" tabindex="-1">Lisp TCP Repl Server <a class="header-anchor" href="#lisp-tcp-repl-server" aria-hidden="true">#</a></h2><p>A even greater way to get deeper insights into a Live running remote ServiceStack App is to open a <a href="/lisp-tcp-repl-server">Lisp TCP REPL Server</a> into the server to open a <strong>&quot;programmable gateway&quot;</strong> into any ServiceStack App where you&#39;re able to perform live queries, access IOC dependencies, invoke internal Server functions and query the state of a running Server to provide invaluable insight when diagnosing issues on a remote server.</p><div class="info custom-block"><p class="custom-block-title">YouTube</p><p><a href="https://youtu.be/HO523cFkDfk" target="_blank" rel="noopener noreferrer">youtu.be/HO523cFkDfk</a></p></div><p><a href="https://youtu.be/HO523cFkDfk" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/sharpscript/lisp-tcp-repl.gif" alt=""></a></p><h3 id="request-info" tabindex="-1">Request Info <a class="header-anchor" href="#request-info" aria-hidden="true">#</a></h3><p>ServiceStack&#39;s Request Info feature is useful for debugging requests. Just add <strong>?debug=requestinfo</strong> in your <code>/pathinfo</code> and ServiceStack will return a dump of all the HTTP Request parameters to help with debugging interoperability issues. The RequestInfoFeature is only enabled in <a href="/debugging#debugmode">DebugMode</a>.</p><p>To better highlight the presence of Startup Errors a red warning banner will also appear in <code>/metadata</code> pages when in <a href="/debugging#debugmode">DebugMode</a>, e.g:</p><p><img src="`+e+`" alt=""></p><p>The number of Startup Errors is also added to the <code>X-Startup-Errors: n</code> Global HTTP Header so you&#39;ll be able to notice it when debugging HTTP Traffic.</p><p>If you prefer that any Plugin Exception is immediately visible you can register this callback in your <code>AppHost</code> to throw a YSOD with your first Startup Error:</p><div class="language-csharp"><pre><code>AfterInitCallbacks<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>host <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> appHost <span class="token operator">=</span> <span class="token punctuation">(</span>ServiceStackHost<span class="token punctuation">)</span>host<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>appHost<span class="token punctuation">.</span>StartUpErrors<span class="token punctuation">.</span>Count <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Exception</span><span class="token punctuation">(</span>appHost<span class="token punctuation">.</span>StartUpErrors<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="plugins" tabindex="-1">Plugins <a class="header-anchor" href="#plugins" aria-hidden="true">#</a></h2><p>There are a number of plugins that can help with debugging:</p><h3 id="request-logger" tabindex="-1"><a href="/request-logger">Request Logger</a> <a class="header-anchor" href="#request-logger" aria-hidden="true">#</a></h3><p>Add an In-Memory <code>IRequestLogger</code> and service with the default route at <code>/requestlogs</code> which maintains a live log of the most recent requests (and their responses). Supports multiple config options incl. Rolling-size capacity, error and session tracking, hidden request bodies for sensitive services, etc.</p><div class="language-cs"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">RequestLogsFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The <code>IRequestLogger</code> is a great way to introspect and analyze your service requests in real-time. Here&#39;s a screenshot from the <a href="http://bootstrapapi.servicestack.net" target="_blank" rel="noopener noreferrer">http://bootstrapapi.servicestack.net</a> website:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/request-logs-01.png" alt=""></p><p>It supports multiple queryString filters and switches so you filter out related requests for better analysis and debuggability:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/wikis/request-logs-02.png" alt=""></p><p>The <a href="https://github.com/ServiceStack/ServiceStack/blob/master/src/ServiceStack/Admin/RequestLogsService.cs" target="_blank" rel="noopener noreferrer">RequestLogsService</a> is just a simple C# service under-the-hood but is a good example of how a little bit of code can provide a lot of value in ServiceStack&#39;s by leveraging its generic, built-in features.</p>`,78),i=[r];function c(p,l,u,d,g,h){return t(),a("div",null,i)}var S=n(o,[["render",c]]);export{f as __pageData,S as default};
