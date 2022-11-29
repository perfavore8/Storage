<template>
  <div class="bgc">
    <div class="container">
      <div class="header">
        <h5>Позиции компании "{{ company }}"</h5>
        <button class="btn_del" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="hr" />
      <div class="content">
        <table class="table">
          <thead>
            <tr class="row title">
              <td class="item" v-for="tit in title" :key="tit">
                {{ tit.name }}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              class="row"
              :class="{ row_odd: idx % 2 == 0 }"
              v-for="(item, idx) in list"
              :key="item.id"
            >
              <td class="item" v-for="tit in title" :key="tit">
                {{ item[tit.code] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="hr" />
      <div class="footer">
        <BtnsSaveClose :show_save="false" @close="close" />
      </div>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "./BtnsSaveClose.vue";
export default {
  components: {
    BtnsSaveClose,
  },
  props: {
    title: {
      type: Array,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
* {
  box-sizing: border-box;
}
.bgc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1005;
  .container {
    max-width: 90%;
    margin: 60px auto;
    border: 1px solid #dee2e6;
    background-color: #f5f5f5;
    border-radius: 10px;
    pointer-events: all;
    @include font(400, 16px);
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .header {
      width: 100%;
      padding: 16px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      h5 {
        @include font(500, 20px);
        margin: 0;
      }
      .btn_del {
        background: transparent;
        height: 24px;
        width: 24px;
        padding: 0;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        .icon {
          width: inherit;
          height: inherit;
          transition: transform 0.15s ease-in-out;
          @include bg_image("@/assets/cross_black.svg", 100%);
        }
      }
      .btn_del:hover {
        .icon {
          transform: rotate(90deg);
        }
      }
    }
    .content {
      width: 100%;
      padding: 16px;
      .table {
        border-collapse: collapse;
        width: 100%;
        .title {
          @include font(700, 16px);
          background-color: rgba(0, 0, 0, 0.1) !important;
          .item {
            padding-bottom: 20px !important;
            text-align: center !important;
          }
        }
        .row_odd {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .item {
          padding: 12px 16px;
          border: 1px solid #c9c9c9;
          text-align: left;
        }
      }
    }
    .footer {
      width: 100%;
      padding: 16px;
      display: flex;
      flex-direction: row;
      justify-content: end;
    }
    .hr {
      width: 100%;
      height: 0;
      border: none;
      border-top: 1px solid #dee2e6;
    }
  }
}
</style>
