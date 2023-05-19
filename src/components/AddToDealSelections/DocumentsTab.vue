<template>
  <div>
    <header class="flex flex-row items-center justify-evenly">
      <AppInputSelect
        class="w-1/2"
        :list="docs.list"
        :selected="docs.selected"
        :countLettersReq="0"
        :requestDelay="0"
        :SelectedInTitle="true"
        :placeholder="'Выбор шаблона'"
        @changeInputValue="(val) => (docs.value = val)"
        @select="(option) => docs.select(option)"
      />
      <button
        class="btn pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        @click="generate()"
        :disabled="docs.selected.value === -1"
      >
        Сгенерировать
      </button>
    </header>
    <div class="mt-10">
      <table class="bg-white divide-y divide-gray-300 w-3/4 mx-auto">
        <tr v-for="item in a" :key="item.id">
          <td class="cell main">
            <span>{{ item.name }}</span>
          </td>
          <td class="cell">
            <span>{{ item.date }}</span>
          </td>
          <td class="cell">
            <span>{{ item.user }}</span>
          </td>
          <td class="cell">
            <a
              class="link"
              target="blank"
              :href="'https://docs.google.com/spreadsheets/d/' + item.url"
            >
              открыть
            </a>
          </td>
          <td class="cell">
            <a
              class="link"
              target="blank"
              :href="
                'https://docs.google.com/spreadsheets/d/' +
                item.url +
                '/export?format=' +
                item.type
              "
            >
              скачать
            </a>
          </td>
          <td class="cell">
            <button
              class="w-fit h-fit p-2 rounded-lg flex justify-center items-center focus:outline-2 focus:-outline-offset-4 focus:outline-slate-600 active:brightness-125"
            >
              <span class="material-icons-outlined text-red-600"> delete </span>
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import AppInputSelect from "../AppInputSelect.vue";
import store from "@/store";

export default {
  components: { AppInputSelect },
  setup() {
    onMounted(() => {
      store.dispatch("get_documents_v2");
    });

    const a = reactive([
      {
        name: "Тест",
        id: 1,
        date: "04.05.23 17:06",
        user: "GoSklad Support",
        url: "1lDgIzoYl8bpT_gnhQZRirwkbDoMmO4cu",
        type: "xlsx",
      },
      {
        name: "Тест",
        id: 2,
        date: "04.05.23 17:06",
        user: "GoSklad Support",
        url: "1lDgIzoYl8bpT_gnhQZRirwkbDoMmO4cu",
        type: "xlsx",
      },
      {
        name: "Тест",
        id: 3,
        date: "04.05.23 17:06",
        user: "GoSklad Support",
        url: "1lDgIzoYl8bpT_gnhQZRirwkbDoMmO4cu",
        type: "xlsx",
      },
      {
        name: "Тест",
        id: 4,
        date: "04.05.23 17:06",
        user: "GoSklad Support",
        url: "1lDgIzoYl8bpT_gnhQZRirwkbDoMmO4cu",
        type: "xlsx",
      },
      {
        name: "Тест",
        id: 5,
        date: "04.05.23 17:06",
        user: "GoSklad Support",
        url: "1lDgIzoYl8bpT_gnhQZRirwkbDoMmO4cu",
        type: "xlsx",
      },
    ]);

    const docs = reactive({
      value: "",
      selected: { name: "", value: -1 },
      list: computed(() => {
        const templates = store.state.documents.templates;
        templates?.map((val) => {
          val.value = val.id;
        });

        return templates?.filter((temp) =>
          temp.name?.toUpperCase()?.includes(docs.value?.toUpperCase())
        );
      }),
      select: function (option) {
        this.selected = option;
      },
    });

    return { docs, a };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.cell {
  @apply text-gray-500 font-medium text-base text-left whitespace-nowrap px-3 py-3;
}
.main {
  @apply text-gray-900;
}
.link {
  @apply font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline focus:outline-offset-4;
}
</style>
