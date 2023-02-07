<template>
  <div class="btns">
    <button
      class="btns_btn"
      :class="{ selected_catalog: $route.path === '/' + page.value }"
      @click="route(page.value)"
      v-for="page in catalog"
      v-show="!(page.isTest && !isTest) && !(page.isAdmin && !isAdmin)"
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

const isTest = computed(() => store.state.account?.account?.id == 1);
const isAdmin = computed(() =>
  store.state.account?.user?.isAdmin === undefined
    ? true
    : store.state.account?.user?.isAdmin
);
const catalog = computed(() => store.state.data.catalog);
const route = (page_name) => router.push("/" + page_name);
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.btns {
  display: flex;
  flex-direction: row;
  gap: 12px;
  flex-wrap: wrap;
  .btns_btn {
    // height: 30px;
    padding: calc(0.1 * $vv) calc(0.4 * $vv);
    height: min-content;
    cursor: pointer;
    text-align: center;
    vertical-align: center;
    box-sizing: border-box;
    border: 1px solid #1b3546;
    border-radius: 4px;
    color: #1b3546;
    background: transparent;

    transition: all 0.15s ease-out;
    @include font(400, 18px);
  }
  .btns_btn:hover {
    border-color: #396f93;
    color: #396f93;
  }
  .selected_catalog {
    transition: all 0.15s ease-out;
    background: #1b3546;
    color: white;
  }
  .selected_catalog:hover {
    color: hsl(204, 44%, 95%);
  }
}
</style>
