<template>
  <div class="app">
    <div class="header">
      <div class="top">
        <AppHeader />
      </div>
      <div class="bottom">
        <AppRadioBtnsGroupUnderlined
          :list="tabs.list"
          :selected="tabs.selected"
          @select="(option) => tabs.select(option)"
        />
      </div>
    </div>
    <div class="content">
      <component :is="tabs.selected.component" />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
import AmoCrmGeneralSettings from "@/components/AmoCrm/AmoCrmGeneralSettings.vue";
import AmoCrmSyncSettings from "@/components/AmoCrm/AmoCrmSyncSettings.vue";
import { reactive } from "vue";
export default {
  name: "InstructionsView",
  components: {
    AppHeader,
    AppRadioBtnsGroupUnderlined,
    AmoCrmGeneralSettings,
    AmoCrmSyncSettings,
  },
  setup() {
    const tabs = reactive({
      selected: {},
      list: [
        {
          name: "Общие настройки",
          value: "general",
          component: "AmoCrmGeneralSettings",
          default: true,
        },
        {
          name: "Настройки синхронизации товаров",
          value: "sync",
          component: "AmoCrmSyncSettings",
        },
      ],
      select: function (option) {
        this.selected = option;
      },
      dropToDefault: function () {
        const defEl = this.list.find((el) => el.default);
        if (defEl) this.select(defEl);
      },
    });
    tabs.dropToDefault();

    return { tabs };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: 100vw;
  height: 100%;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 24px;
  z-index: 50;
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
      border-radius: 0;
    }
    .btn:first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    .btn:last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
}
.content {
  margin-top: 20px;
  .autorization {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .row {
      display: flex;
      flex-direction: row;
      gap: 8px;
      justify-content: center;
      align-items: center;
    }
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
