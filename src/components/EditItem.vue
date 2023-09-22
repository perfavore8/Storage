<template>
  <div class="backdrop_with_filter" @click.self="close()" />
  <div class="background_edit_modal">
    <div class="app_edit_modal">
      <div class="header">
        <div class="header_left">
          {{ $t("ostatki.red", { name: edit_data.fields["name"] }) }}
        </div>
        <div class="header_right">
          <BtnsSaveClose @close="close" @save="save">
            <template v-slot:close>{{ $t("global.сancel") }}</template>
            <template v-slot:other_btns v-if="!oneC">
              <button class="btn btn3" @click="archive()">
                {{ $t("ostatki.arch") }}
              </button>
            </template>
          </BtnsSaveClose>
        </div>
      </div>
      <div class="hr" />
      <div class="main">
        <div class="row">
          <label>{{ $t("ostatki.type") }}</label>
          <SelectorVue
            :options_props="options_1"
            @select="option_select_1"
            :selected_option="selected_option_1"
            :disabled="oneC || true"
          />
        </div>
        <div class="row">
          <label>{{ $t("ostatki.cat") }}</label>
          <SelectorVue
            :options_props="categories_options"
            @select="option_select_cat"
            :selected_option="selectedCategory"
          />
        </div>
        <edit-item-fields
          :new_edit_data="new_edit_data"
          @change_value="change_value"
          @changeEditPrices="changeEditPrices"
        />
      </div>
      <div class="hr" />
      <div class="footer">
        <BtnsSaveClose @close="close" @save="save">
          <template v-slot:close>{{ $t("global.сancel") }}</template>
          <template v-slot:other_btns v-if="!oneC">
            <button class="btn btn3" @click="archive()">
              {{ $t("ostatki.arch") }}
            </button>
          </template>
        </BtnsSaveClose>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import EditItemFields from "@/components/EditItemFields.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
    EditItemFields,
  },
  props: {
    edit_data: {
      type: Object,
      required: true,
    },
  },
  inject: ["isServicePage"],
  data() {
    return {
      options_1: [
        { name: t("ostatki.tov"), value: 1 },
        { name: t("ostatki.ysl"), value: 2 },
      ],
      selected_option_1: { name: t("ostatki.tov"), value: 1 },
      new_edit_data: {},
      editPrices: [],
      categories_options: [],
      selectedCategory: {},
    };
  },

  computed: {
    oneC() {
      return this.$store.state.account.account?.config?.g_enabled;
    },
    productsParams() {
      return this.$store.state.products.productsParams;
    },
  },

  async mounted() {
    this.new_edit_data = JSON.parse(JSON.stringify(this.edit_data));
    this.isServicePage
      ? (this.selected_option_1 = { ...this.options_1[1] })
      : (this.selected_option_1 = { ...this.options_1[0] });

    await this.$store.dispatch("get_fields_properties");
    this.get_categories_options();
    this.searchSelectedCategory();
  },
  methods: {
    change_value(value, code) {
      this.new_edit_data.fields[code] = value;
    },
    option_select_1(option) {
      this.selected_option_1 = { ...option };
    },
    changeEditPrices(value) {
      this.editPrices = [...value];
    },
    archive() {
      this.new_edit_data.is_archive = 1;
      this.save();
    },
    close() {
      this.$store.commit("close_edit_modal");
    },
    async save() {
      this.dataPreparation();
      await this.$store.dispatch("update_product", {
        products: [this.new_edit_data],
      });
      this.editPrices.forEach(async (val) => {
        if (val.isNew) {
          const params = { ...val };
          params.is_update_leads = params.is_update_leads ? 1 : 0;
          await this.$store.dispatch("setPrice", params);
        }
      });
      this.$store.dispatch("get_products", this.productsParams);
      this.close();
    },
    dataPreparation() {
      const arr = [];
      const new_edit_data_keys = Object.keys(this.new_edit_data?.fields);
      const fields_with_parents_codes = [];
      this.$store.state.fields.fields_with_parents.forEach((field) =>
        fields_with_parents_codes.push(field.code)
      );
      new_edit_data_keys.forEach((field) => {
        if (!fields_with_parents_codes.includes(field)) arr.push(field);
      });
      arr.forEach((val) => delete this.new_edit_data?.fields[val]);
    },
    option_select_cat(value) {
      this.selectedCategory = value;
      this.new_edit_data.fields.category = value.value;
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
    searchSelectedCategory() {
      const cat = this.categories_options.find(
        (val) => val.value == this.new_edit_data?.fields?.category
      );
      if (cat != undefined) this.selectedCategory = cat;
    },
  },
};
</script>

<style lang="scss">
@import "@/app.scss";
.app_edit_modal {
  z-index: 9999;
  width: 50%;
  min-width: 500px;
  background-color: #f5f5f5;
  position: absolute;
  left: 25%;
  top: 50px;
  border-radius: 10px;
  pointer-events: all;
  @include font(400, 16px, 22px);
  box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
  .header {
    width: 80%;
    margin: 20px auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    &_left {
      display: flex;
      justify-content: start;
      @include font(500, 20px, 24px);
    }
    &_right {
      display: flex;
      justify-content: end;
    }
  }
  .main {
    width: 80%;
    display: flex;
    flex-direction: column;
    margin: 20px auto;
    gap: 16px;
    .row {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      label {
        padding: 7px 0;
      }
    }
  }
  .footer {
    width: 80%;
    margin: 20px auto 40px;
    display: flex;
    justify-content: end;
  }
  .hr {
    width: 100%;
    height: 0;
    border: none;
    border-top: 1px solid #dee2e6;
    margin-top: 15px;
  }

  .checkbox + label::before {
    background-color: #fff;
    border: 1px solid #adb5bd;
  }
  .checkbox:checked + label::before {
    border-color: #0b76ef;
    background-color: #0b76ef;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
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
}
.btn3 {
  color: #fff;
  background: #1b3546f1;
}
.btn3:hover {
  background: #1b3546d9;
  box-shadow: 0 0 5px 2px rgb(27 53 70 / 25%);
}
.background_edit_modal {
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}
.backdrop_with_filter {
  z-index: 2000;
}
</style>
