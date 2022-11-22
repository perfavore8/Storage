<template>
  <div class="app_new">
    <div class="container">
      <div class="header"><slot name="title"></slot></div>
      <div class="content">
        <div class="label_input">
          <label class="label">Название:</label>
          <input
            type="text"
            v-model="name"
            class="input"
            :class="{ not_valid: try_accept && name == '' }"
          />
        </div>
        <div class="label_input">
          <label class="label">Google ID файла:</label>
          <input
            type="text"
            v-model="file"
            class="input"
            :class="{ not_valid: try_accept && file == '' }"
          />
        </div>
        <div class="label_input">
          <label class="label">Этап авто-генерации:</label>
          <selector-vue
            :options_props="pipelines_options"
            @select="select_pipelines_option"
            :selected_option="status_id"
          />
        </div>
        <div class="label_input">
          <label class="label">Url последнего документа:</label>
          <selector-vue
            :options_props="lead_fields_options"
            @select="select_lead_fields_options"
            :selected_option="url_field"
          />
        </div>
        <div class="label_input">
          <label class="label">Тип шаблона:</label>
          <selector-vue
            :options_props="type_options"
            @select="option_select1"
            :selected_option="type"
          />
        </div>
        <div class="label_input">
          <label class="label">Тип для скачивания:</label>
          <selector-vue
            :options_props="export_type_options"
            @select="option_select2"
            :selected_option="export_type"
          />
        </div>
      </div>
      <div class="footer">
        <btns-save-close @close="close_modal" @save="save" />
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { nextTick } from "@vue/runtime-core";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  props: {
    cur_doc: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    id: {
      type: Number,
      required: false,
      default() {
        return null;
      },
    },
  },
  emits: { close: null },
  data() {
    return {
      type_options: [],
      type: { name: "docx", value: 1 },
      export_type_options: [],
      export_type: { name: "Исходный", value: 1 },
      lead_fields_options: [],
      pipelines_options: [],
      try_accept: false,
      name: "",
      file: "",
      status_id: { name: "Не выбрано", value: 1 },
      url_field: { name: "Не выбрано", value: 1 },
    };
  },
  mounted() {
    this.$store.state.documents.config.types.forEach((val, idx) =>
      this.type_options.push({ name: val, value: idx })
    );
    this.$store.state.documents.config.export_type.forEach((val, idx) =>
      this.export_type_options.push({ name: val, value: idx })
    );
    this.set_pipelines_options();
    this.set_lead_fields_options();
    nextTick(() => this.add_cur_doc());
  },
  methods: {
    save() {
      this.try_accept = true;
      if (this.name != "" && this.file != "") {
        const new_doc = {
          name: this.name,
          file: this.file,
          type: this.type.name,
          export_type: this.export_type.name,
          status_id: this.status_id.value,
          url_field: this.url_field.value,
        };
        if (Object.keys(this.cur_doc).length > 0) {
          this.$store.dispatch("update_template", { ...new_doc, id: this.id });
        } else {
          this.$store.dispatch("add_template", new_doc);
        }
        this.close_modal();
      }
    },
    close_modal() {
      this.$emit("close");
    },
    option_select1(option) {
      Object.assign(this.type, option);
    },
    option_select2(option) {
      Object.assign(this.export_type, option);
    },
    select_pipelines_option(option) {
      Object.assign(this.status_id, option);
    },
    select_lead_fields_options(option) {
      Object.assign(this.url_field, option);
    },
    add_cur_doc() {
      if (Object.keys(this.cur_doc).length > 0) {
        this.name = this.cur_doc.name;
        this.file = this.cur_doc.file;
        const serch_selected_item = (options, name, value) => {
          let obj = {};
          options.forEach((val) => {
            if (val[value] == name) {
              Object.assign(obj, val);
            }
          });
          return obj;
        };
        this.type = serch_selected_item(
          this.type_options,
          this.cur_doc.type,
          "name"
        );
        this.status_id = serch_selected_item(
          this.pipelines_options,
          this.cur_doc.status_id,
          "value"
        );
        this.url_field = serch_selected_item(
          this.lead_fields_options,
          this.cur_doc.url_field,
          "value"
        );
        this.export_type = serch_selected_item(
          this.export_type_options,
          this.cur_doc.export_type,
          "name"
        );
      }
    },
    set_pipelines_options() {
      const pipelines = Object.entries(
        this.$store.state.documents.config.pipelines
      );
      pipelines.forEach((val) => {
        const idx = val[0];
        const optgroup = val[1].name;
        this.pipelines_options.push({ name: optgroup, value: "optgroup" });
        const list = Object.entries(val[1].statuses);
        list.forEach((pip) =>
          this.pipelines_options.push({
            name: pip[1],
            value: idx + "_" + pip[0],
            optgroup: true,
          })
        );
      });
    },
    set_lead_fields_options() {
      const pipelines = Object.entries(
        this.$store.state.documents.config.lead_fields
      );
      pipelines.forEach((val) => {
        const optgroup = val[0];
        this.lead_fields_options.push({ name: optgroup, value: "optgroup" });
        const list = Object.entries(val[1]);
        list.forEach((pip) =>
          this.lead_fields_options.push({
            name: pip[1],
            value: pip[0],
            optgroup: true,
          })
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app_new {
  pointer-events: all;
  z-index: 60;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .container {
    width: 500px;
    background-color: #fff;
    background: #f5f5f5;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 50px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      padding: 16px;
      @include font(500, 20px);
      border-bottom: 1px solid #dee2e6;
    }
    .content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      .label_input {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .v-select {
          width: calc(100% - 26px) !important;
        }
        .input {
          width: calc(100% - 26px);
          min-width: 50%;
          height: 20px;
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
        .not_valid {
          border: 1px solid #ff0000 !important;
        }
        .not_valid:focus {
          box-shadow: 0 0 0 4px rgb(255 0 0 / 25%) !important;
        }
      }
    }
    .footer {
      border-top: 1px solid #dee2e6;
      padding: 16px;
      display: flex;
      justify-content: end;
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
</style>
