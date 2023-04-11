import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL } from "@/components/WidgetAddToDeal/src/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();

export default {
  state: {
    categories: [],
    fields_properties: [],
    fields_properties2: [],
  },
  getters: {},
  mutations: {
    updateCategories(state, value) {
      state.categories = [...value];
    },
    update_fields_properties(state, value) {
      state.fields_properties = [...value];
    },
    update_fields_properties2(state, value) {
      state.fields_properties2 = [...value];
    },
  },
  actions: {
    async getCategoriesW(context, params) {
      const myPromise = await new Promise((resolve) => {
        const url = BaseURL + "categories";
        let response = [];
        (async () => {
          const res = await fetch(url + preparation_params(params), {});
          response = await res.json();
          context.commit("updateCategories", response);
          resolve(response);
        })();
      });
      return myPromise;
    },
    async get_fields_propertiesW(context, params) {
      const url = BaseURL + "category/list";
      let response = [];

      const res = await fetch(url + preparation_params(params), {});
      response = await res.json();
      context.commit("update_fields_properties", response);

      return response;
    },
    async get_fields_properties2W(context, params) {
      const url = BaseURL + "categories/list";
      let response = [];

      const res = await fetch(url + preparation_params(params), {});
      response = await res.json();

      return response;
    },
  },
};
