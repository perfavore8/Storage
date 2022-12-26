import { BaseURL, TOKEN } from "@/composables/BaseURL";
export default {
  state: {
    account: {},
    user: {},
    currencies: {},
    tableConfig: {},
    pipelinesList: {},
    leadFieldsList: {},
    leadFieldGroupsList: {},
    productLists: {},
    syncFields: {},
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
    updateLeadFieldGroupsList(state, value) {
      state.leadFieldGroupsList = { ...value };
    },
    updateProductLists(state, value) {
      state.productLists = { ...value };
    },
    updateSyncFields(state, value) {
      state.syncFields = { ...value };
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
    async importOldData() {
      const url = BaseURL + "account/import-old-data ";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      return json;
    },
    async getGoogleAuthUrl() {
      const url = BaseURL + "account/google-auth-url";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      return json.url;
    },
    async googleLogOut() {
      const url = BaseURL + "account/google-logout";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      return json.url;
    },
    async genezisEnableDisable(context, param) {
      const url = BaseURL + "account/genezis-" + param;
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      return json.url;
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
      await context.dispatch("getTableConfig", params.wh);
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
    async getLeadFieldGroupsList(context) {
      const url = BaseURL + "account/lead-field-groups";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateLeadFieldGroupsList", json);
    },
    async getProductLists(context) {
      const url = BaseURL + "account/product-lists";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateProductLists", json);
    },
    async getSyncFields(context) {
      const url = BaseURL + "account/sync-fields";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateSyncFields", json);
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
