import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
import { BaseURL } from "@/components/WidgetAddToDeal/src/composables/BaseURL";
import { usePreparationProducts } from "@/components/WidgetAddToDeal/src/composables/preparationProducts";
const { preparationProducts } = usePreparationProducts();
const { preparation_params } = usePreparationQueryParams();

export default {
  state: {
    products: [],
    productsAutocomplete: [],
    allProducts: [],
    meta: {
      links: {},
      meta: {},
    },
    productsParams: {
      page: 1,
      filter: {},
      sort: {},
      per_page: 20,
    },
  },
  getters: {},
  mutations: {
    updateProducts(state, value) {
      state.products = [...value];
    },
    updateProductsAutocomplete(state, value) {
      state.productsAutocomplete = [...value];
    },
    updateAllProducts(state, value) {
      state.allProducts = [...preparationProducts(value)];
    },
    update_meta(state, value) {
      state.meta = { ...value };
    },
    updateProductsParams(state, params) {
      Object.assign(state.productsParams, params);
    },
  },
  actions: {
    async getProductsAutocompleteW(context, params) {
      const myPromise = await new Promise((resolve) => {
        const url = BaseURL + "get-products-autocomplete";
        let response = [];
        (async () => {
          const res = await fetch(url + preparation_params(params), {});
          response = await res.json();
          context.commit("updateProductsAutocomplete", response);
          resolve(response);
        })();
      });
      return myPromise;
    },
    async getProductsW(context, params) {
      const myPromise = await new Promise((resolve) => {
        const url = BaseURL + "products";
        let response = [];
        (async () => {
          const res = await fetch(url + preparation_params(params), {});
          response = await res.json();
          context.commit("updateProducts", response);
          resolve(response);
        })();
      });
      return myPromise;
    },
    async getAllProductsW(context, params) {
      const myPromise = await new Promise((resolve) => {
        const url = BaseURL + "products/filtered";
        let response = [];
        (async () => {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
          });
          response = await res.json();
          context.commit("updateAllProducts", response.data);
          context.commit("update_meta", {
            links: response.links,
            meta: response.meta,
          });
          resolve(response);
        })();
      });
      return myPromise;
    },
    async addProductW(context, params) {
      const url = BaseURL + "add-product";
      let response = [];
      const res = await fetch(url + preparation_params(params));
      response = await res.json();

      return response;
    },
    async addProduct2W(context, params) {
      const url = BaseURL + "add-product-v2";
      let response = [];

      const res = await fetch(url + preparation_params(params));
      response = await res.json();

      return response;
    },
  },
};
