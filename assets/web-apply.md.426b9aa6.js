import{_ as e,o as t,c as o,a}from"./app.bc89fa0e.js";const b=`{"title":"Customize .NET Core Apps with 'web +'","description":"","frontmatter":{"slug":"web-apply","title":"Customize .NET Core Apps with 'web +'"},"headers":[{"level":3,"title":"Usage","slug":"usage"},{"level":3,"title":"apply.md","slug":"apply-md"},{"level":3,"title":"Available Gists","slug":"available-gists"},{"level":3,"title":"Creating customized projects","slug":"creating-customized-projects"},{"level":3,"title":"Apply Gist Modifiers","slug":"apply-gist-modifiers"},{"level":3,"title":"Open for Gists!","slug":"open-for-gists"},{"level":3,"title":"Apply adhoc Gists","slug":"apply-adhoc-gists"}],"relativePath":"web-apply.md"}`,i={},r=a(`<p>Whilst we believe <a href="/web-new">x new</a> is a super simple way to create and maintain project templates, we&#39;ve also created an even simpler and lighter way to create projects - from gists!</p><p>We can use <code>x +</code> (read as &quot;apply gist&quot;) to create light-weight customized projects by applying multiple gists on top of each other. One of the major benefits of this approach is that it&#39;s not only limited at project creation time as it&#39;s also a great way to easily add &quot;layered functionality&quot; to existing projects.</p><p>We can see an example of this earlier with how we can use this to <a href="/templates-lite#updating-lite-project-dependencies">easily update dependencies in &quot;lite&quot; projects</a> which is just applying the <strong>vue-lite-lib</strong> and <strong>react-lite-lib</strong> gists to your existing &quot;lite&quot; projects:</p><pre><code>$ x +vue-lite-lib
</code></pre><h3 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-hidden="true">#</a></h3><p>Similar to <code>x</code> other features, we get the full user experience where we can list, search and apply gists from the commands below:</p><div class="language-"><pre><code>Usage: 
  web +                       Show available gists
  web +&lt;name&gt;                 Write gist files locally, e.g:
  web + #&lt;tag&gt;                Search available gists
  web gist &lt;gist-id&gt;          Write all Gist text files to current directory
</code></pre></div><p>Where we can view all available gists that we can apply to our projects with:</p><pre><code>$ x +
</code></pre><p>Which as of this writing lists:</p><div class="language-"><pre><code>   1. init                 Empty .NET 6.0 ServiceStack App                                   to: .                            by @ServiceStack  [project]
   2. init-lts             Empty .NET 6.0 LTS ServiceStack App                               to: .                            by @ServiceStack  [project]
   3. init-corefx          Empty ASP.NET 6.0 LTS on .NET Framework                           to: .                            by @ServiceStack  [project]
   4. init-sharp-app       Empty ServiceStack Sharp App                                           to: .                            by @ServiceStack  [project]
   5. bootstrap-sharp      Bootstrap + Sharp Pages Starter Template                               to: $HOST                        by @ServiceStack  [ui,sharp]
   6. sqlserver            Use OrmLite with SQL Server                                            to: $HOST                        by @ServiceStack  [db]
   7. sqlite               Use OrmLite with SQLite                                                to: $HOST                        by @ServiceStack  [db]
   8. postgres             Use OrmLite with PostgreSQL                                            to: $HOST                        by @ServiceStack  [db]
   9. mysql                Use OrmLite with MySql                                                 to: $HOST                        by @ServiceStack  [db]
  10. auth-db              AuthFeature with OrmLite AuthRepository, CacheClient (requires ui,db)  to: $HOST                        by @ServiceStack  [auth]
  11. auth-memory          AuthFeature with Memory AuthRepository, CacheClient (requires ui)      to: $HOST                        by @ServiceStack  [auth]
  12. validation-contacts  Contacts Validation Example                                            to: $HOST                        by @ServiceStack  [example,sharp]
  13. vue-lite-lib         Update vue-lite projects libraries                                     to: $HOST                        by @ServiceStack  [lib,vue]
  14. react-lite-lib       Update react-lite projects libraries                                   to: $HOST                        by @ServiceStack  [lib,react]
  15. nginx                Nginx reverse proxy config for .NET Core Apps                          to: /etc/nginx/sites-available/  by @ServiceStack  [config]
  16. supervisor           Supervisor config for managed execution of .NET Core Apps              to: /etc/supervisor/conf.d/      by @ServiceStack  [config]
  17. docker               Dockerfile example for .NET Core Web Apps                              to: .                            by @ServiceStack  [config]

 Usage:  x +&lt;name&gt;
         x +&lt;name&gt; &lt;UseName&gt;

Search:  x + #&lt;tag&gt;      Available tags: auth, config, db, example, lib, project, react, sharp, ui, vue
</code></pre></div><h3 id="apply-md" tabindex="-1"><a href="http://apply.md" target="_blank" rel="noopener noreferrer">apply.md</a> <a class="header-anchor" href="#apply-md" aria-hidden="true">#</a></h3><p>The way we populate this list is by extending the multi-purpose functionality of Markdown and using it as an &quot;Executable Document&quot; where the human-friendly <a href="https://gist.github.com/gistlyn/f3fa8c016bbd253badc61d80afe399d9" target="_blank" rel="noopener noreferrer">apply.md</a> document below is also reused as the datasource to populate the above list:</p><div class="language-"><pre><code>Invalid code snippet option</code></pre></div><p>This self-documenting list lets you browse all available gists and their contents the same way as the <code>x</code> tool does.</p><p>That just like <code>x new</code> can be configured to use your own <code>apply.md</code> Gist document with:</p><div class="language-"><pre><code>    APP_SOURCE_GISTS=&lt;gist id&gt;
</code></pre></div><h3 id="available-gists" tabindex="-1">Available Gists <a class="header-anchor" href="#available-gists" aria-hidden="true">#</a></h3><p>As we expect to see this list of available gists expand greatly in future we&#39;ve also included support for grouping related gists by <code>&lt;tag&gt;</code>, e.g. you can view available starting projects with:</p><pre><code>$ x + #project
</code></pre><div class="language-"><pre><code>Results matching tag [project]:

   1. init            Empty .NET 6.0 ServiceStack App          to: .  by @ServiceStack  [project]
   2. init-lts        Empty .NET 6.0 LTS ServiceStack App      to: .  by @ServiceStack  [project]
   3. init-corefx     Empty ASP.NET Core 2.1 LTS on .NET Framework  to: .  by @ServiceStack  [project]
   4. init-sharp-app  Empty ServiceStack Sharp App                  to: .  by @ServiceStack  [project]

 Usage:  web +&lt;name&gt;
         web +&lt;name&gt; &lt;UseName&gt;

Search:  web + #&lt;tag&gt; Available tags: auth, config, db, example, lib, project, react, sharp, ui, vue
</code></pre></div><p>Which can be chained together to search for all <code>project</code> and <code>sharp</code> gists we can use for <a href="https://sharpscript.net/docs/script-pages" target="_blank" rel="noopener noreferrer">Sharp Pages</a> projects:</p><pre><code>$ x + #project,sharp
</code></pre><div class="language-"><pre><code>Results matching tags [project,sharp]:

   1. init                 Empty .NET Core 3.2 ServiceStack App          to: .      by @ServiceStack  [project]
   2. init-lts             Empty .NET 6.0 LTS ServiceStack App      to: .      by @ServiceStack  [project]
   3. init-corefx          Empty ASP.NET Core 2.1 LTS on .NET Framework  to: .      by @ServiceStack  [project]
   4. init-sharp-app       Empty ServiceStack Sharp App                  to: .      by @ServiceStack  [project]
   5. bootstrap-sharp      Bootstrap + Sharp Pages Starter Template      to: $HOST  by @ServiceStack  [ui,sharp]
   6. validation-contacts  Contacts Validation Example                   to: $HOST  by @ServiceStack  [example,sharp]

 Usage:  web +&lt;name&gt;
         web +&lt;name&gt; &lt;UseName&gt;

Search:  web + #&lt;tag&gt;      Available tags: auth, config, db, example, lib, project, react, sharp, ui, vue
</code></pre></div><h3 id="creating-customized-projects" tabindex="-1">Creating customized projects <a class="header-anchor" href="#creating-customized-projects" aria-hidden="true">#</a></h3><p>From this list we can see that we can create an <strong>Empty .NET 6.0 ServiceStack App</strong> by starting in a new App Folder:</p><pre><code>$ mkdir ProjectName &amp;&amp; cd ProjectName
</code></pre><p>Then applying the <code>init</code> labelled gist which will be saved to the <code>&#39;.&#39;</code> current directory:</p><pre><code>$ x +init
</code></pre><div class="language-"><pre><code>Write files from &#39;init&#39; https://gist.github.com/gistlyn/58030e271595520d87873c5df5e4c2eb to:
  C:\\projects\\Example\\ProjectName.csproj
  C:\\projects\\Example\\Program.cs
  C:\\projects\\Example\\Properties\\launchSettings.json
  C:\\projects\\Example\\ServiceInterface\\MyServices.cs
  C:\\projects\\Example\\ServiceModel\\Hello.cs
  C:\\projects\\Example\\Startup.cs
  C:\\projects\\Example\\appsettings.Development.json
  C:\\projects\\Example\\appsettings.json

Proceed? (n/Y):
</code></pre></div><p>Where its output will let you inspect and verify the gist it&#39;s writing and all the files that it will write to before accepting, by typing <code>y</code> or <code>Enter</code>.</p><p>To instead start with the <strong>latest .NET Core LTS release</strong>, run:</p><pre><code>$ x +init-lts
</code></pre><p>After we&#39;ve created our empty .NET Core project we can configure it to use <strong>PostgreSQL</strong> with:</p><pre><code>$ x +postgres
</code></pre><p>Or we can give it a <strong>Bootstrap Sharp Pages UI</strong> with:</p><pre><code>$ x +bootstrap-sharp
</code></pre><p>What&#39;s even better is that gists can be chained, so we can create a <strong>.NET 6.0 Bootstrap Sharp Pages App using PostgreSQL</strong> with:</p><pre><code>$ x +init+bootstrap-sharp+postgres
</code></pre><p>A <strong>Bootstrap Sharp Pages App</strong> that includes a complete <strong>Contacts Validation example</strong> with:</p><pre><code>$ x +init+bootstrap-sharp+validation-contacts
</code></pre><p>The same as above, but its Auth replaced to persist in a <strong>PostgreSQL</strong> backend:</p><pre><code>$ x +init+bootstrap-sharp+validation-contacts+postgres+auth-db
</code></pre><p>If we decided later we wanted to switch to use <strong>SQL Server</strong> instead we can just layer it over the top of our existing App:</p><pre><code>$ x +sqlserver
</code></pre><p>This isn&#39;t just limited to gist projects, you can also apply gists when <strong>creating new projects</strong>:</p><pre><code>$ x new script+postgres+auth-db
</code></pre><p>Which will create a <a href="https://github.com/NetCoreTemplates/script" target="_blank" rel="noopener noreferrer">script</a> project configured to use <strong>PostgreSQL Auth</strong>.</p><p>This works despite the <code>script</code> project being a <a href="/physical-project-structure">multi-project solution</a> thanks to the <code>to: $HOST</code> modifier which says to <strong>apply the gists files</strong> to the <code>HOST</code> project.</p><h3 id="apply-gist-modifiers" tabindex="-1">Apply Gist Modifiers <a class="header-anchor" href="#apply-gist-modifiers" aria-hidden="true">#</a></h3><p>To enable a versatile and fine-grained solution you can use the modifiers below to control how gists are applied:</p><p>The modifiers next to each gist specify where the gist files should be written to:</p><ul><li><code>{to:&#39;.&#39;}</code> - Write to current directory (default)</li><li><code>{to:&#39;$HOST&#39;}</code> - Write to host project (1st folder containing either <code>appsettings.json,Web.config,App.config,Startup.cs</code>)</li><li><code>{to:&#39;wwwroot/&#39;}</code> - Write to first sub directories named <code>wwwroot</code></li><li><code>{to:&#39;package.json&#39;}</code> - Write to first directory containing <code>package.json</code></li><li><code>{to:&#39;/etc/nginx/sites-available/&#39;}</code> - Write to absolute folder</li><li><code>{to:&#39;$HOME/.my-app/&#39;}</code> - Write to <code>$HOME</code> in unix or <code>%USERPROFILE%</code> on windows</li><li><code>{to:&#39;\${EnumName}/.my-app/&#39;}</code> - Write to <code>Environment.SpecialFolder.{EnumName}</code>, e.g:</li><li><code>{to:&#39;$UserProfile/.my-app/&#39;}</code> - Write to <code>Environment.SpecialFolder.UserProfile</code></li></ul><h4 id="file-name-features" tabindex="-1">File Name features <a class="header-anchor" href="#file-name-features" aria-hidden="true">#</a></h4><p>Use <code>\\</code> in gist file names to write files to sub directories, e.g:</p><ul><li><code>wwwroot\\js\\script.js</code> - Writes gist file to <code>wwwroot/js/script.js</code></li></ul><p>Use <code>?</code> at end of filename to indicate optional file that <strong>should not be overridden</strong>, e.g:</p><ul><li><code>wwwroot\\login.html?</code> - Only writes to <code>wwwroot\\login.html</code> if it doesn&#39;t already exist.</li></ul><h4 id="replacement-rules" tabindex="-1">Replacement rules <a class="header-anchor" href="#replacement-rules" aria-hidden="true">#</a></h4><p>Just like <code>x new</code> any gist file name or contents with different &quot;MyApp&quot; text styles will be replaced with the Project Name in that style, e.g:</p><ul><li><code>MyApp</code> will be replaced with <code>ProjectName</code></li><li><code>my-app</code> will be replaced with <code>project-name</code></li><li><code>My App</code> will be replaced with <code>Project Name</code></li></ul><h4 id="adding-packages" tabindex="-1">Adding packages <a class="header-anchor" href="#adding-packages" aria-hidden="true">#</a></h4><p>To include nuget package dependencies, create a file in your gist called <code>_init</code> with the list of <code>dotnet</code> or <code>nuget</code> commands:</p><div class="language-"><pre><code>dotnet add package ServiceStack.OrmLite.Sqlite
</code></pre></div><h3 id="open-for-gists" tabindex="-1">Open for Gists! <a class="header-anchor" href="#open-for-gists" aria-hidden="true">#</a></h3><p>Whilst we intend to use this feature extensively to be able to deliver &quot;pre-set layered functionality&quot; to ServiceStack Users, we&#39;re happy to maintain a curated list of gists that can <strong>help any .NET Core project</strong> as we&#39;ve done with the <code>config</code> gists:</p><pre><code>$ x + #config
</code></pre><div class="language-"><pre><code>Results matching tag [config]:

   1. nginx       Nginx reverse proxy config for .NET Core Apps              to: /etc/nginx/sites-available/  by @ServiceStack  [config]
   2. supervisor  Supervisor config for managed execution of .NET Core Apps  to: /etc/supervisor/conf.d/      by @ServiceStack  [config]
   3. docker      Dockerfile example for .NET Core Web Apps                  to: .                            by @ServiceStack  [config]
</code></pre></div><p>Where being able to apply pre-configured configuration files like this reduces the required steps and effort to <a href="/netcore-deploy-rsync">Configure .NET Core Apps to run on Linux</a>.</p><h4 id="how-to-include-your-gist" tabindex="-1">How to include your gist <a class="header-anchor" href="#how-to-include-your-gist" aria-hidden="true">#</a></h4><p>To add your gist to the public list <a href="https://gist.github.com/gistlyn/f3fa8c016bbd253badc61d80afe399d9" target="_blank" rel="noopener noreferrer">add a comment to apply.md</a> with a link to your gist and the modifiers you want it to use.</p><h3 id="apply-adhoc-gists" tabindex="-1">Apply adhoc Gists <a class="header-anchor" href="#apply-adhoc-gists" aria-hidden="true">#</a></h3><p>Alternatively you can share and apply any gists by <strong>gist id</strong> or <strong>URL</strong>, e.g:</p><pre><code>$ x gist 58030e271595520d87873c5df5e4c2eb
$ x gist https://gist.github.com/58030e271595520d87873c5df5e4c2eb
</code></pre>`,74),s=[r];function c(n,p,l,d,g,h){return t(),o("div",null,s)}var m=e(i,[["render",c]]);export{b as __pageData,m as default};
