<template>
  <div>
    <router-link :to="'/availablePublicOrderList'">
      <button class="btn_white whitespace-nowrap auto z-[47]">
        {{ $t("newOrder.myOrders") }}
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
