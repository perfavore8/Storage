<template>
  <div :class="{ dark: isDarkTest }">
    <div class="app min-h-screen px-4 md:px-[30px] dark:bg-slate-900">
      <div class="header w-full !justify-between">
        <template v-if="isTest">
          <button
            class="bg-slate-400 bg-opacity-90 p-2 h-fit w-fit rounded-xl hover:shadow-sm hover:drop-shadow-md outline-none focus-visible:drop-shadow-md"
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
          <AppRadioBtnsGroupUnderlined
            :list="config.list"
            :selected="config.selected"
            @select="(option) => config.select(option)"
          />
          <div></div>
        </template>
        <AppHeader v-else />
      </div>
      <div class="content w-full mt-2 md:mt-12">
        <div class="top">
          <p
            class="my-2 md:my-4 text-sm md:text-base text-slate-500 dark:text-slate-300"
          >
            Найдено: {{ count_archive }}
          </p>
        </div>
        <archive-grid class="grid" :config="config.selected"></archive-grid>
      </div>
    </div>
  </div>
</template>

<script>
import ArchiveGrid from "@/components/ArchiveGrid.vue";
import AppHeader from "@/components/AppHeader.vue";
import store from "@/store";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import router from "@/router";
import { useArchiveConfig } from "@/composables/archiveConfig";
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
export default {
  name: "ArchiveView",
  components: {
    ArchiveGrid,
    AppHeader,
    AppRadioBtnsGroupUnderlined,
  },
  setup() {
    const route = useRoute();

    const isTest = computed(() => store.state.account?.account?.id == 1);
    const count_archive = computed(
      () =>
        store.state[config.selected.stateName][config.selected.stateMetaName]
          ?.meta?.total
    );
    const isDarkTest = computed(() => route.query.test === "dark");

    const { config } = useArchiveConfig();

    const back = () => router.go(-1);

    return { isTest, count_archive, isDarkTest, back, config };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  min-width: 100vw;
  width: 100%;
  height: 100%;
  // padding: 0 30px;

  display: flex;
  flex-direction: column;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: calc(100vw - 80px);
  z-index: 50;
}
.content {
  // margin-top: 50px;
  .top {
    text-align: left;
    p {
      margin-left: 10px;
      // color: #757575;
      // @include font(400, 16px);
    }
  }
}
</style>
