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
          <h6>
            Настройка соответствий полей amoCRM-товаров и свойств товаров на
            складе
          </h6>
          <p class="small">
            Для работы синхронизации необходимо, что бы в товарах amoCRM было
            свойство артикул и что бы это поле было привязано к артикулу товара
            на складе
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
            <input type="text" class="input" v-model="field.name" disabled />
            <SelectorVue
              class="selector"
              :options_props="copySyncFields.fields"
              @select="(option) => select(option, idx)"
              :selected_option="field.selected"
              :disabled="field.disabled"
            />
          </div>
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
    };
  },
  mounted() {
    this.updateFields();
  },
  computed: {
    height() {
      return document.documentElement.scrollHeight;
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
      this.$store.dispatch("update_account", params);
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
        h6 {
          margin: 0 0 8px;
          @include font(500, 16px);
        }
        .small {
          @include font(400, 14px);
        }
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
