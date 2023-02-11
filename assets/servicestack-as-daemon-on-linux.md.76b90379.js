import{_ as n,o as a,c as s,a as t}from"./app.27fe150c.js";const g='{"title":"Run ServiceStack as a daemon on Linux","description":"","frontmatter":{"slug":"servicestack-as-daemon-on-linux","title":"Run ServiceStack as a daemon on Linux"},"headers":[{"level":2,"title":"Service example","slug":"service-example"},{"level":2,"title":"Daemonising the application","slug":"daemonising-the-application"},{"level":2,"title":"Configuring apache","slug":"configuring-apache"},{"level":2,"title":"Alternative nginx configuration","slug":"alternative-nginx-configuration"},{"level":3,"title":"Other hosting options on Linux / Mono","slug":"other-hosting-options-on-linux-mono"}],"relativePath":"servicestack-as-daemon-on-linux.md"}',e={},o=t(`<p>When your web application is predominantly javascript with a REST service at the back-end there are many reasons why you might want to simply serve the static content through apache (or alternative) and run the service as a ...well... service. Some examples are:</p><ul><li>Faster start-up times</li><li>Avoiding lengthy XML configuration files</li><li>Problems with mono <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> <a href="https://bugzilla.xamarin.com/show_bug.cgi?id=381" target="_blank" rel="noopener noreferrer">memory</a> <a href="http://minimalreadership.blogspot.co.uk/2011/07/why-is-aspnet-on-mono-like-new-pet-that.html" target="_blank" rel="noopener noreferrer">leaks</a> and <a href="http://teadriven.me.uk/2012/03/11/time-for-a-rest/" target="_blank" rel="noopener noreferrer">random exceptions</a>.</li></ul><p>Fortunately this is quite simple.</p><h2 id="service-example" tabindex="-1">Service example <a class="header-anchor" href="#service-example" aria-hidden="true">#</a></h2><p>The earlier example of <a href="/self-hosting">self hosting</a> provides a good starting point, but needs to be modified slightly if running as a daemon.</p><div class="language-csharp"><pre><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Reflection</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Mono<span class="token punctuation">.</span>Unix</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">Mono<span class="token punctuation">.</span>Unix<span class="token punctuation">.</span>Native</span><span class="token punctuation">;</span>

<span class="token keyword">using</span> <span class="token namespace">Funq</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">ServiceStack</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">ServiceStackExample</span>
<span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppHost</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AppSelfHostBase</span></span>
	<span class="token punctuation">{</span>
		<span class="token keyword">public</span> <span class="token function">AppHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token string">&quot;Example&quot;</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">AppHost</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Assembly<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

		<span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">Container</span> container<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">class</span> <span class="token class-name">Program</span>
	<span class="token punctuation">{</span>
		<span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span>
		<span class="token punctuation">{</span>
			<span class="token comment">//Initialize app host</span>
			<span class="token class-name"><span class="token keyword">var</span></span> appHost <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">AppHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			appHost<span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
			appHost<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token string">&quot;http://127.0.0.1:8080/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

			<span class="token class-name">UnixSignal<span class="token punctuation">[</span><span class="token punctuation">]</span></span> signals <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UnixSignal<span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token punctuation">{</span> 
				<span class="token keyword">new</span> <span class="token constructor-invocation class-name">UnixSignal</span><span class="token punctuation">(</span>Signum<span class="token punctuation">.</span>SIGINT<span class="token punctuation">)</span><span class="token punctuation">,</span> 
				<span class="token keyword">new</span> <span class="token constructor-invocation class-name">UnixSignal</span><span class="token punctuation">(</span>Signum<span class="token punctuation">.</span>SIGTERM<span class="token punctuation">)</span><span class="token punctuation">,</span> 
			<span class="token punctuation">}</span><span class="token punctuation">;</span>

			<span class="token comment">// Wait for a unix signal</span>
			<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> exit <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token operator">!</span>exit<span class="token punctuation">;</span> <span class="token punctuation">)</span>
			<span class="token punctuation">{</span>
				<span class="token class-name"><span class="token keyword">int</span></span> id <span class="token operator">=</span> UnixSignal<span class="token punctuation">.</span><span class="token function">WaitAny</span><span class="token punctuation">(</span>signals<span class="token punctuation">)</span><span class="token punctuation">;</span>

				<span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">&gt;=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> id <span class="token operator">&lt;</span> signals<span class="token punctuation">.</span>Length<span class="token punctuation">)</span>
				<span class="token punctuation">{</span>
					<span class="token keyword">if</span> <span class="token punctuation">(</span>signals<span class="token punctuation">[</span>id<span class="token punctuation">]</span><span class="token punctuation">.</span>IsSet<span class="token punctuation">)</span> exit <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Be aware that this makes use of posix functionality and will therefore not work under Windows. You will need to add the Mono.Posix library to your project references.</p><h2 id="daemonising-the-application" tabindex="-1">Daemonising the application <a class="header-anchor" href="#daemonising-the-application" aria-hidden="true">#</a></h2><p>As it stands the project produces a console application that responds to unix signals (press ctrl-c to exit if you are running it from a terminal). If your target platform is Ubuntu then the simplest way to automatically run your application as a daemon is to use an upstart script.</p><p>Create the following at /etc/init/example.conf</p><div class="language-ini"><pre><code><span class="token comment"># ServiceStack Example Application</span>

description &quot;ServiceStack Example&quot;
author      &quot;ServiceStack&quot;

start on started rc
stop on stopping rc

respawn

exec start-stop-daemon --start -c username --exec mono /path/to/application.exe
</code></pre></div><p>Ideally we would start the service when apache is ready but apache does not yet emit upstart events. Additional conditions could include a database dependency if required, for example &quot;start on started mysql&quot;. Replace &quot;username&quot; with that of an unprivileged user on the system; this avoids the dangers of running the application as root.</p><p>You should now be able to start your application with</p><div class="language-bash"><pre><code>$ <span class="token function">sudo</span> start example
</code></pre></div><p>and access the default service information by visiting <a href="http://127.0.0.1:8080" target="_blank" rel="noopener noreferrer">http://127.0.0.1:8080</a> in your browser of choice.</p><h2 id="configuring-apache" tabindex="-1">Configuring apache <a class="header-anchor" href="#configuring-apache" aria-hidden="true">#</a></h2><p>The following example configuration uses proxying to expose the REST service through apache, so you must ensure that mod_proxy has been enabled first:</p><div class="language-bash"><pre><code>$ <span class="token function">sudo</span> a2enmod proxy
</code></pre></div><p>Next create a file at /etc/apache2/sites-available/example</p><div class="language-apache"><pre><code>ProxyPass /api http://127.0.0.1:8080/ retry=0 max=50
ProxyPassReverse /api http://127.0.0.1:8080/

&lt;VirtualHost *:80&gt;
	DocumentRoot /path/to/static/content/

	&lt;Directory /&gt;
	&lt;/Directory&gt;

	&lt;Directory /path/to/static/content/&gt;
		Options Indexes MultiViews
		AllowOverride None
		Order allow,deny
		allow from all
	&lt;/Directory&gt;
&lt;/VirtualHost&gt;
</code></pre></div><p>Your site can then be enabled with</p><div class="language-bash"><pre><code>$ <span class="token function">sudo</span> a2ensite example
</code></pre></div><p>although you will need to disable the default sites if they are enabled. After restarting/reloading apache you should find your static content at <a href="http://127.0.0.1" target="_blank" rel="noopener noreferrer">http://127.0.0.1</a> and the REST service at <a href="http://127.0.0.1/api" target="_blank" rel="noopener noreferrer">http://127.0.0.1/api</a>.</p><h2 id="alternative-nginx-configuration" tabindex="-1">Alternative nginx configuration <a class="header-anchor" href="#alternative-nginx-configuration" aria-hidden="true">#</a></h2><p>Create a file at /etc/nginx/sites-available/example</p><div class="language-nginx"><pre><code><span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
	<span class="token directive"><span class="token keyword">listen</span> <span class="token number">80</span></span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">root</span> /path/to/static/content</span><span class="token punctuation">;</span>
	<span class="token directive"><span class="token keyword">index</span> index.html</span><span class="token punctuation">;</span>

	<span class="token directive"><span class="token keyword">location</span> /api/</span> <span class="token punctuation">{</span>
		<span class="token directive"><span class="token keyword">proxy_pass</span> http://127.0.0.1:8080/</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>To enable the site simply symlink from sites-available to sites-enabled (nginx does not have an equivalent a2ensite tool) and then restart/reload nginx. (N.B. The trailing forward slash on the proxy pass URL is important).</p><h3 id="other-hosting-options-on-linux-mono" tabindex="-1">Other hosting options on Linux / Mono <a class="header-anchor" href="#other-hosting-options-on-linux-mono" aria-hidden="true">#</a></h3><p>This StackOverflow answer lists the different options for <a href="http://stackoverflow.com/questions/12188356/what-is-the-best-way-to-run-servicestack-on-linux-mono/12188358#12188358" target="_blank" rel="noopener noreferrer">hosting ServiceStack on Linux with Mono</a>.</p>`,29),p=[o];function c(i,l,r,u,k,d){return a(),s("div",null,p)}var m=n(e,[["render",c]]);export{g as __pageData,m as default};
