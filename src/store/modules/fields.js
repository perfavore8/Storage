import { BaseURL } from "@/composables/BaseURL";
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
      state.all_fields = [
        ...value.sort((a, b) => {
          if (a.table_config.sort > b.table_config.sort) return 1;
          if (a.table_config.sort == b.table_config.sort) return 0;
          if (a.table_config.sort < b.table_config.sort) return -1;
        }),
      ];
    },
    update_fields_with_parents(state, value) {
      state.fields_with_parents = [...value];
    },
  },
  actions: {
    async get_types(context) {
      const url = BaseURL + "field/types";
      const res = await fetch(url);
      const json = await res.json();
      context.commit("update_types", json.data);
    },
    async get_fields(context, category_id) {
      const url = BaseURL + "field/list";
      const res = await fetch(
        url + "?category_id=" + category_id + "&with_parents=0"
      );
      const json = await res.json();
      context.commit("update_fields", json.data);
    },
    async get_all_fields(context) {
      const url = BaseURL + "field/list";
      const res = await fetch(url);
      const json = await res.json();
      context.commit("update_all_fields", json.data);
    },
    async get_fields_not_save(context, category_id) {
      const url = BaseURL + "field/list";
      const res = await fetch(
        url + "?category_id=" + category_id + "&with_parents=0"
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
          "&sort=created"
      );
      const json = await res.json();
      // console.log(json.data);
      context.commit("update_fields_with_parents", json.data);
    },
    async delete_field(context, id) {
      const url = BaseURL + "field/delete";
      const res = await fetch(url + "?id=" + id, { method: "POST" });
      // context.dispatch("get_fields");
      console.log(res);
    },
    async add_field(context, params) {
      const url = BaseURL + "field/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_fields", json);
      return json;
    },
    async update_config_table(context, params) {
      const url = BaseURL + "field/update-config-table";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_config_table", json);
      context.dispatch("get_all_fields");
      return json;
    },
  },
};
