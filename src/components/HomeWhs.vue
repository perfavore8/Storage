<template>
  <div class="whs">
    <div class="radio_btns">
      <div class="radio_btn" v-for="wh in systemWhs" :key="wh">
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
      <AppInputSelect
        v-if="customWhs.length"
        :list="sortedCustomWhs"
        :selected="selectWH"
        :requestDelay="0"
        :placeholder="
          customWhs.includes(selectedWH) ? selectedWH.name : 'Выберите склад'
        "
        :input_uderline="true"
        @changeInputValue="changeInputValueWhs"
        @select="selectWH"
      />
    </div>
  </div>
</template>

<script>
import AppInputSelect from "./AppInputSelect.vue";
import { ref } from "@vue/reactivity";
import store from "@/store";
import { computed, watch } from "@vue/runtime-core";
export default {
  components: { AppInputSelect },
  props: {
    selectedWH: Object,
  },
  setup(props, context) {
    const whs = ref([]);
    const systemWhs = ref([]);
    const customWhs = ref([]);

    const storeWhs = computed(() => store.state.account.account.whs);
    watch(storeWhs, () => changeStoreWhs());
    const changeStoreWhs = () => getWHS();

    const getWHS = () => {
      whs.value = [];
      systemWhs.value = [];
      customWhs.value = [];

      const { system, custom } = store.state.account.account.whs2;

      system.forEach((wh) => {
        systemWhs.value.push({ name: wh.name, value: wh.code });
        whs.value.push({ name: wh.name, value: wh.code });
      });

      systemWhs.value.push({ name: "Услуги", value: "services" });
      whs.value.push({ name: "Услуги", value: "services" });

      custom.forEach((wh) => {
        customWhs.value.push({ name: wh.name, value: wh.code });
        whs.value.push({ name: wh.name, value: wh.code });
      });
    };

    const selectWH = (wh) => context.emit("update:selectedWH", wh);

    const inputValueWhs = ref("");
    const changeInputValueWhs = (value) => (inputValueWhs.value = value);
    const sortedCustomWhs = computed(() =>
      customWhs.value.filter((wh) =>
        wh?.name?.toLowerCase()?.includes(inputValueWhs.value?.toLowerCase())
      )
    );

    return {
      whs,
      changeStoreWhs,
      selectWH,
      systemWhs,
      customWhs,
      changeInputValueWhs,
      sortedCustomWhs,
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
  .radio_btns {
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
