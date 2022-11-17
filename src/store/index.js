import { createStore } from "vuex";
import data from "./modules/data";
import shows from "./modules/shows";
import fields from "./modules/fields";
import categories from "./modules/categories";

export default createStore({
  modules: { data, shows, fields, categories },
});
