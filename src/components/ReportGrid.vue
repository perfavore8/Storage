<template>
  <table class="table">
    <thead>
      <tr class="row title">
        <td class="item" v-for="tit in title" :key="tit">{{ tit.name }}</td>
      </tr>
    </thead>
    <tbody>
      <template v-for="(report, idx) in reports" :key="report.id">
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
</template>

<script>
export default {
  data() {
    return {
      title: [
        { name: "Компания", code: "company", type: 0 },
        { name: "Контакт", code: "contact", type: 0 },
        { name: "Сделки", code: "deals", type: 0 },
        { name: "Оборот", code: "ob", type: 0 },
        { name: "Прибыль", code: "prib", type: 0 },
        { name: "Ответственные", code: "otv", type: 1 },
        { name: "Позиции", code: "poz", type: 2 },
      ],
      // title: [
      //   { name: "Название", code: "name", type: 0 },
      //   { name: "Кол-во", code: "count", type: 0 },
      //   { name: "Оборот", code: "ob", type: 0 },
      //   { name: "Себестоимость", code: "ceb", type: 0 },
      //   { name: "Прибыль", code: "prib", type: 0 },
      //   { name: "Сделки", code: "deals", type: 0 },
      //   { name: "Позиции", code: "poz", type: 1 },
      // ],
      reports: [
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
            list: [],
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
      ],

      // reports: [
      //   {
      //     id: 0,
      //     poz: {
      //       value: false,
      //       list: [
      //         {
      //           id: 0,
      //           name: "Артикул: 86, партия: 52022",
      //           count: "1",
      //           ob: "1 950.00 р.",
      //           ceb: "751.00 р.",
      //           prib: "1 199.00 р.",
      //           deals: "17864295",
      //         },
      //         {
      //           id: 1,
      //           name: "Артикул: 86, партия: 52022",
      //           count: "1",
      //           ob: "1 950.00 р.",
      //           ceb: "751.00 р.",
      //           prib: "1 199.00 р.",
      //           deals: "17864295",
      //         },
      //         {
      //           id: 2,
      //           name: "Артикул: 86, партия: 52022",
      //           count: "1",
      //           ob: "1 950.00 р.",
      //           ceb: "751.00 р.",
      //           prib: "1 199.00 р.",
      //           deals: "17864295",
      //         },
      //       ],
      //     },
      //     name: "AS19 rotor (вал для компрессора)",
      //     count: 1,
      //     ob: "1 950.00 р.",
      //     ceb: "751.00 р.",
      //     prib: "1 199.00 р.",
      //     deals: "17864295",
      //   },
      //   {
      //     id: 1,
      //     poz: {
      //       value: false,
      //       list: [],
      //     },
      //     name: "AS19 rotor (вал для компрессора)",
      //     count: 1,
      //     ob: "1 950.00 р.",
      //     ceb: "751.00 р.",
      //     prib: "1 199.00 р.",
      //     deals: "17864295",
      //   },
      //   {
      //     id: 2,
      //     poz: {
      //       value: false,
      //       list: [],
      //     },
      //     name: "AS19 rotor (вал для компрессора)",
      //     count: 1,
      //     ob: "1 950.00 р.",
      //     ceb: "751.00 р.",
      //     prib: "1 199.00 р.",
      //     deals: "17864295",
      //   },
      //   {
      //     id: 3,
      //     poz: {
      //       value: false,
      //       list: [],
      //     },
      //     name: "AS19 rotor (вал для компрессора)",
      //     count: 1,
      //     ob: "1 950.00 р.",
      //     ceb: "751.00 р.",
      //     prib: "1 199.00 р.",
      //     deals: "17864295",
      //   },
      //   {
      //     id: 4,
      //     poz: {
      //       value: false,
      //       list: [],
      //     },
      //     name: "AS19 rotor (вал для компрессора)",
      //     count: 1,
      //     ob: "1 950.00 р.",
      //     ceb: "751.00 р.",
      //     prib: "1 199.00 р.",
      //     deals: "17864295",
      //   },
      // ],
    };
  },
  computed: {
    buttonInTitle() {
      return this.title?.filter((val) => val.type == 1)[0];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
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
</style>
