import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL, getTOKEN } from "@/composables/BaseURL";
import { computed } from "vue";
import { useClients } from "@/composables/clients";
import { useClientsTabs } from "@/composables/clientsTabs";

const { preparation_params } = usePreparationQueryParams();
const { tabs } = useClientsTabs();
const selectedTabComp = computed(() => tabs.selected);
const { getClientsList } = useClients(selectedTabComp);

export default {
  state: {
    types: {},
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
    updateCompanyList(state, value) {
      state.list = [...value];
    },
    updateCompanyTypes(state, value) {
      Object.assign(state.types, value);
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
    updateCompanyMeta(state, value) {
      state.meta = { ...value };
    },
    updateCompanyParams(state, params) {
      Object.assign(state.params, params);
    },
  },
  actions: {
    async getClientsCompanyList(context, params) {
      const url = BaseURL + "company/list";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateCompanyMeta", {
        links: json.links,
        meta: json.meta,
      });
      context.commit("updateCompanyList", json.data);
    },
    async addClientsCompany(context, params) {
      const url = BaseURL + "company/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      getClientsList();

      return json;
    },
    async updateClientsCompany(context, params) {
      const url = BaseURL + "company/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      getClientsList();
    },
    async deleteClientsCompany(context, params) {
      const url = BaseURL + "company/delete";
      await fetch(url + preparation_params(params), {
        headers: { Authorization: getTOKEN() },
      });

      getClientsList();
    },

    async linkClientsCompany(context, params) {
      const url = BaseURL + "company/contacts/link";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },
    async unlinkClientsCompany(context, params) {
      const url = BaseURL + "company/contacts/unlink";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      return json;
    },

    async getClientsCompanyTypes(context) {
      const url = BaseURL + "company/field/types";
      const res = await fetch(url, {
        headers: { Authorization: getTOKEN() },
      });
      const json = await res.json();
      context.commit("updateCompanyTypes", json);
    },

    async getClientsCompanyFields(context) {
      const url = BaseURL + "company/field/list";
      const res = await fetch(url, {
        headers: { Authorization: getTOKEN() },
      });
      const json = await res.json();
      context.commit("updateCompanyFields", json);
    },
    async addClientsCompanyField(context, params) {
      const url = BaseURL + "company/field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      return json;
    },
    async updateClientsCompanyField(context, params) {
      const url = BaseURL + "company/field/update";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },
    async deleteClientsCompanyField(context, params) {
      const url = BaseURL + "company/field/delete";
      await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
    },

    async getClientsCompanyAutocomplete(context, params) {
      const url = BaseURL + "company/autocomplete";
      const res = await fetch(url + preparation_params(params), {
        headers: { Authorization: getTOKEN() },
      });
      const json = await res.json();

      return json;
    },
  },
};
