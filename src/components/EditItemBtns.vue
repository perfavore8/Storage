<template>
  <div class="btns">
    <button class="btn btn_grey" @click="close_edit_modal()">Отмена</button>
    <button class="btn btn_dark_blue" @click="archive_data()">
      Архивировать
    </button>
    <button class="btn btn_blue" @click="save_data()">Сохранить</button>
  </div>
</template>

<script>
export default {
  methods: {
    archive_data() {
      this.$emit("archive");
    },
    close_edit_modal() {
      this.$emit("close");
    },
    save_data() {
      this.$emit("save");
    },
  },
};
</script>

<style lang="scss" scoped>
.btns {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
