<template>
  <div
    class="app"
    :class="{
      disabled:
        disabled_for_modals ||
        (account?.is_old_data_load_start && !account?.is_old_data_loaded),
    }"
  >
    <HomeModals
      :selectedWH="selectedWH"
      :currentItems="currentItems"
      @updateProducts="updateProducts"
    />
    <div
      class="header"
      :class="{
        blur: disabled_for_modals,
      }"
    >
      <div class="header_left">
        <div class="header_row">
          <NavBar />
          <HomeImportOldData ref="oldData" @importComplete="importComplete" />
        </div>
        <div class="whs">
          <div
            class="radio_btns"
            :class="{ whs_full: whsFull }"
            ref="radio_btns"
          >
            <div class="radio_btn" v-for="page in whs" :key="page">
              <input
                type="radio"
                :value="page.value"
                :id="page.name"
                name="selected_storage"
                :checked="selectedWH.value == page.value"
                @change="selectWH(page)"
              />
              <label :for="page.name">{{ page.name }}</label>
            </div>
          </div>
          <button
            @click="whsFull = !whsFull"
            class="arrow btn"
            :class="{ rotate_arrow: whsFull }"
            v-if="showWhsArrow"
          >
            <span class="material-icons-outlined"> expand_more </span>
          </button>
        </div>
      </div>
      <div class="header_right">
        <div class="ref">
          <button
            class="ref_2_logo btn"
            @click.stop="openTaskCenter()"
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

        <div class="ref" v-if="!oneC && !is_empty_amo_product_list">
          <button
            class="ref_2_logo btn"
            @click.stop="open_close_sync()"
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
          @click.stop="open_close_settings()"
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
                  <div
                    class="modal_container"
                    @click="open_product_properties()"
                  >
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
    </div>
    <div
      class="wrapper"
      :class="{
        blur: home_blur,
      }"
    >
      <div class="filters" :class="{ blur: show_edit_modal }">
        <div class="filters_left">
          <div class="date">
            <input
              type="date"
              id="start"
              name="trip-start"
              :value="date"
              min="2000-01-01"
              max="2032-12-31"
              aria-required="true"
              aria-invalid="false"
            />
            <div class="bot">
              <p>Найдено: {{ totalCountProducts }}</p>
              <template v-if="isTest">
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="isGrid"
                  id="grid"
                />
                <label for="grid">
                  <transition name="modal" mode="out-in">
                    <span class="material-icons-round icon" v-if="isGrid">
                      format_list_bulleted
                    </span>
                    <span class="material-icons-round icon" v-else>
                      grid_view
                    </span>
                  </transition>
                </label>
              </template>
            </div>
          </div>
          <transition name="btns">
            <div class="buttons" v-if="show_buttons && !oneC">
              <template v-if="!isServicePage">
                <button
                  class="button button_2 smallBtn"
                  @click="addCurrentProducts()"
                  :disabled="oneC"
                >
                  Добавить
                </button>
                <button
                  class="button button_3 smallBtn"
                  @click="openCancelPosition()"
                >
                  Списать
                </button>
              </template>
              <template v-if="isTest">
                <button
                  class="button button_5 smallBtn"
                  @click="openMoveProductsBetweenWhs()"
                >
                  Перемещение
                </button>
              </template>
              <button class="button button_1 smallBtn" @click="archive_data()">
                Архивировать
              </button>
            </div>
          </transition>
        </div>
        <div class="filters_right">
          <div class="btns" v-if="filter_value">
            <button class="btn btn_blue" @click="confirmFilters()">
              Применить
            </button>
            <button class="btn btn_grey" @click="clearFilters()">
              Очистить
            </button>
          </div>
          <div class="filter_group">
            <input
              type="checkbox"
              v-model="filter_value"
              name="filter"
              id="filter"
              class="checkbox"
            />
            <label for="filter">Фильтр</label>
          </div>
          <button
            class="button button_4 smallBtn"
            @click="open_close_new_position(true)"
            v-if="!oneC"
          >
            Новая позиция
          </button>
          <button
            class="sync_icon btn"
            :disabled="isUpdateProducts"
            @click="updateProducts()"
            title="Обновить список"
          >
            <span class="material-icons-outlined"> sync </span>
          </button>
          <button
            class="table_settings_btn"
            v-if="isGrid"
            @click="openTableSettings()"
            title="Настройка таблицы"
          >
            <span class="material-icons"> settings </span>
          </button>
        </div>
      </div>
      <div class="grid">
        <main-grid ref="main" v-if="!isGrid" :selectedWH="selectedWH" />
        <card-grid ref="card" v-else :selectedWH="selectedWH" />
      </div>
    </div>
  </div>
