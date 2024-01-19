import { ApiReqFunc } from "@/composables/ApiReqFunc";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async POCustomDocList(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/custom-doc/list",
          params: params,
        },
        true
      );

      return data;
    },
    async POCustomDocUpload(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/custom-doc/upload",
          params: params,
        },
        true
      );

      return data;
    },
    async POCustomDocDelete(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/custom-doc/delete",
          params: params,
        },
        true
      );

      return data;
    },
  },
};
