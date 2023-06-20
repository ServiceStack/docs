<template>
<div>
    <div v-if="label == '_'">
        <div v-for="file in contents" class="ml-6 flex items-center text-base leading-8">
            <svg class="mr-1 text-slate-600" aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z"></path></svg>
            <span>{{file}}</span>
        </div>
    </div>
    <div v-else>
        <div class="ml-6">
            <div class="flex items-center text-base leading-8">
                <svg class="mr-1 text-slate-600" aria-hidden="true" focusable="false" role="img" viewBox="0 0 12 12" width="12" height="12" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M6 8.825c-.2 0-.4-.1-.5-.2l-3.3-3.3c-.3-.3-.3-.8 0-1.1.3-.3.8-.3 1.1 0l2.7 2.7 2.7-2.7c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1l-3.2 3.2c-.2.2-.4.3-.6.3Z"></path></svg>
                <svg class="mr-1 text-sky-500" aria-hidden="true" focusable="false" role="img" viewBox="0 0 16 16" width="16" height="16" fill="currentColor" style="display: inline-block; user-select: none; vertical-align: text-bottom; overflow: visible;"><path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v.5H2.75a.75.75 0 0 0 0 1.5h11.978a1 1 0 0 1 .994 1.117L15 13.25A1.75 1.75 0 0 1 13.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75c0-.464.184-.91.513-1.237Z"></path></svg>
                <span>{{label}}</span>
            </div>
            <FileLayoutFile v-for="(children,item) in contents" :label="`${item}`" :contents="children" />
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import FileLayoutFile from './FileLayoutFile.vue'

/**
 files: {
        emails: { 
            layouts:  { _: ['basic.html','empty.html','marketing.html'] },
            partials: { _: ['button-centered.html','divider.html','image-centered.html','section.html','title.html'] },
            vars:     { _: ['info.txt','urls.txt'] },
            _:        ['empty.html','newsletter-welcome.html','newsletter.html','verify-email.html'] 
        }
    }
*/
defineProps<{
    label: string
    contents: any
    depth?: number
}>()
</script>
