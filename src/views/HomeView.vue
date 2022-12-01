<template>
  <div
    class="app"
    :class="{
      disabled: disabled_for_modals,
    }"
    @click="
      show_settings ? close_settings() : null;
      show_sync ? close_sync() : null;
    "
  >
    <div v-if="show_table_settings" class="table_setings">
      <table-settings :selectedWH="selectedWH" />
    </div>
    <transition name="modal_window">
      <div v-if="show_edit_stuff" class="edit_staff">
        <edit-stuff />
      </div>
    </transition>
    <transition name="modal_window">
      <div v-if="show_product_category" class="product_category">
        <product-category />
      </div>
    </transition>
    <transition name="modal_window">
      <div v-if="showThirdPpartyIntegrations" class="thirdPpartyIntegrations">
        <ThirdPpartyIntegrations />
      </div>
    </transition>
    <transition name="modal_window">
      <div v-if="show_product_properties" class="product_properties">
        <product-properties />
      </div>
    </transition>
    <transition name="modal_window">
      <div v-if="show_new_position" class="new_position">
        <new-position :currentItems="currentItems" @close="dropCurrentItems" />
      </div>
    </transition>
    <transition name="modal_window">
      <div v-if="show_cancel_position" class="cancel_position">
        <cancel-position />
      </div>
    </transition>
    <transition name="modal_window">
      <div v-if="show_document_setting" class="document_setting">
        <document-setting @close="open_close_show_document_setting" />
      </div>
    </transition>
    <div
      class="header"
      :class="{
        blur: disabled_for_modals,
      }"
    >
      <div class="header_left">
        <div class="btns">
          <button
            class="btns_btn"
            :class="{ selected_catalog: $route.name === page.value }"
            @click="route(page.value)"
            v-for="page in catalog"
            :key="page"
          >
            {{ page.name }}
          </button>
        </div>
        <div class="whs">
          <SelectorVue
            :options_props="whs"
            :selected_option="selectedWH"
            @select="selectWH"
          />
        </div>
      </div>
      <div class="header_right">
        <!-- <div class="ref">
          <div class="ref_1_logo"></div>
          <a class="links">Выгрузка в эксель</a>
        </div> -->
        <div class="ref">
          <div class="ref_2_logo"></div>
          <a class="links" @click.stop="open_close_sync()">
            Синхронизировать товары
          </a>
          <transition name="modal">
            <div v-if="show_sync" class="modal_settings modal_sync">
              <a>
                <div class="modal_container">AmoCrm -> Склад</div>
              </a>
              <a>
                <div class="modal_container">Склад -> AmoCrm</div>
              </a>
            </div>
          </transition>
        </div>
        <button class="settings_btn" @click.stop="open_close_settings()">
          <transition name="modal">
            <div v-show="show_settings" class="modal_settings">
              <a>
                <div class="modal_container" @click="open_edit_stuff()">
                  Настройка товаров
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
                  @click="openThirdPpartyIntegrations()"
                >
                  Сторонние интеграции
                </div>
              </a>
              <a>
                <div class="modal_container" @click="open_product_properties()">
                  Свойства товаров
                </div>
              </a>
              <a>
                <div class="modal_container">
                  Синхронизация склада с товарами amoCrm
                </div>
              </a>
              <a>
                <div
                  class="modal_container"
                  @click="open_close_show_document_setting(true)"
                >
                  Документы
                </div>
              </a>
            </div>
          </transition>
        </button>
      </div>
    </div>
    <div
      class="wrapper"
      :class="{
        blur:
          show_table_settings ||
          show_edit_stuff ||
          show_new_position ||
          show_cancel_position ||
          show_product_category ||
          show_product_properties ||
          show_document_setting,
      }"
    >
      <div class="filters" :class="{ blur: show_edit_modal }">
        <div class="filters_left">
          <div class="date">
            <input
              type="date"
              id="start"
              name="trip-start"
              value="2018-07-22"
              min="2018-01-01"
              max="2032-12-31"
              aria-required="true"
              aria-invalid="false"
            />
            <div class="bot">
              <p>Найдено: {{ totalCountProducts }}</p>
              <template v-if="false">
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="grid"
                  id="grid"
                />
                <label for="grid"></label>
              </template>
            </div>
          </div>
          <transition name="btns">
            <div class="buttons" v-if="show_buttons && oneC">
              <button class="button button_1 smallBtn" @click="archive_data()">
                Архивировать
              </button>
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
                  @click="open_close_cancel_position(true)"
                >
                  Списать
                </button>
              </template>
            </div>
          </transition>
        </div>
        <div class="filters_right">
          <div class="btns" v-if="filter_value">
            <button class="btn">Применить</button>
            <button class="btn" @click="clearFilters()">Очистить</button>
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
            :disabled="isServicePage || oneC"
          >
            Новая позиция
          </button>
        </div>
      </div>
      <div class="grid">
        <main-grid ref="main" v-if="!grid" :selectedWH="selectedWH"></main-grid>
        <card-grid ref="card" v-if="grid" :selectedWH="selectedWH"></card-grid>
      </div>
    </div>
  </div>
