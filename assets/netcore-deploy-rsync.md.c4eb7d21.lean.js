import{_ as n,o as t,c as o,a,d as e,b as s}from"./app.82363d70.js";const C='{"title":"Deploying .NET Core Apps to Ubuntu with rsync","description":"","frontmatter":{"slug":"netcore-deploy-rsync","title":"Deploying .NET Core Apps to Ubuntu with rsync"},"headers":[{"level":2,"title":"Setup the deploy User Account","slug":"setup-the-deploy-user-account"},{"level":2,"title":"Setup supervisor","slug":"setup-supervisor"},{"level":3,"title":"/etc/supervisor/conf.d/web.myapp.conf","slug":"etc-supervisor-conf-d-web-myapp-conf"},{"level":2,"title":"Setup nginx","slug":"setup-nginx"},{"level":3,"title":"/etc/nginx/sites-available/myapp.example.org","slug":"etc-nginx-sites-available-myapp-example-org"},{"level":2,"title":"Setting up SSH keys","slug":"setting-up-ssh-keys"},{"level":2,"title":"Create the deployment script","slug":"create-the-deployment-script"}],"relativePath":"netcore-deploy-rsync.md"}',p={},r=a("",5),l=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"visudo")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),c=a("",5),i=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"sudo apt-get install supervisor")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),d=a("",8),u=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"ln -s /etc/nginx/sites-available/myapp.example.org /etc/nginx/sites-enabled/myapp.example.org")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),h=e("p",null,[s("After this we can tell nginx to reload its configuration, as there's nothing listening to "),e("code",null,"http://localhost:5001"),s(" yet nginx will return a 502 Bad Gateway response but will start working as soon as our deployed .NET Core Apps are up and running.")],-1),k=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"/etc/init.d/nginx reload")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),y=a("",8),v=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"npm run deploy")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),g=e("p",null,[s("Which deploys your published App to your remote Ubuntu server instance using "),e("code",null,"rsync"),s(" to only copy the incremental parts of the App that's changed (typically completing in <1s) and "),e("code",null,"ssh"),s(" to run a remote command to restart the "),e("code",null,"suprvisord"),s(" process, starting the .NET Core App with the latest deployed version.")],-1),m=[r,l,c,i,d,u,h,k,y,v,g];function w(b,_,x,f,A,S){return t(),o("div",null,m)}var L=n(p,[["render",w]]);export{C as __pageData,L as default};
