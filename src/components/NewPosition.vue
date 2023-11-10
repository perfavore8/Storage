<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container max-w-none">
      <div class="header">
        <label>{{ $t("ostatki.add") }}</label>
      </div>
      <div class="content">
        <div class="table_wrapper" ref="tableWrapper">
          <table class="table">
            <thead>
              <tr class="row title">
                <td
                  class="item"
                  v-for="(tit, idx) in title"
                  :key="tit"
                  :style="{
                    width: (100 / totalTitleWidth) * titleWidth[idx],
                  }"
                >
                  {{ tit }}
                </td>
                <td class="item"></td>
              </tr>
            </thead>
            <tbody>
              <transition-group name="row">
                <tr class="row" v-for="(row, idx) in new_items" :key="idx">
                  <td class="item">
                    <ImportStuffSelector
                      :options_props="options_type"
                      @select="
                        (option, idx) => option_select(option, idx, 'type')
                      "
                      @toggleShowOptions="toggleShowOptions"
                      :selected_option="row.type"
                      :idx="idx"
                      :disabled="!row.new"
                    />
                  </td>
                  <td
                    class="item"
                    :ref="
                      (el) =>
                        selected_field_autocomplete.idx == idx &&
                        selected_field_autocomplete.field == 'article'
                          ? (targetAutocomplete = el)
                          : null
                    "
                  >
                    <input
                      type="text"
                      v-model="row.article"
                      @focusin="
                        set_selected_field_autocomplete(
                          'article',
                          row.article,
                          idx
                        ),
                          toggleShowOptions(true)
                      "
                      @focusout="
                        set_selected_field_autocomplete('', '', idx),
                          toggleShowOptions(false)
                      "
                      @input="
                        set_selected_field_autocomplete(
                          'article',
                          row.article,
                          idx
                        )
                      "
                      class="input"
                      :class="{
                        not_valid:
                          (row.article === '' || row.article === undefined) &&
                          try_accept &&
                          row.new,
                      }"
                      :title="
                        (row.article === '' || row.article === undefined) &&
                        try_accept
                          ? t('ostatki.fieldE')
                          : null
                      "
                      :disabled="!row.new"
                    />
                  </td>
                  <td
                    class="item"
                    :ref="
                      (el) =>
                        selected_field_autocomplete.idx == idx &&
                        selected_field_autocomplete.field == 'name'
                          ? (targetAutocomplete = el)
                          : null
                    "
                  >
                    <input
                      type="text"
                      v-model="row.name"
                      @focusin="
                        set_selected_field_autocomplete('name', row.name, idx),
                          toggleShowOptions(true)
                      "
                      @focusout="
                        set_selected_field_autocomplete('', '', idx),
                          toggleShowOptions(false)
                      "
                      @input="
                        set_selected_field_autocomplete('name', row.name, idx)
                      "
                      class="input"
                      :class="{
                        not_valid:
                          (row.name === '' || row.name === undefined) &&
                          try_accept &&
                          row.new,
                      }"
                      :title="
                        (row.name === '' || row.name === undefined) &&
                        try_accept
                          ? t('ostatki.fieldE')
                          : null
                      "
                      :disabled="!row.new"
                    />
                  </td>
                  <td class="item">
                    <div class="select_input">
                      <ImportStuffSelector
                        :options_props="
                          row.new
                            ? batch_category_options
                            : row.batch_category_options
                        "
                        @select="
                          (option, idx) =>
                            option_select(option, idx, 'batch_category')
                        "
                        @toggleShowOptions="toggleShowOptions"
                        :selected_option="row.batch_category"
                        :idx="idx"
                        :disabled="row.type.value == 2"
                      />
                      <input
                        type="text"
                        v-model="row.batch"
                        class="input"
                        :class="{
                          not_valid:
                            (row.batch === '' || row.batch === undefined) &&
                            try_accept &&
                            row.type.value != 2 &&
                            false,
                        }"
                        :title="
                          (row.batch === '' || row.batch === undefined) &&
                          try_accept &&
                          row.type.value != 2
                            ? t('ostatki.fieldE')
                            : null
                        "
                        :disabled="
                          row.type.value == 2 || row.batch_category?.value != -1
                        "
                      />
                    </div>
                  </td>
                  <td class="item">
                    <ImportStuffSelector
                      :options_props="row.wh_options"
                      @select="
                        (option, idx) => option_select(option, idx, 'wh')
                      "
                      @toggleShowOptions="toggleShowOptions"
                      :selected_option="row.wh"
                      :idx="idx"
                      :disabled="row.type.value == 2"
                    />
                  </td>
                  <td class="item">
                    <input
                      type="number"
                      v-model="row.count"
                      class="input"
                      :disabled="row.type.value == 2"
                      min="0"
                      :class="{
                        not_valid:
                          (row.count === '' || row.count == undefined) &&
                          try_accept &&
                          row.type != 2,
                      }"
                      :title="
                        (row.count === '' || row.count == undefined) &&
                        try_accept
                          ? t('ostatki.fieldE')
                          : null
                      "
                    />
                  </td>
                  <td class="item">
                    <ImportStuffSelector
                      :options_props="units_options"
                      @select="
                        (option, idx) => option_select(option, idx, 'units')
                      "
                      @toggleShowOptions="toggleShowOptions"
                      :selected_option="row.units"
                      :idx="idx"
                      :disabled="
                        row.type.value == 2 || (!row.new && !row.newBatch)
                      "
                    />
                  </td>
                  <td class="item">
                    <input
                      type="number"
                      v-model="row.cost_price"
                      class="input"
                      min="0"
                      :class="{
                        not_valid:
                          (row.cost_price === '' ||
                            row.cost_price === undefined) &&
                          try_accept &&
                          (row.new || row.newBatch),
                      }"
                      :title="
                        (row.cost_price === '' ||
                          row.cost_price === undefined) &&
                        try_accept
                          ? t('ostatki.fieldE')
                          : null
                      "
                      :disabled="!row.new && !row.newBatch"
                    />
                  </td>
                  <td class="item">
                    <ImportStuffSelector
                      :options_props="row.price_cat_options"
                      @select="
                        (option, idx) => option_select(option, idx, 'price_cat')
                      "
                      @toggleShowOptions="toggleShowOptions"
                      :selected_option="row.price_cat"
                      :disabled="!row.new && !row.newBatch"
                      :idx="idx"
                    />
                  </td>
                  <td class="item">
                    <input
                      type="number"
                      v-model="row.price.cost"
                      class="input"
                      min="0"
                      :disabled="!row.new && !row.newBatch"
                    />
                  </td>
                  <td
                    class="item"
                    :class="{
                      long: row.price.is_nds,
                    }"
                  >
                    <div class="nds">
                      <div v-if="!row.price.is_nds">
                        <input
                          type="checkbox"
                          v-model="row.price.is_nds"
                          class="checkbox"
                          :id="idx + 'nq'"
                          :disabled="!row.new && !row.newBatch"
                        />
                        <label :for="idx + 'nq'"></label>
                      </div>
                      <div class="hiden" v-else>
                        <div class="checkboxes">
                          <input
                            type="checkbox"
                            v-model="row.price.is_nds"
                            class="checkbox"
                            :id="idx + 'nq'"
                            :disabled="!row.new && !row.newBatch"
                          />
                          <label :for="idx + 'nq'">{{
                            $t("ostatki.nds1")
                          }}</label>
                          <input
                            type="checkbox"
                            v-model="row.price.is_price_include_nds"
                            class="checkbox"
                            :id="idx + 'nw'"
                            :disabled="!row.new && !row.newBatch"
                          />
                          <label :for="idx + 'nw'">{{
                            $t("ostatki.nds2")
                          }}</label>
                          <input
                            type="checkbox"
                            v-model="row.price.is_manager_can_change_nds"
                            class="checkbox"
                            :id="idx + 'ne'"
                            :disabled="!row.new && !row.newBatch"
                          />
                          <label :for="idx + 'ne'">{{
                            $t("ostatki.nds3")
                          }}</label>
                        </div>
                        <input
                          type="number"
                          class="input"
                          v-model="row.price.nds"
                          :placeholder="t('ostatki.nds4')"
                          min="0"
                          :disabled="!row.new && !row.newBatch"
                        />
                      </div>
                    </div>
                  </td>
                  <td class="item">
                    <ImportStuffSelector
                      :options_props="categories_options"
                      @select="
                        (option, idx) => option_select(option, idx, 'category')
                      "
                      @toggleShowOptions="toggleShowOptions"
                      :selected_option="row.category"
                      :idx="idx"
                      :disabled="!row.new && !row.newBatch"
                    />
                  </td>
                  <td class="item">
                    <input
                      type="text"
                      v-model="row.description"
                      class="input"
                    />
                  </td>
                  <transition name="row">
                    <td class="item">
                      <button
                        class="del_btn"
                        v-show="new_items.length > 1"
                        @click="del_item(idx)"
                      >
                        X
                      </button>
                    </td>
                  </transition>
                </tr>
              </transition-group>
            </tbody>
          </table>
        </div>
        <div class="content_footer">
          <button class="add_new_button" @click="push_new_item()">+</button>
        </div>
      </div>
      <teleport to="body" v-if="selected_field_autocomplete_list.length">
        <ul class="autocomplete_teleport">
          <li
            v-for="item in selected_field_autocomplete_list"
            :key="item.id"
            @click="select_current_product(item)"
          >
            {{ item.fields.name }} | {{ item.fields.article }} |
            {{ item.fields.batch }}
          </li>
        </ul>
      </teleport>
      <div class="footer">
        <btns-save-close
          @close="close"
          @save="save"
          :disabledSave="acceptBtnDisable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ImportStuffSelector from "@/components/ImportStuffSelector.vue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  components: {
    ImportStuffSelector,
    BtnsSaveClose,
  },
  props: {
    currentItems: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
  },
  setup() {
    return { t };
  },
  data() {
    return {
      title: [
        t("ostatki.tip"),
        t("ostatki.art"),
        t("ostatki.name"),
        t("ostatki.batch"),
        t("ostatki.wh"),
        t("ostatki.count"),
        t("ostatki.ed"),
        t("ostatki.seb"),
        t("ostatki.price3"),
        t("ostatki.price3"),
        t("ostatki.ndsT"),
        t("ostatki.cat2"),
        t("ostatki.op"),
      ],
      titleWidth: [1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      new_items: [],
      options_type: [
        { name: t("ostatki.tov"), value: 1 },
        { name: t("ostatki.ysl"), value: 2 },
      ],
      batch_category_options: [],
      wh_options: [],
      price_cat_options: [],
      units_options: [],
      categories_options: [],
      selected_field_autocomplete: {
        idx: null,
        field: "",
        value: "",
      },
      selected_field_autocomplete_list: [],
      currentItemsBatchs: {},
      timer: 0,
      targetAutocomplete: null,
      copyCurrentItems: [],
      fieldsForValidation: ["article", "name", "count", "cost_price"],
      fieldsServiceForValidation: ["article", "name", "cost_price"],
      try_accept: false,
      acceptBtnDisable: false,
      optionsX: null,
      optionsY: null,
    };
  },
  computed: {
    totalTitleWidth() {
      return this.titleWidth.reduce((acc, curr) => acc + curr, 0);
    },
    fields() {
      return this.$store.state.fields.all_fields;
    },
    categories() {
      const arr = [];
      this.new_items.forEach((val) => arr.push(val.category));
      return arr;
    },
    batch_categories() {
      const arr = [];
      this.new_items.forEach((val) => arr.push(val.batch_category));
      return arr;
    },
    isValid() {
      let isValid = true;
      const list = [this.fieldsForValidation, this.fieldsServiceForValidation];
      this.new_items.forEach((item) => {
        const isService = item.type.value == 2;
        let list2 = [];
        isService ? (list2 = list[1]) : (list2 = list[0]);
        if (!item.new) return;
        list2.forEach((field) => {
          const fields = field.split(".");
          if (fields[1]) {
            isValid = isValid && this.validation(item[fields[0]][fields[1]]);
          } else {
            isValid = isValid && this.validation(item[field]);
          }
        });
      });
      return isValid;
    },
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("get_fields_properties"),
      this.$store.dispatch("get_all_fields"),
    ]);
    this.tocopyCurrentItems(this.currentItems);
    this.get_categories_options();
    this.get_options("batch", this.batch_category_options, t("ostatki.new"));
    this.fillWhs();
    this.fillPriceCat();
    this.get_options("units", this.units_options, t("global.notSelected"));
    this.currentItems.length ? this.pushCurrentItems() : this.push_new_item();
  },
  watch: {
    selected_field_autocomplete: {
      async handler() {
        clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          const complete = this.selected_field_autocomplete;
          this.selected_field_autocomplete_list = [];
          if (
            complete.field !== "" &&
            complete.value.length > 2 &&
            complete.value.split("").at(-1) != " " &&
            complete.value.split("")[0] != " "
          ) {
            const list = await this.$store.dispatch(
              "autocomplete_" + complete.field,
              complete.value
            );
            this.calcOptionsPosition();
            if (list != undefined)
              this.selected_field_autocomplete_list = [...list];
          }
        }, 500);
      },
      deep: true,
    },
    categories: {
      handler() {
        this.new_items.map((item) => {
          item.wh_options = this.searchCatArr(
            this.wh_options,
            this.searchParentsCat(item.category)
          );
          item.price_cat_options = this.searchCatArr(
            this.price_cat_options,
            this.searchParentsCat(item.category)
          );
        });
      },
      deep: true,
    },
    batch_categories: {
      handler() {
        this.new_items.map((item) => {
          item.batch_category?.value === -1
            ? ((item.newBatch = true), (item.batch = ""))
            : (item.newBatch = false);
        });
      },
      deep: true,
    },
  },
  methods: {
    push_new_item() {
      const item = {
        new: true,
        type: { name: t("ostatki.tov"), value: 1 },
        article: "",
        name: "",
        description: "",
        batch_category: { name: t("ostatki.new"), value: -1 },
        batch: "",
        wh: { name: t("ostatki.osn"), value: "wh" },
        count: 0,
        units: { name: t("global.notSelected"), value: -1 },
        cost_price: 0,
        category: this.searchBaseCategory(),
        price_cat: { name: t("ostatki.price3"), value: "price" },
        price: {
          cost: 0,
          currency: "RUB",
          is_manager_can_change_nds: false,
          is_nds: false,
          is_price_include_nds: false,
          nds: 0,
        },
        wh_options: this.searchCatArr(
          this.wh_options,
          this.searchParentsCat(this.searchBaseCategory())
        ),
        price_cat_options: this.searchCatArr(
          this.price_cat_options,
          this.searchParentsCat(this.searchBaseCategory())
        ),
      };
      this.new_items.push(item);
    },
    pushCurrentItems() {
      this.currentItems.forEach(async (val) => {
        let list = [];
        if (val?.fields?.article.length > 0) {
          list = await this.$store.dispatch(
            "autocomplete_article",
            val?.fields?.article
          );
        } else {
          list = [val];
        }
        const batchs = list.filter(
          (value) =>
            value.fields.name == val.fields.name &&
            value.fields.article == val.fields.article
        );
        this.currentItemsBatchs[val.fields.article] = batchs;
        this.pushCurrentItem(val, this.selected_field_autocomplete.idx);
      });
    },
    pushCurrentItem(val, idx) {
      const item = {
        new: false,
        id: val.id,
        type: { name: t("ostatki.tov"), value: 1 },
        article: val.fields.article,
        name: val.fields.name,
        description: val.fields?.description,
        batch_category: { name: "", value: -2 },
        batch_category_options: [{ name: t("ostatki.new"), value: -1 }],
        batch: val.fields.batch,
        wh: { name: t("ostatki.osn"), value: "wh" },
        count: 0,
        units: {
          ...this.units_options.find((value) => value.name == val.fields.units),
        },
        cost_price: val.fields.cost_price,
        category: {
          ...this.categories_options.find(
            (value) => value.value == val.fields.category
          ),
        },
        price_cat: { name: t("ostatki.price3"), value: "price" },
        price: { ...val.fields.price },
        wh_options: this.searchCatArr(
          this.wh_options,
          this.searchParentsCat(val.category)
        ),
        price_cat_options: this.searchCatArr(
          this.price_cat_options,
          this.searchParentsCat(val.category)
        ),
      };
      this.currentItemsBatchs[val.fields.article]?.forEach((value) =>
        item.batch_category_options.push({
          name: value.fields.batch,
          value: value.fields.batch,
        })
      );
      item.batch_category = item.batch_category_options.find(
        (value) => value.value == val.fields.batch
      );
      if (idx != undefined) {
        Object.assign(this.new_items[idx], item);
        this.copyCurrentItems.push(val);
      } else {
        this.new_items.push(item);
      }
    },
    del_item(idx) {
      this.new_items.splice(idx, 1);
    },
    fillWhs() {
      this.fields
        .filter((val) => val.type == 13 && val.code != "whs")
        .forEach((val) =>
          this.wh_options.push({ name: val.name, value: val.code })
        );
    },
    fillPriceCat() {
      this.fields
        .filter((val) => val.type == 11)
        .forEach((val) =>
          this.price_cat_options.push({ name: val.name, value: val.code })
        );
    },
    searchCatArr(arr, categories) {
      const res = [];
      arr.forEach((val) => {
        if (
          categories.includes(
            this.fields.find((value) => val.value == value.code).category_id
          )
        )
          res.push(val);
      });
      return res;
    },
    searchParentsCat(cat) {
      let res = [];
      this.$store.state.categories.fields_properties.forEach((val) => {
        if (val.id == cat?.value) res = [...val.levels];
      });
      const zeroIdx = res.indexOf(0);
      res = res.slice(0, zeroIdx);
      return res;
    },
    searchBaseCategory() {
      const baseCategory = this.$store.state.categories.fields_properties.find(
        (val) => val.parent_id == 0
      );
      return { name: baseCategory.name, value: baseCategory.id };
    },
    set_selected_field_autocomplete(field, value, idx) {
      if (field == "") this.targetAutocomplete = null;
      this.selected_field_autocomplete = {
        field: field,
        value: value,
        idx: idx,
      };
    },
    select_current_product(item) {
      const batchs = this.selected_field_autocomplete_list.filter(
        (val) =>
          val.fields.name == item.fields.name &&
          val.fields.article == item.fields.article
      );
      this.currentItemsBatchs[item.fields.article] = batchs;
      this.pushCurrentItem(item, this.selected_field_autocomplete.idx);
      this.set_selected_field_autocomplete("", "", null);
    },
    get_options(cat, catArr, name) {
      catArr.push({ name: name, value: -1 });
      this.search_type_options(this.fields, cat).forEach((val, idx) =>
        catArr.push({ name: val, value: idx })
      );
    },
    get_categories_options() {
      this.$store.state.categories.fields_properties.forEach((val) => {
        let spaces = "";
        for (let i = 1; i < val.level; i++) spaces = spaces + "    ";
        this.categories_options.push({
          name: spaces + val.name,
          value: val.id,
        });
      });
    },
    search_type_options(arr, code) {
      let res = [];
      arr.forEach((val) => {
        if (val.code == code && val.data) res = val.data;
      });
      return res;
    },
    validation(val, extraOptions) {
      let res = val != undefined && val !== "";
      if (extraOptions != undefined)
        extraOptions.forEach((option) => {
          if (option.type == "length") res = res && val.length > option.value;
        });
      return res;
    },
    option_select(option, idx, cat) {
      this.new_items[idx][cat] = { ...option };
      if (cat === "batch_category" && option.value != -1) {
        const article = this.new_items[idx].article;
        const item = this.currentItemsBatchs[article].find(
          (val) => val.fields.batch == option.value
        );
        this.pushCurrentItem(item, idx);
      }
    },
    close() {
      this.$emit("close");
      this.$store.commit("open_close_new_position", false);
    },
    tocopyCurrentItems(value) {
      this.copyCurrentItems = value;
    },
    async save() {
      this.try_accept = true;
      this.acceptBtnDisable = true;
      if (this.isValid) {
        const params = { products: [] };
        const paramsNew = { products: [] };
        this.new_items.forEach((val) => {
          const item = {
            is_service: val.type.value - 1,
            fields: {
              name: val.name,
              description: val.description,
              article: val.article,
              batch: val.batch,
              units: val.units.name,
              cost_price: val.cost_price,
              category: val.category.value,
            },
          };
          if (!val.new) item.id = val.id;
          item.fields[val.wh.value] = {
            count: val.count,
            reserve: 0,
          };
          item.fields[val.price_cat.value] = val.price;
          !val.new && !val?.newBatch
            ? params.products.push(item)
            : paramsNew.products.push(item);
        });
        if (paramsNew.products.length) {
          await this.$store.dispatch("add_product", paramsNew);
        }
        if (params.products.length) {
          params.products.map((val) => {
            const item = this.new_items.find(
              (value) => value.name == val.fields.name
            );

            let oldCount = this.copyCurrentItems.find(
              (value) => value.fields.name == val.fields.name
            ).fields[item.wh.value]?.count;
            oldCount ? null : (oldCount = 0);

            val.fields[item.wh.value] = {
              count: item.count + oldCount,
            };
          });
          await this.$store.dispatch("update_product", params);
        }
        this.$emit("save");
        this.close();
      }
      this.acceptBtnDisable = false;
    },
    toggleShowOptions(isOpen) {
      const changeOverflow = (option) => {
        document.body.style.overflowY = option;
        this.$refs.tableWrapper.style.overflowX = option;
      };
      isOpen ? changeOverflow("hidden") : changeOverflow("auto");
    },
    calcOptionsPosition() {
      const rect = this.targetAutocomplete?.getBoundingClientRect();
      this.optionsX = rect?.x + "px";
      this.optionsY = rect?.bottom - 10 + "px";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  padding: 30px;
  box-sizing: border-box;
  pointer-events: all;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  overflow-x: scroll;
  .backdrop_with_filter {
    z-index: 259;
  }
  .container {
    position: relative;
    z-index: 260;
    width: calc(100% - 60px);
    // width: fit-content;
    // min-width: 1400px;
    overflow: hidden;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: start;
      padding: 10px 50px;
      @include font(500, 20px);
      // border-bottom: 2px solid #dee2e6;
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px 0;
      // border-bottom: 2px solid #dee2e6;
      .table_wrapper {
        overflow-x: scroll;
        width: 100%;
        max-height: 420px;
        .table {
          border: 1px solid #c9c9c9;
          border-collapse: collapse;
          width: 100%;
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
              position: relative;
              padding: 10px 5px;
              border: 1px solid #c9c9c9;
              border-top: 2px solid #c9c9c9;
              text-align: left;
              .nds {
                // text-align: center;
                display: flex;
                flex-direction: row;
                text-align: center;
                justify-content: center;
                .hiden {
                  display: flex;
                  flex-direction: column;
                  .checkboxes {
                    display: flex;
                    flex-direction: row;
                    gap: 7px;
                    @include font(500, 14px);
                    > label {
                      flex-direction: column;
                    }
                  }
                }
              }
              .v-select {
                // width: calc(100% - 26px) !important;
                width: 100%;
              }
              .select_input {
                display: flex;
                flex-direction: row;
                gap: 24px;
                .v-select {
                  flex: 2 2 auto;
                  width: 60% !important;
                  :deep(.title) {
                    width: 100% !important;
                  }
                }
                .input {
                  flex: 1 1 auto;
                  width: calc(40% - 24px) !important;
                  min-width: 30%;
                  margin-left: -24px;
                }
              }
            }
            .item:nth-child(1) {
              width: 7%;
            }
            .item:nth-child(2) {
              width: 10%;
            }
            .item:nth-child(3) {
              width: 50%;
            }
            .item:nth-child(4) {
              width: 15%;
              min-width: 160px;
            }
            .item:nth-child(5) {
              width: 15%;
              min-width: 190px;
              // max-width: 180px;
            }
            .item:nth-child(6) {
              width: 10%;
              min-width: 120px;
            }
            .item:nth-child(7) {
              width: 7%;
              // max-width: 140px;
              min-width: 130px;
              max-width: 130px;
            }
            .item:nth-child(8) {
              width: 3%;
            }
            .item:nth-child(9) {
              width: 15%;
              min-width: 160px;
              // max-width: 180px;
            }
            .item:nth-child(10) {
              width: 15%;
              min-width: 110px;
            }
            .item:nth-child(11) {
              width: 5%;
            }
            .item:nth-child(12) {
              width: 15%;
              min-width: 150px;
            }
            .item:nth-child(13) {
              width: 15%;
              min-width: 150px;
            }
            .item:nth-child(14) {
              width: 5.3%;
              min-width: 44px;
              max-width: 44px;
            }
            .long {
              min-width: 182px;
            }
            .del_btn {
              height: 34px;
              width: 34px !important;
              margin: 0 auto;
              cursor: pointer;
              color: #fff;
              background: #dc3545;
              border: none;
              border-radius: 4px;
              display: flex;
              align-items: center;
              justify-content: center;
              @include font(400, 16px, 20px);
            }
          }
        }
      }
      .content_footer {
        margin-top: 15px;
        display: flex;
        justify-content: end;
        .add_new_button {
          margin-right: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          width: 34px;
          height: 20px;
          color: #fff;
          background: #4e964d;
          border: none;
          border-radius: 4px;
          @include font(400, 16px, 20px);
        }
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 50px;
    }
  }
}
.not_valid {
  border: 1px solid #ff0000 !important;
}
.not_valid:focus {
  box-shadow: 0 0 0 4px rgb(255 0 0 / 25%) !important;
}
input[type="number"] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  display: none;
}
.input {
  width: 100%;
  min-width: 50%;
  height: 34px;
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @include font(400, 16px, 20px);
}
.input:disabled {
  background-color: #e9ecef !important;
}
.input:focus {
  color: #212529;
  background-color: white;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
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
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  background-color: #fff;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}
.checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
.checkbox:disabled + label::before {
  background-color: #e9ecef;
  border-color: #b3d7ff;
  cursor: default;
}
.btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.autocomplete_teleport {
  position: absolute;
  top: 50px;
  left: 0;
  left: v-bind(optionsX);
  top: v-bind(optionsY);
  border-radius: 4px;
  list-style: none;
  max-height: 400px;
  min-height: 40px;
  // width: 300%;
  overflow-y: scroll;
  scrollbar-width: 0;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  scrollbar-width: 0;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 4px;
  z-index: 265;

  box-sizing: border-box;
  li {
    // margin: 0;
    box-sizing: border-box;
    cursor: pointer;
    height: 40px;
    width: 100%;
    padding: 6px 12px;
    transition: background-color 0.15s ease-out;
    white-space: pre;
  }
  li:hover {
    background-color: rgb(13 110 253 / 25%);
  }
  li:last-child {
    border-radius: 0 0 4px 4px;
  }
  li:first-child {
    border-radius: 4px 4px 0 0;
  }
  li:active {
    background-color: #3261a7;
  }
}
.row-enter-active,
.row-leave-active {
  transition: opacity 0.2s ease-out;
}
.row-enter-from,
.row-leave-to {
  opacity: 0;
}
.wrapper::-webkit-scrollbar-thumb {
  background: transparent;
  // background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
}
</style>
