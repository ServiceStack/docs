import{_ as a}from"./chunks/servicestack-mqclients.e7cc67b5.js";import{_ as e}from"./chunks/servicestack-logical-view-02.2849f753.js";import{_ as t,c as p,o,a as n,b as s}from"./app.b24bcb4e.js";var c="/assets/mq-stats.4f85eeff.png";const T=`{"title":"Messaging API","description":"","frontmatter":{"slug":"messaging","title":"Messaging API"},"headers":[{"level":2,"title":"Mix in MQ Server","slug":"mix-in-mq-server"},{"level":2,"title":"Worker Service Templates","slug":"worker-service-templates"},{"level":2,"title":"MQ Stats on Admin UI Dashboard","slug":"mq-stats-on-admin-ui-dashboard"},{"level":2,"title":"Benefits of Message Queues","slug":"benefits-of-message-queues"},{"level":2,"title":"MQ Client Architecture","slug":"mq-client-architecture"},{"level":2,"title":"MQ Server Architecture","slug":"mq-server-architecture"},{"level":2,"title":"Message Workflow","slug":"message-workflow"},{"level":3,"title":"Messages with no responses are sent to '.outq' Topic","slug":"messages-with-no-responses-are-sent-to-outq-topic"},{"level":3,"title":"Messages with Responses are published to the Response .inq","slug":"messages-with-responses-are-published-to-the-response-inq"},{"level":3,"title":"Responses from Messages with ReplyTo are published to that address","slug":"responses-from-messages-with-replyto-are-published-to-that-address"},{"level":3,"title":"Messages with exceptions are re-tried then published to the dead-letter-queue (.dlq)","slug":"messages-with-exceptions-are-re-tried-then-published-to-the-dead-letter-queue-dlq"},{"level":3,"title":"Priority Queues","slug":"priority-queues"},{"level":3,"title":"OneWay HTTP Requests are published to MQ then executed","slug":"oneway-http-requests-are-published-to-mq-then-executed"},{"level":3,"title":"OneWay MQ and HTTP Service Clients are Substitutable","slug":"oneway-mq-and-http-service-clients-are-substitutable"},{"level":3,"title":"Disable 'outq' notification messages","slug":"disable-outq-notification-messages"},{"level":3,"title":"Flexible Queue Name strategies","slug":"flexible-queue-name-strategies"},{"level":2,"title":"Authenticated Requests via MQ","slug":"authenticated-requests-via-mq"},{"level":3,"title":"Embedding Auth Info in MQ Request DTO","slug":"embedding-auth-info-in-mq-request-dto"},{"level":3,"title":"Overriding MQ Request Headers","slug":"overriding-mq-request-headers"},{"level":3,"title":"Global Filters vs Action Filters","slug":"global-filters-vs-action-filters"},{"level":3,"title":"feature-mq","slug":"feature-mq"}],"relativePath":"messaging.md"}`,l={},i=n("",8),u=s("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[s("div",{class:"flex-grow bg-gray-800"},[s("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[s("p",null,"x mix [mq]")])]),s("div",{class:"flex"},[s("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[s("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),s("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),r=n("",118),k=s("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[s("div",{class:"flex-grow bg-gray-800"},[s("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[s("p",null,"x mix feature-mq")])]),s("div",{class:"flex"},[s("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[s("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),s("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[s("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),d=n("",8),h=[i,u,r,k,d];function g(m,v,y,f,w,q){return o(),p("div",null,h)}var A=t(l,[["render",g]]);export{T as __pageData,A as default};
