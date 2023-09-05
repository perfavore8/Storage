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
  setup() {
    const { pipelines } = useOrdersPipelinesSelect();

    return { pipelines };
  },
};
</script>

<style lang="scss" scoped></style>
