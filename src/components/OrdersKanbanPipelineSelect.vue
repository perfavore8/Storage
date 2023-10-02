<template>
  <AppInputSelect
    :list="pipelines.list"
    :selected="pipelines.selected"
    :SelectedInTitle="true"
    @select="(op) => pipelines.select(op)"
  />
</template>

<script>
import AppInputSelect from "./AppInputSelect.vue";
import { useOrdersPipelinesSelect } from "@/composables/ordersPipelinesSelect";
export default {
  components: { AppInputSelect },
  props: { needAll: { type: Boolean, req: false } },
  setup(props) {
    const { pipelines } = useOrdersPipelinesSelect(props.needAll);

    return { pipelines };
  },
};
</script>

<style lang="scss" scoped></style>
