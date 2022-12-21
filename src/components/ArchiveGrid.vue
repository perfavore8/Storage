<template>
  <div class="grid">
    <label v-if="archive_list.length == 0" class="text">
      Ничего не найдено
    </label>
    <table class="table" v-else>
      <thead>
        <tr class="row title">
          <td
            v-for="item in tableConfig"
            :key="item[0]"
            v-show="item[1].visible"
            class="item"
          >
            {{ item[1].name }}
          </td>
          <td class="item"></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in archive_list" :key="item.id" class="row">
          <template v-for="field in tableConfig" :key="field">
            <template v-if="field[1].visible">
              <td class="item">
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
          <td class="item">
            <div class="edit_icon" @click="unarchive_data(item)">
              <span class="material-icons"> ios_share </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <grid-bottom
      class="bottom"
      :previous="meta.links.prev != null"
      :next="meta.links.next != null"
      :page="meta.meta.current_page"
      :show="archive_list.length != 0"
      :count="meta.meta.per_page"
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
    this.$store.dispatch("get_account");
    this.$store.dispatch("get_products", { is_archive: 1 });
    await this.$store.dispatch("getTableConfig", "");
    this.$store.dispatch("get_all_fields");
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
      console.log(this.meta);
      return this.meta.meta.total >= this.meta.meta.per_page;
    },
  },
  watch: {},
  methods: {
    changeCount(val) {
      this.count = val;
    },
    changePage(val) {
      this.page = val;
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
.table {
  border: 1px solid #c9c9c9;
  border-collapse: collapse;
  width: 100%;
  @include font(400, 16px);
  .title {
    @include font(500, 16px);
    background-color: rgba(0, 0, 0, 0.15) !important;
    .item {
      padding-bottom: 20px !important;
    }
  }
  .row:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .row {
    .item {
      padding: 10px;
      border: 1px solid #c9c9c9;
      border-top: 2px solid #c9c9c9;
      text-align: left;
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
</style>
