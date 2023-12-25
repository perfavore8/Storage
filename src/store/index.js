import { createStore } from "vuex";
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
import clientsContacts from "./modules/clientsContacts";
import clientsCompany from "./modules/clientsCompany";
import auth from "./modules/auth";
import data from "./modules/data";
import user from "./modules/user";
import profile from "./modules/profile";
import POAuth from "./publicOrder/auth";
import POCDoc from "./publicOrder/customDoc";
import PODoc from "./publicOrder/doc";
import POOrder from "./publicOrder/order";
import POToken from "./publicOrder/token";

export default createStore({
  modules: {
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
    clientsContacts,
    clientsCompany,
    auth,
    data,
    user,
    profile,
    POAuth,
    POCDoc,
    PODoc,
    POOrder,
    POToken,
  },
});
