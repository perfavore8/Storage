import { ApiReqFunc } from "@/composables/ApiReqFunc";
import { usePreparationProducts } from "@/composables/preparationProducts";
const { preparationProducts } = usePreparationProducts();
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
    importStuff: {
      data: [],
    },
  },
  getters: {},
  mutations: {
    update_products(state, value) {
      state.products = [...preparationProducts(value)];
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
    updateIsLoadingProducts(state, value) {
      console.log(value);
      state.isLoading = value;
    },
    updateImportStuff(state, value) {
      Object.assign(state.importStuff, value);
    },
  },
  actions: {
    async get_products(context, params) {
      context.commit("updateIsLoadingProducts", true);
      const { data } = await ApiReqFunc({
        url: "product/list",
        method: "post",
        data: params,
      });
      context.commit("update_meta", { links: data.links, meta: data.meta });
      context.commit("update_products", data.data);
      context.commit("updateIsLoadingProducts", false);

      return data;
    },
    async get_product(context, id) {
      const { data } = await ApiReqFunc({
        url: "product/get",
        params: { id: id },
      });
      context.commit("update_products", data);

      return data;
    },
    async update_product(context, params) {
      const { data } = await ApiReqFunc({
        url: "product/update",
        method: "post",
        data: params,
      });

      return data;
    },
    async setPrice(context, params) {
      const { data } = await ApiReqFunc({
        url: "product/set-price",
        method: "post",
        data: params,
      });

      return data;
    },
    async add_product(context, params) {
      const { data } = await ApiReqFunc({
        url: "product/add",
        method: "post",
        data: params,
      });

      return data;
    },
    async transfer_product(context, params) {
      const { data } = await ApiReqFunc({
        url: "product/transfer",
        method: "post",
        data: params,
      });

      return data;
    },
    async exportXlsx(context, params) {
      const { data } = await ApiReqFunc({
        url: "product/export/xlsx",
        method: "post",
        data: params,
      });

      return data;
    },
    async importStuff(context, file) {
      const { data } = await ApiReqFunc({
        url: "product/import/preprocessing",
        method: "post",
        data: file,
      });
      context.commit("updateImportStuff", data);

      return data;
    },
    async autocomplete_article(context, query) {
      const { data } = await ApiReqFunc({
        url: "product/autocomplete/article",
        params: { query: query },
      });

      return data;
    },
    async autocomplete_name(context, query) {
      const { data } = await ApiReqFunc({
        url: "product/autocomplete/name",
        params: { query: query },
      });

      return data;
    },
    async importStart(context, params) {
      const { data } = await ApiReqFunc({
        url: "product/import/start",
        method: "post",
        data: params,
      });

      return data;
    },
  },
};
