import { computed } from "vue";
import { reactive } from "vue";

export function useTableSettingsConfig(code) {
  const config = reactive({
    orders: {
      stateName: "orders",
      stateConfigField: "tableConfig",
      getStateReqName: "getOrdersTableConfig",
      params: { for: "table" },
      updateStateReqName: "updateOrdersConfigTable",
      haveWH: false,
    },
    ordersKanBan: {
      stateName: "orders",
      stateConfigField: "kanBanTableConfig",
      getStateReqName: "getOrdersKanBanTableConfig",
      params: { for: "pipeline" },
      updateStateReqName: "updateOrdersKanBanConfigTable",
      haveWH: false,
      special: true,
      disabledCodes: [
        "order_name",
        "order_created_at",
        "order_responsible",
        "contact_name",
        "company_name",
        "order_user",
        "order_status",
      ],
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
