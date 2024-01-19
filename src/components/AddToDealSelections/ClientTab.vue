<template>
  <div
    class="grid grid-cols-2 justify-items-center items-start w-full md:w-4/5 mx-auto gap-2 md:gap-10 mt-4"
  >
    <AppInputSelect
      class="w-full md:w-1/2 mx-auto"
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
      <h2
        class="font-semibold text-gray-700 text-lg md:text-base w-full text-center my-2"
      >
        {{ col.name }}
      </h2>
      <template v-for="item in col.items" :key="item?.id">
        <ClientTabItem
          :code="col.code2"
          :item="item"
          :fields="col.fields"
          :placeholders="col.placeholders"
          :alwaysShow="col.items.length === 1"
          :have_public_order="item.enabled"
          @unLink="() => unLink(item, col)"
          @link="() => link(item, col.code)"
          @togglePublicOrder="(val) => togglePublicOrder(item, val, col)"
          v-show="item"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AppInputSelect from "../AppInputSelect.vue";
import ClientTabItem from "./ClientTabItem.vue";
import { computed, onMounted, reactive } from "vue";
import store from "@/store";
import { useNewDeal } from "@/composables/newDeal";
import { useClientTabAutocomplete } from "@/composables/clientTabAutocomlete";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: {
    AppInputSelect,
    ClientTabItem,
  },
  setup() {
    const { t } = useLangConfiguration();
    const { order, getOrder, saveOrder } = useNewDeal();

    onMounted(() => {
      list.forEach((item) =>
        item.fields.length ? null : store.dispatch(item.getFieldsUrl)
      );
    });

    const list = reactive([
      {
        name: t("newOrder.komp"),
        code: "Company",
        code2: "company",
        getFieldsUrl: "getClientsCompanyFields",
        getAutocompeteUrl: "getClientsCompanyAutocomplete",
        fields: computed(() => store.state.clientsCompany.fields),
        items: computed(() =>
          order?.company ? [order?.company] : [...getUnlinkedCompanies()]
        ),
        placeholderForSearch: t("newOrder.kompP"),
        orderFieldForSave: "company_id",
        publicOrderFieldForSave: "public_company_id",
        placeholders: {
          title: "name",
          subTitle: "signatory",
          descriton: "director",
          subDescriton: "rating",
        },
      },
      {
        name: t("newOrder.cont"),
        code: "Contacts",
        code2: "contact",
        getFieldsUrl: "getClientsContactsFields",
        getAutocompeteUrl: "getClientsContactsAutocomplete",
        fields: computed(() => store.state.clientsContacts.fields),
        items: computed(() =>
          [
            ...(order?.company?.contacts
              .filter((el) => !list[1].linkedIds.includes(el.id))
              .map((el) => Object.assign(el, { isUnLink: true })) || []),
            ...(order?.contacts || []),
          ].sort((el) => (el.isUnLink ? 1 : -1))
        ),
        linkedIds: computed(() =>
          order?.contacts.reduce((acc, item) => {
            acc.push(item.id);
            return acc;
          }, [])
        ),
        placeholderForSearch: t("newOrder.contP"),
        orderFieldForSave: "contacts_id",
        publicOrderFieldForSave: "public_contacts_id",
        orderFieldSource: "contacts",
        isMultiSave: true,
        placeholders: {
          title: "name",
          subTitle: "phone",
          descriton: "email",
          subDescriton: "rating",
        },
      },
    ]);

    const getUnlinkedCompanies = () => {
      const res = [];
      list[1].items.map((el) =>
        el.companies.map((comp) => {
          if (!res.some((el) => el.id === comp.id))
            res.push({ ...comp, isUnLink: true });
        })
      );
      return res;
    };

    const autocompleteList = reactive([]);
    list.forEach((item) =>
      autocompleteList.push(
        useClientTabAutocomplete({
          getUrl: item.getAutocompeteUrl,
          code: item.code,
          placeholder: item.placeholderForSearch,
          multi: Boolean(item.isMultiSave),
          field: item.orderFieldForSave,
          fieldSource: item.orderFieldSource,
        })
      )
    );

    const unLink = async (item, params) => {
      if (params.isMultiSave) {
        if (order[params.field] === undefined)
          order[params.orderFieldForSave] = [];
        order[params.orderFieldSource].forEach((el) => {
          if (el.id !== item.id) order[params.orderFieldForSave].push(el.id);
        });
      } else {
        order[params.orderFieldForSave] = 0;
      }
      await saveOrder();
      getOrder();
    };

    const togglePublicOrder = async (item, val, params) => {
      await store.dispatch("clientUpdate", {
        client_type: params.code2,
        client_id: item.id,
        order_id: order.id,
        enabled: Number(val),
      });
      getOrder();
    };

    const link = (item, colCode) =>
      autocompleteList.find((el) => el.code === colCode).select(item);

    return { list, autocompleteList, unLink, link, togglePublicOrder };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
