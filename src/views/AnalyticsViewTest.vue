<template>
  <ReportCreateModal v-if="showReportCreate" />
  <div class="app" :class="{ blur: openSelectedReportModal }">
    <div class="header">
      <NavBar />
    </div>
    <div class="content">
      <div class="top">
        <div class="btns" v-if="!isChartsView">
          <button
            v-for="type in reportType.list"
            :key="type.label"
            @click="changeReportType(type.value)"
            class="btn"
            :class="{ selected_report: reportType.selected == type.value }"
          >
            {{ type.label }}
          </button>
        </div>
      </div>
      <div class="filters">
        <div class="row">
          <div class="type self-start" v-if="isTest">
            <button
              class="btn"
              :class="{ selected: view.selected.value === item.value }"
              v-for="(item, idx) in view.list"
              :key="item.value"
              @click="view.select(item)"
            >
              <span
                class="material-icons-round"
                v-if="
                  (view.list.indexOf(
                    view.list.find((val) => val.value === view.selected.value)
                  ) +
                    1) %
                    view.list.length ==
                  idx
                "
              >
                {{ item.class }}
              </span>
            </button>
          </div>
          <ReportFIltersCopy
            :isClient="reportType.selected == 'client'"
            ref="filters"
            @getFilter="getFilter"
          />
        </div>
        <ReportChartsFilter
          v-if="isChartsView"
          ref="ChartsFilters"
          @getFilter="getFilter"
        />
      </div>
      <template
        v-if="
          view.selected.value === 'table' &&
          this.reportType.selected != 'stuffMove'
        "
      >
        <ReportGrid
          :title="title"
          :reportsData="reports"
          :isClient="reportType.selected == 'client'"
          :isLoading="isLoading"
          :total="total"
          @updateOpenSelectedReportModal="updateOpenSelectedReportModal"
          @updateOpenedRows="updateOpenedRows"
          @updateSelectedReport="updateSelectedReport"
          ref="grid"
        />
        <GridBottom
          :previous="reports.prev_page_url != null"
          :next="reports.next_page_url != null"
          :page="reports.current_page"
          :show="reports.data?.length != 0"
          :count="count"
          :showBtns="showGridBottom"
          :showSelector="false"
          @changePage="changePage"
          @changeCount="changeCount"
        />
      </template>
      <template v-else>
        <ReportCharts :chartType="view.selected.value" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReportFIltersCopy from "@/components/ReportFiltersCopy.vue";
