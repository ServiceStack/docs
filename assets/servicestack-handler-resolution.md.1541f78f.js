import{_ as e,c as t,o as i,a as o}from"./app.6a524bd5.js";const H='{"title":"","description":"","frontmatter":{"slug":"servicestack-handler-resolution"},"headers":[],"relativePath":"servicestack-handler-resolution.md"}',a={},n=o("<p>This document explains how the handlers are resolved in ServiceStack, the moment the Context is passed on to the ServiceStackHttpHandlerFactory, and all the actions that happen along with it.</p><p>The order of execution is as below, and the first one to be match is executed.</p><ol><li>Iterates through the RawHttpHandlers in the order they were added to EndpointConfig.</li><li>If its a root request (&quot;/&quot;): <ul><li>Correct requests &quot;/default.aspx&quot; and &quot;/Default.aspx&quot; to &quot;/&quot;, as WebDav Server automatically appends them.</li><li>Iterate through CatchAllHandlers for a match, and if no match is found return DefaultHandler. (Note: DefaultHandler is DefaultHttpHandler if its hosted on the root path or running in a Mono environment. If not, it translates to NonRootModeDefaultHttpHandler)</li><li>Check if a file exists with the name DefaultRootFileName mentioned in the EndpointConfig. <ul><li>If it doesn&#39;t exist, return IndexPageHttpHandler</li><li>If exists, DefaultHttpHandler is invoked to serve the file if its an allowed extension. If not, ForbiddenHttpHandler is invoked.</li></ul></li></ul></li><li>Searches the Service Route Collection for the path. If found, RestHandler is invoked.</li><li>If its a file system path, and no matches so far: <ul><li>If its a directory, and it exists, but the path does not have the &quot;/&quot; suffix, RedirectHttpHandler invoked with the trailing &quot;/&quot;.</li><li>CatchAllHanders are checked for matches.</li><li>If file doesn&#39;t exist, NotFoundHttpHandler is invoked.</li><li>If exists, DefaultHttpHandler is invoked to serve the file if its an allowed extension. If not, ForbiddenHttpHandler is invoked.</li></ul></li><li>CatchAllHanders are checked for matches.</li><li>If FallbackRestPath is configured RestHander is invoked.</li><li>Resolution fails.</li></ol><p>TODO: This document is not complete, and is just a rough draft. There are still a few more attempts left in the resolution process.</p>",4),l=[n];function s(r,d,h,c,u,f){return i(),t("div",null,l)}var _=e(a,[["render",s]]);export{H as __pageData,_ as default};
