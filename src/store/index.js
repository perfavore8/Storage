import { createStore } from "vuex";
import data from "./modules/data";
import shows from "./modules/shows";
import fields from "./modules/fields";
import categories from "./modules/categories";
import products from "./modules/products";
import documents from "./modules/documents";
import account from "./modules/account";

export default createStore({
  modules: { data, shows, fields, categories, products, documents, account },
});
