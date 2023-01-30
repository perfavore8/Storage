<template>
  <div class="app" :class="{ blur: openSelectedReportModal }">
    <div class="header">
      <NavBar />
    </div>
    <div class="content">
      <div class="btns">
        <button
          @click="changeReportType()"
          class="btn"
          :class="{ selected_report: isClient }"
        >
          Отчет по клиентам
        </button>
        <button
          @click="changeReportType()"
          class="btn"
          :class="{ selected_report: !isClient }"
        >
          Отчет по продажам
        </button>
      </div>
      <RepotFIlters :isClient="isClient" ref="filters" @getFilter="getFilter" />
      <ReportGrid
        :title="title"
        :reportsData="reports"
        :isClient="isClient"
        :isLoading="isLoading"
        :salesTotal="salesTotal"
        @updateOpenSelectedReportModal="updateOpenSelectedReportModal"
        @updateOpenedRows="updateOpenedRows"
        @updateSelectedReport="updateSelectedReport"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReportGrid from "@/components/ReportGrid.vue";
import RepotFIlters from "@/components/RepotFIlters.vue";
import NavBar from "@/components/NavBar.vue";
import GridBottom from "@/components/GridBottom.vue";
export default {
  name: "AnalyticsView",
  components: { ReportGrid, RepotFIlters, NavBar, GridBottom },
  data() {
    return {
      openSelectedReportModal: false,
      isLoading: false,
      title: [],
      reports: [],
      isClient: true,
      openedRows: [],
      selectedReport: {},
      filter: {},
      salesTotal: {},
      page: 1,
    };
  },
  computed: {
    ...mapGetters(["catalog"]),
    refFilters() {
      return this.$refs.filters;
    },
    showGridBottom() {
      return this.reports.total >= this.reports.per_page;
    },
  },
  mounted() {
    this.clients();
    this.$store.dispatch("get_account");
  },
  methods: {
    updateOpenSelectedReportModal(value) {
      this.openSelectedReportModal = value;
    },
    async updateOpenedRows(value) {
      let query = "";
      this.isClient ? (query = "company") : (query = "name");
      const arr = [];
      value.forEach((val) => arr.push(val[query]));
      if (this.isClient) {
        this.reports.data.map((val) =>
          val.otv && !arr.includes(val[query]) ? (val.otv.value = false) : null
        );
      } else {
        this.reports.data.map((val) =>
          val.poz && !arr.includes(val[query]) ? (val.poz.value = false) : null
        );
      }
      await value?.forEach(async (val) => {
        if (!this.openedRows.includes(val[query])) {
          this.openedRows.push(val[query]);
          if (this.isClient) {
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
                  item.sum = Math.round(item.sum * 100) / 100 + " р.";
                  item.cost_sum = Math.round(item.cost_sum * 100) / 100 + " р.";
                  item.prib = Math.round(item.prib * 100) / 100 + " р.";
                  item.otv = item.user;
                });
              }
            });
          } else {
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
                  item.sum = Math.round(item.sum * 100) / 100 + " р.";
                  item.cost_sum = Math.round(item.cost_sum * 100) / 100 + " р.";
                  item.prib = Math.round(item.prib * 100) / 100 + " р.";
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
        !this.reports.data.filter((val) => val.company == value.company)[0]?.poz
          .list.length
      ) {
        await this.$store.dispatch("getCustomersProducts", {
          filter: this.filter,
          company: value.company,
        });
      }
      this.reports.data.map((report) => {
        if (report.company == value.company && report.poz) {
          report.poz.value = value.value;
          report.poz.list = this.$store.state.analytics.customersProducts;
          report.poz.list.map((val) => {
            val["prib"] = val.sum - val.cost_sum;
            val.sum = Math.round(val.sum * 100) / 100 + " р.";
            val.cost_sum = Math.round(val.cost_sum * 100) / 100 + " р.";
            val.prib = Math.round(val.prib * 100) / 100 + " р.";
          });
        }
      });

      this.selectedReport = { ...value };
    },
    async getReports() {
      if (this.isClient) {
        await this.$store.dispatch("getCustomers", {
          filter: this.filter,
          page: this.page,
        });
        this.reports = this.$store.state.analytics.customers;
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
          val.sum = Math.round(val.sum * 100) / 100 + " р.";
          val.cost_sum = Math.round(val.cost_sum * 100) / 100 + " р.";
          val.prib = Math.round(val.prib * 100) / 100 + " р.";
        });
      } else {
        await this.$store.dispatch("getSales", {
          filter: this.filter,
          page: this.page,
        });
        await this.$store.dispatch("getSalesTotal", {
          filter: this.filter,
          page: this.page,
        });
        this.reports = this.$store.state.analytics.sales;
        this.salesTotal = this.$store.state.analytics.salesTotal;
        this.salesTotal["prib"] =
          this.salesTotal.sum - this.salesTotal.cost_sum;
        this.salesTotal.sum =
          Math.round(this.salesTotal.sum * 100) / 100 + " р.";
        this.salesTotal.cost_sum =
          Math.round(this.salesTotal.cost_sum * 100) / 100 + " р.";
        this.salesTotal.prib =
          Math.round(this.salesTotal.prib * 100) / 100 + " р.";
        this.salesTotal.leads = this.salesTotal?.leads?.split(",").length;
        this.salesTotal["name"] = "Общее";
        this.salesTotal["poz"] = "";
        this.reports.data.map((val) => {
          val["poz"] = {
            value: false,
            list: [],
          };
          val["prib"] = val.sum - val.cost_sum;
          val.leads = val.leads.split(",");
          val.sum = Math.round(val.sum * 100) / 100 + " р.";
          val.cost_sum = Math.round(val.cost_sum * 100) / 100 + " р.";
          val.prib = Math.round(val.prib * 100) / 100 + " р.";
        });
      }
    },
    changeReportType() {
      this.isClient = !this.isClient;
      this.page = 1;
      this.refFilters?.clearAllFields();
    },
    async clients() {
      this.isLoading = true;
      this.openedRows = [];
      this.isClient = true;
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
      this.isClient = false;
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
      this.isClient ? this.clients() : this.sales();
    },
    getFilter(value) {
      this.filter = value;
      this.page = 1;
      this.isClient ? this.clients() : this.sales();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 60px);
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
  .btns {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    .btn {
      border: 1px solid #6c757d;
      border-radius: 4px;
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
.blur {
  filter: blur(5px);
  pointer-events: none;
}
</style>
