<template>
  <div class="box">
    <h1>Why are you here???</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      i: 0,
      interval: null,
    };
  },

  mounted() {
    this.interval = setInterval(() => {
      this.i == 359 ? (this.i = 0) : this.i++;
    }, 15);
  },
  unmounted() {
    clearInterval(this.interval);
  },

  computed: {
    color() {
      return `hsl(${this.i}, 100%, 50%)`;
    },
    colorNext() {
      const j = this.i + 180;
      return `hsl(${j}, 100%, 50%)`;
    },
  },
};
</script>

<style lang="scss">
@import "@/app.scss";
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(color);
  color: v-bind(colorNext);
  @include font(700, 50px);
}
</style>
