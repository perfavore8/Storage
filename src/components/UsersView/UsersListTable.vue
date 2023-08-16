<template>
  <div
    class="wrapper divide-y divide-slate-200/70 rounded-xl border border-solid border-slate-200/70 shadow-lg shadow-gray-400/10"
  >
    <div
      class="filters px-5 py-4 flex flex-row gap-2 justify-between items-center"
      v-if="false"
    >
      <div class="left">
        <div class="search w-full relative">
          <AppInput
            v-model:inputValue="searchValue"
            :placeholder="'Поиск пользователей'"
            :underlined="true"
          />
          <span
            class="material-icons-round absolute right-3 -translate-y-1/2 top-1/2 text-shark-500 cursor-pointer"
          >
            search
          </span>
        </div>
      </div>
      <div class="right">
        <button
          class="export btn order-1 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M8.71 7.71L11 5.41V15a1 1 0 0 0 2 0V5.41l2.29 2.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-.33-.21a1 1 0 0 0-.76 0a1 1 0 0 0-.33.21l-4 4a1 1 0 1 0 1.42 1.42ZM21 14a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4a1 1 0 0 0-2 0v4a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1Z"
            />
          </svg>
          Экспорт
        </button>
      </div>
    </div>
    <div class="main overflow-x-auto">
      <table class="w-full text-slate-500 whitespace-pre">
        <thead class="bg-slate-50 border-y border-solid border-slate-200/70">
          <tr>
            <th v-for="title in titiles" :key="title.code">{{ title.name }}</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td v-for="title in titiles" :key="title.code">
              <template v-if="title.code === 'name'">
                <div class="w-fit h-full flex flex-row gap-4 items-center">
                  <!-- <img
                    src="https://rozemarin.ru/local/templates/new_template/img/icon/avatar@3x.png"
                    class="h-10 aspect-auto"
                  /> -->
                  <div
                    class="h-10 w-10 rounded-full flex justify-center items-center font-semibold text-xl"
                    :style="{
                      backgroundColor: user.color + '20',
                      color: user.color,
                    }"
                    v-if="false"
                  >
                    {{ firstLetter(user.name) }}
                  </div>
                  <div class="flex flex-col">
                    <h3 class="text-gray-900 font-semibold">{{ user.name }}</h3>
                    <span>{{ user.email }}</span>
                  </div>
                </div>
              </template>
              <template v-else-if="title.code === 'is_active'">
                <div class="w-fit h-full flex flex-row gap-4 items-center">
                  <div
                    class="w-4 h-4 rounded-full flex items-center justify-center"
                    :style="{
                      'background-color':
                        (user.is_active === 1 ? '#4ade80' : '#fb7185') + '50',
                    }"
                  >
                    <div
                      class="w-2 h-2 rounded-full"
                      :style="{
                        'background-color':
                          (user.is_active === 1 ? '#4ade80' : '#fb7185') + '99',
                      }"
                    ></div>
                  </div>
                  {{ user.is_active === 1 ? "Включен" : "Не включен" }}
                </div>
              </template>
              <template v-else>{{ user[title.code] }}</template>
            </td>
            <td>
              <button
                class="export btn order-1 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
                @click="editUser.select(user)"
                :disabled="user.id === currentUserId || user.id === mainUserId"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
                  />
                </svg>
                Редактировать
              </button>
            </td>
            <td>
              <AppDelBtnAccept
                :btnClass="'!p-2 rounded-full !text-gray-500 disabled:!text-gray-300 hover:!text-red-500 transition-colors duration-300 bg-transparent'"
                :dropDownClass="'right-full mr-2 !mb-0 !-bottom-1/2'"
                :disabled="currentUserId !== mainUserId"
                @confirm="() => unLinkUser(user.id)"
              >
                <template #label>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 15 15"
                  >
                    <path
                      fill="currentColor"
                      d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z"
                    />
                  </svg>
                </template>
              </AppDelBtnAccept>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination p-5 flex justify-between items-center" v-if="false">
      <div class="left flex flex-row gap-1 items-center text-slate-500">
        Показывать:
        <GridBottom
          :count="20"
          :showBtns="false"
          @changeCount="null"
          class="!my-0 mr-2"
        />
        из {{ page.total }}
      </div>
      <div class="right">
        <AppPaginator :page="page" />
      </div>
    </div>
  </div>
  <EditUser
    v-if="showEditUser"
    :user="editUser.selected"
    @close="editUser.close()"
  />
</template>

<script>
import { computed, reactive } from "vue";
import AppInput from "../AppInput.vue";
import GridBottom from "../GridBottom.vue";
import AppPaginator from "../AppPaginator.vue";
import { useColor } from "@/composables/color";
import store from "@/store";
import EditUser from "./EditUser.vue";
import { useToggle } from "@vueuse/core";
import AppDelBtnAccept from "../AppDelBtnAccept.vue";
export default {
  components: { AppInput, GridBottom, AppPaginator, EditUser, AppDelBtnAccept },
  setup() {
    const { getRandomColor2 } = useColor();

    const page = reactive({
      total: 50,
      first: 1,
      prev: null,
      current: 1,
      next: 2,
      last: 3,
    });

    const titiles = reactive([
      { name: "Имя", code: "name" },
      // { name: "Группа", code: "group" },
      // { name: "Роль", code: "role" },
      { name: "Email", code: "email" },
      { name: "Телефон", code: "phone" },
      { name: "Статус", code: "is_active" },
    ]);
    const users = reactive([]);

    const setUsers = async () => {
      const list = await store.dispatch("getUsersList");
      Object.assign(users, list);
      users.map(
        (user) =>
          (user.color = computed(() => getRandomColor2().toLocaleLowerCase()))
      );
    };
    setUsers();

    const firstLetter = (str) => str?.[0]?.toLocaleUpperCase();

    const [showEditUser, toggleEditUser] = useToggle(false);
    const editUser = reactive({
      selected: {},
      select: function (user) {
        this.selected = user;
        toggleEditUser(true);
      },
      close: () => toggleEditUser(false),
    });

    const unLinkUser = async (id) => {
      await store.dispatch("unLinkUser", {
        user_id: id,
        account_id: store.state.account.account.id,
      });
      setUsers();
    };

    const mainUserId = computed(() => users.find((user) => user.is_main)?.id);
    const currentUserId = computed(() => store.state.account.user?.id);

    return {
      page,
      titiles,
      users,
      getRandomColor2,
      firstLetter,
      editUser,
      showEditUser,
      toggleEditUser,
      unLinkUser,
      mainUserId,
      currentUserId,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";

.left {
  width: clamp(100px, 30%, 300px);
}
th,
td {
  @apply py-4 px-5 text-left;
}

// th:first-child,
// td:first-child {
//   width: 1%;
// }

th:nth-last-child(2),
td:nth-last-child(2) {
  width: 1%;
  min-width: 211px;
}
th:last-child,
td:last-child {
  width: 1%;
}
</style>
