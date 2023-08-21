<template>
  <form class="grid gap-6">
    <span>Текущий пароль</span>
    <div class="relative">
      <input
        :type="showCurrentPassword ? 'text' : 'password'"
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
          <span class="material-icons-outlined icon" v-if="showCurrentPassword">
            visibility
          </span>
          <span class="material-icons-outlined icon" v-else>
            visibility_off
          </span>
        </transition>
      </label>
    </div>
    <span>Новый пароль</span>
    <input
      :type="showNewPasswords ? 'text' : 'password'"
      class="input"
      :class="{ input_error: form.errors.newPassword && trySubmit }"
      v-model="form.newPassword"
    />
    <span>Подтвердите новый пароль</span>
    <input
      :type="showNewPasswords ? 'text' : 'password'"
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
    <label for="showNewPasswords" class="w-fit">Показать пароль</label>
  </form>
</template>

<script>
import { useToggle } from "@vueuse/core";
import { computed, onDeactivated, reactive } from "vue";
import store from "@/store";
export default {
  props: { trySubmit: Boolean },
  setup() {
    const [showCurrentPassword, toggleCurrentPassword] = useToggle(false);
    const [showNewPasswords, toggleNewPasswords] = useToggle(false);

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

    const submit = async () => {
      let success = true;

      if (form.dontNeedSave) return true;

      Object.keys(form.errors).forEach(
        (key) => (success = success && !form.errors[key])
      );

      if (success && !form.dontNeedSave) {
        const { success: successReq } = await store.dispatch("updateUser", {
          password: form.currentPassword,
          password_new: form.newPassword,
          password_new_comfirm: form.confirmNewPassword,
        });
        success = success && successReq;
      } else {
        success = false;
      }

      return success;
    };

    return {
      showCurrentPassword,
      toggleCurrentPassword,
      showNewPasswords,
      toggleNewPasswords,
      form,
      submit,
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
