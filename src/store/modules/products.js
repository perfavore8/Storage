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
          // Origin: "http://localhost:8080",
          // // "Access-Control-Allow-Origin": "*",
          // // "access-control-allow-credentials": "true",
          // // "Access-Control-Allow-Headers": "*",
          // // "access-control-allow-methods": "*",
          // Host: "api.gosklad.ru",
          // "Access-Control-Allow-Credentials": "true",
          // "Access-Control-Allow-Headers": "*",
          // "Access-Control-Allow-Methods": "*",
          // "Access-Control-Allow-Origin": "*",
          // Connection: " keep-alive",
          // "Content-Length": " 0",
          // // "Content-Type": " application/json",
          // // Host: " api.gosklad.ru",
          // // Origin: " http://localhost:8080",
          // Referer: " http://localhost:8080/",
          // "sec-ch-ua":
          //   'Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          // "sec-ch-ua-mobile": " ?0",
          // "sec-ch-ua-platform": "Windows",
          // "Sec-Fetch-Dest": " empty",
          // "Sec-Fetch-Mode": " cors",
          // "Sec-Fetch-Site": " cross-site",
          // // Access-Control-Allow-Origin: http://localhost:8080
          // // "Content-Type": application/json
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
