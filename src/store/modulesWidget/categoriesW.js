import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { TOKEN, BaseURL } from "@/composables/BaseURL";
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
      const url = BaseURL + "orders/categories";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateCategories", json);

      return json;
    },
    async get_fields_propertiesW(context, params) {
      const url = BaseURL + "orders/category/list";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_fields_properties", json);

      return json;
    },
    async get_fields_properties2W(context, params) {
      const url = BaseURL + "orders/categories/list";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_fields_properties2", json);

      return json;
    },
  },
};
