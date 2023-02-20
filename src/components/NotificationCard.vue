<template>
  <div class="card">
    <span class="logo info material-icons-round" v-if="notification.type == 0">
      info
    </span>
    <span
      class="logo success material-icons-round"
      v-if="notification.type == 1"
    >
      check_circle
    </span>
    <span
      class="logo warning material-icons-round"
      v-if="notification.type == 2"
    >
      warning
    </span>
    <span class="logo error material-icons-round" v-if="notification.type == 3">
      error
    </span>
    <div class="main">
      <span class="header">{{ notification.header }}</span>
      <span class="text">{{ notification.text }}</span>
    </div>
    <button class="cross btn" @click="close()">
      <span class="material-icons-outlined"> close </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    notification: Object,
  },
  emits: { close },
  setup(props, context) {
    const close = () => context.emit("close");
    return { close };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
* {
  box-sizing: border-box;
}
.card {
  max-width: max(30vw, 320px);
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  background: #fff;
  // padding: 20px 35px 20px 25px;
  box-shadow: 0 6px 20px -5px rgb(0 0 0 / 20%);
  overflow: hidden;
  width: fit-content;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  @apply py-2 pl-3 pr-7 sm:py-3 sm:pl-4 sm:pr-8 md:py-5 md:pl-6 md:pr-9;
  .logo {
    // font-size: 32px;
    @apply text-xl sm:text-2xl md:text-3xl;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // margin: 0 20px;
    @apply mx-2 sm:mx-3 md:mx-5;
    .header {
      color: #333;
      @apply text-xs font-semibold sm:text-sm md:text-base;
    }
    .text {
      color: #666;
      @apply text-xs sm:text-sm md:text-base;
    }
  }
  .cross {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 4px;
    opacity: 0.7;
    background-color: transparent;
    width: 26px;
    height: 26px;
    @apply top-1 right-1 md:top-[10px] md:right-4;
    > span {
      font-size: 18px;
    }
  }
}
.success {
  color: #10b981;
  // background-color: #caebd9;
}
.info {
  color: #4070f4;
  // background-color: #cae1fc;
}
.warning {
  color: #f59e0b;
  // background-color: #ffe0c9;
}
.error {
  color: #ef4444;
  // background-color: #f3d6d8;
}
</style>
