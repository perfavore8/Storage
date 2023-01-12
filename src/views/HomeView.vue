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
        <HomeWhs ref="homeWhs" v-model:selectedWH="selectedWH" />
      </div>
      <HomeMenu />
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
          <HomeBtns
            :isServicePage="isServicePage"
            @archive_data="archive_data"
            @setCurrentItems="setCurrentItems"
          />
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
import HomeModals from "@/components/HomeModals.vue";
import NavBar from "@/components/NavBar.vue";
import HomeImportOldData from "@/components/HomeImportOldData.vue";
import HomeWhs from "@/components/HomeWhs.vue";
import HomeMenu from "@/components/HomeMenu.vue";
import HomeBtns from "@/components/HomeBtns.vue";
// import SelectorVue from "@/components/SelectorVue.vue";
import { mapGetters } from "vuex";
import { computed } from "vue";

export default {
  components: {
    MainGrid,
    CardGrid,
    HomeModals,
    NavBar,
    HomeImportOldData,
    HomeWhs,
    HomeMenu,
    HomeBtns,
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
      isGrid: false,
      currentItems: [],
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
      "show_edit_modal",
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
    ref_homeWhs() {
      return this.$refs.homeWhs;
    },
    isTest() {
      return this.$store.state.account?.account?.id == 1;
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
    this.ref_homeWhs?.changeStoreWhs();
    this.$refs?.oldData?.importOldData("start");
  },
  watch: {
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
    importComplete() {
      this.ref_homeWhs?.changeStoreWhs();
      this.clearFilters();
      this.updateProducts();
    },
    async archive_data() {
      const params = {
        products: [],
      };
      this.filteredSelectedProducts?.forEach((val) => {
        val.item.is_archive = 1;
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
    dropCurrentItems() {
      this.currentItems = [];
    },
    open_close_new_position(value) {
      this.$store.commit("open_close_new_position", value);
    },
    openTableSettings() {
      this.$store.commit("open_table_settings");
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
</style>
