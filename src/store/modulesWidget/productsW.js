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
    meta2: {
      links: {},
      meta: {},
    },
    productsParams: {
      page: 1,
      filter: {},
      sort: {},
      per_page: 20,
    },
    productsParams2: {
      page: 1,
      per_page: 12,
    },
    selectedWirePerLead: { sources: [], value: null },
    disableAddToDeal: false,
  },
  getters: {},
  mutations: {
    updateDisableAddToDeal(state, value) {
      state.disableAddToDeal = value;
    },
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
    update_meta2(state, value) {
      state.meta2 = { ...value };
    },
    updateProductsParams(state, params) {
      Object.assign(state.productsParams, params);
    },
    updateProductsParams2(state, params) {
      Object.assign(state.productsParams2, params);
    },
    updateSelectedWirePerLead(state, params) {
      const noOneSources = state.selectedWirePerLead.sources.length == 0;
      const haveThisSource = state.selectedWirePerLead.sources.includes(
        params.source
      );
      const onlyThisSource =
        haveThisSource && state.selectedWirePerLead.sources.length == 1;
      const sameValue = state.selectedWirePerLead.value === params.value;
      if (noOneSources && params.value) {
        state.selectedWirePerLead = {
          sources: [params.source],
          value: params.value,
        };
      } else if (onlyThisSource) {
        if (!params.value) {
          state.selectedWirePerLead = { sources: [], value: null };
        } else {
          state.selectedWirePerLead.value = params.value;
        }
      } else if (!haveThisSource && sameValue && params.value) {
        state.selectedWirePerLead = {
          sources: [...state.selectedWirePerLead.sources, params.source],
          value: params.value,
        };
      } else if (haveThisSource && !params.value) {
        state.selectedWirePerLead.sources =
          state.selectedWirePerLead.sources.filter(
            (source) => source != params.source
          );
      }
    },
  },
  actions: {
    async getProductsAutocompleteW(context, params) {
      const url = BaseURL + "get-products-autocomplete";

      const res = await fetch(url + preparation_params(params), {});
      const response = await res.json();
      context.commit("updateProductsAutocomplete", response);

      return response;
    },
    async getProductsW(context, params) {
      const url = BaseURL + "products";

      const res = await fetch(url + preparation_params(params), {});
      const response = await res.json();
      context.commit("updateProducts", response);

      return response;
    },
    async getProducts2W(context, params) {
      const url = BaseURL + "products-v2";

      const res = await fetch(url + preparation_params(params), {});
      const response = await res.json();
      context.commit("updateProducts", response.data);
      context.commit("update_meta2", {
        meta: response.meta,
        links: response.links,
      });

      return response;
    },
    async getAllProductsW(context, params) {
      const url = BaseURL + "products/filtered";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const response = await res.json();
      context.commit("updateAllProducts", response.data);
      context.commit("update_meta", {
        links: response.links,
        meta: response.meta,
      });

      return response;
    },
    async addProductW(context, params) {
      context.commit("updateDisableAddToDeal", true);
      const url = BaseURL + "add-product";
      let response = [];
      const res = await fetch(url + preparation_params(params));
      response = await res.json();
      context.commit("updateDisableAddToDeal", false);

      return response;
    },
    async addProduct2W(context, params) {
      context.commit("updateDisableAddToDeal", true);
      const url = BaseURL + "add-product-v2";
      let response = [];

      const res = await fetch(url + preparation_params(params));
      response = await res.json();
      context.commit("updateDisableAddToDeal", false);

      return response;
    },
    async addProduct3W(context, params) {
      context.commit("updateDisableAddToDeal", true);
      const url = BaseURL + "add-product-v3";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      context.commit("updateDisableAddToDeal", false);

      return response;
    },
  },
};
