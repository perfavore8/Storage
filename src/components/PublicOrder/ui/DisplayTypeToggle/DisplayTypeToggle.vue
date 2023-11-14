<template>
  <input
    type="checkbox"
    class="checkbox grid"
    v-model="displayTypeIsCard"
    id="DTPO"
  />
  <label for="DTPO">
    <transition name="modal" mode="out-in">
      <span class="material-icons-round icon" v-if="displayTypeIsCard">
        format_list_bulleted
      </span>
      <span class="material-icons-round icon" v-else> grid_view </span>
    </transition>
  </label>
</template>

<script>
import { useDisplayType } from "../../model";
export default {
  setup() {
    return { ...useDisplayType() };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  color: #757575;
  font-size: 28px;
  font-weight: 600;
}
.grid {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.grid + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  position: relative;
}
.grid + label::before {
  content: "";
  display: inline-block;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 0.25em;
  position: absolute;
  border: none;

  // @include bg_image("@/assets/grid.svg", 100%);
  cursor: pointer;
  background: transparent !important;
}
</style>
