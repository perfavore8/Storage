<template>
  <div class="wrapper flex flex-row gap-2 p-2">
    <input
      type="number"
      class="input"
      v-model.number="valueOne"
      :placeholder="t('filters.from')"
      @focusout="checkCorrectOrder()"
    />
    <input
      type="number"
      class="input"
      v-model.number="valueTwo"
      :placeholder="t('filters.to')"
      @focusout="checkCorrectOrder()"
    />
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const { t } = useLangConfiguration();

    const valueOne = ref("");
    const valueTwo = ref("");

    watch(
      () => [valueOne.value, valueTwo.value],
      () => emit_value()
    );
    watch(
      () => props.item,
      () => change_value()
    );

    const checkCorrectOrder = () => {
      if (
        valueOne.value > valueTwo.value &&
        valueOne.value !== "" &&
        valueTwo.value !== ""
      ) {
        const step = valueOne.value;
        valueOne.value = valueTwo.value;
        valueTwo.value = step;
      }
    };

    onMounted(() => change_value());

    const option_value = computed(() => {
      return {
        option: "range",
        value: `${valueOne.value}-${valueTwo.value}`,
      };
    });

    const change_value = () => {
      nextTick(() => {
        [valueOne.value, valueTwo.value] = props.item.value?.split("-") || [
          "",
          "",
        ];
      });
    };

    const emit_value = () => {
      context.emit("change_filter_value", option_value.value, props.idx);
    };

    return { valueOne, valueTwo, checkCorrectOrder, t };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
