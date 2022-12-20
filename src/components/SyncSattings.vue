<template>
  <div
    class="wrapper"
    @click.self="close()"
    :style="{ minHeight: height + 'px' }"
  >
    <div class="bgc">
      <div class="container">
        <div class="header">
          <label>Настройки синхронизации склада с товарами amoCRM</label>
          <btns-save-close @close="close" @save="save">
            <template v-slot:close>Назад</template>
            <template v-slot:other_btns v-if="false">
              <button class="btn btn_dark_blue" @click="updateFields()">
                Обновить поля
              </button>
            </template>
          </btns-save-close>
        </div>
        <div class="content">
          <div class="sync">
            <!-- <label>Синхронизация товаров на складе с товарами amoCRM</label> -->
            <div class="list">
              <div class="label_input">
                <label>
                  Выберите список товаров из amoCRM для синхронизации
                </label>
                <SelectorVue
                  :options_props="copyProductLists"
                  @select="
                    (event) => optionSelectSync(event, 'amo_product_list')
                  "
                  :selected_option="selectedAmoProductList"
                />
              </div>
              <div class="label_input">
                <label>
                  Скрытие штатной вкладки amoCRM с товарами. В штатной вкладке с
                  товарами так же можно прикреплять товары к сделкам, но
                  количество товара на складе учитываться учитываться не будет.
                </label>
                <SelectorVue
                  :options_props="amoLeadsGroupHide"
                  @select="
                    (event) => optionSelectSync(event, 'amo_leads_group_hide')
                  "
                  :selected_option="selectedAmoLeadsGroupHide"
                />
              </div>
            </div>
          </div>
          <template v-if="selectedAmoProductList.value != -1">
            <div class="product_comparison">
              <h6>Поля сравнения товаров</h6>
              <div class="radio_btns">
                <div
                  class="radio_btn"
                  v-for="field in fieldsProductComparison"
                  :key="field"
                >
                  <input
                    type="radio"
                    :value="field.value"
                    :id="field.name"
                    :checked="
                      productComparisonSelectedField.value == field.value
                    "
                    @change="selectProductComparisonField(field)"
                  />
                  <label :for="field.name">{{ field.name }}</label>
                </div>
              </div>
            </div>
            <div class="autosync">
              <div
                class="list"
                v-for="autosync in autosyncValues"
                :key="autosync"
              >
                <h6>{{ autosync.label }}</h6>
                <div
                  class="row"
                  v-for="item in autosyncProducts"
                  :key="item.id"
                >
                  <input
                    type="checkbox"
                    class="checkbox"
                    :id="item.id + autosync.value"
                    v-model="item[autosync.value]"
                  />
                  <label :for="item.id + autosync.value">{{
                    item.label
                  }}</label>
                </div>
              </div>
            </div>
            <div class="fields">
              <h6>
                Настройка соответствий полей amoCRM-товаров и свойств товаров на
                складе
              </h6>
              <p class="small">
                Для работы синхронизации необходимо, что бы в товарах amoCRM
                было свойство артикул и что бы это поле было привязано к
                артикулу товара на складе
              </p>
              <div class="row">
                <span>Имя поля amoCRM-товара</span>
                <span>Имя поля товара на складе</span>
              </div>
              <div
                class="row"
                v-for="(field, idx) in copySyncFields.amoFields"
                :key="field.field"
              >
                <input
                  type="text"
                  class="input"
                  v-model="field.name"
                  disabled
                />
                <SelectorVue
                  class="selector"
                  :options_props="copySyncFields.fields"
                  @select="(option) => select(option, idx)"
                  :selected_option="field.selected"
                  :disabled="field.disabled"
                />
              </div>
            </div>
          </template>
        </div>
        <div class="footer">
          <btns-save-close @close="close" @save="save">
            <template v-slot:close>Назад</template>
            <template v-slot:other_btns v-if="false">
              <button class="btn btn_dark_blue" @click="updateFields()">
                Обновить поля
              </button>
            </template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import SelectorVue from "@/components/SelectorVue.vue";
