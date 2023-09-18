<template>
  <div class="wrapper p-6">
    <div class="header pb-8 mb-8 border-b border-solid border-slate-200/70">
      <AppHeader :selectedWH="{ name: 'Заказы', value: 'orders' }" />
      <div class="grid grid-cols-3 items-center justify-center mt-20">
        <div class="left flex flex-col items-start justify-self-start">
          <h1 class="text-2xl text-gray-900 font-semibold">
            {{ $t("AccountSettings.header") }}
          </h1>
        </div>
        <div class="pagination flex justify-center">
          <AppRadioBtnsGroup
            :selected="pagination.selected"
            :list="pagination.list"
            @select="(op) => pagination.select(op)"
          >
          </AppRadioBtnsGroup>
        </div>
        <div class="right justify-self-end">
          <button
            class="btn btn_dark_blue"
            @click="toggleAddNewUser(true)"
            v-if="
              pagination.selected.value === 'users' &&
              !(isTest && !currentSetSettingsInFolder.general.changeName)
            "
          >
            {{ $t("AccountSettings.users.addBtn") }}
          </button>
        </div>
      </div>
    </div>
    <div class="main flex flex-col gap-8">
      <component :is="pagination.selected.component" />
    </div>
  </div>
  <NewUser
    v-if="showAddNewUser"
    @close="toggleAddNewUser(false)"
    @confirm="() => updateList()"
  />
</template>

<script>
import { reactive, ref } from "vue";
import UsersListTable from "@/components/UsersView/UsersListTable.vue";
import PlansList from "@/components/Plans/PlansList.vue";
import AccountSettingsGeneral from "@/components/AccountSettings/AccountSettingsGeneral.vue";
import AppHeader from "@/components/AppHeader.vue";
import { useToggle } from "@vueuse/core";
import NewUser from "@/components/UsersView/NewUser.vue";
import AppRadioBtnsGroup from "@/components/AppRadioBtnsGroup.vue";
import { useRoleSettings } from "@/composables/roleSettings";
import { isTest } from "@/composables/isTest";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: {
    UsersListTable,
    PlansList,
    AccountSettingsGeneral,
    AppHeader,
    NewUser,
    AppRadioBtnsGroup,
  },
  setup() {
    const [showAddNewUser, toggleAddNewUser] = useToggle(false);
    const { currentSetSettingsInFolder } = useRoleSettings("accountSettings");
    const { t } = useLangConfiguration();

    const UserListTableRef = ref(null);
    const updateList = () => {
      UserListTableRef.value?.setUsers();
    };

    const pagination = reactive({
      selected: {},
      list: [
        {
          name: t("AccountSettings.general.header"),
          value: "general",
          component: "AccountSettingsGeneral",
          default: true,
        },
        {
          name: t("AccountSettings.users.header"),
          value: "users",
          component: "UsersListTable",
        },
        {
          name: t("AccountSettings.license.header"),
          value: "license",
          component: "PlansList",
        },
      ],
      select: function (option) {
        this.selected = option;
      },
      dropToDefault: function () {
        const def = this.list.find((el) => el.default);
        this.select(def);
      },
    });
    pagination.dropToDefault();

    return {
      pagination,
      showAddNewUser,
      toggleAddNewUser,
      UserListTableRef,
      updateList,
      currentSetSettingsInFolder,
      isTest,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  width: calc(100vw - 8px);
}
</style>
