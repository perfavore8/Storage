import router from "@/router";
import store from "@/store";
import { computed } from "vue";

export function useList() {
  const getList = async () => {
    await store.dispatch("POOrderList");
  };

  const list = computed(
    () =>
      store.state.POOrder.AvailablePublicOrdersList || [
        {
          id: 1,
          name: "Заказ 1 - 1000р - Менеджер 1 Заказ 1 - 1000р - Менеджер 1 Заказ 1 - 1000р - Менеджер 1 - 01.10.2021 - 05.10.2021",
          active: true,
        },
        {
          id: 2,
          name: "Заказ 2 - 2000р - Менеджер 2 - 08.10.2021 - 12.10.2021",
          active: false,
        },
        {
          id: 3,
          name: "Заказ 3 - 3000р - Менеджер 1 - 15.10.2021 - 19.10.2021",
          active: false,
        },
        {
          id: 4,
          name: "Заказ 4 - 4000р - Менеджер 2 - 22.10.2021 - 26.10.2021",
          active: true,
        },
        {
          id: 5,
          name: "Заказ 5 - 5000р - Менеджер 1 - 29.10.2021 - 02.11.2021",
          active: true,
        },
        {
          id: 6,
          name: "Заказ 6 - 6000р - Менеджер 2 - 05.11.2021 - 09.11.2021",
          active: true,
        },
      ]
  );

  const follow = (id) => {
    router.push({
      path: "/publicOrder",
      query: { order_id: id },
    });
  };

  return { getList, list, follow };
}
