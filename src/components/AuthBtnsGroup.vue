<template>
  <AppRadioBtnsGroup
    :selected="notificationSystem.selected"
    :list="notificationSystem.list.filter((el) => !(isSignUp && el.signUpHide))"
    @select="(option) => notificationSystem.select(option)"
  >
    <template
      v-for="(item, idx) in notificationSystem.list"
      :key="item.value"
      #[`item${idx}`]
    >
      <div
        class="icon"
        :style="{ 'background-image': 'url(' + item.iconUrl + ')' }"
      />
    </template>
  </AppRadioBtnsGroup>
</template>

<script>
import AppRadioBtnsGroup from "./AppRadioBtnsGroup.vue";
export default {
  components: { AppRadioBtnsGroup },
  props: {
    notificationSystem: { type: Object, required: true },
    isSignUp: Boolean,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
$size: 24px;
.icon {
  width: $size;
  height: $size;
  background-color: transparent;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
}
.btns_group {
  :deep(.btn) {
    height: calc($size + 12px);
  }
  :deep(.selected) {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
