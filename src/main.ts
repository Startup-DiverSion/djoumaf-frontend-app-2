import { createApp } from 'vue'
import { createPinia } from 'pinia'
import setAuthHheader from './app/setAuthHheader'
import { createI18n } from 'vue-i18n'
import { createMetaManager } from 'vue-meta'
import { LocalSotreUtils } from './vendors/utils/localStore.utils'
import { CryptUtils } from './vendors/utils/crypt.utils'
import VueLazyLoad from 'vue3-lazyload'
import moshaToast from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

import enUS from './translate/en-US.json'
import frFR from './translate/fr-FR.json'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/styles/tailwind.css'

import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress'

let jToken: any
const jStore = new LocalSotreUtils()
const jCryp = new CryptUtils()
const getToken = localStorage.getItem('CapacitorStorage.jToken')
jToken = getToken ? jCryp.qDecrypted(getToken) : null

setAuthHheader(jToken || false)

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: ['fr', 'en'],
  messages: {
    en: enUS,
    fr: frFR,
  },
})

const metaManager = createMetaManager()

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(createPinia())
app.use(Vue3ProgressPlugin)
app.use(metaManager)
app.use(VueLazyLoad, {
  loading: '/images/placeholder/placeholder.png',
  error: '/images/placeholder/placeholder.png',
})
app.use(moshaToast)

app.mount('#app')
