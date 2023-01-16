<template>
  <div class="view">
    <h1>Склад не установен</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.view {
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  text-align: center;
}
h1 {
  @include font(500, 2rem);
  margin: 40px auto;
}
</style>
