import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";
import { useLangConfiguration } from "./langConfiguration";

const { t } = useLangConfiguration();

const pipelines = reactive({
  selected: {},
  list: [],
  allStatuses: computed(() =>
    pipelines.list.flatMap((item) => [
      ...(Array.isArray(item.statuses) ? item.statuses : []),
    ])
  ),
  select: function (option) {
    if (option) this.selected = option;
  },
  getList: async function (needAll) {
    await this.getNewList();
    if (needAll === true && this.list[0].value !== -1)
      this.list.unshift({ name: t("global.all"), value: -1, id: -1 });
    if (needAll === false && this.list[0].value === -1) {
      this.list.shift();
      if (this.selected.value !== -1) return;
      this.selected = {};
      this.dropToDefault();
    }
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
export function useOrdersPipelinesSelect(needAll) {
  const start = async () => {
    await pipelines.getList(needAll);
    pipelines.dropToDefault();
  };
  const startPromise = start();

  return { pipelines, start, startPromise };
}
