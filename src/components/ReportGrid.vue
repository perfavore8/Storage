<template>
  <p class="count">Найдено: {{ count }}</p>
  <table class="table" :class="{ blur: openSelectedReportModal }">
    <thead>
      <tr class="row title">
        <td class="item" v-for="tit in title" :key="tit">{{ tit.name }}</td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(report, idx) in copyReports" :key="report.id">
        <tr class="row" :class="{ row_odd: idx % 2 == 0 }">
          <td
            class="item"
            v-for="tit in title"
            :key="tit"
            :class="{ center: tit.type }"
          >
            <span v-if="!tit.type">
              {{ report[tit.code] }}
            </span>
            <button
              class="btn"
              v-else
              @click="report[tit.code].value = !report[tit.code].value"
            >
              {{ report[tit.code].value ? "Скрыть" : "Показать" }}
            </button>
          </td>
        </tr>
        <tr
          class="hiden"
          v-for="otv in report[buttonInTitle.code].list"
          :key="otv.id"
          v-show="report[buttonInTitle.code].value"
        >
          <td class="item" v-for="tit in title" :key="tit">
            <span v-if="otv[tit.code]">
              {{ otv[tit.code] }}
            </span>
          </td>
        </tr>
        <tr class="space" v-if="report[buttonInTitle.code].value"></tr>
      </template>
    </tbody>
  </table>
  <Teleport to="body">
    <ReportGridModal
      v-if="selectedReport.value"
      :title="selectedReport?.title"
      :list="selectedReport?.list"
      :company="selectedReport?.company"
      @close="closeReportGridModal"
    />
  </Teleport>
</template>

<script>
import ReportGridModal from "./ReportGridModal.vue";
export default {
  components: { ReportGridModal },
  props: {
    title: { type: Array, required: true },
    reports: { type: Array, required: true },
  },
  data() {
    return {
      copyReports: [],
      count: 421,
    };
  },
  mounted() {
    this.copy();
  },
  computed: {
    buttonInTitle() {
      return this.title?.filter((val) => val?.type == 1)[0];
    },
    modalInTitle() {
      return this.title?.filter((val) => val?.type == 2)[0];
    },
    selectedReport() {
      const item = this.copyReports.filter((val) => {
        if (val[this.modalInTitle?.code])
          return val[this.modalInTitle?.code].value;
      })[0];
      let props = { value: false };
      if (item) {
        props = {
          company: item.company,
          value: item[this.modalInTitle?.code].value,
          list: item[this.modalInTitle?.code].list,
          title: item[this.modalInTitle?.code]?.title,
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
    reports: {
      handler: function () {
        this.copy();
      },
      deep: true,
    },
  },
  methods: {
    copy() {
      this.copyReports = JSON.parse(JSON.stringify(this.reports));
    },
    closeReportGridModal() {
      this.copyReports[
        this.copyReports.indexOf(
          this.copyReports.filter((val) => {
            if (val[this.modalInTitle?.code])
              return val[this.modalInTitle?.code].value;
          })[0]
        )
      ][this.modalInTitle?.code].value = false;
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
}
</style>
