import{_ as n,o,c as i,a as t,d as e,b as s}from"./app.0b863c35.js";const fe=`{"title":"Install Redis on Windows","description":"","frontmatter":{"title":"Install Redis on Windows"},"headers":[{"level":2,"title":"Option 1) Install Redis on Ubuntu on Windows","slug":"option-1-install-redis-on-ubuntu-on-windows"},{"level":2,"title":"Option 2) Running the latest version of Redis with Vagrant","slug":"option-2-running-the-latest-version-of-redis-with-vagrant"},{"level":2,"title":"Option 3) Running Microsoft's native port of Redis","slug":"option-3-running-microsoft-s-native-port-of-redis"},{"level":3,"title":"Current Version: 3.0.503 (June 28, 2016)","slug":"current-version-3-0-503-june-28-2016"},{"level":2,"title":"Redis Admin","slug":"redis-admin"},{"level":3,"title":"Run headless on macOS, Linux and Windows","slug":"run-headless-on-macos-linux-and-windows"},{"level":2,"title":"Redis Vue","slug":"redis-vue"},{"level":3,"title":"Run headless on macOS, Linux and Windows","slug":"run-headless-on-macos-linux-and-windows-1"},{"level":2,"title":"Configure Redis Sentinel Servers","slug":"configure-redis-sentinel-servers"}],"relativePath":"install-redis-windows.md"}`,r={},a=t(`<p>The <a href="https://github.com/ServiceStack/redis-windows" target="_blank" rel="noopener noreferrer">ServiceStack/redis-windows</a> project contains the binary releases of MS Open Tech redis port of windows as well as a vagrant configuration for redis letting you run the native version of Redis in a Virtual Box VM.</p><p>Whilst it&#39;s recommended to use <a href="https://redis.io" target="_blank" rel="noopener noreferrer">Redis</a> on Linux in production, it is often useful for developers on Windows platforms to have their own local version of redis running to develop with.</p><p>The 3 most popular ways of running redis on windows is to use the binary releases of <a href="https://github.com/msopentech/redis" target="_blank" rel="noopener noreferrer">Microsoft&#39;s native port of redis</a>, but as this is an unofficial port it always lags behind the latest official development of redis on Linux/OSX.</p><p>Thanks to <a href="https://www.vagrantup.com/" target="_blank" rel="noopener noreferrer">Vagrant</a> you can choose to run the latest linux version inside a Virtual Box Linux VM where you&#39;ll be able to run the official native version of redis.</p><p>Or if you have the latest version of <strong>Windows 10</strong> you can install <a href="https://msdn.microsoft.com/en-us/commandline/wsl/about" target="_blank" rel="noopener noreferrer">Bash on Ubuntu on Windows</a> which will let you run the official version of Redis on Ubuntu on Windows \u{1F603} This is our preferred approach as it lets you run native Ubuntu binaries on Windows more efficiently than running Linux in a VM:</p><h2 id="option-1-install-redis-on-ubuntu-on-windows" tabindex="-1">Option 1) Install Redis on Ubuntu on Windows <a class="header-anchor" href="#option-1-install-redis-on-ubuntu-on-windows" aria-hidden="true">#</a></h2><h4 id="install-windows-subsystem-for-linux-wsl" tabindex="-1"><a href="https://msdn.microsoft.com/en-us/commandline/wsl/install_guide" target="_blank" rel="noopener noreferrer">Install Windows Subsystem for Linux (WSL)</a> <a class="header-anchor" href="#install-windows-subsystem-for-linux-wsl" aria-hidden="true">#</a></h4><ol><li>From Start, search for <strong>Turn Windows features on or off</strong> (type <code>turn</code>)</li><li><strong>Select Windows Subsystem for Linux (beta)</strong></li></ol><p><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/redis/install-wsl.png" alt=""></p><p>Once installed you can run bash on Ubuntu by typing <strong>bash</strong> from a Windows Command Prompt. To install the latest version of Redis we first need to install some prerequisites:</p><div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> update
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">make</span>
$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gcc
</code></pre></div><p>Then follow the <a href="https://redis.io/topics/quickstart" target="_blank" rel="noopener noreferrer">official installation guide</a> to download, build and install the latest stable version. <strong>NOTE:</strong> Installing the binaries using <code>make install</code> will not work. You need to copy them manually to <code>/usr/bin</code> (just like described in the guide, except that they use <code>/usr/local/bin</code> - which is the problem).</p><p>You&#39;ll then be able to launch redis with:</p>`,13),l=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --daemonize yes")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),d=t(`<p>Which will run redis in the background freeing your shell so you can play with it using the redis client:</p><div class="language-bash"><pre><code>$ redis-cli
$ <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SET foo bar
OK
$ <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> GET foo
<span class="token string">&quot;bar&quot;</span>
</code></pre></div><p>Which you can connect to from within bash or from your Windows desktop using the <a href="#option-3-running-microsofts-native-port-of-redis">redis-cli native Windows binary from MSOpenTech</a>.</p><h2 id="option-2-running-the-latest-version-of-redis-with-vagrant" tabindex="-1">Option 2) Running the latest version of Redis with Vagrant <a class="header-anchor" href="#option-2-running-the-latest-version-of-redis-with-vagrant" aria-hidden="true">#</a></h2><ol><li><p><a href="https://docs.vagrantup.com/v2/getting-started/" target="_blank" rel="noopener noreferrer">Install Vagrant on Windows</a></p></li><li><p>Download the <a href="https://raw.github.com/ServiceStack/redis-windows/master/downloads/vagrant-redis.zip" target="_blank" rel="noopener noreferrer">vagrant-redis.zip</a> vagrant configuration</p></li></ol>`,5),c=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,[s("wget "),e("a",{href:"https://raw.github.com/ServiceStack/redis-windows/master/downloads/vagrant-redis.zip",target:"_blank",rel:"noopener noreferrer"},"https://raw.github.com/ServiceStack/redis-windows/master/downloads/vagrant-redis.zip")])])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),p=t(`<ol start="3"><li><p>Extract <code>vagrant-redis.zip</code> in any folder, e.g. in <code>c:\\vagrant-redis</code></p></li><li><p>Launch the Virtual Box VM with <code>vagrant up</code></p></li></ol><div class="language-bash"><pre><code>$ <span class="token builtin class-name">cd</span> c:<span class="token punctuation">\\</span>vagrant-redis
$ vagrant up
</code></pre></div><p>This will launch a new Ubuntu VM instance inside Virtual Box that will automatically install and start the latest stable version of redis.</p><h2 id="option-3-running-microsoft-s-native-port-of-redis" tabindex="-1">Option 3) Running Microsoft&#39;s native port of Redis <a class="header-anchor" href="#option-3-running-microsoft-s-native-port-of-redis" aria-hidden="true">#</a></h2><p>These 64-bit binary releases are created by building the <a href="https://github.com/msopentech/redis" target="_blank" rel="noopener noreferrer">Microsoft&#39;s native port of redis</a> which have also been published on <a href="https://www.nuget.org/packages/redis-64" target="_blank" rel="noopener noreferrer">NuGet</a>, but as it&#39;s more convenient we provide a zip of the 64-bit binaries here.</p><h4 id="ms-open-announcements" tabindex="-1">MS Open Announcements <a class="header-anchor" href="#ms-open-announcements" aria-hidden="true">#</a></h4><ul><li><a href="https://raw.githubusercontent.com/MSOpenTech/redis/3.0/Redis%20on%20Windows%20Release%20Notes.md" target="_blank" rel="noopener noreferrer">MSOpenTech Redis on Windows 3.0 Release Notes</a></li><li><a href="https://raw.githubusercontent.com/MSOpenTech/redis/2.8/Redis%20on%20Windows%20Release%20Notes.md" target="_blank" rel="noopener noreferrer">MSOpenTech Redis on Windows 2.8 Release Notes</a></li><li><a href="https://github.com/ServiceStack/redis-windows/blob/master/docs/msopentech-redis-on-windows.md" target="_blank" rel="noopener noreferrer">MSOpenTech&#39;s Redis on Windows</a></li><li><a href="https://msopentech.com/blog/2014/03/24/updates-released-redis-windows/" target="_blank" rel="noopener noreferrer">Updates Released for Redis on Windows (2.8.4)</a></li></ul><h3 id="current-version-3-0-503-june-28-2016" tabindex="-1">Current Version: 3.0.503 (June 28, 2016) <a class="header-anchor" href="#current-version-3-0-503-june-28-2016" aria-hidden="true">#</a></h3><ol><li>Download the <a href="https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip" target="_blank" rel="noopener noreferrer">redis-latest.zip</a> native 64bit Windows port of redis</li></ol>`,9),h=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,[s("wget "),e("a",{href:"https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip",target:"_blank",rel:"noopener noreferrer"},"https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip")])])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),u=t(`<ol start="2"><li><p>Extract <code>redis64-latest.zip</code> in any folder, e.g. in <code>c:\\redis</code></p></li><li><p>Run the <code>redis-server.exe</code> using the local configuration</p></li></ol><div class="language-bash"><pre><code>$ <span class="token builtin class-name">cd</span> c:<span class="token punctuation">\\</span>redis
$ redis-server.exe redis.windows.conf
</code></pre></div><ol start="4"><li>Run <code>redis-cli.exe</code> to connect to your redis instance</li></ol><div class="language-bash"><pre><code>$ <span class="token builtin class-name">cd</span> c:<span class="token punctuation">\\</span>redis
$ redis-cli.exe
</code></pre></div><ol start="5"><li>Start playing with redis \u{1F603}</li></ol><div class="language-bash"><pre><code>redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> SET foo bar
OK
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> KEYS *
<span class="token number">1</span><span class="token punctuation">)</span> <span class="token string">&quot;foo&quot;</span>
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> GET foo
<span class="token string">&quot;bar&quot;</span>
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span>
</code></pre></div><p>The MSOpenTech of Redis adds some useful extensions for better integration with Windows:</p><h4 id="running-redis-as-a-service" tabindex="-1">Running Redis as a Service <a class="header-anchor" href="#running-redis-as-a-service" aria-hidden="true">#</a></h4><p>If you installed Redis using the MSI package, then Redis was already installed as a Windows service. Nothing further to do. If you would like to change its settings, you can update the redis.windows-service.conf file and then restart the Redis service (Run -&gt; services.msc -&gt; Redis -&gt; Restart).</p><p>During installation of the MSI you can either use the installer\u2019s user interface to update the port that Redis listens to and the firewall exception or run it silently without a UI. The following examples show how to install from the command line:</p><p><strong>default install (port 6379 and firewall exception ON):</strong></p>`,11),w=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"msiexec /i Redis-Windows-x64.msi")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),g=e("p",null,[e("strong",null,"set port and turn OFF firewall exception:")],-1),v=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,'msiexec /i Redis-Windows-x64.msi PORT=1234 ADD_FIREWALL_RULE=""')])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),f=e("p",null,[e("strong",null,"set port and turn ON firewall exception:")],-1),m=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"msiexec /i Redis-Windows-x64.msi PORT=1234 ADD_FIREWALL_RULE =1")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),b=e("p",null,[e("strong",null,"install with no user interface:")],-1),k=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"msiexec /quiet /i Redis-Windows-x64.msi")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),x=e("p",null,"If you did not install Redis using the MSI package, then you still run Redis as a Windows service by following these instructions:",-1),_=e("p",null,"In order to better integrate with the Windows Services model, new command line arguments have been introduced to Redis. These service arguments require an elevated user context in order to connect to the service control manager. If these commands are invoked from a non-elevated context, Redis will attempt to create an elevated context in which to execute these commands. This will cause a User Account Control dialog to be displayed by Windows and may require Administrative user credentials in order to proceed.",-1),y=e("h4",{id:"installing-the-service",tabindex:"-1"},[s("Installing the Service "),e("a",{class:"header-anchor",href:"#installing-the-service","aria-hidden":"true"},"#")],-1),S=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-install
`)])],-1),R=e("p",null,'This must be the first argument on the redis-server command line. Arguments after this are passed in the order they occur to Redis when the service is launched. The service will be configured as Autostart and will be launched as "NT AUTHORITY\\NetworkService". Upon successful installation, a success message will be displayed and Redis will exit.',-1),T=e("p",null,"This command does not start the service.",-1),M=e("p",null,"For instance:",-1),V=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-install redis.windows.conf --loglevel verbose")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),A=e("h4",{id:"uninstalling-the-service",tabindex:"-1"},[s("Uninstalling the Service "),e("a",{class:"header-anchor",href:"#uninstalling-the-service","aria-hidden":"true"},"#")],-1),W=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-uninstall
`)])],-1),B=e("p",null,"This will remove the Redis service configuration information from the registry. Upon successful uninstallation, a success message will be displayed and Redis will exit. This does command not to stop the service.",-1),C=e("p",null,"For instance:",-1),j=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-uninstall")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),I=e("h4",{id:"starting-the-service",tabindex:"-1"},[s("Starting the Service "),e("a",{class:"header-anchor",href:"#starting-the-service","aria-hidden":"true"},"#")],-1),L=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-start
`)])],-1),O=e("p",null,"This will start the Redis service. Upon successful startup, a success message will be displayed and Redis service will be started.",-1),N=e("p",null,"For instance:",-1),E=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-start")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),D=e("h4",{id:"stopping-the-service",tabindex:"-1"},[s("Stopping the Service "),e("a",{class:"header-anchor",href:"#stopping-the-service","aria-hidden":"true"},"#")],-1),$=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-stop
`)])],-1),U=e("p",null,"This will stop the Redis service. Upon successful termination, a success message will be displayed and Redis will exit.",-1),P=e("p",null,"For instance:",-1),H=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-stop")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),q=t(`<h4 id="naming-the-service" tabindex="-1">Naming the Service <a class="header-anchor" href="#naming-the-service" aria-hidden="true">#</a></h4><div class="language-"><pre><code>--service-name name
</code></pre></div><p>This optional argument may be used with any of the preceding commands to set the name of the installed service. This argument should follow the service-install, service-start, service-stop or service-uninstall commands, and precede any arguments to be passed to Redis via the service-install command. The following would install and start three separate instances of Redis as a service:</p><div class="language-bash"><pre><code>$ redis-server --service-install \u2013service-name redisService1 \u2013port <span class="token number">10001</span>
$ redis-server --service-start \u2013service-name redisService1
$ redis-server --service-install \u2013service-name redisService2 \u2013port <span class="token number">10002</span>
$ redis-server --service-start \u2013service-name redisService2
$ redis-server --service-install \u2013service-name redisService3 \u2013port <span class="token number">10003</span>
$ redis-server --service-start \u2013service-name redisService3
</code></pre></div><h2 id="redis-admin" tabindex="-1"><a href="/admin-ui-redis">Redis Admin</a> <a class="header-anchor" href="#redis-admin" aria-hidden="true">#</a></h2><p>The <a href="/admin-ui-redis">Redis Admin UI</a> lets you manage your App&#39;s configured Redis Server with a user-friendly UX for managing core Redis data types, simple search functionality to quickly find Redis values, quick navigation between related values, first class support for JSON values and a flexible command interface and command history to inspect all previously run redis commands that&#39;s easily editable &amp; rerun.</p>`,6),z=e("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/AACZtTOcQbg?start=217",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1),F=e("p",null,[s("To launch as a stand-alone Desktop App, "),e("a",{href:"https://dotnet.microsoft.com/en-us/download",target:"_blank",rel:"noopener noreferrer"},"Install .NET SDK"),s(" and the "),e("a",{href:"/netcore-windows-desktop"},"Windows Desktop App tool"),s(":")],-1),K=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"dotnet tool install -g app")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),Y=e("p",null,"After install, open the Redis Admin Desktop from the command-line with:",-1),G=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"app open redis")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),J=t('<p>Or from your browser at:</p><h3 class="text-3xl text-center"><a href="app://redis">app://redis</a></h3><h3 id="run-headless-on-macos-linux-and-windows" tabindex="-1">Run headless on macOS, Linux and Windows <a class="header-anchor" href="#run-headless-on-macos-linux-and-windows" aria-hidden="true">#</a></h3><p>Non Windows OS can install the cross-platform <a href="/dotnet-tool">x dotnet tool</a>:</p>',4),X=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"dotnet tool install -g x")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),Q=e("p",null,"Then launch from Command Line with:",-1),Z=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"x open redis")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),ee=t('<p>Where you can view it with your preferred browser at <code>http://localhost:5000</code></p><h2 id="redis-vue" tabindex="-1"><a href="https://sharpscript.net/sharp-apps/redis#redis-vue" target="_blank" rel="noopener noreferrer">Redis Vue</a> <a class="header-anchor" href="#redis-vue" aria-hidden="true">#</a></h2><p>Redis Vue is a simple, lightweight, versatile Redis Admin UI developed using <a href="https://vuejs.org/v2/guide/" target="_blank" rel="noopener noreferrer">Vue</a> and ServiceStack <a href="https://sharpscript.net/sharp-apps/" target="_blank" rel="noopener noreferrer">Sharp Apps</a>. It supports Redis&#39;s core <strong>Strings</strong>, <strong>Lists</strong>, <strong>Sets</strong>, <strong>Sorted Sets</strong> and <strong>Hash</strong> data structures and custom Redis commands with its entire functionality contained in a single <a href="https://gist.github.com/gistlyn/6de7993333b457445793f51f6f520ea8#file-index-html" target="_blank" rel="noopener noreferrer">/index.html</a> using the dynamic <a href="https://sharpscript.net" target="_blank" rel="noopener noreferrer">#Script</a> language, making it easy to customize and further enhance.</p><p><img src="https://sharpscript.net/assets/img/screenshots/redis.png" alt=""></p><p>Open the Redis Vue Desktop from the command-line with:</p>',5),se=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"app open redis-vue")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),te=e("p",null,"Or from your browser at:",-1),ne=e("h3",{class:"text-3xl text-center"},[e("a",{href:"app://redis-vue"},"app://redis-vue")],-1),oe=e("h3",{id:"run-headless-on-macos-linux-and-windows-1",tabindex:"-1"},[s("Run headless on macOS, Linux and Windows "),e("a",{class:"header-anchor",href:"#run-headless-on-macos-linux-and-windows-1","aria-hidden":"true"},"#")],-1),ie=e("p",null,"Launch from Command Line with:",-1),re=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"x open redis-vue")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),ae=t('<h2 id="configure-redis-sentinel-servers" tabindex="-1"><a href="https://github.com/ServiceStack/redis-config" target="_blank" rel="noopener noreferrer">Configure Redis Sentinel Servers</a> <a class="header-anchor" href="#configure-redis-sentinel-servers" aria-hidden="true">#</a></h2><p><a href="https://github.com/ServiceStack/redis-config" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/Assets/master/img/redis/instant-sentinel-setup.png" alt=""></a></p><p>See the <a href="https://github.com/ServiceStack/redis-config" target="_blank" rel="noopener noreferrer">redis config project</a> for a quick way to setup up the minimal <a href="https://github.com/ServiceStack/redis-config/blob/master/README.md#3x-sentinels-monitoring-1x-master-and-2x-slaves" target="_blank" rel="noopener noreferrer">highly available Redis Sentinel configuration</a> including start/stop scripts for instantly running multiple redis instances on a single (or multiple) Windows, OSX or Linux servers.</p>',3),le=[a,l,d,c,p,h,u,w,g,v,f,m,b,k,x,_,y,S,R,T,M,V,A,W,B,C,j,I,L,O,N,E,D,$,U,P,H,q,z,F,K,Y,G,J,X,Q,Z,ee,se,te,ne,oe,ie,re,ae];function de(ce,pe,he,ue,we,ge){return o(),i("div",null,le)}var me=n(r,[["render",de]]);export{fe as __pageData,me as default};
