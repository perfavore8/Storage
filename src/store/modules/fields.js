import { BaseURL, getTOKEN } from "@/composables/BaseURL";
import store from "..";
export default {
  state: {
    types: {},
    fields: [],
    fields_with_parents: [],
    all_fields: [],
  },
  getters: {},
  mutations: {
    update_types(state, value) {
      Object.assign(state.types, value);
    },
    update_fields(state, value) {
      state.fields = [...value];
    },
    update_all_fields(state, value) {
      const tableConfig = store.state.account.tableConfig;
      const list = value.sort((a, b) => {
        if (tableConfig[a.code]?.sort > tableConfig[b.code]?.sort) return 1;
        if (tableConfig[a.code]?.sort == tableConfig[b.code]?.sort) return 0;
        if (tableConfig[a.code]?.sort < tableConfig[b.code]?.sort) return -1;
      });
      state.all_fields = [...list];
    },
    update_fields_with_parents(state, value) {
      state.fields_with_parents = [...value];
    },
  },
  actions: {
    async get_types(context) {
      const url = BaseURL + "field/types";
      const res = await fetch(url, {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("update_types", json.data);
    },
    async get_fields(context, category_id) {
      const url = BaseURL + "field/list";
      const res = await fetch(
        url + "?category_id=" + category_id + "&with_parents=0",
        {
          headers: {
            Authorization: getTOKEN(),
          },
        }
      );
      const json = await res.json();
      context.commit("update_fields", json);
    },
    async get_all_fields(context) {
      const url = BaseURL + "field/list";
      const res = await fetch(url, {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("update_all_fields", json);
    },
    async get_fields_not_save(context, category_id) {
      const url = BaseURL + "field/list";
      const res = await fetch(
        url + "?category_id=" + category_id + "&with_parents=0",
        {
          headers: {
            Authorization: getTOKEN(),
          },
        }
      );
      const json = await res.json();
      return json.data;
    },
    async get_fields_with_parents(context, category_id) {
      const url = BaseURL + "field/list";
      const res = await fetch(
        url +
          "?category_id=" +
          category_id +
          "&with_parents=1" +
          "&sort=created",
        {
          headers: {
            Authorization: getTOKEN(),
          },
        }
      );
      const json = await res.json();
      context.commit("update_fields_with_parents", json);
    },
    async delete_field(context, id) {
      const url = BaseURL + "field/delete";
      const res = await fetch(url + "?id=" + id, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
        },
      });
      // context.dispatch("get_fields");
      console.log(res);
    },
    async add_field(context, params) {
      const url = BaseURL + "field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      // context.dispatch("get_fields");
      console.log("add_field", json);
      return json;
    },
    async update_fields(context, params) {
      const url = BaseURL + "field/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getTOKEN(),
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_fields", json);
      return json;
    },
  },
};
