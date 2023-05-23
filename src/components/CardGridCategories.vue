<template>
  <div class="mb-6">
    <div class="links">
      <button
        class="triangle"
        :class="{
          triangle_last:
            !categories.filteredList.length &&
            categories.selected.length - 1 == idx,
        }"
        :disabled="categories.selected.length - 1 == idx"
        v-for="(cat, idx) in categories.selected"
        :key="cat"
        @click="categories.select(cat)"
      >
        {{ cat?.name }}
      </button>
    </div>
    <div class="path">
      <div class="categories sls_grid">
        <div
          class="card"
          v-for="cat in categories.filteredList"
          :key="cat"
          @click="categories.select(cat)"
        >
          <div class="sls_row title">
            <div class="name"></div>
            <div class="value">{{ cat.name }}</div>
          </div>
          <div class="sls_row" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
export default {
  emits: { selectCat: null },
  setup(props, context) {
    const categories = reactive({
      selected: [],
      list: [],
      filteredList: computed(() =>
        categories.list.filter(
          (cat) => cat.parent_id === categories.selected.at(-1).id
        )
      ),
      select: function (cat) {
        const index = this.selected.indexOf(cat);
        index == -1 ? this.selected.push(cat) : this.selected.splice(index + 1);
        context.emit("selectCat", this.selected.at(-1));
      },
      getList: async function () {
        this.list = await store.dispatch("get_fields_properties");
        const baseCat = this.list.find((cat) => cat.parent_id === 0);
        this.selected.push(baseCat);
      },
    });

    onMounted(() => {
      categories.getList();
    });

    return { categories };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.sls_grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  @include font(400, 14px);
  .text {
    margin: 0 auto;
    @include font(500, 18px);
  }
  .skeleton {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

    @keyframes pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
    .title {
      height: 30px;
      background-color: #d1d5db;
      border-radius: 9999px;
      margin-bottom: 10px;
      width: 70% !important;
      padding: 0 !important;
    }
    .rows {
      min-height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .sls_row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px dotted #c9c9c9;
      padding-top: 5px;
      padding-bottom: 5px;
      .name,
      .value {
        text-align: start;
        height: 14px;
        background-color: #d1d5db;
        border-radius: 9999px;
      }
      .value {
        text-align: end;
      }
    }
    .sls_row:nth-child(1) {
      .name {
        width: 23%;
      }
      .value {
        width: 15%;
      }
    }
    .sls_row:nth-child(2) {
      .name {
        width: 48%;
      }
      .value {
        width: 6%;
      }
    }
    .sls_row:nth-child(3) {
      .name {
        width: 29%;
      }
      .value {
        width: 41%;
      }
    }
    .sls_row:nth-child(4) {
      .name {
        width: 4%;
      }
      .value {
        width: 50%;
      }
    }
    .sls_row:nth-child(5) {
      .name {
        width: 37%;
      }
      .value {
        width: 9%;
      }
    }
    .sls_row:nth-child(6) {
      .name {
        width: 42%;
      }
      .value {
        width: 19%;
      }
    }
    .sls_row:nth-child(7) {
      .name {
        width: 23%;
      }
      .value {
        width: 39%;
      }
    }
    .card_footer {
      display: flex;
      flex-direction: row;
      gap: 16px;
      .btn_del {
        color: #d1d5db;
        background-color: #d1d5db;
        width: 100%;
      }
    }
  }
  .card {
    min-width: 178px;
    width: calc(50% - 58px);
    border: 1px solid #c9c9c9;
    border-radius: 5px;
    padding: 20px;
    .rows::-webkit-scrollbar {
      display: none;
    }
    .rows {
      max-height: 220px;
      overflow: auto;
    }
    .sls_row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px dotted #c9c9c9;
      padding-top: 5px;
      .name {
        max-width: 50%;
        text-align: start;
      }
      .value {
        text-align: end;
      }
      .value:first-child {
        display: none;
      }
    }
    .title {
      justify-content: center;
      @include font(500, 18px);
      padding: 20px 0;
      width: 100%;
      .name {
        display: none;
      }
      .value {
        text-align: center;
      }
    }
  }
}
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  .card {
    cursor: pointer;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 12px 18px;
    .sls_row {
      width: 100%;
      .value {
        text-align: center;
      }
    }
    .title {
      padding: 0;
    }
    .sls_row:first-child {
      border-bottom: none;
      height: 100%;
      .value {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        line-clamp: 2;
        -webkit-box-orient: vertical;
        min-height: 54px;
      }
    }
  }
}
.links {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  $step: 12px;

  .triangle {
    cursor: pointer;
    padding: 5px 10px 5px 15px;
    height: 30px;
    margin: 5px 0;
    border: none;
    @include font(400, 15px);
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%,
      $step 50%
    );
    display: flex;
    justify-content: start;
    align-items: center;
    color: #000;
  }
  .triangle:hover {
    padding: 5px 12px 5px 17px;
    margin-left: -2px;
    margin-right: -2px;
    background: #e6e6e6 !important;
  }
  .triangle:disabled {
    cursor: default;
  }
  .triangle:first-child:hover {
    margin-left: 0;
  }
  .triangle_last {
    cursor: default;
    color: #fff;
    background: rgba(27, 53, 70, 0.9) !important;
  }
  .triangle_last:hover {
    background: rgba(27, 53, 70, 0.8) !important;
  }
  .triangle_last:active {
    background: rgba(27, 53, 70, 0.6) !important;
  }
  .triangle:active {
    background: #d6d6d6;
  }

  .triangle:nth-child(3n + 1) {
    background: linear-gradient(45deg, hsl(0, 0%, 90%), hsl(0, 0%, 84%));
  }
  .triangle:nth-child(3n + 2) {
    background: linear-gradient(
      45deg,
      hsl(0, 0%, 84%),
      hsl(0, 0%, 83%),
      hsl(0, 0%, 84%)
    );
  }
  .triangle:nth-child(3n + 3) {
    background: linear-gradient(45deg, hsl(0, 0%, 84%), hsl(0, 0%, 90%));
  }
  .triangle:first-child {
    padding-left: 5px;
    -webkit-clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
    clip-path: polygon(
      0 0,
      calc(100% - $step) 0,
      100% 50%,
      calc(100% - $step) 100%,
      0% 100%
    );
  }
}
</style>
