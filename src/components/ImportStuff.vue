<template>
  <Teleport to="body">
    <div class="backdrop" @click="close()" />
  </Teleport>
  <div class="wrapper">
    <header>
      <h1>Настройки импорта</h1>
      <button class="btn cross" @click="close()"></button>
    </header>
    <main>
      <div class="template">
        <SelectorVue :options_props="[]" :selected_option="{}" />
        <input type="text" />
      </div>
      <table class="table">
        <thead>
          <tr class="row title">
            <td class="item" v-for="i in 10" :key="i">h{{ i }}</td>
          </tr>
        </thead>
        <tbody>
          <tr class="row">
            <td class="item" v-for="i in 10" :key="i">i{{ i }}</td>
          </tr>
          <tr class="row">
            <td class="item" v-for="i in 10" :key="i">i{{ i }}</td>
          </tr>
          <tr class="row">
            <td class="item" v-for="i in 10" :key="i">
              <SelectorVue :options_props="[]" :selected_option="{}" />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <BtnsSaveClose @close="close" />
    </footer>
  </div>
</template>

<script>
import store from "@/store";
import BtnsSaveClose from "./BtnsSaveClose.vue";
import SelectorVue from "./SelectorVue.vue";
export default {
  components: { SelectorVue, BtnsSaveClose },
  setup() {
    const close = () => store.commit("openCloseImportStuff");
    return {
      close,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999;
  width: fit-content;
  max-width: 70%;
  @include font(400, 16px);
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  outline: 0;
  box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
  text-align: left;
  display: flex;
  flex-direction: column;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    padding: 12px 32px;
    border-bottom: 2px solid #dee2e6;
    > h1 {
      margin: 0;
      @include font(500, 20px);
    }
    .cross {
      background-color: transparent;
      width: 16px;
      height: 16px;
      transition: transform 0.15s ease-in-out;
      @include bg_image("@/assets/cross_black.svg", 100% 100%);
    }
    .cross:hover {
      transform: rotate(90deg);
    }
  }
  main {
    padding: 12px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .template {
      display: flex;
      flex-direction: row;
      gap: 16px;
    }
    .table {
      border-collapse: collapse;
      width: 100%;
      display: block;
      // max-width: 100vw;
      overflow: scroll;
      .title {
        @include font(700, 16px);
        background-color: rgba(0, 0, 0, 0.1) !important;
        .item {
          padding-bottom: 20px !important;
          text-align: center !important;
        }
      }
      .row_odd {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .item {
        padding: 12px 16px;
        border: 1px solid #c9c9c9;
        text-align: left;
        > .v-select {
          min-width: 100px;
          width: fit-content;
        }
      }
    }
  }
  footer {
    border-top: 2px solid #dee2e6;
    padding: 12px 32px;
    display: flex;
    justify-content: end;
  }
}
.backdrop {
  background-color: transparent;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 800;
}
</style>
