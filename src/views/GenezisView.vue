<template>
  <div class="app">
    <div class="header">
      <div class="top">
        <AppHeader />
      </div>
      <div class="bottom">
        <button
          class="btn"
          :class="{ btn_grey: selectedTab == 1 }"
          @click="selectedTab = 1"
        >
          {{ $t("Genezis.btnSet") }}
        </button>
        <button
          class="btn"
          :class="{ btn_grey: selectedTab == 2 }"
          v-if="account?.config?.g_enabled && account?.g_url"
          @click="selectedTab = 2"
        >
          {{ $t("Genezis.btnSet2") }}
        </button>
      </div>
    </div>
    <div class="content">
      <div v-if="selectedTab == 1">
        <div class="autorization" v-if="account?.config?.g_enabled">
          <div class="row">
            {{ $t("Genezis.gActive") }}
            <button class="btn btn_yellow" @click="unAutorization()">
              {{ $t("Genezis.disable") }}
            </button>
          </div>
          <template v-if="false">
            <GenezisSettings
              v-for="field in genezisSettingsData"
              :key="field.label"
              :label="field.label"
              :leadsDeals="field.leadsDeals"
              :needSave="needSave"
            />
            <BtnsSaveClose @save="save" :show_close="false" />
          </template>
        </div>
        <div class="autorization" v-else>
          {{ $t("Genezis.dDisable") }}
          <button class="btn btn_yellow" @click="autorization()">
            {{ $t("Genezis.active") }}
          </button>
        </div>
      </div>
      <div v-show="selectedTab == 2">
        <iframe
          name="genezis"
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
import AppHeader from "@/components/AppHeader.vue";
import GenezisSettings from "@/components/GenezisSettings.vue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { nextTick } from "@vue/runtime-core";
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  name: "InstructionsView",
  components: { AppHeader, GenezisSettings, BtnsSaveClose },
  data() {
    return {
      selectedTab: 1,
      needSave: false,
      genezisSettingsData: [
        {
          label: t("Genezis.fields.comp"),
          leadsDeals: [
            {
              name: t("Genezis.fields.comp.compName"),
              code: "g_company_field_name",
            },
            {
              name: t("Genezis.fields.comp.compInn"),
              code: "g_company_field_inn",
            },
            {
              name: t("Genezis.fields.comp.compKpp"),
              code: "g_company_field_kpp",
            },

            {
              name: t("Genezis.fields.comp.compOgrn"),
              code: "g_company_field_ogrn",
            },
          ],
        },
        {
          label: t("Genezis.fields.acc"),
          leadsDeals: [
            {
              name: t("Genezis.fields.comp.accName"),
              code: "g_company_field_account_name",
            },
            {
              name: t("Genezis.fields.comp.accSch"),
              code: "g_company_field_account_correspondent",
            },
            {
              name: t("Genezis.fields.comp.accBik"),
              code: "g_company_field_account_bic",
            },

            {
              name: t("Genezis.fields.comp.accRas"),
              code: "g_company_field_account_settlement",
            },
          ],
        },
      ],
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
      await this.$store.dispatch("genezisEnableDisable", "disable");
      this.$store.dispatch("get_account");
    },
    async autorization() {
      await this.$store.dispatch("genezisEnableDisable", "enable");
      this.$store.dispatch("get_account");
    },
    save() {
      this.needSave = true;
      nextTick(() => (this.needSave = false));
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
