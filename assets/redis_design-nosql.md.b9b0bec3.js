import{_ as n,o as s,c as a,a as t}from"./app.df00b96f.js";const m='{"title":"Design a Blog with Redis","description":"","frontmatter":{"slug":"design-nosql","title":"Design a Blog with Redis"},"headers":[{"level":2,"title":"Designing a NoSQL Database using Redis","slug":"designing-a-nosql-database-using-redis"},{"level":2,"title":"Modeling Entities in a NoSQL Database","slug":"modeling-entities-in-a-nosql-database"},{"level":3,"title":"Main page: show list of blogs","slug":"main-page-show-list-of-blogs"},{"level":3,"title":"Main page: show list of recent comments","slug":"main-page-show-list-of-recent-comments"},{"level":3,"title":"Main page: show tag cloud for posts","slug":"main-page-show-tag-cloud-for-posts"},{"level":3,"title":"Main page: show categories","slug":"main-page-show-categories"},{"level":3,"title":"Post page: show post and all comments","slug":"post-page-show-post-and-all-comments"},{"level":3,"title":"Post page: add comment to post","slug":"post-page-add-comment-to-post"},{"level":3,"title":"Tag page: show all posts for tag","slug":"tag-page-show-all-posts-for-tag"}],"relativePath":"redis/design-nosql.md"}',e={},o=t(`<p>This page illustrates a good solution on how to design a simple Blog application with <a href="http://redis.io" target="_blank" rel="noopener noreferrer">Redis</a> using advanced features of <a href="https://github.com/ServiceStack/ServiceStack.Redis" target="_blank" rel="noopener noreferrer">ServiceStack&#39;s C# Redis Client</a> to provide fast, simple and elegant solutions to real world scenarios.</p><h4 id="all-redis-blog-application-pages" tabindex="-1">All Redis Blog application pages <a class="header-anchor" href="#all-redis-blog-application-pages" aria-hidden="true">#</a></h4><ul><li>Designing a NoSQL Database using Redis</li><li><a href="./schemaless-migration.html">Painless data migrations using Redis and other schema-less NoSQL datastores</a></li></ul><h2 id="designing-a-nosql-database-using-redis" tabindex="-1">Designing a NoSQL Database using Redis <a class="header-anchor" href="#designing-a-nosql-database-using-redis" aria-hidden="true">#</a></h2><p>Oren Eini from the popular .NET blog <a href="http://ayende.com/Blog/" target="_blank" rel="noopener noreferrer">http://ayende.com/Blog/</a>, is putting together a <a href="http://ayende.com/Blog/archive/2010/04/20/that-no-sql-thing-the-relational-modeling-anti-pattern-in.aspx" target="_blank" rel="noopener noreferrer">series of blog posts</a> explaining how to go about designing a simple blog application using a NoSQL database. Although he&#39;s using his RavenDB as a reference implementation, this example applies equally well to Redis and other NoSQL variants. Some solutions will vary based on the advanced features of each NoSQL solution but the &#39;core data models&#39; should remain the same.</p><p>I will try to add my own thoughts on and where possible show how you can use the advanced features in Redis the C# Client to provide simple, fast and effective solutions. The entire source code for this example is available in its simplest form at: <a href="https://github.com/ServiceStack/ServiceStack.Redis/blob/master/tests/ServiceStack.Redis.Tests/Examples/BlogPostExample.cs" target="_blank" rel="noopener noreferrer">BlogPostExample.cs</a>. I will be re-factoring this solution in what I consider a &#39;best practices approach&#39; for large applications where I will shove all Redis access behind a repository (so the client doesn&#39;t know it&#39;s even being used) which I will be maintaining at: <a href="https://github.com/ServiceStack/ServiceStack.Redis/blob/master/tests/ServiceStack.Redis.Tests/Examples/BestPractice/BlogPostBestPractice.cs" target="_blank" rel="noopener noreferrer">BlogPostBestPractice.cs</a></p><h2 id="modeling-entities-in-a-nosql-database" tabindex="-1">Modeling Entities in a NoSQL Database <a class="header-anchor" href="#modeling-entities-in-a-nosql-database" aria-hidden="true">#</a></h2><p>If you&#39;ve spent a lot of time building solutions with an RDBMS back-end it can be hard to know which part of your schema is due to the problem domain and which part is the result of an implementation constraint trying to map your ideal domain model onto a relational tabular structure.</p><p>My approach before designing any system is to map out the ideal domain model we need to build in order before I reach for an IDE or a db gui schema creator. Unfortunately creating POCO types is just so damn quick in <a href="http://VS.NET/C#/R#" target="_blank" rel="noopener noreferrer">VS.NET/C#/R#</a> that I&#39;ve ditched the pencil and paper a long time ago and jump right into using C# automatic properties like a kind of light-weight DSL ripping out entities quicker than I can draw crows feet \u{1F603}</p><p>If you are like me and prefer to design your domain models from POCO types rather than creating RDBMS tables than you&#39;re in good shape in implementing a NoSQL solution as the time when you usually morph your pristine domain models into a tabular structure peppering it with Primary and Foreign keys can now saved and put towards a longer lunch break as most of the times you can skip this step entirely.</p><p>The schema-less nature of NoSQL databases means you can pretty much store your domain models as-is. You will still need to identify your distinct entities from your Key Value Objects. A good guide I use to help with this is whether the Model only makes sense in the context its parent and whether it is &#39;co-owned&#39; or referenced by another entity. This is where we start pulling the domain model apart, basically you just replace the collection of strongly-typed entities to a collection of entity ids. Effectively you can think of this like foreign-keys but at a much higher level as you only pull it apart of the domain model when you want to manage the entities independently of each other, not as dictated by your schema.</p><p>Taking the User model in it&#39;s most simplest form. A User has many blogs, now as you may want to view a list of blogs outside the context of a User (e.g. view a list of newly created blogs, most popular blogs for a category, etc). It becomes a good candidate to being promoted a first class entity.</p><div class="language-csharp"><pre><code><span class="token comment">//Before</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>Blog<span class="token punctuation">&gt;</span></span> Blogs <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//After</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">&gt;</span></span> BlogIds <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><p>With only a running redis-server instance running and the C# client, the full source to persist and retrieve a list of users is only:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> redis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">RedisClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisUsers <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
redisUsers<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">User</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> redisUsers<span class="token punctuation">.</span><span class="token function">GetNextSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;ayende&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
redisUsers<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">User</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> redisUsers<span class="token punctuation">.</span><span class="token function">GetNextSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;mythz&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> allUsers <span class="token operator">=</span> redisUsers<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Recursively print the values of the POCO</span>
allUsers<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*Output
[
    {
        Id: 1,
        Name: ayende,
        BlogIds: []
    },
    {
        Id: 2,
        Name: mythz,
        BlogIds: []
    }
]
    */</span>
</code></pre></div><p><em>Note: <a href="http://www.servicestack.net/mythz_blog/?p=202" target="_blank" rel="noopener noreferrer">You can also use the generic T.Dump() Extension method yourself</a>.</em></p><p>Ayende has outlined a few scenarios that the Blog application should support.</p><ul><li>Main page: show list of blogs</li><li>Main page: show list of recent posts</li><li>Main page: show list of recent comments</li><li>Main page: show tag cloud for posts</li><li>Main page: show categories</li><li>Post page: show post and all comments</li><li>Post page: add comment to post</li><li>Tag page: show all posts for tag</li><li>Categories page: show all posts for category</li></ul><p>The full source code for the Redis solution for each of these scenarios is <a href="https://github.com/ServiceStack/ServiceStack.Redis/blob/master/tests/ServiceStack.Redis.Tests/Examples/BlogPostExample.cs" target="_blank" rel="noopener noreferrer">available here</a>. Although I will go through each solution in a little more detail below.</p><h3 id="main-page-show-list-of-blogs" tabindex="-1">Main page: show list of blogs <a class="header-anchor" href="#main-page-show-list-of-blogs" aria-hidden="true">#</a></h3><p>Before we can show a list of blogs, we need to add some first. Here I make effective use of the Redis client&#39;s unique sequence that is maintained for each type.</p><p>In identifying my entities I have a general preference for &#39;automated ids&#39; which are either sequential integer ids or Guids - if the entities are going to be distributed across multiple data stores.</p><p>Apart from that persisting an object is just a straight forward process of serializing the object graph into a text-serialization format. By default, the Redis Client uses <a href="https://github.com/ServiceStack/ServiceStack.Text" target="_blank" rel="noopener noreferrer">Service Stack&#39;s JsonSerializer</a> as it&#39;s the fastest and JSON Serializer for .NET.</p><div class="language-csharp"><pre><code><span class="token comment">//Retrieve strongly-typed Redis clients that let&#39;s you natively persist POCO&#39;s</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisUsers <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>User<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisBlogs <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Blog<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//Create the user, getting a unique User Id from the User sequence.</span>
<span class="token class-name"><span class="token keyword">var</span></span> mythz <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">User</span> <span class="token punctuation">{</span> Id <span class="token operator">=</span> redisUsers<span class="token punctuation">.</span><span class="token function">GetNextSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> Name <span class="token operator">=</span> <span class="token string">&quot;Demis Bellot&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">//create some blogs using unique Ids from the Blog sequence. Also adding references</span>
<span class="token class-name"><span class="token keyword">var</span></span> mythzBlogs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>Blog<span class="token punctuation">&gt;</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Blog</span>
    <span class="token punctuation">{</span>
        Id <span class="token operator">=</span> redisBlogs<span class="token punctuation">.</span><span class="token function">GetNextSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        UserId <span class="token operator">=</span> mythz<span class="token punctuation">.</span>Id<span class="token punctuation">,</span>
        UserName <span class="token operator">=</span> mythz<span class="token punctuation">.</span>Name<span class="token punctuation">,</span>
        Tags <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;Architecture&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;.NET&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Redis&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Blog</span>
    <span class="token punctuation">{</span>
        Id <span class="token operator">=</span> redisBlogs<span class="token punctuation">.</span><span class="token function">GetNextSequence</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        UserId <span class="token operator">=</span> mythz<span class="token punctuation">.</span>Id<span class="token punctuation">,</span>
        UserName <span class="token operator">=</span> mythz<span class="token punctuation">.</span>Name<span class="token punctuation">,</span>
        Tags <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span> <span class="token string">&quot;Music&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Twitter&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Life&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">//Add the blog references</span>
mythzBlogs<span class="token punctuation">.</span><span class="token function">ForEach</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> mythz<span class="token punctuation">.</span>BlogIds<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>Id<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Store the user and their blogs</span>
redisUsers<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>mythz<span class="token punctuation">)</span><span class="token punctuation">;</span>
redisBlogs<span class="token punctuation">.</span><span class="token function">StoreAll</span><span class="token punctuation">(</span>mythzBlogs<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//retrieve all blogs</span>
<span class="token class-name"><span class="token keyword">var</span></span> blogs <span class="token operator">=</span> redisBlogs<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

blogs<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*Output
[
    {
        Id: 1,
        UserId: 1,
        UserName: Demis Bellot,
        Tags: 
        [
            Architecture,
            .NET,
            Redis
        ],
        BlogPostIds: []
    },
    {
        Id: 2,
        UserId: 1,
        UserName: Demis Bellot,
        Tags: 
        [
            Music,
            Twitter,
            Life
        ],
        BlogPostIds: []
    }
]
*/</span>
</code></pre></div><h3 id="main-page-show-list-of-recent-comments" tabindex="-1">Main page: show list of recent comments <a class="header-anchor" href="#main-page-show-list-of-recent-comments" aria-hidden="true">#</a></h3><p>For this scenario we can take advantage of Redis&#39;s LTRIM&#39;ing operation to maintain custom rolling lists. The richness of <a href="http://redis.io/commands/rpush" target="_blank" rel="noopener noreferrer">Redis list operations</a> also allow us to prepend or append at either end of the list which we take advantage of in this example.</p><div class="language-csharp"><pre><code><span class="token comment">//Get strongly-typed clients</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisComments <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPostComment<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//To keep this example let&#39;s pretend this is a new list of blog posts</span>
<span class="token class-name"><span class="token keyword">var</span></span> newIncomingBlogPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Let&#39;s get back an IList&lt;BlogPost&gt; wrapper around a Redis server-side List.</span>
<span class="token class-name"><span class="token keyword">var</span></span> recentPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span>Lists<span class="token punctuation">[</span><span class="token string">&quot;urn:BlogPost:RecentPosts&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> recentComments <span class="token operator">=</span> redisComments<span class="token punctuation">.</span>Lists<span class="token punctuation">[</span><span class="token string">&quot;urn:BlogPostComment:RecentComments&quot;</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> newBlogPost <span class="token keyword">in</span> newIncomingBlogPosts<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//Prepend the new blog posts to the start of the &#39;RecentPosts&#39; list</span>
    recentPosts<span class="token punctuation">.</span><span class="token function">Prepend</span><span class="token punctuation">(</span>newBlogPost<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Prepend all the new blog post comments to the start of the &#39;RecentComments&#39; list</span>
    newBlogPost<span class="token punctuation">.</span>Comments<span class="token punctuation">.</span><span class="token function">ForEach</span><span class="token punctuation">(</span>recentComments<span class="token punctuation">.</span>Prepend<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Make this a Rolling list by only keep the latest 3 posts and comments</span>
recentPosts<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
recentComments<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Print out the last 3 posts:</span>
recentPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output: 
[
    {
        Id: 2,
        BlogId: 2,
        Title: Redis,
        Categories: 
        [
            NoSQL,
            Cache
        ],
        Tags: 
        [
            Redis,
            NoSQL,
            Scalability,
            Performance
        ],
        Comments: 
        [
            {
                Content: First Comment!,
                CreatedDate: 2010-04-20T22:14:02.755878Z
            }
        ]
    },
    {
        Id: 1,
        BlogId: 1,
        Title: RavenDB,
        Categories: 
        [
            NoSQL,
            DocumentDB
        ],
        Tags: 
        [
            Raven,
            NoSQL,
            JSON,
            .NET
        ],
        Comments: 
        [
            {
                Content: First Comment!,
                CreatedDate: 2010-04-20T22:14:02.755878Z
            },
            {
                Content: Second Comment!,
                CreatedDate: 2010-04-20T22:14:02.755878Z
            }
        ]
    },
    {
        Id: 4,
        BlogId: 2,
        Title: Couch Db,
        Categories: 
        [
            NoSQL,
            DocumentDB
        ],
        Tags: 
        [
            CouchDb,
            NoSQL,
            JSON
        ],
        Comments: 
        [
            {
                Content: First Comment!,
                CreatedDate: 2010-04-20T22:14:02.755878Z
            }
        ]
    }
]
*/</span>

recentComments<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output:
[
    {
        Content: First Comment!,
        CreatedDate: 2010-04-20T20:32:42.2970956Z
    },
    {
        Content: First Comment!,
        CreatedDate: 2010-04-20T20:32:42.2970956Z
    },
    {
        Content: First Comment!,
        CreatedDate: 2010-04-20T20:32:42.2970956Z
    }
]
*/</span>
</code></pre></div><h3 id="main-page-show-tag-cloud-for-posts" tabindex="-1">Main page: show tag cloud for posts <a class="header-anchor" href="#main-page-show-tag-cloud-for-posts" aria-hidden="true">#</a></h3><p>Redis Sorted Sets provide the perfect data structure to maintain a Tag cloud of all tags. It&#39;s very fast, elegant structure which provides custom-specific operations to maintain and sort the data.</p><div class="language-csharp"><pre><code><span class="token comment">//Get strongly-typed clients</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> newIncomingBlogPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> newBlogPost <span class="token keyword">in</span> newIncomingBlogPosts<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//For every tag in each new blog post, increment the number of times each Tag has occurred </span>
    newBlogPost<span class="token punctuation">.</span>Tags<span class="token punctuation">.</span><span class="token function">ForEach</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>
        redis<span class="token punctuation">.</span><span class="token function">IncrementItemInSortedSet</span><span class="token punctuation">(</span><span class="token string">&quot;urn:TagCloud&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Show top 5 most popular tags with their scores</span>
<span class="token class-name"><span class="token keyword">var</span></span> tagCloud <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">GetRangeWithScoresFromSortedSetDesc</span><span class="token punctuation">(</span><span class="token string">&quot;urn:TagCloud&quot;</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
tagCloud<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output:
[
    [
        NoSQL,
            4
    ],
    [
        Scalability,
            2
    ],
    [
        JSON,
            2
    ],
    [
        Redis,
            1
    ],
    [
        Raven,
            1
    ],
]
*/</span>
</code></pre></div><h3 id="main-page-show-categories" tabindex="-1">Main page: show categories <a class="header-anchor" href="#main-page-show-categories" aria-hidden="true">#</a></h3><p>To keep a unique list of categories the right structure to use is a Set. This allows you to freely add a value multiple times and there will never be any duplicates as only one of each value is stored.</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> blogPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> blogPost <span class="token keyword">in</span> blogPosts<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    blogPost<span class="token punctuation">.</span>Categories<span class="token punctuation">.</span><span class="token function">ForEach</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>
            redis<span class="token punctuation">.</span><span class="token function">AddToSet</span><span class="token punctuation">(</span><span class="token string">&quot;urn:Categories&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name"><span class="token keyword">var</span></span> uniqueCategories <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">GetAllFromSet</span><span class="token punctuation">(</span><span class="token string">&quot;urn:Categories&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
uniqueCategories<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output:
[
    DocumentDB,
    NoSQL,
    Cluster,
    Cache
]
*/</span>
</code></pre></div><h3 id="post-page-show-post-and-all-comments" tabindex="-1">Post page: show post and all comments <a class="header-anchor" href="#post-page-show-post-and-all-comments" aria-hidden="true">#</a></h3><p>There is nothing special to do here since comments are Key Value Objects they are stored and retrieved with the post, so retrieving the post retrieves it&#39;s comments as well.</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> postId <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> selectedBlogPost <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetById</span><span class="token punctuation">(</span>postId<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

selectedBlogPost<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output:
{
    Id: 1,
    BlogId: 1,
    Title: RavenDB,
    Categories: 
    [
        NoSQL,
        DocumentDB
    ],
    Tags: 
    [
        Raven,
        NoSQL,
        JSON,
        .NET
    ],
    Comments: 
    [
        {
            Content: First Comment!,
            CreatedDate: 2010-04-20T21:26:31.9918236Z
        },
        {
            Content: Second Comment!,
            CreatedDate: 2010-04-20T21:26:31.9918236Z
        }
    ]
}
*/</span>
</code></pre></div><h3 id="post-page-add-comment-to-post" tabindex="-1">Post page: add comment to post <a class="header-anchor" href="#post-page-add-comment-to-post" aria-hidden="true">#</a></h3><p>Modifying an entity are one of the strengths of a schema-less data store. Adding a comment is as simple as</p><ul><li>retrieving it&#39;s parent post</li><li>modifying the POCO entity in memory by adding a comment to the existing list</li><li>then saving the entity.</li></ul><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> postId <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> blogPost <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetById</span><span class="token punctuation">(</span>postId<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
blogPost<span class="token punctuation">.</span>Comments<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BlogPostComment</span> <span class="token punctuation">{</span> Content <span class="token operator">=</span> <span class="token string">&quot;Third Post!&quot;</span><span class="token punctuation">,</span> CreatedDate <span class="token operator">=</span> DateTime<span class="token punctuation">.</span>UtcNow <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
redisBlogPosts<span class="token punctuation">.</span><span class="token function">Store</span><span class="token punctuation">(</span>blogPost<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> refreshBlogPost <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetById</span><span class="token punctuation">(</span>postId<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
refreshBlogPost<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output:
{
    Id: 1,
    BlogId: 1,
    Title: RavenDB,
    Categories: 
    [
        NoSQL,
        DocumentDB
    ],
    Tags: 
    [
        Raven,
        NoSQL,
        JSON,
        .NET
    ],
    Comments: 
    [
        {
            Content: First Comment!,
            CreatedDate: 2010-04-20T21:32:39.9688707Z
        },
        {
            Content: Second Comment!,
            CreatedDate: 2010-04-20T21:32:39.9688707Z
        },
        {
            Content: Third Post!,
            CreatedDate: 2010-04-20T21:32:40.2688879Z
        }
    ]
}
*/</span>
</code></pre></div><h3 id="tag-page-show-all-posts-for-tag" tabindex="-1">Tag page: show all posts for tag <a class="header-anchor" href="#tag-page-show-all-posts-for-tag" aria-hidden="true">#</a></h3><p>Basically in order to view all the posts for a particular category we&#39;ll need to provide a reverse-index by adding all matching post ids into a &#39;Category &gt; Post Id&#39; Set.</p><p>From there it&#39;s just a matter of performing a batch request fetching all the Posts with the supplied Ids:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">As</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> newIncomingBlogPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> newBlogPost <span class="token keyword">in</span> newIncomingBlogPosts<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//For each post add it&#39;s Id into each of it&#39;s &#39;Cateogry &gt; Posts&#39; index</span>
    newBlogPost<span class="token punctuation">.</span>Categories<span class="token punctuation">.</span><span class="token function">ForEach</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span>
            redis<span class="token punctuation">.</span><span class="token function">AddToSet</span><span class="token punctuation">(</span><span class="token string">&quot;urn:Category:&quot;</span> <span class="token operator">+</span> x<span class="token punctuation">,</span> newBlogPost<span class="token punctuation">.</span>Id<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//Retrieve all the post ids for the category you want to view</span>
<span class="token class-name"><span class="token keyword">var</span></span> documentDbPostIds <span class="token operator">=</span> redis<span class="token punctuation">.</span><span class="token function">GetAllFromSet</span><span class="token punctuation">(</span><span class="token string">&quot;urn:Category:DocumentDB&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Make a batch call to retrieve all the posts containing the matching ids </span>
<span class="token comment">//(i.e. the DocumentDB Category posts)</span>
<span class="token class-name"><span class="token keyword">var</span></span> documentDbPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetByIds</span><span class="token punctuation">(</span>documentDbPostIds<span class="token punctuation">)</span><span class="token punctuation">;</span>

documentDbPosts<span class="token punctuation">.</span><span class="token function">PrintDump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* Output:
[
    {
        Id: 4,
        BlogId: 2,
        Title: Couch Db,
        Categories: 
        [
            NoSQL,
            DocumentDB
        ],
        Tags: 
        [
            CouchDb,
            NoSQL,
            JSON
        ],
        Comments: 
        [
            {
                Content: First Comment!,
                CreatedDate: 2010-04-20T21:38:24.6305842Z
            }
        ]
    },
    {
        Id: 1,
        BlogId: 1,
        Title: RavenDB,
        Categories: 
        [
            NoSQL,
            DocumentDB
        ],
        Tags: 
        [
            Raven,
            NoSQL,
            JSON,
            .NET
        ],
        Comments: 
        [
            {
                Content: First Comment!,
                CreatedDate: 2010-04-20T21:38:24.6295842Z
            },
            {
                Content: Second Comment!,
                CreatedDate: 2010-04-20T21:38:24.6295842Z
            }
        ]
    }
]
*/</span>
</code></pre></div>`,44),p=[o];function c(l,i,u,r,k,d){return s(),a("div",null,p)}var h=n(e,[["render",c]]);export{m as __pageData,h as default};
