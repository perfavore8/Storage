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
    getList: async function (id) {
      const params = { q: this.value };

      selectedTab.value.value === "Company"
        ? (params.company_id = id)
        : (params.contact_id = id);
      this.list = await store.dispatch(
        `getClients${
          selectedTab.value.value === "Company" ? "Contacts" : "Company"
        }Autocomplete`,
        params
      );
    },
  });

  return { binding };
}
