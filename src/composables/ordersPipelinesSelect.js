import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";

export function useOrdersPipelinesSelect() {
  const pipelines = reactive({
    selected: {},
    list: [],
    allStatuses: computed(() =>
      pipelines.list.flatMap((item) => [...item.statuses])
    ),
    select: function (option) {
      if (option) this.selected = option;
    },
    getList: async function () {
      const list = await store.dispatch("ordersPipelinesList");
      list.map((el) => (el.value = el.id));
      this.list = list;
    },
    dropToDefault: function () {
      const item = this.list.find((el) => Boolean(el.is_system));
      if (!item) return;
      this.select(item);
    },
  });

  const start = async () => {
    await pipelines.getList();
    pipelines.dropToDefault();
  };
  start();

  return { pipelines };
}
