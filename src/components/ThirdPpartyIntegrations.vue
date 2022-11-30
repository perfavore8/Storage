<template>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <label>ThirdPpartyIntegrations</label>
        <button @click="close()">x</button>
      </div>
      <div class="content">
        <label v-if="!oneC">
          Для интеграции с 1С-Генезис не обходимо установить виджет «Генезис: 1С
          интеграция»</label
        >
        <a
          href=" https://www.amocrm.ru/oauth/?state=%7B%22external_source%22:%22gosklad%22%7D&client_id=d9322b36-0001-4269-bb61-976571e8a51a"
          target="blank"
        >
          <button>установить «Генезис: 1С интеграция»</button></a
        >
        <div class="icon"></div>
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
  },
  methods: {
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
  z-index: 9999999;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .container {
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
      justify-content: start;
      padding: 10px 50px;
      @include font(500, 20px);
      border-bottom: 2px solid #dee2e6;
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px;
      border-bottom: 2px solid #dee2e6;
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 50px;
    }
  }
}
.icon {
  cursor: pointer;
  border-radius: 10px;
  width: 142px;
  height: 97px;
  @include bg_image("@/assets/genesis.jpg");
}
</style>
