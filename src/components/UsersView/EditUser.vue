<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container p-8 rounded-xl mt-7 min-w-[70%]">
      <div class="header flex flex-row justify-between">
        <h5 class="text-lg text-slate-800 font-semibold">
          {{ $t("AccountSettings.editUser.header") }}
        </h5>
        <button class="close" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="main flex flex-col gap-8">
        <form class="grid gap-6">
          <span>{{ $t("AccountSettings.editUser.activity") }}</span>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="copyUser.isActive"
              name="filter"
              id="filter"
              class="checkbox"
            />
            <label for="filter"></label>
          </div>
          <span>{{ $t("AccountSettings.editUser.admin") }}</span>
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="copyUser.role === 'admin'"
              name="filter"
              id="role_admin"
              class="checkbox"
              @change="
                () =>
                  copyUser.role === 'admin'
                    ? (copyUser.role = 'user')
                    : (copyUser.role = 'admin')
              "
            />
            <label for="role_admin"></label>
          </div>
          <span>{{ $t("AccountSettings.editUser.editing_remains") }}</span>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="copyUser.editing_remains"
              name="editing_remains"
              id="editing_remains"
              class="checkbox"
            />
            <label for="editing_remains"></label>
          </div>
          <span>{{ $t("AccountSettings.editUser.change_remains") }}</span>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="copyUser.change_remains"
              name="change_remains"
              id="change_remains"
              class="checkbox"
            />
            <label for="change_remains"></label>
          </div>
        </form>
      </div>
      <div class="footer flex flex-row justify-end gap-4">
        <button
          class="btn order-0 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          @click="close()"
        >
          {{ $t("global.back") }}
        </button>
        <button class="btn btn_blue" @click="submit()">
          {{ $t("global.save") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  components: {},
  props: { user: Object },
  setup(props, context) {
    const copyUser = reactive({ ...props.user });
    copyUser.isActive = Boolean(copyUser.is_active);
    copyUser.editing_remains = Boolean(copyUser.config.editing_remains);
    copyUser.change_remains = Boolean(copyUser.config.change_remains);

    const close = () => context.emit("close");

    const submit = () => {
      context.emit("submit", {
        is_active: Number(copyUser.isActive),
        editing_remains: Number(copyUser.editing_remains),
        change_remains: Number(copyUser.change_remains),
        role: copyUser.role,
      });
      close();
    };

    return { close, submit, copyUser };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.grid {
  grid-template-columns: 1fr 2fr;
}
.wrapper {
  pointer-events: all;
  width: 100%;
  height: max-content;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  @include font(400, 16px);
  .backdrop {
    z-index: 259;
  }
  .container {
    position: relative;
    width: fit-content;
    z-index: 260;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.75rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
}
.close {
  background: transparent;
  border-radius: 0 5px 5px 0;
  height: 30px;
  width: 30px;
  margin: 0 auto;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0;
  margin-right: -10px;
  .icon {
    width: inherit;
    height: inherit;
    transition: transform 0.15s ease-in-out;
    @include bg_image("@/assets/cross_black.svg", 60%);
  }
  .icon:hover {
    transform: rotate(90deg);
  }
}
</style>
