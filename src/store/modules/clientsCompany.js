import { BaseURL, TOKEN } from "@/composables/BaseURL";
export default {
  state: {
    types: [],
    fields: [],
    list: [],
  },
  getters: {},
  mutations: {
    updateCompanyList(state, value) {
      state.list = [...value];
    },
    updateCompanyTypes(state, value) {
      state.types = [...Object.values(value)];
    },
    updateCompanyFields(state, value) {
      const componentsList = {
        1: "EditInteger",
        2: "EditFloat",
        3: "EditString",
        4: "EditText",
        5: "EditSelector",
        6: "EditMultiSelector",
        7: "EditDate",
        8: "EditDateTime",
        9: "EditFlag",
      };
      value.map((field) => (field.component = componentsList[field.type]));
      state.fields = [...value];
    },
  },
  actions: {
    async getClientsCompanyList(context) {
      const url = BaseURL + "company/field/list";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateCompanyList", json);
    },
    async getClientsCompanyTypes(context) {
      const url = BaseURL + "company/field/types";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateCompanyTypes", json);
    },
    async getClientsCompanyFields(context) {
      const url = BaseURL + "company/field/list";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateCompanyFields", json);
    },
    async addClientsCompanyField(context, params) {
      const url = BaseURL + "company/field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.dispatch("getClientsCompanyList");
      return json;
    },
    async updateClientsCompanyField(context, params) {
      const url = BaseURL + "company/field/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      context.dispatch("getClientsCompanyList");
    },
    async deleteClientsCompanyField(context, params) {
      const url = BaseURL + "company/field/delete";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      context.dispatch("getClientsCompanyList");
    },
  },
};
