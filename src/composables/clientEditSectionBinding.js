import store from "@/store";
import { reactive } from "vue";

export function useClientBinding(selectedTab) {
  const binding = reactive({
    list: [],
    value: "",
    selected: [],
    add: function (value) {
      this.selected.push(value);
    },
    del: function (idx) {
      this.selected.splice(idx, 1);
    },
    getList: function () {
      store.dispatch(
        `getClients${
          selectedTab.value.value === "Company" ? "Contacts" : "Company"
        }Autocomlite`,
        this.value
      );
    },
  });

  return { binding };
}
