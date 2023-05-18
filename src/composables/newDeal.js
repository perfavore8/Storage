import store from "@/store";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const newDealParams = reactive({});
const order = reactive({});

export function useNewDeal() {
  const router = useRouter();
  const add = async () => {
    Object.assign(newDealParams, await store.dispatch("addOrder"));
    router.replace({ query: { order_id: newDealParams.id } });

    getOrder();
  };

  const getOrder = async () => {
    Object.assign(order, await store.dispatch("getOrder"));
    if (!order.fields) order.fields = {};
  };

  return { add, newDealParams, getOrder, order };
}
