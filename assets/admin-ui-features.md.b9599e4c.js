import{_ as s}from"./chunks/dashboard.3fe11198.js";import{_ as e}from"./chunks/users.07fe832a.js";import{_ as t,c as o,o as i,a,b as n}from"./app.4c504493.js";var p="/assets/validation.2d111b4b.png";const w='{"title":"Admin UI Features","description":"","frontmatter":{"title":"Admin UI Features"},"headers":[{"level":3,"title":"Disabling the Admin UI","slug":"disabling-the-admin-ui"},{"level":2,"title":"Validation","slug":"validation"},{"level":2,"title":"Admin Users","slug":"admin-users"},{"level":2,"title":"Recommend Admin UI Features","slug":"recommend-admin-ui-features"}],"relativePath":"admin-ui-features.md"}',c={},l=a('<p>The <a href="/admin-ui">Admin UI</a> provides <strong>Admin</strong> Users a UX Friendly UI to access ServiceStack features and summary insights into the APIs hosted by the ServiceStack App, accessible from:</p><h3 class="text-center font-medium text-3xl mb-3">/admin-ui</h3><p>Which after authenticating will take you to the Admin UI dashboard showing the authenticated Admin User details and general API stats:</p><div class="block p-4 rounded shadow"><img src="'+s+`"></div><p>Further Admin UI functionality can be enabled by adding the necessary dependencies and Admin APIs necessary to implement the Admin UI Features.</p><h3 id="disabling-the-admin-ui" tabindex="-1">Disabling the Admin UI <a class="header-anchor" href="#disabling-the-admin-ui" aria-hidden="true">#</a></h3><p>If desired, the <strong>/admin-ui</strong> features can be selectively or entirely disabled using the <code>AdminUi</code> Enum flags:</p><div class="language-csharp"><pre><code><span class="token generic-method"><span class="token function">ConfigurePlugin</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>UiFeature<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>feature <span class="token operator">=&gt;</span> feature<span class="token punctuation">.</span>AdminUi <span class="token operator">=</span> AdminUi<span class="token punctuation">.</span>None<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><h2 id="validation" tabindex="-1">Validation <a class="header-anchor" href="#validation" aria-hidden="true">#</a></h2><p>The Admin Validation feature enables adding dynamically sourced validation rules that can be applied &amp; modified at runtime.</p><p>The most popular <code>IValidationSource</code> for maintaining dynamic validation rules is <code>OrmLiteValidationSource</code> for maintaining them in the App&#39;s registered database&#39;s <code>ValidationRule</code> RDBMS Table:</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token target keyword">assembly</span><span class="token punctuation">:</span> <span class="token class-name">HostingStartup</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">MyApp<span class="token punctuation">.</span>ConfigureValidation</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>

<span class="token keyword">namespace</span> <span class="token namespace">MyApp</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigureValidation</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IHostingStartup</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">// Add support for dynamically generated db rules</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">IWebHostBuilder</span> builder<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> builder
        <span class="token punctuation">.</span><span class="token function">ConfigureServices</span><span class="token punctuation">(</span>services <span class="token operator">=&gt;</span> services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddSingleton</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IValidationSource<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span>c <span class="token operator">=&gt;</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">OrmLiteValidationSource</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IDbConnectionFactory<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">ConfigureAppHost</span><span class="token punctuation">(</span>appHost <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// Create \`ValidationRule\` table if it doesn&#39;t exist in AppHost.Configure() or Modular Startup</span>
            appHost<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Resolve</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>IValidationSource<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">InitSchema</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which can be quickly added to your project with the <a href="/mix-tool">x mix script</a> below:</p>`,13),r=n("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[n("div",{class:"flex-grow bg-gray-800"},[n("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[n("p",null,"x mix validation-source")])]),n("div",{class:"flex"},[n("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[n("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),n("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[n("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),u=a('<p>Which the built-in <a href="/validation.html#validation-feature">Validation Feature</a> detects to register the <code>GetValidationRules</code> and <code>ModifyValidationRules</code> APIs used by the Admin Validation Feature:</p><div class="block p-4 rounded shadow"><img src="'+p+`"></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Refer to <a href="/admin-ui-validation">Admin UI Validation Docs</a> to learn about dynamic DB Validation Rules</p></div><h2 id="admin-users" tabindex="-1">Admin Users <a class="header-anchor" href="#admin-users" aria-hidden="true">#</a></h2><p>User management functionality for creating &amp; modifying users, assigning Roles &amp; Permissions, locking users or updating their passwords can be enabled by registering <code>AdminUsersFeature</code> plugin:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">AdminUsersFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Which enables a familiar UI for searching &amp; managing users:</p><div class="block p-4 rounded shadow"><img src="`+e+'"></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Refer to <a href="/admin-ui">Admin UI User Docs</a> to learn about Admin User features and available customization options</p></div><h2 id="recommend-admin-ui-features" tabindex="-1">Recommend Admin UI Features <a class="header-anchor" href="#recommend-admin-ui-features" aria-hidden="true">#</a></h2><p>The Admin UI was designed with room to grow. You can let us know what features you would find most valuable on our <a href="https://github.com/ServiceStack/Discuss/discussions/2" target="_blank" rel="noopener noreferrer">GitHub Discussions</a>.</p>',11),d=[l,r,u];function m(k,h,g,f,b,v){return i(),o("div",null,d)}var I=t(c,[["render",m]]);export{w as __pageData,I as default};
