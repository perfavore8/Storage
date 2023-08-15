<template>
  <div class="wrapper p-6 w-screen">
    <div class="header pb-8 mb-8 border-b border-solid border-slate-200/70">
      <AppHeader :selectedWH="{ name: 'Заказы', value: 'orders' }" />
      <div class="flex flex-row justify-between items-center mt-20">
        <div class="left flex flex-col items-start">
          <AppBreadcrumb :pages="pages" v-if="false" />
          <h1 class="text-2xl text-gray-900 font-semibold">
            {{ forTitle?.text }}
          </h1>
        </div>
        <div class="right">
          <button class="btn btn_dark_blue" @click="toggleAddNewUser(true)">
            Добавить пользователя
          </button>
        </div>
      </div>
    </div>
    <div class="main flex flex-col gap-8">
      <UsersActivity :list="usersActivity" v-if="false" />
      <UsersListTable ref="UserListTableRef" />
    </div>
  </div>
  <NewUser
    v-if="showAddNewUser"
    @close="toggleAddNewUser(false)"
    @confirm="() => updateList()"
  />
</template>

<script>
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import UsersActivity from "@/components/UsersView/UsersActivity.vue";
import store from "@/store";
import UsersListTable from "@/components/UsersView/UsersListTable.vue";
import AppHeader from "@/components/AppHeader.vue";
import { useToggle } from "@vueuse/core";
import NewUser from "@/components/UsersView/NewUser.vue";
export default {
  components: {
    AppBreadcrumb,
    UsersActivity,
    UsersListTable,
    AppHeader,
    NewUser,
  },
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

    const [showAddNewUser, toggleAddNewUser] = useToggle(false);

    const UserListTableRef = ref(null);
    const updateList = () => {
      UserListTableRef.value?.setUsers();
    };

    return {
      pages,
      forTitle,
      usersActivity,
      showAddNewUser,
      toggleAddNewUser,
      UserListTableRef,
      updateList,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
