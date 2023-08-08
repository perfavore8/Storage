<template>
  <div class="text">
    <input
      type="text"
      :class="underlined ? 'input_uderline' : 'input'"
      :placeholder="placeholder"
      :value="inputValue"
      @input="$emit('update:inputValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    inputValue: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    underlined: {
      type: Boolean,
      required: false,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.text {
  margin: 0 3px;
}
</style>
