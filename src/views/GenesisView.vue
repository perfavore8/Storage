<template>
  <div class="app">
    <div class="header">
      <button @click="selectedTab = 1">
        Настройки Интеграции с 1С-Генезис
      </button>
      <button @click="selectedTab = 2">
        Настройки «Генезис: 1С интеграция» - тут будет фрейм
      </button>
    </div>
    <div class="content">
      <h1>Genesis Page</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructionsView",
  data() {
    return {
      selectedTab: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 60px);
  height: 100%;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  user-select: none;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
</style>
