import { ApiReqFunc } from "@/composables/ApiReqFunc";
import { useNewDeal } from "@/composables/newDeal";
const { newDealParams } = useNewDeal();

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
      const { data } = await ApiReqFunc(
        {
          url: "public-order/doc/list",
          params: { ...params, order_id: newDealParams.id },
        },
        true
      );

      return data;
    },
    async PODocTemplates(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/doc/templates",
          params: { ...params, order_id: newDealParams.id },
        },
        true
      );

      context.commit("update_templates", data);

      return data;
    },
    async PODocGenerate(context, params) {
      const { data } = await ApiReqFunc(
        {
          method: "post",
          url: "public-order/doc/generate",
          data: { ...params, order_id: newDealParams.id },
        },
        true
      );

      return data;
    },
    async PODocDelete(context, params) {
      const { data } = await ApiReqFunc(
        {
          url: "public-order/doc/delete",
          params: { ...params, order_id: newDealParams.id },
        },
        true
      );

      return data;
    },
  },
};
