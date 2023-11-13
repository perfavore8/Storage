import store from "@/store";
import { onMounted, ref, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToggle } from "@vueuse/core";
import { computed, nextTick } from "vue";
import { useAddToDealTabs } from "./addToDealTabs";
import { useLangConfiguration } from "./langConfiguration";

const { tabs } = useAddToDealTabs();
const { t } = useLangConfiguration();

const newDealParams = reactive({});
const order = reactive({ fields: {} });
const dropOrder = async () => {
  Object.keys(order).forEach((key) => delete order[key]);
  order.fields = {};
  isOrderGeted.value = false;
  setNewOrderPromise();
  tabs.dropToDefault();
};

const routeWatcher = ref(null);

const [someChange, toggleSomeChange] = useToggle(false);

const isOrderGeted = ref(false);
let getOrderPromise = ref(null);
const setNewOrderPromise = () => {
  getOrderPromise.value = new Promise((resolve) => {
    let watcher = watch(
      isOrderGeted,
      () => isOrderGeted.value && resolve(watcher())
    );
  });
};
setNewOrderPromise();

const getOrder = async (field) => {
  isOrderGeted.value = false;
  const newOrder = await store.dispatch("getOrder");
  if (Array.isArray(newOrder.fields)) newOrder.fields = {};
  if (field) {
    Object.assign(order[field], newOrder[field]);
  } else {
    Object.assign(order, newOrder);
  }
  if (!order.fields) order.fields = {};
  if (!order.fields.name)
    order.fields.name = t("newOrder.newOrderName", { id: newDealParams.id });

  isOrderGeted.value = true;
};

const [needUpdateAddedProducts, toggleUpdateAddedProducts] = useToggle(false);
const setWatcherUpdateAddedProducts = (func) => {
  watch(needUpdateAddedProducts, (newVal) => {
    if (newVal) func(true);
  });
};

export function useNewDeal() {
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    if (routeWatcher.value) return;
    routeWatcher.value = router.afterEach((to) => {
      if (!to.query?.order_id) delete newDealParams.id;
      toggleSomeChange(false);
      dropOrder();
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
      toggleUpdateAddedProducts(true);
      nextTick(() => toggleUpdateAddedProducts(false));
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
    someChange,
    toggleSomeChange,
    isOrederLoaded,
    saveParams,
    getOrderPromise,
    dropOrder,
    isOrderGeted,
    setNewOrderPromise,
    needUpdateAddedProducts,
    setWatcherUpdateAddedProducts,
  };
}
