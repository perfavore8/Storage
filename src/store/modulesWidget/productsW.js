import { usePreparationQueryParams } from "@/components/WidgetAddToDeal/src/composables/preparationQueryParams";
import { getTOKEN, BaseURL } from "@/composables/BaseURL";
import { usePreparationProducts } from "@/components/WidgetAddToDeal/src/composables/preparationProducts";
import { useNewDeal } from "@/composables/newDeal";
const { preparationProducts } = usePreparationProducts();
const { preparation_params } = usePreparationQueryParams();
const { newDealParams } = useNewDeal();

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
    updateDisableAddToDealW(state, value) {
      state.disableAddToDeal = value;
    },
    updateProductsW(state, value) {
      state.products = [...value];
    },
    updateProductsAutocompleteW(state, value) {
      state.productsAutocomplete = [...value];
    },
    updateAllProductsW(state, value) {
      state.allProducts = [...preparationProducts(value)];
    },
    update_meta(state, value) {
      state.meta = { ...value };
    },
    update_meta2(state, value) {
      state.meta2 = { ...value };
    },
    updateProductsParamsW(state, params) {
      Object.assign(state.productsParams, params);
    },
    updateProductsParams2W(state, params) {
      Object.assign(state.productsParams2, params);
    },
    updateSelectedWirePerLeadW(state, params) {
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
      const url = BaseURL + "orders/get-products-autocomplete";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("updateProductsAutocompleteW", json);

      return json;
    },
    async getProductsW(context, params) {
      const url = BaseURL + "orders/products";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("updateProductsW", json);

      return json;
    },
    async getProducts2W(context, params) {
      const url = BaseURL + "orders/products-v2";

      const res = await fetch(url + preparation_params(params), {
        headers: {
          Authorization: getTOKEN(),
        },
      });
      const json = await res.json();
      context.commit("updateProductsW", json.data);
      context.commit("update_meta2", {
        meta: json.meta,
        links: json.links,
      });

      return json;
    },
    async getAllProductsW(context, params) {
      const url = BaseURL + "orders/products/filtered";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();
      context.commit("updateAllProductsW", json.data);
      context.commit("update_meta", {
        links: json.links,
        meta: json.meta,
      });

      return json;
    },
    async deleteProductW(context, params) {
      const url = BaseURL + "orders/product/delete";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
      const json = await res.json();

      return json;
    },
    async addProductW(context, params) {
      context.commit("updateDisableAddToDealW", true);
      const url = BaseURL + "orders/product/add";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
      const json = await res.json();
      context.commit("updateDisableAddToDealW", false);

      return json;
    },
    async addProduct2W(context, params) {
      context.commit("updateDisableAddToDealW", true);
      const url = BaseURL + "orders/product/add";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
      const json = await res.json();
      context.commit("updateDisableAddToDealW", false);

      return json;
    },
    async addProduct3W(context, params) {
      context.commit("updateDisableAddToDealW", true);
      const url = BaseURL + "orders/product/add";

      const json = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
      context.commit("updateDisableAddToDealW", false);

      return json;
    },
  },
};
