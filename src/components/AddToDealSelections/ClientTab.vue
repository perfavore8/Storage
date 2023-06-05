<template>
  <AppInputSelect
    class="w-1/2 mx-auto"
    :placeholder="'Поиск компаний'"
    :list="autocomplete.list"
    :selected="autocomplete.selected"
    :countLettersReq="3"
    @changeInputValue="(value) => autocomplete.changeInputValue(value)"
    @select="(option) => autocomplete.select(option)"
  />
  <div
    class="grid grid-cols-2 justify-items-center items-start w-4/5 mx-auto gap-10 mt-4"
  >
    <div v-for="col in list" :key="col" class="w-full">
      <h2 class="font-semibold text-gray-700 w-full text-center my-2">
        {{ col.name }}
      </h2>
      <template v-for="item in col.items" :key="item?.id">
        <ClientTabItem
          :item="item"
          :fields="col.fields"
          :placeholders="col.placeholders"
          :alwaysShow="col.items.length === 1"
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

    const list = reactive([
      {
        name: "Компания",
        code: "Company",
        getFieldsUrl: "getClientsCompanyFields",
        fields: computed(() => store.state.clientsCompany.fields),
        items: computed(() => [order?.company]),
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
        fields: computed(() => store.state.clientsContacts.fields),
        items: computed(() => order?.company?.contacts),
        placeholders: {
          title: "name",
          subTitle: "phone",
          descriton: "email",
          subDescriton: "rating",
        },
      },
    ]);

    const autocomplete = reactive({
      selected: {},
      value: "",
      list: [],
      getList: async function () {
        this.list = await store.dispatch("getClientsCompanyAutocomplete", {
          q: this.value,
        });
        this.list.map((item) => (item.name = item.label));
      },
      changeInputValue: function (value) {
        this.value = value;
        this.getList();
      },
      select: async function (option) {
        toggleSomeChange(true);
        order.company_id = option.id;
        await saveOrder();
        getOrder();
      },
    });

    return { list, autocomplete };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
