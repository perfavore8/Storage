import store from "@/store";
import { computed, reactive } from "vue";

const documents = reactive({
  titles: [
    {
      name: "Статус",
      placeholder: "Статус документа",
      code: "status_id",
      type: "AppInputSelect",
      minLength: 0,
      requestDelay: 0,
      value: "",
      selected: {},
      width: 1,
      sortable: false,
      isAutocomplete: false,
      selfList: true,
      url: "document/templates",
      list: [],
      visibleIds: [148, 1],
    },
    {
      name: "Название документа",
      placeholder: "Название документа",
      code: "template_name",
      isDocumentLink: true,
      type: "AppInputSelect",
      minLength: 0,
      requestDelay: 0,
      value: "",
      selected: {},
      width: 1,
      sortable: true,
      isAutocomplete: false,
      url: "document/templates",
      list: [],
    },
    {
      name: "Название заказа",
      placeholder: "Название заказа",
      code: "lead_name",
      type: "AppInputSelect",
      minLength: 0,
      requestDelay: 300,
      value: "",
      selected: {},
      width: 1,
      sortable: true,
      isAutocomplete: true,
      url: "document/autocomplete/lead_name",
      list: [],
    },
    {
      name: "Компания",
      placeholder: "Компания",
      code: "company_name",
      type: "AppInputSelect",
      minLength: 3,
      requestDelay: 300,
      value: "",
      selected: {},
      width: 1,
      sortable: true,
      isAutocomplete: true,
      url: "analytics/autocomplete/company",
      list: [],
    },
    {
      name: "Контакт",
      placeholder: "Контакт",
      code: "contact_name",
      type: "AppInputSelect",
      minLength: 3,
      requestDelay: 300,
      value: "",
      selected: {},
      width: 1,
      sortable: true,
      isAutocomplete: true,
      url: "analytics/autocomplete/contact",
      list: [],
    },
    {
      name: "Кто сформировал",
      placeholder: "Кто сформировал",
      code: "user_name",
      type: "AppInputSelect",
      minLength: 0,
      requestDelay: 0,
      value: "",
      selected: {},
      width: 1,
      sortable: true,
      isAutocomplete: false,
      url: "document/users",
      list: [],
    },
    {
      name: "Когда сформировал",
      placeholder: "Когда сформировал",
      code: "created_at",
      type: "AppDateRange",
      minLength: 0,
      requestDelay: 0,
      value: "",
      selected: "-",
      width: 1,
      sortable: true,
      list: [],
    },
  ],
  list: [],
});

const status_id = computed(() =>
  documents.titles.find((el) => el.code === "status_id")
);

const documentsRaw = computed(() => store.state.documents.documents);

const fillDocuments = () => {
  documents.list = [];
  const search = (id) => {
    let res = "";
    if (status_id.value && status_id.value.list) {
      const foundValue = status_id.value.list.find((val) => val.id == id);
      if (foundValue) {
        res = foundValue.name;
      }
    }
    return res;
  };
  documentsRaw.value.forEach((document) => {
    const obj = {
      template_name: document?.name,
      document_link: document?.url,
      lead_name: document?.lead_name,
      company_name: document?.company_name,
      contact_name: document?.contact_name,
      user_name: document?.user_name,
      created_at: document?.created_at,
      status_id:
        search(document?.pipeline_id) + " - " + search(document?.status_id),
    };
    if (obj.status_id === " - ") obj.status_id = "";
    documents.list.push(obj);
  });
};

export function useDocuments() {
  const collsCount = computed(() => documents.titles.length);

  const fillTitlesList = () => {
    documents.titles.map(async (title) => {
      if (
        title.type === "AppInputSelect" &&
        !title.isAutocomplete &&
        !title.selfList
      ) {
        const res = await store.dispatch("getAutocomplete", {
          subUrl: title.url,
          value: {},
        });
        title.list = [];
        res.forEach((el) => title.list.push({ name: el, value: el }));
      }
    });
  };

  const fillStatuses = async () => {
    await store.dispatch("getPipelinesListV2");
    const pipelinesListV2 = store.state.account.pipelinesListV2;
    Object.entries(pipelinesListV2).forEach(([key, value]) => {
      status_id.value.list.push({
        name: value.name,
        value: "optgroup",
        id: key,
      });
      value.statuses.forEach((stat) => {
        status_id.value.list.push({
          name: stat.name,
          value: key + "-" + stat.id,
          id: stat.id,
          color: stat.color,
          optgroup: true,
        });
      });
    });
  };

  const getAutocompleteList = async (title) => {
    const params = { subUrl: title.url, value: { query: title.value } };
    if (title.code === "contact_name") params.value.from_docs = 1;
    const res = await store.dispatch("getAutocomplete", params);
    title.list = [];
    res.forEach((el) => {
      const item = { name: el, value: el };
      if (el.label) {
        item.name = el.label;
        item.value = el.value;
      }
      title.list.push(item);
    });
  };

  const getDocuments = async () => {
    await Promise.all([
      fillStatuses(),
      store.dispatch("getDocuments", store.state.documents.filters),
    ]);
    fillDocuments();
  };

  const documentsTitles = computed(() => documents.titles);

  const total = computed(() => store.state.documents.meta?.meta?.total);

  return {
    documents,
    collsCount,
    fillDocuments,
    getDocuments,
    documentsTitles,
    total,
    fillTitlesList,
    getAutocompleteList,
  };
}
