<template>
  <div v-for="(item, idx) in items" :key="item.id">
    <slot name="item" :item="item" :idx="idx"> </slot>
  </div>
</template>

<script>
export default {
  props: {
    items: { type: Array, required: true },
  },
};
</script>

<style lang="scss" scoped></style>
