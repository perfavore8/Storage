<template>
  <div class="bgc">
    <div class="container">
      <div class="header"></div>
      <div class="content">
        <div class="binding">
          <div class="header">
            Привязка полей документов
            <div class="save">
              <btns-save-close @save="save" :show_close="false" />
            </div>
          </div>
          <div class="patterns">
            <div class="main shadow-lg shadow-slate-100/20 rounded-md">
              <div class="column">
                <div class="label_select">
                  <label>Поле "Документы"</label>
                  <SelectorVue
                    :options_props="leadFields.list"
                    @select="leadFields.select"
                    :selected_option="leadFields.selected"
                  />
                </div>
                <div class="label_select">
                  <label>Поряд имен контактов</label>
                  <SelectorVue
                    :options_props="contactNameType.list"
                    @select="contactNameType.select"
                    :selected_option="contactNameType.selected"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="header mb-2">Хуки</div>
          <div class="main mb-4 shadow-lg shadow-slate-100/20 rounded-md">
            <div class="column">
              <div class="grid grid-cols-[3fr_4fr] items-center">
                <label>Хук при загрузке документа в сделку</label>
                <input
                  type="text"
                  class="input inputhuk my-2"
                  v-model="hook_download"
                />
              </div>
              <div class="grid grid-cols-[3fr_4fr] items-center">
                <label>Хук при генерации документа в сделке</label>
                <input
                  type="text"
                  class="input inputhuk my-2"
                  v-model="hook_generate_doc"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
import SelectorVue from "@/components/SelectorVue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  setup() {
    const leadFields = reactive({
      selected: { name: "Не выбрано", value: 1 },
      list: [],
      itialList: computed(() => {
        const list = [];
        Object.entries(store.state.account.leadFieldsList).map((val) => {
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
      }),
      select: function (option) {
        this.selected = option;
      },
      setList: function () {
        this.list.push({ name: "Не выбрано", value: -1 });
        this.itialList.forEach((val) => {
          const optgroup = val.name;
          this.list.push({ name: optgroup, value: "optgroup" });
          const list = val.fields.splice(1, 999);
          list.forEach((item) => this.list.push({ ...item, optgroup: true }));
        });

        this.list.forEach((val) =>
          val.value == store.state.documents.config.field_docs
            ? (this.selected = val)
            : null
        );
      },
    });
    leadFields.setList();

    const contactNameType = reactive({
      selected: { name: "Не выбрано", value: -1 },
      list: [],
      select: function (option) {
        this.selected = option;
      },
      setList: function () {
        store.state.documents.config.contact_name_types?.forEach((val, idx) =>
          this.list.push({ name: val, value: idx })
        );
        this.list?.forEach((val) =>
          val.value == store.state.account.account.config.contact_name_type
            ? (this.selected = val)
            : null
        );
      },
    });
    contactNameType.setList();

    const hooks = reactive({
      download: "",
      generateDoc: "",
    });

    const account = computed(() => store.state.account.account);

    onMounted(async () => {
      await Promise.all([
        store.dispatch("get_account"),
        store.dispatch("getLeadFieldsList"),
      ]);
      hooks.download = account.value.config?.hook_download;
      hooks.generateDoc = account.value.config?.hook_generate_doc;
    });

    const save = () => {
      store.dispatch("update_account", {
        hook_download: hooks.download,
        hook_generate_doc: hooks.generateDoc,
        field_docs: leadFields.setList.value,
        contact_name_type: contactNameType.selected.value,
      });
    };

    return { leadFields, contactNameType, save, hooks };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.bgc {
  position: relative;
  width: 80%;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  margin: 30px auto;
  outline: 0;
  box-shadow: 0 0 7px 6px rgb(206 212 218 / 5%);
  .container {
    text-align: left;
    width: 80%;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    .header {
    }
    .content {
      .binding {
        margin-bottom: 8px;
        .header {
          @include font(500, 16px);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .main {
          display: grid;
          background-color: #fff;
          border: 1px solid #c9c9c9;
          .save {
            padding: 20px;
          }
          .column {
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 12px;
            padding: 20px;
            .label_select {
              display: grid;
              grid-template-columns: 3fr 4fr;
              .v-select {
                width: 50%;
              }
            }
          }
        }
      }
      .patterns {
        .header {
          @include font(500, 16px);
          .small {
            margin: 1em 0;
            margin-top: 8px;
            font-weight: 400 !important;
          }
        }
        .main {
          background-color: #fff;
          border: 1px solid #c9c9c9;
          padding: 20px;
          .table {
            border: 1px solid #dee2e6;
            border-collapse: collapse;
            width: 100%;
            .title {
              @include font(500, 16px);
              // background-color: rgba(0, 0, 0, 0.15) !important;
              background-color: #fff !important;
              .item {
                padding: 10px 5px;
                border: 1px solid #c9c9c9;
                text-align: left;
                padding-bottom: 20px !important;
              }
              .item:last-child {
                max-width: 101px;
                width: 0.1%;
              }
            }
          }
          .add_button_container {
            width: 100%;
            display: flex;
            justify-content: end;
            .add_new_button {
              cursor: pointer;
              margin-top: 15px;
              margin-right: 25px;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 34px;
              height: 34px;
              color: #fff;
              background: #4e964d;
              border: none;
              border-radius: 5px;
              .icon {
                width: inherit;
                height: inherit;
                @include bg_image("@/assets/plus.svg", 60% 60%);
              }
            }
            .add_new_button:hover {
              background-color: #60ba5e;
              box-shadow: 0 0 5px 2px rgb(96 186 94 / 25%);
            }
          }
        }
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      margin-top: 40px;
    }
  }
}

.checkbox:disabled + label::before {
  background-color: #e9ecef;
  border-color: #b3d7ff;
  cursor: default;
}
</style>
