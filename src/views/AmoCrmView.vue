<template>
  <div class="app">
    <div class="header">
      <div class="top">
        <AppHeader />
      </div>
      <div class="flex flex-col items-center">
        <div class="flex flex-col items-start w-fit">
          <h1 class="text-3xl font-bold text-slate-700">
            {{ $t("Amo.header") }}
          </h1>
          <div class="flex gap-4" v-if="!inFrame">
            <span>{{ $t("Amo.office") }}</span>
            <a
              :href="`https://${subdomain}.amocrm.ru/`"
              target="blank"
              class="flex items-center gap-1 font-medium text-indigo-600 underline dark:text-indigo-500 hover:no-underline focus:outline-offset-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.5 10.5L21 3m-5 0h5v5m0 6v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"
                />
              </svg>
              {{ subdomain }}
            </a>
          </div>
        </div>
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
import AmoCrmDocumentsSettings from "@/components/AmoCrm/AmoCrmDocumentsSettings.vue";
import { computed, reactive } from "vue";
import store from "@/store";
import { inFrame } from "@/composables/checkInFrame";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  name: "InstructionsView",
  components: {
    AppHeader,
    AppRadioBtnsGroupUnderlined,
    AmoCrmGeneralSettings,
    AmoCrmSyncSettings,
    AmoCrmDocumentsSettings,
  },
  setup() {
    const { t } = useLangConfiguration();

    const tabs = reactive({
      selected: {},
      list: [
        {
          name: t("Amo.tabs.general"),
          value: "general",
          component: "AmoCrmGeneralSettings",
          default: true,
        },
        {
          name: t("Amo.tabs.sync"),
          value: "sync",
          component: "AmoCrmSyncSettings",
        },
        {
          name: t("Amo.tabs.docs"),
          value: "docs",
          component: "AmoCrmDocumentsSettings",
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

    const subdomain = computed(() => store.state.account.account?.subdomain);

    return { tabs, subdomain, inFrame };
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
