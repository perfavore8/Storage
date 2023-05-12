<template>
  <div class="links">
    <div
      class="triangle"
      :class="{
        triangle_last: selected_fields_properties.length - 1 == idx,
      }"
      v-for="(cat, idx) in selected_fields_properties"
      :key="cat.id"
      @click="prev_cat(idx)"
    >
      {{ cat.name }}
    </div>
  </div>
  <div class="flex flex-row justify-between items-center">
    <SelectorVue
      :options_props="data_fields_properties.items"
      @select="option_select_fields_properties"
      :selected_option="data_fields_properties.selected"
    />
    <button
      class="btn pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900"
      @click="openCategories()"
    >
      Категории
    </button>
  </div>
</template>

<script>
import SelectorVue from "./SelectorVue.vue";
import { useEntitiesFieldsProperties } from "../composables/entitiesFieldsProperties";
export default {
  components: { SelectorVue },
  setup(props, context) {
    const openCategories = () => context.emit("toggleCategories", true);

    return { ...useEntitiesFieldsProperties(), openCategories };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  $step: 12px;

  .triangle {
    cursor: pointer;
    padding: 5px 10px 5px 15px;
    height: 30px;
    margin: 5px 0;
    @include font(400, 15px);
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    display: flex;
    justify-content: start;
    align-items: center;
    color: #000;
  }
  .triangle:hover {
    padding: 5px 12px 5px 17px;
    margin-left: -2px;
    margin-right: -2px;
    background: #e6e6e6 !important;
  }
  .triangle:first-child:hover {
    margin-left: 0;
  }
  .triangle_last {
    color: #fff;
    background: rgba(27, 53, 70, 0.9) !important;
  }
  .triangle_last:hover {
    background: rgba(27, 53, 70, 0.8) !important;
  }
  .triangle:active {
    background: #d6d6d6 !important;
  }

  .triangle:nth-child(3n + 1) {
    background: linear-gradient(45deg, hsl(0, 0%, 90%), hsl(0, 0%, 84%));
  }
  .triangle:nth-child(3n + 2) {
    background: linear-gradient(
      45deg,
      hsl(0, 0%, 84%),
      hsl(0, 0%, 83%),
      hsl(0, 0%, 84%)
    );
  }
  .triangle:nth-child(3n + 3) {
    background: linear-gradient(45deg, hsl(0, 0%, 84%), hsl(0, 0%, 90%));
  }
  .triangle:first-child {
    padding-left: 5px;
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
  }
}
</style>
