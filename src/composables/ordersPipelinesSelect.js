import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";
import { useLangConfiguration } from "./langConfiguration";
import { useSaveLS } from "./saveLS";

const { t } = useLangConfiguration();

const { saveLSParam, getSavedLSParam } = useSaveLS();

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
    saveLSParam("selectedPipeline", option.value);
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
  dropToDefault: function (handleDrop) {
    if (Object.keys(pipelines.selected).length && !handleDrop) return;
    const item = this.list.find((el) => Boolean(el.is_system));
    if (!item) return;
    this.select(item);
  },
  dropToSaved: function (handleDrop) {
    const savedName = getSavedLSParam("selectedPipeline");
    const item = this.list.find((el) => el.value === savedName);
    if (!item) {
      this.dropToDefault(handleDrop);
      return;
    }
    this.select(item);
  },
});
export function useOrdersPipelinesSelect(needAll, handleDrop) {
  const start = async () => {
    await pipelines.getList(needAll);
    pipelines.dropToSaved(handleDrop);
  };
  const startPromise = start();

  return { pipelines, start, startPromise };
}
