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
createApp(App)
  .use(store)
  .use(router)
  .use(VueApexCharts)
  .use(VueTheMask)
  .use(MaskEmail)
  .mount("#app");
