<template>
  <div class="menu">
    <div class="ref">
      <button
        class="ref_2_logo btn"
        @click="openTaskCenter()"
        title="Список задач"
      >
        <span class="material-icons"> splitscreen </span>
      </button>
      <transition name="modal">
        <teleport to="body">
          <div class="tasks">
            <TaskCenter @close="closeTaskCenter()" v-if="showTaskCenter" />
          </div>
        </teleport>
      </transition>
    </div>

    <div class="ref" v-if="isTest">
      <button
        class="ref_2_logo btn"
        @click="openImportXlsl()"
        title="Настройки импорта"
      >
        <transition name="modal">
          <span class="material-icons-round" v-if="showImportXlsx">
            upload_file
          </span>
          <span class="material-icons" v-else> upload_file </span>
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

    <div class="ref" v-if="!oneC && !is_empty_amo_product_list">
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
      <transition name="modal">
        <teleport to="body">
          <template v-if="show_sync">
            <div class="backdrop" @click="open_close_sync()" />
            <div
              class="modal_settings modal_sync"
              @click.stop="open_close_sync()"
            >
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
            </div>
          </template>
        </teleport>
      </transition>
    </div>
    <button
      class="settings_btn"
      :class="{ settings_btn_rotate: show_settings }"
      @click="open_close_settings()"
      title="Настройки"
    >
      <span class="material-icons"> settings </span>
    </button>
    <transition name="modal">
      <teleport to="body">
        <template v-if="show_settings">
          <div class="backdrop" @click="close_settings()" />
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
            <a v-if="!oneC">
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
            <a>
              <div
                class="modal_container"
                @click="openThirdPpartyIntegrations()"
              >
                Интеграции
              </div>
            </a>
            <a>
              <div class="modal_container">Настройки аккаунта</div>
            </a>
          </div>
        </template>
      </teleport>
    </transition>
  </div>
</template>

<script>
import TaskCenter from "@/components/TaskCenter.vue";
import { computed, ref } from "@vue/runtime-core";
import store from "@/store";
export default {
  components: {
    TaskCenter,
  },
  setup() {
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

    const showImportXlsx = ref(false);

    const openImportXlsl = () => (showImportXlsx.value = true);
    const closeImportXlsl = () => (showImportXlsx.value = false);
    const getFile = async (ev) => {
      const file = ev.target.files[0];
      const payload = new FormData();
      payload.append("file", file);
      payload.append("name", file.name);
      await store.dispatch("importStuff", payload);
      store.commit("openCloseImportStuff", true);
      closeImportXlsl();
    };

    const openTaskCenter = () => store.commit("openCloseTaskCenter", true);
    const closeTaskCenter = () => store.commit("openCloseTaskCenter", false);
    const open_close_sync = () => store.commit("open_close_sync");
    const syncAmoGs = () => store.dispatch("syncAmoGs");
    const syncGsAmo = () => store.dispatch("syncGsAmo");
    const open_close_settings = () => store.commit("open_close_settings");
    const close_settings = () => store.commit("close_settings");
    const open_edit_stuff = () => store.commit("open_close_edit_stuff", true);
    const open_product_category = () =>
      store.commit("open_close_product_category", true);
    const openThirdPpartyIntegrations = () =>
      store.commit("openCloseThirdPpartyIntegrations", true);
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
      open_close_settings,
      close_settings,
      open_edit_stuff,
      open_product_category,
      openThirdPpartyIntegrations,
      openSyncSettings,
      open_product_properties,
      open_close_document_setting,
      getFile,
      showImportXlsx,
      openImportXlsl,
      closeImportXlsl,
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
  .ref {
    display: flex;
    flex-direction: row;
    align-items: center;
    max-height: 18px;
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
      right: -40px;
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
}

.modal_sync {
  position: absolute !important;
  top: 44px !important;
  right: 82px !important;
  width: 400px !important;
  margin: 0 !important;
  z-index: 99999;
  a {
    padding-bottom: 0 !important;
  }
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
  top: 48px;
  right: 64px;
  a {
    display: flex;
    justify-content: center;
    width: 100%;
    transition: background-color 0.15s ease-in-out;
  }
  a:hover {
    background-color: #f5f5f5;
  }
}
.modal_settings:last-child {
  a {
    padding-bottom: 10px;
  }
}
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
.backdrop {
  background-color: transparent;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 800;
}
.tasks {
  position: absolute;
  top: 48px;
  right: 64px;
  width: fit-content;
}
</style>
