import { JsonApiClient } from "@servicestack/client"
import ServiceStackVue, { useAppMetadata } from "@servicestack/vue"

import * as Vue from "vue"

export function createApp(App, props) {
    
    const client = JsonApiClient.create('https://blazor-gallery-api.jamstacks.net/')
    
    const app = Vue.createApp(App)
    app.provide('client', client)
    app.use(ServiceStackVue)
    
    const { clear, load } = useAppMetadata()
    clear({ olderThan: 24 * 60 * 60 * 1000 })
    load(null, { resolve:() => fetch('/gallery/metadata.json') })
    
    return app
}