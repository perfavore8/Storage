import store from "@/store";
import { reactive } from "vue";

const newDealParams = reactive({});

export function useNewDeal() {
  const add = async () => {
    Object.assign(newDealParams, await store.dispatch("addOrder"));
  };
  return { add, newDealParams };
}
