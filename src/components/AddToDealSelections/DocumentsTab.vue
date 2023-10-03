<template>
  <div v-if="!isGoogleAuth" class="flex flex-row w-full justify-center gap-2">
    <h1 class="text-xl text-slate-900">
      {{ $t("newOrder.auth") }}
    </h1>
    <a
      @click="routeToGoogleAuth()"
      class="cursor-pointer text-blue-600 hover:border-b border-blue-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M13.293 3.96a4.771 4.771 0 1 1 6.747 6.747l-3.03 3.03l-1.415-1.413l3.03-3.031a2.771 2.771 0 1 0-3.918-3.92l-3.031 3.031l-1.414-1.414l3.03-3.03Zm2.12 6.04l-5.415 5.414L8.584 14l5.414-5.414L15.413 10Zm-7.01 1.676l-3.03 3.031a2.771 2.771 0 1 0 3.92 3.92l3.03-3.031l1.414 1.414l-3.03 3.03a4.771 4.771 0 1 1-6.748-6.747l3.03-3.03l1.415 1.413Z"
        />
      </svg>
    </a>
  </div>
  <div v-else>
    <header class="flex flex-row items-center justify-evenly">
      <AppInputSelect
        class="w-1/2"
        :list="docs.list"
        :selected="docs.selected"
        :countLettersReq="0"
        :requestDelay="0"
        :SelectedInTitle="true"
        :placeholder="t('newOrder.auth')"
        @changeInputValue="(val) => (docs.value = val)"
        @select="(option) => docs.select(option)"
      />
      <div class="flex flex-row gap-4 items-center">
        <button
          class="btn pointer-events-auto relative inline-flex transition-all rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          @click="generate()"
          :disabled="docs.selected.value === -1"
        >
          <template v-if="docs.isGeneration">
            {{ $t("newOrder.gen") }}
            <span class="animate-pulse ml-1">.</span>
            <span class="animate-pulse" style="animation-delay: 0.667s">.</span>
            <span class="animate-pulse" style="animation-delay: 1.333s">.</span>
          </template>
          <template v-else> {{ $t("newOrder.gen2") }} </template>
        </button>
        <label
          for="xlsx"
          class="btn pointer-events-auto relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <template v-if="isUpload">
            {{ $t("newOrder.z") }}
            <span class="animate-pulse ml-1">.</span>
            <span class="animate-pulse" style="animation-delay: 0.667s">.</span>
            <span class="animate-pulse" style="animation-delay: 1.333s">.</span>
          </template>
          <template v-else> {{ $t("newOrder.z2") }} </template>
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
              {{ $t("newOrder.o") }}
            </a>
          </td>
          <td class="cell">
            <a class="link" target="blank" :href="item.download_url">
              {{ $t("newOrder.d") }}
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
import router from "@/router";
import { useLangConfiguration } from "@/composables/langConfiguration";

export default {
  components: { AppInputSelect },
  setup() {
    const { t } = useLangConfiguration();
    const { newDealParams, toggleSomeChange } = useNewDeal();
    const {
      uploadFiles,
      customDocList,
      getCustomDocList,
      deleteCustomDoc,
      isUpload,
    } = useDocumentsTabCustomDocs();

    const isGoogleAuth = computed(() =>
      Boolean(store.state.account.account?.is_google_auth)
    );

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

    const routeToGoogleAuth = () => {
      router.push("/");
      store.commit("open_close_document_setting", true);
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
      isGoogleAuth,
      routeToGoogleAuth,
      t,
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
