import { ApiReqFunc } from "@/composables/ApiReqFunc";
export default {
  state: {
    tasks: [],
  },
  getters: {},
  mutations: {
    updateTusks(state, value) {
      state.tasks = value;
    },
  },
  actions: {
    async getTasks(context) {
      const { data } = await ApiReqFunc({
        url: "task/list",
      });
      context.commit("updateTusks", data);

      return data;
    },
    async syncGsAmo() {
      const { data } = await ApiReqFunc({
        url: "product/sync-gs-amo",
      });

      return data;
    },
    async syncAmoGs() {
      const { data } = await ApiReqFunc({
        url: "product/sync-amo-gs",
      });

      return data;
    },
  },
};
