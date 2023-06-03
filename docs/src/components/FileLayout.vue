<template>
<div>
    <FileLayoutFile v-for="(contents,label) in files" :label="`${label}`" :contents="contents" />
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
    files: any
}>()
</script>
