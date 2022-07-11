import { createStore } from "vuex";
import data from "./modules/data";
import shows from "./modules/shows";

export default createStore({
  modules: { data, shows },
});
