import { BaseURL } from "@/composables/BaseURL";
export default {
  state: {
    account: {},
    user: {},
    currencies: {},
  },
  getters: {},
  mutations: {
    update_account(state, value) {
      state.account = { ...value };
    },
    update_user(state, value) {
      state.user = { ...value };
    },
    update_currencies(state, value) {
      state.currencies = { ...value };
    },
  },
  actions: {
    async get_account(context) {
      const url = BaseURL + "account/config";
      const res = await fetch(url);
      const json = await res.json();
      context.commit("update_account", json.account);
      context.commit("update_user", json.user);
    },
    async get_currencies(context) {
      const url = BaseURL + "account/currencies";
      const res = await fetch(url);
      const json = await res.json();
      context.commit("update_currencies", json);
    },
    async update_account(context, params) {
      const url = BaseURL + "account/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_account", json);
      return json;
    },
    async update_user(context, params) {
      const url = BaseURL + "user/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_user", json);
      return json;
    },
  },
};
