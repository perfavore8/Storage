<template>
  <p class="count">Найдено: {{ reportsData.total }}</p>
  <table class="table" :class="{ blur: openSelectedReportModal || isLoading }">
    <thead>
      <tr class="row title">
        <td class="item" v-for="tit in title" :key="tit">{{ tit.name }}</td>
      </tr>
    </thead>
    <tbody>
      <template v-if="!isClient && showTopTitle">
        <tr class="space"></tr>
        <tr class="row title">
          <td class="item" v-for="tit in title" :key="tit">
            {{ salesTotal[tit.code] }}
          </td>
        </tr>
        <tr class="space"></tr>
      </template>
      <template v-for="(report, idx) in copyReports" :key="report">
        <tr class="row" :class="{ row_odd: idx % 2 == 0 }">
          <td
            class="item"
            v-for="tit in title"
            :key="tit"
            :class="{ center: tit.type }"
          >
            <span v-if="!tit.type && (isClient || tit.code != 'leads')">
              {{ report[tit.code] }}
            </span>
            <div v-if="!tit.type && tit.code == 'leads' && !isClient">
              <a
                v-for="lead in report[tit.code]"
                :key="lead"
                target="black"
                :href="
                  'https://' +
                  accountSubdomain +
                  '.amocrm.ru/leads/detail/' +
                  lead
                "
              >
                {{ lead }},
              </a>
            </div>
            <button
              class="btn"
              v-if="tit.type"
              v-show="report[tit.code]"
              @click="report[tit.code].value = !report[tit.code]?.value"
            >
              {{ report[tit.code]?.value ? "Скрыть" : "Показать" }}
            </button>
          </td>
        </tr>
        <tr
          class="hiden"
          v-for="otv in report[buttonInTitle.code]?.list"
          :key="otv.id"
          v-show="report[buttonInTitle.code]?.value"
        >
          <td class="item" v-for="tit in title" :key="tit">
            <span v-if="otv[tit.code]">
              {{ otv[tit.code] }}
            </span>
          </td>
        </tr>
        <tr class="space" v-if="report[buttonInTitle.code]?.value"></tr>
      </template>
      <tr class="space"></tr>
      <tr class="row title" v-if="!isClient" ref="total">
        <td class="item" v-for="tit in title" :key="tit">
          {{ salesTotal[tit.code] }}
        </td>
      </tr>
    </tbody>
  </table>
  <Teleport to="body">
    <ReportGridModal
      v-if="selectedReport?.value"
      :title="selectedReport?.title"
      :list="selectedReport?.list"
      :company="selectedReport?.company"
      @close="closeReportGridModal"
    />
  </Teleport>
</template>

<script>
import { nextTick } from "@vue/runtime-core";
import ReportGridModal from "./ReportGridModal.vue";
export default {
  components: { ReportGridModal },
  props: {
    title: { type: Array, required: true },
    reportsData: { type: Object, required: true },
    salesTotal: { type: Object, required: false },
    isClient: { type: Boolean, required: true },
    isLoading: { type: Boolean, required: true },
  },
  data() {
    return {
      copyReports: [],
      count: 421,
      showTopTitle: false,
    };
  },
  mounted() {
    this.copy();
    nextTick(() => this.calcShowTopTitle());
  },
  computed: {
    accountSubdomain() {
      return this.$store.state.account.account.subdomain;
    },
    buttonInTitle() {
      return this.title?.find((val) => val?.type == 1);
    },
    modalInTitle() {
      return this.title?.find((val) => val?.type == 2);
    },
    openedRows() {
      return this.copyReports.filter(
        (val) => val[this.buttonInTitle.code]?.value
      );
    },
    selectedReport() {
      const item = this.copyReports.find((val) => {
        if (val[this.modalInTitle?.code])
          return val[this.modalInTitle?.code].value;
      });
      let props = { value: false };
      if (item) {
        props = {
          company: item.company,
          value: item[this.modalInTitle?.code].value,
          list: item[this.modalInTitle?.code].list,
          title: item[this.modalInTitle?.code].title,
        };
      }
      return props;
    },
    openSelectedReportModal() {
      return this.selectedReport.value;
    },
  },
  watch: {
    openSelectedReportModal() {
      this.$emit("updateOpenSelectedReportModal", this.openSelectedReportModal);
    },
    reportsData: {
      handler: function () {
        this.copy();
      },
      deep: true,
    },
    openedRows: {
      handler: function (newVal, oldVal) {
        let query = "";
        this.isClient ? (query = "company") : (query = "name");
        const arrNewVal = [];
        newVal.forEach((val) => arrNewVal.push(val[query]));
        const arrOldVal = [];
        oldVal.forEach((val) => arrOldVal.push(val[query]));

        let res = false;
        if (arrNewVal.length > arrOldVal.length) {
          arrNewVal.forEach((val) => {
            if (!arrOldVal.includes(val)) res = true;
          });
        }
        if (arrNewVal.length < arrOldVal.length) {
          arrOldVal.forEach((val) => {
            if (!arrNewVal.includes(val)) res = true;
          });
        }
        if (res) this.$emit("updateOpenedRows", this.openedRows);
      },
      deep: true,
    },
    selectedReport: {
      handler: function (newVal, oldVal) {
        if (newVal.company != oldVal.company || newVal.value != oldVal.value)
          this.$emit("updateSelectedReport", this.selectedReport);
      },
      deep: true,
    },
    isClient() {
      nextTick(() => this.calcShowTopTitle());
    },
  },
  methods: {
    calcShowTopTitle() {
      this.showTopTitle =
        document.body.clientWidth <
        this.$refs.total?.getBoundingClientRect()?.y;
      // console.log(this.refTitle.getBoundingClientRect()?.y);
    },
    copy() {
      if (this.reportsData.data)
        this.copyReports = JSON.parse(JSON.stringify(this.reportsData.data));
    },
    closeReportGridModal() {
      this.copyReports.map(
        (val) => (val[this.modalInTitle?.code].value = false)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.count {
  color: #757575;
  @include font(400, 16px);
  margin: 0;
  display: flex;
  align-self: start;
}
.table {
  @include font(400, 16px);
  border-collapse: collapse;
  width: 100%;
  .title {
    @include font(700, 16px);
    background-color: rgba(0, 0, 0, 0.1) !important;
    .item {
      padding-bottom: 20px !important;
      text-align: center !important;
    }
  }
  .row_odd {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .space {
    height: 16px;
    border: none;
  }
  .hiden:nth-child(odd) {
    background-color: #e9f4fd;
  }
  .hiden:nth-child(even) {
    background-color: #dde8f0;
  }
  .center {
    text-align: center !important;
  }
  .item {
    position: relative;
    padding: 8px 16px;
    border: 1px solid #c9c9c9;
    text-align: left;
    .btn {
      background-color: #6c757d;
      color: white;
    }
    .btn:hover {
      background-color: #5c636b;
    }
    .btn:focus {
      background-color: #5c636a;
      box-shadow: 0 0 0 4px #828a9180;
    }
  }
}
.blur {
  filter: blur(5px);
  transition: all 0.5s ease-out;
}
</style>
