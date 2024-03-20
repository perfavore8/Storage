<template>
  <ReportCreateModal v-if="showReportCreate" />
  <div class="app" :class="{ blur: openSelectedReportModal }">
    <div class="header">
      <AppHeader />
    </div>
    <div class="content">
      <div class="top">
        <AppRadioBtnsGroupUnderlined
          v-if="!isChartsView"
          class="w-full"
          :list="
            reportType.list.filter(
              (type) => !currentExeptions.analytics.tabs[type.value]?.deny
            )
          "
          :selected="reportType.selected"
          @select="changeReportType"
        />
      </div>
      <div class="filters">
        <div class="row">
          <div class="type self-start items-center">
            <template v-if="isTest">
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
            </template>
            <button
              class="test_btn"
              title="Экспорт в xlsx"
              @click="exportXlsx()"
            >
              <span class="material-icons-outlined"> upload_file </span>
            </button>
          </div>
          <ReportFIlters
            :reportType="reportType.selected.value"
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
      <template v-if="view.selected.value === 'table'">
        <!-- v-if="
          view.selected.value === 'table' &&
          this.reportType.selected.value != 'stuffMove'
        " -->
        <ReportGrid
          :title="title"
          :reportsData="reports"
          :reportType="reportType.selected.value"
          :isLoading="isLoading"
          :total="total"
          @updateOpenSelectedReportModal="updateOpenSelectedReportModal"
          @updateOpenedRows="updateOpenedRows"
          @updateSelectedReport="updateSelectedReport"
          @sort="sort"
          ref="grid"
        >
          <template
            #item_title="{ title: tit, item: report }"
            v-if="reportType.selected.value === 'stuffMove'"
          >
            <span
              v-if="
                !tit?.type &&
                (reportType.selected.value === 'customers' ||
                  tit?.code != 'leads')
              "
            >
              <a
                class="underline text-[#8cb4ff] decoration-[#3f3f3faf] underline-offset-2 hover:no-underline"
                target="black"
                v-if="report.amo_lead_id && accountSubdomain"
                :href="
                  'https://' +
                  accountSubdomain +
                  '.amocrm.ru/leads/detail/' +
                  report.amo_lead_id
                "
              >
                {{ report?.[tit?.code] }}
              </a>
              <template v-else>
                {{ report?.[tit?.code] }}
              </template>
            </span>
          </template>
        </ReportGrid>
        <GridBottom
          :page="page"
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

  <Teleport to="#report_count_area">
    <div
      class="inline-flex items-center gap-2"
      v-if="reportType.selected.value === 'customers'"
    >
      <span>{{ $t("Analytics.group") }}</span>
      <AppRadioBtnsGroup
        :list="groupBy.list"
        :selected="groupBy.selected"
        :small="true"
        @select="groupBy.select"
      />
    </div>
  </Teleport>
</template>

<script>
import { mapGetters } from "vuex";
import ReportFIlters from "@/components/ReportFIlters.vue";
import ReportCreateModal from "@/components/ReportCreateModal.vue";
import ReportCharts from "@/components/ReportCharts.vue";
import ReportGrid from "@/components/ReportGrid.vue";
import ReportChartsFilter from "@/components/ReportChartsFilter.vue";
import AppHeader from "@/components/AppHeader.vue";
import GridBottom from "@/components/GridBottom.vue";
import { nextTick } from "@vue/runtime-core";
import { isTest } from "@/composables/isTest";
import AppRadioBtnsGroupUnderlined from "@/components/AppRadioBtnsGroupUnderlined.vue";
import AppRadioBtnsGroup from "@/components/AppRadioBtnsGroup.vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
import { currentExeptions } from "@/composables/exceptions";

const { t } = useLangConfiguration();

