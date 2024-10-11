import{_ as s,a as e,b as t}from"./chunks/flutter-mix-android-run-configs.c01843f6.js";import{_ as o,o as p,c,d as n,b as a,a as l}from"./app.3ff27770.js";var r="/assets/flutter-grpc-mix-lib-files.8d9be99d.png";const C='{"title":"Flutter gRPC Mix Template","description":"","frontmatter":{"slug":"flutter-grpc-mix","title":"Flutter gRPC Mix Template"},"headers":[{"level":2,"title":"Pre-requisites","slug":"pre-requisites"},{"level":2,"title":"New or Existing Project","slug":"new-or-existing-project"},{"level":2,"title":"Project Structure","slug":"project-structure"},{"level":2,"title":"Running","slug":"running"},{"level":3,"title":"ServiceStack App","slug":"servicestack-app"},{"level":3,"title":"Flutter App","slug":"flutter-app"},{"level":2,"title":"Development","slug":"development"},{"level":3,"title":"Flutter main.dart","slug":"flutter-main-dart"},{"level":3,"title":"Flutter Template Overview","slug":"flutter-template-overview"},{"level":3,"title":"Calling the Hello API","slug":"calling-the-hello-api"},{"level":3,"title":"Updating your client DTOs","slug":"updating-your-client-dtos"},{"level":3,"title":"Make your service support gRPC","slug":"make-your-service-support-grpc"},{"level":3,"title":"Questions?","slug":"questions"}],"relativePath":"flutter-grpc-mix.md"}',i={},u=n("p",null,[a("Two mix templates to help you build services with Flutter clients are the "),n("code",null,"flutter"),a(" and "),n("code",null,"flutter-grpc"),a(" mix templates.")],-1),d=n("p",null,[a("In this walk through we will be focusing on "),n("code",null,"mix flutter-grpc"),a(" template. See "),n("a",{href:"./flutter-mix.html"},[a("here for details on "),n("code",null,"mix flutter")]),a(".")],-1),k=n("iframe",{class:"video-hd",src:"https://www.youtube.com/embed/fgts6sQ2Ags",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""},null,-1),h=l(`<p>These templates create a new Flutter application using your locally installed <a href="https://docs.flutter.dev/get-started/install" target="_blank" rel="noopener noreferrer">Flutter SDK</a> that comes wired up to the ServiceStack project template it is mixed into.</p><p>These mix templates can be added to ServiceStack templated projects using the <a href="./dotnet-tool.html">ServiceStack dotnet x tool</a>, which can be installed using the command:</p><div class="language-bash"><pre><code>$ dotnet tool <span class="token function">install</span> <span class="token parameter variable">--global</span> x 
</code></pre></div><h2 id="pre-requisites" tabindex="-1">Pre-requisites <a class="header-anchor" href="#pre-requisites" aria-hidden="true">#</a></h2><ul><li>Flutter SDK</li><li>Dart SDK</li><li>ServiceStack dotnet x tool</li></ul><p><img src="`+s+`" alt=""></p><h2 id="new-or-existing-project" tabindex="-1">New or Existing Project <a class="header-anchor" href="#new-or-existing-project" aria-hidden="true">#</a></h2><p>The Flutter integration works with ServiceStack <code>grpc</code> template that has been <em>configured to support gRPC services</em>. It also makes the assumption that when working locally, the initial Flutter application will connect to the ServiceStack gRPC services via <code>localhost:5054</code> or if the client is running on an Android Emulator, <code>10.0.0.2:5054</code>. <code>5054</code> is the insecure HTTP port that is used by the <code>grpc</code> project template, but if you want to add <code>grpc</code> support to your application using <code>x mix grpc</code>, be sure to set up the use of the same port for local development, or modify your Flutter client to match your server setup.</p><p>For example, you could <a href="./dotnet-new.html">start with a new</a> <code>grpc</code> ServiceStack project to host your services via gRPC, and add a working Flutter client which connects via gRPC using the mix template.</p><div class="language-bash"><pre><code>$ x new grpc MyApp
</code></pre></div><p>Then from your new solution directory <code>MyApp</code>, mix in the Flutter application using:</p><div class="language-bash"><pre><code>$ x mix flutter-grpc
</code></pre></div><h2 id="project-structure" tabindex="-1">Project Structure <a class="header-anchor" href="#project-structure" aria-hidden="true">#</a></h2><p>The <code>x mix flutter-grpc</code> template uses your locally installed Flutter SDK to create the initial Flutter application via the <code>flutter create</code> command. It then overrides some source files, and adds some required Dart dependencies to facilitate the integration with your gRPC services.</p><p><img src="`+e+`" alt=""></p><h2 id="running" tabindex="-1">Running <a class="header-anchor" href="#running" aria-hidden="true">#</a></h2><p>To develop on your Flutter client, it is best to take advantage of the hot reload functionality of both Flutter and <code>dotnet watch</code>.</p><h3 id="servicestack-app" tabindex="-1">ServiceStack App <a class="header-anchor" href="#servicestack-app" aria-hidden="true">#</a></h3><p>From your <code>grpc</code> project directory, navigate into your <code>MyApp</code> AppHost directory and run:</p><div class="language-bash"><pre><code>$ dotnet <span class="token function">watch</span>
</code></pre></div><p>The <code>grpc</code> template is pre-configured listening on 3 ports in the <code>appsettings.json</code>.</p><ul><li><code>https://*:5001</code> - Http1 - Normal Web Service Access</li><li><code>https://*:5051</code> - Http2 - Grpc Secure</li><li><code>http://*:5054</code> - Http2 - Grpc Insecure</li></ul><p>When developing locally, the Flutter client application accesses gRPC services using the <code>GrpcInsecure</code> endpoints using port <code>5054</code>.</p><p>Keep your services running, and open your <code>myapp_flutter</code> directory using <a href="https://developer.android.com/studio/install" target="_blank" rel="noopener noreferrer">Android Studio</a>.</p><h3 id="flutter-app" tabindex="-1">Flutter App <a class="header-anchor" href="#flutter-app" aria-hidden="true">#</a></h3><p>When building application in flutter, you can use various <a href="https://docs.flutter.dev/get-started/editor?tab=androidstudio" target="_blank" rel="noopener noreferrer">IDEs or editors</a>, but in this example we will be using Android Studio. Flutter applications are written in the <a href="https://dart.dev/overview" target="_blank" rel="noopener noreferrer">Dart Language</a>, and since both are developed by Google, there are great resources for <a href="https://dart.dev/guides" target="_blank" rel="noopener noreferrer">learning both the Dart Language</a>, and the <a href="https://docs.flutter.dev/reference/tutorials" target="_blank" rel="noopener noreferrer">Flutter Framework</a>, included <a href="https://docs.flutter.dev/get-started/flutter-for/xamarin-forms-devs" target="_blank" rel="noopener noreferrer">dedicated resources for those familiar with Xamarin.Forms</a>.</p><p>When developing on Windows, Android Studio will automatically support <code>web</code> and <code>desktop</code> targets, as well as making it easier to set up and manage Android Emulated devices.</p><p><img src="`+t+'" alt=""></p><h2 id="development" tabindex="-1">Development <a class="header-anchor" href="#development" aria-hidden="true">#</a></h2><p>From Android Studio, you can target multiple platforms including Windows, Web and Android. If you are on Windows, targeting a Windows Desktop application can provide a rapid development cycle as Flutter Hot Reload works well and performs quickly. And since ServiceStack can generate client <a href="http://msdn.microsoft.com/en-us/library/ff649585.aspx" target="_blank" rel="noopener noreferrer">Data Transfer Objects</a> or DTOs, we can have a <a href="./add-servicestack-reference">typed end-to-end service integration</a> when developing Flutter client applications.</p><h3 id="flutter-main-dart" tabindex="-1">Flutter <code>main.dart</code> <a class="header-anchor" href="#flutter-main-dart" aria-hidden="true">#</a></h3><p>The <code>x mix flutter-grpc</code> command provides a customized <code>main.dart</code> with a built-in integration of the <code>Hello</code> API service of your local ServiceStack application using gRPC.</p><p>It has pre-generated gRPC <code>services.proto</code> for which dart code is also generated to enable this integration.</p><p><img src="'+r+`" alt=""></p><p>ServiceStack <a href="./grpc#proto-options">generates this <code>.proto</code></a> file used by the client and then provides <a href="/grpc#public-grpc-protoc-service-and-ui">tooling through the dotnet <code>x</code> tool to generate gRPC client code in Dart</a>, or multiple other languages.</p><p>The Flutter client application itself uses Dart libraries like <a href="https://pub.dev/packages/protobuf" target="_blank" rel="noopener noreferrer"><code>protobuf</code></a> from Google, the <a href="https://pub.dev/packages/grpc" target="_blank" rel="noopener noreferrer"><code>grpc</code></a> from the Dart team and leverages the optimized <a href="https://pub.dev/packages/servicestack" target="_blank" rel="noopener noreferrer"><code>servicestack</code> package</a> to improve the development experience.</p><p>Since your ServiceStack application host generates the <code>.proto</code> file, you can use any other standard gRPC tooling with this file if you prefer.</p><div class="language-dart"><pre><code><span class="token keyword">var</span> host <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;localhost&quot;</span></span><span class="token punctuation">;</span>
<span class="token keyword">var</span> channel <span class="token operator">=</span> <span class="token class-name">ClientChannel</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">5054</span><span class="token punctuation">,</span>
  options<span class="token punctuation">:</span><span class="token keyword">const</span> <span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">insecure</span><span class="token punctuation">(</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> client <span class="token operator">=</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">runApp</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The use of Android Emulators for local development is catered for by checking if the application is not in release mode, is not a web platform and if it is running on the Android platform.</p><div class="language-dart"><pre><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>kReleaseMode <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>kIsWeb<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Platform</span><span class="token punctuation">.</span>isAndroid<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    host <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;10.0.2.2&quot;</span></span><span class="token punctuation">;</span>
    channel <span class="token operator">=</span> <span class="token class-name">ClientChannel</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">:</span><span class="token number">5054</span><span class="token punctuation">,</span>
        options<span class="token punctuation">:</span><span class="token keyword">const</span> <span class="token class-name">ChannelOptions</span><span class="token punctuation">(</span>credentials<span class="token punctuation">:</span> <span class="token class-name">ChannelCredentials</span><span class="token punctuation">.</span><span class="token function">insecure</span><span class="token punctuation">(</span>
        <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    client <span class="token operator">=</span> <span class="token class-name">GrpcServicesClient</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>This is done since Android Emulators have limited network access, and can only access the ServiceStack application running on the host. Android can only communicate with the host via the <a href="https://developer.android.com/studio/run/emulator-networking" target="_blank" rel="noopener noreferrer">aliased <code>10.0.2.2</code> IP address from the running emulator</a>.</p><h3 id="flutter-template-overview" tabindex="-1">Flutter Template Overview <a class="header-anchor" href="#flutter-template-overview" aria-hidden="true">#</a></h3><p>Flutter applications use <a href="https://docs.flutter.dev/development/ui/widgets-intro" target="_blank" rel="noopener noreferrer"><code>Widgets</code></a> to build everything you see in a Flutter application.</p><blockquote><p>Widgets describe what their view should look like given their current configuration and state. When a widget\u2019s state changes, the widget rebuilds its description, which the framework diffs against the previous description in order to determine the minimal changes needed in the underlying render tree to transition from one state to the next.</p></blockquote><p>The <code>MyApp</code> widget is the entry point of our application, and the <code>MaterialApp</code> to default your Flutter application to use <a href="https://docs.flutter.dev/development/ui/material" target="_blank" rel="noopener noreferrer">Material Design</a> as a style or theme.</p><div class="language-dart"><pre><code><span class="token keyword">class</span> <span class="token class-name">MyApp</span> <span class="token keyword">extends</span> <span class="token class-name">StatelessWidget</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token class-name">MyApp</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">.</span>key<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// This widget is the root of your application.</span>
  <span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">MaterialApp</span><span class="token punctuation">(</span>
      title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Flutter Demo&#39;</span></span><span class="token punctuation">,</span>
      theme<span class="token punctuation">:</span> <span class="token class-name">ThemeData</span><span class="token punctuation">(</span>
        primarySwatch<span class="token punctuation">:</span> <span class="token class-name">Colors</span><span class="token punctuation">.</span>blue<span class="token punctuation">,</span>
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
      home<span class="token punctuation">:</span> <span class="token keyword">const</span> <span class="token class-name">HelloFlutter</span><span class="token punctuation">(</span>title<span class="token punctuation">:</span> <span class="token string-literal"><span class="token string">&#39;Flutter Demo Home Page&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// Your app starts here</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The <code>HelloFlutter</code> widget is a <a href="https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html" target="_blank" rel="noopener noreferrer"><code>StatefulWidget</code></a> which references the <code>HelloFlutterState</code> class where the UI is declared and updates are made to the Flutter UI.</p><p>The example application listens for changes from the <code>TextField</code> using a <code>TextEditingController</code>, binding a <code>callService</code> method which fires whenever a change is made.</p><div class="language-dart"><pre><code><span class="token keyword">class</span> <span class="token class-name">HelloFlutterState</span> <span class="token keyword">extends</span> <span class="token class-name">State</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">HelloFlutter</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>
  <span class="token comment">//State for this widget</span>
  <span class="token class-name">String</span> result <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;&quot;</span></span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> myController <span class="token operator">=</span> <span class="token class-name">TextEditingController</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

  <span class="token metadata function">@override</span>
  <span class="token keyword">void</span> <span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">initState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Listen for changes from the TextField and call our API</span>
    myController<span class="token punctuation">.</span><span class="token function">addListener</span><span class="token punctuation">(</span>callService<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">void</span> <span class="token function">callService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> text <span class="token operator">=</span> myController<span class="token punctuation">.</span>text<span class="token punctuation">.</span>isEmpty <span class="token operator">?</span> <span class="token string-literal"><span class="token string">&quot;World&quot;</span></span> <span class="token punctuation">:</span> myController<span class="token punctuation">.</span>text<span class="token punctuation">;</span>
    <span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span><span class="token class-name">Hello</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      result <span class="token operator">=</span> response<span class="token punctuation">.</span>result<span class="token operator">!</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
<span class="token metadata function">@override</span>
  <span class="token class-name">Widget</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token class-name">BuildContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token class-name">Scaffold</span><span class="token punctuation">(</span><span class="token comment">//...</span>
      body<span class="token punctuation">:</span> <span class="token class-name">Center</span><span class="token punctuation">(</span><span class="token comment">//..</span>
        <span class="token class-name">TextField</span><span class="token punctuation">(</span><span class="token comment">//..</span>
          controller<span class="token punctuation">:</span> myController<span class="token punctuation">,</span>
      <span class="token punctuation">)</span>
</code></pre></div><h3 id="calling-the-hello-api" tabindex="-1">Calling the Hello API <a class="header-anchor" href="#calling-the-hello-api" aria-hidden="true">#</a></h3><p>The <code>callService</code> method is an <code>async</code> method where Dart has a familiar syntax to dotnet. The generated gRPC client in the 4 <code>services.*.dart</code> files is baked into the <code>fluter-grpc</code> mix template and contain the initially generated gRPC client. Calling gRPC services using generated client is similar to using other ServiceStack service clients, but since it is gRPC, we have dedicated methods on our client for our services. Eg, <code>getHello</code> rather than just the verb <code>get</code>.</p><div class="language-dart"><pre><code><span class="token keyword">void</span> <span class="token function">callService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> text <span class="token operator">=</span> myController<span class="token punctuation">.</span>text<span class="token punctuation">.</span>isEmpty <span class="token operator">?</span> <span class="token string-literal"><span class="token string">&quot;World&quot;</span></span> <span class="token punctuation">:</span> myController<span class="token punctuation">.</span>text<span class="token punctuation">;</span>
  <span class="token keyword">var</span> response <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">getHello</span><span class="token punctuation">(</span><span class="token class-name">Hello</span><span class="token punctuation">(</span>name<span class="token punctuation">:</span> text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    result <span class="token operator">=</span> response<span class="token punctuation">.</span>result<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="updating-your-client-dtos" tabindex="-1">Updating your client DTOs <a class="header-anchor" href="#updating-your-client-dtos" aria-hidden="true">#</a></h3><p>During development of your web services, when changes are made to your Request DTO classes, your client sometimes needs to be aware of these changes. We can update both the <code>services.proto</code> file and generated Dart client using the ServiceStack dotnet <code>x</code> tool and the command:</p><div class="language-bash"><pre><code>$ x proto-dart https://localhost:5001
</code></pre></div><p>This command updates the <code>services.proto</code> file first, and then uses our <a href="https://grpc.servicestack.net" target="_blank" rel="noopener noreferrer">hosted gRPC client generator</a> to generate a working gRPC client in the language of your choice.</p><p>The initial <code>services.*.dart</code> files contain a basic gRPC client for working with the default <code>Hello</code> service, but if other web services are running on your host application, using <code>x proto-dart</code> will then sync your client and generated client as you make changes.</p><p>For example, if you use one of our <a href="https://jamstacks.net" target="_blank" rel="noopener noreferrer">Jamstack templates</a>, and configure gRPC using <code>x mix grpc</code>, there is also a Todo service.</p><h3 id="make-your-service-support-grpc" tabindex="-1">Make your service support gRPC <a class="header-anchor" href="#make-your-service-support-grpc" aria-hidden="true">#</a></h3><p>For a ServiceStack service to support gRPC, it needs to use the <code>[DataContract]</code> and <code>[DataMember(Order = x)]</code> attributes on the types exposed by your generated clients. Once these attributes are added</p><div class="language-csharp"><pre><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Tag</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;todos&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">&quot;/todos&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;GET&quot;</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataContract</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">QueryTodos</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">QueryData<span class="token punctuation">&lt;</span>Todo<span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataMember</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Order <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataMember</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Order <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">long</span><span class="token punctuation">&gt;</span><span class="token punctuation">?</span></span> Ids <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataMember</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Order <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> TextContains <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataContract</span></span><span class="token punctuation">]</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Todo</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IHasId<span class="token punctuation">&lt;</span><span class="token keyword">long</span><span class="token punctuation">&gt;</span></span></span>
<span class="token punctuation">{</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataMember</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Order <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataMember</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Order <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Text <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">DataMember</span><span class="token attribute-arguments"><span class="token punctuation">(</span>Order <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsFinished <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Once updated, re-running your ServiceStack application, we can update our generated gRPC client using <code>x proto-dart</code> from your project directory while your ServiceStack host is running locally.</p><p>This will enable you to integrate with the <code>Todo</code> service using the updated client using the following syntax.</p><div class="language-dart"><pre><code><span class="token class-name">Future</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">QueryResponse_Todo</span><span class="token punctuation">&gt;</span></span> <span class="token function">queryTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">async</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">getQueryTodos</span><span class="token punctuation">(</span><span class="token class-name">QueryTodos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div><p>gRPC&#39;s use of <a href="/grpc#limitations">Protocol Buffers does have a number of restrictions</a> in the Types in supports that are worth keeping in mind.</p><h3 id="questions" tabindex="-1">Questions? <a class="header-anchor" href="#questions" aria-hidden="true">#</a></h3><p>Head over to our <a href="https://forums.servicestack.net" target="_blank" rel="noopener noreferrer">Customer Forums</a> or <a href="https://servicestack.net/ask" target="_blank" rel="noopener noreferrer">GitHub Discussions</a> if you are having issues or have any questions!</p>`,67),g=[u,d,k,h];function m(f,v,y,w,b,x){return p(),c("div",null,g)}var T=o(i,[["render",m]]);export{C as __pageData,T as default};