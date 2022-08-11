<template>
  <div class="btns">
    <button class="btn1" @click="close_edit_modal()">Отмена</button>
    <button class="btn2" @click="archive_data()">Архивировать</button>
    <button class="btn3" @click="save_data()">Сохранить</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    idx_edit_modal: {
      type: Number,
      required: true,
    },
    new_edit_data: {
      type: Array,
      required: true,
    },
    selected_option_1: {
      type: Object,
      required: true,
    },
  },
  inject: ["isServicePage"],
  computed: {
    ...mapGetters(["fields"]),
  },
  methods: {
    archive_data() {
      this.isServicePage.value
        ? this.$store.commit("archive_service", [this.idx_edit_modal])
        : this.$store.commit("archive_data", [this.idx_edit_modal]);
      this.close_edit_modal();
    },
    close_edit_modal() {
      this.$store.commit("close_edit_modal");
    },
    save_data() {
      const payload = {
        idx: this.idx_edit_modal,
        data: this.new_edit_data,
      };
      const a = this.isServicePage.value;
      const b = this.selected_option_1.name == "Услуга";
      if (!a && !b) this.$store.commit("update_data_idx", payload);
      if (a && b) this.$store.commit("update_service_idx", payload);
      if (!a && b) {
        this.fields.forEach((val, idx) => {
          if (!val.available_to_services) payload.data[idx] = "";
        });
        this.$store.commit("remove_data_idx", payload),
          this.$store.commit("add_service", payload);
      }
      if (a && !b)
        this.$store.commit("remove_service_idx", payload),
          this.$store.commit("add_data", payload);
      this.close_edit_modal();
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
