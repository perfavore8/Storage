import store from "@/store";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const newDealParams = reactive({});

export function useNewDeal() {
  const router = useRouter();
  const add = async () => {
    Object.assign(newDealParams, await store.dispatch("addOrder"));
    router.replace({ query: { order_id: newDealParams.id } });
  };
  return { add, newDealParams };
}
