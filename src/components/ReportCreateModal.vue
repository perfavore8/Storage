<template>
  <teleport to="body">
    <div class="wrapper">
      <div class="backdrop_with_filter" @click="close()" />
      <div class="container">
        <header class="header">
          <label>Новый отчет</label>
          <button class="btn cross" @click="close()">
            <span class="material-icons-round"> close </span>
          </button>
        </header>
        <main class="content">
          <form>
            <div class="label_input">
              <label>Название отчета</label>
              <input
                class="input"
                type="text"
                placeholder="По продажам"
                v-model="newReport.name"
              />
            </div>
          </form>
        </main>
        <footer class="footer">
          <BtnsSaveClose @save="save" @close="close" />
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script>
import store from "@/store";
import BtnsSaveClose from "./BtnsSaveClose.vue";
import { reactive } from "@vue/reactivity";
export default {
  components: { BtnsSaveClose },
  props: {},
  setup() {
    const newReport = reactive({
      name: "По ",
    });

    const close = () => store.commit("toggleReportCreate", false);

    return { close, newReport };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
* {
  box-sizing: border-box;
}
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  // align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  .backdrop_with_filter {
    z-index: 49;
  }
  .container {
    z-index: 50;
    text-align: left;
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 80%;
    margin-top: 10%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 16px 64px;
      border-bottom: 2px solid #dee2e6;

      label {
        @include font(500, 28px);
        max-width: 60%;
      }
      .cross {
        padding: 5px;
        opacity: 0.7;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        overflow: hidden;
        > span {
          font-size: 38px;
        }
      }
      .cross:hover {
        transform: rotate(90deg) scale(1.05);
      }
    }
    .content {
      padding: 16px 64px;
      border-bottom: 2px solid #dee2e6;
      @include font(400, 16px);
      form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1vh;
        .label_input {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      }
    }
    .footer {
      padding: 16px 64px;
      display: flex;
      justify-content: end;
      align-items: center;
    }
  }
}
</style>
