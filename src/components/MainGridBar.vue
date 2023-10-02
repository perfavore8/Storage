<template>
  <tr class="bar_row">
    <th class="bar_item item" v-if="!oneC">
      <input
        type="checkbox"
        class="checkbox"
        id="all"
        v-model="allSelectedProducts"
        @change="changeAllSelectedProducts()"
      />
      <label for="all"></label>
    </th>
    <th class="bar_item item" v-if="isTest" />
    <th
      class="bar_item item"
      :style="{
        minWidth:
          width[idx] != 0
            ? width[idx] + 'px'
            : (collsCount >= 8 ? 100 : collsCount > 3 ? 90 : 80) / collsCount +
              '%',
      }"
      v-for="(field, idx) in sortedFields"
      @click="field[1].sortable && field[1].type != 9 ? sort(field[0]) : null"
      :key="field"
    >
      <div class="bar_item_group">
        <label>{{ field[1].name }}</label>
        <button
          class="bar_item_icon"
          :class="{
            bar_item_icon_up:
              order.code === field[0] && order.prev_order === 'desc',
            bar_item_icon_down:
              order.code === field[0] && order.prev_order === 'asc',
          }"
          v-if="field[1].sortable && field[1].type != 9"
        ></button>
      </div>
    </th>
    <th class="bar_item item" style="min-width: 80px">
      <div v-if="!(isTest && !currentSetSettingsInFolder.tableSettingsBtn)">
        <button
          class="settings_btn"
          @click="openTableSettings()"
          v-if="isMain || isTest || true"
          :title="t('ostatki.nt')"
        >
          <span class="material-icons"> settings </span>
        </button>
        <button
          class="test_btn"
          :title="t('ostatki.ex')"
          :disabled="disableExportXlsx"
          @click="exportXlsx()"
        >
          <span class="material-icons-outlined"> upload_file </span>
        </button>
      </div>
    </th>
  </tr>
</template>

<script>
import { useNotification } from "@/composables/notification";
import store from "@/store";
import { computed } from "@vue/reactivity";
import { reactive, ref } from "vue";
import { isTest } from "@/composables/isTest";
import { useRoleSettings } from "@/composables/roleSettings";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  props: {
    fields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    sortedFields: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    tableConfig: {
      type: Object,
    },
  },
  setup(props, context) {
    const { currentSetSettingsInFolder } = useRoleSettings("products");
    const { t } = useLangConfiguration();

    const order = reactive({
      code: "",
      prev_order: "",
    });
    const dropOrder = () => {
      Object.assign(order, {
        code: "",
        prev_order: "",
      });
    };
    const sort = (code) => {
      const order_values = ["asc", "desc"];
      let new_order = "";
      order.code === code && order.prev_order == order_values[0]
        ? (new_order = order_values[1])
        : (new_order = order_values[0]);
      Object.assign(order, { code: code, prev_order: new_order });
      if (code.split(".").length > 1) code = code.split(".").join("->");
      context.emit("sort", code, new_order);
    };

    const collsCount = computed(() => props.tableConfig.length);
    const oneC = computed(() => store.state.account.account?.config?.g_enabled);
    const width = computed(() => {
      let arr = [];
      props.fields.forEach((field) => {
        let a = 0;
        if (field.type == 9) a = 90;
        if (field.type == 7 || field.type == 8) a = 150;
        arr.push(a);
      });

      return arr;
    });

    const { addNotification } = useNotification();
    const productsParams = computed(() => store.state.products.productsParams);
    const disableExportXlsx = ref(false);
    const exportXlsx = async () => {
      disableExportXlsx.value = true;
      const {
        sort,
        filter,
        warehouse = "",
        is_service = 0,
      } = productsParams.value;
      const sortedTableConfig = [];
      Object.entries(props.tableConfig)
        .filter((val) => val[1].visible)
        .sort((a, b) => {
          if (a[1].sort > b[1].sort) return 1;
          if (a[1].sort == b[1].sort) return 0;
          if (a[1].sort < b[1].sort) return -1;
        })
        .forEach((val) => sortedTableConfig.push(val[0]));
      const params = {
        sort: sort,
        filter: filter,
        config: sortedTableConfig,
        warehouse: warehouse,
        is_service: is_service,
      };
      store.dispatch("exportXlsx", params);
      addNotification(0, t("ostatki.taskH"), t("ostatki.taskT"));
      // const blob = await store.dispatch("exportXlsx", params);
      // const file = window.URL.createObjectURL(blob);
      // window.location.assign(file);
      disableExportXlsx.value = false;
    };

    const allSelectedProducts = ref(false);
    const changeAllSelectedProducts = () => {
      context.emit("changeAllSelectedProducts", allSelectedProducts.value);
    };
    const dropAllSelectedProducts = () => {
      allSelectedProducts.value = false;
    };

    const openTableSettings = () => {
      store.commit("open_table_settings");
    };

    return {
      order,
      sort,
      collsCount,
      oneC,
      isTest,
      width,
      productsParams,
      disableExportXlsx,
      exportXlsx,
      allSelectedProducts,
      changeAllSelectedProducts,
      dropAllSelectedProducts,
      openTableSettings,
      dropOrder,
      currentSetSettingsInFolder,
      t,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.bar_row {
  height: 66px;
  .item {
    padding: 10px;
    padding-left: 15px;
    border: 1px solid #c9c9c9;
    @include font(400, 14px, 17px);
    color: #3f3f3f;
    text-align: start;
    min-width: 50px;
  }
  .bar_item {
    background: #e5e5e5;
    @include font(500, 16px, 19px);
    color: #000000;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    label {
      cursor: inherit;
    }

    .bar_item_group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;

      .bar_item_icon {
        height: 16px;
        width: 16px;
        background-color: transparent;
        @include bg_image("@/assets/sort.svg");
        border: none;
        cursor: pointer;
        transition: all 0.2s ease-out;
        &_up {
          @include bg_image("@/assets/sort_up.svg");
        }
        &_down {
          @include bg_image("@/assets/sort_down.svg");
        }
      }
    }
  }
  .bar_item:first-child {
    cursor: default;
    width: 17px !important;
    font-size: 18px;
    .checkbox + label::before {
      margin-right: 0;
    }
  }
  .bar_item:last-child {
    cursor: default;
    width: 20px !important;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
.settings_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 18px;
  height: 18px;
  border: none;
  background-color: transparent;
  color: #757575;
  outline: none;
  transition: all 0.15s ease-out;
}
.settings_btn:hover {
  transform: rotate(90deg) scale(1.1);
}
.test_btn {
  border: none;
  background-color: transparent;
  color: #757575;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
.test_btn:hover {
  transform: scale(1.1);
}
.test_btn:disabled {
  color: #7575758a;
}
</style>
