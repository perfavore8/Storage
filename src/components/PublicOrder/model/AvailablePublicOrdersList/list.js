import store from "@/store";
import { computed } from "vue";

export function useList() {
  const getList = async () => {
    // await store.dispatch("getAvailablePublicOrdersList");
  };

  const list = computed(
    () =>
      store.state.orders.AvailablePublicOrdersList || [
        {
          id: 1,
          name: "Заказ 1 - 1000р - Менеджер 1 Заказ 1 - 1000р - Менеджер 1 Заказ 1 - 1000р - Менеджер 1",
          active: true,
        },
        { id: 2, name: "Заказ 2 - 2000р - Менеджер 2", active: false },
        { id: 3, name: "Заказ 3 - 3000р - Менеджер 1", active: false },
        { id: 4, name: "Заказ 4 - 4000р - Менеджер 2", active: true },
        { id: 5, name: "Заказ 5 - 5000р - Менеджер 1", active: true },
        { id: 6, name: "Заказ 6 - 6000р - Менеджер 2", active: true },
      ]
  );

  const follow = (id) => {
    console.log(id);
  };

  return { getList, list, follow };
}
