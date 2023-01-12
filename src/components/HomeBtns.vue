<template>
  <transition name="btns">
    <div class="buttons" v-if="show_buttons && !oneC">
      <template v-if="!isServicePage">
        <button
          class="btn button_2 smallBtn"
          @click="addCurrentProducts()"
          :disabled="oneC"
        >
          Добавить
        </button>
        <button class="btn button_3 smallBtn" @click="openCancelPosition()">
          Списать
        </button>
      </template>
      <template v-if="isTest">
        <button
          class="btn button_5 smallBtn"
          @click="openMoveProductsBetweenWhs()"
        >
          Перемещение
        </button>
      </template>
      <button class="btn button_1 smallBtn" @click="archive_data()">
        Архивировать
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
  inject: ["isServicePage"],
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
  @include font(400, 14px, 18px);
}
.button_1 {
  width: 112px;
  height: 34px;
  background: #6c757d;
}
.button_1:hover {
  background: #5f676d;
  box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
}
.button_2 {
  width: 112px;
  height: 34px;
  background: #1b3546f1;
}
.button_2:hover {
  background: #1b3546d9;
  box-shadow: 0 0 5px 2px rgb(27 53 70 / 25%);
}
.button_3 {
  width: 112px;
  height: 34px;
  background: #ea9197;
}
.button_3:hover {
  background: rgb(226, 101, 109);
  box-shadow: 0 0 5px 2px rgb(226 101 109 / 25%);
}

.button_5 {
  width: 112px;
  height: 34px;
  color: #2a2a2a;
  background: #ffeab2;
}
.button_5:hover {
  color: #000;
  background: #ffd45c;
  box-shadow: 0 0 5px 2px rgb(255 212 92 / 50%);
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
