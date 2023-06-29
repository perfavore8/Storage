import { reactive } from "vue";

export function useEntitiesTabs() {
  const tabs = reactive({
    selected: {},
    list: [
      {
        name: "Заказы",
        value: "Orders",
        storeName: "orders",
        fieldsName: "fields",
        typesName: "types",
        getTypesName: "getOrdersTypes",
        getFieldsName: "getOrdersFields",
        addName: "addOrdersField",
        updateName: "updateOrdersField",
        deleteName: "deleteOrdersField",
        isBase: true,
        haveStatuses: true,
        haveSort: true,
        haveVirtual: true,
      },
      {
        name: "Компании",
        value: "Company",
        storeName: "clientsCompany",
        fieldsName: "fields",
        typesName: "types",
        getTypesName: "getClientsCompanyTypes",
        getFieldsName: "getClientsCompanyFields",
        addName: "addClientsCompanyField",
        updateName: "updateClientsCompanyField",
        deleteName: "deleteClientsCompanyField",
        haveSort: true,
      },
      {
        name: "Контакты",
        value: "Contacts",
        storeName: "clientsContacts",
        fieldsName: "fields",
        typesName: "types",
        getTypesName: "getClientsContactsTypes",
        getFieldsName: "getClientsContactsFields",
        addName: "addClientsContactsField",
        updateName: "updateClientsContactsField",
        deleteName: "deleteClientsContactsField",
        haveSort: true,
      },
      {
        name: "Товары",
        value: "Products",
        storeName: "fields",
        fieldsName: "fields",
        typesName: "types",
        getTypesName: "get_types",
        getFieldsName: "get_fields",
        addName: "add_field",
        updateName: "update_fields",
        deleteName: "delete_field",
        haveLeadConfig: true,
        haveFieldsProperties: true,
        haveCategories: true,
        haveSort: true,
      },
    ],
    select: function (option) {
      this.selected = option;
    },
  });

  tabs.select(tabs.list.find((el) => el.isBase));

  return { tabs };
}
