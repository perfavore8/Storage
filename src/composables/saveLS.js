import router from "@/router";
import { useRoute } from "vue-router";

export function useSaveLS() {
  const route = useRoute();

  const saveQueryParam = (param, dontNeedReplace) => {
    const newQuery = Object.assign({}, route.query);
    localStorage.setItem(param, JSON.stringify(newQuery?.[param]));

    delete newQuery?.[param];

    if (!dontNeedReplace) router.replace({ query: newQuery });
  };

  const saveAllQueryParams = () => {
    Object.keys(route.query).forEach((key) => saveQueryParam(key, true));
    router.replace({ query: {} });
  };

  const saveLSParam = (param, value) =>
    localStorage.setItem(param, JSON.stringify(value));

  const getSavedLSParam = (param) => JSON.parse(localStorage.getItem(param));

  return { saveQueryParam, saveAllQueryParams, saveLSParam, getSavedLSParam };
}
