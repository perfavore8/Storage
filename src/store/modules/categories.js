import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {
    fields_properties: [],
    isLoading: false,
    getPromise: null,
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
    updateIsLoadingCats(state, value) {
      state.isLoading = value;
    },
    updatePromise(state, value) {
      state.getPromise = value;
    },
  },
  actions: {
    async get_fields_properties(context, params) {
      context.commit("updateIsLoadingCats", true);
      if (context.getPromise !== null) {
        await context.getPromise;
        await new Promise((res) => setTimeout(() => res(), 100));
      }
      if (!params?.isUpdate && context.state.fields_properties.length) {
        context.commit("updateIsLoadingCats", false);
        return context.state.fields_properties;
      }
      delete params?.isUpdate;
      const promise = ApiReqFunc({
        url: "category/list",
      });
      context.commit("updatePromise", promise);
      const { data } = await promise;
      context.commit("update_fields_properties", data);

      context.commit("updateIsLoadingCats", false);
      return data;
    },
    async add_fields_properties(context, params) {
      const { data } = await ApiReqFunc({
        url: "category/add",
        method: "post",
        data: params,
      });
      context.dispatch("get_fields_properties", { isUpdate: true });

      return data;
    },
    async update_fields_properties(context, params) {
      const { data } = await ApiReqFunc({
        url: "category/update",
        method: "post",
        data: params,
      });
      await context.dispatch("get_fields_properties", { isUpdate: true });

      return data;
    },
    async delete_fields_properties(context, params) {
      const { data } = await ApiReqFunc({
        url: "category/delete",
        method: "post",
        data: params,
      });
      context.dispatch("get_fields_properties", { isUpdate: true });

      return data;
    },

    async getCatsField(context, params) {
      const { data } = await ApiReqFunc({
        url: "field/categories",
        params: params,
      });

      return data;
    },
  },
};
