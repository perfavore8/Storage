<template>
  <div class="wrapper">
    <div class="backdrop" @click="close()" />
    <div class="container">
      <div class="header">
        <label>Интеграции</label>
        <button class="btn_del" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="content">
        <div class="item">
          <img
            class="icon"
            src="@/assets/genezis.jpg"
            @click="true ? null : route('genezis')"
          />
          <a
            href=" https://www.amocrm.ru/oauth/?state=%7B%22external_source%22:%22gosklad%22%7D&client_id=d9322b36-0001-4269-bb61-976571e8a51a"
            target="blank"
          >
            <button
              class="btn btn_dark_blue"
              :disabled="(account?.g_install || true) && !isTest"
            >
              {{ account?.g_install ? "Установлено" : "Установить" }}
            </button>
          </a>
          <small v-if="!account?.g_install">
            Для интеграции с 1С-Генезис необходимо установить виджет «Генезис:
            1С интеграция»
          </small>
          <a @click="route('genezis')">
            <button
              class="btn btn_dark_blue"
              :disabled="!account?.g_install && !isTest"
            >
              Настройки
            </button>
          </a>
        </div>
        <div class="item">
          <img class="icon" src="@/assets/lo.jpg" />
          <a
            href="https://www.amocrm.ru/oauth/?client_id=a4864c29-6b9b-470b-bb0e-9a1c22496087"
            target="blank"
            ><button class="btn btn_dark_blue">Установить</button></a
          >
          <small>Бесплатное дополнение</small>
        </div>
        <div class="item">
          <img class="icon" src="@/assets/re.jpg" />
          <a
            href="https://www.amocrm.ru/oauth/?client_id=47855e7f-c170-44b3-8d95-a3fe357d2cc7"
            target="blank"
            ><button class="btn btn_dark_blue">Установить</button></a
          >
          <small>Бесплатное дополнение</small>
        </div>
        <div class="item">
          <img class="icon" src="@/assets/co.png" />
          <a><button class="btn btn_dark_blue">Скоро</button></a>
          <small>
            Для установки необходимо быть пользователем платформы CoMagic
          </small>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    oneC() {
      return this.$store.state.account.account?.config?.g_enabled;
    },
    account() {
      return this.$store.state.account.account;
    },
    isTest() {
      return this.$store.state.account?.account?.id == 1;
    },
  },
  methods: {
    route(page_name) {
      this.$router.push("/" + page_name);
    },
    close() {
      this.$store.commit("openCloseThirdPpartyIntegrations", false);
    },
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
  .backdrop {
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
      .item {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: calc(20% - 20px);
        padding: 16px;
        box-shadow: 0px 4px 4px #00000040;
        border: 1px solid #dee2e6;
        border-radius: 10px;
        .icon {
          cursor: pointer;
          border-radius: 10px;
          width: 142px;
          height: 97px;
          object-fit: cover;
        }
        small {
          @include font(400, 10px);
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
