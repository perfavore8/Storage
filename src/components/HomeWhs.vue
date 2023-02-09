<template>
  <div class="whs">
    <div class="radio_btns" :class="{ whs_full: whsFull }" ref="refRadioBtns">
      <div class="radio_btn" v-for="wh in whs" :key="wh">
        <input
          type="radio"
          :value="wh.value"
          :id="wh.name"
          name="selected_storage"
          :checked="selectedWH.value == wh.value"
          @change="selectWH(wh)"
        />
        <label :for="wh.name">{{ wh.name }}</label>
      </div>
    </div>
    <button
      @click="whsFull = !whsFull"
      class="arrow btn"
      :class="{ rotate_arrow: whsFull }"
      v-if="showWhsArrow"
    >
      <span class="material-icons-outlined"> expand_more </span>
    </button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import store from "@/store";
import { computed, nextTick, watch } from "@vue/runtime-core";
export default {
  props: {
    selectedWH: Object,
  },
  setup(props, context) {
    const whs = ref([]);

    const storeWhs = computed(() => store.state.account.account.whs);
    watch(storeWhs, () => changeStoreWhs());
    const changeStoreWhs = () => (getWHS(), setShowWhsArrow());

    const getWHS = () => {
      whs.value = [];

      const { system, custom } = store.state.account.account.whs2;

      system.forEach((wh) => {
        whs.value.push({ name: wh.name, value: wh.code });
      });

      whs.value.push({ name: "Услуги", value: "services" });

      custom.forEach((wh) => {
        whs.value.push({ name: wh.name, value: wh.code });
      });
    };

    const refRadioBtns = ref(null);
    const showWhsArrow = ref(true);
    const whsFull = ref(true);
    // будет открыт список или нет
    const setShowWhsArrow = () => {
      const height = 30; //                 высота свернутого списка в пикселях
      nextTick(() => {
        showWhsArrow.value =
          refRadioBtns.value?.getBoundingClientRect().height > height;
        showWhsArrow.value ? (whsFull.value = true) : (whsFull.value = false);
      });
    };

    const selectWH = (wh) => context.emit("update:selectedWH", wh);

    return {
      whsFull,
      showWhsArrow,
      whs,
      changeStoreWhs,
      selectWH,
      refRadioBtns,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.whs {
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  .arrow {
    margin-top: 1px;
    cursor: pointer;
    width: 32px;
    height: 24px;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease-in-out;
    > span {
      color: #757575;
      font-size: x-large;
    }
  }
  .rotate_arrow {
    transform: rotateX(180deg);
  }

  .whs_full {
    height: 100% !important;
  }
  .radio_btns {
    height: 24px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 16px;
    flex-wrap: wrap;
    width: 100%;
    .radio_btn {
      > input {
        display: none;
      }
      > label {
        display: inline-block;
        cursor: pointer;
        position: relative;
        padding-left: 25px;
        margin-right: 0;
        line-height: 18px;
        user-select: none;
        color: #3f3f3f;
        @include font(400, 16px);
      }
      > label:before {
        content: "";
        display: inline-block;
        width: 14px;
        height: 14px;
        position: absolute;
        left: 0;
        bottom: 5px;
        background: #ffffff;
        border: 1px solid #c9c9c9;
        border-radius: 50%;
        @include bg_image("../assets/Ellipse_2.svg", 0);
        transition: background-size 0.15s ease-in-out;
      }
      > input:checked + label:before {
        @include bg_image("../assets/Ellipse_2.svg", 40%);
      }
    }
  }
}
</style>
