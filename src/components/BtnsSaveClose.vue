<template>
  <div class="btns">
    <button class="btn btn1" @click="close()" v-if="show_close">
      <slot name="close">Отмена</slot>
    </button>
    <button class="btn btn2" @click="save()" v-if="show_save">
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

  .btn {
    cursor: pointer;
    padding: 6px 12px;
    height: 36px;
    border: none;
    @include font(400, 16px);
    border-radius: 5px;
    transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn1 {
    color: #fff;
    background-color: #6c757d;
  }
  .btn1:hover {
    background-color: #5f676d;
    box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
  }
  .btn2 {
    color: #fff;
    background-color: #0d6efd;
  }
  .btn2:hover {
    background-color: #0256d4;
    box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
  }
}
</style>
