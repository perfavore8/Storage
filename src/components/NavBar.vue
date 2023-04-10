<template>
  <div class="btns w-full gap-2 justify-center md:justify-start">
    <button
      class="btns_btn text-xs px-2 py-1 md:px-2 md:py-[2px] md:text-lg text-[#1b3546] dark:rounded-none rounded dark:border-y-0 dark:border-x-0 border-[#1b3546] border dark:border-b-2 dark:border-[#1c2d3e] dark:text-slate-200"
      :class="{ selected_catalog: $route.path === '/' + page.value }"
      @click="route(page.value)"
      v-for="page in catalog"
      v-show="
        !(page.isTest && !isTest) &&
        !(page.isAdmin && !isAdmin) &&
        !page.hideId?.includes(accountId)
      "
      :disabled="isNavBarDisabled"
      :key="page"
    >
      {{ page.name }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import store from "@/store";
import router from "@/router";
import { useRoute } from "vue-router";

const Route = useRoute();

const isTest = computed(
  () => store.state.account?.account?.id == 1 || Route?.query?.test === "test"
);
const accountId = computed(() => store.state.account?.account?.id);
const isAdmin = computed(() =>
  store.state.account?.user?.isAdmin === undefined
    ? true
    : store.state.account?.user?.isAdmin
);
const catalog = computed(() => store.state.data.catalog);
const isNavBarDisabled = computed(() => store.state.data.isNavBarDisabled);
const route = (page_name) => router.push("/" + page_name);
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.btns {
  display: flex;
  flex-direction: row;
  // gap: 12px;
  // flex-wrap: wrap;
  .btns_btn {
    // height: 30px;
    // padding: calc(0.1 * $vv) calc(0.4 * $vv);
    height: min-content;
    cursor: pointer;
    text-align: center;
    vertical-align: center;
    box-sizing: border-box;
    // border: 1px solid #1b3546;
    // border-radius: 4px;
    // color: #1b3546;
    background: transparent;

    transition: all 0.15s ease-out;
    // @include font(400, 18px);
  }
  .btns_btn:hover {
    border-color: #396f93;
    color: #396f93;
  }
  .btns_btn:disabled {
    cursor: default;
    border-color: #7e888f;
    color: #7e888f;
  }
  .selected_catalog {
    transition: all 0.15s ease-out;
    background: #1b3546;
    color: white;
    // @apply dark:bg-slate-600 dark:text-slate-200;
    @apply dark:bg-[#1c2d3e] dark:border-[#1c2d3e]  dark:text-blue-500;
  }
  .selected_catalog:hover {
    color: hsl(204, 44%, 95%);
  }
  .selected_catalog:disabled {
    border-color: #1b3546;
    color: white;
  }
}
</style>
