<template>
  <div class="btns">
    <button class="btn1" @click="close_edit_modal()">Отмена</button>
    <button class="btn2" @click="archive_data()">Архивировать</button>
    <button class="btn3" @click="save_data()">Сохранить</button>
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
  button {
    cursor: pointer;
    padding: 6px 12px;
    height: 36px;
    width: 130px;
    border: none;
    border-radius: 5px;
    font-weight: 400;
    line-height: 1.5;
    font-size: 1rem;
    transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn1 {
    color: #fff;
    background: #1b3546f1;
  }
  .btn1:hover {
    background: #1b3546d9;
    box-shadow: 0 0 5px 2px rgb(27 53 70 / 25%);
  }
  .btn2 {
    color: #fff;
    background-color: #6c757d;
  }
  .btn2:hover {
    background-color: #5f676d;
    box-shadow: 0 0 5px 2px rgb(95 103 109 / 25%);
  }
  .btn3 {
    color: #fff;
    background-color: #0d6efd;
  }
  .btn3:hover {
    background-color: #0256d4;
    box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
  }
}
</style>
