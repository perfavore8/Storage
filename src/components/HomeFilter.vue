<template>
  <div class="filter_group">
    <input
      type="checkbox"
      v-model="filterValue"
      name="filter"
      id="filter"
      class="checkbox"
    />
    <label for="filter">{{ $t("ostatki.f") }}</label>
  </div>
  <div class="btns" v-if="filterValue">
    <button class="btn btn_tempest" @click="confirmFilters()">
      {{ $t("global.apply2") }}
    </button>
    <button class="btn btn_rusty_red" @click="clearFilters()">
      {{ $t("global.clear") }}
    </button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import store from "@/store";
export default {
  emits: ["confirmFilters", "clearFilters"],
  setup(props, context) {
    const filterValue = ref(false);
    watch(filterValue, () =>
      store.commit("open_close_filter", filterValue.value)
    );

    const confirmFilters = () => context.emit("confirmFilters");
    const clearFilters = () => context.emit("clearFilters");

    return { filterValue, confirmFilters, clearFilters };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.btns {
  display: flex;
  flex-direction: row;
  justify-self: end;
  .btn:first-child {
    border-radius: 5px 0 0 5px;
  }

  .btn:last-child {
    border-radius: 0 5px 5px 0;
  }
}

.filter_group {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  max-height: 20px;

  .checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
    margin: 10px 0 0 20px;
  }
  .checkbox + label {
    position: relative;
    padding: 0 0 0 63px;
    cursor: pointer;
    color: #3f3f3f;
    @include font(400, 16px, 19px);
  }
  .checkbox + label:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 56px;
    height: 25px;
    border-radius: 20px;
    background: #c4c4c4;
    transition: 0.15s ease-out;
  }
  .checkbox + label:after {
    content: "";
    position: absolute;
    top: -1px;
    left: 4px;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    background: #fff;
    transition: 0.15s ease-out;
  }
  .checkbox:checked + label:before {
    background: #757575;
  }
  .checkbox:checked + label:after {
    left: 35px;
  }
}
</style>
