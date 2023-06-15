<template>
<div>
<section class="w-full flex flex-col justify-center text-center">
   <div id="empty" class="mt-4 mb-2">
      <div class="flex justify-center mb-16">
         <div class="w-70">
            <input v-model="project" type="text" placeholder="Project Name" autocorrect="off" spellcheck="false" @keypress="isAlphaNumeric"
                   class="mt-1 text-lg block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                          focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
         </div>
      </div>
      <div id="ssg" class="mt-4 mb-2">
         <h3 class="text-gray-400 text-xl mb-2">SSG Templates</h3>
         <div class="flex flex-wrap justify-center">
            <div>
               <a class="archive-url hover:no-underline netcoretemplates_vue-vite" :href="zipUrl('NetCoreTemplates/razor-ssg')">
                  <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
                     <div class="text-center font-extrabold flex items-center justify-center mb-2">
                        <div class="text-4xl text-blue-400 my-3">
                           <Icon icon="vscode-icons:file-type-razor" class="w-14 h-14 text-indigo-600" />
                        </div>
                     </div>
                     <div class="text-xl font-medium text-gray-700">Razor SSG</div>
                     <div class="flex justify-center h-8"></div>
                     <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
                     <div class="count mt-1 text-gray-400 text-sm"></div>
                  </div>
               </a>
               <a class="text-sm text-center mr-4" href="https://razor-ssg.web-templates.io">razor-ssg.web-templates.io</a>
            </div>
            <div>
               <a class="archive-url hover:no-underline netcoretemplates_web" :href="zipUrl('NetCoreTemplates/nextjs')">
                  <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
                     <div class="text-center font-extrabold flex items-center justify-center mb-2">
                        <div class="text-4xl text-blue-400 my-3">
                           <Icon icon="logos:nextjs-icon" class="w-14 h-14 border-2 bg-white rounded-full" />
                        </div>
                     </div>
                     <div class="text-xl font-medium text-gray-700">Next.js</div>
                     <div class="flex justify-center h-8"></div>
                     <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
                     <div class="count mt-1 text-gray-400 text-sm"></div>
                  </div>
               </a>
               <a class="text-sm text-center mr-4" href="https://nextjs.jamstacks.net">nextjs.jamstacks.net</a>
            </div>
            <div>
               <a class="archive-url hover:no-underline netcoretemplates_grpc" :href="zipUrl('NetCoreTemplates/vue-ssg')">
                  <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
                     <div class="text-center font-extrabold flex items-center justify-center mb-2">
                        <div class="text-4xl text-blue-400 my-3">
                           <Icon icon="logos:vue" class="w-14 h-14" />
                        </div>
                     </div>
                     <div class="text-xl font-medium text-gray-700">Vue SSG</div>
                     <div class="flex justify-center h-8"></div>
                     <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
                     <div class="count mt-1 text-gray-400 text-sm"></div>
                  </div>
               </a>
               <a class="text-sm text-center mr-4" href="https://vue-ssg.jamstacks.net">vue-ssg.jamstacks.net</a>
            </div>
         </div>
      </div>
   </div>
</section>
<section class="w-full flex flex-col justify-center text-center">
   <div id="spa" class="mt-4 mb-2">
      <h3 class="text-gray-400 text-xl mb-2">SPA Templates</h3>
      <div class="flex flex-wrap justify-center">
         <div>
            <a class="archive-url hover:no-underline netcoretemplates_blazor_tailwind" :href="zipUrl('NetCoreTemplates/blazor-tailwind')">
               <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600 dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
                  <div class="text-center font-extrabold flex items-center justify-center mb-2">
                     <div class="text-4xl text-blue-400 my-3">
                        <Icon icon="simple-icons:blazor" class="w-14 h-14 text-purple-500" />
                     </div>
                  </div>
                  <div class="text-xl font-medium text-gray-700">Blazor Tailwind</div>
                  <div class="flex justify-center h-8"></div>
                  <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
                  <div class="count mt-1 text-gray-400 text-sm"></div>
               </div>
            </a>
            <a class="text-sm text-center mr-4" href="https://blazor-tailwind.jamstacks.net">blazor-tailwind.jamstacks.net</a>
         </div>
         <div>
            <a class="archive-url hover:no-underline netcoretemplates_vue-vite" :href="zipUrl('NetCoreTemplates/vue-vite')">
               <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
                  <div class="text-center font-extrabold flex items-center justify-center mb-2">
                     <div class="text-4xl text-blue-400 my-3">
                        <Icon icon="logos:vue" class="w-14 h-14" />
                     </div>
                  </div>
                  <div class="text-xl font-medium text-gray-700">Vue Vite</div>
                  <div class="flex justify-center h-8"></div>
                  <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
                  <div class="count mt-1 text-gray-400 text-sm"></div>
               </div>
            </a>
            <a class="text-sm text-center mr-4" href="https://vue-vite.jamstacks.net">vue-vite.jamstacks.net</a>
         </div>
         <div>
            <a class="archive-url hover:no-underline netcoretemplates_blazor_wasm" :href="zipUrl('NetCoreTemplates/blazor-wasm')">
               <div class="bg-white dark:bg-gray-800 px-4 py-4 mr-4 mb-4 rounded-lg shadow-lg text-center items-center justify-center hover:shadow-2xl dark:border-2 dark:border-pink-600 dark:hover:border-blue-600 dark:border-2 dark:border-pink-600 dark:hover:border-blue-600" style="min-width:150px">
                  <div class="text-center font-extrabold flex items-center justify-center mb-2">
                     <div class="text-4xl text-blue-400 my-3">
                        <Icon icon="simple-icons:blazor" class="w-14 h-14 text-purple-500" />
                     </div>
                  </div>
                  <div class="text-xl font-medium text-gray-700">Blazor WASM</div>
                  <div class="flex justify-center h-8"></div>
                  <span class="archive-name px-4 pb-2 text-blue-600 dark:text-indigo-400">{{ projectZip }}</span>
                  <div class="count mt-1 text-gray-400 text-sm"></div>
               </div>
            </a>
            <a class="text-sm text-center mr-4" href="https://blazor-wasm.jamstacks.net">blazor-wasm.jamstacks.net</a>
         </div>
      </div>
   </div>
</section>   
</div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const project = ref('MyApp')
const projectZip = computed(() => (project.value || 'MyApp') + '.zip')
const zipUrl = (template:string) =>
    `https://account.servicestack.net/archive/${template}?Name=${project.value || 'MyApp'}`
const isAlphaNumeric = (e:KeyboardEvent) => {
    const c = e.charCode;
    if (c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || c === 95) //A-Za-z0-9_
    return;
    e.preventDefault()
}
</script>
