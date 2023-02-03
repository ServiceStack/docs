import{_ as n,o as s,c as a,a as t}from"./app.930c2e8a.js";const h='{"title":"Data migrations with Redis","description":"","frontmatter":{"slug":"schemaless-migration","title":"Data migrations with Redis"},"headers":[{"level":2,"title":"Painless data migrations with schema-less NoSQL datastores and Redis","slug":"painless-data-migrations-with-schema-less-nosql-datastores-and-redis"},{"level":2,"title":"Example Code","slug":"example-code"},{"level":3,"title":"The old schema","slug":"the-old-schema"},{"level":3,"title":"The new schema","slug":"the-new-schema"},{"level":3,"title":"New schema types","slug":"new-schema-types"},{"level":3,"title":"1. The do-nothing approach - using the old data with the new types","slug":"_1-the-do-nothing-approach-using-the-old-data-with-the-new-types"},{"level":3,"title":"2. Using a custom translation to migrate data using application logic","slug":"_2-using-a-custom-translation-to-migrate-data-using-application-logic"}],"relativePath":"redis/schemaless-migration.md"}',e={},o=t(`<p>This page runs through a typical example to show how painless typical data migrations can be when using Redis and other NoSQL schema-less data stores.</p><h4 id="all-redis-blog-application-pages" tabindex="-1">All Redis Blog application pages <a class="header-anchor" href="#all-redis-blog-application-pages" aria-hidden="true">#</a></h4><ul><li><a href="./design-nosql.html">Designing a NoSQL Database using Redis</a></li><li>Painless data migrations using Redis and other schema-less NoSQL datastores</li></ul><h2 id="painless-data-migrations-with-schema-less-nosql-datastores-and-redis" tabindex="-1">Painless data migrations with schema-less NoSQL datastores and Redis <a class="header-anchor" href="#painless-data-migrations-with-schema-less-nosql-datastores-and-redis" aria-hidden="true">#</a></h2><p>Developing <em>new</em> greenfield database systems utilizing a RDBMS back-end is mostly a trouble-free experience. Before the system is live, you&#39;re able to easily modify a schema by nuking the entire application database, and re-creating it with automated DDL scripts that will create and populate it with test data that fits your new schema.</p><p>The real troubles in your IT life happens after your first deployment and your system goes live. At that point you no longer have the option to nuke the database and re-create it from scratch. If you&#39;re lucky, you have a script in place that can automatically infer the required DDL statements to migrate from your old schema to your new one. However any significant changes to your schema are likely to involve late nights, downtime, and a non-trivial amount of effort to ensure a successful migration to the new db schema.</p><p>This process is much less painful with schema-less data stores. In fact in most cases when you&#39;re just adding and removing fields it doesn&#39;t exist at all. By not having your datastore understand intrinsic details of your schema, it means it&#39;s no longer an infrastructure-level issue and can easily be handled by application logic if needed.</p><p>Being maintenance-free, schema-less and non-intrusive are fundamental design qualities baked into Redis and its operations. For example querying a list of recent BlogPosts returns the same result for an <em>empty list</em> as it would in an <em>empty Redis database</em> - 0 results. As values in Redis are binary-safe strings you&#39;re able to store anything you want in them and most importantly by extension this means that all Redis operations can support all of your application types without needing an &#39;intermediate language&#39; like DDL to provide a rigid schema of what to expect. Without any prior initialization your code can talk directly to a Redis datastore naturally as if it was an in-memory collection.</p><p>To illustrate what can be achieved in practice, I will run through two different strategies of handling schema changes.</p><ul><li>The do-nothing approach - where adding, removing fields and non-destructive change of field types are automatically handled.</li><li>Using a custom translation - using application level logic to customize the translation between the old and new types.</li></ul><p>The full runnable source code for this example are <a href="https://github.com/ServiceStack/ServiceStack.Redis/blob/master/tests/ServiceStack.Redis.Tests/Examples/BestPractice/BlogPostMigrations.cs" target="_blank" rel="noopener noreferrer">available here</a>.</p><h2 id="example-code" tabindex="-1">Example Code <a class="header-anchor" href="#example-code" aria-hidden="true">#</a></h2><p>To demonstrate a typical migration scenario, I&#39;m using the <code>BlogPost</code> type defined on the previous page to project it to a fundamentally different <code>New.BlogPost</code> type. The full definition of the old and new types are shown below:</p><h3 id="the-old-schema" tabindex="-1">The old schema <a class="header-anchor" href="#the-old-schema" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlogPost</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">BlogPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Categories <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Tags <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Comments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>BlogPostComment<span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> BlogId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Title <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Content <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> Categories <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> Tags <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>BlogPostComment<span class="token punctuation">&gt;</span></span> Comments <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlogPostComment</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Content <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">DateTime</span> CreatedDate <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="the-new-schema" tabindex="-1">The new schema <a class="header-anchor" href="#the-new-schema" aria-hidden="true">#</a></h3><p>The &#39;new version&#39; contains most changes you are likely to encounter in normal app development:</p><ul><li>Added, removed and renamed fields</li><li>Non-destructive change of <code>int</code> into <code>long</code> and <code>double</code> fields</li><li>Changed Tag collection type from a <code>List</code> to a <code>HashSet</code></li><li>Changed a strongly-typed <code>BlogPostComment</code> type into a loosely-typed string <code>Dictionary</code></li><li>Introduced a new <code>enum</code> type</li><li>Added a nullable calculated field</li></ul><h3 id="new-schema-types" tabindex="-1">New schema types <a class="header-anchor" href="#new-schema-types" aria-hidden="true">#</a></h3><div class="language-csharp"><pre><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BlogPost</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token function">BlogPost</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Labels <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Tags <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">HashSet<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>Comments <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//Changed int types to both a long and a double type</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">double</span></span> BlogId <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token comment">//Added new field</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">BlogPostType</span> PostType <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Title <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Content <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token comment">//Renamed from &#39;Categories&#39; to &#39;Labels&#39;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> Labels <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token comment">//Changed from List to a HashSet</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">HashSet<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> Tags <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token comment">//Changed from List of strongly-typed &#39;BlogPostComment&#39; to loosely-typed string map</span>
    <span class="token keyword">public</span> <span class="token return-type class-name">List<span class="token punctuation">&lt;</span>Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> Comments <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>

    <span class="token comment">//Added pointless calculated field</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> NoOfComments <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">BlogPostType</span>
<span class="token punctuation">{</span>
    None<span class="token punctuation">,</span>
    Article<span class="token punctuation">,</span>
    Summary<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_1-the-do-nothing-approach-using-the-old-data-with-the-new-types" tabindex="-1">1. The do-nothing approach - using the old data with the new types <a class="header-anchor" href="#_1-the-do-nothing-approach-using-the-old-data-with-the-new-types" aria-hidden="true">#</a></h3><p>Although hard to believe, with no extra effort you can just pretend <em>no change was actually done</em> and freely access new types looking at old data. This is possible when there is non-destructive changes (i.e. no loss of information) with new field types. The example below uses the repository from the previous example to populate Redis with test data from the old types. Just as if nothing happened you can read the old data using the new type:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> repository <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BlogRepository</span><span class="token punctuation">(</span>redisClient<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Populate the datastore with the old schema from the &#39;BlogPostBestPractice&#39;</span>
BlogPostBestPractice<span class="token punctuation">.</span><span class="token function">InsertTestData</span><span class="token punctuation">(</span>repository<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Create a typed-client based on the new schema</span>
<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redisClient<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetTypedClient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>New<span class="token punctuation">.</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//Automatically retrieve blog posts</span>
    <span class="token class-name">IList<span class="token punctuation">&lt;</span>New<span class="token punctuation">.</span>BlogPost<span class="token punctuation">&gt;</span></span> allBlogPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Print out the data in the list of &#39;New.BlogPost&#39; populated from old &#39;BlogPost&#39; type</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>allBlogPosts<span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/*Output:
    [
        {
            Id: 3,
            BlogId: 2,
            PostType: None,
            Title: Redis,
            Labels: [],
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
                    CreatedDate: 2010-04-28T21:42:03.9484725Z
                }
            ]
        },
        {
            Id: 4,
            BlogId: 2,
            PostType: None,
            Title: Couch Db,
            Labels: [],
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
                    CreatedDate: 2010-04-28T21:42:03.9484725Z
                }
            ]
        },
        {
            Id: 1,
            BlogId: 1,
            PostType: None,
            Title: RavenDB,
            Labels: [],
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
                    CreatedDate: 2010-04-28T21:42:03.9004697Z
                },
                {
                    Content: Second Comment!,
                    CreatedDate: 2010-04-28T21:42:03.9004697Z
                }
            ]
        },
        {
            Id: 2,
            BlogId: 1,
            PostType: None,
            Title: Cassandra,
            Labels: [],
            Tags: 
            [
                Cassandra,
                NoSQL,
                Scalability,
                Hashing
            ],
            Comments: 
            [
                {
                    Content: First Comment!,
                    CreatedDate: 2010-04-28T21:42:03.9004697Z
                }
            ]
        }
    ]

     */</span>
<span class="token punctuation">}</span>
</code></pre></div><h3 id="_2-using-a-custom-translation-to-migrate-data-using-application-logic" tabindex="-1">2. Using a custom translation to migrate data using application logic <a class="header-anchor" href="#_2-using-a-custom-translation-to-migrate-data-using-application-logic" aria-hidden="true">#</a></h3><p>Some drawbacks with the above &#39;do-nothing&#39; approach is that you will lose the data of &#39;renamed fields&#39;. There will also be times when you want the newly migrated data to have specific values that are different from the .NET built-in defaults. When you want more control over the migration of your old data, adding a custom translation is a trivial exercise when you can do it natively in code:</p><div class="language-csharp"><pre><code><span class="token class-name"><span class="token keyword">var</span></span> repository <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BlogRepository</span><span class="token punctuation">(</span>redisClient<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Populate the datastore with the old schema from the &#39;BlogPostBestPractice&#39;</span>
BlogPostBestPractice<span class="token punctuation">.</span><span class="token function">InsertTestData</span><span class="token punctuation">(</span>repository<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Create a typed-client based on the new schema</span>
<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> redisBlogPosts <span class="token operator">=</span> redisClient<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetTypedClient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">using</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> redisNewBlogPosts <span class="token operator">=</span> redisClient<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetTypedClient</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>New<span class="token punctuation">.</span>BlogPost<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token comment">//Automatically retrieve blog posts</span>
    <span class="token class-name">IList<span class="token punctuation">&lt;</span>BlogPost<span class="token punctuation">&gt;</span></span> oldBlogPosts <span class="token operator">=</span> redisBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Write a custom translation layer to migrate to the new schema</span>
    <span class="token class-name"><span class="token keyword">var</span></span> migratedBlogPosts <span class="token operator">=</span> oldBlogPosts<span class="token punctuation">.</span><span class="token function">ConvertAll</span><span class="token punctuation">(</span>old <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">New<span class="token punctuation">.</span>BlogPost</span>
    <span class="token punctuation">{</span>
        Id <span class="token operator">=</span> old<span class="token punctuation">.</span>Id<span class="token punctuation">,</span>
        BlogId <span class="token operator">=</span> old<span class="token punctuation">.</span>BlogId<span class="token punctuation">,</span>
        Title <span class="token operator">=</span> old<span class="token punctuation">.</span>Title<span class="token punctuation">,</span>
        Content <span class="token operator">=</span> old<span class="token punctuation">.</span>Content<span class="token punctuation">,</span>
        Labels <span class="token operator">=</span> old<span class="token punctuation">.</span>Categories<span class="token punctuation">,</span> <span class="token comment">//populate with data from renamed field</span>
        PostType <span class="token operator">=</span> New<span class="token punctuation">.</span>BlogPostType<span class="token punctuation">.</span>Article<span class="token punctuation">,</span> <span class="token comment">//select non-default enum value</span>
        Tags <span class="token operator">=</span> old<span class="token punctuation">.</span>Tags<span class="token punctuation">,</span>
        Comments <span class="token operator">=</span> old<span class="token punctuation">.</span>Comments<span class="token punctuation">.</span><span class="token function">ConvertAll</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span> 
            <span class="token punctuation">{</span> <span class="token punctuation">{</span> <span class="token string">&quot;Content&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">.</span>Content <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string">&quot;CreatedDate&quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">.</span>CreatedDate<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        NoOfComments <span class="token operator">=</span> old<span class="token punctuation">.</span>Comments<span class="token punctuation">.</span>Count<span class="token punctuation">,</span> <span class="token comment">//populate using logic from old data</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Persist the new migrated blogposts </span>
    redisNewBlogPosts<span class="token punctuation">.</span><span class="token function">StoreAll</span><span class="token punctuation">(</span>migratedBlogPosts<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Read out the newly stored blogposts</span>
    <span class="token class-name"><span class="token keyword">var</span></span> refreshedNewBlogPosts <span class="token operator">=</span> redisNewBlogPosts<span class="token punctuation">.</span><span class="token function">GetAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//Note: data renamed fields are successfully migrated to the new schema</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>refreshedNewBlogPosts<span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">/*
    [
        {
            Id: 3,
            BlogId: 2,
            PostType: Article,
            Title: Redis,
            Labels: 
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
                    CreatedDate: 28/04/2010 22:58:35
                }
            ],
            NoOfComments: 1
        },
        {
            Id: 4,
            BlogId: 2,
            PostType: Article,
            Title: Couch Db,
            Labels: 
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
                    CreatedDate: 28/04/2010 22:58:35
                }
            ],
            NoOfComments: 1
        },
        {
            Id: 1,
            BlogId: 1,
            PostType: Article,
            Title: RavenDB,
            Labels: 
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
                    CreatedDate: 28/04/2010 22:58:35
                },
                {
                    Content: Second Comment!,
                    CreatedDate: 28/04/2010 22:58:35
                }
            ],
            NoOfComments: 2
        },
        {
            Id: 2,
            BlogId: 1,
            PostType: Article,
            Title: Cassandra,
            Labels: 
            [
                NoSQL,
                Cluster
            ],
            Tags: 
            [
                Cassandra,
                NoSQL,
                Scalability,
                Hashing
            ],
            Comments: 
            [
                {
                    Content: First Comment!,
                    CreatedDate: 28/04/2010 22:58:35
                }
            ],
            NoOfComments: 1
        }
    ]

     */</span>
<span class="token punctuation">}</span>
</code></pre></div><p>The end result is a datastore filled with new data populated in exactly the way you want it - ready to serve features of your new application. In contrast, attempting the above in a typical RDBMS solution without any downtime is effectively a feat of magic that is rewardable by 999 <a href="http://stackoverflow.com" target="_blank" rel="noopener noreferrer">Stack Overflow</a> points and a personal condolence from its grand chancellor <a href="http://twitter.com/jonskeet" target="_blank" rel="noopener noreferrer">@JonSkeet</a> \u{1F603}</p><p>I hope this clearly illustrates differences between the two technologies. In practice you&#39;ll be amazed by the productivity gains made possible when you don&#39;t have to model your application to fit around an ORM and an RDBMS and can save objects like it was memory.</p><p>It&#39;s always a good idea to expose yourself to new technologies so if you haven&#39;t already done so, I invite you to get started developing with Redis today to see the benefits for yourself. To get started all you need is an instance of <a href="http://code.google.com/p/servicestack/wiki/RedisWindowsDownload" target="_blank" rel="noopener noreferrer">the redis-server</a> (no configuration required, just unzip and run) and the dependency-free <a href="https://github.com/ServiceStack/ServiceStack.Redis" target="_blank" rel="noopener noreferrer">ServiceStack&#39;s C# Redis Client</a> and you&#39;re ready to go!</p>`,29),p=[o];function c(l,i,u,r,k,d){return s(),a("div",null,p)}var g=n(e,[["render",c]]);export{h as __pageData,g as default};
