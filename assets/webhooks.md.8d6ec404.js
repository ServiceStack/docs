import{_ as o,c as n,o as s,a as t,b as e}from"./app.b7996e7c.js";const m='{"title":"Web Hooks","description":"","frontmatter":{"slug":"webhooks","title":"Web Hooks"},"headers":[{"level":2,"title":"ServiceStack.Webhooks","slug":"servicestack-webhooks"},{"level":2,"title":"Raising Events","slug":"raising-events"},{"level":2,"title":"Subscribing to Events","slug":"subscribing-to-events"},{"level":2,"title":"Consuming Events","slug":"consuming-events"}],"relativePath":"webhooks.md"}',a={},i=t('<p>Add Webhooks to your ServiceStack services, and allow other services to integrate with yours across the web.</p><h2 id="servicestack-webhooks" tabindex="-1"><a href="https://github.com/jezzsantos/servicestack.webhooks" target="_blank" rel="noopener noreferrer">ServiceStack.Webhooks</a> <a class="header-anchor" href="#servicestack-webhooks" aria-hidden="true">#</a></h2><p>The <a href="https://github.com/jezzsantos/servicestack.webhooks" target="_blank" rel="noopener noreferrer">WebHookFeature</a> plugin by <a href="https://github.com/jezzsantos" target="_blank" rel="noopener noreferrer">Jezz Santos</a> makes it very easy to expose webhook notifications from your ServiceStack services, and helps you manage your user&#39;s subscriptions to those webhooks.:</p>',3),r=e("div",{class:"nuget-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-700"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle text-lg text-white"},[e("p",null,[e("code",null,'<PackageReference Include="ServiceStack.Webhooks" Version="6.*" />')])])]),e("div",{class:"flex"},[e("div",{class:"bg-sky-500 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),c=t(`<p>By adding the <code>WebhookFeature</code> to the <code>AppHost</code> of your service, you automatically get all the pieces you need to raise and manage the events raised by your services.</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Configure</span><span class="token punctuation">(</span><span class="token class-name">Container</span> container<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">// Add ValidationFeature and AuthFeature plugins first</span>

    Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">WebhookFeature</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p><img src="https://raw.githubusercontent.com/jezzsantos/ServiceStack.Webhooks/master/docs/images/Webhooks.Architecture.PNG" alt=""></p><p>See <a href="https://github.com/jezzsantos/ServiceStack.Webhooks/wiki/Getting-Started" target="_blank" rel="noopener noreferrer">Getting Started</a> for more details.</p><h2 id="raising-events" tabindex="-1">Raising Events <a class="header-anchor" href="#raising-events" aria-hidden="true">#</a></h2><p>To raise events from your own services:</p><ol><li>Add the <code>IWebhooks</code> dependency to your service</li><li>Call: <code>IWebhooks.Publish&lt;TDto&gt;(string eventName, TDto data)</code></li></ol><p>As simple as this:</p><div class="language-"><pre><code>internal class HelloService : Service
{
    public IWebhooks Webhooks { get; set; }

    public HelloResponse Any(Hello request)
    {
        Webhooks.Publish(&quot;hello&quot;, new HelloEvent{ Text = &quot;I said hello&quot; });
    }
}
</code></pre></div><h2 id="subscribing-to-events" tabindex="-1">Subscribing to Events <a class="header-anchor" href="#subscribing-to-events" aria-hidden="true">#</a></h2><p>Subscribers to events raised by your services need to create a webhook subscription to those events.</p><p>They do this by POSTing something like the following, to your service:</p><div class="language-"><pre><code>POST /webhooks/subscriptions
{
    &quot;name&quot;: &quot;My Webhook&quot;,
    &quot;events&quot;: [&quot;hello&quot;, &quot;goodbye&quot;],
    &quot;config&quot;: {
        &quot;url&quot;: &quot;http://myserver/api/incoming&quot;,
    }
}
</code></pre></div><h2 id="consuming-events" tabindex="-1">Consuming Events <a class="header-anchor" href="#consuming-events" aria-hidden="true">#</a></h2><p>To consume events, a subscriber needs to provide a public HTTP POST endpoint on the internet that would receive the POSTed webhook event.</p><p>The URL to that endpoint is defined in the <code>config.url</code> of the subscription (above).</p><p>In the case of the &quot;hello&quot; event (raised above), the POSTed event sent to the subscriber&#39;s endpoint might look something like this:</p><div class="language-"><pre><code>POST http://myserver/hello HTTP/1.1
Accept: application/json
User-Agent: ServiceStack .NET Client 4.56
Accept-Encoding: gzip,deflate
X-Webhook-Delivery: 7a6224aad9c8400fb0a70b8a71262400
X-Webhook-Event: hello
Content-Type: application/json
Host: myserver
Content-Length: 26
Expect: 100-continue
Proxy-Connection: Keep-Alive

{
    &quot;Text&quot;: &quot;I said hello&quot;
}
</code></pre></div><p>To consume this event with a ServiceStack service, the subscriber would standup a public API like the one below, that could receive the &#39;Hello&#39; event. That might have been raised from another service with a call to <code>Webhooks.Publish(&quot;hello&quot;, new HelloEvent{ Text = &quot;I said hello&quot; })</code>:</p><div class="language-"><pre><code>internal class MyService : Service
{
    public void Post(HelloDto request)
    {
        // They said hello!
        var message = request.Text;

       
        // The event name, messaging metadata are included in the headers
        var eventName = Request.Headers[&quot;X-Webhook-Event&quot;];
        var deliveryId = Request.Headers[&quot;X-Webhook-Delivery&quot;];
        var signature = Request.Headers[&quot;X-Hub-Signature&quot;];
    }
}

[Route(&quot;/hello&quot;, &quot;POST&quot;)]
public class HelloDto
{
    public string Text { get; set; }
}
</code></pre></div><p>Note: Webhook events can be delivered securely to subscribers using signatures, that proves the authenticity of the sender only. Delivered events are never encrypted, and only signed. See <a href="https://github.com/jezzsantos/ServiceStack.Webhooks/wiki/Subscriber-Security" target="_blank" rel="noopener noreferrer">Subscriber Security</a> for more details.</p><h1 id="documentation" tabindex="-1"><a href="https://github.com/jezzsantos/ServiceStack.Webhooks/wiki" target="_blank" rel="noopener noreferrer">Documentation</a> <a class="header-anchor" href="#documentation" aria-hidden="true">#</a></h1><p>More documentation about how the <code>WebhookFeature</code> works, and how to customize it are available in <a href="https://github.com/jezzsantos/ServiceStack.Webhooks/wiki" target="_blank" rel="noopener noreferrer">here</a></p><h1 id="plugins" tabindex="-1">Plugins <a class="header-anchor" href="#plugins" aria-hidden="true">#</a></h1><ul><li><a href="https://github.com/jezzsantos/ServiceStack.Webhooks/wiki/Plugins" target="_blank" rel="noopener noreferrer">Custom sinks and stores</a></li></ul>`,25),l=[i,r,c];function u(h,p,d,b,v,k){return s(),n("div",null,l)}var w=o(a,[["render",u]]);export{m as __pageData,w as default};