</template>

<script>
import MainGrid from "@/components/MainGrid.vue";
import CardGrid from "@/components/CardGrid.vue";
import TaskCenter from "@/components/TaskCenter.vue";
import HomeModals from "@/components/HomeModals.vue";
import NavBar from "@/components/NavBar.vue";
import HomeImportOldData from "@/components/HomeImportOldData.vue";
// import SelectorVue from "@/components/SelectorVue.vue";
import { mapGetters } from "vuex";
import { computed, nextTick } from "vue";

export default {
  components: {
    MainGrid,
    CardGrid,
    TaskCenter,
    HomeModals,
    NavBar,
    HomeImportOldData,
    // SelectorVue,
  },
  provide() {
    return {
      isServicePage: computed(() => this.isServicePage),
    };
  },
  data() {
    return {
      filter_value: false,
      paginatedData: [],
      paginatedParams: [],
      selectedWH: { name: "Все склады", value: "whs" },
      whs: [],
      isGrid: false,
      currentItems: [],
      whsFull: true,
      showWhsArrow: true,
      isUpdateProducts: false,
    };
  },
  computed: {
    date() {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;

      const today = year + "-" + month + "-" + day;
      return today;
    },
    isServicePage() {
      return this.selectedWH.value === "services";
    },
    ...mapGetters([
      "home_blur",
      "show_modals",
      "disabled_for_modals",
      "catalog",
      "show_edit_modal",
      "show_settings",
      "show_buttons",
      "show_sync",
      "showTaskCenter",
    ]),
    totalCountProducts() {
      return this.$store.state.products.meta.meta.total;
    },
    oneC() {
      return this.$store.state.account.account?.config?.g_enabled;
    },
    account() {
      return this.$store.state.account.account;
    },
    ref_main() {
      return this.$refs.main;
    },
    ref_card() {
      return this.$refs.card;
    },
    refRadioBtns() {
      return this.$refs.radio_btns;
    },
    storeWhs() {
      return this.$store.state.account.account.whs;
    },
    isTest() {
      return this.$store.state.account?.account?.id == 1;
    },
    is_empty_amo_product_list() {
      return (
        !this.account?.config?.amo_product_list ||
        this.account?.config?.amo_product_list == "-1"
      );
    },
    filteredSelectedProducts() {
      let arr = [];
      this.isGrid
        ? (arr = [
            ...this.ref_card?.selectedProducts.filter((val) => val.value),
          ])
        : (arr = [
            ...this.ref_main?.selectedProducts.filter((val) => val.value),
          ]);
      return arr;
    },
  },
  async mounted() {
    await this.$store.dispatch("get_account");
    this.getWHS();
    this.setShowWhsArrow();
    this.$refs?.oldData?.importOldData("start");
  },
  watch: {
    storeWhs() {
      this.getWHS();
      this.setShowWhsArrow();
    },
    filter_value() {
      this.$store.commit("open_close_filter", this.filter_value);
    },
    show_modals() {
      this.show_modals
        ? (window.scrollTo(0, 0), (document.body.style.overflowX = "hidden"))
        : (document.body.style.overflowX = "auto");
    },
    selected_storage() {
      this.$store.commit("updateIsLoading", true);
      this.isGrid ? this.ref_card.drop_page() : this.ref_main.drop_page();
    },
  },
  methods: {
    confirmFilters() {
      this.isGrid
        ? this.ref_card?.confirmFilters()
        : this.ref_main?.confirmFilters();
    },
    clearFilters() {
      this.isGrid
        ? this.ref_card?.clearFilters()
        : this.ref_main?.clearFilters();
    },
    setShowWhsArrow() {
      nextTick(() => {
        this.showWhsArrow =
          this.refRadioBtns?.getBoundingClientRect().height > 30;
        this.showWhsArrow ? null : (this.whsFull = false);
      });
    },
    getWHS() {
      this.whs = [];
      this.$store.state.account.account.whs.forEach((val) =>
        this.whs.push({ name: val.name, value: val.code })
      );
      this.whs.push({ name: "Услуги", value: "services" });
    },
    selectWH(value) {
      this.selectedWH = value;
    },
    importComplete() {
      this.getWHS();
      this.clearFilters();
      this.updateProducts();
    },
    async archive_data() {
      const params = {
        products: [],
      };
      this.filteredSelectedProducts?.forEach((val) => {
        val.item.is_archive = 1; // может быть не работает
        params.products.push(val.item);
      });
      await this.$store.dispatch("update_product", params);
      const currentPage = this.$store.state.products.meta.meta.current_page;
      this.isGrid
        ? this.ref_card?.changePage(currentPage)
        : this.ref_main?.changePage(currentPage);
    },
    setCurrentItems() {
      const arr = JSON.parse(JSON.stringify(this.filteredSelectedProducts));
      this.currentItems = [...arr.map((val) => val.item)];
    },
    addCurrentProducts() {
      this.setCurrentItems();
      this.open_close_new_position(true);
    },
    openCancelPosition() {
      this.setCurrentItems();
      this.open_close_cancel_position(true);
    },
    openMoveProductsBetweenWhs() {
      this.setCurrentItems();
      this.openCloseMoveProductsBetweenWhs(true);
    },
    dropCurrentItems() {
      this.currentItems = [];
    },
    syncAmoGs() {
      this.$store.dispatch("syncAmoGs");
    },
    syncGsAmo() {
      this.$store.dispatch("syncGsAmo");
    },
    open_close_new_position(value) {
      this.$store.commit("open_close_new_position", value);
    },
    open_close_cancel_position(value) {
      this.$store.commit("open_close_cancel_position", value);
    },
    openCloseMoveProductsBetweenWhs(value) {
      this.$store.commit("openCloseMoveProductsBetweenWhs", value);
    },
    open_close_settings() {
      this.$store.commit("open_close_settings");
    },
    close_settings() {
      this.$store.commit("close_settings");
    },
    close_sync() {
      this.$store.commit("close_sync");
    },
    open_close_sync() {
      this.$store.commit("open_close_sync");
    },
    openTaskCenter() {
      this.$store.commit("openCloseTaskCenter", true);
    },
    closeTaskCenter() {
      this.$store.commit("openCloseTaskCenter", false);
    },
    open_edit_stuff() {
      this.$store.commit("open_close_show_edit_stuff", true);
    },
    openTableSettings() {
      this.$store.commit("open_table_settings");
    },
    open_product_category() {
      this.$store.commit("open_close_product_category", true);
    },
    openThirdPpartyIntegrations() {
      this.$store.commit("openCloseThirdPpartyIntegrations", true);
    },
    openSyncSettings() {
      this.$store.commit("openCloseSyncSettings", true);
    },
    open_product_properties() {
      this.$store.commit("open_close_product_properties", true);
    },
    open_close_document_setting(val) {
      this.$store.commit("open_close_document_setting", val);
    },
    updateProducts() {
      this.isUpdateProducts = true;
      setTimeout(() => {
        this.isUpdateProducts = false;
      }, 2250);
      if (this.isGrid) {
        this.ref_card?.changePage(
          this.$store.state.products.meta.meta.current_page
        );
        this.ref_card?.setSelectedProducts();
      } else {
        this.ref_main?.changePage(
          this.$store.state.products.meta.meta.current_page
        );
        this.ref_main?.setSelectedProducts();
      }
      this.dropCurrentItems();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  // width: calc(100vw - 80px);
  height: 100%;
  // padding: 0 30px;
  display: flex;
  flex-direction: column;
  user-select: none;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  padding: 0 30px;
  left: 0;
  width: calc(100vw - 80px);
  &_left {
    .header_row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .whs {
      margin-top: 24px;
      display: flex;
      flex-direction: row;
      gap: 20px;
      width: 100%;
      .arrow {
        margin-top: 1px;
        cursor: pointer;
        width: 32px;
        height: 24px;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease-in-out;
        > span {
          color: #757575;
          font-size: x-large;
        }
      }
      .rotate_arrow {
        transform: rotateX(180deg);
      }
    }
    .whs_full {
      height: 100% !important;
    }
    .radio_btns {
      height: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      gap: 16px;
      flex-wrap: wrap;
      width: 100%;
      .radio_btn {
        > input {
          display: none;
        }
        > label {
          display: inline-block;
          cursor: pointer;
          position: relative;
          padding-left: 25px;
          margin-right: 0;
          line-height: 18px;
          user-select: none;
          color: #3f3f3f;
          @include font(400, 16px);
        }
        > label:before {
          content: "";
          display: inline-block;
          width: 14px;
          height: 14px;
          position: absolute;
          left: 0;
          bottom: 5px;
          background: #ffffff;
          border: 1px solid #c9c9c9;
          border-radius: 50%;
          @include bg_image("../assets/Ellipse_2.svg", 0);
          transition: background-size 0.15s ease-in-out;
        }
        > input:checked + label:before {
          @include bg_image("../assets/Ellipse_2.svg", 40%);
        }
      }
    }
  }

  &_right {
    display: flex;
    flex-direction: row;
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
    }
    .links {
      cursor: pointer;
      text-decoration-line: underline;
      @include font(400, 18px, 30px);
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
}
.wrapper {
  .filters {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    justify-content: space-between;
    position: sticky;
    padding: 0 30px;
    left: 0;
    width: calc(100vw - 80px);
    &_left {
      display: flex;
      flex-direction: row;
      gap: 20px;
      .date {
        display: flex;
        flex-direction: column;
        gap: 19px;

        input::-webkit-datetime-edit-day-field,
        input::-webkit-datetime-edit-month-field,
        input::-webkit-datetime-edit-year-field {
          background: transparent;
          color: #3f3f3f;
        }
        input {
          position: relative;
          width: 112px;
          height: 34px;
          background: #c9c9c9;
          border-radius: 4px;
          border: none;
          color: #3f3f3f;
          outline: none;
          @include font(400, 16px, 19px);
        }
        input:focus {
          outline: 2px solid #3f3f3f6c;
        }
        input::-webkit-datetime-edit-fields-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          appearance: none;
        }
        .bot {
          display: flex;
          flex-direction: row;
          gap: 20px;
          .icon {
            color: #757575;
            font-size: 28px;
            font-weight: 600;
          }
          p {
            color: #757575;
            @include font(400, 16px, 19px);
          }
          .checkbox {
            position: absolute;
            z-index: -1;
            opacity: 0;
          }
          .checkbox + label {
            display: inline-flex;
            align-items: center;
            user-select: none;
            position: relative;
          }
          .checkbox + label::before {
            content: "";
            display: inline-block;
            width: 28px;
            height: 28px;
            flex-shrink: 0;
            flex-grow: 0;
            border-radius: 0.25em;
            position: absolute;
            border: none;

            // @include bg_image("@/assets/grid.svg", 100%);
            cursor: pointer;
            background: transparent !important;
          }
        }
      }
      .buttons {
        display: flex;
        flex-direction: row;
        gap: 18px;
      }
    }
    &_right {
      position: relative;
      display: flex;
      flex-direction: row;
      gap: 18px;
      .sync_icon {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 70px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: transparent;
        color: #757575;
        transform: scaleX(-1);
        transition: all 0.2s ease-out;
      }
      .sync_icon:hover {
        transform: rotateZ(90deg) scaleX(-1);
      }
      .sync_icon:disabled,
      .sync_icon:disabled:hover {
        @keyframes rotating {
          from {
            transform: rotate(0deg) scaleX(-1);
          }
          to {
            transform: rotate(360deg) scaleX(-1);
          }
        }
        animation: rotating 0.75s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      }
      .btns {
        display: flex;
        flex-direction: row;
        justify-self: end;
        .btn:first-child {
          background-color: #0d6efd;
          border-radius: 5px 0 0 5px;
        }
        .btn:first-child:hover {
          background-color: #0256d4;

          box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
        }
        .btn:last-child {
          background-color: #6c757d;
          border-radius: 0 5px 5px 0;
        }
        .btn:last-child:hover {
          background-color: #5f676d;
          box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
        }
      }

      .filter_group {
        display: flex;
        flex-direction: row;
        margin-top: 8px;
        max-height: 20px;

        .checkbox {
          position: absolute;
          z-index: -1;
          opacity: 0;
          margin: 10px 0 0 20px;
        }
        .checkbox + label {
          position: relative;
          padding: 0 0 0 63px;
          cursor: pointer;
          color: #3f3f3f;
          @include font(400, 16px, 19px);
        }
        .checkbox + label:before {
          content: "";
          position: absolute;
          top: -5px;
          left: 0;
          width: 54px;
          height: 23px;
          border-radius: 20px;
          background: #c4c4c4;
          transition: 0.15s ease-out;
        }
        .checkbox + label:after {
          content: "";
          position: absolute;
          top: -1px;
          left: 4px;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: #fff;
          transition: 0.15s ease-out;
        }
        .checkbox:checked + label:before {
          background: #757575;
        }
        .checkbox:checked + label:after {
          left: 35px;
        }
      }
    }
  }
}
.grid {
  margin-left: 30px;
}
.button {
  cursor: pointer;
  color: #ffffff;
  border-radius: 4px;
  border: none;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  @include font(400, 18px, 22px);
}
.smallBtn {
  @include font(400, 14px, 18px);
}
.button_1 {
  width: 112px;
  height: 34px;
  background: #6c757d;
}
.button_1:hover {
  background: #5f676d;
  box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
}
.button_2 {
  width: 112px;
  height: 34px;
  background: #1b3546f1;
}
.button_2:hover {
  background: #1b3546d9;
  box-shadow: 0 0 5px 2px rgb(27 53 70 / 25%);
}
.button_3 {
  width: 112px;
  height: 34px;
  background: #ea9197;
}
.button_3:hover {
  background: rgb(226, 101, 109);
  box-shadow: 0 0 5px 2px rgb(226 101 109 / 25%);
}
.button_4 {
  width: 124px !important;
  height: 34px;
  background: #4e964d;
}
.button_4:hover {
  background: rgb(105, 177, 104);
  box-shadow: 0 0 5px 2px rgb(105 177 104 / 25%);
}
.button_4:disabled {
  cursor: default;
  background: #4e964dad;
}
.button_4:disabled:hover {
  box-shadow: none;
}
.button_5 {
  width: 112px;
  height: 34px;
  color: #2a2a2a;
  background: #ffeab2;
}
.button_5:hover {
  color: #000;
  background: #ffd45c;
  box-shadow: 0 0 5px 2px rgb(255 212 92 / 50%);
}
.disabled {
  pointer-events: none;
}
.table_settings_btn {
  position: absolute;
  top: 69px;
  right: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border: none;
  background-color: transparent;
  color: #757575;
  outline: none;
  transition: all 0.15s ease-out;
}
.table_settings_btn:hover {
  transform: rotate(90deg) scale(1.1);
}
.blur {
  filter: blur(5px);
}
.overflow {
  overflow-x: hidden;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.btns-enter-active,
.btns-leave-active {
  transition: opacity 0.15s ease-out;
}
.btns-enter-from,
.btns-leave-to {
  opacity: 0;
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
  z-index: 50;
}
.tasks {
  position: absolute;
  top: 48px;
  right: 64px;
  width: fit-content;
}
</style>
