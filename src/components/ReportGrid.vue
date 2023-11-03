<template>
  <div class="top" id="report_count_area">
    <p class="count">
      {{
        $t("Archive.count", {
          count: Number(reportsData.total || reportsData?.meta?.total),
        })
      }}
    </p>
  </div>
  <AppTablePreloader :titles="titlesForPreloader" v-if="isLoading" />
  <table class="table" :class="{ blur: openSelectedReportModal }" v-else>
    <thead>
      <tr class="row title">
        <td
          class="item"
          v-for="tit in title"
          :key="tit"
          :class="{ pointer: sortable }"
          @click="sortable ? sort(tit?.code) : null"
        >
          {{ tit.name }}
          <button
            class="bar_item_icon"
            :class="{
              bar_item_icon_up:
                order.code === tit?.code && order.prev_order === 'desc',
              bar_item_icon_down:
                order.code === tit?.code && order.prev_order === 'asc',
            }"
            v-if="sortable"
          ></button>
        </td>
      </tr>
    </thead>
    <tbody>
      <template v-if="showTopTitle">
        <tr class="space"></tr>
        <tr class="row title">
          <td class="item" v-for="tit in title" :key="tit">
            {{ total[tit?.code] }}
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
            <span
              v-if="
                !tit.type &&
                (reportType === 'customers' || tit?.code != 'leads')
              "
            >
              {{ report[tit?.code] }}
            </span>
            <div
              v-if="!tit.type && tit?.code == 'leads' && reportType === 'sales'"
            >
              <template v-for="(lead, lidx) in report[tit?.code]" :key="lead">
                <a
                  class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline"
                  target="black"
                  :href="
                    'https://' +
                    accountSubdomain +
                    '.amocrm.ru/leads/detail/' +
                    lead
                  "
                >
                  {{ lead }}
                </a>
                <span>{{
                  lidx < report[tit?.code].length - 1 ? ", " : ""
                }}</span>
              </template>
            </div>
            <button
              class="btn"
              v-if="tit.type"
              v-show="report[tit?.code]"
              @click="report[tit?.code].value = !report[tit?.code]?.value"
            >
              {{
                report[tit?.code]?.value
                  ? $t("Analytics.reportGrid.hide")
                  : $t("Analytics.reportGrid.show")
              }}
            </button>
          </td>
        </tr>
        <tr
          class="hiden"
          v-for="otv in report[buttonInTitle?.code]?.list"
          :key="otv.id"
          v-show="report[buttonInTitle?.code]?.value"
        >
          <td class="item" v-for="tit in title" :key="tit">
            <span v-if="otv[tit?.code]">
              {{ otv[tit?.code] }}
            </span>
          </td>
        </tr>
        <tr class="space" v-if="report[buttonInTitle?.code]?.value"></tr>
      </template>
      <tr class="space"></tr>
      <tr class="row title" ref="total">
        <td class="item" v-for="tit in title" :key="tit">
          {{ total[tit?.code] }}
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
import AppTablePreloader from "./AppTablePreloader.vue";
import ReportGridModal from "./ReportGridModal.vue";
export default {
  components: { ReportGridModal, AppTablePreloader },
  props: {
    title: { type: Array, required: true },
    reportsData: { type: Object, required: true },
    total: { type: Object, required: false },
    reportType: { type: String, required: true },
    isLoading: { type: Boolean, required: true },
  },
  data() {
    return {
      copyReports: [],
      showTopTitle: true,
      order: {
        code: "",
        prev_order: "",
      },
    };
  },
  mounted() {
    this.copy();
  },
  computed: {
    sortable() {
      return this.reportType === "stuffMove";
    },
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
        (val) => val[this.buttonInTitle?.code]?.value
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
    titlesForPreloader() {
      return Object.values(this.title).reduce((acc, field) => {
        acc.push(field.name);
        return acc;
      }, []);
    },
  },
  watch: {
    openSelectedReportModal() {
      if (this.openSelectedReportModal) window.scrollTo(0, 0);
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
        this.reportType === "customers"
          ? (query = "company")
          : (query = "name");
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
  },
  methods: {
    calcShowTopTitle() {
      this.showTopTitle =
        document.body.clientHeight <
        this.$refs.total?.getBoundingClientRect()?.y;
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
    sort(code) {
      const order_values = ["asc", "desc"];
      let new_order = "";
      this.order.code === code && this.order.prev_order == order_values[0]
        ? (new_order = order_values[1])
        : (new_order = order_values[0]);
      this.order = { code: code, prev_order: new_order };
      this.$emit("sort", code, new_order);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  .count {
    color: #757575;
    @include font(400, 16px);
    margin: 0;
    display: flex;
  }
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
  filter: blur(8px);
  transition: all 0.2s;
}
.bar_item_icon {
  height: 16px;
  width: 16px;
  background-color: transparent;
  @include bg_image("@/assets/sort.svg");
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &_up {
    @include bg_image("@/assets/sort_up.svg");
  }
  &_down {
    @include bg_image("@/assets/sort_down.svg");
  }
}
.pointer {
  cursor: pointer;
}
</style>
