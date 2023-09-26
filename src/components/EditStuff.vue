<template>
  <div class="wrapper">
    <div class="backdrop_with_filter" @click="close()" />
    <div class="bgc">
      <div class="container">
        <div class="header">
          <div class="top">
            <label>{{ $t("EditStuff.header") }}</label>
            <btns-save-close @close="close" @save="save">
              <template v-slot:close>{{ $t("global.back") }}</template>
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
                  {{ $t("EditStuff.otherDeals") }}
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
                  {{ $t("EditStuff.zeroCount") }}
                </label>
              </div>
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q4"
                  v-model="copyConfing.one_wh_per_lead"
                />
                <label for="q4">
                  {{ $t("EditStuff.oneWh") }}
                </label>
              </div>
              <div class="permit">
                <input
                  type="checkbox"
                  class="checkbox"
                  id="q5"
                  v-model="copyConfing.manual_budget_editing"
                />
                <label for="q5">
                  {{ $t("EditStuff.manualBudjet") }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <h6>{{ $t("EditStuff.stepsRes.header") }}</h6>
          <div class="small">
            {{ $t("EditStuff.stepsRes.text") }}
          </div>
          <div class="mt-4">
            <input
              type="checkbox"
              class="checkbox"
              id="lock_reserved_products_edit"
              v-model="lock_reserved_products_edit"
            />
            <label for="lock_reserved_products_edit">
              {{ $t("EditStuff.stepsRes.blockRes") }}
            </label>
          </div>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyPipelinesListV2"
              :key="item"
            >
              <label>
                {{ $t("EditStuff.stepsRes.hopper", { name: item?.name }) }}
              </label>
              <AppMultiSelect
                :list="[{ name: 'Все', value: 'all' }, ...item?.statuses]"
                :placeholder="
                  t('EditStuff.stepsRes.placeholder', {
                    count: item?.statuses.filter(
                      (val) => val.selected && val.value !== 'all'
                    ).length,
                  })
                "
                @select="
                  (event) =>
                    optionSelectSteps(event, item?.value, 'reserve_off')
                "
              />
            </div>
          </div>
          <h6>{{ $t("EditStuff.stepsWO.header") }}</h6>
          <div class="small">
            {{ $t("EditStuff.stepsWO.text") }}
          </div>
          <div class="steps">
            <div
              class="label_input"
              v-for="item in copyPipelinesListV2"
              :key="item"
            >
              <label>{{
                $t("EditStuff.stepsWO.hopper", { name: item?.name })
              }}</label>
              <SelectorVue
                :options_props="[
                  { name: t('global.notSelected'), value: -1 },
                  ...item?.statuses,
                ]"
                @select="
                  (event) => optionSelectSteps(event, item?.value, 'write_off')
                "
                :selected_option="item.selectedWriteOff"
              />
            </div>
          </div>
          <h6>{{ $t("EditStuff.dealBinding.header") }}</h6>
          <div class="steps">
            <div class="label_input">
              <label>{{ $t("EditStuff.dealBinding.budget") }}</label>
              <input
                type="checkbox"
                class="checkbox"
                id="not_fill_budget"
                v-model="not_fill_budget"
              />
              <label for="not_fill_budget"></label>
            </div>
            <div
              class="label_input"
              v-for="(item, idx) in leadsDeals"
              :key="item"
            >
              <label>
                {{ $t("EditStuff.dealBinding.field", { name: item?.name }) }}
                <span v-if="idx >= 2">{{
                  $t("EditStuff.dealBinding.number")
                }}</span>
              </label>
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
            <template v-slot:close>{{ $t("global.back") }}</template>
          </btns-save-close>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SelectorVue from "@/components/SelectorVue";
import AppMultiSelect from "./AppMultiSelect.vue";
import BtnsSaveClose from "@/components/BtnsSaveClose.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
const { t } = useLangConfiguration();

