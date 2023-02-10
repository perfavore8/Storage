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
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  background: #fff;
  padding: 20px 35px 20px 25px;
  box-shadow: 0 6px 20px -5px rgb(0 0 0 / 20%);
  overflow: hidden;
  width: fit-content;
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
  .logo {
    font-size: 32px;
  }
  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 20px;
    .header {
      @include font(600, 16px);
      color: #333;
    }
    .text {
      color: #666;
    }
  }
  .cross {
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 5px;
    opacity: 0.7;
    padding: 0;
    background-color: transparent;
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
