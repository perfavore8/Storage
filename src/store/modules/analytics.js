import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL } from "@/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    autocomplete: [],
  },
  getters: {},
  mutations: {
    updateAutocomplete(state, value) {
      if (value) state.autocomplete = [...value];
    },
  },
  actions: {
    async getAutocompleteAnalytics(context, params) {
      const url = BaseURL + "analytics/autocomplete/"; // <----- слэш не трогай!!!
      const res = await fetch(
        url + params.field + preparation_params(params.value)
      );
      const json = await res.json();
      context.commit("updateAutocomplete", json);
    },
  },
};
