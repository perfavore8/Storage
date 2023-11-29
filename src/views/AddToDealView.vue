<template>
  <div class="app px-2 lg:px-[30px] mb-[52px] sm:mb-0">
    <div
      class="header !pb-1 sm:pb-5"
      :class="[
        isPublicOrder ? 'bg-transparent' : 'bg-white',
        { '!p-0 sm:py-5 sm:!pt-10': isPublicOrder },
      ]"
    >
      <button
        class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl absolute left-0 hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
        @click="back()"
        v-if="!isPublicOrder"
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
      <div class="fixed top-4 left-[10%] hidden sm:block">
        <transition name="side2">
          <AvailablePublicOrdersList />
        </transition>
      </div>
      <div
        class="fixed sm:static bottom-0 left-0 w-full sm:w-auto flex flex-col gap-2 p-2 sm:p-0 bg-white shadow-md shadow-black rounded-t-lg"
      >
        <div class="relative">
          <div
            class="w-full absolute sm:fixed -top-3 -translate-y-full sm:translate-y-0 sm:top-auto sm:bottom-4 right-0 sm:right-4 lg:right-[10%] flex flex-row gap-2 items-center justify-between sm:w-fit"
            v-if="isPublicOrder"
          >
            <transition name="side2">
              <AvailablePublicOrdersList class="sm:hidden" />
            </transition>
            <a
              href="https://gosklad.com/"
              target="_blank"
              class="flex flex-row gap-4 items-center"
            >
              {{ $t("newOrder.logoLinkText") }}
              <img
                src="@/assets/logo_en_transparent.png"
                alt="GoSkald"
                class="w-24"
            /></a>
          </div>
          <div
            class="static sm:fixed flex flex-row gap-2 items-center w-full sm:w-auto"
            :class="[
              isPublicOrder ? 'top-4 right-[10%]' : 'bottom-10 left-[10%]',
            ]"
          >
            <transition name="side">
              <button
                class="btn btn_grey w-full sm:w-auto flex items-center justify-center"
                @click="archivate()"
                v-if="isTest && !isClosedStep && isOrderGeted && !isPublicOrder"
              >
                {{ $t("ostatki.arch") }}
              </button>
            </transition>
            <template v-if="isPublicOrder">
              <transition name="side2">
                <button
                  class="btn btn_light_dark_blue w-full sm:w-auto flex items-center justify-center"
                >
                  {{ $t("newOrder.pay") }}
                </button>
              </transition>
            </template>
            <transition :name="isPublicOrder ? 'side2' : 'side'">
              <button
                class="btn w-full sm:w-auto items-center justify-center whitespace-nowrap pointer-events-auto inline-flex transition-all rounded-md bg-blue-500 text-[0.8125rem] font-medium leading-5 text-slate-100 shadow-sm ring-1 ring-slate-700/10 hover:bg-blue-600 hover:text-white hover:disabled:bg-blue-500/70 disabled:bg-blue-500/70 disabled:opacity-30 disabled:cursor-not-allowed"
                @click="saveParams.save()"
                v-if="saveParams.needSave || isPublicOrder"
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
                <template v-else>
                  {{
                    isPublicOrder
                      ? $t("newOrder.confirmOrder")
                      : $t("global.save")
                  }}
                </template>
              </button>
            </transition>
          </div>
        </div>
      </div>
      <AppRadioBtnsGroupUnderlined
        class="w-4/5"
        :list="tabs.list"
        :selected="tabs.selected"
        @select="(option) => tabs.select(option)"
        v-if="!isPublicOrder"
      />
    </div>
    <div class="content sm:mt-4">
      <keep-alive>
        <component :is="tabs.selected.code" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
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
import { isPublicOrder } from "@/components/PublicOrder";
import { AvailablePublicOrdersList } from "@/components/PublicOrder";
export default {
  components: {
    ProductsTab,
    DocumentsTab,
    ClientTab,
    AppRadioBtnsGroupUnderlined,
    AvailablePublicOrdersList,
  },
  setup() {
    const { add, saveParams, order, isOrderGeted } = useNewDeal();
    const { tabs } = useAddToDealTabs();
    const { t } = useLangConfiguration();
    const { addNotification } = useNotification();
    const { pipelines } = useOrdersPipelinesSelect();

    const back = () => router.push("/");

    add();

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
      isPublicOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 8px);
  @apply w-screen sm:w-[calc(100vw-8px)];
  min-height: 100vh;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;

  .header {
    position: sticky;
    top: 0;
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
.side-leave-active,
.side2-enter-active,
.side2-leave-active {
  transition: all 0.3s ease-out;
}
.side-enter-from,
.side-leave-to {
  opacity: 0.5;
  transform: translateY(calc(100% + 46px));
}
.side2-enter-from,
.side2-leave-to {
  opacity: 0.5;
  transform: translateX(calc(100% + 46px));
}
</style>
