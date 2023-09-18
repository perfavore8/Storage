import router from "@/router";
import { reactive } from "vue";
import { useSaveLS } from "./saveLS";
import { createI18n } from "vue-i18n";
import { messages } from "@/composables/messages";

const { saveLSParam, getSavedLSParam } = useSaveLS();
const langConfiguration = reactive({
  selected: {},
  list: [
    { name: "English", value: "en" },
    { name: "Русский", value: "ru", default: true },
  ],
  select: function (option, initial) {
    saveLSParam("lang", option.value);
    this.selected = option;
    if (!initial) router.go(0);
  },
  getSavedlang: function () {
    const savedLang = getSavedLSParam("lang");
    const item = this.list.find((el) => el.value === savedLang);
    if (!item) {
      this.dropToDefault();
      return;
    }
    this.select(item, true);
  },
  dropToDefault: function () {
    const item = this.list.find((el) => el.default);
    if (!item) return;
    this.select(item, true);
  },
});
langConfiguration.getSavedlang();

const i18n = createI18n({
  locale: langConfiguration.selected.value, // set locale
  fallbackLocale: { default: ["en", "ru"] }, // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

const t = (...args) => i18n.global.t(...args);

export function useLangConfiguration() {
  return { langConfiguration, i18n, t };
}
