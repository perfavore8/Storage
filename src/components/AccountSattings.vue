<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container">
      <div class="header">
        <label>Настройки аккаунта</label>
        <button class="btn_del" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="content">
        <div class="block">
          <h6 class="my-9">Этапы резервирования товаров со склада</h6>
          <div class="text">
            <input
              type="checkbox"
              class="checkbox"
              v-model="divideRight"
              id="asd1"
            />
            <label for="asd1">Разделять права</label>
          </div>
        </div>
      </div>
      <div class="footer">
        <BtnsSaveClose @save="save" @close="close" />
      </div>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "./BtnsSaveClose.vue";
import { computed, onMounted, ref } from "@vue/runtime-core";
import store from "@/store";
export default {
  components: { BtnsSaveClose },
  setup() {
    const account = computed(() => {
      return store.state.account.account;
    });

    const divideRight = ref(false);
    onMounted(async () => {
      await store.dispatch("get_account");
      if (account.value?.config?.divide_right !== undefined)
        divideRight.value = Boolean(account.value?.config?.divide_right);
    });

    const save = async () => {
      await store.dispatch("update_account", {
        divide_right: divideRight.value,
      });
      await store.dispatch("get_account");
      close();
    };

    const close = () => {
      store.commit("openCloseAccountSattings", false);
    };

    return { divideRight, account, close, save };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  @include font(400, 16px);
  .backdrop_with_filter {
    z-index: 259;
  }
  .container {
    position: relative;
    z-index: 260;
    max-width: 1140px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 10px 50px;
      @include font(500, 20px);
      border-bottom: 2px solid #dee2e6;
      .btn_del {
        background: transparent;
        border-radius: 0 5px 5px 0;
        height: 30px;
        width: 30px;
        margin: 0 auto;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
        margin: 0;
        margin-right: -10px;
        .icon {
          width: inherit;
          height: inherit;
          transition: transform 0.15s ease-in-out;
          @include bg_image("@/assets/cross_black.svg", 60%);
        }
        .icon:hover {
          transform: rotate(90deg);
        }
      }
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px;
      border-bottom: 2px solid #dee2e6;
      display: flex;
      flex-direction: row;
      gap: 20px;
      .block {
        display: flex;
        flex-direction: column;
        width: 100%;

        h6 {
          @include font(500, 16px);
        }

        .text {
          display: flex;
          flex-direction: column;
          border: 1px solid #c9c9c9;
          border-radius: 4px;
          padding: 16px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 50px;
    }
  }
}
</style>
