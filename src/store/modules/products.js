import { BaseURL, TOKEN } from "@/composables/BaseURL";
export default {
  state: {
    products: [],
    editing_product: {},
    meta: {
      links: {},
      meta: {},
    },
    productsParams: {
      page: 1,
      filter: {},
      sort: {},
    },
    isLoading: false,
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
    updateProductsParams(state, params) {
      Object.assign(state.productsParams, params);
    },
    updateIsLoading(state, value) {
      state.isLoading = value;
    },
  },
  actions: {
    async get_products(context, params) {
      context.commit("updateIsLoading", true);
      const url = BaseURL + "product/list";
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("update_meta", { links: json.links, meta: json.meta });
      context.commit("update_products", json.data);
      context.commit("updateIsLoading", false);
    },
    async get_product(context, id) {
      const url = BaseURL + "product/get";
      const res = await fetch(url + "?id=" + id, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      context.commit("update_products", json);
    },
    async update_product(context, params) {
      const url = BaseURL + "product/update";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("update_product", json);
      return json;
    },
    async setPrice(context, params) {
      const url = BaseURL + "product/set-price";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      console.log("setPrice", res);
      return res;
    },
    async add_product(context, params) {
      const url = BaseURL + "product/add";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("add_product", json);
      return json;
    },
    async exportXlsx(context, params) {
      const url = BaseURL + "product/export/xlsx";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log("exportXlsxw", json);
      return json;
    },
    async autocomplete_article(context, query) {
      const url = BaseURL + "product/autocomplete/article";
      const res = await fetch(url + "?query=" + query, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      return json;
    },
    async autocomplete_name(context, query) {
      const url = BaseURL + "product/autocomplete/name";
      const res = await fetch(url + "?query=" + query, {
        headers: {
          Authorization: TOKEN,
        },
      });
      const json = await res.json();
      return json;
    },
  },
};
