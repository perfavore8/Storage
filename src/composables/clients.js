import store from "@/store";
import { ref } from "vue";
import { computed } from "vue";
import { reactive } from "vue";

const clientsList = reactive([]);

export function useClients(selectedTab) {
  const isLoading = ref(false);
  const products = computed(
    () => store.state[`clients${selectedTab.value.value}`]?.list
  );
  const params = computed(
    () => store.state[`clients${selectedTab.value.value}`]?.params
  );

  const updateParams = (newParams) => {
    store.commit(`update${selectedTab.value.value}Params`, newParams);
  };

  const getClientsList = async () => {
    isLoading.value = true;
    clientsList.length = 0;
    await store.dispatch(
      `getClients${selectedTab.value.value}List`,
      params.value
    );
    Object.assign(clientsList, products.value);
    isLoading.value = false;
  };
  const getClientsFields = async () => {
    await store.dispatch(`getClients${selectedTab.value.value}Fields`);
  };

  const getColor = (value) => {
    const green = Math.min(255, Math.round((value * 255) / 50));
    const red = Math.min(255, Math.round(((100 - value) * 255) / 50));
    const blue = 0;
    const color = red * 65536 + green * 256 + blue;
    return "#" + ("00000" + color.toString(16)).slice(-6);
  };

  const meta = computed(
    () => store.state[`clients${selectedTab.value.value}`]?.meta
  );

  const page = computed(() => {
    const obj = {
      first: getPageFromLink(meta.value?.links?.first),
      prev: getPageFromLink(meta.value?.links?.prev),
      current: meta.value?.meta?.current_page,
      next: getPageFromLink(meta.value?.links?.next),
      last: getPageFromLink(meta.value?.links?.last),
    };
    return obj;
  });

  const changePage = (page) => {
    const params = { page: page };
    updateParams(params);
    getClientsList();
  };

  const getPageFromLink = (link) => {
    if (link) {
      return link.split("?page=")[1];
    } else {
      return null;
    }
  };

  return {
    getClientsList,
    clientsList,
    getClientsFields,
    getColor,
    updateParams,
    page,
    changePage,
    isLoading,
  };
}
