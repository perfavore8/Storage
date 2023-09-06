import store from "@/store";
import { onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "./notification";
import { useToggle } from "@vueuse/core";
import { computed } from "vue";

const newDealParams = reactive({});
const order = reactive({ fields: {} });

const routeWatcher = ref(null);

const [someChange, toggleSomeChange] = useToggle(false);

export function useNewDeal() {
  const { addNotification } = useNotification();
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    if (routeWatcher.value) return;
    routeWatcher.value = router.afterEach((to, from) => {
      if (!to.query?.order_id) {
        delete newDealParams.id;
      }
      if (
        to.path !== "/addToDeal" &&
        from.path == "/addToDeal" &&
        someChange.value
      )
        addNotification(
          1,
          "Сохранение заказа ...",
          `${order.fields?.name} успешно сохранен`
        );
      toggleSomeChange(false);
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

  const isOrederLoaded = computed(() => Boolean(order.id));

  const saveOrder = async () => {
    await store.dispatch("updateOrder", {});
    toggleSomeChange(false);
  };

  const saveParams = reactive({
    isSaving: false,
    needSave: computed(() => someChange.value || saveParams.isSaving),
    save: async function () {
      this.isSaving = true;
      await saveOrder();
      await getOrder();
      setTimeout(() => {
        this.isSaving = false;
      }, 3000);
    },
  });

  return {
    add,
    newDealParams,
    getOrder,
    order,
    saveOrder,
    toggleSomeChange,
    isOrederLoaded,
    saveParams,
  };
}
