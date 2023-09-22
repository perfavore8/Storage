<template>
  <div class="list">
    <template v-if="Array.isArray(list)">
      <div class="row" v-for="row in list" :key="row">
        <div class="title">{{ row.title }}</div>
        <div class="mb-2">
          <small>{{ row.description }}</small>
        </div>
        <div class="fields" v-if="row.list">
          <button
            class="field"
            v-for="[value, name] in Object.entries(row.list)"
            :key="value"
            @click="copy(value)"
          >
            {{ name }}
          </button>
          <span v-show="false"></span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="fields">
          <button
            class="field"
            v-for="[value, name] in Object.entries(list)"
            :key="value"
            @click="copy(value)"
          >
            {{ name }}
          </button>
          <span v-show="false"></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { useLangConfiguration } from "@/composables/langConfiguration";

const { t } = useLangConfiguration();

export default {
  props: {
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  methods: {
    copy(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert(t("DocumentSetting.alert"));
        })
        .catch(() => {
          alert(
            t("DocumentSetting.alert2") + "\n" + t("DocumentSetting.alert3")
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.list {
  max-height: 600px;
  overflow-y: auto;
  width: calc(100% + 60px);
  margin-left: -30px;
  .row {
    border-bottom: 2px solid #dee2e6;
    padding: 15px 30px;
    .title {
      @include font(500, 16px);
      margin-bottom: 8px;
    }
    .fields {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;
      .field {
        cursor: pointer;
        padding: 5px 10px;
        border: none;
        @include font(400, 15px);
        border-radius: 5px;
        transition: background-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
        color: #fff;
        background-color: #6c757d;
      }
      .field:hover {
        background-color: #5f676d;
        box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
      }
    }
  }
  .row:last-child {
    border-bottom: none;
  }
}
</style>
