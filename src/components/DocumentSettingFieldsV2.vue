<template>
  <div class="app_fileds">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container">
      <div class="header">
        <div class="left">
          <label>{{ $t("DocumentSetting.fields.header") }}</label>
        </div>
        <div class="right">
          <button class="btn_del" @click="close()">
            <div class="icon"></div>
          </button>
        </div>
      </div>
      <div class="content">
        <div class="top">
          <div
            v-for="field in tpl_fields"
            :key="field"
            @click="select_catalog(field)"
            class="title"
            :class="{ selected: field.title == selected_catalog }"
          >
            {{ field.title }}
          </div>
        </div>
        <div class="bottom">
          <div class="mt-2">
            <small>{{ description }}</small>
          </div>
          <DocumentSettingFieldsListV2 :list="list" />
        </div>
      </div>
      <div class="footer">
        <button class="btn btn1" @click="close()">
          {{ $t("global.back") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DocumentSettingFieldsListV2 from "@/components/DocumentSettingFieldsListV2.vue";
export default {
  emits: { close: null },
  components: {
    DocumentSettingFieldsListV2,
  },
  data() {
    return {
      selected_catalog: "",
      description: "",
      list: [],
      tpl_fields: [],
    };
  },
  mounted() {
    this.tpl_fields = this.$store.state.documents.config.tpl_fields;
    if (this.tpl_fields[0].title) this.select_catalog(this.tpl_fields[0]);
  },
  computed: {},
  methods: {
    select_catalog(field) {
      this.selected_catalog = field.title;
      this.list = field.list;
      this.description = field.description;
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app_fileds {
  pointer-events: all;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .backdrop_with_filter {
    z-index: 259;
  }
  .container {
    position: relative;
    z-index: 260;
    width: 90%;
    max-width: 1200px;
    background-color: #fff;
    background: #f5f5f5;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 90px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 30px 10px;
      border-bottom: 2px solid #dee2e6;
      @include font(500, 20px);
      .right {
        .btn_del {
          background: transparent;
          border-radius: 0 5px 5px 0;
          height: 30px;
          width: 30px;
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
          margin-right: -10px;
          .icon {
            width: inherit;
            height: inherit;
            transition: transform 0.15s ease-in-out;
            @include bg_image("@/assets/cross_black.svg", 60%);
          }
          .icon:hover {
            transform: rotate(90deg);
          }
        }
      }
    }
    .content {
      @include font(400, 16px);
      padding: 15px 30px 0;
      border-bottom: 2px solid #dee2e6;
      .top {
        width: 100%;
        display: flex;
        flex-direction: row;
        width: calc(100% + 30px);
        margin-left: -30px;
        padding-left: 30px;
        border-bottom: 1px solid #dee2e6;
        .title {
          cursor: pointer;
          padding: 12px;
          border-bottom: 1px solid #dee2e6;
          border-radius: 5px 5px 0 0;
          margin: 0;
          margin-bottom: -1px;
          color: #5f676d;
          transition: color 0.15s ease-in-out, border-bottom 0.15s ease-in-out;
        }
        .title:hover {
          border-bottom: 1px solid #a8b3bd;
          color: #295170;
        }
        .selected {
          padding: 11px 11px 14px;
          color: #000 !important;
          border: 1px solid #dee2e6;
          border-bottom: 1px solid #f5f5f5 !important;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 30px;
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
    }
  }
}
</style>
