import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";

const clientsList = reactive([]);

export function useClients(selectedTab) {
  const products = computed(
    () => store.state[`clients${selectedTab.value.value}`]?.list
  );
  const params = computed(
    () => store.state[`clients${selectedTab.value.value}`]?.params
  );

  const getClientsList = async () => {
    await store.dispatch(
      `getClients${selectedTab.value.value}List`,
      params.value
    );
    clientsList.length = 0;
    Object.assign(clientsList, products.value);
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

  return { getClientsList, clientsList, getClientsFields, getColor };
}
