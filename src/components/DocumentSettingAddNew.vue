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
            v-model="serviceID"
            class="input"
            :class="{ not_valid: try_accept && serviceID == '' }"
          />
        </div>
        <div class="label_input">
          <label class="label">Тип шаблона:</label>
          <selector-vue
            :options_props="options1"
            @select="option_select1"
            :selected_option="gouge_type"
          />
        </div>
        <div class="label_input">
          <label class="label">Тип для скачивания:</label>
          <selector-vue
            :options_props="options2"
            @select="option_select2"
            :selected_option="download_type"
          />
        </div>
      </div>
      <div class="footer">
        <div class="btns">
          <button class="btn btn1" @click="close_modal()">Отмена</button>
          <button class="btn btn2" @click="save()">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorVue from "@/components/SelectorVue.vue";
import { nextTick } from "@vue/runtime-core";
export default {
  components: {
    SelectorVue,
  },
  props: {
    cur_doc: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    idx: {
      type: Number,
      required: false,
      default() {
        return null;
      },
    },
  },
  emits: { save_new_doc: null, close: null, save_cur_doc: null },
  data() {
    return {
      options1: [
        { name: "docx", value: 1 },
        { name: "xlsx", value: 2 },
      ],
      gouge_type: { name: "docx", value: 1 },
      options2: [
        { name: "Исходный", value: 1 },
        { name: "pdf", value: 2 },
      ],
      download_type: { name: "Исходный", value: 1 },
      try_accept: false,
      name: "",
      serviceID: "",
    };
  },
  mounted() {
    nextTick(() => this.add_cur_doc());
  },
  methods: {
    save() {
      this.try_accept = true;
      if (this.name != "" && this.serviceID != "") {
        const new_doc = {
          name: this.name,
          serviceID: this.serviceID,
          gouge_type: this.gouge_type.name,
          download_type: this.download_type.name,
        };
        if (Object.keys(this.cur_doc).length > 0) {
          this.$emit("save_cur_doc", new_doc, this.idx);
        } else {
          this.$emit("save_new_doc", new_doc);
        }
        this.close_modal();
      }
    },
    close_modal() {
      this.name = "";
      this.serviceID = "";
      this.$emit("close");
    },
    option_select1(option) {
      Object.assign(this.gouge_type, option);
    },
    option_select2(option) {
      Object.assign(this.download_type, option);
    },
    add_cur_doc() {
      if (Object.keys(this.cur_doc).length > 0) {
        this.name = this.cur_doc.name;
        this.serviceID = this.cur_doc.serviceID;
        const serch_selected_item = (options, name) => {
          let obj = {};
          options.forEach((val) => {
            if (val.name == name) {
              Object.assign(obj, val);
            }
          });
          return obj;
        };
        this.gouge_type = serch_selected_item(
          this.options1,
          this.cur_doc.gouge_type
        );
        this.download_type = serch_selected_item(
          this.options2,
          this.cur_doc.download_type
        );
      }
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
