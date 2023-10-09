<template>
  <div class="bg">
    <div class="backdrop filter" />
    <div class="modal">
      <h3 class="header">{{ $t("removeCat.header") }}</h3>
      <p class="text">
        {{ $t("removeCat.text") }}
      </p>
      <div class="buttons">
        <BtnsSaveClose @close="close" @save="remove">
          <template v-slot:save>{{ $t("removeCat.del") }}</template>
        </BtnsSaveClose>
      </div>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
export default {
  components: { BtnsSaveClose },
  created() {
    document.body.style.overflowY = "hidden";
  },
  unmounted() {
    document.body.style.overflowY = "auto";
  },
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
@import "@/app.scss";
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  font-family: "Inter";
  .filter {
    backdrop-filter: blur(1px);
    z-index: 1002;
  }

  .modal {
    position: relative;
    z-index: 1003;
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