</template>

<script>
import MainGrid from "@/components/MainGrid.vue";
import CardGrid from "@/components/CardGrid.vue";
import TableSettings from "@/components/TableSettings.vue";
import EditStuff from "@/components/EditStuff.vue";
import NewPosition from "@/components/NewPosition.vue";
import CancelPosition from "@/components/CancelPosition";
import DocumentSetting from "@/components/DocumentSetting.vue";
import ProductCategory from "@/components/ProductCategory.vue";
import ProductProperties from "@/components/ProductProperties.vue";
import ThirdPpartyIntegrations from "@/components/ThirdPpartyIntegrations.vue";
import SelectorVue from "@/components/SelectorVue.vue";
import { mapGetters } from "vuex";
import { computed } from "vue";

export default {
  components: {
    MainGrid,
    TableSettings,
    EditStuff,
    NewPosition,
    CancelPosition,
    CardGrid,
    DocumentSetting,
    ProductCategory,
    ProductProperties,
    ThirdPpartyIntegrations,
    SelectorVue,
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
      grid: false,
      currentItems: [],
    };
  },
  computed: {
    show_modals() {
      return this.show_settings || this.disabled_for_modals;
    },
    disabled_for_modals() {
      return (
        this.show_edit_modal ||
        this.show_table_settings ||
        this.show_edit_stuff ||
        this.show_product_category ||
        this.show_product_properties ||
        this.show_new_position ||
        this.show_cancel_position ||
        this.show_document_setting
      );
    },
    isServicePage() {
      return this.selectedWH.value === "services";
    },
    ...mapGetters([
      "catalog",
      "show_edit_modal",
      "show_settings",
      "show_table_settings",
      "show_buttons",
      "show_filter",
      "show_edit_stuff",
      "show_sync",
      "show_new_position",
      "show_cancel_position",
      "show_document_setting",
      "show_product_category",
      "show_product_properties",
      "showThirdPpartyIntegrations",
    ]),
    totalCountProducts() {
      return this.$store.state.products.meta.meta.total;
    },
    oneC() {
      return this.$store.state.account.account?.config?.g_enabled;
    },
    ref_main() {
      return this.$refs.main;
    },
    ref_card() {
      return this.$refs.card;
    },
  },
  async mounted() {
    await this.$store.dispatch("get_account");
    this.getWHS();
  },
  watch: {
    filter_value() {
      this.$store.commit("open_close_filter", this.filter_value);
    },
    show_modals() {
      this.show_modals
        ? (window.scrollBy(-99999, -99999),
          (document.body.style.overflowX = "hidden"))
        : (document.body.style.overflowX = "auto");
    },
    selected_storage() {
      this.grid ? this.ref_card.drop_page() : this.ref_main.drop_page();
    },
  },
  methods: {
    clearFilters() {
      this.ref_main?.clearFilters();
    },
    getWHS() {
      this.$store.state.account.account.whs.forEach((val) =>
        this.whs.push({ name: val.name, value: val.code })
      );
      this.whs.push({ name: "Услуги", value: "services" });
    },
    selectWH(value) {
      this.selectedWH = value;
    },
    archive_data() {
      this.ref_main?.selectedProducts
        .filter((val) => val.value)
        ?.forEach((val) => {
          val.item.is_archive = 1;
          this.$store.dispatch("update_product", val.item);
        });
      this.ref_main?.changePage(
        this.$store.state.products.meta.meta.current_page
      );
    },
    addCurrentProducts() {
      this.open_close_new_position(true);
      this.currentItems = [
        ...this.ref_main?.selectedProducts
          .filter((val) => val.value)
          .map((val) => val.item),
      ];
    },
    dropCurrentItems() {
      this.currentItems = [];
    },
    open_close_new_position(value) {
      this.$store.commit("open_close_new_position", value);
    },
    open_close_cancel_position(value) {
      this.$store.commit("open_close_cancel_position", value);
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
    open_edit_stuff() {
      this.$store.commit("open_close_show_edit_stuff", true);
    },
    open_product_category() {
      this.$store.commit("open_close_product_category", true);
    },
    openThirdPpartyIntegrations() {
      this.$store.commit("openCloseThirdPpartyIntegrations", true);
    },
    open_product_properties() {
      this.$store.commit("open_close_show_product_properties", true);
    },
    open_close_show_document_setting(val) {
      this.$store.commit("open_close_show_document_setting", val);
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
  width: calc(100vw - 80px);
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
  flex-direction: row;
  justify-content: space-between;
  &_left {
    .btns {
      display: flex;
      flex-direction: row;
      gap: 12px;
      flex-wrap: wrap;
      .btns_btn {
        height: 40px;
        padding: 9px;
        cursor: pointer;
        text-align: center;
        vertical-align: center;
        box-sizing: border-box;
        border: 1px solid #1b3546;
        border-radius: 4px;
        color: #1b3546;
        background: white;

        transition: all 0.15s ease-out;
        @include font(400, 18px, 22px);
      }
      .btns_btn:hover {
        border-color: #396f93;
        color: #396f93;
      }
      .selected_catalog {
        transition: all 0.15s ease-out;
        background: #1b3546;
        color: white;
      }
      .selected_catalog:hover {
        color: hsl(204, 44%, 95%);
      }
    }
    .whs {
      margin-top: 14px;
    }
  }

  &_right {
    display: flex;
    flex-direction: row;
    gap: 25px;
    .ref {
      display: flex;
      flex-direction: row;
      align-items: center;
      max-height: 18px;
      gap: 8px;
      .ref_1_logo {
        width: 18px;
        height: 18px;
        @include bg_image("../assets/export.svg");
        transform: rotate(180deg);
      }
      .ref_2_logo {
        width: 18px;
        height: 18px;
        @include bg_image("../assets/sync.svg");
      }
    }
    .links {
      cursor: pointer;
      text-decoration-line: underline;
      @include font(400, 18px, 30px);
    }
    .settings_btn {
      cursor: pointer;
      width: 18px;
      height: 18px;
      border: none;
      background-color: transparent;
      outline: none;
      @include bg_image("../assets/gear.svg");
    }
    .modal_sync {
      position: absolute !important;
      top: 41px;
      right: 72px;
      width: 237px !important;
      margin: 0 !important;
    }
    .modal_settings {
      z-index: 99999;
      display: flex;
      align-items: center;
      position: sticky;
      float: right;
      margin: 20px 10px 0 0;
      flex-direction: column;
      width: 358px;
      border: 1px solid #c9c9c9;
      border-radius: 4px;
      background: white;
      overflow: hidden;
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
      height: 30px;
      cursor: pointer;
      padding: 5px 15px;
      @include font(400, 16px, 22px);
    }
  }
}
.wrapper {
  .filters {
    display: flex;
    flex-direction: row;
    margin-top: 60px;
    justify-content: space-between;
    &_left {
      display: flex;
      flex-direction: row;
      gap: 20px;
      .date {
        display: flex;
        flex-direction: column;
        gap: 19px;

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
          }
          .checkbox + label::before {
            content: "";
            display: inline-block;
            width: 28px;
            height: 28px;
            flex-shrink: 0;
            flex-grow: 0;
            border-radius: 0.25em;
            margin-left: 17px;
            @include bg_image("@/assets/grid.svg", 100%);
            cursor: pointer;
            transition: background-image 0.15s ease-out;
          }
          .checkbox:checked + label::before {
            @include bg_image("@/assets/list.svg", 90%);
          }
          .checkbox:not(:checked) + label:hover::before {
            background-size: 110%;
          }
          .checkbox:checked + label:hover::before {
            background-size: 100%;
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
      display: flex;
      flex-direction: row;
      gap: 18px;
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
.disabled {
  pointer-events: none;
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
.modal_window-enter-active,
.modal_window-leave-active {
  transition: opacity 0.2s ease-in-out;
  z-index: 999;
}
.modal_window-enter-from,
.modal_window-leave-to {
  opacity: 0;
}
</style>
