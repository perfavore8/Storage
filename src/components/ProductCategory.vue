<template>
  <div class="wrapper">
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Свойства товаров</label>
            <btns-save-close @close="close_product_category" @save="save">
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div>
            <button
              v-for="(cat, idx) in selected_fields_properties"
              :key="cat.name"
              @click="prev_cat(idx)"
            >
              {{ cat.name }}
            </button>
          </div>
          <div class="bottom">
            <SelectorVue
              :options_props="data_fields_properties.items"
              @select="option_select_fields_properties"
              :selected_option="data_fields_properties.selected"
            />
            <button style="margin-left: 40px" @click="add_new(fields_cat_name)">
              +
            </button>
            <button @click="remove()">-</button>
            <button @click="rename(fields_cat_name)">~</button>
            <input type="text" v-model="fields_cat_name" />
            <button @click="copy_category()">copy</button>
            <button @click="paste_category()">paste</button>
          </div>
        </div>
        <div class="content"></div>
        <div class="footer">
          <btns-save-close @close="close_product_category" @save="save">
            <template v-slot:close>Назад</template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectorVue from "@/components/SelectorVue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  data() {
    return {
      copy_fields_properties: [],
      selected_fields_properties: [],
      data_fields_properties: {
        items: null,
        selected: { name: "", value: -1 },
      },
      fields_cat_name: "",
      copied_category_id: null,
    };
  },
  mounted() {
    this.selected_fields_properties = [];
    this.copy_fields_properties = JSON.parse(
      JSON.stringify(this.fields_properties)
    );
    this.option_select_fields_properties({
      value: this.copy_fields_properties.filter(
        (val) => val.parent_id === 0
      )[0],
    });
  },
  computed: {
    ...mapGetters(["fields_properties"]),
  },
  methods: {
    save() {
      this.$store.commit(
        "update_fields_properties",
        this.copy_fields_properties
      );
      this.close_product_category();
    },
    new_id() {
      let id = 0;
      this.copy_fields_properties.forEach((val) =>
        val.id > id ? (id = val.id) : null
      );
      return id + 1;
    },
    // FIXME 2 когда добавляешь до 10 левела ломаются айдишники в levels ???
    add_new(name) {
      const parent = this.selected_fields_properties.at(-1);
      const new_fields_cat = {
        name: name,
        id: this.new_id(),
        parent_id: parent.id,
        idxes: [],
        level: parent.level + 1,
        levels: parent.levels,
      };
      new_fields_cat.levels[parent.level] = new_fields_cat.id;
      if (new_fields_cat.level <= 10)
        this.copy_fields_properties.push(new_fields_cat),
          this.feel_data_fields_properties(new_fields_cat.parent_id),
          this.reset_fields_cat_name();
    },
    remove() {
      if (this.selected_fields_properties.at(-1).level != 1) {
        this.copy_fields_properties = this.copy_fields_properties.filter(
          (val) => val.id != this.selected_fields_properties.at(-1).id
        );
        this.prev_cat(this.selected_fields_properties.length - 2);
      }
    },
    rename(new_name) {
      const last_item = this.selected_fields_properties.at(-1);
      if (last_item.level != 1) {
        this.copy_fields_properties.map((val) =>
          val.id === last_item.id ? (val.name = new_name) : null
        );
        last_item.name = new_name;
        this.feel_data_fields_properties(last_item.id);
        this.reset_fields_cat_name();
      }
    },
    reset_fields_cat_name() {
      this.fields_cat_name = "";
    },
    copy_category() {
      this.copied_category_id = this.selected_fields_properties.at(-1).id;
    },
    paste_category() {
      const parent_category = this.selected_fields_properties.at(-1);
      if (parent_category.parent_id !== 0) {
        const copied_category = this.copy_fields_properties.filter(
          (val) => val.id === this.copied_category_id
        )[0];
        copied_category.parent_id = parent_category.id;
        copied_category.level = parent_category.level + 1;
        copied_category.levels = [];
        copied_category.levels.push(...parent_category.levels);
        copied_category.levels[parent_category.level] = copied_category.id;
        this.prev_cat(this.selected_fields_properties.length - 1);
      }
    },
    prev_cat(idx) {
      this.selected_fields_properties.splice(idx + 1);
      this.feel_data_fields_properties(
        this.selected_fields_properties.at(-1).id
      );
    },
    feel_data_fields_properties(id) {
      this.data_fields_properties.items = this.preparing_fields_properties(id);
    },
    preparing_fields_properties(id) {
      const new_arr = [];
      const arr = this.copy_fields_properties.filter(
        (val) => val.parent_id == id
      );
      arr.forEach((val) => new_arr.push({ name: val.name, value: val }));
      return new_arr;
    },
    option_select_fields_properties(val) {
      const value = JSON.parse(JSON.stringify(val));
      this.selected_fields_properties.push(value.value);
      this.feel_data_fields_properties(val.value.id);
    },

    close_product_category() {
      this.$store.commit("open_close_product_category", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  pointer-events: all;
  z-index: 9999999;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  .bgc {
    width: 80%;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    margin: 30px auto;
    outline: 0;
    box-shadow: 0 0 7px 6px rgb(206 212 218 / 50%);
    .container {
      text-align: left;
      width: 80%;
      margin: 30px auto;
      display: flex;
      flex-direction: column;
      .header {
        display: flex;
        flex-direction: column;
        justify-content: start;
        .top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px solid #c9c9c9;
          padding-bottom: 10px;
          label {
            @include font(500, 28px);
          }
        }
        .bottom {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
      }
      .content {
        @include font(400, 16px);
      }
      .footer {
        display: flex;
        justify-content: end;
        margin-top: 60px;
      }
    }
  }
}
.input {
  height: 20px;
  padding: 6px 12px;
  background-color: white;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @include font(400, 16px, 20px);
}
.input:focus {
  color: #212529;
  background-color: white;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 4px rgb(13 110 253 / 25%);
}
</style>
