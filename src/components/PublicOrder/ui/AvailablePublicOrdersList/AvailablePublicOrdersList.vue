<template>
  <div>
    <button
      @click="toggleModal"
      class="btn_white whitespace-nowrap auto z-[47]"
    >
      {{ $t("newOrder.myOrders") }}
    </button>
    <Teleport to="body">
      <transition name="op">
        <div v-if="showModal" class="backdrop !bg-black/20 !z-[48]"></div>
      </transition>
      <transition name="fade">
        <div
          class="fixed left-0 top-0 w-full md:max-w-[50%] h-full z-[50] p-3 origin-top sm:origin-top-left"
          v-if="showModal"
        >
          <div
            ref="listRef"
            class="bg-white rounded-lg shadow w-fit dark:bg-gray-700 relative z-[49]"
          >
            <div
              class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ $t("newOrder.ordersList") }}
              </h3>
              <button class="cross btn" @click="toggleModal(false)">
                <span class="material-icons-outlined"> close </span>
              </button>
            </div>

            <ul
              class="text-sm font-medium w-full sm:w-fit flex flex-col gap-2 p-2 text-gray-900 dark:bg-gray-700 dark:text-white max-h-[500px] overflow-y-auto"
            >
              <li
                v-for="order in list.filter((el) => el.active)"
                :key="order.id"
                @click="follow(order.id), toggleModal(false)"
                class="w-full h-auto px-4 py-2 bg-slate-100 rounded-lg cursor-pointer"
              >
                {{ order.name }}
              </li>
              <div class="w-full h-4"></div>
              <li
                v-for="order in list.filter((el) => !el.active)"
                :key="order.id"
                @click="follow(order.id), toggleModal(false)"
                class="w-full px-4 py-2 bg-slate-100 rounded-lg cursor-pointer opacity-75"
              >
                {{ order.name }}
              </li>
            </ul>
            <div
              class="p-4 py-3 md:py-4 md:p-5 flex items-center gap-4 text-slate-800 border-t rounded-t dark:border-gray-600 dark:text-white"
            >
              <h5 class="text-slate-900 text-lg font-semibold">Всего</h5>
              <span>6 заказов</span>
              <span>21000р</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
import { onClickOutside, useToggle } from "@vueuse/core";
import { useList } from "../../model";
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const { getList, list, follow } = useList();
    getList();

    const [showModal, toggleModal] = useToggle();
    watchEffect(() => {
      showModal.value
        ? (document.body.style.overflowY = "hidden")
        : (document.body.style.overflowY = "auto");
    });

    const listRef = ref(null);
    onClickOutside(listRef, () => toggleModal(false));

    return { showModal, toggleModal, listRef, getList, list, follow };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.cross {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 4px;
  opacity: 0.7;
  background-color: transparent;
  @apply w-fit h-fit;
  > span {
    font-size: 24px;
    @apply dark:text-slate-300;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.op-enter-active,
.op-leave-active {
  transition: all 0.2s ease-out;
}
.op-enter-from,
.op-leave-to {
  opacity: 0;
}
</style>
