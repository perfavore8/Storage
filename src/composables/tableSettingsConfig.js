import { computed } from "vue";
import { reactive } from "vue";

export function useTableSettingsConfig(code) {
  const config = reactive({
    orders: {
      stateName: "orders",
      stateConfigField: "tableConfig",
      getStateReqName: "getOrdersTableConfig",
      updateStateReqName: "updateOrdersConfigTable",
      haveWH: false,
    },
    stock: {
      stateName: "account",
      stateConfigField: "tableConfig",
      getStateReqName: "getTableConfig",
      updateStateReqName: "update_config_table",
      haveWH: true,
    },
  });

  const currentConfig = computed(() => config[code] || {});

  return { currentConfig };
}
