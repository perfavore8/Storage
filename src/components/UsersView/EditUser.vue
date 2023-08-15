<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container p-8 rounded-xl mt-7 min-w-[70%]">
      <div class="header flex flex-row justify-between">
        <h5 class="text-lg text-slate-800 font-semibold">
          Редактирование пользователя
        </h5>
        <button class="close" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="main flex flex-col gap-8">
        <div class="pagination flex justify-center">
          <AppRadioBtnsGroup
            :selected="pagination.selected"
            :list="pagination.list"
            @select="(op) => pagination.select(op)"
          >
            <template
              v-for="(item, idx) in pagination.list"
              :key="item.value"
              #[`item${idx}`]
            >
              <div
                v-if="item.haveErrors && trySubmit"
                class="w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-0 z-10"
                :style="{
                  'background-color': '#fb718570',
                }"
              >
                <div
                  class="w-2 h-2 rounded-full"
                  :style="{
                    'background-color': '#fb7185ff',
                  }"
                ></div>
              </div>
            </template>
          </AppRadioBtnsGroup>
        </div>
        <KeepAlive :include="pagination.list">
          <component
            :is="pagination.selected.component"
            :user="user"
            :trySubmit="trySubmit"
            :ref="(ref) => pagination.saveRef(ref, pagination.selected.value)"
          />
        </KeepAlive>
      </div>
      <div class="footer flex flex-row justify-end gap-4">
        <button
          class="btn order-0 max-h-[34px] pointer-events-auto relative inline-flex items-center gap-2 whitespace-nowrap w-fit rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900 hover:disabled:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
          @click="close()"
        >
          Назад
        </button>
        <button class="btn btn_blue" @click="submit()">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import AppRadioBtnsGroup from "../AppRadioBtnsGroup.vue";
import EditUserProfile from "./EditUserProfile.vue";
import EditUserChangePassword from "./EditUserChangePassword.vue";
import EditUserConfiguration from "./EditUserConfiguration.vue";
import { useToggle } from "@vueuse/core";
export default {
  components: {
    AppRadioBtnsGroup,
    EditUserProfile,
    EditUserChangePassword,
    EditUserConfiguration,
  },
  props: { user: Object },
  setup(props, context) {
    const pagination = reactive({
      selected: {},
      list: [
        {
          name: "Профиль",
          value: "profile",
          component: "EditUserProfile",
          ref: null,
          haveErrors: false,
          default: true,
        },
        {
          name: "Изменение пароля",
          value: "changePassword",
          component: "EditUserChangePassword",
          ref: null,
          haveErrors: false,
        },
        // {
        //   name: "Права доступа",
        //   value: "usersConfiguration",
        //   component: "EditUserConfiguration",
        // },
      ],
      select: function (option) {
        this.selected = option;
      },
      dropToDefault: function () {
        const def = this.list.find((el) => el.default);
        this.select(def);
      },
      saveRef: function (ref, value) {
        if (!ref) return;
        const item = this.list.find((el) => el.value === value);
        if (item.ref) return;
        item.ref = ref;
        this.selected.ref = ref;
      },
    });
    pagination.dropToDefault();

    const close = () => context.emit("close");

    const [trySubmit, toggleTrySubmit] = useToggle(false);
    const submit = () => {
      let success = true;
      pagination.list.forEach((item) => {
        if (!item.ref) return;
        item.haveErrors = !item.ref?.submit();
        success = success && !item.haveErrors;
      });
      if (success) {
        close();
      } else {
        toggleTrySubmit(true);
      }
    };

    return { pagination, close, trySubmit, toggleTrySubmit, submit };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
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
