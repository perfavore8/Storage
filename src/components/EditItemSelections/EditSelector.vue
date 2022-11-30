<template>
  <div class="row">
    <label>{{ item.name }}:</label>
    <SelectorVue
      :options_props="preparing_field_data(item.data)"
      @select="option_select"
      :selected_option="{ name: copy_selected_option, value: -1 }"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";
import SelectorVue from "@/components/SelectorVue.vue";
export default {
  components: {
    SelectorVue,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    selected_option: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    idx: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      copy_selected_option: {},
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_option() {
      this.change_value();
    },
  },
  methods: {
    change_value() {
      nextTick(() => {
        this.item.data?.forEach((val) => {
          if (val == this.selected_option) this.copy_selected_option = val;
        });
      });
    },
    preparing_field_data(arr) {
      const result = [];
      if (arr)
        arr.forEach((val, idx) => result.push({ name: val, value: idx }));
      return result;
    },
    option_select(value) {
      this.$emit("change_value", value.name, this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
