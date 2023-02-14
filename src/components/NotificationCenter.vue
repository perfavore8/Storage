<template>
  <div class="center">
    <template v-for="(notification, idx) in notificationsData" :key="idx">
      <transition name="card">
        <NotificationCard
          v-if="notification.show"
          :notification="{
            type: notification.type,
            header: notification.header,
            text: notification.text,
          }"
          @close="() => stop(idx)"
        />
      </transition>
    </template>
  </div>
  <button @click="start()" :disabled="inProgress">123</button>
</template>

<script>
import { reactive } from "@vue/reactivity";
import NotificationCard from "./NotificationCard.vue";
import { computed } from "@vue/runtime-core";
export default {
  components: { NotificationCard },
  setup() {
    const notificationsData = reactive([
      {
        type: 0,
        header: "Notification info",
        text: "Lorem ipsum dolor",
        show: false,
        timer: null,
      },
      {
        type: 1,
        header: "Notification success",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        show: false,
        timer: null,
      },
      {
        type: 2,
        header: "Notification warning",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio animi libero vel",
        show: false,
        timer: null,
      },
      {
        type: 3,
        header: "Notification error",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio animi libero vel, quas neque tenetur ipsum voluptatum!",
        show: false,
        timer: null,
      },
    ]);

    const delay = 8000;

    const start = () => {
      notificationsData.forEach((val, idx) => {
        setTimeout(() => {
          val.show = true;
          val.timer = setTimeout(() => (val.show = false), delay);
        }, idx * 400);
      });
    };

    const inProgress = computed(() =>
      notificationsData.some((val) => val.show)
    );

    const stop = (idx) => {
      notificationsData[idx].show = false;
      notificationsData[idx].timer = null;
    };

    return { notificationsData, stop, start, inProgress };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.center {
  z-index: 9999999;
  position: fixed;
  left: 0;
  bottom: 0;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.card-enter-active,
.card-leave-active {
  transition: all 0.3s ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0.5;
  transform: translateX(calc(-100% - 46px));
}
</style>
