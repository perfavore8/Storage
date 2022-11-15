import { createStore } from "vuex";
import data from "./modules/data";
import shows from "./modules/shows";
import fields from "./modules/fields";

export default createStore({
  modules: { data, shows, fields },
});
