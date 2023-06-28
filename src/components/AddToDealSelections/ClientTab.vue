<template>
  <div
    class="grid grid-cols-2 justify-items-center items-start w-4/5 mx-auto gap-10 mt-4"
  >
    <AppInputSelect
      class="w-1/2 mx-auto"
      v-for="autocomplete in autocompleteList"
      :key="autocomplete.id"
      :placeholder="autocomplete.placeholder"
      :list="autocomplete.list"
      :selected="autocomplete.selected"
      :countLettersReq="3"
      @changeInputValue="(value) => autocomplete.changeInputValue(value)"
      @select="(option) => autocomplete.select(option)"
    />
    <div
      v-for="col in list"
      :key="col"
      class="w-full flex flex-col items-center"
    >
      <h2 class="font-semibold text-gray-700 w-full text-center my-2">
        {{ col.name }}
      </h2>
      <template v-for="item in col.items" :key="item?.id">
        <ClientTabItem
          :item="item"
          :fields="col.fields"
          :placeholders="col.placeholders"
          :alwaysShow="col.items.length === 1"
          @unLink="() => unLink(item, col)"
          @link="() => link(item)"
          v-show="item"
        />
      </template>
      <!-- <ClientTabCastomFields /> -->
    </div>
  </div>
</template>

<script>
// import ClientTabCastomFields from "./ClientTabCastomFields.vue";
import AppInputSelect from "../AppInputSelect.vue";
import ClientTabItem from "./ClientTabItem.vue";
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
import { useNewDeal } from "@/composables/newDeal";
import { useClientTabAutocomplete } from "@/composables/clientTabAutocomlete";
export default {
  components: {
    // ClientTabCastomFields,
    AppInputSelect,
    ClientTabItem,
  },
  setup() {
    const { order, getOrder, saveOrder, toggleSomeChange } = useNewDeal();

    onMounted(() => {
      list.forEach((item) =>
        item.fields.length ? null : store.dispatch(item.getFieldsUrl)
      );
    });
    setTimeout(() => console.log(order), 1000);

    const list = reactive([
      {
        name: "Компания",
        code: "Company",
        getFieldsUrl: "getClientsCompanyFields",
        getAutocompeteUrl: "getClientsCompanyAutocomplete",
        fields: computed(() => store.state.clientsCompany.fields),
        items: computed(() => [order?.company]),
        placeholderForSearch: "Поиск компаний",
        orderFieldForSave: "company_id",
        placeholders: {
          title: "name",
          subTitle: "signatory",
          descriton: "director",
          subDescriton: "rating",
        },
      },
      {
        name: "Контакт",
        code: "Contacts",
        getFieldsUrl: "getClientsContactsFields",
        getAutocompeteUrl: "getClientsContactsAutocomplete",
        fields: computed(() => store.state.clientsContacts.fields),
        items: computed(() => [
          ...(order?.company?.contacts
            .filter((el) => !list[1].linkedIds.includes(el.id))
            .map((el) => Object.assign(el, { isUnLink: true })) || []),
          ...(order?.contacts || []),
        ]),
        linkedIds: computed(() =>
          order?.contacts.reduce((acc, item) => {
            acc.push(item.id);
            return acc;
          }, [])
        ),
        placeholderForSearch: "Поиск контактов",
        orderFieldForSave: "contact_id",
        isMultiSave: true,
        placeholders: {
          title: "name",
          subTitle: "phone",
          descriton: "email",
          subDescriton: "rating",
        },
      },
    ]);

    const autocompleteList = reactive([]);
    list.forEach((item) =>
      autocompleteList.push(
        useClientTabAutocomplete({
          getUrl: item.getAutocompeteUrl,
          code: item.code,
          placeholder: item.placeholderForSearch,
          multi: Boolean(item.isMultiSave),
          field: item.orderFieldForSave,
        })
      )
    );

    const unLink = async (item, params) => {
      toggleSomeChange(true);
      if (params.isMultiSave) {
        if (order[params.field] === undefined)
          order[params.orderFieldForSave] = [];
        order[params.orderFieldForSave] = order[
          params.orderFieldForSave
        ].filter((el) => el !== item.id);
      } else {
        order[params.orderFieldForSave] = 0;
      }
      await saveOrder();
      getOrder();
    };

    const link = (item) =>
      autocompleteList.find((el) => el.code === "Contacts").select(item);

    return { list, autocompleteList, unLink, link };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
