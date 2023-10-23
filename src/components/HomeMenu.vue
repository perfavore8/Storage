<template>
  <div class="menu">
    <div class="ref ref_center">
      <button
        class="ref_2_logo btn"
        @click="openTaskCenter()"
        :title="t('HomeMenu.tasks.title')"
      >
        <span class="material-icons"> splitscreen </span>
      </button>
      <transition name="modal">
        <div class="tasks">
          <TaskCenter @close="closeTaskCenter()" v-if="showTaskCenter" />
        </div>
      </transition>
    </div>

    <div class="ref ref_center" v-if="isHomePage">
      <button
        class="ref_2_logo btn"
        @click="openImportXlsl()"
        :title="t('HomeMenu.import.title')"
      >
        <transition name="modal">
          <span class="material-icons-round" v-if="showImportXlsx">
            sim_card_download
          </span>
          <span class="material-icons-outlined" v-else>
            sim_card_download
          </span>
        </transition>
      </button>
      <template v-if="showImportXlsx">
        <div class="backdrop" @click="closeImportXlsl()" />
        <div class="import_file">
          <label for="xlsx"> {{ $t("HomeMenu.import.btnPlaceholder") }}</label>
          <input
            type="file"
            accept=".xlsx"
            id="xlsx"
            @change="(ev) => getFile(ev)"
          />
        </div>
      </template>
    </div>

    <div class="ref" v-if="false">
      <button
        class="ref_2_logo btn"
        @click="open_close_sync()"
        :title="t('HomeMenu.sync.title')"
      >
        <transition name="modal">
          <span class="material-icons" v-if="show_sync"> cloud_sync </span>
          <span class="material-icons-outlined" v-else> cloud_sync </span>
        </transition>
      </button>
      <template v-if="show_sync">
        <div class="backdrop" @click="open_close_sync()" />
        <transition name="modal">
          <div class="modal_settings modal_sync">
            <a :class="{ disable: is_empty_amo_product_list }">
              <div
                class="modal_container"
                @click="
                  is_empty_amo_product_list
                    ? null
                    : (syncAmoGs(), open_close_sync())
                "
              >
                {{ $t("HomeMenu.sync.amo_go") }}
              </div>
            </a>
            <a :class="{ disable: is_empty_amo_product_list }">
              <div
                class="modal_container"
                @click="
                  is_empty_amo_product_list
                    ? null
                    : (syncGsAmo(), open_close_sync())
                "
              >
                {{ $t("HomeMenu.sync.go_amo") }}
              </div>
            </a>
            <template v-if="oneC">
              <a>
                <div
                  class="modal_container"
                  @click="sync1C(), open_close_sync()"
                >
                  {{ $t("HomeMenu.sync.oneC") }}
                </div>
              </a>
            </template>
          </div>
        </transition>
      </template>
    </div>
    <div class="ref" v-if="!(isTest2 && !currentSetSettings?.app?.settingsBtn)">
      <button
        class="settings_btn"
        :class="{ settings_btn_rotate: show_settings }"
        @click="open_close_settings()"
        :title="t('HomeMenu.settings.title')"
      >
        <span class="material-icons"> settings </span>
      </button>
      <template v-if="show_settings">
        <div class="backdrop" @click="close_settings()" />
        <transition name="modal">
          <div class="modal_settings" @click="close_settings()">
            <a>
              <div class="modal_container" @click="open_edit_stuff()">
                {{ $t("HomeMenu.settings.general") }}
              </div>
            </a>
            <a v-if="isTest2">
              <div class="modal_container" @click="openSettingEntities()">
                {{ $t("HomeMenu.settings.entities") }}
              </div>
            </a>
            <a>
              <div
                class="modal_container"
                @click="open_close_document_setting(true)"
              >
                {{ $t("HomeMenu.settings.docs") }}
              </div>
            </a>
            <a>
              <div class="modal_container" @click="openAccountSattings()">
                {{ $t("HomeMenu.settings.account") }}
              </div>
            </a>
            <a v-if="isColored">
              <div
                class="modal_container"
                @click="openThirdPpartyIntegrations()"
              >
                {{ $t("HomeMenu.settings.integration") }}
              </div>
            </a>
            <a v-if="isTest2">
              <div class="modal_container" @click="openArchive()">
                {{ $t("HomeMenu.settings.archive") }}
              </div>
            </a>
            <template v-if="!isTest2">
              <a>
                <div class="modal_container" @click="open_product_category()">
                  {{ $t("HomeMenu.settings.categories") }}
                </div>
              </a>
              <a>
                <div class="modal_container" @click="open_product_properties()">
                  {{ $t("HomeMenu.settings.properties") }}
                </div>
              </a>
              <a v-if="!oneC && isColored">
                <div class="modal_container" @click="openSyncSettings()">
                  {{ $t("HomeMenu.settings.sync") }}
                </div>
              </a>
              <a v-if="isTest2">
                <div
                  class="modal_container"
                  @click="openClientsFieldsSettings()"
                >
                  {{ $t("HomeMenu.settings.clients") }}
                </div>
              </a>
            </template>
          </div>
        </transition>
      </template>
    </div>
    <div class="ref">
      <button
        class="ref_2_logo btn hover:scale-110"
        @click="toggleShowUserMenu()"
        :title="t('HomeMenu.user.title')"
      >
        <span class="material-icons-outlined text-2xl"> account_circle </span>
      </button>
      <template v-if="showUserMenu">
        <div class="backdrop" @click="toggleShowUserMenu()" />
        <transition name="modal">
          <HomeMenuUser />
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
import TaskCenter from "@/components/TaskCenter.vue";
import HomeMenuUser from "./HomeMenuUser.vue";
import { computed, ref } from "@vue/runtime-core";
import { useNotification } from "@/composables/notification";
import { useToggle } from "@vueuse/core";
import store from "@/store";
import router from "@/router";
import { useRoleSettings } from "@/composables/roleSettings";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { isTest2 } from "@/composables/isTest";
export default {
  components: {
    TaskCenter,
    HomeMenuUser,
  },
  setup() {
    const { t } = useLangConfiguration();
    const { addNotification } = useNotification();
    const { currentSetSettings } = useRoleSettings();

    const showTaskCenter = computed(() => store.state.shows.showTaskCenter);
    const show_sync = computed(() => store.state.shows.show_sync);
    const show_settings = computed(() => store.state.shows.show_settings);
    const oneC = computed(() => store.state.account.account?.config?.g_enabled);
    const account = computed(() => store.state.account.account);
    const userName = computed(() => store.state.account.user?.name);
    const amoTest = computed(() => store.state.account?.account?.id == 454);
    const is_empty_amo_product_list = computed(
      () =>
        !account.value?.config?.amo_product_list ||
        account.value?.config?.amo_product_list == "-1"
    );

    const isColored = computed(() => store.state.account.account.is_colored);

    const showImportXlsx = ref(false);

    const openImportXlsl = () => (showImportXlsx.value = true);
    const closeImportXlsl = () => (showImportXlsx.value = false);
    const getFile = async (ev) => {
      const file = ev.target.files[0];
      const payload = new FormData();
      payload.append("file", file);
      payload.append("name", file.name);
      const res = await store.dispatch("importStuff", payload);
      if (res.error) {
        addNotification(3, t("HomeMenu.err"), res.error);
      } else {
        store.commit("openCloseImportStuff", true);
      }
      closeImportXlsl();
    };

    const openTaskCenter = () => store.commit("openCloseTaskCenter", true);
    const closeTaskCenter = () => store.commit("openCloseTaskCenter", false);
    const open_close_sync = () => store.commit("open_close_sync");
    const syncAmoGs = () => {
      store.dispatch("syncAmoGs");
      addNotification(0, t("HomeMenu.sync.title"), t("HomeMenu.sync.amo_go"));
    };
    const syncGsAmo = () => {
      store.dispatch("syncGsAmo");
      addNotification(0, t("HomeMenu.sync.title"), t("HomeMenu.sync.go_amo"));
    };
    const sync1C = () => {
      store.dispatch("sync1C");
      addNotification(0, t("HomeMenu.sync.title"), t("HomeMenu.sync.oneC"));
    };
    const open_close_settings = () => store.commit("open_close_settings");
    const close_settings = () => store.commit("close_settings");
    const open_edit_stuff = () => store.commit("open_close_edit_stuff", true);
    const open_product_category = () =>
      store.commit("open_close_product_category", true);
    const openThirdPpartyIntegrations = () =>
      store.commit("openCloseThirdPpartyIntegrations", true);
    const openAccountSattings = () => router.push("/accountSettings");
    const openClientsFieldsSettings = () =>
      store.commit("openCloseClientsFieldsSettings", true);
    const openSyncSettings = () => store.commit("openCloseSyncSettings", true);
    const open_product_properties = () =>
      store.commit("open_close_product_properties", true);
    const open_close_document_setting = (val) =>
      store.commit("open_close_document_setting", val);
    const openSettingEntities = () =>
      store.commit("toggleSettingEntities", true);
    const openArchive = () => router.push("/archive");
    const openUserLIst = () => router.push("/users");

    const [showUserMenu, toggleShowUserMenu] = useToggle(false);

    const isHomePage = computed(
      () => router?.currentRoute?.value?.name === "home"
    );

    return {
      showTaskCenter,
      show_sync,
      oneC,
      is_empty_amo_product_list,
      isTest2,
      show_settings,
      openTaskCenter,
      closeTaskCenter,
      open_close_sync,
      syncAmoGs,
      syncGsAmo,
      sync1C,
      open_close_settings,
      close_settings,
      open_edit_stuff,
      open_product_category,
      openThirdPpartyIntegrations,
      openAccountSattings,
      openClientsFieldsSettings,
      openSyncSettings,
      open_product_properties,
      open_close_document_setting,
      getFile,
      showImportXlsx,
      openImportXlsl,
      closeImportXlsl,
      isColored,
      openArchive,
      openSettingEntities,
      userName,
      showUserMenu,
      toggleShowUserMenu,
      amoTest,
      openUserLIst,
      currentSetSettings,
      ...useLangConfiguration(),
      isHomePage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: fit-content;
  gap: 25px;
  position: relative;
  .ref_center {
    justify-content: center;
  }
  .ref {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 18px;
    gap: 8px;
    position: relative;
    .ref_1_logo {
      width: 18px;
      height: 18px;
      @include bg_image("../assets/export.svg");
      transform: rotate(180deg);
    }
    .ref_2_logo {
      width: 33px;
      height: 33px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      color: #757575;
      cursor: pointer;
      transition: all 0.2s ease-out;
      > span {
        position: absolute;
      }
    }
    .import_file {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
      top: 200%;
      position: absolute;
      width: min-content;
      height: min-content;
      > label {
        @include font(500, 14px);
        border: 1px solid #c9c9c9;
        border-radius: 4px;
        background: white;
        padding: 8px;
        cursor: pointer;
        white-space: nowrap;
      }

      > input {
        opacity: 0;
        position: absolute;
        z-index: -1;
      }
    }
    .settings_btn {
      cursor: pointer;
      width: 24px;
      height: 24px;
      border: none;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #757575;
      outline: none;
      transition: all 0.15s ease-out;
    }
    .settings_btn:hover,
    .settings_btn_rotate {
      transform: rotate(90deg) scale(1.1);
    }
    .modal_settings {
      z-index: 999;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 358px;
      border: 1px solid #c9c9c9;
      border-radius: 4px;
      background: white;
      // overflow: hidden;
      position: absolute;
      top: 200%;
      right: 0;
      a {
        display: flex;
        justify-content: center;
        width: 100%;
        transition: background-color 0.15s ease-in-out;
        .modal_container {
          width: 100%;
          display: flex;
          align-items: center;
          text-align: left;
          // height: 30px;
          cursor: pointer;
          padding: 5px 15px;
          @include font(400, 16px, 22px);
        }
      }
      a:hover {
        background-color: #f5f5f5;
      }
      .disable {
        // background-color: #c5c5c5 !important;
        .modal_container {
          color: #aeaeae;
          cursor: default;
        }
      }
      .disable:hover {
        background-color: #e7e7e732;
      }
    }
    .tasks {
      position: absolute;
      top: 100%;
      width: fit-content;
    }
  }
}

.modal_sync {
  width: 400px !important;
  margin: 0 !important;
  z-index: 99999;
  a {
    padding-bottom: 0 !important;
  }
}

.modal_settings:last-child {
  a {
    padding-bottom: 10px;
  }
}
</style>
