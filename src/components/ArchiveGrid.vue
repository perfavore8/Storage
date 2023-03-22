<template>
  <div class="grid" :class="{ blur: isDataLoading }">
    <label v-if="archive_list.length == 0" class="text">
      Ничего не найдено
    </label>
    <template v-else>
      <table class="table2 hidden md:table">
        <thead>
          <tr class="row title">
            <td
              v-for="item in tableConfig"
              :key="item[0]"
              v-show="item[1].visible"
              class="item dark:bg-slate-800"
            >
              {{ item[1].name }}
            </td>
            <td class="item dark:bg-slate-800"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in archive_list" :key="item.id" class="row">
            <template v-for="field in tableConfig" :key="field">
              <template v-if="field[1].visible">
                <td class="item dark:bg-slate-700">
                  <span v-if="field[0].split('.').length < 2">
                    {{ item.fields[field[0]] }}
                  </span>
                  <span v-else>
                    <template v-if="item.fields[field[0].split('.')[0]]">
                      {{
                        field[0].split(".")[1] == "cost"
                          ? item.fields[field[0].split(".")[0]][
                              field[0].split(".")[1]
                            ] +
                            " " +
                            item.fields[field[0].split(".")[0]].currency
                          : item.fields[field[0].split(".")[0]][
                              field[0].split(".")[1]
                            ]
                      }}
                    </template>
                  </span>
                </td>
              </template>
            </template>
            <td class="item dark:bg-slate-700">
              <div
                class="edit_icon"
                @click="unarchive_data(item)"
                title="Разархивирование товара"
              >
                <span class="material-icons"> ios_share </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="md:hidden mx-auto grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2">
        <template v-for="i in 10" :key="i">
          <div
            v-for="item in archive_list"
            :key="item.id"
            class="container px-5 py-3 max-w-xs rounded-xl bg-gray-50 dark:bg-slate-800 dark:text-slate-100 shadow-md flex flex-col items-center gap-y-3 relative"
          >
            <div
              class="edit_icon absolute right-3 top-3"
              @click="unarchive_data(item)"
            >
              <span
                class="material-icons dark:text-slate-300"
                style="font-size: 18px"
              >
                ios_share
              </span>
            </div>
            <div class="flex flex-row gap-4">
              <h6 class="font-bold">{{ item.fields.article }}</h6>
              <span>№ {{ item.fields.batch }}</span>
            </div>
            <div class="text-sm">
              <span>{{ item.fields.name }}</span>
            </div>
          </div>
        </template>
      </div>
    </template>
    <grid-bottom
      class="bottom"
      :page="page"
      :blur="show_edit_modal"
      :show="products?.length != 0"
      :count="count"
      v-if="showGridBottom"
      @changePage="changePage"
      @changeCount="changeCount"
    />
  </div>
</template>

<script>
import GridBottom from "@/components/GridBottom.vue";
export default {
  components: {
    GridBottom,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  async mounted() {
    this.$store.commit("toggleIsNavBarDisabled", true);
    this.$store.dispatch("get_account");
    this.$store.dispatch("get_products", { is_archive: 1 });
    await this.$store.dispatch("getTableConfig", "");
    this.$store.dispatch("get_all_fields");
    this.$store.commit("toggleIsNavBarDisabled", false);
  },
  computed: {
    tableConfig() {
      return Object.entries(this.$store.state.account.tableConfig);
    },
    meta() {
      return this.$store.state.products.meta;
    },
    all_fields() {
      return this.$store.state.fields.all_fields;
    },
    archive_list() {
      return this.$store.state.products.products;
    },
    showGridBottom() {
      return this.meta.meta.total >= this.meta.meta.per_page;
    },
    isDataLoading() {
      return this.$store.state.products.isLoading;
    },
    page() {
      const obj = {
        first: this.getPageFromLink(this.meta?.links?.first),
        prev: this.getPageFromLink(this.meta?.links?.prev),
        current: this.meta?.meta?.current_page,
        next: this.getPageFromLink(this.meta?.links?.next),
        last: this.getPageFromLink(this.meta?.links?.last),
      };
      return obj;
    },
  },
  watch: {},
  methods: {
    getPageFromLink(link) {
      if (link) {
        return link.split("?page=")[1];
      } else {
        return null;
      }
    },
    async changeCount(count) {
      await this.$store.dispatch("update_user", { per_page: count });
      this.drop_page();
    },
    drop_page() {
      this.changePage(1);
    },
    changePage(val) {
      this.$store.dispatch("get_products", { is_archive: 1, page: val });
    },
    async unarchive_data(item) {
      if (!this.isLoading) {
        this.isLoading = true;
        const res = {
          products: [
            {
              id: item.id,
              fields: item.fields,
              is_archive: 0,
            },
          ],
        };
        await this.$store.dispatch("update_product", res);
        await this.$store.dispatch("get_products", { is_archive: 1 });
        this.isLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.table2 {
  border: 1px solid #c9c9c9;
  border-collapse: collapse;
  border-radius: 20px;
  width: 100%;
  @include font(400, 16px);
  .title {
    @include font(500, 16px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    .item {
      padding-bottom: 20px !important;
      text-align: center !important;
    }
  }
  .row:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .row {
    .item {
      padding: 10px;
      border: 1px solid #c9c9c9;
      // border-top: 2px solid #c9c9c9;
      text-align: left;

      @apply dark:text-white dark:border-gray-600 dark:border-2;
    }
  }
}
.edit_icon {
  width: 20px;
  height: 20px;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #757575;

  @apply dark:text-slate-400;
  // @include bg_image("@/assets/export.svg");
  // transform: rotate(180deg);
}
.count {
  margin-top: 20px;
  margin-left: 5px;
  margin-bottom: 150px;
  height: 26px;
  width: 100px;
}
.text {
  margin: 0 auto;
  @include font(500, 18px);
}
.blur {
  filter: blur(5px);
}
</style>
