import { usePreparationQueryParams } from "@/components/WidgetAddToDeal/src/composables/preparationQueryParams";
import { getTOKEN, BaseURL, getPOTOKEN } from "@/composables/BaseURL";
import { usePreparationProducts } from "@/components/WidgetAddToDeal/src/composables/preparationProducts";
import { useNewDeal } from "@/composables/newDeal";
import { isPublicOrder } from "@/components/PublicOrder";
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
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/get-products-autocomplete"
          : "orders/get-products-autocomplete");

      const res = await fetch(
        url + preparation_params({ ...params, leadId: newDealParams.id }),
        {
          headers: {
            Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
          },
        }
      );
      const json = await res.json();
      context.commit("updateProductsAutocompleteW", json);

      return json;
    },
    async getProductsW(context, params) {
      const url =
        BaseURL +
        (isPublicOrder.value ? "public-order/products" : "orders/products");

      const res = await fetch(
        url + preparation_params({ ...params, order_id: newDealParams.id }),
        {
          headers: {
            Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
          },
        }
      );
      const json = await res.json();
      context.commit("updateProductsW", json);

      return json;
    },
    async getProducts2W(context, params) {
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/products-v2"
          : "orders/products-v2");

      const res = await fetch(
        url + preparation_params({ ...params, order_id: newDealParams.id }),
        {
          headers: {
            Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
          },
        }
      );
      const json = await res.json();
      context.commit("updateProductsW", json.data);
      context.commit("update_meta2", {
        meta: json.meta,
        links: json.links,
      });

      return json;
    },
    async getAllProductsW(context, params) {
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/products/filtered"
          : "orders/products/filtered");

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
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
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/position/delete"
          : "orders/product/delete");

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
      const json = await res.json();

      return json;
    },
    async addProductW(context, params) {
      context.commit("updateDisableAddToDealW", true);
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/position/add"
          : "orders/product/add");

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
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
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/position/add"
          : "orders/product/add");

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
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
      const url =
        BaseURL +
        (isPublicOrder.value
          ? "public-order/position/add"
          : "orders/product/add");

      const json = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: isPublicOrder.value ? getPOTOKEN() : getTOKEN(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...params, order_id: newDealParams.id }),
      });
      context.commit("updateDisableAddToDealW", false);

      return json;
    },
  },
};
