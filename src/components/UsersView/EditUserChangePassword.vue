<template>
  <div class="relative">
    <form class="grid gap-6">
      <span>{{ $t("EditUserChangePassword.currentPassword") }}</span>
      <div class="relative">
        <input
          :type="showCurrentPassword ? 'text' : 'password'"
          autocomplete="off"
          class="input"
          :class="{ input_error: form.errors.currentPassword && trySubmit }"
          v-model="form.currentPassword"
        />
        <input
          type="checkbox"
          class="checkbox visibility"
          v-model="showCurrentPassword"
          id="visibility"
        />
        <label for="visibility" class="text-slate-400">
          <transition name="modal" mode="out-in">
            <span
              class="material-icons-outlined icon"
              v-if="showCurrentPassword"
            >
              visibility
            </span>
            <span class="material-icons-outlined icon" v-else>
              visibility_off
            </span>
          </transition>
        </label>
      </div>
      <span>{{ $t("EditUserChangePassword.newPassword") }}</span>
      <input
        :type="showNewPasswords ? 'text' : 'password'"
        autocomplete="off"
        class="input"
        :class="{ input_error: form.errors.newPassword && trySubmit }"
        v-model="form.newPassword"
      />
      <span>{{ $t("EditUserChangePassword.confirmNewPassword") }}</span>
      <input
        :type="showNewPasswords ? 'text' : 'password'"
        autocomplete="off"
        class="input"
        :class="{ input_error: form.errors.confirmNewPassword }"
        v-model="form.confirmNewPassword"
      />
      <span></span>
      <input
        type="checkbox"
        id="showNewPasswords"
        class="checkbox"
        v-model="showNewPasswords"
      />
      <label for="showNewPasswords" class="w-fit">{{
        $t("EditUserChangePassword.showPassword")
      }}</label>
    </form>
    <div
      class="absolute flex flex-col gap-1 -bottom-1 left-1/3 translate-x-6 translate-y-full"
    >
      <transition name="fade">
        <small v-if="errors.value" class="text-red-700 text-sm origin-top">
          {{ errors.text || $t("global.somethingWrong") }}
        </small>
      </transition>
    </div>
  </div>
</template>

<script>
import { useToggle } from "@vueuse/core";
import { computed, onDeactivated, reactive } from "vue";
import store from "@/store";
import { useNotification } from "@/composables/notification";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  props: { trySubmit: Boolean },
  setup() {
    const [showCurrentPassword, toggleCurrentPassword] = useToggle(false);
    const [showNewPasswords, toggleNewPasswords] = useToggle(false);
    const { addNotification } = useNotification();
    const { t } = useLangConfiguration();

    const form = reactive({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      errors: {
        confirmNewPassword: computed(
          () => form.newPassword !== form.confirmNewPassword
        ),
        currentPassword: computed(() => !form.currentPassword),
        newPassword: computed(() => !form.newPassword),
      },
      dontNeedSave: computed(
        () =>
          !form.currentPassword && !form.newPassword && !form.confirmNewPassword
      ),
    });

    const dropAfterDeactivate = () => {
      form.currentPassword = "";
      form.newPassword = "";
      form.confirmNewPassword = "";
    };

    onDeactivated(() => dropAfterDeactivate());

    const errors = reactive({
      value: false,
      text: "",
    });

    const submit = async () => {
      let success = true;

      if (form.dontNeedSave) return true;

      Object.keys(form.errors).forEach(
        (key) => (success = success && !form.errors[key])
      );

      if (success && !form.dontNeedSave) {
        const { success: successReq, message } = await store.dispatch(
          "updateUser",
          {
            password: form.currentPassword,
            password_new: form.newPassword,
            password_new_confirm: form.confirmNewPassword,
          }
        );
        success = success && successReq;
        errors.text = message;
        errors.value = !successReq;

        if (successReq) {
          addNotification(
            1,
            t("EditUserChangePassword.changePassword"),
            message
          );
          dropAfterDeactivate();
        }
      } else {
        success = false;
      }
      if (form.dontNeedSave) success = true;

      return success;
    };

    return {
      showCurrentPassword,
      toggleCurrentPassword,
      showNewPasswords,
      toggleNewPasswords,
      form,
      submit,
      errors,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  grid-template-columns: 1fr 2fr;
}
.visibility {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.visibility + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
}
.visibility + label::before {
  content: "";
  display: inline-block;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 0.25em;
  position: absolute;
  border: none;

  // @include bg_image("@/assets/grid.svg", 100%);
  cursor: pointer;
  background: transparent !important;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.1s ease;
}
</style>
