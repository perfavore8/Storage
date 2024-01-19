import { isPublicOrder } from "@/components/PublicOrder";
import { usePreparationQueryParams } from "@/components/WidgetAddToDeal/src/composables/preparationQueryParams";
import { getTOKEN, BaseURL, getPOTOKEN } from "@/composables/BaseURL";
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
    update_fields_propertiesW(state, value) {
      state.fields_properties = [...value];
    },
    update_fields_properties2W(state, value) {
      state.fields_properties2 = [...value];
    },
  },
  actions: {
    async getCategoriesW(context, params) {
      const url =
        BaseURL +
        (isPublicOrder.value ? "public-order/categories" : "orders/categories");

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("updateCategories", json);

      return json;
    },
    async get_fields_propertiesW(context, params) {
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/categories/list"
          : "orders/category/list");

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("update_fields_propertiesW", json);

      return json;
    },
    async get_fields_properties2W(context, params) {
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/categories/list"
          : "orders/categories/list");

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("update_fields_properties2W", json);

      return json;
    },
  },
};
