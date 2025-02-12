import { createApp, createSSRApp } from "vue";
import { createPinia } from "pinia";
import setAuthHheader from "./app/setAuthHheader";
import { createI18n } from "vue-i18n";
import { createMetaManager } from "vue-meta";
import { LocalSotreUtils } from "./vendors/utils/localStore.utils";
import { CryptUtils } from "./vendors/utils/crypt.utils";
import VueLazyLoad from "vue3-lazyload";
import moshaToast from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
/**
 * import locale messages resource from json for global scope
 */
import enUS from "./translate/en-US.json";
import frFR from "./translate/fr-FR.json";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/styles/tailwind.css";

import { Vue3ProgressPlugin } from "@marcoschulte/vue3-progress";

let jToken: any;
const jStore = new LocalSotreUtils();
const jCryp = new CryptUtils();
const getToken = localStorage.getItem("CapacitorStorage.jToken")
  ? localStorage.getItem("CapacitorStorage.jToken")
  : null;
jToken = getToken ? jCryp.qDecrypted(getToken) : null;

if (jToken) {
  setAuthHheader(jToken);
} else {
  setAuthHheader(false);
}
/**
 * Verifier id user connection is finish step of creation profile
 */

/**
 * setup vue-i18n with i18n resources with global type definition.
 * if you define the i18n resource schema in your `*.d.ts`, these is checked with typeScript.
 */
const i18n = createI18n<false>({
  legacy: false,
  locale: "fr",
  fallbackLocale: ["fr", "en"],
  messages: {
    en: {
      message: enUS,
    },
    fr: {
      message: frFR,
    },
  },
});

const metaManager = createMetaManager();

const app = createSSRApp(App);

app.use(i18n);
app.use(createPinia());
app.use(Vue3ProgressPlugin);
app.use(router);

app.use(metaManager, {
  // optional pluginOptions
  refreshOnceOnNavigation: true,
});
app.use(VueLazyLoad, {
  loading: "/images/placeholder/placeholder.png",
  error: "/images/placeholder/placeholder.png",
});
app.use(moshaToast);
// app.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://localhost:8080',
// }))

app.mount("#app");
