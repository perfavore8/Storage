import { ApiReqFunc } from "@/composables/ApiReqFunc";

export default {
  state: {
    templates: [],
  },
  getters: {},
  mutations: {
    update_templates(state, value) {
      state.templates = [...value];
    },
  },
  actions: {
    async PODocList(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/doc/list",
        params: params,
      });

      return data;
    },
    async PODocTemplates(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/doc/templates",
        params: params,
      });

      context.commit("update_templates", data);

      return data;
    },
    async PODocGenerate(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/doc/generate",
        params: params,
      });

      return data;
    },
    async PODocDelete(context, params) {
      const { data } = await ApiReqFunc({
        url: "public-order/doc/delete",
        params: params,
      });

      return data;
    },
  },
};
