<template>
  <div class="modal">
    <div class="wrapper">
      <div class="modal-header">
        <div class="head-text">Настройка таблицы</div>
      </div>
      <div class="modal-body">
        <div class="text">
          <small class="small-text"
            >Перетаскивайте колонки для изменения очередности</small
          >
        </div>
        <draggable class="dragArea" :list="list" @change="changeData">
          <div class="item" v-for="item in list" :key="item.id">
            <input
              type="checkbox"
              v-model="item.table_config.visible"
              :id="item.id"
              class="checkbox"
              :disabled="
                item.table_config.visible === 2 ||
                item.table_config.visible === -1
              "
            />
            <label :for="item.id"></label>
            {{ item.name }}
          </div>
        </draggable>
      </div>
      <div class="modal-footer">
        <btns-save-close @close="close" @save="save" />
      </div>
    </div>
  </div>
</template>

<script>
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { defineComponent } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    BtnsSaveClose,
  },
  props: {},
  emits: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.list = JSON.parse(JSON.stringify(this.$store.state.fields.all_fields));
    this.list.map((item) => {
      if (item.table_config.visible === 1) item.table_config.visible = true;
      if (item.table_config.visible === 0) item.table_config.visible = false;
    });
  },
  methods: {
    save() {
      this.list.map((val, idx) => (val.table_config.sort = idx + 1));
      const params = {};
      this.list.forEach((val) => {
        let visible = val.table_config.visible;
        if (visible === false) visible = 0;
        if (visible === true) visible = 1;
        params[val.id] = {
          sort: val.table_config.sort,
          visible: visible,
        };
      });
      this.$store.dispatch("update_config_table", params);
      this.$store.commit("close_table_settings");
    },
    close() {
      this.$store.commit("close_table_settings");
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@/app.scss";
.modal {
  pointer-events: all;
}
.wrapper {
  box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
  display: flex;
  flex-direction: column;
  margin: auto;
  position: absolute;
  top: 1.75rem;
  left: calc(50% - 233px);
  user-select: none;
  height: auto;
  max-height: calc(100% - 3.5rem);
  max-width: 600px;
  min-width: 500px;
  overflow-y: clip;

  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  z-index: 9999999;
}
.modal-header {
  text-align: left;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
}
.modal-body {
  overflow-y: auto;
  padding: 16px;
  // padding-top: 0;
  .text {
    margin-bottom: 0.5rem !important;
    text-align: left;
    .small-text {
      @include font(400, 0.875em, 1.5);
    }
  }
}
.dragArea {
  display: flex;
  flex-direction: column;
  border-radius: 0.25rem;
  border-collapse: collapse;
}
.item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: grab;
  @include font(400, 1rem, 1.5);
  color: #212529;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-top: transparent;
}
.item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-top: 1px solid rgba(0, 0, 0, 0.125);
}
.item:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.checkbox + label::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
  cursor: pointer;
  transition: border-color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
.checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: #0b76ef;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}
.checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #b3d7ff;
}
.checkbox:not(:disabled):active + label::before {
  background-color: #b3d7ff;
  border-color: #b3d7ff;
}
.checkbox:disabled + label::before {
  background-color: #e9ecef;
  border-color: #b3d7ff;
  cursor: default;
}
.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
}
.head-text {
  @include font(500, 1.25em, 1.5);
}
.acceptButton {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  pointer-events: auto;
  box-sizing: border-box;
  font-family: inherit;
  text-transform: none;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 0.25rem;
  cursor: pointer;
}
.acceptButton:hover {
  border-color: #0256d4;
  background-color: #0256d4;
  box-shadow: 0 0 5px 2px rgb(2 86 212 / 25%);
}
.unAcceptButton {
  pointer-events: auto;
  box-sizing: border-box;
  font-family: inherit;
  text-transform: none;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
  margin: 0.25rem;
  cursor: pointer;
}
.unAcceptButton:hover {
  color: #fff;
  background-color: #5c636a;
  border-color: #565e64;
  box-shadow: 0 0 5px 2px rgb(86 94 100 / 25%);
}
.btn {
  @include font(400, 1rem, 1.5);
  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}
</style>
