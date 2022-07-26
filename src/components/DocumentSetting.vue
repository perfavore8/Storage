<template>
  <document-setting-add-new
    v-if="showAddNew"
    :cur_doc="cur_doc"
    :idx="selected_doc_idx"
    @close="close_add_new"
    @save_new_doc="save_new_doc"
    @save_cur_doc="save_cur_doc"
  >
    <template v-slot:title>
      <span v-if="selected_doc_idx === null">
        Добавление шаблона документов
      </span>
      <span v-if="selected_doc_idx !== null">
        Редактирование шаблона документов
      </span>
    </template>
  </document-setting-add-new>
  <document-setting-fields
    v-if="showFields"
    @close="close_fields"
  ></document-setting-fields>
  <div class="app" ref="app" @click="show_settings ? close_settings() : null">
    <div class="container">
      <div class="header">
        <div class="left">
          <div class="title">Настройки документов</div>
          <div class="autorization">
            Вы авторизированы в сервисе Google Drive как "{{ name }}".
            <button>Выйти</button>
          </div>
        </div>
        <div class="right">
          <button
            class="settings_btn"
            @click.stop="open_close_settings()"
          ></button>
          <transition name="modal">
            <div v-show="show_settings" class="modal_settings">
              <a>
                <div class="modal_container" @click="open_fields()">
                  Поля шаблонов
                </div>
              </a>
              <a>
                <div class="modal_container" @click="open_edit_stuff()">
                  Обновить поля шаблонов
                </div>
              </a>
            </div>
          </transition>
        </div>
      </div>
      <div class="content">
        <div class="binding">
          <div class="header">Привязка полей документов</div>
          <div class="main">
            <label>Поле "Документы"</label>
            <SelectorVue
              :options_props="options"
              @select="option_select"
              :selected_option="selected_option"
            />
          </div>
        </div>
        <div class="patterns">
          <div class="header">
            <div>Шаблоны документов</div>
            <div class="small">
              Файлы шаблонов должны быть доступны для чтения по ссылке
            </div>
          </div>
          <div class="main">
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
                <tr class="row" v-for="doc in copy_documents" :key="doc">
                  <td class="item">{{ doc.name }}</td>
                  <td class="item">{{ doc.serviceID }}</td>
                  <td class="item">
                    <a
                      href="https://docs.google.com/spreadsheets/d/13U76ujSjV_iaY0L2WBVHVw7q07TSEqstuL0kSeX-Sh8/edit"
                      >{{ doc.gauge }}</a
                    >
                  </td>
                  <td class="item">{{ doc.gouge_type }}</td>
                  <td class="item">{{ doc.download_type }}</td>
                  <td class="item">
                    <div class="btns">
                      <button class="btn_edit" @click="open_edit(doc)">
                        <div class="icon"></div>
                      </button>
                      <button class="btn_del" @click="delete_cur_doc(doc)">
                        <div class="icon"></div>
                      </button>
                    </div>
                  </td>
                </tr>
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
        <div class="btns">
          <button class="btn btn1" @click="close()">Отмена</button>
          <button class="btn btn2" @click="save()">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import DocumentSettingAddNew from "@/components/DocumentSettingAddNew.vue";
