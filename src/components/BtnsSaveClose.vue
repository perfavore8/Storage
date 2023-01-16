<template>
  <div class="btns">
    <button class="btn btn_grey" @click="close()" v-if="show_close">
      <slot name="close">Отмена</slot>
    </button>
    <slot name="other_btns"></slot>
    <button class="btn btn_blue" @click="save()" v-if="show_save">
      <slot name="save">Сохранить</slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    show_close: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
    },
    show_save: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
    },
  },
  emits: { close: null, save: null },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.btns {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
