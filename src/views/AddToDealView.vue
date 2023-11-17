<template>
  <div class="app">
    <div class="header">
      <button
        class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-0 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
        @click="back()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 18h3.75a5.25 5.25 0 1 0 0-10.5H5M7.5 4L4 7.5L7.5 11"
          />
        </svg>
      </button>
      <div class="fixed bottom-10 left-[10%] flex flex-row gap-2 items-center">
        <transition name="side">
          <button
            class="btn btn_grey"
            @click="archivate()"
            v-if="isTest && !isClosedStep && isOrderGeted"
          >
            {{ $t("ostatki.arch") }}
          </button>
        </transition>
        <transition name="side">
          <button
            class="btn pointer-events-auto inline-flex transition-all rounded-md bg-blue-500 text-[0.8125rem] font-medium leading-5 text-slate-100 shadow-sm ring-1 ring-slate-700/10 hover:bg-blue-600 hover:text-white hover:disabled:bg-blue-500/70 disabled:bg-blue-500/70 disabled:opacity-30 disabled:cursor-not-allowed"
            @click="saveParams.save()"
            v-if="saveParams.needSave"
            :disabled="saveParams.isSaving"
          >
            <template v-if="saveParams.isSaving">
              {{ $t("newOrder.saving") }}
              <span class="animate-pulse ml-1">.</span>
              <span class="animate-pulse" style="animation-delay: 0.667s"
                >.</span
              >
              <span class="animate-pulse" style="animation-delay: 1.333s"
                >.</span
              >
            </template>
            <template v-else> {{ $t("global.save") }} </template>
          </button>
        </transition>
      </div>
      <AppRadioBtnsGroupUnderlined
        class="w-4/5"
        :list="tabs.list"
        :selected="tabs.selected"
        @select="(option) => tabs.select(option)"
      />
    </div>
    <div class="content mt-4">
      <keep-alive>
        <component :is="tabs.selected.code" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import router from "@/router";
import ProductsTab from "@/components/AddToDealSelections/ProductsTab.vue";
import DocumentsTab from "@/components/AddToDealSelections/DocumentsTab.vue";
import ClientTab from "@/components/AddToDealSelections/ClientTab.vue";
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
import { useNewDeal } from "@/composables/newDeal";
import { useAddToDealTabs } from "@/composables/addToDealTabs";
import store from "@/store";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { useNotification } from "@/composables/notification";
import { isTest } from "@/composables/isTest";
import { useOrdersPipelinesSelect } from "@/composables/ordersPipelinesSelect";
export default {
  components: {
    ProductsTab,
    DocumentsTab,
    ClientTab,
    AppRadioBtnsGroupUnderlined,
  },
  setup() {
    const { add, saveParams, order, isOrderGeted } = useNewDeal();
    const { tabs } = useAddToDealTabs();
    const { t } = useLangConfiguration();
    const { addNotification } = useNotification();
    const { pipelines } = useOrdersPipelinesSelect();

    const back = () => router.push("/");

    onMounted(async () => {
      add();
    });

    const isClosedStep = computed(
      () =>
        !!pipelines.allStatuses.find((el) => el.value == order.status_id)?.type
    );

    const archivate = async () => {
      const res = await store.dispatch("deleteOrder", { order_id: order.id });
      if (res.error) {
        addNotification(3, t("HomeMenu.err"), res.error);
      } else {
        addNotification(1, t("newOrder.acrh"), "");
        back();
      }
    };

    return {
      tabs,
      back,
      saveParams,
      archivate,
      isTest,
      isClosedStep,
      isOrderGeted,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 8px);
  min-height: 100vh;
  height: 100%;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;

  .header {
    position: sticky;
    top: 0;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    z-index: 48;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
.side-enter-active,
.side-leave-active {
  transition: all 0.3s ease;
}
.side-enter-from,
.side-leave-to {
  opacity: 0.5;
  transform: translateY(calc(100% + 46px));
}
</style>
