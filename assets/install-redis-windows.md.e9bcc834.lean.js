import{_ as n,o,c as i,a as t,d as e,b as s}from"./app.0b863c35.js";const fe=`{"title":"Install Redis on Windows","description":"","frontmatter":{"title":"Install Redis on Windows"},"headers":[{"level":2,"title":"Option 1) Install Redis on Ubuntu on Windows","slug":"option-1-install-redis-on-ubuntu-on-windows"},{"level":2,"title":"Option 2) Running the latest version of Redis with Vagrant","slug":"option-2-running-the-latest-version-of-redis-with-vagrant"},{"level":2,"title":"Option 3) Running Microsoft's native port of Redis","slug":"option-3-running-microsoft-s-native-port-of-redis"},{"level":3,"title":"Current Version: 3.0.503 (June 28, 2016)","slug":"current-version-3-0-503-june-28-2016"},{"level":2,"title":"Redis Admin","slug":"redis-admin"},{"level":3,"title":"Run headless on macOS, Linux and Windows","slug":"run-headless-on-macos-linux-and-windows"},{"level":2,"title":"Redis Vue","slug":"redis-vue"},{"level":3,"title":"Run headless on macOS, Linux and Windows","slug":"run-headless-on-macos-linux-and-windows-1"},{"level":2,"title":"Configure Redis Sentinel Servers","slug":"configure-redis-sentinel-servers"}],"relativePath":"install-redis-windows.md"}`,r={},a=t("",13),l=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --daemonize yes")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),d=t("",5),c=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,[s("wget "),e("a",{href:"https://raw.github.com/ServiceStack/redis-windows/master/downloads/vagrant-redis.zip",target:"_blank",rel:"noopener noreferrer"},"https://raw.github.com/ServiceStack/redis-windows/master/downloads/vagrant-redis.zip")])])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),p=t("",9),h=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,[s("wget "),e("a",{href:"https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip",target:"_blank",rel:"noopener noreferrer"},"https://github.com/ServiceStack/redis-windows/raw/master/downloads/redis-latest.zip")])])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),u=t("",11),w=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"msiexec /i Redis-Windows-x64.msi")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),g=e("p",null,[e("strong",null,"set port and turn OFF firewall exception:")],-1),v=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,'msiexec /i Redis-Windows-x64.msi PORT=1234 ADD_FIREWALL_RULE=""')])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),f=e("p",null,[e("strong",null,"set port and turn ON firewall exception:")],-1),m=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"msiexec /i Redis-Windows-x64.msi PORT=1234 ADD_FIREWALL_RULE =1")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),b=e("p",null,[e("strong",null,"install with no user interface:")],-1),k=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"msiexec /quiet /i Redis-Windows-x64.msi")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),x=e("p",null,"If you did not install Redis using the MSI package, then you still run Redis as a Windows service by following these instructions:",-1),_=e("p",null,"In order to better integrate with the Windows Services model, new command line arguments have been introduced to Redis. These service arguments require an elevated user context in order to connect to the service control manager. If these commands are invoked from a non-elevated context, Redis will attempt to create an elevated context in which to execute these commands. This will cause a User Account Control dialog to be displayed by Windows and may require Administrative user credentials in order to proceed.",-1),y=e("h4",{id:"installing-the-service",tabindex:"-1"},[s("Installing the Service "),e("a",{class:"header-anchor",href:"#installing-the-service","aria-hidden":"true"},"#")],-1),S=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-install
`)])],-1),R=e("p",null,'This must be the first argument on the redis-server command line. Arguments after this are passed in the order they occur to Redis when the service is launched. The service will be configured as Autostart and will be launched as "NT AUTHORITY\\NetworkService". Upon successful installation, a success message will be displayed and Redis will exit.',-1),T=e("p",null,"This command does not start the service.",-1),M=e("p",null,"For instance:",-1),V=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-install redis.windows.conf --loglevel verbose")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),A=e("h4",{id:"uninstalling-the-service",tabindex:"-1"},[s("Uninstalling the Service "),e("a",{class:"header-anchor",href:"#uninstalling-the-service","aria-hidden":"true"},"#")],-1),W=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-uninstall
`)])],-1),B=e("p",null,"This will remove the Redis service configuration information from the registry. Upon successful uninstallation, a success message will be displayed and Redis will exit. This does command not to stop the service.",-1),C=e("p",null,"For instance:",-1),j=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-uninstall")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),I=e("h4",{id:"starting-the-service",tabindex:"-1"},[s("Starting the Service "),e("a",{class:"header-anchor",href:"#starting-the-service","aria-hidden":"true"},"#")],-1),L=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-start
`)])],-1),O=e("p",null,"This will start the Redis service. Upon successful startup, a success message will be displayed and Redis service will be started.",-1),N=e("p",null,"For instance:",-1),E=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-start")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),D=e("h4",{id:"stopping-the-service",tabindex:"-1"},[s("Stopping the Service "),e("a",{class:"header-anchor",href:"#stopping-the-service","aria-hidden":"true"},"#")],-1),$=e("div",{class:"language-"},[e("pre",null,[e("code",null,`--service-stop
`)])],-1),U=e("p",null,"This will stop the Redis service. Upon successful termination, a success message will be displayed and Redis will exit.",-1),P=e("p",null,"For instance:",-1),H=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"redis-server --service-stop")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),q=t("",6),z=e("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/AACZtTOcQbg?start=217",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1),F=e("p",null,[s("To launch as a stand-alone Desktop App, "),e("a",{href:"https://dotnet.microsoft.com/en-us/download",target:"_blank",rel:"noopener noreferrer"},"Install .NET SDK"),s(" and the "),e("a",{href:"/netcore-windows-desktop"},"Windows Desktop App tool"),s(":")],-1),K=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"dotnet tool install -g app")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),Y=e("p",null,"After install, open the Redis Admin Desktop from the command-line with:",-1),G=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"app open redis")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),J=t("",4),X=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"dotnet tool install -g x")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),Q=e("p",null,"Then launch from Command Line with:",-1),Z=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"x open redis")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),ee=t("",5),se=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"app open redis-vue")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),te=e("p",null,"Or from your browser at:",-1),ne=e("h3",{class:"text-3xl text-center"},[e("a",{href:"app://redis-vue"},"app://redis-vue")],-1),oe=e("h3",{id:"run-headless-on-macos-linux-and-windows-1",tabindex:"-1"},[s("Run headless on macOS, Linux and Windows "),e("a",{class:"header-anchor",href:"#run-headless-on-macos-linux-and-windows-1","aria-hidden":"true"},"#")],-1),ie=e("p",null,"Launch from Command Line with:",-1),re=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"x open redis-vue")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),ae=t("",3),le=[a,l,d,c,p,h,u,w,g,v,f,m,b,k,x,_,y,S,R,T,M,V,A,W,B,C,j,I,L,O,N,E,D,$,U,P,H,q,z,F,K,Y,G,J,X,Q,Z,ee,se,te,ne,oe,ie,re,ae];function de(ce,pe,he,ue,we,ge){return o(),i("div",null,le)}var me=n(r,[["render",de]]);export{fe as __pageData,me as default};
