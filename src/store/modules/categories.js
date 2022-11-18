import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    fields_properties: [],
  },
  getters: {
    fields_properties(state) {
      return state.fields_properties;
    },
  },
  mutations: {
    update_fields_properties(state, value) {
      state.fields_properties = [...value];
    },
  },
  actions: {
    async get_fields_properties(context) {
      const url = "http://api.gosklad.ru/v1/category/list";
      const res = await fetch(url, {
        rejectUnauthorized: false,
      });
      const json = await res.json();
      context.commit("update_fields_properties", json);
    },
    async add_fields_properties(context, params) {
      const url = "http://api.gosklad.ru/v1/category/add";
      await fetch(url + preparation_params(params), { method: "POST" });
      context.dispatch("get_fields_properties");
    },
    async update_fields_properties(context, params) {
      const url = "http://api.gosklad.ru/v1/category/update";
      await fetch(url + preparation_params(params), { method: "POST" });
      context.dispatch("get_fields_properties");
    },
    async delete_fields_properties(context, params) {
      const url = "http://api.gosklad.ru/v1/category/delete";
      const res = await fetch(url + preparation_params(params), {
        method: "POST",
      });
      context.dispatch("get_fields_properties");
      console.log(res);
    },
  },
};
