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
    },
    user: {
      app: {
        settingsBtn: 0,
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
