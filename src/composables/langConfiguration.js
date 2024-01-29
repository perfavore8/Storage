import router from "@/router";
import { onMounted, reactive } from "vue";
import { useSaveLS } from "./saveLS";
import { createI18n } from "vue-i18n";
import { messages } from "@/composables/messages";
// import { ApiReqFunc } from "./ApiReqFunc";

const { saveLSParam, getSavedLSParam } = useSaveLS();
const langConfiguration = reactive({
  selected: {},
  list: [
    { name: "English", value: "en", default: true },
    { name: "Русский", value: "ru" },
  ],
  select: async function (option, initial, save) {
    saveLSParam("lang", option.value);
    this.selected = option;
    if (save) {
      const { instance, savedToken } = require("./BaseURL");
      if (savedToken)
        await instance({
          method: "post",
          url: "account/user/update",
          data: { lang: this.selected.value },
        });
    }
    if (!initial) router.go(0);
  },
  getSavedlang: function () {
    const savedLang = getSavedLSParam("lang");
    const item = this.list.find((el) => el.value === savedLang);
    if (!item) {
      this.getBrowserLang();
      return;
    }
    this.select(item, true);
  },
  dropToDefault: function () {
    const item = this.list.find((el) => el.default);
    if (!item) return;
    this.select(item, true);
  },
  getBrowserLang: function () {
    const lang = (navigator.language || navigator.userLanguage).split("-")[0];
    const item = this.list.find((el) => el.value === lang);
    if (item) {
      this.select(item, true);
      return;
    }
    this.dropToDefault();
  },
});

langConfiguration.getSavedlang();

let getted = false;

const i18n = createI18n({
  locale: langConfiguration.selected.value, // set locale
  fallbackLocale: { default: ["en", "ru"] }, // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

const t = (...args) => i18n.global.t(...args);
const tc = (...args) => i18n.global.tc(...args);

export function useLangConfiguration() {
  onMounted(() => {
    if (getted) return;
    langConfiguration.select(langConfiguration.selected, true, true);
    getted = true;
  });
  return { langConfiguration, i18n, t, tc };
}
