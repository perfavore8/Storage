<template>
  <div class="app">
    <div class="header">
      <div class="top">
        <div class="btns">
          <button
            class="btns_btn"
            @click="route(page.value)"
            v-for="page in catalog"
            :key="page"
          >
            {{ page.name }}
          </button>
        </div>
      </div>
      <div class="bottom">
        <button
          class="btn"
          :class="{ btn_grey: selectedTab == 1 }"
          @click="selectedTab = 1"
        >
          Настройки Интеграции с 1С-Генезис
        </button>
        <button
          class="btn"
          :class="{ btn_grey: selectedTab == 2 }"
          @click="selectedTab = 2"
        >
          Настройки «Генезис: 1С интеграция»
        </button>
      </div>
    </div>
    <div class="content">
      <div v-if="selectedTab == 1">
        <div class="autorization" v-if="account?.config?.g_enabled">
          Genesis активирован.
          <button class="btn btn_yellow" @click="unAutorization()">
            Выключить
          </button>
        </div>
        <div class="autorization" v-else>
          Genesis не активирован.
          <button class="btn btn_yellow" @click="autorization()">
            Включить
          </button>
        </div>
      </div>
      <div v-show="selectedTab == 2">
        <iframe
          name="genesis"
          frameborder="0"
          class="frame"
          :src="account?.g_url"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InstructionsView",
  data() {
    return {
      selectedTab: 1,
    };
  },
  mounted() {
    this.$store.dispatch("get_account");
  },
  computed: {
    ...mapGetters(["catalog"]),
    account() {
      return this.$store.state.account.account;
    },
  },
  methods: {
    async unAutorization() {
      await this.$store.dispatch("genesisEnableDisable", "disable");
      this.$store.dispatch("get_account");
    },
    async autorization() {
      await this.$store.dispatch("genesisEnableDisable", "enable");
      this.$store.dispatch("get_account");
    },
    route(page_name) {
      this.$router.push("/" + page_name);
    },
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
  flex-direction: column;
  justify-content: start;
  gap: 24px;
  .top {
    .btns {
      display: flex;
      flex-direction: row;
      gap: 12px;
      flex-wrap: wrap;
      .btns_btn {
        // height: 30px;
        padding: calc(0.1 * $vv) calc(0.4 * $vv);
        cursor: pointer;
        text-align: center;
        vertical-align: center;
        box-sizing: border-box;
        border: 1px solid #1b3546;
        border-radius: 4px;
        color: #1b3546;
        background: transparent;

        transition: all 0.15s ease-out;
        @include font(400, 18px);
      }
      .btns_btn:hover {
        border-color: #396f93;
        color: #396f93;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .btn {
      border: 1px solid #6c757d;
    }
    .btn:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .btn:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
.content {
  margin-top: 20px;
  .autorization {
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }
  .frame {
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 180px);
    border-radius: 8px;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
  }
}
</style>
