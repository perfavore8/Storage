import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApexCharts from "vue3-apexcharts";
import VueTheMask from "vue-the-mask";
import MaskEmail from "@yasanchezz/vue-mask-email";
import "@yasanchezz/vue-mask-email/dist/style.css";
import "@/tailwind.css";
import "material-icons/iconfont/material-icons.css";

import { useLangConfiguration } from "./composables/langConfiguration";
const { i18n } = useLangConfiguration();

createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .use(VueTheMask)
  .use(MaskEmail)
  .use(i18n)
  .mount("#app");
