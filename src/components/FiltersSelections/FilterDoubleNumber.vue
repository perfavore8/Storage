<template>
  <div class="wrapper flex flex-row gap-2 p-2">
    <input
      type="number"
      class="input"
      v-model.number="valueOne"
      placeholder="от:"
      @focusout="checkCorrectOrder()"
    />
    <input
      type="number"
      class="input"
      v-model.number="valueTwo"
      placeholder="до:"
      @focusout="checkCorrectOrder()"
    />
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from "vue";
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
    const valueOne = ref(null);
    const valueTwo = ref(null);

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
        valueOne.value !== null &&
        valueTwo.value !== null
      ) {
        const step = valueOne.value;
        valueOne.value = valueTwo.value;
        valueTwo.value = step;
      }
    };

    onMounted(() => change_value());

    const option_value = computed(() => {
      return { option: "~", value: `${valueOne.value} - ${valueTwo.value}` };
    });

    const change_value = () => {
      nextTick(() => {
        [valueOne.value, valueTwo.value] = props.item.value?.split(" - ") || [
          null,
          null,
        ];
      });
    };

    const emit_value = () => {
      context.emit("change_filter_value", option_value, props.idx);
    };

    return { valueOne, valueTwo, checkCorrectOrder };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
