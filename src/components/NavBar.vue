<template>
  <div ref="list">
    <button @click="toggleShow()" class="md:hidden z-[49]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 16 16"
        class="text-[#757575]"
      >
        <path
          fill="currentColor"
          d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75Zm0 4A.75.75 0 0 1 2.75 7h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 7.75Zm0 4a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
        />
      </svg>
    </button>
    <template v-if="isShow">
      <Teleport to="body">
        <div
          class="backdrop !bg-black/20 dark:!bg-black/60"
          @click="toggleShow(false)"
        />
      </Teleport>
    </template>
    <div
      class="btns flex flex-col md:flex-row w-full sm:w-full md:w-full gap-2 justify-start fixed left-0 top-0 md:static h-fit md:bg-transparent p-4 md:p-0 md:border-none z-50 mt-12 font-medium border border-gray-100 rounded-lg bg-gray-50 md:mt-0 md:border-0 dark:bg-gray-800 dark:border-gray-700"
      :class="[isShow ? 'flex' : 'hidden md:flex']"
    >
      <button
        class="btns_btn py-2 px-3 md:px-2 md:py-0.5 text-lg text-gray-900 hover:bg-gray-100 md:hover:text-[#396f93] md:hover:border-[#396f93] md:bg-transparent md:hover:bg-transparent dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:border-gray-700 md:text-[#1b3546] rounded border-[#1b3546] md:border"
        :class="{ selected_catalog: $route.path === '/' + page.value }"
        @click="route(page.value)"
        v-for="page in catalog"
        v-show="
          !(page.isTest && !isTest2) &&
          !(page.isProduction && isTest2) &&
          !(page.isAdmin && !isAdmin) &&
          !page.hideId?.includes(accountId)
        "
        :disabled="isNavBarDisabled"
        :key="page"
        :style="{ order: isTest2 ? page.testOrder : 'unset' }"
      >
        {{ page.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "@vue/runtime-core";
import store from "@/store";
import router from "@/router";
import { isTest2 } from "@/composables/isTest";
import { onClickOutside, useToggle } from "@vueuse/core";

const accountId = computed(() => store.state.account?.account?.id);
const isAdmin = computed(() =>
  store.state.account?.user?.isAdmin === undefined
    ? true
    : store.state.account?.user?.isAdmin
);
const catalog = computed(() => store.state.data.catalog);
const isNavBarDisabled = computed(() => store.state.data.isNavBarDisabled);
const route = (page_name) => {
  toggleShow(false);
  router.push("/" + page_name);
};

const [isShow, toggleShow] = useToggle(false);
watchEffect(() => {
  isShow.value
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "auto");
});

const list = ref(null);
onClickOutside(list, () => toggleShow(false));
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.backdrop {
  z-index: 50;
}

.btns {
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
    // background: transparent;

    transition: all 0.15s ease-out;
    // @include font(400, 18px);
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