import DocumentSettingFields from "@/components/DocumentSettingFields.vue";
// import { nextTick } from "@vue/runtime-core";
import { mapGetters } from "vuex";
export default {
  components: {
    SelectorVue,
    DocumentSettingAddNew,
    DocumentSettingFields,
  },
  data() {
    return {
      name: "Дмитрий Ивлев",
      title: [
        "Название",
        "Google ID файла",
        "Шаблон",
        "Тип шаблона",
        "Тип для скачивания",
      ],
      options: [
        { name: "Не выбрано", value: 1 },
        { name: "Прибыль", value: 2 },
        { name: "Бюджет общий", value: 3 },
      ],
      selected_option: { name: "Не выбрано", value: 1 },
      showAddNew: false,
      showFields: false,
      show_settings: false,
      cur_doc: {},
      selected_doc_idx: null,
      copy_documents: [],
    };
  },
  computed: {
    ...mapGetters(["documents"]),
  },
  mounted() {
    this.copy_documents = [];
    this.copy_documents = this.copy_documents.concat(this.documents);
  },
  methods: {
    close() {
      this.copy_documents = [];
      this.$emit("close", false);
    },
    save() {
      this.$store.commit("save_docs", this.copy_documents);
      this.close();
    },
    // FIXME 1 сделать копию и отдельную переменну option_select
    option_select(option) {
      Object.assign(this.selected_option, option);
    },
    open_edit(doc) {
      Object.assign(this.cur_doc, doc);
      this.selected_doc_idx = this.copy_documents.indexOf(doc);
      this.open_add_new();
    },
    open_modal() {
      this.$refs.app.style.pointerEvents = "none";
      this.$refs.app.style.filter = "blur(5px)";
    },
    close_modal() {
      this.$refs.app.style.pointerEvents = "all";
      this.$refs.app.style.filter = "none";
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
    save_new_doc(new_doc) {
      this.copy_documents.push(
        Object.assign(new_doc, { gauge: "редактировать" })
      );
    },
    save_cur_doc(cur_doc, idx) {
      Object.assign(this.copy_documents[idx], cur_doc);
    },
    delete_cur_doc(cur_doc) {
      const idx = this.copy_documents.indexOf(cur_doc);
      this.copy_documents.splice(idx, 1);
    },
    open_close_settings() {
      this.show_settings = !this.show_settings;
    },
    close_settings() {
      this.show_settings = false;
    },
    open_fields() {
      this.showFields = true;
      this.open_modal();
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
  z-index: 50;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .container {
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
            .modal_container {
              width: 100%;
              display: flex;
              align-items: center;
              text-align: left;
              height: 30px;
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
        margin-bottom: 20px;
        .header {
          @include font(500, 16px);
        }
        .main {
          display: flex;
          flex-direction: row;
          gap: 30%;
          background-color: #fff;
          border: 1px solid #c9c9c9;
          padding: 20px;
        }
      }
      .patterns {
        .header {
          @include font(500, 16px);
          .small {
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
                padding-bottom: 20px !important;
              }
            }
            .title:last-child {
              .item {
                max-width: 101px;
                width: 0.1%;
              }
            }
            .row:nth-child(odd) {
              background-color: rgba(0, 0, 0, 0.05);
            }
            .row {
              .item {
                padding: 10px 5px;
                border: 1px solid #c9c9c9;
                text-align: left;
              }
              .btns {
                display: flex;
                flex-direction: row;
                justify-content: center;
                button {
                  height: 34px;
                  width: 34px !important;
                  margin: 0 auto;
                  cursor: pointer;
                  border: none;
                  border-radius: 4px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: background-color 0.15s ease-in-out,
                    box-shadow 0.15s ease-in-out;
                  margin: 0;
                }
                .btn_edit {
                  background-color: #4e964d;
                  border-radius: 5px 0 0 5px;
                  .icon {
                    width: inherit;
                    height: inherit;
                    @include bg_image("@/assets/pencil.svg", 80% 80%);
                  }
                }
                .btn_edit:hover {
                  background-color: #60ba5e;
                  box-shadow: 0 0 5px 2px rgb(96 186 94 / 25%);
                }
                .btn_del {
                  background: #dc3545;
                  border-radius: 0 5px 5px 0;
                  .icon {
                    width: inherit;
                    height: inherit;
                    @include bg_image("@/assets/cross.svg", 80% 80%);
                  }
                }
                .btn_del:hover {
                  background-color: #f53d50;
                  box-shadow: 0 0 5px 2px rgb(245 61 80 / 25%);
                }
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
              width: 34px;
              height: 34px;
              color: #fff;
              background: #4e964d;
              border: none;
              border-radius: 5px;
              .icon {
                width: inherit;
                height: inherit;
                margin: -1px 0 0 -5px;
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
      .btns {
        display: flex;
        flex-direction: row;
        gap: 10px;

        .btn {
          cursor: pointer;
          padding: 6px 12px;
          height: 36px;
          border: none;
          @include font(400, 16px);
          border-radius: 5px;
          transition: background-color 0.15s ease-in-out,
            box-shadow 0.15s ease-in-out;
        }
        .btn1 {
          color: #fff;
          background-color: #6c757d;
        }
        .btn1:hover {
          background-color: #5f676d;
          box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
        }
        .btn2 {
          color: #fff;
          background-color: #0d6efd;
        }
        .btn2:hover {
          background-color: #0256d4;
          box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
        }
      }
    }
  }
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
