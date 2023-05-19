import store from "@/store";
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const newDealParams = reactive({});
const order = reactive({ fields: {} });

const routeWatcher = ref(null);
export function useNewDeal() {
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    if (routeWatcher.value) return;
    routeWatcher.value = router.afterEach((to) => {
      if (!to.query?.order_id) {
        delete newDealParams.id;
      }
    });
  });

  const add = async () => {
    if (!route.query.order_id) {
      Object.assign(newDealParams, await store.dispatch("addOrder"));
      router.replace({ query: { order_id: newDealParams.id } });
    } else {
      Object.assign(newDealParams, { id: route.query.order_id });
    }
    getOrder();
  };

  const getOrder = async () => {
    const newOrder = await store.dispatch("getOrder");
    if (Array.isArray(newOrder.fields)) newOrder.fields = {};
    Object.assign(order, newOrder);
    if (!order.fields) order.fields = {};
    if (!order.fields.name) order.fields.name = `Заказ №${newDealParams.id}`;
  };

  const saveOrder = async () => {
    await store.dispatch("updateOrder", {});
  };

  return { add, newDealParams, getOrder, order, saveOrder };
}
