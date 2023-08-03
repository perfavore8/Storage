<template>
  <div class="bgc">
    <div class="container">
      <div class="header"></div>
      <div class="content">
        <div class="binding space-y-12">
          <div>
            <div class="header">Привязка полей документов</div>
            <div class="patterns border-b border-gray-900/10 pb-12">
              <div class="main">
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
          </div>
          <div>
            <div class="header mb-2">Хуки</div>
            <div class="main mb-4 border-b border-gray-900/10 pb-12">
              <div class="column">
                <div class="grid grid-cols-[3fr_4fr] items-center">
                  <label>Хук при загрузке документа в сделку</label>
                  <input
                    type="text"
                    class="input inputhuk my-2"
                    v-model="hooks.download"
                  />
                </div>
                <div class="grid grid-cols-[3fr_4fr] items-center">
                  <label>Хук при генерации документа в сделке</label>
                  <input
                    type="text"
                    class="input inputhuk my-2"
                    v-model="hooks.generateDoc"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="save">
          <btns-save-close @save="save" :show_close="false" />
        </div>
      </div>
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
          val.value == store.state.account.account?.config?.contact_name_type
            ? (this.selected = val)
            : null
        );
      },
    });

    const hooks = reactive({
      download: "",
      generateDoc: "",
    });

    const account = computed(() => store.state.account.account);

    onMounted(async () => {
      await Promise.all([
        store.dispatch("get_account"),
        store.dispatch("get_documents_v2"),
        store.dispatch("getLeadFieldsList"),
      ]);
      hooks.download = account.value.config?.hook_download;
      hooks.generateDoc = account.value.config?.hook_generate_doc;
      leadFields.setList();
      contactNameType.setList();
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
  // width: 80%;
  background-color: #fff;
  background-clip: padding-box;
  // border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  margin: 30px auto;
  outline: 0;
  // box-shadow: 0 0 7px 6px rgb(206 212 218 / 5%);
  .container {
    text-align: left;
    // width: 80%;
    max-width: 42rem;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    .header {
    }
    .content {
      .binding {
        display: flex;
        flex-direction: column;
        // gap: 48px;
        margin-bottom: 8px;
        .header {
          @include font(500, 16px);
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          // margin-bottom: 12px;
        }
        .main {
          display: grid;
          background-color: #fff;
          // border: 1px solid #c9c9c9;
          .save {
            // padding: 20px;
          }
          .column {
            display: flex;
            flex-direction: column;
            justify-content: start;
            gap: 12px;
            // padding: 20px;
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
          // border: 1px solid #c9c9c9;
          // padding: 20px;
        }
      }
    }
    .footer {
      margin-top: 40px;
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
