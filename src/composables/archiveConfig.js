import { reactive } from "vue";

export function useArchiveConfig() {
  const config = reactive({
    selected: {},
    list: [
      {
        name: "Товары / Услуги",
        value: "products",
        stateName: "products",
        stateFieldName: "fields",
        stateListName: "products",
        stateFieldsName: "all_fields",
        stateMetaName: "meta",
        stateListReqName: "get_products",
        stateFieldsReqName: "get_all_fields",
        default: true,
        fields: [
          "name",
          "batch",
          "article",
          "category",
          "units",
          "created_at",
          "updated_at",
        ],
      },
      {
        name: "Компании",
        value: "companies",
        stateName: "clientsCompany",
        stateListName: "list",
        stateFieldsName: "fields",
        stateMetaName: "meta",
        stateListReqName: "getClientsCompanyList",
        stateFieldsReqName: "getClientsCompanyFields",
        fields: ["name"],
      },
      {
        name: "Контакты",
        value: "contacts",
        stateName: "clientsContacts",
        stateListName: "list",
        stateFieldsName: "fields",
        stateMetaName: "meta",
        stateListReqName: "getClientsContactsList",
        stateFieldsReqName: "getClientsContactsFields",
        fields: ["name"],
      },
      {
        name: "Заказы",
        value: "orders",
        stateName: "orders",
        stateListName: "orders",
        stateFieldsName: "fields",
        stateMetaName: "meta",
        stateListReqName: "getOrders",
        stateFieldsReqName: "getOrdersFields",
        fields: ["name"],
      },
    ],
    dropToDefault: function () {
      this.select(this.list.find((el) => el.default));
    },
    select: function (option) {
      this.selected = option;
    },
  });
  config.dropToDefault();

  return { config };
}
