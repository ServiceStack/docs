import{_ as n,o as s,c as a,a as t}from"./app.1b8362d0.js";const f='{"title":"gRPC protoc GO Client","description":"","frontmatter":{"slug":"grpc-go","title":"gRPC protoc GO Client"},"headers":[{"level":2,"title":"Go protoc generated GrpcServiceClient TodoWorld Example","slug":"go-protoc-generated-grpcserviceclient-todoworld-example"},{"level":3,"title":"Go protoc gRPC insecure Example","slug":"go-protoc-grpc-insecure-example"},{"level":3,"title":"Go protoc gRPC SSL Example","slug":"go-protoc-grpc-ssl-example"},{"level":3,"title":"Go Local Development gRPC SSL CRUD Example","slug":"go-local-development-grpc-ssl-crud-example"}],"relativePath":"grpc-go.md"}',p={},o=t(`<p><a href="https://youtu.be/FYA32J1-IA0" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/grpc/go.png" alt=""></a></p><blockquote><p>YouTube: <a href="https://youtu.be/FYA32J1-IA0" target="_blank" rel="noopener noreferrer">youtu.be/FYA32J1-IA0</a></p></blockquote><h2 id="go-protoc-generated-grpcserviceclient-todoworld-example" tabindex="-1">Go protoc generated GrpcServiceClient TodoWorld Example <a class="header-anchor" href="#go-protoc-generated-grpcserviceclient-todoworld-example" aria-hidden="true">#</a></h2><p>Install <a href="https://docs.servicestack.net/dotnet-tool" target="_blank" rel="noopener noreferrer">x dotnet tool</a>:</p><div class="language-bash"><pre><code>$ dotnet tool <span class="token function">install</span> <span class="token parameter variable">--global</span> x 
</code></pre></div><p>Create new <strong>TodoWorld</strong> Go module:</p><div class="language-bash"><pre><code>$ go mod init TodoWorld
</code></pre></div><p>Add protoc generated TodoWorld DTOs and gRPC GrpcServiceClient to <code>services/</code> folder:</p><div class="language-bash"><pre><code>$ <span class="token function">mkdir</span> services
$ x proto-go https://todoworld.servicestack.net <span class="token parameter variable">-out</span> services
</code></pre></div><h3 id="go-protoc-grpc-insecure-example" tabindex="-1">Go protoc gRPC insecure Example <a class="header-anchor" href="#go-protoc-grpc-insecure-example" aria-hidden="true">#</a></h3><p>Create a new Go Console App in <code>client\\main.go</code>:</p><div class="language-go"><pre><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    context <span class="token string">&quot;context&quot;</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;log&quot;</span>

    <span class="token string">&quot;google.golang.org/grpc&quot;</span>

    pb <span class="token string">&quot;TodoWorld/services&quot;</span>
    <span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;todoworld.servicestack.net:5054&quot;</span><span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithInsecure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;fail to dial: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    client <span class="token operator">:=</span> pb<span class="token punctuation">.</span><span class="token function">NewGrpcServicesClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    response<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">GetHello</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>Hello<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;gRPC Go&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;GetHello: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>Result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Alternatively above Go example can be created with:</p><div class="language-bash"><pre><code>$ <span class="token function">mkdir</span> client
$ x mix todoworld-go <span class="token parameter variable">-out</span> client
</code></pre></div><p>Run example:</p><div class="language-bash"><pre><code>$ go run client<span class="token punctuation">\\</span>main.go
</code></pre></div><h3 id="go-protoc-grpc-ssl-example" tabindex="-1">Go protoc gRPC SSL Example <a class="header-anchor" href="#go-protoc-grpc-ssl-example" aria-hidden="true">#</a></h3><p>Download TodoWorld SSL Certificate used for its gRPC HTTP/2 Services:</p><div class="language-bash"><pre><code>$ x get https://todoworld.servicestack.net/grpc.crt 
</code></pre></div><p>Use certificate when initializing <code>NewGrpcServicesClient</code>:</p><div class="language-go"><pre><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    context <span class="token string">&quot;context&quot;</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;log&quot;</span>

    <span class="token string">&quot;google.golang.org/grpc&quot;</span>
    <span class="token string">&quot;google.golang.org/grpc/credentials&quot;</span>

    pb <span class="token string">&quot;TodoWorld/services&quot;</span>
    <span class="token string">&quot;time&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    creds<span class="token punctuation">,</span> err <span class="token operator">:=</span> credentials<span class="token punctuation">.</span><span class="token function">NewClientTLSFromFile</span><span class="token punctuation">(</span><span class="token string">&quot;grpc.crt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;could not process the credentials: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">&quot;todoworld.servicestack.net:50051&quot;</span><span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithTransportCredentials</span><span class="token punctuation">(</span>creds<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;fail to dial: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    client <span class="token operator">:=</span> pb<span class="token punctuation">.</span><span class="token function">NewGrpcServicesClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    response<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">GetHello</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>Hello<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;gRPC Go&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;GetHello: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>Result<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Override <code>client/main.go</code> with the above Go Example:</p><div class="language-bash"><pre><code>$ x mix todoworld-go-ssl <span class="token parameter variable">-out</span> client
</code></pre></div><p>Run example:</p><div class="language-bash"><pre><code>$ go run client<span class="token punctuation">\\</span>main.go
</code></pre></div><h3 id="go-local-development-grpc-ssl-crud-example" tabindex="-1">Go Local Development gRPC SSL CRUD Example <a class="header-anchor" href="#go-local-development-grpc-ssl-crud-example" aria-hidden="true">#</a></h3><div class="language-go"><pre><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    context <span class="token string">&quot;context&quot;</span>
    <span class="token string">&quot;fmt&quot;</span>
    <span class="token string">&quot;log&quot;</span>

    <span class="token string">&quot;google.golang.org/grpc&quot;</span>
    <span class="token string">&quot;google.golang.org/grpc/credentials&quot;</span>

    <span class="token string">&quot;time&quot;</span>
    pb <span class="token string">&quot;todoworld/services&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// Load the certificates from disk</span>
    creds<span class="token punctuation">,</span> err <span class="token operator">:=</span> credentials<span class="token punctuation">.</span><span class="token function">NewClientTLSFromFile</span><span class="token punctuation">(</span><span class="token string">&quot;dev.crt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;localhost:5001&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;could not process the credentials: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> grpc<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span>address<span class="token punctuation">,</span> grpc<span class="token punctuation">.</span><span class="token function">WithTransportCredentials</span><span class="token punctuation">(</span>creds<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;fail to dial: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">defer</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    client <span class="token operator">:=</span> pb<span class="token punctuation">.</span><span class="token function">NewGrpcServicesClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
    ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>


    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">PostResetTodos</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>ResetTodos<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;PostResetTodos: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;TODO EXAMPLE&quot;</span><span class="token punctuation">)</span>

    <span class="token comment">//POST /todos</span>
    r1<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">PostCreateTodo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>CreateTodo<span class="token punctuation">{</span>Title<span class="token punctuation">:</span> <span class="token string">&quot;ServiceStack&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;PostCreateTodo: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    todo <span class="token operator">:=</span> r1<span class="token punctuation">.</span>Result
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;new todo Id:&quot;</span><span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> <span class="token string">&quot;Title:&quot;</span><span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Title<span class="token punctuation">)</span>

    <span class="token comment">//GET /todos</span>
    all<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">CallGetTodos</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>GetTodos<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CallGetTodos: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;todos:&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>all<span class="token punctuation">.</span><span class="token function">GetResults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">//GET /todos/1</span>
    r2<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">CallGetTodo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>GetTodo<span class="token punctuation">{</span>Id<span class="token punctuation">:</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CallGetTodo: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    todo <span class="token operator">=</span> r2<span class="token punctuation">.</span>Result
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;get todo Id:&quot;</span><span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> <span class="token string">&quot;Title:&quot;</span><span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Title<span class="token punctuation">)</span>

    <span class="token comment">//PUT /todos/1</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">PutUpdateTodo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>UpdateTodo<span class="token punctuation">{</span>Id<span class="token punctuation">:</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> Title<span class="token punctuation">:</span> <span class="token string">&quot;gRPC&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;PutUpdateTodo: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//GET /todos/1</span>
    r2<span class="token punctuation">,</span> err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">CallGetTodo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>GetTodo<span class="token punctuation">{</span>Id<span class="token punctuation">:</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CallGetTodo: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    todo <span class="token operator">=</span> r2<span class="token punctuation">.</span>Result
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;get todo Id:&quot;</span><span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">,</span> <span class="token string">&quot;Title:&quot;</span><span class="token punctuation">,</span> todo<span class="token punctuation">.</span>Title<span class="token punctuation">)</span>

    <span class="token comment">//DELETE /todos/1</span>
    <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">CallDeleteTodo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>DeleteTodo<span class="token punctuation">{</span>Id<span class="token punctuation">:</span> todo<span class="token punctuation">.</span>Id<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CallDeleteTodo: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//GET /todos</span>
    all<span class="token punctuation">,</span> err <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">CallGetTodos</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pb<span class="token punctuation">.</span>GetTodos<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">&quot;CallGetTodos: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;todos:&quot;</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>all<span class="token punctuation">.</span><span class="token function">GetResults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre></div><p>Refer to <a href="https://github.com/NetCoreApps/todo-world/tree/master/src/clients/go" target="_blank" rel="noopener noreferrer">/src/clients/go</a> for a complete example project.</p>`,28),e=[o];function c(u,l,i,k,r,d){return s(),a("div",null,e)}var m=n(p,[["render",c]]);export{f as __pageData,m as default};
