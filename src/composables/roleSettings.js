import store from "@/store";
import { computed } from "vue";
import { reactive } from "vue";

export function useRoleSettings(folder) {
  const currentRole = computed(() => store.state.account.user?.role || "user");

  const settings = reactive({
    admin: {
      app: {
        settingsBtn: 1,
      },
      accountSettings: {
        usersList: { editBtn: 1, delBtn: 1 },
        general: { changeName: 1 },
        addNewUserBtn: 1,
      },
      orders: {
        tableSettingsBtn: 1,
      },
      products: {
        tableSettingsBtn: 1,
      },
    },
    user: {
      app: {
        settingsBtn: 0,
      },
      accountSettings: {
        usersList: { editBtn: 0, delBtn: 0 },
        general: { changeName: 0 },
        addNewUserBtn: 0,
      },
      orders: {
        tableSettingsBtn: 0,
      },
      products: {
        tableSettingsBtn: 0,
      },
    },
  });

  const currentSetSettings = computed(() => settings[currentRole.value]);
  const currentSetSettingsInFolder = computed(
    () => settings[currentRole.value][folder]
  );

  return {
    currentRole,
    settings,
    currentSetSettings,
    currentSetSettingsInFolder,
  };
}
