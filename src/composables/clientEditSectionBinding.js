import store from "@/store";
import { reactive } from "vue";

export function useClientBinding(selectedTab) {
  const binding = reactive({
    list: [],
    value: "",
    selected: [],
    addCurrentLinks: function (values) {
      this.selected = [];
      values.forEach((value) => this.selected.push({ ...value, isNew: false }));
    },
    add: async function (sourceId, value) {
      const params = {};
      params[`${selectedTab.value.value2}_id`] = sourceId;
      params[`${selectedTab.value.oppositeValue3}_id`] = [value.id];

      const res = await store.dispatch(
        `linkClients${selectedTab.value.value}`,
        params
      );
      if (res.success) this.selected.push({ ...value, isNew: true });
    },
    del: async function (sourceId, id, idx) {
      const params = {};
      params[`${selectedTab.value.value2}_id`] = sourceId;
      params[`${selectedTab.value.oppositeValue3}_id`] = [id];

      const res = await store.dispatch(
        `unlinkClients${selectedTab.value.value}`,
        params
      );
      if (res.success) this.selected.splice(idx, 1);
    },
    getList: async function (sourceId) {
      const params = { q: this.value };

      params[`${selectedTab.value.value2}_id`] = sourceId;

      this.list = await store.dispatch(
        `getClients${selectedTab.value.oppositeValue}Autocomplete`,
        params
      );
      this.list.map((item) => (item.name = item.label));
    },
  });

  return { binding };
}
