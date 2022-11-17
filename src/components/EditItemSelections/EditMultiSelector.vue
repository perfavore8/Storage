<template>
  <div class="row">
    <label>{{ item.name }}:</label>
    <multi-selector
      :options_props="preparing_field_data(item.data)"
      @select="option_select"
      :selected_options="copy_selected_options"
    />
  </div>
</template>

<script>
import { nextTick } from "vue";
import MultiSelector from "@/components/MultiSelector.vue";
export default {
  components: {
    MultiSelector,
  },
  props: {
    item: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
    selected_options: {
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
  },
  data() {
    return {
      copy_selected_options: [],
    };
  },
  mounted() {
    this.change_value();
  },
  watch: {
    selected_options() {
      this.change_value();
    },
  },
  methods: {
    change_value() {
      let a = [];
      nextTick(() => {
        const split_selected_options = this.selected_options.split(", ");
        this.item.data.forEach((val) => {
          split_selected_options.includes(val) ? a.push(true) : a.push(false);
        });
        this.copy_selected_options = [];
        this.copy_selected_options = [...a];
      });
    },
    preparing_field_data(arr) {
      const result = [];
      arr.forEach((val, idx) => result.push({ name: val, value: idx }));
      return result;
    },
    option_select(value) {
      let a = [];
      value.forEach((val, index) => {
        val ? a.push(this.item.data[index]) : null;
      });
      a = a.join(", ");
      this.$emit("change_value", a, this.idx);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
