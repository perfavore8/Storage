<template>
  <div class="app">
    <div class="header" :class="{ blur: openSelectedReportModal }">
      <div class="btns">
        <button
          class="btns_btn"
          :class="{ selected_catalog: $route.name === page.value }"
          @click="route(page.value)"
          v-for="page in catalog"
          :key="page"
        >
          {{ page.name }}
        </button>
      </div>
    </div>
    <div class="content">
      <div class="btns">
        <button
          @click="clients()"
          class="btn"
          :class="{ selected_report: isClient }"
        >
          Отчет по клиентам
        </button>
        <button
          @click="sales()"
          class="btn"
          :class="{ selected_report: !isClient }"
        >
          Отчет по продажам
        </button>
      </div>
      <RepotFIlters :isClient="isClient" />
      <ReportGrid
        :title="title"
        :reports="reports"
        @updateOpenSelectedReportModal="updateOpenSelectedReportModal"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ReportGrid from "@/components/ReportGrid.vue";
import RepotFIlters from "@/components/RepotFIlters.vue";
export default {
  name: "AnalyticsView",
  components: { ReportGrid, RepotFIlters },
  data() {
    return {
      openSelectedReportModal: false,
      title: [],
      reports: [],
      isClient: true,
    };
  },
  computed: {
    ...mapGetters(["catalog"]),
  },
  mounted() {
    this.clients();
  },
  methods: {
    route(page_name) {
      this.$router.push("/" + page_name);
    },
    updateOpenSelectedReportModal(value) {
      this.openSelectedReportModal = value;
    },
    clients() {
      this.isClient = true;
      this.title = [
        { name: "Компания", code: "company", type: 0 },
        { name: "Контакт", code: "contact", type: 0 },
        { name: "Сделки", code: "deals", type: 0 },
        { name: "Оборот", code: "ob", type: 0 },
        { name: "Прибыль", code: "prib", type: 0 },
        { name: "Ответственные", code: "otv", type: 1 },
        { name: "Позиции", code: "poz", type: 2 },
      ];
      this.reports = [
        {
          id: 0,
          otv: {
            value: false,
            list: [
              {
                id: 0,
                deals: 1,
                ob: "62 900.00 р.",
                prib: "38 273.00 р.",
                otv: "Абашина Ольга",
              },
              {
                id: 1,
                deals: 1,
                ob: "62 900.00 р.",
                prib: "38 273.00 р.",
                otv: "Абашина Ольга",
              },
              {
                id: 2,
                deals: 1,
                ob: "62 900.00 р.",
                prib: "38 273.00 р.",
                otv: "Абашина Ольга",
              },
            ],
          },
          poz: {
            value: false,
            list: [
              {
                name: "Концентрат растительных экстрактов для лица и тела Cleopine ampoule",
                count: "10",
                ob: "25 500.00 р.",
                prib: "17 500.00 р.",
              },
              {
                name: "Маска - лифтинг для лица и тела «Multi EX-Lifting» торговой марки Elysien",
                count: "1",
                ob: "3 600.00 р.",
                prib: "2 455.00 р.",
              },
              {
                name: "Лимфодренажный тоник линии Active Line торговой марки Skindex",
                count: "1",
                ob: "1 650.00 р.	",
                prib: "1 200.00 р.",
              },
              {
                name: "Обновляющий гель для умывания линии Active Line торговой марки Skindex",
                count: "1",
                ob: "1 200.00 р.",
                prib: "	820.00 р.",
              },
              {
                name: "Гоммаж-скатка с Keratoline™️ и алоэ линии Active Line торговой марки Skindex",
                count: "1",
                ob: "	1 200.00 р.",
                prib: "	814.00 р.",
              },
              {
                name: "Крем для век мультивосстановление линии Active Line торговой марки Skindex",
                count: "1",
                ob: "2 130.00 р.	  ",
                prib: "	1 680.00 р.",
              },
              {
                name: "Крем для лица интенсивное преображение линии Active Line торговой марки Skindex",
                count: "1",
                ob: "	2 175.00 р.",
                prib: "1 735.00 р.",
              },
            ],
            title: [
              { name: "Название", code: "name" },
              { name: "Кол-во", code: "count" },
              { name: "Оборот", code: "ob" },
              { name: "Прибыль", code: "prib" },
            ],
          },
          company: "Kasatka Elena ф/л",
          contact: " Kasatka Elena	",
          deals: 1,
          ob: "37 455.00 р.",
          prib: "26 204.00 р.",
        },
        {
          id: 1,
          otv: {
            value: false,
            list: [],
          },
          poz: {
            value: false,
            list: [],
          },
          company: "Nekrasova Oksana ф/л",
          contact: " Nekrasova Oksana",
          deals: 1,
          ob: "73 900.00 р.",
          prib: "45 878.00 р.",
        },
        {
          id: 2,
          otv: {
            value: false,
            list: [],
          },
          poz: {
            value: false,
            list: [],
          },
          company: "Абашина Ольга Александровна ф/л",
          contact: "Абашина Ольга Александровна",
          deals: 1,
          ob: "62 900.00 р.",
          prib: "38 273.00 р.",
        },
        {
          id: 3,
          otv: {
            value: false,
            list: [],
          },
          poz: {
            value: false,
            list: [],
          },
          company: "Абдурахманов Абдухалил Дилшодович ф/л",
          contact: "Эльмира (InterCharm 2022)	",
          deals: 1,
          ob: "145 710.00 р.	",
          prib: "77 898.00 р.",
        },
        {
          id: 4,
          otv: {
            value: false,
            list: [],
          },
          poz: {
            value: false,
            list: [],
          },
          company: "Агаджанова Ануш ф/л",
          contact: " Агаджанова Ануш	",
          deals: 1,
          ob: "1 200.00 р.	",
          prib: "814.00 р.",
        },
      ];
    },
    sales() {
      this.isClient = false;
      this.title = [
        { name: "Название", code: "name", type: 0 },
        { name: "Кол-во", code: "count", type: 0 },
        { name: "Оборот", code: "ob", type: 0 },
        { name: "Себестоимость", code: "ceb", type: 0 },
        { name: "Прибыль", code: "prib", type: 0 },
        { name: "Сделки", code: "deals", type: 0 },
        { name: "Позиции", code: "poz", type: 1 },
      ];
      this.reports = [
        {
          id: 0,
          poz: {
            value: false,
            list: [
              {
                id: 0,
                name: "Артикул: 86, партия: 52022",
                count: "1",
                ob: "1 950.00 р.",
                ceb: "751.00 р.",
                prib: "1 199.00 р.",
                deals: "17864295",
              },
              {
                id: 1,
                name: "Артикул: 86, партия: 52022",
                count: "1",
                ob: "1 950.00 р.",
                ceb: "751.00 р.",
                prib: "1 199.00 р.",
                deals: "17864295",
              },
              {
                id: 2,
                name: "Артикул: 86, партия: 52022",
                count: "1",
                ob: "1 950.00 р.",
                ceb: "751.00 р.",
                prib: "1 199.00 р.",
                deals: "17864295",
              },
            ],
          },
          name: "AS19 rotor (вал для компрессора)",
          count: 1,
          ob: "1 950.00 р.",
          ceb: "751.00 р.",
          prib: "1 199.00 р.",
          deals: "17864295",
        },
        {
          id: 1,
          poz: {
            value: false,
            list: [],
          },
          name: "AS19 rotor (вал для компрессора)",
          count: 1,
          ob: "1 950.00 р.",
          ceb: "751.00 р.",
          prib: "1 199.00 р.",
          deals: "17864295",
        },
        {
          id: 2,
          poz: {
            value: false,
            list: [],
          },
          name: "AS19 rotor (вал для компрессора)",
          count: 1,
          ob: "1 950.00 р.",
          ceb: "751.00 р.",
          prib: "1 199.00 р.",
          deals: "17864295",
        },
        {
          id: 3,
          poz: {
            value: false,
            list: [],
          },
          name: "AS19 rotor (вал для компрессора)",
          count: 1,
          ob: "1 950.00 р.",
          ceb: "751.00 р.",
          prib: "1 199.00 р.",
          deals: "17864295",
        },
        {
          id: 4,
          poz: {
            value: false,
            list: [],
          },
          name: "AS19 rotor (вал для компрессора)",
          count: 1,
          ob: "1 950.00 р.",
          ceb: "751.00 р.",
          prib: "1 199.00 р.",
          deals: "17864295",
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.app {
  width: calc(100vw - 60px);
  height: 100%;
  padding: 0 30px;

  display: flex;
  flex-direction: column;
  gap: 20px;
  user-select: none;
  text-align: center;
}
.header {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  .btns {
    display: flex;
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
    .btns_btn {
      height: 40px;
      padding: 9px;
      cursor: pointer;
      text-align: center;
      vertical-align: center;
      box-sizing: border-box;
      border: 1px solid #1b3546;
      border-radius: 4px;
      color: #1b3546;
      background: white;

      transition: all 0.15s ease-out;
      @include font(400, 18px, 22px);
    }
    .btns_btn:hover {
      border-color: #396f93;
      color: #396f93;
    }
    .selected_catalog {
      transition: all 0.15s ease-out;
      background: #1b3546;
      color: white;
    }
    .selected_catalog:hover {
      color: hsl(204, 44%, 95%);
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
}
</style>
