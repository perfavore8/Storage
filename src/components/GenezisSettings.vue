<template>
  <div class="wrapper">
    <h6>{{ label }}</h6>
    <div class="steps">
      <div class="label_input" v-for="item in copyLeadsDeals" :key="item">
        <label> Поле "{{ item?.name }}" </label>
        <SelectorVue
          :options_props="copyLeadsDealsList"
          @select="(event) => optionSelectLeadsDeals(event, item?.code)"
          :selected_option="item?.selected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch } from "@vue/runtime-core";
import SelectorVue from "./SelectorVue.vue";
import store from "@/store";
export default {
  components: { SelectorVue },
  props: {
    label: String,
    leadsDeals: Array,
    needSave: Boolean,
  },
  setup(props) {
    const copyLeadsDeals = reactive([]);

    const copyLeadsDealsList = reactive([]);

    let copyConfing = {};

    const needSave = computed(() => props.needSave);

    watch(needSave, () => (props.needSave ? save() : null));

    const copyLeadFieldsList = computed(() => {
      const list = [];
      Object.entries(store.state.account.leadFieldsList).map((val) => {
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
    });

    const fillLeadsDealsList = () => {
      copyLeadsDealsList.push({ name: "Не выбрано", value: -1 });
      copyLeadFieldsList.value.forEach((val) => {
        const optgroup = val.name;
        copyLeadsDealsList.push({ name: optgroup, value: "optgroup" });
        const list = val.fields.splice(1, 999);
        list.forEach((item) =>
          copyLeadsDealsList.push({ ...item, optgroup: true })
        );
      });
    };
    const searchSelectedLeadsDeals = () => {
      copyLeadsDeals.map((val) => {
        val.selected = searchSelectedInArr(
          copyConfing[val.code],
          copyLeadsDealsList,
          "value"
        );
      });
    };
    const searchSelectedInArr = (item, arr, code) => {
      let res = { name: "Не выбрано", value: -1 };
      arr.forEach((val) => {
        if (val[code] == item) res = val;
      });
      return res;
    };

    const optionSelectLeadsDeals = (option, code) => {
      if (option.value == -1) {
        copyConfing[code] = "0";
      } else {
        copyConfing[code] = option.value;
      }
      copyLeadsDeals.map((val) => {
        if (val.code == code) val.selected = option;
      });
    };

    const save = () => {
      const res = {};
      copyLeadsDeals.forEach((deal) => {
        if (deal.selected.value != -1) res[deal.code] = deal.selected.value;
      });
      store.dispatch("update_account", res);
    };

    onMounted(async () => {
      await store.dispatch("get_account");
      await store.dispatch("getLeadFieldsList");
      copyConfing = JSON.parse(
        JSON.stringify(store.state.account.account.config)
      );
      Object.assign(copyLeadsDeals, props.leadsDeals);
      fillLeadsDealsList();
      searchSelectedLeadsDeals();
    });

    return { copyLeadsDeals, copyLeadsDealsList, optionSelectLeadsDeals };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.wrapper {
  width: fit-content;
  min-width: 70%;
  h6 {
    @include font(500, 16px);
    margin: 0;
    text-align: start;
  }
  .steps {
    @include font(400, 16px);
    display: flex;
    flex-direction: column;
    border: 1px solid #c9c9c9;
    border-radius: 4px;
    margin-top: 16px;
    padding: 10px;
    .label_input {
      display: grid;
      grid-template-columns: 4fr 6fr;
      padding: 10px;
      label {
        text-align: start;
        // width: 40%;
      }
      .v-select {
        width: 100%;
        // margin-right: 24px;
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
</style>
