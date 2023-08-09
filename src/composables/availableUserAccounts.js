import router from "@/router";
import store from "@/store";
import { reactive } from "vue";

export function useAvailableUserAccounts() {
  const availableUserAccounts = reactive({
    selected: {},
    list: [],
    select: async function (id) {
      const { success } = await store.dispatch("authSetAccount", {
        account_id: id,
      });
      if (success) router.push(router.currentRoute.value.path);
    },
    setList: async function () {
      const accounts = await store.dispatch("getUsersList");
      accounts.map((account) => (account.value = account.id));
      this.list = accounts;
      this.setSelected();
    },
    setSelected: function () {
      const id = store.state.account.user?.id;
      this.selected = this.list.find((account) => account.id === id);
    },
  });
  availableUserAccounts.setList();

  return { availableUserAccounts };
}
