<template>
  <div class="menu">
    <div class="ref ref_center">
      <button
        class="ref_2_logo btn"
        @click="openTaskCenter()"
        title="Список задач"
      >
        <span class="material-icons"> splitscreen </span>
      </button>
      <transition name="modal">
        <div class="tasks">
          <TaskCenter @close="closeTaskCenter()" v-if="showTaskCenter" />
        </div>
      </transition>
    </div>

    <div class="ref ref_center">
      <button
        class="ref_2_logo btn"
        @click="openImportXlsl()"
        title="Настройки импорта"
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
          <label for="xlsx">Загрузить файл</label>
          <input
            type="file"
            accept=".xlsx"
            id="xlsx"
            @change="(ev) => getFile(ev)"
          />
        </div>
      </template>
    </div>

    <div class="ref" v-if="isColored">
      <button
        class="ref_2_logo btn"
        @click="open_close_sync()"
        title="Синхронизация товаров"
      >
        <transition name="modal">
          <span class="material-icons" v-if="show_sync"> cloud_sync </span>
          <span class="material-icons-outlined" v-else> cloud_sync </span>
        </transition>
      </button>
      <template v-if="show_sync">
        <div class="backdrop" @click="open_close_sync()" />
        <transition name="modal">
          <div
            class="modal_settings modal_sync"
            @click.stop="open_close_sync()"
          >
            <template v-if="!is_empty_amo_product_list">
              <a>
                <div class="modal_container" @click="syncAmoGs()">
                  Синхронизировать товары amoCRM -> GoСклад
                </div>
              </a>
              <template v-if="isTest">
                <a>
                  <div class="modal_container" @click="syncGsAmo()">
                    Синхронизировать товары GoСклад -> amoCRM
                  </div>
                </a>
              </template>
            </template>
            <template v-if="isTest && oneC">
              <a>
                <div class="modal_container" @click="sync1C()">
                  Синхронизировать остатки с 1C
                </div>
              </a>
            </template>
          </div>
        </transition>
      </template>
    </div>
    <div class="ref">
      <button
        class="settings_btn"
        :class="{ settings_btn_rotate: show_settings }"
        @click="open_close_settings()"
        title="Настройки"
      >
        <span class="material-icons"> settings </span>
      </button>
      <template v-if="show_settings">
        <div class="backdrop" @click="close_settings()" />
        <transition name="modal">
          <div class="modal_settings" @click="close_settings()">
            <a>
              <div class="modal_container" @click="open_edit_stuff()">
                Общие настройки
              </div>
            </a>
            <a>
              <div class="modal_container" @click="open_product_category()">
                Категории товаров
              </div>
            </a>

            <a>
              <div class="modal_container" @click="open_product_properties()">
                Свойства товаров
              </div>
            </a>
            <a v-if="!oneC && isColored">
              <div class="modal_container" @click="openSyncSettings()">
                Настройки синхронизации товаров
              </div>
            </a>
            <a>
              <div
                class="modal_container"
                @click="open_close_document_setting(true)"
              >
                Документы
              </div>
            </a>
            <a v-if="isColored">
              <div
                class="modal_container"
                @click="openThirdPpartyIntegrations()"
              >
                Интеграции
              </div>
            </a>
            <a v-if="isTest">
              <div class="modal_container" @click="openAccountSattings()">
                Настройки аккаунта
              </div>
            </a>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
import TaskCenter from "@/components/TaskCenter.vue";
import { computed, ref } from "@vue/runtime-core";
import store from "@/store";
import { useNotification } from "@/composables/notification";
export default {
  components: {
    TaskCenter,
  },
  setup() {
    const { addNotification } = useNotification();

    const showTaskCenter = computed(() => store.state.shows.showTaskCenter);
    const show_sync = computed(() => store.state.shows.show_sync);
    const show_settings = computed(() => store.state.shows.show_settings);
    const oneC = computed(() => store.state.account.account?.config?.g_enabled);
    const account = computed(() => store.state.account.account);
    const isTest = computed(() => store.state.account?.account?.id == 1);
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
        addNotification(3, "Ошибка", res.error);
      } else {
        store.commit("openCloseImportStuff", true);
      }
      closeImportXlsl();
    };

    const openTaskCenter = () => store.commit("openCloseTaskCenter", true);
    const closeTaskCenter = () => store.commit("openCloseTaskCenter", false);
    const open_close_sync = () => store.commit("open_close_sync");
    const syncAmoGs = () => store.dispatch("syncAmoGs");
    const syncGsAmo = () => store.dispatch("syncGsAmo");
    const sync1C = () => store.dispatch("sync1C");
    const open_close_settings = () => store.commit("open_close_settings");
    const close_settings = () => store.commit("close_settings");
    const open_edit_stuff = () => store.commit("open_close_edit_stuff", true);
    const open_product_category = () =>
      store.commit("open_close_product_category", true);
    const openThirdPpartyIntegrations = () =>
      store.commit("openCloseThirdPpartyIntegrations", true);
    const openAccountSattings = () =>
      store.commit("openCloseAccountSattings", true);
    const openSyncSettings = () => store.commit("openCloseSyncSettings", true);
    const open_product_properties = () =>
      store.commit("open_close_product_properties", true);
    const open_close_document_setting = (val) =>
      store.commit("open_close_document_setting", val);

    return {
      showTaskCenter,
      show_sync,
      oneC,
      is_empty_amo_product_list,
      isTest,
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
      openSyncSettings,
      open_product_properties,
      open_close_document_setting,
      getFile,
      showImportXlsx,
      openImportXlsl,
      closeImportXlsl,
      isColored,
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
      overflow: hidden;
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
