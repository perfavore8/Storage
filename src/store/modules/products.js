import { BaseURL } from "@/composables/BaseURL";
export default {
  state: {
    products: [],
    editing_product: {},
    meta: {
      links: {},
      meta: {},
    },
  },
  getters: {},
  mutations: {
    update_products(state, value) {
      state.products = [...value];
    },
    update_editing_product(state, value) {
      state.editing_product = { ...value };
    },
    update_meta(state, value) {
      state.meta = { ...value };
    },
  },
  actions: {
    async get_products(context, params) {
      const url = BaseURL + "product/list";
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("update_meta", { links: json.links, meta: json.meta });
      context.commit("update_products", json.data);
    },
    async get_product(context, id) {
      const url = BaseURL + "product/get";
      const res = await fetch(url + "?id=" + id);
      const json = await res.json();
      context.commit("update_products", json);
    },
    async update_product(context, params) {
      const url = BaseURL + "product/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_product", json);
      return json;
    },
    async autocomplete_article(context, query) {
      const url = BaseURL + "product/autocomplete/article";
      const res = await fetch(url + "?query=" + query);
      const json = await res.json();
      return json.data;
    },
    async autocomplete_name(context, query) {
      const url = BaseURL + "product/autocomplete/name";
      const res = await fetch(url + "?query=" + query);
      const json = await res.json();
      return json.data;
    },
  },
};
