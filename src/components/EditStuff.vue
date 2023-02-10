<template>
  <div class="wrapper">
    <div class="backdrop" @click="close()" />
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>Общие настройки</label>
            <btns-save-close @close="close" @save="save">
              <template v-slot:close>Назад</template>
            </btns-save-close>
          </div>
          <br />
          <div class="bottom">
            <div class="permits">
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q1"
                  v-model="copyConfing.allow_add_reserve"
                  @change="
                    () =>
                      copyConfing.allow_add_reserve
                        ? null
                        : (copyConfing.allow_add_with_zero_count = false)
                  "
                />
                <label for="q1">
                  Разрешать добавлять товары из резерва в другие сделки
                </label>
              </div>
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q3"
                  :disabled="!copyConfing.allow_add_reserve"
                  v-model="copyConfing.allow_add_with_zero_count"
                />
                <label for="q3">
                  Разрешать добавлять в сделки товар с нулевым остатком
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <h6>Этапы резервирования товаров со склада</h6>
          <div class="small">
            Внимание! В рамках одной воронки этап резерирования должен быть
            раньше этапа списания. Если этап презервирования не выбран, то
            резерирование будет происходить в момент добавления товара в сделку.
          </div>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyPipelinesList"
              :key="item"
            >
              <label> Воронка "{{ item?.name }}" </label>
              <SelectorVue
                :options_props="item?.statuses"
                @select="
                  (event) =>
                    optionSelectSteps(event, item?.value, 'reserve_off')
                "
                :selected_option="item.selectedReserveOff"
              />
            </div>
          </div>
          <h6>Этапы списания товаров со склада</h6>
          <div class="small">
            Внимание! В рамках одной воронки этап списания должен быть позже
            этапа резерирования.
          </div>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyPipelinesList"
              :key="item"
            >
              <label> Воронка "{{ item?.name }}" </label>
              <SelectorVue
                :options_props="item?.statuses"
                @select="
                  (event) => optionSelectSteps(event, item?.value, 'write_off')
                "
                :selected_option="item.selectedWriteOff"
              />
            </div>
          </div>
          <h6>Привязка полей сделок</h6>
          <div class="steps">
            <div class="label_input" v-for="item in leadsDeals" :key="item">
              <label> Поле "{{ item?.name }}" </label>
              <SelectorVue
                :options_props="leadsDealsList"
                @select="(event) => optionSelectLeadsDeals(event, item?.code)"
                :selected_option="item?.selected"
              />
            </div>
          </div>
        </div>
        <div class="footer">
          <btns-save-close @close="close" @save="save">
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
export default {
  components: {
    SelectorVue,
    BtnsSaveClose,
  },
  data() {
    return {
      copyConfing: {
        reserve_off: [],
        write_off: [],
      },
      copyPipelinesList: [],
      copyLeadFieldsList: [],
      leadsDeals: [
        {
          name: "Товары",
          code: "field_products",
          selected: { name: "Не выбрано", value: -1 },
        },
        {
          name: "Себестоимость",
          code: "field_cost_price",
          selected: { name: "Не выбрано", value: -1 },
        },
        {
          name: "Прибыль",
          code: "field_profit",
          selected: { name: "Не выбрано", value: -1 },
        },

        {
          name: "Общий бюджет",
          code: "field_budget",
          selected: { name: "Не выбрано", value: -1 },
        },

        {
          name: "НДС сумма",
          code: "field_nds_sum",
          selected: { name: "Не выбрано", value: -1 },
        },
      ],
      leadsDealsList: [],
    };
  },
  async mounted() {
    await this.$store.dispatch("get_account");
    this.copyConfing = JSON.parse(
      JSON.stringify(this.$store.state.account.account.config)
    );
    await this.$store.dispatch("getPipelinesList");
    this.copyPipelinesList = this.pipelinesList;
    await this.$store.dispatch("getLeadFieldsList");
    this.copyLeadFieldsList = this.leadFieldsList;
    this.fillLeadsDealsList();
    this.searchSelectedPipelines();
    this.searchSelectedLeadsDeals();
  },
  computed: {
    pipelinesList() {
      const list = [];
      Object.entries(this.$store.state.account.pipelinesList).map((val) => {
        const arr = [];
        Object.entries(val[1].statuses).forEach((stat) =>
          arr.push({ name: stat[1], value: stat[0] })
        );
        val[1].statuses = arr;
        val[1].statuses.unshift({ name: "Не выбрано", value: -1 });
        val[1].selectedReserveOff = { name: "Не выбрано", value: -1 };
        val[1].selectedWriteOff = { name: "Не выбрано", value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
    leadFieldsList() {
      const list = [];
      Object.entries(this.$store.state.account.leadFieldsList).map((val) => {
        const arr = [];
        Object.entries(val[1].fields).forEach((stat) =>
          arr.push({ name: stat[1], value: stat[0] })
        );
        val[1].fields = arr;
        val[1].fields.unshift({ name: "Не выбрано", value: -1 });
        val[1].selected = { name: "Не выбрано", value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
  },
  methods: {
    save() {
      const res = {};
      const config = this.$store.state.account.account.config;
      Object.entries(this.copyConfing).forEach((item) => {
        if (config[item[0]] !== item[1]) res[item[0]] = item[1];
      });
      this.$store.dispatch("update_account", res);
      this.close();
    },
    close() {
      this.$store.commit("open_close_edit_stuff", false);
    },
    optionSelectLeadsDeals(option, code) {
      if (option.value == -1) {
        this.copyConfing[code] = "0";
      } else {
        this.copyConfing[code] = option.value;
      }
      this.leadsDeals.map((val) => {
        if (val.code == code) val.selected = option;
      });
    },
    include(arr, value, code) {
      let res = false;
      arr.forEach((val) => {
        if (val[code] == value) res = true;
      });
      return res;
    },
    optionSelectSteps(option, value, code) {
      let addNew = true;
      if (this.include(this.copyConfing[code], value, "field")) {
        this.copyConfing[code].map((val) => {
          if (val.field == value) val.value = option.value;
        });
        addNew = false;
      }

      const obj = {
        field: value,
        value: option.value,
      };
      if (addNew) this.copyConfing[code].push(obj);

      if (option.value == -1) {
        this.copyConfing[code].forEach((val, idx) => {
          if (val.field == value) this.copyConfing[code].splice(idx, 1);
        });
      }

      this.copyPipelinesList.map((val) => {
        if (val.value == value) {
          if (code == "write_off") {
            val.selectedWriteOff = option;
          } else {
            val.selectedReserveOff = option;
          }
        }
      });
    },
    searchSelectedInArr(item, arr, code) {
      let res = { name: "Не выбрано", value: -1 };
      arr.forEach((val) => {
        if (val[code] == item) res = val;
      });
      return res;
    },
    searchSelectedPipelines() {
      this.copyPipelinesList.map((val) => {
        const reserve_off = this.copyConfing.reserve_off.filter(
          (item) => item.field == val.value
        );
        const write_off = this.copyConfing.write_off.filter(
          (item) => item.field == val.value
        );
        if (reserve_off.length)
          val.selectedReserveOff = this.searchSelectedInArr(
            reserve_off[0].value,
            val.statuses,
            "value"
          );
        if (write_off.length)
          val.selectedWriteOff = this.searchSelectedInArr(
            write_off[0].value,
            val.statuses,
            "value"
          );
      });
    },

    fillLeadsDealsList() {
      this.leadsDealsList.push({ name: "Не выбрано", value: -1 });
      this.copyLeadFieldsList.forEach((val) => {
        const optgroup = val.name;
        this.leadsDealsList.push({ name: optgroup, value: "optgroup" });
        const list = val.fields.splice(1, 999);
        list.forEach((item) =>
          this.leadsDealsList.push({ ...item, optgroup: true })
        );
      });
    },
    searchSelectedLeadsDeals() {
      this.leadsDeals.map((val) => {
        val.selected = this.searchSelectedInArr(
          this.copyConfing[val.code],
          this.leadsDealsList,
          "value"
        );
      });
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
  .backdrop {
    z-index: 259;
  }
  .bgc {
    position: relative;
    z-index: 260;
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
          flex-direction: column;
          gap: 16px;
          .permits {
            display: flex;
            flex-direction: column;
            gap: 10px;
            .permit {
              label {
                @include font(400, 16px);
              }
            }
          }
        }
      }
      .content {
        @include font(400, 16px);
        h6 {
          @include font(500, 16px);
        }
        .small {
          @include font(400, 14px);
        }
        .steps {
          display: flex;
          flex-direction: column;
          border: 1px solid #c9c9c9;
          border-radius: 4px;
          margin-top: 30px;
          padding: 10px;
          .label_input {
            display: flex;
            flex-direction: row;
            padding: 10px;
            label {
              width: 40%;
            }
            .v-select {
              width: calc(50% - 26px);
              margin-right: 24px;
              :deep(.title) {
                width: 100%;
              }
              :deep(.options) {
                width: calc(100% + 24px);
                text-align: left;
                p {
                  width: calc(100% - 24px);
                }
              }
            }
          }
        }
      }
      .footer {
        display: flex;
        justify-content: end;
        margin-top: 40px;
      }
    }
  }
}
.checkbox:disabled + label::before {
  background-color: #e9ecef;
  border-color: #b3d7ff;
  cursor: default;
}
</style>
