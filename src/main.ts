/* eslint-disable import/order */
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import { createToaster } from '@meforma/vue-toaster'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

loadFonts()

// Create vue app
const app = createApp(App)
const toaster = createToaster({
  position: 'top-right',
})

app.config.globalProperties.$notify = toaster

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.provide('$notify', toaster)

// Mount vue app
app.mount('#app')
