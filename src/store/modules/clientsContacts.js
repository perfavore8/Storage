import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL, TOKEN } from "@/composables/BaseURL";
import { computed } from "vue";
import { useClients } from "@/composables/clients";
import { useClientsTabs } from "@/composables/clientsTabs";

const { preparation_params } = usePreparationQueryParams();
const { tabs } = useClientsTabs();
const selectedTabComp = computed(() => tabs.selected);
const { getClientsList } = useClients(selectedTabComp);

export default {
  state: {
    types: [],
    fields: [],
    list: [],
    meta: {
      links: {},
      meta: {},
    },
    params: {
      page: 1,
      filter: {},
      sort: {},
    },
  },
  getters: {},
  mutations: {
    updateContactsList(state, value) {
      state.list = [...value];
    },
    updateContactsTypes(state, value) {
      state.types = [...Object.values(value)];
    },
    updateContactsFields(state, value) {
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
    updateContactsMeta(state, value) {
      state.meta = { ...value };
    },
    updateContactsParams(state, params) {
      Object.assign(state.params, params);
    },
  },
  actions: {
    async getClientsContactsList(context, params) {
      const url = BaseURL + "contact/list";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateContactsMeta", {
        links: json.links,
        meta: json.meta,
      });
      context.commit("updateContactsList", json.data);
    },
    async addClientsContacts(context, params) {
      const url = BaseURL + "contact/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      getClientsList();

      return json;
    },
    async updateClientsContacts(context, params) {
      const url = BaseURL + "contact/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      getClientsList();
    },
    async deleteClientsContacts(context, params) {
      const url = BaseURL + "contact/delete";
      await fetch(url + preparation_params(params), {
        headers: { Authorization: TOKEN },
      });

      getClientsList();
    },

    async linkClientsContacts(context, params) {
      const url = BaseURL + "contact/companies/link";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async unlinkClientsContacts(context, params) {
      const url = BaseURL + "contact/companies/unlink";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },

    async getClientsContactsTypes(context) {
      const url = BaseURL + "company/field/types"; //!!!!!!!!!!!!!<-company
      const res = await fetch(url, {
        headers: { Authorization: TOKEN },
      });
      const json = await res.json();
      context.commit("updateContactsTypes", json);
    },

    async getClientsContactsFields(context) {
      const url = BaseURL + "contact/field/list";
      const res = await fetch(url, {
        headers: { Authorization: TOKEN },
      });
      const json = await res.json();
      context.commit("updateContactsFields", json);
    },
    async addClientsContactsField(context, params) {
      const url = BaseURL + "contact/field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      return json;
    },
    async updateClientsContactsField(context, params) {
      const url = BaseURL + "contact/field/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },
    async deleteClientsContactsField(context, params) {
      const url = BaseURL + "contact/field/delete";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },

    async getClientsContactsAutocomplete(context, params) {
      const url = BaseURL + "contact/autocomplete";
      const res = await fetch(url + preparation_params(params), {
        headers: { Authorization: TOKEN },
      });
      const json = await res.json();

      return json;
    },
  },
};
