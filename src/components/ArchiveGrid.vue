<template>
  <label v-if="archive_list.length == 0" class="text">
    Ничего не найдено
  </label>
  <table class="table" v-else>
    <thead>
      <tr class="row title">
        <td
          v-for="item in all_fields"
          :key="item.id"
          v-show="item?.table_config.visible"
          class="item"
        >
          {{ item.name }}
        </td>
        <td class="item"></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in archive_list" :key="item.id" class="row">
        <td
          v-for="field in all_fields"
          v-show="field?.table_config.visible"
          :key="field"
          class="item"
        >
          {{ item.fields[field.code] }}
        </td>
        <td class="item">
          <div class="edit_icon" @click="unarchive_data(item)"></div>
        </td>
      </tr>
    </tbody>
  </table>
  <grid-bottom
    :previous="meta.links.prev != null"
    :next="meta.links.next != null"
    :page="meta.meta.current_page"
    :show="archive_list.length != 0"
    :count="meta.meta.per_page"
    @changePage="changePage"
    @changeCount="changeCount"
  />
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
    meta() {
      return this.$store.state.products.meta;
    },
    all_fields() {
      return this.$store.state.fields.all_fields;
    },
    archive_list() {
      return this.$store.state.products.products;
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
          id: item.id,
          fields: item.fields,
          is_archive: 0,
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
  @include bg_image("@/assets/export.svg");
  transform: rotate(180deg);
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
