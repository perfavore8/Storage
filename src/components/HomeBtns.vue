<template>
  <transition name="btns">
    <div class="buttons" v-if="show_buttons && !oneC">
      <template v-if="!isServicePage">
        <button
          class="btn btn_tempest smallBtn"
          @click="addCurrentProducts()"
          :disabled="oneC"
        >
          {{ $t("ostatki.btn1") }}
        </button>
        <button class="btn btn_pink smallBtn" @click="openCancelPosition()">
          {{ $t("ostatki.btn2") }}
        </button>
        <button
          class="btn btn_light_yellow smallBtn"
          @click="openMoveProductsBetweenWhs()"
        >
          {{ $t("ostatki.btn3") }}
        </button>
      </template>
      <button class="btn btn_grey smallBtn" @click="archive_data()">
        {{ $t("ostatki.btn4") }}
      </button>
    </div>
  </transition>
</template>

<script>
import { computed } from "@vue/runtime-core";
import store from "@/store";
export default {
  props: {
    isServicePage: Boolean,
  },
  emits: ["setCurrentItems", "archive_data"],
  setup(props, context) {
    const show_buttons = computed(() => store.state.shows.show_buttons);
    const oneC = computed(() => store.state.account.account?.config?.g_enabled);
    const isTest = computed(() => store.state.account?.account?.id == 1);

    const addCurrentProducts = () => {
      setCurrentItems();
      store.commit("open_close_new_position", true);
    };
    const openCancelPosition = () => {
      setCurrentItems();
      store.commit("open_close_cancel_position", true);
    };
    const openMoveProductsBetweenWhs = () => {
      setCurrentItems();
      store.commit("openCloseMoveProductsBetweenWhs", true);
    };

    const setCurrentItems = () => context.emit("setCurrentItems");

    const archive_data = () => context.emit("archive_data");

    return {
      show_buttons,
      oneC,
      isTest,
      addCurrentProducts,
      openCancelPosition,
      openMoveProductsBetweenWhs,
      archive_data,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.buttons {
  display: flex;
  flex-direction: row;
  gap: 18px;
}
.smallBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  width: 112px;
  height: 34px;
  @include font(400, 14px, 18px);
}

.btns-enter-active,
.btns-leave-active {
  transition: opacity 0.15s ease-out;
}
.btns-enter-from,
.btns-leave-to {
  opacity: 0;
}
</style>
