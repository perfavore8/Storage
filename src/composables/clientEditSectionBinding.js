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
    add: async function (sourceId, value, dontSave) {
      if (dontSave) {
        this.selected.push({ ...value, isNew: true });
      } else {
        const params = {};
        params[`${selectedTab.value.value2}_id`] = sourceId;
        params[`${selectedTab.value.oppositeValue3}_id`] = [value.id];

        const res = await store.dispatch(
          `linkClients${selectedTab.value.value}`,
          params
        );
        if (res.success) this.selected.push({ ...value, isNew: true });
      }
    },
    del: async function (sourceId, id, idx, dontSave) {
      if (dontSave) {
        this.selected.splice(idx, 1);
      } else {
        const params = {};
        params[`${selectedTab.value.value2}_id`] = sourceId;
        params[`${selectedTab.value.oppositeValue3}_id`] = [id];

        const res = await store.dispatch(
          `unlinkClients${selectedTab.value.value}`,
          params
        );
        if (res.success) this.selected.splice(idx, 1);
      }
    },
    getList: async function (sourceId) {
      const params = { q: this.value };

      params[`${selectedTab.value.value2}_id`] = sourceId;

      this.list = await store.dispatch(
        `getClients${selectedTab.value.oppositeValue}Autocomplete`,
        params
      );
      this.list.map((item) => (item.name = item?.label));
    },
    oppositeList: [],
    filteredOppositeList: [],
    getOppositeList: async function () {
      if (!this.oppositeList.length) {
        await store.dispatch(
          `getClients${selectedTab.value.oppositeValue}List`
        );
        [
          ...store.state[`clients${selectedTab.value.oppositeValue}`]?.list,
        ]?.forEach((item) =>
          this.oppositeList.push({
            name: item?.fields?.name,
            fields: { name: item?.fields?.name },
            id: item?.id,
            value: item?.id,
          })
        );
      }
      this.filteredOppositeList = this.oppositeList.filter(
        (val) =>
          !this.selected.some((sel) => sel?.id === val.id) &&
          val?.fields?.name?.toLowerCase()?.includes(this.value?.toLowerCase())
      );
    },

    addAll: async function (sourceId) {
      const params = {};
      params[`${selectedTab.value.value2}_id`] = sourceId;
      params[`${selectedTab.value.oppositeValue3}_id`] = [];
      this.selected.forEach((val) =>
        params[`${selectedTab.value.oppositeValue3}_id`].push(val.id)
      );
      if (!params[`${selectedTab.value.oppositeValue3}_id`].length) return;

      await store.dispatch(`linkClients${selectedTab.value.value}`, params);
    },
  });

  return { binding };
}
