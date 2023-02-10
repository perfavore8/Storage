<template>
  <div class="wrapper">
    <div class="backdrop" @click="close()" />
    <div class="container" v-if="!isAccept">
      <div class="header">
        <label>Изменение цены "{{ copyEditPrice?.name }}"</label>
        <button class="btn cross" @click="close()"></button>
      </div>
      <div class="content">
        <label>Цена:</label>
        <input type="number" class="input" v-model="copyEditPrice.price" />
      </div>
      <div class="footer">
        <btns-save-close @close="close" :show_save="false">
          <template v-slot:close>Назад</template>
          <template v-slot:other_btns>
            <button class="btn btn_dark_blue" @click="accept()">
              Сохранить
            </button>
          </template>
        </btns-save-close>
      </div>
    </div>
    <div class="container" v-else>
      <div class="header">
        <label>Изменить цену этого товара в открытых сделках?</label>
        <button class="btn cross" @click="closeAccept()"></button>
      </div>
      <div class="footer">
        <btns-save-close @close="dismiss" :show_save="false">
          <template v-slot:close>Нет</template>
          <template v-slot:other_btns>
            <button class="btn btn_dark_blue" @click="confirm()">Да</button>
          </template>
        </btns-save-close>
      </div>
    </div>
  </div>
</template>
<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
export default {
  components: {
    BtnsSaveClose,
  },
  props: {
    editPrice: {
      type: Object,
    },
  },
  data() {
    return {
      isAccept: false,
      copyEditPrice: {
        name: "",
        price: 0,
        product_id: null,
        is_update_leads: false,
        price_field_code: null,
      },
    };
  },
  mounted() {
    Object.assign(this.copyEditPrice, this.editPrice);
  },
  methods: {
    accept() {
      this.isAccept = true;
    },
    close() {
      this.$store.commit("openCloseEditPrice", false);
    },
    closeAccept() {
      this.isAccept = false;
    },
    dismiss() {
      this.copyEditPrice.is_update_leads = false;
      this.save();
    },
    confirm() {
      this.copyEditPrice.is_update_leads = true;
      this.save();
    },
    async save() {
      const params = { ...this.copyEditPrice };
      params.is_update_leads = params.is_update_leads ? 1 : 0;
      delete params.name;
      await this.$store.dispatch("setPrice", params);
      this.close();
      this.$emit("close");
    },
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
  .backdrop {
    z-index: 259;
  }
  .container {
    z-index: 260;
    width: 500px;
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
      align-items: center;
      gap: 40px;
      padding: 12px 32px;
      @include font(500, 20px);
      border-bottom: 2px solid #dee2e6;
      .cross {
        background-color: transparent;
        width: 16px;
        height: 16px;
        transition: transform 0.15s ease-in-out;
        @include bg_image("@/assets/cross_black.svg", 100% 100%);
      }
      .cross:hover {
        transform: rotate(90deg);
      }
    }
    .content {
      @include font(400, 16px);
      padding: 12px 32px;
      border-bottom: 2px solid #dee2e6;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .footer {
      display: flex;
      justify-content: end;
      padding: 12px 32px;
    }
  }
}
</style>
