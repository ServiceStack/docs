import{_ as e,C as t,o as a,c as s,e as o,a as p}from"./app.7f89ce07.js";const f=`{"title":"ServiceStack's .NET Core Utility Belt","description":"","frontmatter":{"slug":"web-tool","title":"ServiceStack's .NET Core Utility Belt"},"headers":[{"level":3,"title":"Add/Update ServiceStack References","slug":"add-update-servicestack-references"},{"level":3,"title":"Integrate with Visual Studio","slug":"integrate-with-visual-studio"},{"level":3,"title":"Integrate with Rider","slug":"integrate-with-rider"},{"level":3,"title":"Create new Project Templates","slug":"create-new-project-templates"},{"level":3,"title":"Mix Features into existing ASP.NET Core Apps","slug":"mix-features-into-existing-asp-net-core-apps"},{"level":3,"title":"Lisp REPL","slug":"lisp-repl"},{"level":3,"title":"Annotated REPL Walk through","slug":"annotated-repl-walk-through"}],"relativePath":"web-tool.md"}`,r={},c=p(`<p>Our <code>web</code> (<code>x</code> and <code>app</code>) .NET Core tools are a versatile invaluable companion for all ServiceStack developers where it&#39;s jam packed with functionality to power a number of exciting scenarios where it serves as a <a href="https://sharpscript.net/docs/sharp-apps" target="_blank" rel="noopener noreferrer">Sharp App</a> delivery platform where they can be run as a .NET Core Windows Desktop App with <code>app</code> or as a cross-platform Web App launcher using <code>web</code> and we&#39;ve already how it&#39;s now a <a href="https://sharpscript.net/docs/sharp-scripts" target="_blank" rel="noopener noreferrer"><code>#Script</code> runner</a> with <code>web run</code> and into a <a href="https://sharpscript.net/docs/sharp-scripts#live-script-with-web-watch" target="_blank" rel="noopener noreferrer">Live <code>#Script</code> playground</a> with <code>web watch</code>.</p><p>They also contain all features from our <a href="https://github.com/ServiceStack/servicestack-cli" target="_blank" rel="noopener noreferrer">@servicestack/cli</a> npm tools so you&#39;ll <strong>no longer need npm</strong> to <a href="/web-new">create ServiceStack projects</a> or <a href="/add-servicestack-reference">Add/Update ServiceStack References</a>.</p><p>To access available features, install with:</p><pre><code>$ dotnet tool install --global web 
</code></pre><p>Or if you had a previous version installed, update with:</p><pre><code>$ dotnet tool update -g web
</code></pre><blockquote><p>The Windows-only <code>app</code> tool has better integration with Windows that can power <a href="/netcore-windows-desktop">.NET Core Windows Desktop Apps</a>.</p></blockquote><p>If you have <strong>.NET 6.0 LTS</strong> installed use the <code>x</code> dotnet tool:</p><pre><code>$ dotnet tool install --global x
</code></pre><blockquote><p>All <code>web</code>, <code>x</code> and <code>app</code> have equivalent base functionality, whilst <code>app</code> has superset features for richer Windows integration</p></blockquote><h4 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h4><p>Then run <code>web</code> without any arguments to view Usage:</p><pre><code>$ web
</code></pre><div class="language-"><pre><code>Usage:

  web new                     List available Project Templates
  web new &lt;template&gt; &lt;name&gt;   Create New Project From Template

  web &lt;lang&gt;                  Update all ServiceStack References in directory (recursive)
  web &lt;file&gt;                  Update existing ServiceStack Reference (e.g. dtos.cs)   
  web &lt;lang&gt;     &lt;url&gt; &lt;file&gt; Add ServiceStack Reference and save to file name        
  web csharp     &lt;url&gt;        Add C# ServiceStack Reference            (Alias &#39;cs&#39;)   
  web typescript &lt;url&gt;        Add TypeScript ServiceStack Reference    (Alias &#39;ts&#39;)   
  web swift      &lt;url&gt;        Add Swift ServiceStack Reference         (Alias &#39;sw&#39;)   
  web java       &lt;url&gt;        Add Java ServiceStack Reference          (Alias &#39;ja&#39;)   
  web kotlin     &lt;url&gt;        Add Kotlin ServiceStack Reference        (Alias &#39;kt&#39;)   
  web dart       &lt;url&gt;        Add Dart ServiceStack Reference          (Alias &#39;da&#39;)   
  web fsharp     &lt;url&gt;        Add F# ServiceStack Reference            (Alias &#39;fs&#39;)   
  web vbnet      &lt;url&gt;        Add VB.NET ServiceStack Reference        (Alias &#39;vb&#39;)   
  web tsd        &lt;url&gt;        Add TypeScript Definition ServiceStack Reference        

  web proto &lt;url&gt;             Add gRPC .proto ServiceStack Reference
  web proto &lt;url&gt; &lt;name&gt;      Add gRPC .proto and save to &lt;name&gt;.services.proto       
  web proto                   Update all gRPC *.services.proto ServiceStack References
  web proto-langs             Display list of gRPC supported languages
  web proto-&lt;lang&gt; &lt;url&gt;      Add gRPC .proto and generate language    (-out &lt;dir&gt;)   
  web proto-&lt;lang&gt; &lt;file|dir&gt; Update gRPC .proto and re-gen language   (-out &lt;dir&gt;)
  web proto-&lt;lang&gt;            Update all gRPC .proto&#39;s and re-gen lang (-out &lt;dir&gt;)

  web mix                     Show available gists to mixin            (Alias &#39;+&#39;)
  web mix &lt;name&gt;              Write gist files locally, e.g:           (Alias +init)
  web mix init                Create empty .NET Core ServiceStack App
  web mix [tag]               Search available gists
  web mix &lt;gist-url&gt;          Write all Gist text files to current directory
  web gist &lt;gist-id&gt;          Write all Gist text files to current directory

  web run &lt;name&gt;.ss           Run #Script within context of AppHost   (or &lt;name&gt;.html)
  web watch &lt;name&gt;.ss         Watch #Script within context of AppHost (or &lt;name&gt;.html)
                              Language File Extensions:
                                   .ss - #Script source file
                                   .sc - #Script \`code\` source file
                                   .l  - #Script \`lisp\` source file
  web lisp                    Start Lisp REPL

  web open                    List of available Sharp Apps
  web open &lt;app&gt;              Install and run Sharp App

  web run                     Run Sharp App in current directory
  web run &lt;name&gt;              Run Installed Sharp App
  web run path/app.settings   Run Sharp App at directory containing specified app.settings

  web install                 List available Sharp Apps to install     (Alias &#39;l&#39;)
  web install &lt;app&gt;           Install Sharp App                        (Alias &#39;i&#39;)

  web uninstall               List Installed Sharp Apps
  web uninstall &lt;app&gt;         Uninstall Sharp App

  web publish                 Publish Sharp App to Gist (requires token)

  web shortcut                Create Shortcut for Sharp App
  web shortcut &lt;name&gt;.dll     Create Shortcut for .NET Core App

  web get &lt;url&gt;               Download remote file                     (-out &lt;file|dir&gt;)

  dotnet tool update -g web   Update to latest version

Options:
    -h, --help, ?             Print this message
    -v, --version             Print this version
    -d, --debug               Run in Debug mode for Development
    -r, --release             Run in Release mode for Production
    -s, --source              Change GitHub Source for App Directory
    -f, --force               Quiet mode, always approve, never prompt
        --token               Use GitHub Auth Token
        --clean               Delete downloaded caches
        --verbose             Display verbose logging
        --ignore-ssl-errors   Ignore SSL Errors
</code></pre></div><h3 id="add-update-servicestack-references" tabindex="-1">Add/Update ServiceStack References <a class="header-anchor" href="#add-update-servicestack-references" aria-hidden="true">#</a></h3><p>This shows us we can Add a ServiceStack Reference with <code>web &lt;lang&gt; &lt;baseurl&gt;</code> which will let us create a TypeScript Reference to the new <a href="/world-validation">World Validation</a> App using its <code>ts</code> file extension alias:</p><pre><code>$ web ts http://validation.web-app.io

Saved to: dtos.ts
</code></pre><p>Or create a C# ServiceStack Reference with:</p><pre><code>$ web cs http://validation.web-app.io

Saved to: dtos.cs
</code></pre><p>To update run <code>web &lt;lang&gt;</code> which will recursively update all existing ServiceStack References:</p><pre><code>$ web ts

Updated: dtos.ts
</code></pre><h3 id="integrate-with-visual-studio" tabindex="-1">Integrate with Visual Studio <a class="header-anchor" href="#integrate-with-visual-studio" aria-hidden="true">#</a></h3><p>You can also easily integrate this within your <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> dev workflows by <a href="https://docs.microsoft.com/en-us/visualstudio/ide/managing-external-tools?view=vs-2019" target="_blank" rel="noopener noreferrer">adding it as an External Tool</a> in the <strong>External Tools</strong> dialog box by choosing <code>Tools &gt; External Tools</code>:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/tool-ts-reference.png" alt=""></p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td>Title</td><td>Update TypeScript &amp;Reference</td></tr><tr><td>Command</td><td>web.exe</td></tr><tr><td>Arguments</td><td>ts</td></tr><tr><td>Initial directory</td><td>$(ProjectDir)</td></tr><tr><td></td><td></td></tr></tbody></table><p>Which will then let you update all your <code>*dtos.ts</code> TypeScript References in your project by clicking on <code>Tools &gt; Update TypeScript Reference</code> or using the <code>ALT+T R</code> keyboard shortcut.</p><p>If you wanted to Update your <code>*dtos.cs</code> <strong>C# ServiceStack References</strong> instead, just change Arguments to <code>cs</code>:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/tool-cs-reference.png" alt=""></p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><strong>Title</strong></td><td>Update C# &amp;Reference</td></tr><tr><td><strong>Command</strong></td><td>web.exe</td></tr><tr><td><strong>Arguments</strong></td><td>cs</td></tr><tr><td><strong>Initial directory</strong></td><td>$(ProjectDir)</td></tr><tr><td></td><td></td></tr></tbody></table><p>Refer to the <a href="#usage">web usage output</a> above for the arguments or aliases for all other supported languages.</p><h3 id="integrate-with-rider" tabindex="-1">Integrate with Rider <a class="header-anchor" href="#integrate-with-rider" aria-hidden="true">#</a></h3><p>Just like with <a href="http://VS.NET" target="_blank" rel="noopener noreferrer">VS.NET</a> above you can <a href="https://www.jetbrains.com/help/rider/Settings_Tools_External_Tools.html" target="_blank" rel="noopener noreferrer">add an External Tool</a> in <a href="https://www.jetbrains.com/rider/" target="_blank" rel="noopener noreferrer">JetBrains Rider</a> by opening the Settings dialog with <code>CTRL+ALT+S</code> then searching for <code>external tools</code> under the <strong>Tools</strong> category:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/rider-tool-ts-reference.png" alt=""></p><table><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><strong>Name</strong></td><td>Update TypeScript Reference</td></tr><tr><td><strong>Command</strong></td><td>web.exe</td></tr><tr><td><strong>Arguments</strong></td><td>ts</td></tr><tr><td><strong>Working directory</strong></td><td>$FileParentDir$</td></tr><tr><td></td><td></td></tr></tbody></table><p>Now you can update your <code>*dtos.ts</code> TypeScript References in your project by clicking on <code>External Tools &gt; Update TypeScript Reference</code> in the right-click context menu:</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/servicestack-reference/rider-tool-ts-reference-run.png" alt=""></p><p>If you&#39;re updating references frequently you can save time by <a href="https://www.jetbrains.com/help/rider/Configuring_Keyboard_and_Mouse_Shortcuts.html" target="_blank" rel="noopener noreferrer">assigning it a keyboard shortcut</a>.</p><h3 id="create-new-project-templates" tabindex="-1">Create new Project Templates <a class="header-anchor" href="#create-new-project-templates" aria-hidden="true">#</a></h3><p>See <a href="/web-new">web new</a> for available Project Templates you can create with:</p><pre><code>$ web new
</code></pre><h3 id="mix-features-into-existing-asp-net-core-apps" tabindex="-1">Mix Features into existing <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> Core Apps <a class="header-anchor" href="#mix-features-into-existing-asp-net-core-apps" aria-hidden="true">#</a></h3><p>The <code>web</code> dotnet tool is a <a href="/dotnet-tool">versatile utility belt packed with a number of features</a> to simplify discovering, installing, running and deploying .NET Core Apps. You can view the full list of supported commands by running <code>web ?</code>, e.g. another useful command is using <a href="/mix-tool"><code>web mix</code></a> for generating pre-set templates:</p><div class="language-"><pre><code>web mix                     Show available gists to mixin         (Alias &#39;+&#39;)
web mix &lt;name&gt;              Write gist files locally, e.g:        (Alias +init)
web mix init                Create empty .NET Core ServiceStack App
web mix [tag]               Search available gists
web gist &lt;gist-id&gt;          Write all Gist text files to current directory
</code></pre></div><p>View available gists with:</p><pre><code>$ web mix
</code></pre><p>Where you can use <code>web mix nginx</code> to generate a common nginx template configuration for reverse proxying .NET Core Apps, making configuring <a href="/netcore-deploy-rsync">Linux deployment servers for your .NET Core Apps</a> less tedious.</p><p>In addition to the pre-set templates, you can create your own <a href="https://gist.github.com" target="_blank" rel="noopener noreferrer">public GitHub gist</a> with any number of different files customized for your Environment that anyone can write to their current directory with <strong>the gist id</strong> or <strong>gist URL</strong>:</p><pre><code>$ web gist &lt;gist-id&gt;
</code></pre><h3 id="lisp-repl" tabindex="-1">Lisp REPL <a class="header-anchor" href="#lisp-repl" aria-hidden="true">#</a></h3><p>Lisp&#39;s dynamism and extensibility makes it particularly well suited for explanatory programming whose access via a REPL is available <code>web</code> and <code>app</code> dotnet tools.</p><p>The quick demo below shows the kind of exploratory programming available where you can query the <code>scriptMethods</code> available, query an objects <code>props</code>, query the Lisp interpreter&#39;s global <code>symbols</code> table containing all its global state including all defined lisp functions, macros and variables:</p><blockquote><p>YouTube: <a href="https://youtu.be/RR7yk6ReNnQ" target="_blank" rel="noopener noreferrer">youtu.be/RR7yk6ReNnQ</a></p></blockquote><p><a href="https://youtu.be/RR7yk6ReNnQ" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/sharpscript/web-lisp.gif" alt=""></a></p><h3 id="annotated-repl-walk-through" tabindex="-1">Annotated REPL Walk through <a class="header-anchor" href="#annotated-repl-walk-through" aria-hidden="true">#</a></h3><p>Here&#39;s an annotated version of the demo below which explains what each of the different expressions is doing.</p><p>Just like <a href="https://sharpscript.net/docs/sharp-scripts" target="_blank" rel="noopener noreferrer">Sharp Scripts</a> and <a href="https://sharpscript.net/docs/sharp-apps" target="_blank" rel="noopener noreferrer">Sharp Apps</a> the Lisp REPL runs within the <a href="https://sharpscript.net/docs/script-pages" target="_blank" rel="noopener noreferrer">#Script Pages</a> ScriptContext <a href="https://sharpscript.net/docs/sandbox" target="_blank" rel="noopener noreferrer">sandbox</a> that when run from a Sharp App folder, starts a .NET Core App Server that simulates a fully configured .NET Core App. In this case it&#39;s running in the <a href="https://github.com/sharp-apps/redis" target="_blank" rel="noopener noreferrer">redis Sharp App</a> directory where it was able to access its static web assets as well as its redis-server connection configured in its <a href="https://github.com/sharp-apps/redis/blob/master/app.settings" target="_blank" rel="noopener noreferrer">app.settings</a>.</p><div class="language-lisp"><pre><code><span class="token comment">; quick lisp test!</span>
<span class="token punctuation">(</span><span class="token car">+</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span><span class="token punctuation">)</span>

<span class="token comment">; List of ScriptMethodInfo that the ScriptContext running this Lisp Interpreter has access to</span>
scriptMethods

<span class="token comment">; first script method</span>
<span class="token punctuation">(</span>:0 scriptMethods<span class="token punctuation">)</span>

<span class="token comment">; show public properties of ScriptMethodInfo </span>
<span class="token punctuation">(</span><span class="token car">props</span> <span class="token punctuation">(</span>:0 scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; show 1 property per line</span>
<span class="token punctuation">(</span><span class="token car">joinln</span> <span class="token punctuation">(</span><span class="token car">props</span> <span class="token punctuation">(</span>:0 scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; show both Property Type and Name</span>
<span class="token punctuation">(</span><span class="token car">joinln</span> <span class="token punctuation">(</span><span class="token car">propTypes</span> <span class="token punctuation">(</span>:0 scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; view the Names of all avaialble script methods</span>
<span class="token punctuation">(</span><span class="token car">joinln</span> <span class="token punctuation">(</span><span class="token car">map</span> .Name scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; view all script methods starting with &#39;a&#39;</span>
<span class="token punctuation">(</span><span class="token car">globln</span> <span class="token string">&quot;a*&quot;</span> <span class="token punctuation">(</span><span class="token car">map</span> .Name scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; view all script methods starting with &#39;env&#39;</span>
<span class="token punctuation">(</span><span class="token car">globln</span> <span class="token string">&quot;env*&quot;</span> <span class="token punctuation">(</span><span class="token car">map</span> .Name scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; print environment info about this machine seperated by spaces</span>
<span class="token punctuation">(</span><span class="token car">printlns</span> envOSVersion envMachineName envFrameworkDescription envLogicalDrives<span class="token punctuation">)</span>

<span class="token comment">; expand logical drives</span>
<span class="token punctuation">(</span><span class="token car">printlns</span> envOSVersion envMachineName envFrameworkDescription <span class="token string">&quot;<span class="token argument">-</span> drives:&quot;</span> <span class="token punctuation">(</span><span class="token car">join</span> envLogicalDrives <span class="token string">&quot; &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; view all current global symbols defined in this Lisp interpreter</span>
symbols

<span class="token comment">; view all symbols starting with &#39;c&#39;</span>
<span class="token punctuation">(</span><span class="token car">globln</span> <span class="token string">&quot;c*&quot;</span> symbols<span class="token punctuation">)</span>

<span class="token comment">; see how many symbols are defined in this interpreter</span>
<span class="token punctuation">(</span><span class="token car">count</span> symbols<span class="token punctuation">)</span>

<span class="token comment">; see how many script methods there are available</span>
<span class="token punctuation">(</span><span class="token car">count</span> scriptMethods<span class="token punctuation">)</span>

<span class="token comment">; view the method signature for all script methods starting with &#39;all&#39;</span>
<span class="token punctuation">(</span><span class="token car">globln</span> <span class="token string">&quot;all*&quot;</span> <span class="token punctuation">(</span><span class="token car">map</span> .Signature scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; count all files accessible from the configured ScriptContext</span>
<span class="token punctuation">(</span><span class="token car">count</span> allFiles<span class="token punctuation">)</span>

<span class="token comment">; view the public properties of the first IVirtualFile</span>
<span class="token punctuation">(</span><span class="token car">props</span> <span class="token punctuation">(</span>:0 allFiles<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; display the VirtualPath of all available files</span>
<span class="token punctuation">(</span><span class="token car">joinln</span> <span class="token punctuation">(</span><span class="token car">map</span> .VirtualPath allFiles<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; display the method signature for all script methods starting with &#39;findFiles&#39;</span>
<span class="token punctuation">(</span><span class="token car">globln</span> <span class="token string">&quot;findFiles*&quot;</span> <span class="token punctuation">(</span><span class="token car">map</span> .Signature scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; see how many .html files are available to this App</span>
<span class="token punctuation">(</span><span class="token car">count</span> <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; see how many .js files are available to this App</span>
<span class="token punctuation">(</span><span class="token car">count</span> <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.js&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; show the VirtualPath of all .html files</span>
<span class="token punctuation">(</span><span class="token car">joinln</span> <span class="token punctuation">(</span><span class="token car">map</span> .VirtualPath <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; view the VirtualPath&#39;s of the 1st and 2nd .html files</span>
<span class="token punctuation">(</span>:0 <span class="token punctuation">(</span><span class="token car">map</span> .VirtualPath <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span>:1 <span class="token punctuation">(</span><span class="token car">map</span> .VirtualPath <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; view the text file contents of the 1st and 2nd .html files</span>
<span class="token punctuation">(</span><span class="token car">fileTextContents</span> <span class="token punctuation">(</span>:0 <span class="token punctuation">(</span><span class="token car">map</span> .VirtualPath <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token car">fileTextContents</span> <span class="token punctuation">(</span>:1 <span class="token punctuation">(</span><span class="token car">map</span> .VirtualPath <span class="token punctuation">(</span><span class="token car">findFiles</span> <span class="token string">&quot;*.html&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; display the method signatures of all script methods starting with &#39;redis&#39;</span>
<span class="token punctuation">(</span><span class="token car">globln</span> <span class="token string">&quot;redis*&quot;</span> <span class="token punctuation">(</span><span class="token car">map</span> .Signature scriptMethods<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; search for all Redis Keys starting with &#39;urn:&#39; in the redis-server instances this App is configured with</span>
<span class="token punctuation">(</span><span class="token car">redisSearchKeys</span> <span class="token string">&quot;urn:*&quot;</span><span class="token punctuation">)</span>

<span class="token comment">; display the first redis search entry</span>
<span class="token punctuation">(</span>:0 <span class="token punctuation">(</span><span class="token car">redisSearchKeys</span> <span class="token string">&quot;urn:*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; display the key names of all redis keys starting with &#39;urn:&#39;</span>
<span class="token punctuation">(</span><span class="token car">joinln</span> <span class="token punctuation">(</span><span class="token car">map</span> <span class="token lisp-property property">:id</span> <span class="token punctuation">(</span><span class="token car">redisSearchKeys</span> <span class="token string">&quot;urn:*&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; find out the redis-server data type of the &#39;urn:tags&#39; key</span>
<span class="token punctuation">(</span><span class="token car">redisCall</span> <span class="token string">&quot;<span class="token argument">TYPE</span> urn:tags&quot;</span><span class="token punctuation">)</span>

<span class="token comment">; view all tags in the &#39;urn:tags&#39; sorted set</span>
<span class="token punctuation">(</span><span class="token car">redisCall</span> <span class="token string">&quot;<span class="token argument">ZRANGE</span> urn:tags 0 -1&quot;</span><span class="token punctuation">)</span>

<span class="token comment">; view the string contents of the &#39;urn:question:1&#39; key</span>
<span class="token punctuation">(</span><span class="token car">redisCall</span> <span class="token string">&quot;<span class="token argument">GET</span> urn:question:1&quot;</span><span class="token punctuation">)</span>

<span class="token comment">; parse the json contents of question 1 and display its tag names</span>
<span class="token punctuation">(</span><span class="token lisp-property property">:Tags</span> <span class="token punctuation">(</span><span class="token car">parseJson</span> <span class="token punctuation">(</span><span class="token car">redisCall</span> <span class="token string">&quot;<span class="token argument">GET</span> urn:question:1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; extract the 2nd tag of question 1</span>
<span class="token punctuation">(</span>:1 <span class="token punctuation">(</span><span class="token lisp-property property">:Tags</span> <span class="token punctuation">(</span><span class="token car">parseJson</span> <span class="token punctuation">(</span><span class="token car">redisCall</span> <span class="token string">&quot;<span class="token argument">GET</span> urn:question:1&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">; clear the Console screen</span>
clear

<span class="token comment">; exit the Lisp REPL</span>
quit
</code></pre></div><h4 id="enable-features-and-access-resources-with-app-settings" tabindex="-1">Enable features and access resources with app.settings <a class="header-anchor" href="#enable-features-and-access-resources-with-app-settings" aria-hidden="true">#</a></h4><p>You can configure the Lisp REPL with any of the resources and features that <a href="https://sharpscript.net/docs/sharp-apps" target="_blank" rel="noopener noreferrer">Sharp Apps</a> and <a href="https://sharpscript.net/docs/gist-desktop-apps" target="_blank" rel="noopener noreferrer">Gist Desktop Apps</a> have access to, by creating a plain text <code>app.settings</code> file with all the features and resources you want the Lisp REPL to have access to, e.g. this <a href="https://sharpscript.net/docs/sharp-apps#pure-cloud-apps" target="_blank" rel="noopener noreferrer">Pure Cloud App app.settings</a> allows the Lisp REPL to use <a href="https://sharpscript.net/docs/db-scripts" target="_blank" rel="noopener noreferrer">Database Scripts</a> against a AWS PostgreSQL RDS server and query remote <a href="/virtual-file-system">S3 Virtual Files</a> using <a href="https://sharpscript.net/docs/protected-scripts#virtual-file-system-apis" target="_blank" rel="noopener noreferrer">Virtual File System APIs</a>:</p><pre><code># Note: values prefixed with &#39;$&#39; are resolved from Environment Variables
name AWS S3 PostgreSQL Web App
db postgres
db.connection $AWS_RDS_POSTGRES
files s3
files.config {AccessKey:$AWS_S3_ACCESS_KEY,SecretKey:$AWS_S3_SECRET_KEY,Region:us-east-1,Bucket:rockwind}
</code></pre><p>See the <a href="https://sharpscript.net/docs/sharp-apps#registering-servicestack-plugins" target="_blank" rel="noopener noreferrer">plugins app.settings</a> for examples of how to load and configure <a href="/plugins">ServiceStack Plugins</a>.</p>`,61);function i(l,u,d,h,g,k){const n=t("WebTroubleMd");return a(),s("div",null,[c,o(n)])}var b=e(r,[["render",i]]);export{f as __pageData,b as default};
