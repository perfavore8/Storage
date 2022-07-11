<template>
  <div class="row">
    <label>{{ item.field }}:</label>
    <SelectorVue
      :options_props="item.selector_options"
      @select="option_select"
      :selected_option="copy_selected_option"
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
    },
    selected_option: {
      type: String,
      required: true,
    },
    idx: {
      type: Number,
      required: true,
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
      let a = {};
      nextTick(() => {
        this.item.selector_options.forEach((val) => {
          if (val.name == this.selected_option) {
            a = val;
          }
        });
        Object.assign(this.copy_selected_option, a);
      });
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
