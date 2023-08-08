import { computed } from "vue";
import { useClients } from "@/composables/clients";
import { useClientsTabs } from "@/composables/clientsTabs";
import { ApiReqFunc } from "@/composables/ApiReqFunc";

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
    updateContactsList(state, value) {
      state.list = [...value];
    },
    updateContactsTypes(state, value) {
      Object.assign(state.types, value);
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
      const { data } = await ApiReqFunc({
        url: "contact/list",
        method: "post",
        data: params,
      });
      context.commit("updateContactsMeta", {
        links: data.links,
        meta: data.meta,
      });
      context.commit("updateContactsList", data.data);

      return data;
    },
    async addClientsContacts(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/add",
        method: "post",
        data: params,
      });
      getClientsList();

      return data;
    },
    async updateClientsContacts(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/update",
        method: "post",
        data: params,
      });
      getClientsList();

      return data;
    },
    async deleteClientsContacts(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/delete",
        params: params,
      });
      getClientsList();

      return data;
    },

    async linkClientsContacts(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/companies/link",
        method: "post",
        data: params,
      });

      return data;
    },
    async unlinkClientsContacts(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/companies/unlink",
        method: "post",
        data: params,
      });

      return data;
    },

    async getClientsContactsTypes(context) {
      const { data } = await ApiReqFunc({
        url: "company/field/types",
      });
      context.commit("updateContactsTypes", data);

      return data;
    },

    async getClientsContactsFields(context) {
      const { data } = await ApiReqFunc({
        url: "contact/field/list",
      });
      context.commit("updateContactsFields", data);

      return data;
    },
    async addClientsContactsField(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/field/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async updateClientsContactsField(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/field/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async deleteClientsContactsField(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/field/delete",
        method: "post",
        data: params,
      });

      return data;
    },

    async getClientsContactsAutocomplete(context, params) {
      const { data } = await ApiReqFunc({
        url: "contact/autocomplete",
        params: params,
      });

      return data;
    },
  },
};
