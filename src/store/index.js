import { createStore } from "vuex";
import data from "./modules/data";
import shows from "./modules/shows";
import fields from "./modules/fields";
import categories from "./modules/categories";
import products from "./modules/products";
import documents from "./modules/documents";
import account from "./modules/account";
import analytics from "./modules/analytics";
import tasks from "./modules/tasks";
import orders from "./modules/orders";
import widjetCategories from "./modulesWidget/categoriesW";
import widjetProducts from "./modulesWidget/productsW";
import widjetFields from "./modulesWidget/fieldsW";

export default createStore({
  modules: {
    data,
    shows,
    fields,
    categories,
    products,
    documents,
    account,
    analytics,
    tasks,
    orders,
    widjetCategories,
    widjetProducts,
    widjetFields,
  },
});
