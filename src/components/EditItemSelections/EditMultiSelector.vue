<template>
  <div class="row">
    <label>{{ item.field }}:</label>
    <multi-selector
      :options_props="item.selector_options"
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
        this.item.selector_options.forEach((val) => {
          split_selected_options.includes(val.name)
            ? a.push(true)
            : a.push(false);
        });
        this.copy_selected_options = [];
        this.copy_selected_options = this.copy_selected_options.concat(a);
      });
    },
    option_select(value) {
      let a = [];
      value.forEach((val, index) => {
        val ? a.push(this.item.selector_options[index].name) : null;
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
