import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {
    fields_properties: [],
    isLoading: false,
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
    updateIsLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async get_fields_properties(context) {
      context.commit("updateIsLoading", true);
      const { data } = await ApiReqFunc({
        url: "category/list",
      });
      context.commit("update_fields_properties", data);

      context.commit("updateIsLoading", false);
      return data;
    },
    async add_fields_properties(context, params) {
      const { data } = await ApiReqFunc({
        url: "category/add",
        method: "post",
        data: params,
      });
      context.dispatch("get_fields_properties");

      return data;
    },
    async update_fields_properties(context, params) {
      const { data } = await ApiReqFunc({
        url: "category/update",
        method: "post",
        data: params,
      });
      context.dispatch("get_fields_properties");

      return data;
    },
    async delete_fields_properties(context, params) {
      const { data } = await ApiReqFunc({
        url: "category/delete",
        method: "post",
        data: params,
      });
      context.dispatch("get_fields_properties");

      return data;
    },
  },
};
