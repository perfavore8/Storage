import { BaseURL, TOKEN } from "@/composables/BaseURL";
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
      const url = BaseURL + "task/list";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateTusks", json);
    },
    async syncGsAmo() {
      const url = BaseURL + "product/sync-gs-amo";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      console.log("syncGsAmo", json);
      return json;
    },
    async syncAmoGs() {
      const url = BaseURL + "product/sync-amo-gs";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      console.log("syncAmoGs", json);
      return json;
    },
  },
};
