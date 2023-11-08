<template>
  <AppInputSelect
    :list="needAll ? pipelines.listWithAll : pipelines.list"
    :selected="pipelines.selected"
    :SelectedInTitle="true"
    @select="(op) => pipelines.select(op)"
  />
</template>

<script>
import AppInputSelect from "./AppInputSelect.vue";
import { useOrdersPipelinesSelect } from "@/composables/ordersPipelinesSelect";
import { watch } from "vue";
export default {
  components: { AppInputSelect },
  props: { needAll: { type: Boolean, req: false } },
  setup(props) {
    const { pipelines } = useOrdersPipelinesSelect(true);

    watch(props.needAll, (val) => {
      if (pipelines.selected.value !== -1 || val) return;
      pipelines.selected = {};
      pipelines.dropToDefault();
    });

    return { pipelines };
  },
};
</script>

<style lang="scss" scoped></style>