export default {
  setup() {
    return { t };
  },
  components: {
    SelectorVue,
    BtnsSaveClose,
    AppMultiSelect,
  },
  data() {
    return {
      copyConfing: {
        reserve_off: [],
        write_off: [],
      },
      copyPipelinesListV2: [],
      copyLeadFieldsList: [],
      leadsDeals: [
        {
          name: "Товары",
          code: "field_products",
          selected: { name: t("global.notSelected"), value: -1 },
        },
        {
          name: "Поле для поиска товаров",
          code: "field_search_products",
          selected: { name: t("global.notSelected"), value: -1 },
        },
        {
          name: "Себестоимость",
          code: "field_cost_price",
          selected: { name: t("global.notSelected"), value: -1 },
        },
        {
          name: "Прибыль",
          code: "field_profit",
          selected: { name: t("global.notSelected"), value: -1 },
        },

        {
          name: "Общий бюджет",
          code: "field_budget",
          selected: { name: t("global.notSelected"), value: -1 },
        },

        {
          name: "НДС сумма",
          code: "field_nds_sum",
          selected: { name: t("global.notSelected"), value: -1 },
        },
      ],
      leadsDealsList: [],
      not_fill_budget: false,
      lock_reserved_products_edit: false,
    };
  },
  async mounted() {
    await Promise.all([
      this.$store.dispatch("get_account"),
      this.$store.dispatch("getPipelinesListV2"),
      this.$store.dispatch("getLeadFieldsList"),
    ]);
    this.copyConfing = JSON.parse(
      JSON.stringify(this.$store.state.account.account.config)
    );
    if (!this.copyConfing.reserve_off_v2) this.copyConfing.reserve_off_v2 = [];
    this.not_fill_budget = Boolean(this.copyConfing?.not_fill_budget);
    this.lock_reserved_products_edit = Boolean(
      this.copyConfing?.lock_reserved_products_edit
    );
    this.copyPipelinesListV2 = this.pipelinesListV2;
    this.copyLeadFieldsList = this.leadFieldsList;
    this.fillLeadsDealsList();
    this.searchSelectedPipelines();
    this.searchSelectedLeadsDeals();
  },
  computed: {
    pipelinesListV2() {
      const list = [];
      Object.entries(this.$store.state.account.pipelinesListV2).map((val) => {
        const arr = [];
        val[1].statuses.forEach((stat) =>
          arr.push({
            name: stat.name,
            value: stat.id,
            color: stat.color,
            selected: false,
          })
        );
        val[1].statuses = [...arr];
        val[1].selectedWriteOff = { name: t("global.notSelected"), value: -1 };
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
        val[1].fields.unshift({ name: t("global.notSelected"), value: -1 });
        val[1].selected = { name: t("global.notSelected"), value: -1 };
        list.push({ value: val[0], ...val[1] });
      });
      return list;
    },
  },
  methods: {
    save() {
      const res = {
        not_fill_budget: this.not_fill_budget,
        lock_reserved_products_edit: this.lock_reserved_products_edit,
      };
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
      if (code !== "reserve_off") {
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
      }

      this.copyPipelinesListV2.map((val) => {
        if (val.value == value && code == "write_off") {
          val.selectedWriteOff = option;
        }
        if (val.value == value && code == "reserve_off") {
          if (option.value === "all") {
            val.statuses?.forEach((el) => {
              if (el.value !== "all") el.selected = !option.selected;
            });
          }
          option.selected = !option.selected;
        }
      });

      if (code === "reserve_off") {
        const pipeline = this.copyPipelinesListV2.find(
          (val) => val.value === value
        );
        const list = [];
        pipeline?.statuses?.forEach((stat) =>
          stat.selected && stat.value != "all" ? list.push(stat.value) : null
        );
        if (this.copyConfing.reserve_off_v2.find((el) => el.field === value))
          addNew = false;
        if (addNew) {
          this.copyConfing.reserve_off_v2.push({
            field: value,
            values: list,
          });
        } else {
          const item = this.copyConfing.reserve_off_v2.find(
            (el) => el.field === value
          );
          if (item) item.values = list;
        }
      }
    },
    searchSelectedInArr(item, arr, code) {
      let res = { name: t("global.notSelected"), value: -1 };
      arr.forEach((val) => {
        if (val[code] == item) res = val;
      });
      return res;
    },
    searchSelectedPipelines() {
      this.copyPipelinesListV2.map((val) => {
        const write_off = this.copyConfing.write_off.find(
          (item) => item.field == val.value
        );
        if (write_off)
          val.selectedWriteOff = this.searchSelectedInArr(
            write_off.value,
            val.statuses,
            "value"
          );

        const reserve_off_v2 = this.copyConfing?.reserve_off_v2?.find(
          (item) => item.field == val.value
        );
        val.statuses.map((stat) => {
          if (reserve_off_v2?.values?.includes(stat.value))
            stat.selected = true;
        });
        const unSelected = val.statuses.filter((stat) => !stat.selected);
        if (unSelected.length === 1 && unSelected[0].value === "all") {
          val.statuses.find((stat) => stat.value === "all").selected = true;
        }
      });
    },

    fillLeadsDealsList() {
      this.leadsDealsList.push({ name: t("global.notSelected"), value: -1 });
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
  .backdrop_with_filter {
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
          margin: 36px 0;
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
              width: 50%;
              margin-right: 24px;
              :deep(.title) {
                width: 100%;
              }
              :deep(.options) {
                text-align: left;
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
