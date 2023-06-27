import store from "@/store";
import { reactive } from "vue";
import { useNewDeal } from "./newDeal";

export function useClientTabAutocomplete(params) {
  const { order, getOrder, saveOrder, toggleSomeChange } = useNewDeal();

  const autocomplete = reactive({
    code: params.code,
    placeholder: params.placeholder,
    selected: {},
    value: "",
    list: [],
    getList: async function () {
      this.list = await store.dispatch(params.getUrl, {
        q: this.value,
        order_id: order.id,
      });
      this.list.map((item) => (item.name = item.label));
    },
    changeInputValue: function (value) {
      this.value = value;
      this.getList();
    },
    select: async function (option) {
      toggleSomeChange(true);
      if (params.multi) {
        if (order[params.field] === undefined) order[params.field] = [];
        order[params.field].push(option.id);
      } else {
        order[params.field] = option.id;
      }
      await saveOrder();
      getOrder();
    },
  });

  return autocomplete;
}