export default {
  components: {
    BtnsSaveClose,
    SelectorVue,
  },
  data() {
    return {
      copySyncFields: {
        fields: [],
        amoFields: [],
      },
      copyConfing: {
        reserve_off: [],
        write_off: [],
      },
      copyProductLists: [],
      selectedAmoProductList: { name: "Не выбрано", value: -1 },
      amoLeadsGroupHide: [],
      selectedAmoLeadsGroupHide: { name: "Не выбрано", value: -1 },
      fieldsProductComparison: [
        { name: "по названию", value: 1 },
        { name: "по названию и артикулу", value: 2 },
        { name: "по названию, артикулу и партии", value: 3 },
      ],
      productComparisonSelectedField: { name: "по названию", value: 1 },
      autosyncProducts: [
        {
          id: 1,
          productValue: false,
          listProductValue: false,
          label: "склад -> амо",
        },
        {
          id: 2,
          productValue: false,
          listProductValue: false,
          label: "амо -> склад",
        },
      ],
      autosyncValues: [
        { value: "productValue", label: "Автосинхронизация товаров" },
        {
          value: "listProductValue",
          label: "Автосинхронизация списка товаров",
        },
      ],
    };
  },
  async mounted() {
    await this.$store.dispatch("get_account");
    await this.$store.dispatch("getProductLists");
    await this.$store.dispatch("getLeadFieldsList");
    this.copyLeadFieldsList = this.leadFieldsList;
    this.copyConfing = this.$store.state.account.account.config;
    this.updateFields();

    this.fillCopyProductLists();
    this.fillAmoLeadsGroupHide();

    this.searchSelectedAmoProductList();
    this.searchSelectedAmoLeadsGroupHide();
  },
  computed: {
    height() {
      return document.documentElement.scrollHeight;
    },
    productLists() {
      return this.$store.state.account.productLists;
    },
    leadFieldsList() {
      const list = [];
      Object.entries(this.$store.state.account.leadFieldsList).map((val) => {
        const arr = [];
        Object.entries(val[1].fields).forEach((stat) =>
          arr.push({ name: stat[1], value: stat[0] })
        );
        val[1].fields = arr;
        val[1].fields.unshift({ name: "Не выбрано", value: -1 });
        val[1].selected = { name: "Не выбрано", value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
  },
  methods: {
    save() {
      const params = {
        sync_products_fields: [],
      };
      this.copySyncFields.amoFields.forEach((val) =>
        val.selected.value != -1
          ? params.sync_products_fields.push({
              field: val.field,
              value: val.selected.value,
            })
          : null
      );

      this.$store.dispatch(
        "update_account",
        Object.assign(this.copyConfing, params)
      );
      this.close();
    },
    close() {
      this.$store.commit("openCloseSyncSettings", false);
    },
    async updateFields() {
      await this.$store.dispatch("getSyncFields");
      await this.$store.dispatch("get_account");

      this.fillCopySyncFields();
      this.searchSelectedSyncFields();
    },
    select(option, idx) {
      this.copySyncFields.amoFields[idx].selected = option;
    },
    searchSelectedSyncFields() {
      this.copySyncFields.amoFields.map((val) => {
        this.$store.state.account.account?.config?.sync_products_fields.forEach(
          (field) => {
            if (field.field == val.field) {
              const items = this.copySyncFields.fields.filter(
                (value) => value.value == field.value
              );
              if (items.length) val.selected = items[0];
            }
          }
        );
      });
    },
    fillCopySyncFields() {
      const list = this.$store.state.account.syncFields;

      const fields = list.fields;
      const newFields = [];
      newFields.push({ name: "Не выбрано", value: -1 });
      Object.entries(fields).forEach((val) =>
        newFields.push({ name: val[1], value: val[0] })
      );
      this.copySyncFields.fields = newFields;

      const amo_fields = list.amo_fields;
      const newAmoFields = [];
      Object.entries(amo_fields).forEach((val) =>
        newAmoFields.push({
          name: val[1],
          field: val[0],
          selected: { name: "Не выбрано", value: -1 },
          disabled: 0,
        })
      );
      this.copySyncFields.amoFields = newAmoFields;
    },
    fillCopyProductLists() {
      const list = [{ name: "Не выбрано", value: -1 }];
      Object.entries(this.productLists).forEach((val) =>
        list.push({ name: val[1], value: val[0] })
      );
      this.copyProductLists = list;
    },

    searchSelectedAmoProductList() {
      this.copyProductLists.forEach((val) => {
        if (val.value == this.copyConfing.amo_product_list)
          this.selectedAmoProductList = val;
      });
    },
    optionSelectSync(option, code) {
      option.value == -1
        ? (this.copyConfing[code] = "0")
        : (this.copyConfing[code] = option.value);

      if (code == "amo_leads_group_hide")
        this.selectedAmoLeadsGroupHide = option;
      if (code == "amo_product_list") this.selectedAmoProductList = option;
    },

    fillAmoLeadsGroupHide() {
      this.amoLeadsGroupHide.push({ name: "Не выбрано", value: -1 });
      this.copyLeadFieldsList.forEach((val) => {
        this.amoLeadsGroupHide.push({ name: val.name, value: val.value });
      });
    },
    searchSelectedAmoLeadsGroupHide() {
      this.amoLeadsGroupHide.forEach((val) => {
        if (val.value == this.copyConfing.amo_leads_group_hide)
          this.selectedAmoLeadsGroupHide = val;
      });
    },

    selectProductComparisonField(field) {
      this.productComparisonSelectedField = field;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999999;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .bgc {
    width: 80%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .container {
      text-align: left;
      // width: 100%;
      // margin: 30px auto;
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 16px 64px;
        border-bottom: 2px solid #dee2e6;

        label {
          @include font(500, 28px);
          max-width: 60%;
        }
      }
      .content {
        padding: 16px 64px;
        border-bottom: 2px solid #dee2e6;
        @include font(400, 16px);
        display: flex;
        flex-direction: column;
        gap: 3vh;

        .product_comparison {
          display: flex;
          flex-direction: column;
          gap: 0.5vh;
          padding: 15px;
          border: 1px solid #c9c9c9;
          border-radius: 5px;
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

        .autosync {
          padding: 15px;
          border: 1px solid #c9c9c9;
          border-radius: 5px;
          display: grid;
          grid-template-columns: minmax(50%, 2fr) minmax(50%, 1fr);
          gap: 16px;
        }

        .sync {
          label {
            @include font(500, 16px);
          }
          .list {
            padding: 15px;
            border: 1px solid #c9c9c9;
            border-radius: 5px;
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            .label_input {
              display: flex;
              flex-direction: column;
              gap: 5px;
              label {
                @include font(400, 14px);
              }

              .v-select {
                width: calc(100% - 26px) !important;
                margin-right: 24px;
                :deep(.title) {
                  width: 100% !important;
                }
                :deep(.options) {
                  width: calc(100% + 24px) !important;
                  text-align: left;
                  p {
                    width: calc(100% - 24px) !important;
                  }
                }
              }
            }
          }
        }

        h6 {
          margin: 0 0 8px;
          @include font(500, 16px);
        }
        .small {
          @include font(400, 14px);
        }
        .fields {
          .row {
            display: grid;
            grid-template-columns: minmax(50%, 2fr) minmax(50%, 1fr);
            gap: 16px;
            padding: 6px 12px;
            border-bottom: 1px solid #dee2e6;
            .selector {
              width: calc(100% - 16px);
            }
          }
        }
      }
      .footer {
        padding: 16px 64px;
        display: flex;
        justify-content: end;
        align-items: center;
      }
    }
  }
}
</style>
