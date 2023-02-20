<template>
  <div class="center">
    <template v-for="(notification, idx) in notificationsData" :key="idx">
      <transition name="card">
        <NotificationCard
          v-if="notification.show || true"
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
  <button
    @click="start()"
    class="fixed top-2 left-2 z-50"
    v-if="isNotificationTest"
    :disabled="inProgress"
  >
    123
  </button>
</template>

<script>
import NotificationCard from "./NotificationCard.vue";
import { useNotification } from "@/composables/notification";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  components: { NotificationCard },
  setup() {
    const { notificationsData, addNotification, delay } = useNotification();
    const route = useRoute();

    const isNotificationTest = computed(
      () => route.query.test === "notifications"
    );

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

    return {
      notificationsData,
      stop,
      start,
      inProgress,
      addNotification,
      isNotificationTest,
    };
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
