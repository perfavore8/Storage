import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL, TOKEN } from "@/composables/BaseURL";
const { preparation_params } = usePreparationQueryParams();
export default {
  state: {
    types: [],
    fields: [],
    list: [],
  },
  getters: {},
  mutations: {
    updateClientList(state, value) {
      state.list = [...value];
    },
    updateClientTypes(state, value) {
      state.types = [...Object.values(value)];
    },
    updateClientFields(state, value) {
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
    async getClientsContactsList(context) {
      const url = BaseURL + "contact/field/list";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateClientList", json);
    },
    async getClientsContactsTypes(context) {
      const url = BaseURL + "contact/field/types";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateClientTypes", json);
    },
    async getClientsContactsFields(context) {
      const url = BaseURL + "contact/field/list";
      const res = await fetch(url, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("updateClientFields", json);
    },
    async addClientsContactsField(context, params) {
      const url = BaseURL + "contact/field/add";
      await fetch(url + preparation_params(params), {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("getClientsContactsList");
    },
    async updateClientsContactsField(context, params) {
      const url = BaseURL + "contact/field/update";
      await fetch(url + preparation_params(params), {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("getClientsContactsList");
    },
    async deleteClientsContactsField(context, params) {
      const url = BaseURL + "contact/field/delete";
      await fetch(url + preparation_params(params), {
        method: "POST",
        headers: {
          Authorization: TOKEN,
        },
      });
      context.dispatch("getClientsContactsList");
    },
  },
};