export default {
  name: "AnalyticsView",
  components: {
    ReportFIlters,
    ReportCreateModal,
    ReportCharts,
    ReportGrid,
    ReportChartsFilter,
    AppHeader,
    GridBottom,
    AppRadioBtnsGroupUnderlined,
    AppRadioBtnsGroup,
  },
  setup() {
    return { isTest, currentExeptions };
  },
  data() {
    return {
      openSelectedReportModal: false,
      isLoading: false,
      title: [],
      reports: [],
      isClient: true,
      reportType: {
        selected: {
          name: t("Analytics.reportTypes.customers"),
          value: "customers",
        },
        list: [
          { name: t("Analytics.reportTypes.customers"), value: "customers" },
          { name: t("Analytics.reportTypes.sales"), value: "sales" },
          {
            name: t("Analytics.reportTypes.movement"),
            value: "stuffMove",
            value2: "movement",
          },
        ],
        dropToDefault: () =>
          this.changeReportType(
            this.reportType.list.filter(
              (type) => !currentExeptions.value.analytics.tabs[type.value]?.deny
            )[0]
          ),
      },
      titles: {
        customers: [
          {
            name: t("Analytics.titles.customers.company"),
            code: "company",
            type: 0,
          },
          {
            name: t("Analytics.titles.customers.contact"),
            code: "contact",
            type: 0,
          },
          {
            name: t("Analytics.titles.customers.leads"),
            code: "leads",
            type: 0,
          },
          { name: t("Analytics.titles.customers.sum"), code: "sum", type: 0 },
          { name: t("Analytics.titles.customers.prib"), code: "prib", type: 0 },
          { name: t("Analytics.titles.customers.otv"), code: "otv", type: 1 },
          { name: t("Analytics.titles.customers.poz"), code: "poz", type: 2 },
        ],
        sales: [
          { name: t("Analytics.titles.sales.name"), code: "name", type: 0 },
          { name: t("Analytics.titles.sales.count"), code: "count", type: 0 },
          { name: t("Analytics.titles.sales.sum"), code: "sum", type: 0 },
          {
            name: t("Analytics.titles.sales.cost_sum"),
            code: "cost_sum",
            type: 0,
          },
          { name: t("Analytics.titles.sales.prib"), code: "prib", type: 0 },
          { name: t("Analytics.titles.sales.leads"), code: "leads", type: 0 },
          { name: t("Analytics.titles.sales.poz"), code: "poz", type: 1 },
        ],
        stuffMove: [
          {
            name: t("Analytics.titles.movement.event_date"),
            code: "event_date",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.event_type"),
            code: "event_type",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.article_number"),
            code: "article_number",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.title"),
            code: "title",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.party"),
            code: "party",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.quantity"),
            code: "quantity",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.cost_price"),
            code: "cost_price",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.sum"),
            code: "sum",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.initial_warehouse"),
            code: "initial_warehouse",
            type: 0,
          },
          {
            name: t("Analytics.titles.movement.final_warehouse"),
            code: "final_warehouse",
            type: 0,
          },
          { name: t("Analytics.titles.movement.user"), code: "user", type: 0 },
          {
            name: t("Analytics.titles.movement.comment"),
            code: "comment",
            type: 0,
          },
        ],
      },
      openedRows: [],
      selectedReport: {},
      filter: {},
      sorted: {},
      total: {},
      newPage: 1,
      view: {
        selected: { name: "table", value: "table", class: "font_download" },
        list: [
          { name: "table", value: "table", class: "font_download" },
          { name: "bar", value: "bar", class: "poll" },
          { name: "doughnut", value: "doughnut", class: "donut_small" },
        ],
        select: function (option) {
          this.selected = option;
        },
      },
      groupBy: {
        selected: { name: t("Analytics.groupComp"), value: "companies" },
        list: [
          { name: t("Analytics.groupComp"), value: "companies" },
          { name: t("Analytics.groupContact"), value: "contacts" },
        ],
        select: (value) => {
          this.groupBy.selected = value;
          localStorage.setItem("AnalyticsLastGroupBy", JSON.stringify(value));
          this.getTitile();
        },
      },
    };
  },
  computed: {
    ...mapGetters(["catalog", "showReportCreate"]),
    refFilters() {
      return this.$refs.filters;
    },
    showGridBottom() {
      let res = false;
      this.reportType.selected.value === "stuffMove"
        ? (res = this.reports?.meta?.total >= this.reports?.meta?.per_page)
        : (res = this.reports.total >= this.reports.per_page);
      return res;
    },
    refGrid() {
      return this.$refs.grid;
    },
    isChartsView() {
      return this.view.selected.value !== "table";
    },
    isMDLAccount() {
      return this.$store.state.account?.account?.id === 383;
    },
    page() {
      let obj = {};
      if (this.reportType.selected.value === "stuffMove") {
        obj = {
          first: this.getPageFromLink(this.reports?.links?.first),
          prev: this.getPageFromLink(this.reports?.links?.prev),
          current: this.reports?.meta?.current_page,
          next: this.getPageFromLink(this.reports?.links?.next),
          last: this.getPageFromLink(this.reports?.links?.last),
        };
      } else {
        obj = {
          first: this.getPageFromLink(this.reports?.first_page_url),
          prev: this.getPageFromLink(this.reports?.prev_page_url),
          current: this.reports?.current_page,
          next: this.getPageFromLink(this.reports?.next_page_url),
          last: this.getPageFromLink(this.reports?.last_page_url),
        };
      }
      return obj;
    },
    accountSubdomain() {
      return this.$store.state.account.account.subdomain;
    },
  },
  created() {
    this.getAnalyticsLastGroupBy();
    this.getTitile();
    this.$store.dispatch("get_account");
  },
  mounted() {
    this.reportType.dropToDefault();
  },
  methods: {
    getPageFromLink(link) {
      if (link) {
        return link.split("?page=")[1];
      } else {
        return null;
      }
    },
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
      if (this.reportType.selected.value == "sales")
        this.total.leads = this.total?.leads_count;
      this.total["name"] = t("Analytics.general");
      this.total["company"] = t("Analytics.general");
      this.total["poz"] = "";
    },
    async updateOpenedRows(value) {
      const query =
        this.reportType.selected.value === "customers" ? "company" : "name";
      const arr = value.map((val) => val[query]);

      this.reports.data.map((val) => {
        if (this.reportType.selected.value === "customers" && val.otv) {
          val.otv.value = arr.includes(val[query]) ? val.otv.value : false;
        } else if (this.reportType.selected.value === "sales" && val.poz) {
          val.poz.value = arr.includes(val[query]) ? val.poz.value : false;
        }
      });

      await value.forEach(async (val) => {
        if (!this.openedRows.includes(val[query])) {
          this.openedRows.push(val[query]);

          let rows = { code: "", label: "", resName: "" };
          if (this.reportType.selected.value === "customers") {
            rows = {
              code: "otv",
              label: "company",
              resName: "getCustomersResponsible",
            };
          } else if (this.reportType.selected.value === "sales") {
            rows = { code: "poz", label: "name", resName: "getSalesProducts" };
          }
          const response = rows.resName
            ? await this.$store.dispatch(rows.resName, {
                filter: this.filter,
                product: val.name,
                company: val.company,
              })
            : [];
          this.reports.data.map((report) => {
            if (
              report[[rows.label]] === val[[rows.label]] &&
              report[rows.code]
            ) {
              report[rows.code].value = val[rows.code].value;
              report[rows.code].list = response.map((item) => {
                const newItem = { ...item };
                newItem.prib = newItem.sum - newItem.cost_sum;
                newItem.sum = this.round(newItem.sum);
                newItem.cost_sum = this.round(newItem.cost_sum);
                newItem.prib = this.round(newItem.prib);
                newItem[rows.code] = item.user;
                return newItem;
              });
            }
          });
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
      try {
        const reportFetchRequest = async (type, capitalizeType) => {
          const params = {
            filter: this.filter,
            page: this.newPage,
            sort: this.sorted,
          };

          if (this.reportType.selected.value === "customers")
            params.group_by = this.groupBy.selected.value;

          await this.$store.dispatch(`get${capitalizeType}`, params);
          this.reports = this.$store.state.analytics[type];
          if (this.reportType.selected.value !== "stuffMove") {
            await this.$store.dispatch(`get${capitalizeType}Total`, params);
            this.total = this.$store.state.analytics[`${type}Total`];
          } else {
            this.total = this.$store.state.analytics[`${type}Total`];
          }
          this.applyReportsTransformations(type);
          nextTick(() => this.refGrid?.calcShowTopTitle());
        };
        this.reports.data = [];
        this.total = [];
        await reportFetchRequest(
          this.reportType.selected.value,
          this.capitalize(this.reportType.selected.value)
        );
        this.calcTotal();
      } catch (error) {
        console.error(error);
      }
    },
    changeReportType(option) {
      this.reportType.selected = option;
      this.newPage = 1;
      this.refFilters?.clearAllFields();
    },
    async getTitile() {
      const t1 = performance.now();
      this.isLoading = true;
      this.openedRows = [];
      this.title = this.titles[this.reportType.selected.value];
      await this.getReports();
      const t2 = performance.now();
      setTimeout(() => (this.isLoading = false), 1250 - (t2 - t1));
    },
    changePage(value) {
      this.newPage = value;
      this.getTitile();
    },
    getFilter(value) {
      this.filter = value;
      this.newPage = 1;
      this.getTitile();
    },
    sort(code, order) {
      this.newPage = 1;
      this.sorted = { by: code, order: order };
      this.getTitile();
    },
    round(number) {
      number = Number(number) || 0;
      return (
        Math.round(number * 100) / 100 +
        (this.isMDLAccount ? " MDL" : t("global.currency"))
      );
    },
    capitalize(string) {
      if (typeof string !== "string") return "";
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    applyReportsTransformations(type) {
      if (type == "customers") {
        this.reports.data.map((val) => {
          val["otv"] = {
            value: false,
            list: [],
          };
          val["poz"] = {
            value: false,
            list: [],
            title: [
              { name: t("Analytics.subTitles.name"), code: "name" },
              { name: t("Analytics.subTitles.count"), code: "count" },
              { name: t("Analytics.subTitles.sum"), code: "sum" },
              { name: t("Analytics.subTitles.prib"), code: "prib" },
            ],
          };
          val["prib"] = val.sum - val.cost_sum;
          val.sum = this.round(val.sum);
          val.cost_sum = this.round(val.cost_sum);
          val.prib = this.round(val.prib);
        });
      }
      if (type == "sales") {
        this.reports.data.map((val) => {
          val["poz"] = {
            value: false,
            list: [],
          };
          val["prib"] = val.sum - val.cost_sum;
          val.leads = val.leads?.split(",");
          val.sum = this.round(val.sum);
          val.cost_sum = this.round(val.cost_sum);
          val.prib = this.round(val.prib);
        });
      }
      if (type == "stuffMove") {
        this.reports.data.map((val) => {
          val.event_type = this.reports.types[val.event_type].name;
          val.sum = this.round(val.quantity * val.cost_price);
        });
      }
    },
    exportXlsx() {
      const params = {
        filter: this.filter,
        type: this.reportType.selected?.value2
          ? this.reportType.selected.value2
          : this.reportType.selected.value,
      };
      this.$store.dispatch("analyticsExport", params);
    },
    getAnalyticsLastGroupBy() {
      const lastRes = JSON.parse(localStorage.getItem("AnalyticsLastGroupBy"));
      if (lastRes) this.groupBy.selected = lastRes;
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
  z-index: 50;
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

.test_btn {
  margin-bottom: -1px;
  border: none;
  background-color: transparent;
  color: #757575;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
.test_btn:disabled {
  color: #7575758a;
}
</style>