import ReportCreateModal from "@/components/ReportCreateModal.vue";
import ReportCharts from "@/components/ReportCharts.vue";
import ReportGrid from "@/components/ReportGrid.vue";
import ReportChartsFilter from "@/components/ReportChartsFilter.vue";
import NavBar from "@/components/NavBar.vue";
import GridBottom from "@/components/GridBottom.vue";
import { nextTick } from "@vue/runtime-core";
export default {
  name: "AnalyticsView",
  components: {
    ReportFIltersCopy,
    ReportCreateModal,
    ReportCharts,
    ReportGrid,
    ReportChartsFilter,
    NavBar,
    GridBottom,
  },
  data() {
    return {
      openSelectedReportModal: false,
      isLoading: false,
      title: [],
      reports: [],
      isClient: true,
      reportType: {
        selected: "client",
        list: [
          { label: "Отчет по клиентам", value: "client" },
          { label: "Отчет по продажам", value: "sales" },
          { label: "Отчет по движениям товаров", value: "stuffMove" },
        ],
      },
      openedRows: [],
      selectedReport: {},
      filter: {},
      total: {},
      page: 1,
      view: {
        selected: { name: "table", value: "table", class: "font_download" },
        list: [
          { name: "table", value: "table", class: "font_download" },
          { name: "bar", value: "bar", class: "poll" },
          { name: "doughnut", value: "doughnut", class: "donut_small" },
        ],
        select: (option) => (this.view.selected = option),
      },
    };
  },
  computed: {
    ...mapGetters(["catalog", "showReportCreate"]),
    refFilters() {
      return this.$refs.filters;
    },
    showGridBottom() {
      return this.reports.total >= this.reports.per_page;
    },
    refGrid() {
      return this.$refs.grid;
    },
    isTest() {
      return this.$store.state.account?.account?.id == 1;
    },
    isChartsView() {
      return this.view.selected.value !== "table";
    },
  },
  mounted() {
    this.clients();
    this.$store.dispatch("get_account");
  },
  methods: {
    openReportCreate() {
      this.$store.commit("toggleReportCreate", true);
    },
    updateOpenSelectedReportModal(value) {
      this.openSelectedReportModal = value;
    },
    calcTotal() {
      this.total["prib"] = this.total.sum - this.total.cost_sum;
      this.total.sum = this.round(this.total.sum);
      this.total.cost_sum = this.round(this.total.cost_sum);
      this.total.prib = this.round(this.total.prib);
      if (this.reportType.selected == "sales")
        this.total.leads = this.total?.leads?.split(",").length;
      this.total["name"] = "Общее";
      this.total["company"] = "Общее";
      this.total["poz"] = "";
    },
    async updateOpenedRows(value) {
      let query = "";
      this.reportType.selected == "client"
        ? (query = "company")
        : (query = "name");
      const arr = [];
      value.forEach((val) => arr.push(val[query]));
      if (this.reportType.selected == "client") {
        this.reports.data.map((val) =>
          val.otv && !arr.includes(val[query]) ? (val.otv.value = false) : null
        );
      }
      if (this.reportType.selected == "sales") {
        this.reports.data.map((val) =>
          val.poz && !arr.includes(val[query]) ? (val.poz.value = false) : null
        );
      }
      await value?.forEach(async (val) => {
        if (!this.openedRows.includes(val[query])) {
          this.openedRows.push(val[query]);
          if (this.reportType.selected == "client") {
            await this.$store.dispatch("getCustomersResponsible", {
              filter: this.filter,
              company: val.company,
            });
            this.reports.data.map((report) => {
              if (report.company == val.company && report.otv) {
                report.otv.value = val.otv.value;
                report.otv.list =
                  this.$store.state.analytics.customersResponsible;
                report.otv.list.map((item) => {
                  item["prib"] = item.sum - item.cost_sum;
                  item.sum = this.round(item.sum);
                  item.cost_sum = this.round(item.cost_sum);
                  item.prib = this.round(item.prib);
                  item.otv = item.user;
                });
              }
            });
          }
          if (this.reportType.selected == "sales") {
            await this.$store.dispatch("getSalesProducts", {
              filter: this.filter,
              product: val.name,
            });
            this.reports.data.map((report) => {
              if (report.name == val.name && report.poz) {
                report.poz.value = val.poz.value;
                report.poz.list = this.$store.state.analytics.salesProducts;
                report.poz.list.map((item) => {
                  item["prib"] = item.sum - item.cost_sum;
                  item.sum = this.round(item.sum);
                  item.cost_sum = this.round(item.cost_sum);
                  item.prib = this.round(item.prib);
                  item.poz = item.user;
                });
              }
            });
          }
        }
      });
    },
    async updateSelectedReport(value) {
      if (!value.value) {
        this.reports.data.map((report) => (report.poz.value = false));
      }
      if (
        !this.reports.data.find((val) => val.company == value.company)?.poz.list
          .length
      ) {
        await this.$store.dispatch("getCustomersProducts", {
          filter: this.filter,
          company: value.company,
        });

        this.reports.data.map((report) => {
          if (report.company == value.company && report.poz && value.value) {
            report.poz.value = value.value;
            report.poz.list = [
              ...this.$store.state.analytics.customersProducts,
            ];
            report.poz.list.map((val) => {
              val["prib"] = val.sum - val.cost_sum;
              val.sum = this.round(val.sum);
              val.cost_sum = this.round(val.cost_sum);
              val.prib = this.round(val.prib);
            });
          }
        });
      }

      this.selectedReport = { ...value };
    },
    async getReports() {
      if (this.reportType.selected == "client") {
        await this.$store.dispatch("getCustomers", {
          filter: this.filter,
          page: this.page,
        });
        await this.$store.dispatch("getCustomersTotal", {
          filter: this.filter,
          page: this.page,
        });
        this.reports = this.$store.state.analytics.customers;
        this.total = this.$store.state.analytics.customersTotal;
        this.reports.data.map((val) => {
          val["otv"] = {
            value: false,
            list: [],
          };
          val["poz"] = {
            value: false,
            list: [],
            title: [
              { name: "Название", code: "name" },
              { name: "Кол-во", code: "count" },
              { name: "Оборот", code: "sum" },
              { name: "Прибыль", code: "prib" },
            ],
          };
          val["prib"] = val.sum - val.cost_sum;
          val.sum = this.round(val.sum);
          val.cost_sum = this.round(val.cost_sum);
          val.prib = this.round(val.prib);
        });
      }
      if (this.reportType.selected == "sales") {
        await this.$store.dispatch("getSales", {
          filter: this.filter,
          page: this.page,
        });
        await this.$store.dispatch("getSalesTotal", {
          filter: this.filter,
          page: this.page,
        });
        this.reports = this.$store.state.analytics.sales;
        this.total = this.$store.state.analytics.salesTotal;
        this.reports.data.map((val) => {
          val["poz"] = {
            value: false,
            list: [],
          };
          val["prib"] = val.sum - val.cost_sum;
          val.leads = val.leads.split(",");
          val.sum = this.round(val.sum);
          val.cost_sum = this.round(val.cost_sum);
          val.prib = this.round(val.prib);
        });
      }
      this.calcTotal();
      nextTick(() => this.refGrid?.calcShowTopTitle());
    },
    changeReportType(value) {
      this.reportType.selected = value;
      this.page = 1;
      this.refFilters?.clearAllFields();
    },
    async clients() {
      this.isLoading = true;
      this.openedRows = [];
      this.reportType.selected = "client";
      this.title = [
        { name: "Компания", code: "company", type: 0 },
        { name: "Контакт", code: "contact", type: 0 },
        { name: "Сделки", code: "leads", type: 0 },
        { name: "Оборот", code: "sum", type: 0 },
        { name: "Прибыль", code: "prib", type: 0 },
        { name: "Ответственные", code: "otv", type: 1 },
        { name: "Позиции", code: "poz", type: 2 },
      ];
      await this.getReports();
      this.isLoading = false;
    },
    async sales() {
      this.isLoading = true;
      this.openedRows = [];
      this.reportType.selected == "sales";
      this.title = [
        { name: "Название", code: "name", type: 0 },
        { name: "Кол-во", code: "count", type: 0 },
        { name: "Оборот", code: "sum", type: 0 },
        { name: "Себестоимость", code: "cost_sum", type: 0 },
        { name: "Прибыль", code: "prib", type: 0 },
        { name: "Сделки", code: "leads", type: 0 },
        { name: "Позиции", code: "poz", type: 1 },
      ];
      await this.getReports();
      this.isLoading = false;
    },
    changePage(value) {
      this.page = value;
      this.reportType.selected == "client" ? this.clients() : this.sales();
    },
    getFilter(value) {
      this.filter = value;
      this.page = 1;
      this.reportType.selected == "client" ? this.clients() : this.sales();
    },
    round(number) {
      number = Number(number);
      return Math.round(number * 100) / 100 + " р.";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: 100vw;
  height: 100vh;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  .top {
    display: flex;
    flex-direction: row;
    gap: 8px;
    .btns {
      display: flex;
      flex-direction: row;
      .btn {
        border: 1px solid #6c757d;
        border-radius: 0;
        color: #6c757d;
        background: white;
      }
      .btn:hover {
        border-color: #5f676d;
        color: #5f676d;
      }
      .selected_report {
        transition: all 0.15s ease-out;
        background: #6c757d;
        color: white;
      }
      .selected_report:hover {
        color: hsl(204, 44%, 95%);
      }
      .btn:first-child {
        border-radius: 5px 0 0 5px;
      }
      .btn:last-child {
        border-radius: 0 5px 5px 0;
      }
    }
  }
  .filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    min-height: 56px;
    .type {
      // width: 2%;
      display: flex;
      align-items: center;
      .checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }
      .checkbox + label {
        display: inline-flex;
        align-items: center;
        user-select: none;
        position: relative;
      }
      .checkbox + label::before {
        content: "";
        display: inline-block;
        width: 28px;
        height: 28px;
        flex-shrink: 0;
        flex-grow: 0;
        border-radius: 0.25em;
        position: absolute;
        border: none;

        // @include bg_image("@/assets/grid.svg", 100%);
        cursor: pointer;
        background: transparent !important;
      }
      span {
        font-size: 28px;
        color: #757575;
      }
      .a {
        font-size: 31px;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        white-space: nowrap;
        border-radius: 6px;
        background-color: transparent;
        span {
          color: #757575;
        }
      }
      .btn:hover {
        span {
          color: #6b6b6b;
        }
      }
    }
  }
}
.blur {
  filter: blur(5px);
  pointer-events: none;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
