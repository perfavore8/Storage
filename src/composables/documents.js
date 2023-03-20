import store from "@/store";
import { computed, reactive } from "vue";

export function useDocuments() {
  const documents = reactive({
    titles: [
      {
        name: "Название документа",
        code: "name",
        width: 1,
        sortable: true,
      },
      {
        name: "Название заказа",
        code: "oreder_name",
        width: 1,
        sortable: true,
      },
      {
        name: "Клиент",
        code: "client",
        width: 1,
        sortable: true,
      },
      {
        name: "Кто сформировал",
        code: "form_name",
        width: 1,
        sortable: true,
      },
      {
        name: "Когда сформировал",
        code: "form_date",
        width: 1,
        sortable: true,
      },
    ],
    list: [
      {
        name: "Google",
        document_link: "google.com",
        oreder_name: "Заказ 1",
        client: "Клиент 1",
        form_name: "Кто-то",
        form_date: "Когла-то",
      },
      {
        name: "Google",
        document_link: "google.com",
        oreder_name: "Заказ 2",
        client: "Клиент 2",
        form_name: "Кто-то",
        form_date: "Когла-то",
      },
      {
        name: "Google",
        document_link: "google.com",
        oreder_name: "Заказ 3",
        client: "Клиент 3",
        form_name: "Кто-то",
        form_date: "Когла-то",
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
