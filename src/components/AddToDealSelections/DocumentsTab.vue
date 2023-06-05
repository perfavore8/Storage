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
      <div class="flex flex-row gap-4 items-center">
        <button
          class="btn pointer-events-auto relative inline-flex transition-all rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          @click="generate()"
          :disabled="docs.selected.value === -1 && false"
        >
          <template v-if="docs.isGeneration">
            Генерация
            <span class="animate-pulse ml-1">.</span>
            <span class="animate-pulse" style="animation-delay: 0.667s">.</span>
            <span class="animate-pulse" style="animation-delay: 1.333s">.</span>
          </template>
          <template v-else> Сгенерировать </template>
        </button>
        <label
          for="xlsx"
          class="btn pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <template v-if="isUpload">
            Загружаем
            <span class="animate-pulse ml-1">.</span>
            <span class="animate-pulse" style="animation-delay: 0.667s">.</span>
            <span class="animate-pulse" style="animation-delay: 1.333s">.</span>
          </template>
          <template v-else> Загрузить </template>
        </label>
        <input
          type="file"
          id="xlsx"
          @change="(ev) => uploadFiles(ev)"
          class="hidden"
        />
      </div>
    </header>
    <div class="mt-10">
      <table class="bg-white divide-y divide-gray-300 w-3/4 mx-auto">
        <tr v-for="item in [...docsList, ...customDocList]" :key="item.id">
          <td class="cell main">
            <span>{{ item.name }}</span>
          </td>
          <td class="cell">
            <span>{{ item.created_at }}</span>
          </td>
          <td class="cell">
            <span>{{ item.user_name }}</span>
          </td>
          <td class="cell">
            <a
              class="link"
              target="blank"
              :href="item.open_url"
              v-if="item.open_url"
            >
              открыть
            </a>
          </td>
          <td class="cell">
            <a class="link" target="blank" :href="item.download_url">
              скачать
            </a>
          </td>
          <td class="cell">
            <button
              class="w-fit h-fit p-2 rounded-lg flex justify-center items-center focus:outline-2 focus:-outline-offset-4 focus:outline-slate-600 active:brightness-125"
              @click="
                item.isCustom ? deleteCustomDoc(item.id) : delDoc(item.id)
              "
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
import { useNewDeal } from "@/composables/newDeal";
import { useDocumentsTabCustomDocs } from "@/composables/documentsTabCustomDocs";

export default {
  components: { AppInputSelect },
  setup() {
    const { newDealParams, toggleSomeChange } = useNewDeal();
    const {
      uploadFiles,
      customDocList,
      getCustomDocList,
      deleteCustomDoc,
      isUpload,
    } = useDocumentsTabCustomDocs();

    onMounted(() => {
      store.dispatch("get_documents_v2");
      getDocs();
      getCustomDocList();
    });

    const docsList = reactive([]);
    const getDocs = async () => {
      docsList.length = 0;
      Object.assign(
        docsList,
        await store.dispatch("getOrderDocList", {
          order_id: Number(newDealParams.id),
        })
      );
    };

    const docs = reactive({
      value: "",
      selected: { name: "", value: -1 },
      isGeneration: false,
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

    const generate = async () => {
      docs.isGeneration = true;
      toggleSomeChange(true);
      const doc = await store.dispatch("generateOrderDoc", {
        order_id: Number(newDealParams.id),
        doc_tpl_id: docs.selected.id,
      });
      docs.isGeneration = false;
      console.log(doc);
      getDocs();
    };

    const delDoc = async (docId) => {
      toggleSomeChange(true);
      await store.dispatch("deleteOrderDoc", {
        order_id: newDealParams.id,
        doc_id: docId,
      });
      getDocs();
    };

    return {
      docs,
      generate,
      docsList,
      delDoc,
      uploadFiles,
      customDocList,
      getCustomDocList,
      deleteCustomDoc,
      isUpload,
    };
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
