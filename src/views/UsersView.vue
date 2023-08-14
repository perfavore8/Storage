<template>
  <div class="wrapper p-6 w-screen">
    <div
      class="header flex flex-row justify-between items-center pb-8 mb-8 border-b border-solid border-slate-200/70"
    >
      <div class="left flex flex-col items-start">
        <AppBreadcrumb :pages="pages" v-if="false" />
        <h1 class="text-2xl text-gray-900 font-semibold">
          {{ forTitle?.text }}
        </h1>
      </div>
      <div class="right">
        <button class="btn btn_blue flex gap-2 !py-2 !h-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M21 14h-6a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2zm-3 3a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1zM9 6c1.654 0 3 1.346 3 3s-1.346 3-3 3s-3-1.346-3-3s1.346-3 3-3m0-2C6.236 4 4 6.238 4 9s2.236 5 5 5s5-2.238 5-5s-2.236-5-5-5zm0 13c2.021 0 3.301.771 3.783 1.445C12.1 18.705 10.814 19 9 19c-1.984 0-3.206-.305-3.818-.542C5.641 17.743 6.959 17 9 17m0-2c-3.75 0-6 2-6 4c0 1 2.25 2 6 2c3.518 0 6-1 6-2c0-2-2.354-4-6-4z"
            />
          </svg>
          Добавить
        </button>
      </div>
    </div>
    <div class="main flex flex-col gap-8">
      <UsersActivity :list="usersActivity" v-if="false" />
      <UsersListTable />
    </div>
  </div>
</template>

<script>
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import UsersActivity from "@/components/UsersView/UsersActivity.vue";
import store from "@/store";
import UsersListTable from "@/components/UsersView/UsersListTable.vue";
export default {
  components: { AppBreadcrumb, UsersActivity, UsersListTable },
  setup() {
    const router = useRouter();

    const pages = reactive([
      {
        id: 1,
        text: "<span class='material-icons-round' style='font-size: 20px'>home</span>",
        select: () => router.push("/"),
      },
      {
        id: 2,
        forTitle: true,
        text: "Пользователи",
        select: () => {
          router.push("/");
          store.commit("open_close_settings");
        },
      },
      {
        id: 3,
        text: "Список",
        select: () => {},
      },
    ]);
    const forTitle = computed(() => pages.find((el) => el.forTitle));

    const usersActivity = reactive([
      {
        id: 1,
        header: "TOTAL USERS",
        firstNumber: "24",
        secondNumber: "22",
        stat: { text: "5.0%", direction: 1 },
      },
      {
        id: 2,
        header: "ACTIVE MEMBERS",
        firstNumber: "12",
        secondNumber: "11",
        stat: { text: "1.2%", direction: 1 },
      },
      {
        id: 3,
        header: "NEW/RETURNING",
        firstNumber: "56 %",
        secondNumber: "48.7",
        stat: { text: "2.8%", direction: 0 },
      },
      {
        id: 4,
        header: "ACTIVE MEMBERS",
        firstNumber: "28 %",
        secondNumber: "28.6%",
        stat: { text: "0.0%", direction: 2 },
      },
    ]);

    return { pages, forTitle, usersActivity };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
