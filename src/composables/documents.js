import store from "@/store";
import { computed, reactive } from "vue";

export function useDocuments() {
  const documents = reactive({
    titles: [
      {
        name: "Название документа",
        placeholder: "Название документа",
        code: "name",
        type: "AppInputSelect",
        minLength: 0,
        requestDelay: 0,
        value: "",
        selected: "",
        width: 1,
        sortable: true,
        list: [
          { name: "Документ 1", value: 1 },
          { name: "Документ 2", value: 2 },
          { name: "Документ 3", value: 3 },
        ],
      },
      {
        name: "Название заказа",
        placeholder: "Название заказа",
        code: "oreder_name",
        type: "AppInput",
        minLength: 0,
        requestDelay: 0,
        value: "",
        selected: "",
        width: 1,
        sortable: true,
        list: [],
      },
      {
        name: "Компания",
        placeholder: "Компания",
        code: "company",
        type: "AppInput",
        minLength: 0,
        requestDelay: 0,
        value: "",
        selected: "",
        width: 1,
        sortable: true,
        list: [],
      },
      {
        name: "Контакт",
        placeholder: "Контакт",
        code: "contact",
        type: "AppInput",
        minLength: 0,
        requestDelay: 0,
        value: "",
        selected: "",
        width: 1,
        sortable: true,
        list: [],
      },
      {
        name: "Кто сформировал",
        placeholder: "Кто сформировал",
        code: "form_name",
        type: "AppInputSelect",
        minLength: 0,
        requestDelay: 0,
        value: "",
        selected: {},
        width: 1,
        sortable: true,
        list: [{ name: "Кто-то", value: 1 }],
      },
      {
        name: "Когда сформировал",
        placeholder: "Когда сформировал",
        code: "form_date",
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
    list: [
      {
        name: "Google",
        document_link: "google.com",
        oreder_name: "Заказ 1",
        company: "Компания 1",
        contact: "Контакт 1",
        form_name: "Кто-то",
        form_date: "Когда-то",
      },
      {
        name: "Google",
        document_link: "google.com",
        oreder_name: "Заказ 2",
        company: "Компания 2",
        contact: "Контакт 2",
        form_name: "Кто-то",
        form_date: "Когда-то",
      },
      {
        name: "Google",
        document_link: "google.com",
        oreder_name: "Заказ 3",
        company: "Компания 2",
        contact: "Контакт 3",
        form_name: "Кто-то",
        form_date: "Когда-то",
      },
    ],
  });

  const collsCount = computed(() => documents.titles.length);

  const documentsRaw = computed(() => store.state.documents.documents);

  const fillDocuments = () => {
    documents.list = [];
    documentsRaw.value.forEach((document) => {
      const obj = {
        name: document.name,
        oreder_name: document.oreder_name,
        form_name: document.form_name,
        form_date: document.form_date,
      };
      documents.list.push(obj);
    });
  };

  const getDocuments = async () => {
    await store.dispatch("getDocuments", store.state.documents.filters);
    fillDocuments();
  };

  const documentsTitles = computed(() => documents.titles);

  return {
    documents,
    collsCount,
    fillDocuments,
    getDocuments,
    documentsTitles,
  };
}
