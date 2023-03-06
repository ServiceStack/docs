import{_ as e,o as a,c as t,a as n}from"./app.3e36209f.js";const g='{"title":"Markdown Config","description":"","frontmatter":{"slug":"markdown-razor"},"headers":[{"level":3,"title":"Markdown Config","slug":"markdown-config"},{"level":2,"title":"Markdown Razor View Engine","slug":"markdown-razor-view-engine"},{"level":3,"title":"Configure","slug":"configure"},{"level":3,"title":"Extensible with custom base classes and Helpers","slug":"extensible-with-custom-base-classes-and-helpers"},{"level":2,"title":"MarkdownViewBase base class","slug":"markdownviewbase-base-class"},{"level":2,"title":"Compared with ASP.NET MVC Razor Syntax","slug":"compared-with-asp-net-mvc-razor-syntax"},{"level":3,"title":"Hello World Sample with Razor","slug":"hello-world-sample-with-razor"},{"level":3,"title":"Loops and Nested HTML Sample","slug":"loops-and-nested-html-sample"},{"level":3,"title":"Parens-Free","slug":"parens-free"},{"level":3,"title":"If-Blocks and Multi-line Statements","slug":"if-blocks-and-multi-line-statements"},{"level":3,"title":"Integrating Content and Code","slug":"integrating-content-and-code"},{"level":3,"title":"Identifying Nested Content","slug":"identifying-nested-content"},{"level":3,"title":"HTML Encoding","slug":"html-encoding"},{"level":2,"title":"Layout/MasterPage Scenarios - The Basics","slug":"layout-masterpage-scenarios-the-basics"},{"level":3,"title":"Simple Layout Example","slug":"simple-layout-example"},{"level":2,"title":"Layout/MasterPage Scenarios - Adding Section Overrides","slug":"layout-masterpage-scenarios-adding-section-overrides"},{"level":2,"title":"Encapsulation and Re-Use with HTML Helpers","slug":"encapsulation-and-re-use-with-html-helpers"},{"level":3,"title":"Code Based HTML Helpers","slug":"code-based-html-helpers"},{"level":2,"title":"Summary","slug":"summary"}],"relativePath":"markdown-razor.md"}',s={},o=n(`<h3 id="markdown-config" tabindex="-1">Markdown Config <a class="header-anchor" href="#markdown-config" aria-hidden="true">#</a></h3><p>An alternative to enabling the Markdown Razor View Engine is to use new <code>MarkdownConfig</code> API to specify which Markdown implementation to use in Razor and ServiceStack Template Markdown partials. By default it uses the built-in fast and lightweight MarkdownDeep implementation:</p><div class="language-csharp"><pre><code>MarkdownConfig<span class="token punctuation">.</span>Transformer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">MarkdownDeep<span class="token punctuation">.</span>Markdown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Providing a static API that can be used to transform Markdown to HTML with:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> markdown <span class="token operator">=</span> MarkdownConfig<span class="token punctuation">.</span><span class="token function">Transform</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>Alternative Markdown implementations can be used by providing an adapter for the <code>IMarkdownTransformer</code> interface:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IMarkdownTransformer</span>
<span class="token punctuation">{</span>
    <span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">Transform</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> markdown<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h2 id="markdown-razor-view-engine" tabindex="-1">Markdown Razor View Engine <a class="header-anchor" href="#markdown-razor-view-engine" aria-hidden="true">#</a></h2><p>Markdown Razor is the first HTML and Text (i.e. Markdown) view engine built into ServiceStack. The pages are simply plain-text Markdown surrounded by MVC Razor-like syntax to provide its enhanced dynamic functionality.</p><h3 id="configure" tabindex="-1">Configure <a class="header-anchor" href="#configure" aria-hidden="true">#</a></h3><p>Markdown Razor support is available by regitering the <code>MarkdownFormat</code> Plugin:</p><div class="language-csharp"><pre><code>Plugins<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MarkdownFormat</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// In ServiceStack.Razor</span>
</code></pre></div><h3 id="extensible-with-custom-base-classes-and-helpers" tabindex="-1">Extensible with custom base classes and Helpers <a class="header-anchor" href="#extensible-with-custom-base-classes-and-helpers" aria-hidden="true">#</a></h3><p>Markdown Razor is extensible in much the same way as MVC Razor is with the ability to define and use your own <strong>custom base class</strong>, <strong>Helpers</strong> and <strong>HtmlHelper</strong> extension methods. This allows you to call util methods on your base class or helpers directly from your templates.</p><p>You can define a base class for all your markdown pages by implementing <strong>MarkdownViewBase</strong> and register it in your AppHost with:</p><div class="language-csharp"><pre><code><span class="token function">SetConfig</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">HostConfig</span> <span class="token punctuation">{</span>
    <span class="token comment">//Replace prefix with the Url supplied</span>
    WebHostUrl <span class="token operator">=</span> <span class="token string">&quot;http://servicestack.net/docs&quot;</span><span class="token punctuation">,</span>   
    <span class="token comment">//Set base class for all Markdown pages</span>
    MarkdownBaseType <span class="token operator">=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CustomMarkdownPage</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
    <span class="token comment">//Define global Helpers e.g. at Ext.</span>
    MarkdownGlobalHelpers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> Type<span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span> 
        <span class="token punctuation">{</span><span class="token string">&quot;Ext&quot;</span><span class="token punctuation">,</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">CustomStaticHelpers</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>If a <strong>WebHostUrl</strong> is specified, it replaces all <strong>~/</strong> in all static website and Markdown pages with it. The <strong>MarkdownGlobalHelpers</strong> allow you to define global helper methods available to all your pages. This has the same effect of declaring it in your base class e.g:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomMarkdownPage</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MarkdownViewBase</span></span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">CustomStaticHelpers</span> Ext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CustomStaticHelpers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Which you can access in your pages via <strong>@Ext.MyHelper(Model)</strong>. Declaring instance methods on your custom base class allows you to access them without any prefix.</p><h2 id="markdownviewbase-base-class" tabindex="-1">MarkdownViewBase base class <a class="header-anchor" href="#markdownviewbase-base-class" aria-hidden="true">#</a></h2><p>By default the <strong>MarkdownViewBase</strong> class provides the following properties and hooks:</p><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MarkdownViewBase</span> 
<span class="token punctuation">{</span>
    <span class="token comment">//Access Config, resolve dependencies, etc.</span>
    <span class="token keyword">public</span> <span class="token class-name">IAppHost</span> AppHost<span class="token punctuation">;</span> 
    <span class="token comment">//This precompiled Markdown page with Metadata</span>
    <span class="token keyword">public</span> <span class="token class-name">MarkdownPage</span> MarkdownPage<span class="token punctuation">;</span> 
    <span class="token comment">//ASP.NET MVC&#39;s HtmlHelper</span>
    <span class="token keyword">public</span> <span class="token class-name">HtmlHelper</span> Html<span class="token punctuation">;</span> 
    <span class="token comment">//Flag to on whether you should you generate HTML or Markdown</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">bool</span></span> RenderHtml<span class="token punctuation">;</span> 

    <span class="token comment">/*
      All variables passed to and created by your page. 
      The Response DTO is stored and accessible via the &#39;Model&#39; variable.

      All variables and outputs created are stored in ScopeArgs which 
      is what&#39;s available to your website template. The Generated page 
      is stored in the &#39;Body&#39; variable.
    */</span>
    <span class="token keyword">public</span> <span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span><span class="token keyword">object</span><span class="token punctuation">&gt;</span></span> ScopeArgs<span class="token punctuation">;</span>

    <span class="token comment">//Called before page is executed</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">InitHelpers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> 

    <span class="token comment">//Called after page is executed before it&#39;s merged with website template if any</span>
    <span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnLoad</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>      
<span class="token punctuation">}</span>
</code></pre></div><p>See this websites <strong><a href="https://github.com/ServiceStack/ServiceStack.Examples/blob/master/src/Docs/Docs.Logic/CustomMarkdownPage.cs" target="_blank" rel="noopener noreferrer">CustomMarkdownPage.cs</a></strong> base class for an example on how to effectively use the base class to Resolve dependencies, inspect generated variables, generate <strong>PagesMenu</strong> and other dynamic variables for output in the static website template.</p><h2 id="compared-with-asp-net-mvc-razor-syntax" tabindex="-1">Compared with <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> MVC Razor Syntax <a class="header-anchor" href="#compared-with-asp-net-mvc-razor-syntax" aria-hidden="true">#</a></h2><p>For the best way to illustrate the similarities with <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a> MVC Razor syntax I will show examples of the Razor examples in <a href="http://twitter.com/scottgu" target="_blank" rel="noopener noreferrer">ScottGu&#39;s</a> introductory <a href="http://weblogs.asp.net/scottgu/archive/2010/07/02/introducing-razor.aspx" target="_blank" rel="noopener noreferrer">Introducing &quot;Razor&quot; - a new view engine for ASP.NET</a></p><p>Note: more context and the output for each snippet and example displayed is contained in the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.ServiceHost.Tests/Formats/IntroductionExampleTests.cs" target="_blank" rel="noopener noreferrer">Introductory Example</a> and <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.ServiceHost.Tests/Formats/IntroductionLayoutTests.cs" target="_blank" rel="noopener noreferrer">Introductory Layout</a> Unit tests. For reference most features of Mardown Razor view engine are captured in the <a href="https://github.com/ServiceStack/ServiceStack/blob/master/tests/ServiceStack.ServiceHost.Tests/Formats/TemplateTests.cs" target="_blank" rel="noopener noreferrer">Core Template Unit Tests</a></p><h3 id="hello-world-sample-with-razor" tabindex="-1">Hello World Sample with Razor <a class="header-anchor" href="#hello-world-sample-with-razor" aria-hidden="true">#</a></h3><p>The following basic page:</p><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_155D5078.png" alt=""></p><p>Can be generated in MVC Razor with:</p><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_3276E6B4.png" alt=""></p><p>And Markdown Razor with:</p><pre><code># Razor Example

###  Hello @name, the year is @DateTime.Now.Year

Checkout [this product](/Product/Details/@productId)
</code></pre><h3 id="loops-and-nested-html-sample" tabindex="-1">Loops and Nested HTML Sample <a class="header-anchor" href="#loops-and-nested-html-sample" aria-hidden="true">#</a></h3><p>The simple loop example:</p><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_155D5078.png" alt=""></p><p>With MVC Razor:</p><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_39360205.png" alt=""></p><p>With Markdown Razor:</p><pre><code>@foreach (var p in products) {
  - @p.Name: (@p.Price)
}
</code></pre><h3 id="parens-free" tabindex="-1">Parens-Free <a class="header-anchor" href="#parens-free" aria-hidden="true">#</a></h3><p>At this point I think it would be a good to introduce some niceties in Markdown Razor of its own. Borrowing a page out of <a href="http://twitter.com/BrendanEich" target="_blank" rel="noopener noreferrer">BrendanEich</a> proposal for <a href="http://jashkenas.github.com/coffee-script/" target="_blank" rel="noopener noreferrer">CoffeeScript&#39;s</a> inspired <a href="http://brendaneich.com/2010/11/paren-free/" target="_blank" rel="noopener noreferrer">Parens free syntax</a> for JS.Next - you can simply remove the parens from all block statements e.g:</p><pre><code>@foreach var p in products {
  - @p.Name: (@p.Price)
}
</code></pre><p>Produces the same output, and to go one step further you can remove the redundant <strong>var</strong> as well \u{1F603}</p><pre><code>@foreach p in products {
  - @p.Name: (@p.Price)
}
</code></pre><p>Which makes the Markdown Razor&#39;s version a bit more wrist-friendly then its MVCs cousin \u{1F603}</p><h3 id="if-blocks-and-multi-line-statements" tabindex="-1">If-Blocks and Multi-line Statements <a class="header-anchor" href="#if-blocks-and-multi-line-statements" aria-hidden="true">#</a></h3><h4 id="if-statements-in-mvc-razor" tabindex="-1">If statements in MVC Razor: <a class="header-anchor" href="#if-statements-in-mvc-razor" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_4C76B8A4.png" alt=""></p><h4 id="if-statements-in-markdown-razor" tabindex="-1">If statements in Markdown Razor: <a class="header-anchor" href="#if-statements-in-markdown-razor" aria-hidden="true">#</a></h4><pre><code>@if (products.Count == 0) {
Sorry - no products in this category
} else {
We have products for you!
}
</code></pre><h4 id="multi-line-and-multi-token-statements" tabindex="-1">Multi-line and Multi-token statements <a class="header-anchor" href="#multi-line-and-multi-token-statements" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_4B321FC5.png" alt=""></p><p>Markdown Razor doesn&#39;t support multi-line or multi-token statements, instead you are directed to take advantage for variable syntax declarations, e.g:</p><h4 id="markdown-replacement-for-multi-line-statements" tabindex="-1">Markdown replacement for Multi-line Statements <a class="header-anchor" href="#markdown-replacement-for-multi-line-statements" aria-hidden="true">#</a></h4><pre><code>@var number = 1
@var message = &quot;&quot;Number is &quot;&quot; + number

Your Message: @message
</code></pre><h3 id="integrating-content-and-code" tabindex="-1">Integrating Content and Code <a class="header-anchor" href="#integrating-content-and-code" aria-hidden="true">#</a></h3><p>Does it break with email addresses and other usages of in HTML?</p><h4 id="with-mvc-razor" tabindex="-1">With MVC Razor <a class="header-anchor" href="#with-mvc-razor" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_22B33DB1.png" alt=""></p><h4 id="with-markdown-razor" tabindex="-1">With Markdown Razor <a class="header-anchor" href="#with-markdown-razor" aria-hidden="true">#</a></h4><pre><code>Send mail to scottgu@microsoft.com telling him the time: @DateTime.Now.
</code></pre><p>Both View engines generate the expected output, e.g:</p><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_20963EE8.png" alt=""></p><h3 id="identifying-nested-content" tabindex="-1">Identifying Nested Content <a class="header-anchor" href="#identifying-nested-content" aria-hidden="true">#</a></h3><h4 id="with-mvc-razor-1" tabindex="-1">With MVC Razor <a class="header-anchor" href="#with-mvc-razor-1" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_4A2A0A1B.png" alt=""></p><h4 id="with-markdown-razor-1" tabindex="-1">With Markdown Razor <a class="header-anchor" href="#with-markdown-razor-1" aria-hidden="true">#</a></h4><pre><code>@if (DateTime.Now.Year == 2011) {
If the year is 2011 then print this 
multi-line text block and 
the date: @DateTime.Now
}
</code></pre><p>Markdown Razor doesn&#39;t need to do anything special with text blocks since all it does is look for the ending brace &#39;}&#39;. This means if you want to output a brace literal &#39;{&#39; then you have to double escape it with &#39; or &#39;.</p><h3 id="html-encoding" tabindex="-1">HTML Encoding <a class="header-anchor" href="#html-encoding" aria-hidden="true">#</a></h3><p>Markdown Razor follows MVC Markdown behaviour where by default content emitted using a @ block is automatically HTML encoded to better protect against XSS attack scenarios.</p><p>If you want to avoid HTML Encoding you have the same options as MVC Razor where you can wrap your result in <strong>@Html.Raw(htmlString)</strong> or if you&#39;re using an Extension method simply return a <strong>MvcHtmlString</strong> instead of a normal string.</p><p>Markdown also lets you mix and match HTML in your markdown although any markdown between the tags does not get converted to HTML. To tell Markdown Razor to evaulate the contents inside html <strong>&lt;tag&gt;...&lt;/tag&gt;</strong>&#39;s need to prefixed with <code>^</code>, e.g. (taken from the <a href="https://raw.github.com/ServiceStack/ServiceStack.Examples/master/src/Docs/Views/Search.md" target="_blank" rel="noopener noreferrer">/Views/Search.md</a> page):</p><pre><code>^&lt;div id=&quot;searchresults&quot;&gt;

@foreach page in Model.Results {
### @page.Category &gt; [@page.Name](@page.AbsoluteUrl)
@page.Content
}

^&lt;/div&gt;
</code></pre><p>If we didn&#39;t prefix <code>^</code> we would see <code>### @page.Category ...</code> repeating.</p><h2 id="layout-masterpage-scenarios-the-basics" tabindex="-1">Layout/MasterPage Scenarios - The Basics <a class="header-anchor" href="#layout-masterpage-scenarios-the-basics" aria-hidden="true">#</a></h2><p>Markdown Razor actually deviates a bit from MVC Razor&#39;s handling of master layout pages and website templates (we believe for the better \u{1F603}.</p><h3 id="simple-layout-example" tabindex="-1">Simple Layout Example <a class="header-anchor" href="#simple-layout-example" aria-hidden="true">#</a></h3><h4 id="mvc-razor-s-example-of-a-simple-website-template" tabindex="-1">MVC Razor&#39;s example of a simple website template <a class="header-anchor" href="#mvc-razor-s-example-of-a-simple-website-template" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_55CF2B80.png" alt=""></p><p>Rather then using a magic method like <code>@RenderBody()</code> we treat the output Body of View as just another variable storing the output a in a variable called <strong>&#39;Body&#39;</strong>. This way we use the same mechanism to embed the body like any other variable i.e. following the place holder convention of <strong>&lt;--@VarName--&gt;</strong> so to embed the View page output in the above master template you would do:</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Simple Site&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;div id=&quot;&quot;header&quot;&quot;&gt;
            &lt;a href=&quot;&quot;/&quot;&quot;&gt;Home&lt;/a&gt;
            &lt;a href=&quot;&quot;/About&quot;&quot;&gt;About&lt;/a&gt;
        &lt;/div&gt;
    
        &lt;div id=&quot;&quot;body&quot;&quot;&gt;
            &lt;!--@Body--&gt;
        &lt;/div&gt;

    &lt;/body&gt;
&lt;/html&gt;
</code></pre><p>By default we use convention to select the appropriate website template for the selected view where it uses the nearest <strong>default.shtml</strong> static template it finds, looking first in the current directory than up parent directories.</p><p>Your View page names must be unique but can live anywhere in your <strong>/View</strong> directory so you are free to structure your website templates and view pages accordingly. If for whatever reason you need more granularity in selecting website templates than we provide similar options to MVC for selecting a custom template:</p><h4 id="select-custom-template-with-mvc-razor" tabindex="-1">Select Custom Template with MVC Razor <a class="header-anchor" href="#select-custom-template-with-mvc-razor" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_3B228F67.png" alt=""></p><h4 id="with-markdown-razor-2" tabindex="-1">With Markdown Razor <a class="header-anchor" href="#with-markdown-razor-2" aria-hidden="true">#</a></h4><pre><code>@Layout ~/websiteTemplate

# About this Site

This is some content that will make up the &quot;&quot;about&quot;&quot; 
page of our web-site. We&#39;ll use this in conjunction
with a layout template. The content you are seeing here
comes from ^^^websiteTemplate.

And obviously I can have code in here too. Here is the
current date/year: @DateTime.Now.Year
</code></pre><p>Note: In addition to <strong>@Layout</strong> we also support the more appropriate alias of <strong>@template</strong>.</p><h2 id="layout-masterpage-scenarios-adding-section-overrides" tabindex="-1">Layout/MasterPage Scenarios - Adding Section Overrides <a class="header-anchor" href="#layout-masterpage-scenarios-adding-section-overrides" aria-hidden="true">#</a></h2><p>MVC Razor allows you to define <strong>sections</strong> in your view pages which you can embed in your Master Template:</p><h4 id="with-mvc-razor-2" tabindex="-1">With MVC Razor: <a class="header-anchor" href="#with-mvc-razor-2" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_448B2810.png" alt=""></p><p>And you use in your website template like so:</p><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_6D0A0A24.png" alt=""></p><h4 id="with-markdown-razor-3" tabindex="-1">With Markdown Razor: <a class="header-anchor" href="#with-markdown-razor-3" aria-hidden="true">#</a></h4><p>Markdown Razor supports the same <strong>@section</strong> construct but allows you to embed it in your template via the standard variable substitution convention, e.g:</p><pre><code>@Layout ~/websiteTemplate

# About this Site

This is some content that will make up the &quot;&quot;about&quot;&quot; 
page of our web-site. We&#39;ll use this in conjunction
with a layout template. The content you are seeing here
comes from ^^^websiteTemplate.

And obviously I can have code in here too. Here is the
current date/year: @DateTime.Now.Year

@section Menu {
  - About Item 1
  - About Item 2
}

@section Footer {
This is my custom footer for Home
}
</code></pre><p>And these sections and body can be used in the website template like:</p><pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Simple Site&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;div id=&quot;header&quot;&gt;
            &lt;a href=&quot;/&quot;&gt;Home&lt;/a&gt;
            &lt;a href=&quot;/About&quot;&gt;About&lt;/a&gt;
        &lt;/div&gt;
    
        &lt;div id=&quot;left-menu&quot;&gt;
            &lt;!--@Menu--&gt;
        &lt;/div&gt;
    
        &lt;div id=&quot;body&quot;&gt;
            &lt;!--@Body--&gt;
        &lt;/div&gt;
    
        &lt;div id=&quot;footer&quot;&gt;
            &lt;!--@Footer--&gt;
        &lt;/div&gt;

    &lt;/body&gt;
&lt;/html&gt;
</code></pre><h2 id="encapsulation-and-re-use-with-html-helpers" tabindex="-1">Encapsulation and Re-Use with HTML Helpers <a class="header-anchor" href="#encapsulation-and-re-use-with-html-helpers" aria-hidden="true">#</a></h2><p>In order to encapsulate and better be able to re-use HTML Helper utils MVC Razor includes a few different ways to componentize and re-use code with HTMLHelper extension methods and declarative helpers.</p><h3 id="code-based-html-helpers" tabindex="-1">Code Based HTML Helpers <a class="header-anchor" href="#code-based-html-helpers" aria-hidden="true">#</a></h3><h4 id="htmlhelper-extension-methods-with-mvc-razor" tabindex="-1">HtmlHelper extension methods with MVC Razor: <a class="header-anchor" href="#htmlhelper-extension-methods-with-mvc-razor" aria-hidden="true">#</a></h4><p><img src="https://aspblogs.blob.core.windows.net/media/scottgu/Media/image_thumb_150C9377.png" alt=""></p><p>Since we&#39;ve ported MVC&#39;s HtmlHelper and its <strong>Label</strong>, <strong>TextBox</strong> extensions we can do something similar although to make this work we need to inherit from the <strong>MarkdownViewBase&lt;TModel&gt;</strong> generic base class so we know what Model to provide the strong-typed extensions for. You can do this using the <strong>@model</strong> directive specifying the full type name:</p><pre><code>@model ServiceStack.ServiceHost.Tests.Formats.Product
&lt;fieldset&gt;
    &lt;legend&gt;Edit Product&lt;/legend&gt;

    &lt;div&gt;
        @Html.LabelFor(m =&gt; m.ProductID)
    &lt;/div&gt;
    &lt;div&gt;
        @Html.TextBoxFor(m =&gt; m.ProductID)
    &lt;/div&gt;
&lt;/fieldset&gt;
</code></pre><p>Whilst we ported most of MVC HtmlHelper extension methods as-is, we did rip out all the validation logic which appeared to be unnecessarily complex and too coupled with MVC&#39;s code-base.</p><p>Note: Just as it is in MVC the <strong>@model</strong> directive is a shorthand (which Markdown Razor also supports) for:</p><p><strong>@inherits Namespace.BaseType&lt;Namespace.ModelType&gt;</strong></p><p>Whilst we don&#39;t support MVC Razors quasi C# quasi-html approach of defining declarative helpers, we do allow you to on a per instance basis (or globally) import helpers in custom Fields using the <strong>@helper</strong> syntax:</p><pre><code>@helper Prod: MyHelpers.ExternalProductHelper

&lt;fieldset&gt;
    &lt;legend&gt;All Products&lt;/legend&gt;
    @Prod.ProductTable(Model)
&lt;/fieldset
</code></pre><p>You can register Global helpers and a custom base class using the <strong>MarkdownGlobalHelpers</strong> and <strong>MarkdownBaseType</strong> AppHost Config options as shown at the top of this article.</p><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-hidden="true">#</a></h2><p>Well that&#39;s it for the comparison between MVC Razor and Markdown Razor as you can see the knowledge is quite transferable with a lot of cases the syntax is exactly the same.</p><p>As good as MVC Razor is with its wrist-friendly and expressive syntax, we believe Razor Markdown is even better! Where thanks to Markdown you can even dispense with most of HTML&#39;s boiler plage angle brackets \u{1F603} We think it makes an ideal solution for content heavy websites like this one.</p><p>Unlike <a href="http://ASP.NET" target="_blank" rel="noopener noreferrer">ASP.NET</a>&#39;s MVC Razor, Markdown Razor like all of ServiceStack is <strong>completely Open Source</strong> and as such we welcome the contribution from the community via new features, Unit and regression tests, etc.</p><h1 id="community-resources" tabindex="-1">Community Resources <a class="header-anchor" href="#community-resources" aria-hidden="true">#</a></h1><ul><li><a href="http://www.ipreferjim.com/2012/07/servicestacks-markdown-razor-engine-wow/" target="_blank" rel="noopener noreferrer">ServiceStack\u2019s Markdown Razor Engine. Wow.</a> by <a href="https://twitter.com/ipreferjim" target="_blank" rel="noopener noreferrer">@ipreferjim</a></li><li><a href="http://jaspreetchahal.org/servicestack-markdown-norender-master-layout-page-render-partial-content/" target="_blank" rel="noopener noreferrer">ServiceStack Markdown NoRender Master Layout Page, Render partial content</a></li></ul>`,120),r=[o];function i(l,p,c,d,h,u){return a(),t("div",null,r)}var w=e(s,[["render",i]]);export{g as __pageData,w as default};
