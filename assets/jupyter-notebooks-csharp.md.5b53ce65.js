import{_ as a}from"./chunks/jupyter-csharp.bc0f7c6e.js";import{_ as s,c as o,o as p,b as e,e as t,a as n}from"./app.6a524bd5.js";const G='{"title":"C# Jupyter Notebooks","description":"","frontmatter":{"slug":"jupyter-notebooks-csharp","title":"C# Jupyter Notebooks"},"headers":[{"level":3,"title":"Generate C# Jupyter Notebooks","slug":"generate-c-jupyter-notebooks"},{"level":2,"title":"Setup Jupyter for C# locally","slug":"setup-jupyter-for-c-locally"},{"level":2,"title":"Running JupyterLab","slug":"running-jupyterlab"},{"level":2,"title":"Example generated notebook","slug":"example-generated-notebook"},{"level":3,"title":"Visualize the data","slug":"visualize-the-data"},{"level":2,"title":"Try it out yourself using MyBinder with generated notebooks","slug":"try-it-out-yourself-using-mybinder-with-generated-notebooks"}],"relativePath":"jupyter-notebooks-csharp.md"}',l={},r=e("p",null,[e("img",{src:a,alt:""})],-1),i=e("p",null,"Jupyter Commands lets you generate C# Jupyter Notebooks for calling ServiceStack APIs in a single command.",-1),c=e("iframe",{width:"896",height:"525",src:"https://www.youtube.com/embed/vt92pbet5bY",frameborder:"0",allow:"autoplay; encrypted-media",allowfullscreen:""},null,-1),u=e("p",null,[t("All command line utils used are available in the latest "),e("a",{href:"/dotnet-tool"},"dotnet tool"),t(" which can be installed from:")],-1),d=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"dotnet tool install --global x")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),h=e("p",null,"Or if you had a previous version installed, update with:",-1),k=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"dotnet tool update -g x")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),g=e("h3",{id:"generate-c-jupyter-notebooks",tabindex:"-1"},[t("Generate C# Jupyter Notebooks "),e("a",{class:"header-anchor",href:"#generate-c-jupyter-notebooks","aria-hidden":"true"},"#")],-1),y=e("p",null,[t("Use "),e("code",null,"x jupyter-csharp"),t(" to display different usage examples for generating C# Jupyter Notebooks:")],-1),w=e("div",{class:"language-"},[e("pre",null,[e("code",null,`Usage: x jupyter-csharp <base-url>
       x jupyter-csharp <base-url> <request>
       x jupyter-csharp <base-url> <request> {js-object}
       x jupyter-csharp <base-url> <request> < body.json

Options:
 -out <file>            Save notebook to file
 -include <pattern>     Include Types DTOs pattern
`)])],-1),v=e("p",null,[t("The same syntax for invoking APIs with the "),e("a",{href:"/post-command"},"Post Command HTTP Utils"),t(" can also be used to generate C# Jupyter Notebooks, e.g:")],-1),b=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,[t("x jupyter-csharp "),e("a",{href:"https://techstacks.io",target:"_blank",rel:"noopener noreferrer"},"https://techstacks.io"),t(` FindTechStacks "{Ids:[1,2,3],VendorName:'Google',Take:5}"`)])])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),m=n(`<p>Output:</p><div class="language-"><pre><code>Saved to: techstacks.io-FindTechStacks.ipynb
</code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Jupyter Notebooks can also be created with the API Explorer UI at <a href="https://apps.servicestack.net" target="_blank" rel="noopener noreferrer">apps.servicestack.net</a></p></div><h2 id="setup-jupyter-for-c-locally" tabindex="-1">Setup Jupyter for C# locally <a class="header-anchor" href="#setup-jupyter-for-c-locally" aria-hidden="true">#</a></h2><p>To get working with JupyterLabs to run locally with a C# kernel, there are a few things you&#39;ll need to have installed.</p><ul><li>Latest dotnet 5.0+ SDK</li><li>Python 3.7+ with pip</li></ul><p>With both dotnet SDK and Python installed, you can then install JupyterLab, Dotnet Interactive and register the dotnet kernels with the following commands.</p><div class="language-bash"><pre><code><span class="token comment"># Install jupyterlab to default Python interpreter</span>
pip <span class="token function">install</span> jupyterlab
<span class="token comment"># Install Dotnet Interactive dotnet tool</span>
dotnet tool <span class="token function">install</span> -g Microsoft.dotnet-interactive
<span class="token comment"># Get Dotnet Interactive to register kernels with Jupyter  </span>
dotnet interactive jupyter <span class="token function">install</span>
</code></pre></div><p>To verify these have been installed successfully, you can list the currently registered kernels using the command.</p>`,9),f=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"jupyter kernelspec list")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),x=e("p",null,[t("This should list "),e("code",null,".net-csharp"),t(" as one of the kernels which is what the C# notebooks will use.")],-1),_=e("h2",{id:"running-jupyterlab",tabindex:"-1"},[t("Running JupyterLab "),e("a",{class:"header-anchor",href:"#running-jupyterlab","aria-hidden":"true"},"#")],-1),j=e("p",null,"With everything setup, navigate to a local directory with your notebooks and run:",-1),T=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,"jupyter-lab")])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),S=e("p",null,[t("The context of where this command is run from matter as JupyterLab will mount list files in the same directory is was run, so make sure your running the "),e("code",null,"jupyter-lab"),t(" command from where your notebooks are located or where you new notebooks to be saved.")],-1),N=e("h2",{id:"example-generated-notebook",tabindex:"-1"},[t("Example generated notebook "),e("a",{class:"header-anchor",href:"#example-generated-notebook","aria-hidden":"true"},"#")],-1),V=e("p",null,"From your notebook directory that JupyterLab is using, open a new command prompt/terminal and run:",-1),C=e("div",{class:"sh-copy cp flex cursor-pointer mb-3",onclick:"copy(this)"},[e("div",{class:"flex-grow bg-gray-800"},[e("div",{class:"pl-4 py-1 pb-1.5 align-middle whitespace-pre text-base text-gray-100"},[e("p",null,[t("x jupyter-csharp "),e("a",{href:"https://covid-vac-watch.netcore.io",target:"_blank",rel:"noopener noreferrer"},"https://covid-vac-watch.netcore.io"),t(" QueryVaccinationRates")])])]),e("div",{class:"flex"},[e("div",{class:"bg-green-600 text-white p-1.5 pb-0"},[e("svg",{class:"copied w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 13l4 4L19 7"})]),e("svg",{class:"nocopy w-6 h-6",title:"copy",fill:"none",stroke:"white",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"})])])])],-1),M=n(`<p>This will generate the file <code>covid_vac_watch.netcore.io-QueryVaccinationRates.ipynb</code> in that directory. This file has everything that is needed to call the <code>QueryVaccinationRates</code> service and display data in the response.</p><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/jupyter-lab-csharp-example.png" alt=""></p><h3 id="visualize-the-data" tabindex="-1">Visualize the data <a class="header-anchor" href="#visualize-the-data" aria-hidden="true">#</a></h3><p>These generated notebooks are designed to be a starting point with all the data plumbing setup done for you. Taking this example further, we can visualize the data using <a href="https://plotly.net/" target="_blank" rel="noopener noreferrer">Plotly.NET</a>, a NuGet library that generates plotly.js visuals using .NET. Run at least the first two cells and then add a new cell at the bottom of the generated notebook with the following code.</p><div class="language-csharp"><pre><code><span class="token preprocessor property">#r </span><span class="token string">&quot;nuget: Plotly.NET, 2.0.0-preview.6&quot;</span>
<span class="token preprocessor property">#r </span><span class="token string">&quot;nuget: Plotly.NET.Interactive, 2.0.0-preview.6&quot;</span>

<span class="token keyword">using</span> <span class="token namespace">Plotly<span class="token punctuation">.</span>NET</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> xData <span class="token operator">=</span> response<span class="token punctuation">.</span>Results<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>Date<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> yData <span class="token operator">=</span> response<span class="token punctuation">.</span>Results<span class="token punctuation">.</span><span class="token function">Select</span><span class="token punctuation">(</span>x <span class="token operator">=&gt;</span> x<span class="token punctuation">.</span>DailyVaccinations <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token punctuation">?</span> <span class="token number">0</span> <span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token keyword">decimal</span><span class="token punctuation">)</span><span class="token punctuation">(</span>x<span class="token punctuation">.</span>DailyVaccinations<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">GenericChart<span class="token punctuation">.</span>GenericChart</span> chart <span class="token operator">=</span> Chart<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Point</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DateTime<span class="token punctuation">,</span><span class="token keyword">decimal</span><span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token named-parameter punctuation">x</span><span class="token punctuation">:</span> xData<span class="token punctuation">,</span> <span class="token named-parameter punctuation">y</span><span class="token punctuation">:</span> yData<span class="token punctuation">,</span> <span class="token named-parameter punctuation">Name</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
chart
    <span class="token punctuation">.</span><span class="token function">WithTraceName</span><span class="token punctuation">(</span><span class="token string">&quot;Daily Vaccinations&quot;</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithX_AxisStyle</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">title</span><span class="token punctuation">:</span> <span class="token string">&quot;Vaccinations&quot;</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">Showgrid</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">Showline</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithY_AxisStyle</span><span class="token punctuation">(</span><span class="token named-parameter punctuation">title</span><span class="token punctuation">:</span> <span class="token string">&quot;Date&quot;</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">Showgrid</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token named-parameter punctuation">Showline</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">display</span><span class="token punctuation">(</span>chart<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div><p>The code above does several things.</p><ul><li>Import the 2 required <a href="http://Plotly.NET" target="_blank" rel="noopener noreferrer">Plotly.NET</a> NuGet dependencies.</li><li>Declares <code>using</code> statement.</li><li>Transforms response data into 2 equal list of primitive data.</li><li>Generates a plot with <code>Date</code> on the X axis and <code>DailyVaccinations</code> on the Y axis.</li></ul><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/jupyter-lab-visual-example.png" alt=""></p><h2 id="try-it-out-yourself-using-mybinder-with-generated-notebooks" tabindex="-1">Try it out yourself using MyBinder with generated notebooks <a class="header-anchor" href="#try-it-out-yourself-using-mybinder-with-generated-notebooks" aria-hidden="true">#</a></h2><p>Another way to work with Jupyter, C# and ServiceStack generated notebooks is to do with via <a href="https://mybinder.org/" target="_blank" rel="noopener noreferrer">MyBinder</a>. MyBinder is a free hosted service that gives you an isolated docker container to run your notebooks if you are just trying something out.</p><p><a href="https://mybinder.org/v2/gh/ServiceStack/jupyter-notebooks/HEAD" target="_blank" rel="noopener noreferrer"><img src="https://mybinder.org/badge_logo.svg" alt=""></a></p><ul><li>Click on the <code>Launch Binder</code> badge above and wait for it to launch into a Jupyter web UI (it can take a min or two sometimes)</li><li>Goto <code>New</code> and select <code>Terminal</code>.</li><li>In the terminal use the ServiceStack <code>x</code> tool to generate a new C# notebook like before <ul><li><code>x jupyter-csharp https://covid-vac-watch.netcore.io QueryVaccinationRates</code></li></ul></li><li>Navigate back to Jupyter file explorer and see your generated notebook.</li><li>Open the new notebook and <strong>run</strong> the generated cells.</li><li>Add a new cell with the same code for <a href="http://Plotly.NET" target="_blank" rel="noopener noreferrer">Plotly.NET</a> as above and run</li></ul><p><img src="https://raw.githubusercontent.com/ServiceStack/docs/master/docs/images/jupyter/jupyter-mybinder-visual-example.png" alt=""></p>`,13),D=[r,i,c,u,d,h,k,g,y,w,v,b,m,f,x,_,j,T,S,N,V,C,M];function P(J,B,I,q,E,L){return p(),o("div",null,D)}var H=s(l,[["render",P]]);export{G as __pageData,H as default};
