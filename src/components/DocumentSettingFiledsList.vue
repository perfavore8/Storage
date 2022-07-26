<template>
  <div class="list">
    <div class="row" v-for="row in list" :key="row">
      <div class="title">{{ row.title }}</div>
      <div class="fields">
        <button
          class="field"
          v-for="field in row.fields"
          :key="field"
          @click="copy(field.value)"
        >
          {{ field.name }}
        </button>
        <span v-show="false"></span>
      </div>
    </div>
  </div>
</template>

<script>
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
          alert("Текст скопирован удачно");
        })
        .catch(() => {
          alert(
            "Текст не скопирован автоматически :с" + "\n" + "Попробуйте вручную"
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
