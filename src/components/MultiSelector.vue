<template>
  <div class="multi_selector">
    <div
      class="item"
      :class="{ selected: selected_options[idx] }"
      v-for="(option, idx) in options_props"
      :key="option.value"
      @click="select(idx)"
    >
      {{ option.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiSelector",
  props: {
    options_props: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    selected_options: {
      type: Array,
      required: true,
      default() {
        return [true];
      },
    },
  },
  data() {
    return {
      options_value: [],
    };
  },
  mounted() {
    this.selected_options.forEach((item) => this.options_value.push(item));
  },
  methods: {
    select(idx) {
      if (idx == 0) this.options_value = [];
      if (this.options_value[0] == true) this.options_value[0] = false;
      this.options_value[idx] = !this.options_value[idx];
      if (!this.options_value.includes(true)) this.options_value[0] = true;
      this.$emit("select", this.options_value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.multi_selector {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 5px;
  .item {
    cursor: pointer;
    height: 20px;
    width: 250px;
    padding: 6px 12px;
    transition: background-color 0.2s ease-out;
    @include font(400, 16px, 20px);
  }
  .item:first-child {
    border-radius: 4px 4px 0 0;
  }
  .item:last-child {
    border-radius: 0 0 4px 4px;
  }
  .item:hover {
    background-color: rgb(13 110 253 / 20%);
  }
}
.selected {
  background-color: #b3d7ff;
}
.selected:hover {
  background-color: #b3d7ff !important;
}
</style>
