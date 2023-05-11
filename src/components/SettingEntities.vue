<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="container">
      <div class="header">
        <label>Настройки сущностей</label>
        <button class="close" @click="close()">
          <div class="icon"></div>
        </button>
      </div>
      <div class="content">
        <AppRadioBtnsGroupUnderlined
          class="w-full mx-auto"
          :list="tabs.list"
          :selected="tabs.selected"
          @select="(option) => tabs.select(option)"
        />
        <SettingEntitiesTable
          :selectedTab="tabs.selected"
          :key="tabs.selected.value"
        />
      </div>
      <div class="footer">
        <BtnsSaveClose @save="save" @close="close" :show_save="false">
          <template v-slot:close>Назад</template>
        </BtnsSaveClose>
      </div>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "./BtnsSaveClose.vue";
import AppRadioBtnsGroupUnderlined from "./AppRadioBtnsGroupUnderlined.vue";
import SettingEntitiesTable from "./SettingEntitiesTable.vue";
import store from "@/store";
import { useEntitiesTabs } from "@/composables/entitiesTabs";
export default {
  components: {
    BtnsSaveClose,
    AppRadioBtnsGroupUnderlined,
    SettingEntitiesTable,
  },
  setup() {
    const { tabs } = useEntitiesTabs();

    const save = () => {
      close();
    };

    const close = () => {
      store.commit("toggleSettingEntities", false);
    };

    return { close, save, tabs };
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
  .backdrop_with_filter {
    z-index: 259;
  }
  .container {
    position: relative;
    z-index: 260;
    max-width: 1140px;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    text-align: left;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 10px 50px;
      @include font(500, 20px);
      border-bottom: 2px solid #dee2e6;
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
        transition: background-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
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
    }
    .content {
      @include font(400, 16px);
      padding: 15px 50px;
      border-bottom: 2px solid #dee2e6;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 15px 50px;
    }
  }
}
</style>
