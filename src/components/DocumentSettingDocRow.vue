<template>
  <tr class="row">
    <td class="item">{{ doc.name }}</td>
    <td class="item file">{{ doc.file }}</td>
    <td class="item">
      <a :href="getHref(doc.file, doc.type)" target="blank">
        {{ $t("DocumentSetting.docRow.templ") }}
      </a>
    </td>
    <td class="item">{{ doc.type }}</td>
    <td class="item">{{ doc.export_type }}</td>
    <td class="item" v-if="isTest || isTest3">
      {{ doc.is_public ? $t("global.yes") : $t("global.no") }}
    </td>
    <td class="item">
      <div class="btns">
        <button class="btn_edit" @click="open_edit(doc)">
          <div class="icon"></div>
        </button>
        <button
          class="btn_del"
          @click="LB('del' + doc.id, delete_cur_doc(doc.id))"
          :disabled="IBL('del' + doc.id)"
        >
          <div class="icon"></div>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { isTest, isTest3 } from "@/composables/isTest";
import { useLockBtnByKey } from "@/composables/lockBtnByKey";
export default {
  props: {
    doc: {
      type: Object,
      required: true,
    },
  },
  emits: { open_edit: null, delete_cur_doc: null },
  setup() {
    const { lockBtn: LB, isBtnLocked: IBL } = useLockBtnByKey();
    return { LB, IBL, isTest, isTest3 };
  },
  methods: {
    open_edit(doc) {
      this.$emit("open_edit", doc);
    },
    async delete_cur_doc(id) {
      await this.$store.dispatch("delete_template", { id: id });
    },
    getHref(GId, type) {
      let res = "#";
      if (type == "docx")
        res = `https://docs.google.com/document/d/${GId}/edit`;
      if (type == "xlsx")
        res = `https://docs.google.com/spreadsheets/d/${GId}/edit`;
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.row:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}
.row {
  .file {
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }
  .item {
    padding: 10px 5px;
    border: 1px solid #c9c9c9;
    text-align: left;
    > a {
      color: -webkit-link;
      cursor: pointer;
      text-decoration: underline;
    }
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
        @include bg_image("@/assets/pencil.svg", 50%);
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
        @include bg_image("@/assets/cross.svg", 50%);
      }
    }
    .btn_del:hover {
      background-color: #f53d50;
      box-shadow: 0 0 5px 2px rgb(245 61 80 / 25%);
    }
  }
}
</style>
