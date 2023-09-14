import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";

const pipelines = reactive({
  selected: {},
  list: [],
  allStatuses: computed(() =>
    pipelines.list.flatMap((item) => [...item.statuses])
  ),
  select: function (option) {
    if (option) this.selected = option;
  },
  getList: function () {
    if (this.list.length) return;
    this.getNewList();
  },
  getNewList: async function () {
    const list = await store.dispatch("ordersPipelinesList");
    list.map((el) => (el.value = el.id));
    this.list = list;
  },
  dropToDefault: function () {
    if (Object.keys(pipelines.selected).length) return;
    const item = this.list.find((el) => Boolean(el.is_system));
    if (!item) return;
    this.select(item);
  },
});
export function useOrdersPipelinesSelect() {
  const start = async () => {
    await pipelines.getList();
    pipelines.dropToDefault();
  };
  const startPromise = start();

  return { pipelines, start, startPromise };
}
