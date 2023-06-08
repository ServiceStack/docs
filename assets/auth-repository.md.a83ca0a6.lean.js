import{_ as a}from"./chunks/users-edit-default.473d8bf8.js";import{_ as t,o as e,c as o,a as n,d as s}from"./app.1dfbaa1d.js";const I='{"title":"Auth Repository","description":"","frontmatter":{"slug":"auth-repository","title":"Auth Repository"},"headers":[{"level":3,"title":"Auth Repository Admin APIs","slug":"auth-repository-admin-apis"},{"level":3,"title":"Mix in Auth Repository","slug":"mix-in-auth-repository"},{"level":3,"title":"Sync & Async Auth Repositories","slug":"sync-async-auth-repositories"},{"level":2,"title":"Extending UserAuth tables","slug":"extending-userauth-tables"},{"level":3,"title":"Adding additional metadata to the Meta dictionary fields","slug":"adding-additional-metadata-to-the-meta-dictionary-fields"},{"level":3,"title":"Linking referential data with RefId and RefIdStr fields","slug":"linking-referential-data-with-refid-and-refidstr-fields"},{"level":3,"title":"Extend UserAuthSession with your own typed Custom Session","slug":"extend-userauthsession-with-your-own-typed-custom-session"},{"level":3,"title":"IAuthRepository APIs","slug":"iauthrepository-apis"},{"level":3,"title":"Updating UserAuth tables directly","slug":"updating-userauth-tables-directly"},{"level":3,"title":"IManageRoles API","slug":"imanageroles-api"},{"level":3,"title":"Assigning Roles and Permissions","slug":"assigning-roles-and-permissions"},{"level":3,"title":"Customizing User Roles and Permissions","slug":"customizing-user-roles-and-permissions"},{"level":3,"title":"Microsoft Graph Roles","slug":"microsoft-graph-roles"},{"level":3,"title":"PBKDF2 Password Hashing implementation","slug":"pbkdf2-password-hashing-implementation"},{"level":3,"title":"Digest Auth Hashes only created when needed","slug":"digest-auth-hashes-only-created-when-needed"}],"relativePath":"auth-repository.md"}',p={},c=n("",12),l=s("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[s("div",{class:"flex-grow bg-gray-800"},[s("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[s("p",null,"x mix auth-db sqlserver")])]),s("div",{class:"flex"},[s("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[s("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),s("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),i=s("p",null,'You can view other Auth Repository "mix ins" available with:',-1),u=s("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[s("div",{class:"flex-grow bg-gray-800"},[s("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[s("p",null,"x mix [auth]")])]),s("div",{class:"flex"},[s("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[s("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),s("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),r=s("p",null,"Which displays the current list of available Auth Repositories:",-1),k=s("div",{class:"language-"},[s("pre",null,[s("code",null,`Results matching tag [auth]:

   1. auth              Configure AuthFeature                        to: $HOST  by @ServiceStack [auth]
   2. auth-db           Use OrmLite Auth Repository (requires auth)  to: $HOST  by @ServiceStack [auth]
   3. auth-redis        Use Redis Auth Repository (requires auth)    to: $HOST  by @ServiceStack [auth]
   4. auth-memory       Use Memory Auth Repository (requires auth)   to: $HOST  by @ServiceStack [auth]
   5. auth-dynamodb     Use DynamoDB Auth Repository (requires auth) to: $HOST  by @ServiceStack [auth]
   6. auth-mongodb      Use MongoDB Auth Repository (requires auth)  to: $HOST  by @ServiceStack [auth]
   7. auth-ravendb      Use RavenDB Auth Repository (requires auth)  to: $HOST  by @ServiceStack [auth]
   8. auth-marten       Use Marten Auth Repository (requires auth)   to: $HOST  by @ServiceStack [auth]
   9. feature-authrepo  List and Search Users in an Auth Repo        to: $HOST  by @ServiceStack [feature,auth]
`)])],-1),d=s("p",null,"and search the available RDBMS's and NoSQL Data Stores:",-1),h=s("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[s("div",{class:"flex-grow bg-gray-800"},[s("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[s("p",null,"x mix [db]")])]),s("div",{class:"flex"},[s("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[s("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),s("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),y=n("",91),g=[c,l,i,u,r,k,d,h,y];function m(w,A,f,v,b,S){return e(),o("div",null,g)}var T=t(p,[["render",m]]);export{I as __pageData,T as default};