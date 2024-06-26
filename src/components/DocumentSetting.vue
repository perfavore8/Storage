<template>
  <document-setting-add-new
    v-if="showAddNew"
    :cur_doc="cur_doc"
    :id="selected_doc_id"
    @close="close_add_new"
    @save_new_doc="save_new_doc"
    @save_cur_doc="save_cur_doc"
  >
    <template v-slot:title>
      <span v-if="selected_doc_id === null">
        {{ $t("DocumentSetting.templAdd") }}
      </span>
      <span v-if="selected_doc_id !== null">
        {{ $t("DocumentSetting.templChange") }}
      </span>
    </template>
  </document-setting-add-new>
  <DocumentSettingFieldsV2
    v-if="showFields"
    @close="close_fields"
  ></DocumentSettingFieldsV2>
  <div class="app" ref="app" @click="show_settings ? close_settings() : null">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container">
      <div class="header">
        <div class="left">
          <div class="title">{{ $t("DocumentSetting.header") }}</div>
          <div class="autorization" v-if="account.is_google_auth">
            {{
              $t("DocumentSetting.googleAuth", {
                name: account.google_user_name,
              })
            }}
            <button @click="unAutorization()">
              {{ $t("DocumentSetting.exit") }}
            </button>
          </div>
          <div class="autorization" v-else>
            {{ $t("DocumentSetting.googleNotAuth") }}
            <button @click="autorization()">
              {{ $t("DocumentSetting.enter") }}
            </button>
          </div>
          <a
            :href="
              'https://drive.google.com/drive/folders/' +
              account.config.google_folder_id
            "
            target="blank"
            class="a"
            v-if="account.config?.google_folder_id"
            >{{ $t("DocumentSetting.folder") }}</a
          >
        </div>
        <div class="right">
          <button
            class="settings_btn"
            @click.stop="open_close_settings()"
          ></button>
          <transition name="modal">
            <div v-show="show_settings" class="modal_settings">
              <a>
                <div
                  class="modal_container"
                  @click="open_fields()"
                  :class="{ disable: disable_fields_templates }"
                >
                  {{ $t("DocumentSetting.templFields") }}
                </div>
              </a>
              <a>
                <div class="modal_container" @click="refresh_fields()">
                  {{ $t("DocumentSetting.templUpdate") }}
                </div>
              </a>
            </div>
          </transition>
        </div>
      </div>
      <div class="content">
        <div class="patterns">
          <div class="header">
            <div>{{ $t("DocumentSetting.templDocs") }}</div>
            <p class="small">
              {{ $t("DocumentSetting.templDocsText") }}
            </p>
          </div>
          <AppTablePreloader :titles="title" v-if="isDataLoading" />
          <div class="main" :class="{ hiden: isDataLoading }" v-else>
            <table class="table">
              <thead>
                <tr class="row title">
                  <td class="item" v-for="tit in title" :key="tit">
                    {{ tit }}
                  </td>
                  <td class="item"></td>
                </tr>
              </thead>
              <tbody>
                <document-setting-doc-row
                  v-for="doc in documents_templates"
                  :key="doc.id"
                  :doc="doc"
                  @open_edit="open_edit"
                  @delete_cur_doc="delete_cur_doc"
                />
              </tbody>
            </table>
            <div class="add_button_container">
              <button class="add_new_button" @click="open_add_new()">
                <div class="icon"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <btns-save-close @close="close" :show_save="false">
          <template v-slot:close>{{ $t("global.back") }}</template>
        </btns-save-close>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentSettingAddNew from "@/components/DocumentSettingAddNew.vue";
import DocumentSettingFieldsV2 from "@/components/DocumentSettingFieldsV2.vue";
import DocumentSettingDocRow from "@/components/DocumentSettingDocRow.vue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
import AppTablePreloader from "./AppTablePreloader.vue";

const { t } = useLangConfiguration();

