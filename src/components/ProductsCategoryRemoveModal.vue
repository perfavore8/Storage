<template>
  <div class="bg">
    <div class="modal">
      <h3 class="header">Подтверждаете удаление категории?</h3>
      <p class="text">
        В случае удаления категории свойства товаров этой категории будут
        перенесены в корневую категорию
      </p>
      <div class="buttons">
        <BtnsSaveClose @close="close" @save="remove">
          <template v-slot:save>Удалить</template>
        </BtnsSaveClose>
      </div>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
export default {
  components: { BtnsSaveClose },
  methods: {
    close() {
      this.$emit("close");
    },
    remove() {
      this.$emit("remove");
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1001;
  font-family: "Inter";

  .modal {
    padding: 20px;
    border-radius: 0.3rem;
    filter: none !important;
    margin: 60px auto;
    width: 400px;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    display: flex;
    flex-direction: column;

    .buttons {
      margin-top: 10px;
      display: flex;
      justify-content: end;
    }
  }
}
</style>
