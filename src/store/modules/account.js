import { BaseURL, TOKEN } from "@/composables/BaseURL";
export default {
  state: {
    account: {},
    user: {},
    currencies: {},
    tableConfig: {},
    pipelinesList: {},
    leadFieldsList: {},
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
    updateTableConfig(state, value) {
      state.tableConfig = { ...value };
    },
    updatePipelinesList(state, value) {
      state.pipelinesList = { ...value };
    },
    updateLeadFieldsList(state, value) {
      state.leadFieldsList = { ...value };
    },
  },
  actions: {
    async get_account(context) {
      const url = BaseURL + "account/config";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_account", json.account);
      context.commit("update_user", json.user);
    },
    async getTableConfig(context, code) {
      const url = BaseURL + "account/table-config";
      const res = await fetch(url + "?code=" + code, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateTableConfig", json);
    },
    async update_config_table(context, params) {
      const url = BaseURL + "account/table-config";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params.value),
      });
      const json = await res.json();
      console.log("update_config_table", json);
      await context.dispatch("getTableConfig", params.wh, {
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("get_all_fields");
      return json;
    },
    async get_currencies(context) {
      const url = BaseURL + "account/currencies";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_currencies", json);
    },
    async getPipelinesList(context) {
      const url = BaseURL + "account/pipelines";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updatePipelinesList", json);
    },
    async getLeadFieldsList(context) {
      const url = BaseURL + "account/lead-fields";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateLeadFieldsList", json);
    },
    async update_account(context, params) {
      const url = BaseURL + "account/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
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
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_user", json);
      context.dispatch("get_account");
      return json;
    },
  },
};