export default {
  components: {
    DocumentSettingAddNew,
    DocumentSettingFieldsV2,
    DocumentSettingDocRow,
    BtnsSaveClose,
    AppTablePreloader,
  },
  setup() {
    return { t };
  },
  data() {
    return {
      name: "",
      title: [
        t("DocumentSetting.titles.name"),
        t("DocumentSetting.titles.GID"),
        t("DocumentSetting.titles.temp"),
        t("DocumentSetting.titles.typeTemp"),
        t("DocumentSetting.titles.typeDown"),
      ],
      lead_fields_options: [],
      lead_fields: { name: t("global.notSelected"), value: 1 },
      contact_name_type_options: [],
      contact_name_type: { name: t("global.notSelected"), value: -1 },
      showAddNew: false,
      showFields: false,
      show_settings: false,
      cur_doc: {},
      selected_doc_id: null,
      copy_documents: [],
      disable_fields_templates: false,
      hook_download: "",
      hook_generate_doc: "",
    };
  },
  computed: {
    documents_templates() {
      return this.$store.state.documents.templates;
    },
    account() {
      return this.$store.state.account.account;
    },
    leadFieldsList() {
      const list = [];
      Object.entries(this.$store.state.account.leadFieldsList).map((val) => {
        const arr = [];
        Object.entries(val[1].fields).forEach((stat) =>
          arr.push({ name: stat[1], value: stat[0] })
        );
        val[1].fields = arr;
        val[1].fields.unshift({ name: t("global.notSelected"), value: -1 });
        val[1].selected = { name: t("global.notSelected"), value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
    isDataLoading() {
      return this.$store.state.documents.isloadingDocumentsList;
    },
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("get_documents_v2"),
      this.$store.dispatch("get_account"),
      this.$store.dispatch("getLeadFieldsList"),
    ]);
    this.copyLeadFieldsList = this.leadFieldsList;
    this.hook_download = this.account.config?.hook_download;
    this.hook_generate_doc = this.account.config?.hook_generate_doc;
    this.set_lead_fields_options();
    this.set_contact_name_type_options();
  },
  methods: {
    async autorization() {
      let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=450,height=600,left=500,top=200`;
      const url = await this.$store.dispatch("getGoogleAuthUrl");
      const windowAutorization = window.open(
        url,
        t("DocumentSetting.autoGen"),
        params
      );
      const interval = setInterval(() => {
        if (windowAutorization.closed) {
          clearInterval(interval);
          this.$store.dispatch("get_account");
        }
      }, 1000);
    },
    async unAutorization() {
      await this.$store.dispatch("googleLogOut");
      this.$store.dispatch("get_account");
    },
    save() {
      this.$store.dispatch("update_account", {
        hook_download: this.hook_download,
        hook_generate_doc: this.hook_generate_doc,
        field_docs: this.lead_fields.value,
        contact_name_type: this.contact_name_type.value,
      });
    },
    set_lead_fields_options() {
      this.lead_fields_options.push({
        name: t("global.notSelected"),
        value: -1,
      });
      this.copyLeadFieldsList.forEach((val) => {
        const optgroup = val.name;
        this.lead_fields_options.push({ name: optgroup, value: "optgroup" });
        const list = val.fields.splice(1, 999);
        list.forEach((item) =>
          this.lead_fields_options.push({ ...item, optgroup: true })
        );
      });

      this.lead_fields_options.forEach((val) =>
        val.value == this.$store.state.documents.config.field_docs
          ? (this.lead_fields = val)
          : null
      );
    },
    set_contact_name_type_options() {
      this.$store.state.documents.config.contact_name_types?.forEach(
        (val, idx) =>
          this.contact_name_type_options.push({ name: val, value: idx })
      );
      this.contact_name_type_options?.forEach((val) =>
        val.value == this.$store.state.account.account.config.contact_name_type
          ? (this.contact_name_type = val)
          : null
      );
    },
    async refresh_fields() {
      this.disable_fields_templates = true;
      await this.$store.dispatch("refresh_fields");
      this.disable_fields_templates = false;
    },
    close() {
      this.$store.commit("open_close_document_setting", false);
    },
    lead_fields_select(option) {
      this.lead_fields = option;
    },
    contact_name_type_select(option) {
      this.contact_name_type = option;
    },
    open_edit(doc) {
      this.cur_doc = { ...doc };
      this.selected_doc_id = doc.id;
      this.open_add_new();
    },
    open_modal() {
      this.$refs.app.style.pointerEvents = "none";
    },
    close_modal() {
      this.$refs.app.style.pointerEvents = "all";
    },
    open_add_new() {
      this.showAddNew = true;
      this.open_modal();
    },
    close_add_new() {
      this.showAddNew = false;
      this.cur_doc = {};
      this.close_modal();
    },
    open_close_settings() {
      this.show_settings = !this.show_settings;
    },
    close_settings() {
      this.show_settings = false;
    },
    open_fields() {
      if (!this.disable_fields_templates) {
        this.showFields = true;
        this.open_modal();
      }
    },
    close_fields() {
      this.showFields = false;
      this.close_modal();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  pointer-events: all;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .backdrop_with_filter {
    z-index: 240;
  }
  .container {
    position: relative;
    z-index: 250;
    max-width: 1200px;
    background-color: #fff;
    background: #f5f5f5;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    > .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 50px 10px;
      border-bottom: 2px solid #dee2e6;
      .left {
        display: flex;
        flex-direction: column;
        .title {
          @include font(500, 28px);
        }
        .autorization {
          @include font(400, 16px);
          button {
            margin-left: 10px;
            @include font(400, 14px);
            cursor: pointer;
            color: #000;
            background-color: #ffca2c;
            border: none;
            border-radius: 4px;
            height: 30px;
            width: 60px;
          }
          button:hover {
            background-color: rgb(255, 191, 0);
            box-shadow: 0 0 5px 2px rgb(255 191 0 / 25%);
          }
        }
      }
      .right {
        position: relative;
        display: inline-flex;
        .settings_btn {
          cursor: pointer;
          width: 20px;
          height: 20px;
          border: none;
          background-color: transparent;
          transition: transform 0.2s ease-in-out;
          @include bg_image("../assets/gear.svg");
        }
        .settings_btn:hover {
          transform: rotate(180deg);
        }
        .modal_settings {
          z-index: 99999;
          display: flex;
          align-items: center;
          flex-direction: column;
          // position: sticky;
          // float: right;
          // margin: 20px 10px 0 0;
          position: absolute;
          inset: 0px auto auto 0px;
          margin: 0px;
          transform: translate(-222px, 25px);
          width: 240px;
          border: 1px solid #c9c9c9;
          border-radius: 4px;
          background: white;
          overflow: hidden;
          a {
            display: flex;
            justify-content: center;
            width: 100%;
            transition: background-color 0.15s ease-in-out;
            .disable {
              user-select: none;
              background-color: #cdcdcd;
              cursor: default !important;
            }
            .modal_container {
              width: 100%;
              display: flex;
              align-items: center;
              text-align: left;
              height: 40px;
              cursor: pointer;
              padding: 5px 15px;
              @include font(400, 16px, 22px);
            }
          }
          a:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px;
      border-bottom: 2px solid #dee2e6;
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
      padding: 15px 50px;
    }
  }
}
.inputhuk {
  width: 50%;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.a {
  color: -webkit-link;
  cursor: pointer;
  text-decoration: underline;
}
</style>
