<template>
  <NotificationCenter />
  <div class="wrapper dark:bg-slate-900">
    <div class="item" v-for="item in data" :key="item">
      <apexchart
        :type="item.type"
        width="600"
        :options="item.chartOptions"
        :series="item.series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import NotificationCenter from "@/components/NotificationCenter.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  components: {
    NotificationCenter,
  },

  setup() {
    const route = useRoute();
    const isDarkTest = computed(() => route?.query?.test === "dark");
    console.log(isDarkTest.value);

    const selected = ref(0);

    var dataSeries = [
      [
        {
          date: "2014-01-01",
          value: 20000000,
        },
        {
          date: "2014-01-02",
          value: 10379978,
        },
        {
          date: "2014-01-03",
          value: 30493749,
        },
        {
          date: "2014-01-04",
          value: 10785250,
        },
        {
          date: "2014-01-05",
          value: 33901904,
        },
        {
          date: "2014-01-06",
          value: 11576838,
        },
        {
          date: "2014-01-07",
          value: 14413854,
        },
        {
          date: "2014-01-08",
          value: 15177211,
        },
        {
          date: "2014-01-09",
          value: 16622100,
        },
        {
          date: "2014-01-10",
          value: 17381072,
        },
        {
          date: "2014-01-11",
          value: 18802310,
        },
        {
          date: "2014-01-12",
          value: 15531790,
        },
        {
          date: "2014-01-13",
          value: 15748881,
        },
        {
          date: "2014-01-14",
          value: 18706437,
        },
        {
          date: "2014-01-15",
          value: 19752685,
        },
        {
          date: "2014-01-16",
          value: 21016418,
        },
        {
          date: "2014-01-17",
          value: 25622924,
        },
        {
          date: "2014-01-18",
          value: 25337480,
        },
        {
          date: "2014-01-19",
          value: 22258882,
        },
        {
          date: "2014-01-20",
          value: 23829538,
        },
        {
          date: "2014-01-21",
          value: 24245689,
        },
        {
          date: "2014-01-22",
          value: 26429711,
        },
        {
          date: "2014-01-23",
          value: 26259017,
        },
        {
          date: "2014-01-24",
          value: 25396183,
        },
        {
          date: "2014-01-25",
          value: 23107346,
        },
        {
          date: "2014-01-26",
          value: 28659852,
        },
        {
          date: "2014-01-27",
          value: 25270783,
        },
        {
          date: "2014-01-28",
          value: 26270783,
        },
        {
          date: "2014-01-29",
          value: 27270783,
        },
        {
          date: "2014-01-30",
          value: 28270783,
        },
        {
          date: "2014-01-31",
          value: 29270783,
        },
        {
          date: "2014-02-01",
          value: 30270783,
        },
        {
          date: "2014-02-02",
          value: 31270783,
        },
        {
          date: "2014-02-03",
          value: 32270783,
        },
        {
          date: "2014-02-04",
          value: 33270783,
        },
        {
          date: "2014-02-05",
          value: 28270783,
        },
        {
          date: "2014-02-06",
          value: 27270783,
        },
        {
          date: "2014-02-07",
          value: 35270783,
        },
        {
          date: "2014-02-08",
          value: 34270783,
        },
        {
          date: "2014-02-09",
          value: 28270783,
        },
        {
          date: "2014-02-10",
          value: 35270783,
        },
        {
          date: "2014-02-11",
          value: 36270783,
        },
        {
          date: "2014-02-12",
          value: 34127078,
        },
        {
          date: "2014-02-13",
          value: 33124078,
        },
        {
          date: "2014-02-14",
          value: 36227078,
        },
        {
          date: "2014-02-15",
          value: 37827078,
        },
        {
          date: "2014-02-16",
          value: 36427073,
        },
        {
          date: "2014-02-17",
          value: 37570783,
        },
        {
          date: "2014-02-18",
          value: 38627073,
        },
        {
          date: "2014-02-19",
          value: 37727078,
        },
        {
          date: "2014-02-20",
          value: 38827073,
        },
        {
          date: "2014-02-21",
          value: 40927078,
        },
        {
          date: "2014-02-22",
          value: 41027078,
        },
        {
          date: "2014-02-23",
          value: 42127073,
        },
        {
          date: "2014-02-24",
          value: 43220783,
        },
        {
          date: "2014-02-25",
          value: 44327078,
        },
        {
          date: "2014-02-26",
          value: 40427078,
        },
        {
          date: "2014-02-27",
          value: 41027078,
        },
        {
          date: "2014-02-28",
          value: 45627078,
        },
        {
          date: "2014-03-01",
          value: 44727078,
        },
        {
          date: "2014-03-02",
          value: 44227078,
        },
        {
          date: "2014-03-03",
          value: 45227078,
        },
        {
          date: "2014-03-04",
          value: 46027078,
        },
        {
          date: "2014-03-05",
          value: 46927078,
        },
        {
          date: "2014-03-06",
          value: 47027078,
        },
        {
          date: "2014-03-07",
          value: 46227078,
        },
        {
          date: "2014-03-08",
          value: 47027078,
        },
        {
          date: "2014-03-09",
          value: 48027078,
        },
        {
          date: "2014-03-10",
          value: 47027078,
        },
        {
          date: "2014-03-11",
          value: 47027078,
        },
        {
          date: "2014-03-12",
          value: 48017078,
        },
        {
          date: "2014-03-13",
          value: 48077078,
        },
        {
          date: "2014-03-14",
          value: 48087078,
        },
        {
          date: "2014-03-15",
          value: 48017078,
        },
        {
          date: "2014-03-16",
          value: 48047078,
        },
        {
          date: "2014-03-17",
          value: 48067078,
        },
        {
          date: "2014-03-18",
          value: 48077078,
        },
        {
          date: "2014-03-19",
          value: 48027074,
        },
        {
          date: "2014-03-20",
          value: 48927079,
        },
        {
          date: "2014-03-21",
          value: 48727071,
        },
        {
          date: "2014-03-22",
          value: 48127072,
        },
        {
          date: "2014-03-23",
          value: 48527072,
        },
        {
          date: "2014-03-24",
          value: 48627027,
        },
        {
          date: "2014-03-25",
          value: 48027040,
        },
        {
          date: "2014-03-26",
          value: 48027043,
        },
        {
          date: "2014-03-27",
          value: 48057022,
        },
        {
          date: "2014-03-28",
          value: 49057022,
        },
        {
          date: "2014-03-29",
          value: 50057022,
        },
        {
          date: "2014-03-30",
          value: 51057022,
        },
        {
          date: "2014-03-31",
          value: 52057022,
        },
        {
          date: "2014-04-01",
          value: 53057022,
        },
        {
          date: "2014-04-02",
          value: 54057022,
        },
        {
          date: "2014-04-03",
          value: 52057022,
        },
        {
          date: "2014-04-04",
          value: 55057022,
        },
        {
          date: "2014-04-05",
          value: 58270783,
        },
        {
          date: "2014-04-06",
          value: 56270783,
        },
        {
          date: "2014-04-07",
          value: 55270783,
        },
        {
          date: "2014-04-08",
          value: 58270783,
        },
        {
          date: "2014-04-09",
          value: 59270783,
        },
        {
          date: "2014-04-10",
          value: 60270783,
        },
        {
          date: "2014-04-11",
          value: 61270783,
        },
        {
          date: "2014-04-12",
          value: 62270783,
        },
        {
          date: "2014-04-13",
          value: 63270783,
        },
        {
          date: "2014-04-14",
          value: 64270783,
        },
        {
          date: "2014-04-15",
          value: 65270783,
        },
        {
          date: "2014-04-16",
          value: 66270783,
        },
        {
          date: "2014-04-17",
          value: 67270783,
        },
        {
          date: "2014-04-18",
          value: 68270783,
        },
        {
          date: "2014-04-19",
          value: 69270783,
        },
        {
          date: "2014-04-20",
          value: 70270783,
        },
        {
          date: "2014-04-21",
          value: 71270783,
        },
        {
          date: "2014-04-22",
          value: 72270783,
        },
        {
          date: "2014-04-23",
          value: 73270783,
        },
        {
          date: "2014-04-24",
          value: 74270783,
        },
        {
          date: "2014-04-25",
          value: 75270783,
        },
        {
          date: "2014-04-26",
          value: 76660783,
        },
        {
          date: "2014-04-27",
          value: 77270783,
        },
        {
          date: "2014-04-28",
          value: 78370783,
        },
        {
          date: "2014-04-29",
          value: 79470783,
        },
        {
          date: "2014-04-30",
          value: 80170783,
        },
      ],
      [
        {
          date: "2014-01-01",
          value: 150000000,
        },
        {
          date: "2014-01-02",
          value: 160379978,
        },
        {
          date: "2014-01-03",
          value: 170493749,
        },
        {
          date: "2014-01-04",
          value: 160785250,
        },
        {
          date: "2014-01-05",
          value: 167391904,
        },
        {
          date: "2014-01-06",
          value: 161576838,
        },
        {
          date: "2014-01-07",
          value: 161413854,
        },
        {
          date: "2014-01-08",
          value: 152177211,
        },
        {
          date: "2014-01-09",
          value: 140762210,
        },
        {
          date: "2014-01-10",
          value: 144381072,
        },
        {
          date: "2014-01-11",
          value: 154352310,
        },
        {
          date: "2014-01-12",
          value: 165531790,
        },
        {
          date: "2014-01-13",
          value: 175748881,
        },
        {
          date: "2014-01-14",
          value: 187064037,
        },
        {
          date: "2014-01-15",
          value: 197520685,
        },
        {
          date: "2014-01-16",
          value: 210176418,
        },
        {
          date: "2014-01-17",
          value: 196122924,
        },
        {
          date: "2014-01-18",
          value: 207337480,
        },
        {
          date: "2014-01-19",
          value: 200258882,
        },
        {
          date: "2014-01-20",
          value: 186829538,
        },
        {
          date: "2014-01-21",
          value: 192456897,
        },
        {
          date: "2014-01-22",
          value: 204299711,
        },
        {
          date: "2014-01-23",
          value: 192759017,
        },
        {
          date: "2014-01-24",
          value: 203596183,
        },
        {
          date: "2014-01-25",
          value: 208107346,
        },
        {
          date: "2014-01-26",
          value: 196359852,
        },
        {
          date: "2014-01-27",
          value: 192570783,
        },
        {
          date: "2014-01-28",
          value: 177967768,
        },
        {
          date: "2014-01-29",
          value: 190632803,
        },
        {
          date: "2014-01-30",
          value: 203725316,
        },
        {
          date: "2014-01-31",
          value: 218226177,
        },
        {
          date: "2014-02-01",
          value: 210698669,
        },
        {
          date: "2014-02-02",
          value: 217640656,
        },
        {
          date: "2014-02-03",
          value: 216142362,
        },
        {
          date: "2014-02-04",
          value: 201410971,
        },
        {
          date: "2014-02-05",
          value: 196704289,
        },
        {
          date: "2014-02-06",
          value: 190436945,
        },
        {
          date: "2014-02-07",
          value: 178891686,
        },
        {
          date: "2014-02-08",
          value: 171613962,
        },
        {
          date: "2014-02-09",
          value: 157579773,
        },
        {
          date: "2014-02-10",
          value: 158677098,
        },
        {
          date: "2014-02-11",
          value: 147129977,
        },
        {
          date: "2014-02-12",
          value: 151561876,
        },
        {
          date: "2014-02-13",
          value: 151627421,
        },
        {
          date: "2014-02-14",
          value: 143543872,
        },
        {
          date: "2014-02-15",
          value: 136581057,
        },
        {
          date: "2014-02-16",
          value: 135560715,
        },
        {
          date: "2014-02-17",
          value: 122625263,
        },
        {
          date: "2014-02-18",
          value: 112091484,
        },
        {
          date: "2014-02-19",
          value: 98810329,
        },
        {
          date: "2014-02-20",
          value: 99882912,
        },
        {
          date: "2014-02-21",
          value: 94943095,
        },
        {
          date: "2014-02-22",
          value: 104875743,
        },
        {
          date: "2014-02-23",
          value: 116383678,
        },
        {
          date: "2014-02-24",
          value: 125028841,
        },
        {
          date: "2014-02-25",
          value: 123967310,
        },
        {
          date: "2014-02-26",
          value: 133167029,
        },
        {
          date: "2014-02-27",
          value: 128577263,
        },
        {
          date: "2014-02-28",
          value: 115836969,
        },
        {
          date: "2014-03-01",
          value: 119264529,
        },
        {
          date: "2014-03-02",
          value: 109363374,
        },
        {
          date: "2014-03-03",
          value: 113985628,
        },
        {
          date: "2014-03-04",
          value: 114650999,
        },
        {
          date: "2014-03-05",
          value: 110866108,
        },
        {
          date: "2014-03-06",
          value: 96473454,
        },
        {
          date: "2014-03-07",
          value: 104075886,
        },
        {
          date: "2014-03-08",
          value: 103568384,
        },
        {
          date: "2014-03-09",
          value: 101534883,
        },
        {
          date: "2014-03-10",
          value: 115825447,
        },
        {
          date: "2014-03-11",
          value: 126133916,
        },
        {
          date: "2014-03-12",
          value: 116502109,
        },
        {
          date: "2014-03-13",
          value: 130169411,
        },
        {
          date: "2014-03-14",
          value: 124296886,
        },
        {
          date: "2014-03-15",
          value: 126347399,
        },
        {
          date: "2014-03-16",
          value: 131483669,
        },
        {
          date: "2014-03-17",
          value: 142811333,
        },
        {
          date: "2014-03-18",
          value: 129675396,
        },
        {
          date: "2014-03-19",
          value: 115514483,
        },
        {
          date: "2014-03-20",
          value: 117630630,
        },
        {
          date: "2014-03-21",
          value: 122340239,
        },
        {
          date: "2014-03-22",
          value: 132349091,
        },
        {
          date: "2014-03-23",
          value: 125613305,
        },
        {
          date: "2014-03-24",
          value: 135592466,
        },
        {
          date: "2014-03-25",
          value: 123408762,
        },
        {
          date: "2014-03-26",
          value: 111991454,
        },
        {
          date: "2014-03-27",
          value: 116123955,
        },
        {
          date: "2014-03-28",
          value: 112817214,
        },
        {
          date: "2014-03-29",
          value: 113029590,
        },
        {
          date: "2014-03-30",
          value: 108753398,
        },
        {
          date: "2014-03-31",
          value: 99383763,
        },
        {
          date: "2014-04-01",
          value: 100151737,
        },
        {
          date: "2014-04-02",
          value: 94985209,
        },
        {
          date: "2014-04-03",
          value: 82913669,
        },
        {
          date: "2014-04-04",
          value: 78748268,
        },
        {
          date: "2014-04-05",
          value: 63829135,
        },
        {
          date: "2014-04-06",
          value: 78694727,
        },
        {
          date: "2014-04-07",
          value: 80868994,
        },
        {
          date: "2014-04-08",
          value: 93799013,
        },
        {
          date: "2014-04-09",
          value: 99042416,
        },
        {
          date: "2014-04-10",
          value: 97298692,
        },
        {
          date: "2014-04-11",
          value: 83353499,
        },
        {
          date: "2014-04-12",
          value: 71248129,
        },
        {
          date: "2014-04-13",
          value: 75253744,
        },
        {
          date: "2014-04-14",
          value: 68976648,
        },
        {
          date: "2014-04-15",
          value: 71002284,
        },
        {
          date: "2014-04-16",
          value: 75052401,
        },
        {
          date: "2014-04-17",
          value: 83894030,
        },
        {
          date: "2014-04-18",
          value: 90236528,
        },
        {
          date: "2014-04-19",
          value: 99739114,
        },
        {
          date: "2014-04-20",
          value: 96407136,
        },
        {
          date: "2014-04-21",
          value: 108323177,
        },
        {
          date: "2014-04-22",
          value: 101578914,
        },
        {
          date: "2014-04-23",
          value: 115877608,
        },
        {
          date: "2014-04-24",
          value: 112088857,
        },
        {
          date: "2014-04-25",
          value: 112071353,
        },
        {
          date: "2014-04-26",
          value: 101790062,
        },
        {
          date: "2014-04-27",
          value: 115003761,
        },
        {
          date: "2014-04-28",
          value: 120457727,
        },
        {
          date: "2014-04-29",
          value: 118253926,
        },
        {
          date: "2014-04-30",
          value: 117956992,
        },
      ],
      [
        {
          date: "2014-01-01",
          value: 50000000,
        },
        {
          date: "2014-01-02",
          value: 60379978,
        },
        {
          date: "2014-01-03",
          value: 40493749,
        },
        {
          date: "2014-01-04",
          value: 60785250,
        },
        {
          date: "2014-01-05",
          value: 67391904,
        },
        {
          date: "2014-01-06",
          value: 61576838,
        },
        {
          date: "2014-01-07",
          value: 61413854,
        },
        {
          date: "2014-01-08",
          value: 82177211,
        },
        {
          date: "2014-01-09",
          value: 103762210,
        },
        {
          date: "2014-01-10",
          value: 84381072,
        },
        {
          date: "2014-01-11",
          value: 54352310,
        },
        {
          date: "2014-01-12",
          value: 65531790,
        },
        {
          date: "2014-01-13",
          value: 75748881,
        },
        {
          date: "2014-01-14",
          value: 47064037,
        },
        {
          date: "2014-01-15",
          value: 67520685,
        },
        {
          date: "2014-01-16",
          value: 60176418,
        },
        {
          date: "2014-01-17",
          value: 66122924,
        },
        {
          date: "2014-01-18",
          value: 57337480,
        },
        {
          date: "2014-01-19",
          value: 100258882,
        },
        {
          date: "2014-01-20",
          value: 46829538,
        },
        {
          date: "2014-01-21",
          value: 92456897,
        },
        {
          date: "2014-01-22",
          value: 94299711,
        },
        {
          date: "2014-01-23",
          value: 62759017,
        },
        {
          date: "2014-01-24",
          value: 103596183,
        },
        {
          date: "2014-01-25",
          value: 108107346,
        },
        {
          date: "2014-01-26",
          value: 66359852,
        },
        {
          date: "2014-01-27",
          value: 62570783,
        },
        {
          date: "2014-01-28",
          value: 77967768,
        },
        {
          date: "2014-01-29",
          value: 60632803,
        },
        {
          date: "2014-01-30",
          value: 103725316,
        },
        {
          date: "2014-01-31",
          value: 98226177,
        },
        {
          date: "2014-02-01",
          value: 60698669,
        },
        {
          date: "2014-02-02",
          value: 67640656,
        },
        {
          date: "2014-02-03",
          value: 66142362,
        },
        {
          date: "2014-02-04",
          value: 101410971,
        },
        {
          date: "2014-02-05",
          value: 66704289,
        },
        {
          date: "2014-02-06",
          value: 60436945,
        },
        {
          date: "2014-02-07",
          value: 78891686,
        },
        {
          date: "2014-02-08",
          value: 71613962,
        },
        {
          date: "2014-02-09",
          value: 107579773,
        },
        {
          date: "2014-02-10",
          value: 58677098,
        },
        {
          date: "2014-02-11",
          value: 87129977,
        },
        {
          date: "2014-02-12",
          value: 51561876,
        },
        {
          date: "2014-02-13",
          value: 51627421,
        },
        {
          date: "2014-02-14",
          value: 83543872,
        },
        {
          date: "2014-02-15",
          value: 66581057,
        },
        {
          date: "2014-02-16",
          value: 65560715,
        },
        {
          date: "2014-02-17",
          value: 62625263,
        },
        {
          date: "2014-02-18",
          value: 92091484,
        },
        {
          date: "2014-02-19",
          value: 48810329,
        },
        {
          date: "2014-02-20",
          value: 49882912,
        },
        {
          date: "2014-02-21",
          value: 44943095,
        },
        {
          date: "2014-02-22",
          value: 104875743,
        },
        {
          date: "2014-02-23",
          value: 96383678,
        },
        {
          date: "2014-02-24",
          value: 105028841,
        },
        {
          date: "2014-02-25",
          value: 63967310,
        },
        {
          date: "2014-02-26",
          value: 63167029,
        },
        {
          date: "2014-02-27",
          value: 68577263,
        },
        {
          date: "2014-02-28",
          value: 95836969,
        },
        {
          date: "2014-03-01",
          value: 99264529,
        },
        {
          date: "2014-03-02",
          value: 109363374,
        },
        {
          date: "2014-03-03",
          value: 93985628,
        },
        {
          date: "2014-03-04",
          value: 94650999,
        },
        {
          date: "2014-03-05",
          value: 90866108,
        },
        {
          date: "2014-03-06",
          value: 46473454,
        },
        {
          date: "2014-03-07",
          value: 84075886,
        },
        {
          date: "2014-03-08",
          value: 103568384,
        },
        {
          date: "2014-03-09",
          value: 101534883,
        },
        {
          date: "2014-03-10",
          value: 95825447,
        },
        {
          date: "2014-03-11",
          value: 66133916,
        },
        {
          date: "2014-03-12",
          value: 96502109,
        },
        {
          date: "2014-03-13",
          value: 80169411,
        },
        {
          date: "2014-03-14",
          value: 84296886,
        },
        {
          date: "2014-03-15",
          value: 86347399,
        },
        {
          date: "2014-03-16",
          value: 31483669,
        },
        {
          date: "2014-03-17",
          value: 82811333,
        },
        {
          date: "2014-03-18",
          value: 89675396,
        },
        {
          date: "2014-03-19",
          value: 95514483,
        },
        {
          date: "2014-03-20",
          value: 97630630,
        },
        {
          date: "2014-03-21",
          value: 62340239,
        },
        {
          date: "2014-03-22",
          value: 62349091,
        },
        {
          date: "2014-03-23",
          value: 65613305,
        },
        {
          date: "2014-03-24",
          value: 65592466,
        },
        {
          date: "2014-03-25",
          value: 63408762,
        },
        {
          date: "2014-03-26",
          value: 91991454,
        },
        {
          date: "2014-03-27",
          value: 96123955,
        },
        {
          date: "2014-03-28",
          value: 92817214,
        },
        {
          date: "2014-03-29",
          value: 93029590,
        },
        {
          date: "2014-03-30",
          value: 108753398,
        },
        {
          date: "2014-03-31",
          value: 49383763,
        },
        {
          date: "2014-04-01",
          value: 100151737,
        },
        {
          date: "2014-04-02",
          value: 44985209,
        },
        {
          date: "2014-04-03",
          value: 52913669,
        },
        {
          date: "2014-04-04",
          value: 48748268,
        },
        {
          date: "2014-04-05",
          value: 23829135,
        },
        {
          date: "2014-04-06",
          value: 58694727,
        },
        {
          date: "2014-04-07",
          value: 50868994,
        },
        {
          date: "2014-04-08",
          value: 43799013,
        },
        {
          date: "2014-04-09",
          value: 4042416,
        },
        {
          date: "2014-04-10",
          value: 47298692,
        },
        {
          date: "2014-04-11",
          value: 53353499,
        },
        {
          date: "2014-04-12",
          value: 71248129,
        },
        {
          date: "2014-04-13",
          value: 75253744,
        },
        {
          date: "2014-04-14",
          value: 68976648,
        },
        {
          date: "2014-04-15",
          value: 71002284,
        },
        {
          date: "2014-04-16",
          value: 75052401,
        },
        {
          date: "2014-04-17",
          value: 83894030,
        },
        {
          date: "2014-04-18",
          value: 50236528,
        },
        {
          date: "2014-04-19",
          value: 59739114,
        },
        {
          date: "2014-04-20",
          value: 56407136,
        },
        {
          date: "2014-04-21",
          value: 108323177,
        },
        {
          date: "2014-04-22",
          value: 101578914,
        },
        {
          date: "2014-04-23",
          value: 95877608,
        },
        {
          date: "2014-04-24",
          value: 62088857,
        },
        {
          date: "2014-04-25",
          value: 92071353,
        },
        {
          date: "2014-04-26",
          value: 81790062,
        },
        {
          date: "2014-04-27",
          value: 105003761,
        },
        {
          date: "2014-04-28",
          value: 100457727,
        },
        {
          date: "2014-04-29",
          value: 98253926,
        },
        {
          date: "2014-04-30",
          value: 67956992,
        },
      ],
    ];

    var ts2 = 1484418600000;
    var dates = [];
    for (var i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, dataSeries[1][i].value]);
    }

    const series = {
      monthDataSeries1: {
        prices: [
          8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3,
          8481.85, 8487.7, 8506.9, 8626.2, 8668.95, 8602.3, 8607.55, 8512.9,
          8496.25, 8600.65, 8881.1, 9340.85,
        ],
        dates: [
          "13 Nov 2017",
          "14 Nov 2017",
          "15 Nov 2017",
          "16 Nov 2017",
          "17 Nov 2017",
          "20 Nov 2017",
          "21 Nov 2017",
          "22 Nov 2017",
          "23 Nov 2017",
          "24 Nov 2017",
          "27 Nov 2017",
          "28 Nov 2017",
          "29 Nov 2017",
          "30 Nov 2017",
          "01 Dec 2017",
          "04 Dec 2017",
          "05 Dec 2017",
          "06 Dec 2017",
          "07 Dec 2017",
          "08 Dec 2017",
        ],
      },
      monthDataSeries2: {
        prices: [
          8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9, 8626.2, 8668.95,
          8602.3, 8607.55, 8512.9, 8496.25, 8600.65, 8881.1, 9040.85, 8340.7,
          8165.5, 8122.9, 8107.85, 8128.0,
        ],
        dates: [
          "13 Nov 2017",
          "14 Nov 2017",
          "15 Nov 2017",
          "16 Nov 2017",
          "17 Nov 2017",
          "20 Nov 2017",
          "21 Nov 2017",
          "22 Nov 2017",
          "23 Nov 2017",
          "24 Nov 2017",
          "27 Nov 2017",
          "28 Nov 2017",
          "29 Nov 2017",
          "30 Nov 2017",
          "01 Dec 2017",
          "04 Dec 2017",
          "05 Dec 2017",
          "06 Dec 2017",
          "07 Dec 2017",
          "08 Dec 2017",
        ],
      },
      monthDataSeries3: {
        prices: [
          7114.25, 7126.6, 7116.95, 7203.7, 7233.75, 7451.0, 7381.15, 7348.95,
          7347.75, 7311.25, 7266.4, 7253.25, 7215.45, 7266.35, 7315.25, 7237.2,
          7191.4, 7238.95, 7222.6, 7217.9, 7359.3, 7371.55, 7371.15, 7469.2,
          7429.25, 7434.65, 7451.1, 7475.25, 7566.25, 7556.8, 7525.55, 7555.45,
          7560.9, 7490.7, 7527.6, 7551.9, 7514.85, 7577.95, 7592.3, 7621.95,
          7707.95, 7859.1, 7815.7, 7739.0, 7778.7, 7839.45, 7756.45, 7669.2,
          7580.45, 7452.85, 7617.25, 7701.6, 7606.8, 7620.05, 7513.85, 7498.45,
          7575.45, 7601.95, 7589.1, 7525.85, 7569.5, 7702.5, 7812.7, 7803.75,
          7816.3, 7851.15, 7912.2, 7972.8, 8145.0, 8161.1, 8121.05, 8071.25,
          8088.2, 8154.45, 8148.3, 8122.05, 8132.65, 8074.55, 7952.8, 7885.55,
          7733.9, 7897.15, 7973.15, 7888.5, 7842.8, 7838.4, 7909.85, 7892.75,
          7897.75, 7820.05, 7904.4, 7872.2, 7847.5, 7849.55, 7789.6, 7736.35,
          7819.4, 7875.35, 7871.8, 8076.5, 8114.8, 8193.55, 8217.1, 8235.05,
          8215.3, 8216.4, 8301.55, 8235.25, 8229.75, 8201.95, 8164.95, 8107.85,
          8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85,
          8487.7, 8506.9, 8626.2,
        ],
        dates: [
          "02 Jun 2017",
          "05 Jun 2017",
          "06 Jun 2017",
          "07 Jun 2017",
          "08 Jun 2017",
          "09 Jun 2017",
          "12 Jun 2017",
          "13 Jun 2017",
          "14 Jun 2017",
          "15 Jun 2017",
          "16 Jun 2017",
          "19 Jun 2017",
          "20 Jun 2017",
          "21 Jun 2017",
          "22 Jun 2017",
          "23 Jun 2017",
          "27 Jun 2017",
          "28 Jun 2017",
          "29 Jun 2017",
          "30 Jun 2017",
          "03 Jul 2017",
          "04 Jul 2017",
          "05 Jul 2017",
          "06 Jul 2017",
          "07 Jul 2017",
          "10 Jul 2017",
          "11 Jul 2017",
          "12 Jul 2017",
          "13 Jul 2017",
          "14 Jul 2017",
          "17 Jul 2017",
          "18 Jul 2017",
          "19 Jul 2017",
          "20 Jul 2017",
          "21 Jul 2017",
          "24 Jul 2017",
          "25 Jul 2017",
          "26 Jul 2017",
          "27 Jul 2017",
          "28 Jul 2017",
          "31 Jul 2017",
          "01 Aug 2017",
          "02 Aug 2017",
          "03 Aug 2017",
          "04 Aug 2017",
          "07 Aug 2017",
          "08 Aug 2017",
          "09 Aug 2017",
          "10 Aug 2017",
          "11 Aug 2017",
          "14 Aug 2017",
          "16 Aug 2017",
          "17 Aug 2017",
          "18 Aug 2017",
          "21 Aug 2017",
          "22 Aug 2017",
          "23 Aug 2017",
          "24 Aug 2017",
          "28 Aug 2017",
          "29 Aug 2017",
          "30 Aug 2017",
          "31 Aug 2017",
          "01 Sep 2017",
          "04 Sep 2017",
          "05 Sep 2017",
          "06 Sep 2017",
          "07 Sep 2017",
          "08 Sep 2017",
          "11 Sep 2017",
          "12 Sep 2017",
          "13 Sep 2017",
          "14 Sep 2017",
          "15 Sep 2017",
          "18 Sep 2017",
          "19 Sep 2017",
          "20 Sep 2017",
          "21 Sep 2017",
          "22 Sep 2017",
          "25 Sep 2017",
          "26 Sep 2017",
          "27 Sep 2017",
          "28 Sep 2017",
          "29 Sep 2017",
          "03 Oct 2017",
          "04 Oct 2017",
          "05 Oct 2017",
          "06 Oct 2017",
          "09 Oct 2017",
          "10 Oct 2017",
          "11 Oct 2017",
          "12 Oct 2017",
          "13 Oct 2017",
          "16 Oct 2017",
          "17 Oct 2017",
          "18 Oct 2017",
          "19 Oct 2017",
          "23 Oct 2017",
          "24 Oct 2017",
          "25 Oct 2017",
          "26 Oct 2017",
          "27 Oct 2017",
          "30 Oct 2017",
          "31 Oct 2017",
          "01 Nov 2017",
          "02 Nov 2017",
          "03 Nov 2017",
          "06 Nov 2017",
          "07 Nov 2017",
          "08 Nov 2017",
          "09 Nov 2017",
          "10 Nov 2017",
          "13 Nov 2017",
          "14 Nov 2017",
          "15 Nov 2017",
          "16 Nov 2017",
          "17 Nov 2017",
          "20 Nov 2017",
          "21 Nov 2017",
          "22 Nov 2017",
          "23 Nov 2017",
          "24 Nov 2017",
          "27 Nov 2017",
          "28 Nov 2017",
        ],
      },
    };
    function generateData(count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = "w" + (i + 1).toString();
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push({
          x: x,
          y: y,
        });
        i++;
      }
      return series;
    }
    // const random = (count, min, max) => {
    //   var i = 0;
    //   var series = [];
    //   while (i < count) {
    //     var y = Math.floor(Math.random() * (max - min + 1)) + min;

    //     series.push(y);
    //     i++;
    //   }
    //   return series;
    // };
    function generateDayWiseTimeSeries(baseval, count, yrange) {
      var i = 0;
      var series = [];
      while (i < count) {
        var x = baseval;
        var y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;

        series.push([x, y]);
        baseval += 86400000;
        i++;
      }
      return series;
    }

    const data = [
      {
        type: "line",
        series: [
          {
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          responsive: [
            {
              breakpoint: 400,
              options: {
                colors: ["rgba(255, 69, 96, 0.85)"],
              },
            },
          ],
          chart: {
            height: 350,
            type: "line",
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "Product Trends by Month",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: isDarkTest.value ? 0.2 : 0.5,
            },
          },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
            ],
          },
        },
      },
      {
        type: "line",
        series: [
          {
            name: "High - 2013",
            data: [28, 29, 33, 36, 32, 32, 33],
          },
          {
            name: "Low - 2013",
            data: [12, 11, 14, 18, 17, 13, 13],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            // background: isDarkTest.value ? "rgb(30 41 59)" : "", ошибки
            height: 350,
            type: "line",
            dropShadow: {
              enabled: true,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
          },
          colors: ["#77B6EA", "#545454"],
          dataLabels: {
            enabled: true,
          },
          stroke: {
            curve: "smooth",
          },
          title: {
            text: "Average High & Low Temperature",
            align: "left",
          },
          grid: {
            borderColor: "#e7e7e7",
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          markers: {
            size: 1,
          },
          xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
            title: {
              text: "Month",
            },
          },
          yaxis: {
            title: {
              text: "Temperature",
            },
            min: 5,
            max: 40,
          },
          legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
          },
        },
      },
      {
        type: "area",
        series: [
          {
            name: "XYZ MOTORS",
            data: dates,
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "area",
            stacked: false,
            height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
            },
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
          },
          title: {
            text: "Stock Price Movement",
            align: "left",
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
          yaxis: {
            labels: {
              formatter: function (val) {
                return (val / 1000000).toFixed(0);
              },
            },
            title: {
              text: "Price",
            },
          },
          xaxis: {
            type: "datetime",
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return (val / 1000000).toFixed(0);
              },
            },
          },
        },
      },
      {
        type: "line",
        series: [
          {
            data: [34, 44, 54, 21, 12, 43, 33, 23, 66, 66, 58],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "line",
            height: 350,
          },
          stroke: {
            curve: "stepline",
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: "Stepline Chart",
            align: "left",
          },
          markers: {
            hover: {
              sizeOffset: 4,
            },
          },
        },
      },
      {
        type: "line",
        series: [
          {
            name: "Sales",
            data: [
              4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5,
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "line",
          },
          forecastDataPoints: {
            count: 7,
          },
          stroke: {
            width: 5,
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: [
              "1/11/2000",
              "2/11/2000",
              "3/11/2000",
              "4/11/2000",
              "5/11/2000",
              "6/11/2000",
              "7/11/2000",
              "8/11/2000",
              "9/11/2000",
              "10/11/2000",
              "11/11/2000",
              "12/11/2000",
              "1/11/2001",
              "2/11/2001",
              "3/11/2001",
              "4/11/2001",
              "5/11/2001",
              "6/11/2001",
            ],
            tickAmount: 10,
            labels: {
              formatter: function (value, timestamp, opts) {
                return opts.dateFormatter(new Date(timestamp), "dd MMM");
              },
            },
          },
          title: {
            text: "Forecast",
            align: "left",
            style: {
              fontSize: "16px",
              color: "#666",
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              gradientToColors: ["#FDD835"],
              shadeIntensity: 1,
              type: "horizontal",
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100, 100, 100],
            },
          },
          yaxis: {
            min: -10,
            max: 40,
          },
        },
      },
      {
        type: "area",
        series: [
          {
            name: "STOCK ABC",
            data: series.monthDataSeries1.prices,
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "area",
            height: 350,
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },

          title: {
            text: "Fundamental Analysis of Stocks",
            align: "left",
          },
          subtitle: {
            text: "Price Movements",
            align: "left",
          },
          labels: series.monthDataSeries1.dates,
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            opposite: true,
          },
          legend: {
            horizontalAlign: "left",
          },
        },
      },
      {
        type: "area",
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: "series2",
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
        },
      },
      {
        type: "area",
        series: [
          {
            name: "north",
            data: [
              {
                x: 1996,
                y: 322,
              },
              {
                x: 1997,
                y: 324,
              },
              {
                x: 1998,
                y: 329,
              },
              {
                x: 1999,
                y: 342,
              },
              {
                x: 2000,
                y: 348,
              },
              {
                x: 2001,
                y: 334,
              },
              {
                x: 2002,
                y: 325,
              },
              {
                x: 2003,
                y: 316,
              },
              {
                x: 2004,
                y: 318,
              },
              {
                x: 2005,
                y: 330,
              },
              {
                x: 2006,
                y: 355,
              },
              {
                x: 2007,
                y: 366,
              },
              {
                x: 2008,
                y: 337,
              },
              {
                x: 2009,
                y: 352,
              },
              {
                x: 2010,
                y: 377,
              },
              {
                x: 2011,
                y: 383,
              },
              {
                x: 2012,
                y: 344,
              },
              {
                x: 2013,
                y: 366,
              },
              {
                x: 2014,
                y: 389,
              },
              {
                x: 2015,
                y: 334,
              },
            ],
          },
          {
            name: "south",
            data: [
              {
                x: 1996,
                y: 162,
              },
              {
                x: 1997,
                y: 90,
              },
              {
                x: 1998,
                y: 50,
              },
              {
                x: 1999,
                y: 77,
              },
              {
                x: 2000,
                y: 35,
              },
              {
                x: 2001,
                y: -45,
              },
              {
                x: 2002,
                y: -88,
              },
              {
                x: 2003,
                y: -120,
              },
              {
                x: 2004,
                y: -156,
              },
              {
                x: 2005,
                y: -123,
              },
              {
                x: 2006,
                y: -88,
              },
              {
                x: 2007,
                y: -66,
              },
              {
                x: 2008,
                y: -45,
              },
              {
                x: 2009,
                y: -29,
              },
              {
                x: 2010,
                y: -45,
              },
              {
                x: 2011,
                y: -88,
              },
              {
                x: 2012,
                y: -132,
              },
              {
                x: 2013,
                y: -146,
              },
              {
                x: 2014,
                y: -169,
              },
              {
                x: 2015,
                y: -184,
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "area",
            height: 350,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "straight",
          },

          title: {
            text: "Area with Negative Values",
            align: "left",
            style: {
              fontSize: "14px",
            },
          },
          xaxis: {
            type: "datetime",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            tickAmount: 4,
            floating: false,

            labels: {
              style: {
                colors: "#8e8da4",
              },
              offsetY: -7,
              offsetX: 0,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          fill: {
            opacity: 0.5,
          },
          tooltip: {
            x: {
              format: "yyyy",
            },
            fixed: {
              enabled: false,
              position: "topRight",
            },
          },
          grid: {
            yaxis: {
              lines: {
                offsetX: -30,
              },
            },
            padding: {
              left: 20,
            },
          },
        },
      },
      {
        type: "area",
        series: [
          {
            name: "South",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 60,
              }
            ),
          },
          {
            name: "North",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 20,
              }
            ),
          },
          {
            name: "Central",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 15,
              }
            ),
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "area",
            height: 350,
            stacked: true,
            events: {
              selection: function (chart, e) {
                console.log(new Date(e.xaxis.min));
              },
            },
          },
          colors: ["#008FFB", "#00E396", "#CED4DC"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.8,
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
          },
          xaxis: {
            type: "datetime",
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Net Profit",
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
          {
            name: "Revenue",
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          },
          {
            name: "Free Cash Flow",
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: [
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
            ],
          },
          yaxis: {
            title: {
              text: "$ (thousands)",
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return "$ " + val + " thousands";
              },
            },
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Inflation",
            data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top", // top, center, bottom
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val + "%";
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },

          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            position: "top",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          yaxis: {
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
          title: {
            text: "Monthly Inflation in Argentina, 2002",
            floating: true,
            offsetY: 330,
            align: "center",
            style: {
              color: "#444",
            },
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Actual",
            data: [
              {
                x: "2011",
                y: 1292,
                goals: [
                  {
                    name: "Expected",
                    value: 1400,
                    strokeHeight: 5,
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2012",
                y: 4432,
                goals: [
                  {
                    name: "Expected",
                    value: 5400,
                    strokeHeight: 5,
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2013",
                y: 5423,
                goals: [
                  {
                    name: "Expected",
                    value: 5200,
                    strokeHeight: 5,
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2014",
                y: 6653,
                goals: [
                  {
                    name: "Expected",
                    value: 6500,
                    strokeHeight: 5,
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2015",
                y: 8133,
                goals: [
                  {
                    name: "Expected",
                    value: 6600,
                    strokeHeight: 13,
                    strokeWidth: 0,
                    strokeLineCap: "round",
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2016",
                y: 7132,
                goals: [
                  {
                    name: "Expected",
                    value: 7500,
                    strokeHeight: 5,
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2017",
                y: 7332,
                goals: [
                  {
                    name: "Expected",
                    value: 8700,
                    strokeHeight: 5,
                    strokeColor: "#775DD0",
                  },
                ],
              },
              {
                x: "2018",
                y: 6553,
                goals: [
                  {
                    name: "Expected",
                    value: 7300,
                    strokeHeight: 2,
                    strokeDashArray: 2,
                    strokeColor: "#775DD0",
                  },
                ],
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "bar",
          },
          plotOptions: {
            bar: {
              columnWidth: "60%",
            },
          },
          colors: ["#00E396"],
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ["Actual", "Expected"],
            markers: {
              fillColors: ["#00E396", "#775DD0"],
            },
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Cash Flow",
            data: [
              1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09,
              0.34, 3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8,
              -27.03, -54.4, -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6,
              -29.4, -21.4, -2.4,
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              colors: {
                ranges: [
                  {
                    from: -100,
                    to: -46,
                    color: "#F15B46",
                  },
                  {
                    from: -45,
                    to: 0,
                    color: "#FEB019",
                  },
                ],
              },
              columnWidth: "80%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          yaxis: {
            title: {
              text: "Growth",
            },
            labels: {
              formatter: function (y) {
                return y.toFixed(0) + "%";
              },
            },
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2011-01-01",
              "2011-02-01",
              "2011-03-01",
              "2011-04-01",
              "2011-05-01",
              "2011-06-01",
              "2011-07-01",
              "2011-08-01",
              "2011-09-01",
              "2011-10-01",
              "2011-11-01",
              "2011-12-01",
              "2012-01-01",
              "2012-02-01",
              "2012-03-01",
              "2012-04-01",
              "2012-05-01",
              "2012-06-01",
              "2012-07-01",
              "2012-08-01",
              "2012-09-01",
              "2012-10-01",
              "2012-11-01",
              "2012-12-01",
              "2013-01-01",
              "2013-02-01",
              "2013-03-01",
              "2013-04-01",
              "2013-05-01",
              "2013-06-01",
              "2013-07-01",
              "2013-08-01",
              "2013-09-01",
            ],
            labels: {
              rotate: -90,
            },
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: [
              "South Korea",
              "Canada",
              "United Kingdom",
              "Netherlands",
              "Italy",
              "France",
              "Japan",
              "United States",
              "China",
              "Germany",
            ],
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            data: [44, 55, 41, 64, 22, 43, 21],
          },
          {
            data: [53, 32, 33, 52, 13, 44, 32],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 430,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: "12px",
              colors: ["#fff"],
            },
          },
          stroke: {
            show: true,
            width: 1,
            colors: ["#fff"],
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          xaxis: {
            categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21],
          },
          {
            name: "Striking Calf",
            data: [53, 32, 33, 52, 13, 43, 32],
          },
          {
            name: "Tank Picture",
            data: [12, 17, 11, 9, 15, 11, 20],
          },
          {
            name: "Bucket Slope",
            data: [9, 7, 5, 8, 6, 9, 4],
          },
          {
            name: "Reborn Kid",
            data: [25, 12, 19, 32, 25, 24, 10],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 350,
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                total: {
                  enabled: true,
                  offsetX: 0,
                  style: {
                    fontSize: "13px",
                    fontWeight: 900,
                  },
                },
              },
            },
          },
          stroke: {
            width: 1,
            colors: ["#fff"],
          },
          title: {
            text: "Fiction Books Sales",
          },
          xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
            labels: {
              formatter: function (val) {
                return val + "K";
              },
            },
          },
          yaxis: {
            title: {
              text: undefined,
            },
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "K";
              },
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40,
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Marine Sprite",
            data: [44, 55, 41, 37, 22, 43, 21],
          },
          {
            name: "Striking Calf",
            data: [53, 32, 33, 52, 13, 43, 32],
          },
          {
            name: "Tank Picture",
            data: [12, 17, 11, 9, 15, 11, 20],
          },
          {
            name: "Bucket Slope",
            data: [9, 7, 5, 8, 6, 9, 4],
          },
          {
            name: "Reborn Kid",
            data: [25, 12, 19, 32, 25, 24, 10],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 350,
            stacked: true,
            stackType: "100%",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          stroke: {
            width: 1,
            colors: ["#fff"],
          },
          title: {
            text: "100% Stacked Bar",
          },
          xaxis: {
            categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + "K";
              },
            },
          },
          fill: {
            opacity: 1,
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
            offsetX: 40,
          },
        },
      },
      {
        type: "bar",
        series: [
          {
            name: "Males",
            data: [
              0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1,
              4.2, 4.5, 3.9, 3.5, 3,
            ],
          },
          {
            name: "Females",
            data: [
              -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22,
              -4.3, -4.4, -4.1, -4, -4.1, -3.4, -3.1, -2.8,
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "bar",
            height: 440,
            stacked: true,
          },
          colors: ["#008FFB", "#FF4560"],
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "80%",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 1,
            colors: ["#fff"],
          },

          grid: {
            xaxis: {
              lines: {
                show: false,
              },
            },
          },
          yaxis: {
            min: -5,
            max: 5,
            title: {
              // text: 'Age',
            },
          },
          tooltip: {
            shared: false,
            x: {
              formatter: function (val) {
                return val;
              },
            },
            y: {
              formatter: function (val) {
                return Math.abs(val) + "%";
              },
            },
          },
          title: {
            text: "Mauritius population pyramid 2011",
          },
          xaxis: {
            categories: [
              "85+",
              "80-84",
              "75-79",
              "70-74",
              "65-69",
              "60-64",
              "55-59",
              "50-54",
              "45-49",
              "40-44",
              "35-39",
              "30-34",
              "25-29",
              "20-24",
              "15-19",
              "10-14",
              "5-9",
              "0-4",
            ],
            title: {
              text: "Percent",
            },
            labels: {
              formatter: function (val) {
                return Math.abs(Math.round(val)) + "%";
              },
            },
          },
        },
      },
      {
        type: "line",
        series: [
          {
            name: "Website Blog",
            type: "column",
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
          },
          {
            name: "Social Media",
            type: "line",
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            // background: isDarkTest.value ? "rgb(30 41 59)" : "", ошибки
            height: 350,
            type: "line",
          },
          stroke: {
            width: [0, 4],
          },
          title: {
            text: "Traffic Sources",
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
          },
          labels: [
            "01 Jan 2001",
            "02 Jan 2001",
            "03 Jan 2001",
            "04 Jan 2001",
            "05 Jan 2001",
            "06 Jan 2001",
            "07 Jan 2001",
            "08 Jan 2001",
            "09 Jan 2001",
            "10 Jan 2001",
            "11 Jan 2001",
            "12 Jan 2001",
          ],
          xaxis: {
            type: "datetime",
          },
          yaxis: [
            {
              title: {
                text: "Website Blog",
              },
            },
            {
              opposite: true,
              title: {
                text: "Social Media",
              },
            },
          ],
        },
      },
      {
        type: "line",
        series: [
          {
            name: "Income",
            type: "column",
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
          },
          {
            name: "Cashflow",
            type: "column",
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
          },
          {
            name: "Revenue",
            type: "line",
            data: [20, 29, 37, 36, 44, 45, 50, 58],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "line",
            stacked: false,
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: [1, 1, 4],
          },
          title: {
            text: "XYZ - Stock Analysis (2009 - 2016)",
            align: "left",
            offsetX: 110,
          },
          xaxis: {
            categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
          },
          yaxis: [
            {
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#008FFB",
              },
              labels: {
                style: {
                  colors: "#008FFB",
                },
              },
              title: {
                text: "Income (thousand crores)",
                style: {
                  color: "#008FFB",
                },
              },
              tooltip: {
                enabled: true,
              },
            },
            {
              seriesName: "Income",
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#00E396",
              },
              labels: {
                style: {
                  colors: "#00E396",
                },
              },
              title: {
                text: "Operating Cashflow (thousand crores)",
                style: {
                  color: "#00E396",
                },
              },
            },
            {
              seriesName: "Revenue",
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: "#FEB019",
              },
              labels: {
                style: {
                  colors: "#FEB019",
                },
              },
              title: {
                text: "Revenue (thousand crores)",
                style: {
                  color: "#FEB019",
                },
              },
            },
          ],
          tooltip: {
            fixed: {
              enabled: true,
              position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60,
            },
          },
          legend: {
            horizontalAlign: "left",
            offsetX: 40,
          },
        },
      },
      {
        type: "line",
        series: [
          {
            name: "TEAM A",
            type: "column",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
          {
            name: "TEAM B",
            type: "area",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          },
          {
            name: "TEAM C",
            type: "line",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "line",
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: "smooth",
          },
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },

          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: "light",
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100],
            },
          },
          labels: [
            "01/01/2003",
            "02/01/2003",
            "03/01/2003",
            "04/01/2003",
            "05/01/2003",
            "06/01/2003",
            "07/01/2003",
            "08/01/2003",
            "09/01/2003",
            "10/01/2003",
            "11/01/2003",
          ],
          markers: {
            size: 0,
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            title: {
              text: "Points",
            },
            min: 0,
          },
          tooltip: {
            shared: true,
            intersect: false,
            y: {
              formatter: function (y) {
                if (typeof y !== "undefined") {
                  return y.toFixed(0) + " points";
                }
                return y;
              },
            },
          },
        },
      },
      {
        type: "line",
        series: [
          {
            name: "Points",
            type: "scatter",

            //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
            data: [
              {
                x: 1,
                y: 2.14,
              },
              {
                x: 1.2,
                y: 2.19,
              },
              {
                x: 1.8,
                y: 2.43,
              },
              {
                x: 2.3,
                y: 3.8,
              },
              {
                x: 2.6,
                y: 4.14,
              },
              {
                x: 2.9,
                y: 5.4,
              },
              {
                x: 3.2,
                y: 5.8,
              },
              {
                x: 3.8,
                y: 6.04,
              },
              {
                x: 4.55,
                y: 6.77,
              },
              {
                x: 4.9,
                y: 8.1,
              },
              {
                x: 5.1,
                y: 9.4,
              },
              {
                x: 7.1,
                y: 7.14,
              },
              {
                x: 9.18,
                y: 8.4,
              },
            ],
          },
          {
            name: "Line",
            type: "line",
            data: [
              {
                x: 1,
                y: 2,
              },
              {
                x: 2,
                y: 3,
              },
              {
                x: 3,
                y: 4,
              },
              {
                x: 4,
                y: 5,
              },
              {
                x: 5,
                y: 6,
              },
              {
                x: 6,
                y: 7,
              },
              {
                x: 7,
                y: 8,
              },
              {
                x: 8,
                y: 9,
              },
              {
                x: 9,
                y: 10,
              },
              {
                x: 10,
                y: 11,
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "line",
          },
          fill: {
            type: "solid",
          },
          markers: {
            size: [6, 0],
          },
          tooltip: {
            shared: false,
            intersect: true,
          },
          legend: {
            show: false,
          },
          xaxis: {
            type: "numeric",
            min: 0,
            max: 12,
            tickAmount: 12,
          },
        },
      },
      {
        type: "rangeArea",
        series: [
          {
            type: "rangeArea",
            name: "Team B Range",

            data: [
              {
                x: "Jan",
                y: [1100, 1900],
              },
              {
                x: "Feb",
                y: [1200, 1800],
              },
              {
                x: "Mar",
                y: [900, 2900],
              },
              {
                x: "Apr",
                y: [1400, 2700],
              },
              {
                x: "May",
                y: [2600, 3900],
              },
              {
                x: "Jun",
                y: [500, 1700],
              },
              {
                x: "Jul",
                y: [1900, 2300],
              },
              {
                x: "Aug",
                y: [1000, 1500],
              },
            ],
          },

          {
            type: "rangeArea",
            name: "Team A Range",
            data: [
              {
                x: "Jan",
                y: [3100, 3400],
              },
              {
                x: "Feb",
                y: [4200, 5200],
              },
              {
                x: "Mar",
                y: [3900, 4900],
              },
              {
                x: "Apr",
                y: [3400, 3900],
              },
              {
                x: "May",
                y: [5100, 5900],
              },
              {
                x: "Jun",
                y: [5400, 6700],
              },
              {
                x: "Jul",
                y: [4300, 4600],
              },
              {
                x: "Aug",
                y: [2100, 2900],
              },
            ],
          },

          {
            type: "line",
            name: "Team B Median",
            data: [
              {
                x: "Jan",
                y: 1500,
              },
              {
                x: "Feb",
                y: 1700,
              },
              {
                x: "Mar",
                y: 1900,
              },
              {
                x: "Apr",
                y: 2200,
              },
              {
                x: "May",
                y: 3000,
              },
              {
                x: "Jun",
                y: 1000,
              },
              {
                x: "Jul",
                y: 2100,
              },
              {
                x: "Aug",
                y: 1200,
              },
              {
                x: "Sep",
                y: 1800,
              },
              {
                x: "Oct",
                y: 2000,
              },
            ],
          },
          {
            type: "line",
            name: "Team A Median",
            data: [
              {
                x: "Jan",
                y: 3300,
              },
              {
                x: "Feb",
                y: 4900,
              },
              {
                x: "Mar",
                y: 4300,
              },
              {
                x: "Apr",
                y: 3700,
              },
              {
                x: "May",
                y: 5500,
              },
              {
                x: "Jun",
                y: 5900,
              },
              {
                x: "Jul",
                y: 4500,
              },
              {
                x: "Aug",
                y: 2400,
              },
              {
                x: "Sep",
                y: 2100,
              },
              {
                x: "Oct",
                y: 1500,
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "rangeArea",
            animations: {
              speed: 500,
            },
          },
          colors: ["#d4526e", "#33b2df", "#d4526e", "#33b2df"],
          dataLabels: {
            enabled: false,
          },
          fill: {
            opacity: [0.24, 0.24, 1, 1],
          },
          forecastDataPoints: {
            count: 2,
          },
          stroke: {
            curve: "straight",
            width: [0, 0, 2, 2],
          },
          legend: {
            show: true,
            customLegendItems: ["Team B", "Team A"],
            inverseOrder: true,
          },
          title: {
            text: "Range Area with Forecast Line (Combo)",
          },
          markers: {
            hover: {
              sizeOffset: 5,
            },
          },
        },
      },
      {
        type: "rangeBar",
        series: [
          {
            data: [
              {
                x: "Code",
                y: [
                  new Date("2019-03-02").getTime(),
                  new Date("2019-03-04").getTime(),
                ],
              },
              {
                x: "Test",
                y: [
                  new Date("2019-03-04").getTime(),
                  new Date("2019-03-08").getTime(),
                ],
              },
              {
                x: "Validation",
                y: [
                  new Date("2019-03-08").getTime(),
                  new Date("2019-03-12").getTime(),
                ],
              },
              {
                x: "Deployment",
                y: [
                  new Date("2019-03-12").getTime(),
                  new Date("2019-03-18").getTime(),
                ],
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            type: "datetime",
          },
        },
      },
      {
        type: "rangeBar",
        series: [
          {
            data: [
              {
                x: "Analysis",
                y: [
                  new Date("2019-02-27").getTime(),
                  new Date("2019-03-04").getTime(),
                ],
                fillColor: "#008FFB",
              },
              {
                x: "Design",
                y: [
                  new Date("2019-03-04").getTime(),
                  new Date("2019-03-08").getTime(),
                ],
                fillColor: "#00E396",
              },
              {
                x: "Coding",
                y: [
                  new Date("2019-03-07").getTime(),
                  new Date("2019-03-10").getTime(),
                ],
                fillColor: "#775DD0",
              },
              {
                x: "Testing",
                y: [
                  new Date("2019-03-08").getTime(),
                  new Date("2019-03-12").getTime(),
                ],
                fillColor: "#FEB019",
              },
              {
                x: "Deployment",
                y: [
                  new Date("2019-03-12").getTime(),
                  new Date("2019-03-17").getTime(),
                ],
                fillColor: "#FF4560",
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              distributed: true,
              dataLabels: {
                hideOverflowingLabels: false,
              },
            },
          },
          dataLabels: {
            enabled: true,
            // formatter: function (val, opts) {
            //   var label = opts.w.globals.labels[opts.dataPointIndex];
            //   var a = moment(val[0]);
            //   var b = moment(val[1]);
            //   var diff = b.diff(a, "days");
            //   return label + ": " + diff + (diff > 1 ? " days" : " day");
            // },
            style: {
              colors: ["#f3f4f5", "#fff"],
            },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            show: false,
          },
          grid: {
            row: {
              colors: ["#f3f4f5", "#fff"],
              opacity: 1,
            },
          },
        },
      },
      {
        type: "rangeBar",
        series: [
          {
            name: "Bob",
            data: [
              {
                x: "Design",
                y: [
                  new Date("2019-03-05").getTime(),
                  new Date("2019-03-08").getTime(),
                ],
              },
              {
                x: "Code",
                y: [
                  new Date("2019-03-08").getTime(),
                  new Date("2019-03-11").getTime(),
                ],
              },
              {
                x: "Test",
                y: [
                  new Date("2019-03-11").getTime(),
                  new Date("2019-03-16").getTime(),
                ],
              },
            ],
          },
          {
            name: "Joe",
            data: [
              {
                x: "Design",
                y: [
                  new Date("2019-03-02").getTime(),
                  new Date("2019-03-05").getTime(),
                ],
              },
              {
                x: "Code",
                y: [
                  new Date("2019-03-06").getTime(),
                  new Date("2019-03-09").getTime(),
                ],
              },
              {
                x: "Test",
                y: [
                  new Date("2019-03-10").getTime(),
                  new Date("2019-03-19").getTime(),
                ],
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          dataLabels: {
            enabled: true,
            // formatter: function (val) {
            //   var a = moment(val[0]);
            //   var b = moment(val[1]);
            //   var diff = b.diff(a, "days");
            //   return diff + (diff > 1 ? " days" : " day");
            // },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "light",
              type: "vertical",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100],
            },
          },
          xaxis: {
            type: "datetime",
          },
          legend: {
            position: "top",
          },
        },
      },
      {
        type: "rangeBar",
        series: [
          // George Washington
          {
            name: "George Washington",
            data: [
              {
                x: "President",
                y: [
                  new Date(1789, 3, 30).getTime(),
                  new Date(1797, 2, 4).getTime(),
                ],
              },
            ],
          },
          // John Adams
          {
            name: "John Adams",
            data: [
              {
                x: "President",
                y: [
                  new Date(1797, 2, 4).getTime(),
                  new Date(1801, 2, 4).getTime(),
                ],
              },
              {
                x: "Vice President",
                y: [
                  new Date(1789, 3, 21).getTime(),
                  new Date(1797, 2, 4).getTime(),
                ],
              },
            ],
          },
          // Thomas Jefferson
          {
            name: "Thomas Jefferson",
            data: [
              {
                x: "President",
                y: [
                  new Date(1801, 2, 4).getTime(),
                  new Date(1809, 2, 4).getTime(),
                ],
              },
              {
                x: "Vice President",
                y: [
                  new Date(1797, 2, 4).getTime(),
                  new Date(1801, 2, 4).getTime(),
                ],
              },
              {
                x: "Secretary of State",
                y: [
                  new Date(1790, 2, 22).getTime(),
                  new Date(1793, 11, 31).getTime(),
                ],
              },
            ],
          },
          // Aaron Burr
          {
            name: "Aaron Burr",
            data: [
              {
                x: "Vice President",
                y: [
                  new Date(1801, 2, 4).getTime(),
                  new Date(1805, 2, 4).getTime(),
                ],
              },
            ],
          },
          // George Clinton
          {
            name: "George Clinton",
            data: [
              {
                x: "Vice President",
                y: [
                  new Date(1805, 2, 4).getTime(),
                  new Date(1812, 3, 20).getTime(),
                ],
              },
            ],
          },
          // John Jay
          {
            name: "John Jay",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1789, 8, 25).getTime(),
                  new Date(1790, 2, 22).getTime(),
                ],
              },
            ],
          },
          // Edmund Randolph
          {
            name: "Edmund Randolph",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1794, 0, 2).getTime(),
                  new Date(1795, 7, 20).getTime(),
                ],
              },
            ],
          },
          // Timothy Pickering
          {
            name: "Timothy Pickering",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1795, 7, 20).getTime(),
                  new Date(1800, 4, 12).getTime(),
                ],
              },
            ],
          },
          // Charles Lee
          {
            name: "Charles Lee",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1800, 4, 13).getTime(),
                  new Date(1800, 5, 5).getTime(),
                ],
              },
            ],
          },
          // John Marshall
          {
            name: "John Marshall",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1800, 5, 13).getTime(),
                  new Date(1801, 2, 4).getTime(),
                ],
              },
            ],
          },
          // Levi Lincoln
          {
            name: "Levi Lincoln",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1801, 2, 5).getTime(),
                  new Date(1801, 4, 1).getTime(),
                ],
              },
            ],
          },
          // James Madison
          {
            name: "James Madison",
            data: [
              {
                x: "Secretary of State",
                y: [
                  new Date(1801, 4, 2).getTime(),
                  new Date(1809, 2, 3).getTime(),
                ],
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "50%",
              rangeBarGroupRows: true,
            },
          },
          colors: [
            "#008FFB",
            "#00E396",
            "#FEB019",
            "#FF4560",
            "#775DD0",
            "#3F51B5",
            "#546E7A",
            "#D4526E",
            "#8D5B4C",
            "#F86624",
            "#D7263D",
            "#1B998B",
            "#2E294E",
            "#F46036",
            "#E2C044",
          ],
          fill: {
            type: "solid",
          },
          xaxis: {
            type: "datetime",
          },
          legend: {
            position: "right",
          },
          // tooltip: {
          //   custom: function (opts) {
          //     const fromYear = new Date(opts.y1).getFullYear();
          //     const toYear = new Date(opts.y2).getFullYear();
          //     const values = opts.ctx.rangeBar.getTooltipValues(opts);

          //     return "";
          //   },
          // },
        },
      },
      {
        type: "candlestick",
        series: [
          {
            data: [
              {
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33],
              },
              {
                x: new Date(1538780400000),
                y: [6632.01, 6643.59, 6620, 6630.11],
              },
              {
                x: new Date(1538782200000),
                y: [6630.71, 6648.95, 6623.34, 6635.65],
              },
              {
                x: new Date(1538784000000),
                y: [6635.65, 6651, 6629.67, 6638.24],
              },
              {
                x: new Date(1538785800000),
                y: [6638.24, 6640, 6620, 6624.47],
              },
              {
                x: new Date(1538787600000),
                y: [6624.53, 6636.03, 6621.68, 6624.31],
              },
              {
                x: new Date(1538789400000),
                y: [6624.61, 6632.2, 6617, 6626.02],
              },
              {
                x: new Date(1538791200000),
                y: [6627, 6627.62, 6584.22, 6603.02],
              },
              {
                x: new Date(1538793000000),
                y: [6605, 6608.03, 6598.95, 6604.01],
              },
              {
                x: new Date(1538794800000),
                y: [6604.5, 6614.4, 6602.26, 6608.02],
              },
              {
                x: new Date(1538796600000),
                y: [6608.02, 6610.68, 6601.99, 6608.91],
              },
              {
                x: new Date(1538798400000),
                y: [6608.91, 6618.99, 6608.01, 6612],
              },
              {
                x: new Date(1538800200000),
                y: [6612, 6615.13, 6605.09, 6612],
              },
              {
                x: new Date(1538802000000),
                y: [6612, 6624.12, 6608.43, 6622.95],
              },
              {
                x: new Date(1538803800000),
                y: [6623.91, 6623.91, 6615, 6615.67],
              },
              {
                x: new Date(1538805600000),
                y: [6618.69, 6618.74, 6610, 6610.4],
              },
              {
                x: new Date(1538807400000),
                y: [6611, 6622.78, 6610.4, 6614.9],
              },
              {
                x: new Date(1538809200000),
                y: [6614.9, 6626.2, 6613.33, 6623.45],
              },
              {
                x: new Date(1538811000000),
                y: [6623.48, 6627, 6618.38, 6620.35],
              },
              {
                x: new Date(1538812800000),
                y: [6619.43, 6620.35, 6610.05, 6615.53],
              },
              {
                x: new Date(1538814600000),
                y: [6615.53, 6617.93, 6610, 6615.19],
              },
              {
                x: new Date(1538816400000),
                y: [6615.19, 6621.6, 6608.2, 6620],
              },
              {
                x: new Date(1538818200000),
                y: [6619.54, 6625.17, 6614.15, 6620],
              },
              {
                x: new Date(1538820000000),
                y: [6620.33, 6634.15, 6617.24, 6624.61],
              },
              {
                x: new Date(1538821800000),
                y: [6625.95, 6626, 6611.66, 6617.58],
              },
              {
                x: new Date(1538823600000),
                y: [6619, 6625.97, 6595.27, 6598.86],
              },
              {
                x: new Date(1538825400000),
                y: [6598.86, 6598.88, 6570, 6587.16],
              },
              {
                x: new Date(1538827200000),
                y: [6588.86, 6600, 6580, 6593.4],
              },
              {
                x: new Date(1538829000000),
                y: [6593.99, 6598.89, 6585, 6587.81],
              },
              {
                x: new Date(1538830800000),
                y: [6587.81, 6592.73, 6567.14, 6578],
              },
              {
                x: new Date(1538832600000),
                y: [6578.35, 6581.72, 6567.39, 6579],
              },
              {
                x: new Date(1538834400000),
                y: [6579.38, 6580.92, 6566.77, 6575.96],
              },
              {
                x: new Date(1538836200000),
                y: [6575.96, 6589, 6571.77, 6588.92],
              },
              {
                x: new Date(1538838000000),
                y: [6588.92, 6594, 6577.55, 6589.22],
              },
              {
                x: new Date(1538839800000),
                y: [6589.3, 6598.89, 6589.1, 6596.08],
              },
              {
                x: new Date(1538841600000),
                y: [6597.5, 6600, 6588.39, 6596.25],
              },
              {
                x: new Date(1538843400000),
                y: [6598.03, 6600, 6588.73, 6595.97],
              },
              {
                x: new Date(1538845200000),
                y: [6595.97, 6602.01, 6588.17, 6602],
              },
              {
                x: new Date(1538847000000),
                y: [6602, 6607, 6596.51, 6599.95],
              },
              {
                x: new Date(1538848800000),
                y: [6600.63, 6601.21, 6590.39, 6591.02],
              },
              {
                x: new Date(1538850600000),
                y: [6591.02, 6603.08, 6591, 6591],
              },
              {
                x: new Date(1538852400000),
                y: [6591, 6601.32, 6585, 6592],
              },
              {
                x: new Date(1538854200000),
                y: [6593.13, 6596.01, 6590, 6593.34],
              },
              {
                x: new Date(1538856000000),
                y: [6593.34, 6604.76, 6582.63, 6593.86],
              },
              {
                x: new Date(1538857800000),
                y: [6593.86, 6604.28, 6586.57, 6600.01],
              },
              {
                x: new Date(1538859600000),
                y: [6601.81, 6603.21, 6592.78, 6596.25],
              },
              {
                x: new Date(1538861400000),
                y: [6596.25, 6604.2, 6590, 6602.99],
              },
              {
                x: new Date(1538863200000),
                y: [6602.99, 6606, 6584.99, 6587.81],
              },
              {
                x: new Date(1538865000000),
                y: [6587.81, 6595, 6583.27, 6591.96],
              },
              {
                x: new Date(1538866800000),
                y: [6591.97, 6596.07, 6585, 6588.39],
              },
              {
                x: new Date(1538868600000),
                y: [6587.6, 6598.21, 6587.6, 6594.27],
              },
              {
                x: new Date(1538870400000),
                y: [6596.44, 6601, 6590, 6596.55],
              },
              {
                x: new Date(1538872200000),
                y: [6598.91, 6605, 6596.61, 6600.02],
              },
              {
                x: new Date(1538874000000),
                y: [6600.55, 6605, 6589.14, 6593.01],
              },
              {
                x: new Date(1538875800000),
                y: [6593.15, 6605, 6592, 6603.06],
              },
              {
                x: new Date(1538877600000),
                y: [6603.07, 6604.5, 6599.09, 6603.89],
              },
              {
                x: new Date(1538879400000),
                y: [6604.44, 6604.44, 6600, 6603.5],
              },
              {
                x: new Date(1538881200000),
                y: [6603.5, 6603.99, 6597.5, 6603.86],
              },
              {
                x: new Date(1538883000000),
                y: [6603.85, 6605, 6600, 6604.07],
              },
              {
                x: new Date(1538884800000),
                y: [6604.98, 6606, 6604.07, 6606],
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "candlestick",
            height: 350,
          },
          title: {
            text: "CandleStick Chart",
            align: "left",
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            tooltip: {
              enabled: true,
            },
          },
        },
      },
      {
        type: "pie",
        series: [44, 55, 13, 43, 22],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            width: 380,
            type: "pie",
          },
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      {
        type: "donut",
        series: [44, 55, 41, 17, 15],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "donut",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      {
        type: "pie",
        series: [25, 15, 44, 55, 41, 17],
        chartOptions: {
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            width: "100%",
            type: "pie",
          },
          labels: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
            monochrome: {
              enabled: true,
            },
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: -5,
              },
            },
          },
          title: {
            text: "Monochrome Pie",
          },
          dataLabels: {
            formatter(val, opts) {
              const name = opts.w.globals.labels[opts.seriesIndex];
              return [name, val.toFixed(1) + "%"];
            },
          },
          legend: {
            show: false,
          },
        },
      },
      {
        type: "donut",
        series: [44, 55, 41, 17, 15],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            width: 380,
            type: "donut",
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
            },
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: "gradient",
          },
          legend: {
            formatter: function (val, opts) {
              return val + " - " + opts.w.globals.series[opts.seriesIndex];
            },
          },
          title: {
            text: "Gradient Donut with custom Start-angle",
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      {
        type: "radar",
        series: [
          {
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "radar",
          },
          title: {
            text: "Basic Radar Chart",
          },
          xaxis: {
            categories: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
            ],
          },
        },
      },
      {
        type: "radar",
        series: [
          {
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20],
          },
          {
            name: "Series 2",
            data: [20, 30, 40, 80, 20, 80],
          },
          {
            name: "Series 3",
            data: [44, 76, 78, 13, 43, 10],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "radar",
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1,
            },
          },
          title: {
            text: "Radar Chart - Multi Series",
          },
          stroke: {
            width: 2,
          },
          fill: {
            opacity: 0.1,
          },
          markers: {
            size: 0,
          },
          xaxis: {
            categories: ["2011", "2012", "2013", "2014", "2015", "2016"],
          },
        },
      },
      {
        type: "polarArea",
        series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            type: "polarArea",
          },
          stroke: {
            colors: ["#fff"],
          },
          fill: {
            opacity: 0.8,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      },
      {
        type: "polarArea",
        series: [42, 47, 52, 58, 65],
        chartOptions: {
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            width: 380,
            type: "polarArea",
          },
          labels: ["Rose A", "Rose B", "Rose C", "Rose D", "Rose E"],
          fill: {
            opacity: 1,
          },
          stroke: {
            width: 1,
            colors: undefined,
          },
          yaxis: {
            show: false,
          },
          legend: {
            position: "bottom",
          },
          plotOptions: {
            polarArea: {
              rings: {
                strokeWidth: 0,
              },
              spokes: {
                strokeWidth: 0,
              },
            },
          },
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
            monochrome: {
              enabled: true,
              shadeTo: "light",
              shadeIntensity: 0.6,
            },
          },
        },
      },
      {
        type: "radialBar",
        series: [70],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "70%",
              },
            },
          },
          labels: ["Cricket"],
        },
      },
      {
        type: "radialBar",
        series: [44, 55, 67, 83],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function () {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return 249;
                  },
                },
              },
            },
          },
          labels: ["Apples", "Oranges", "Bananas", "Berries"],
        },
      },
      {
        type: "radialBar",
        series: [76, 67, 61, 90],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 390,
            type: "radialBar",
          },
          plotOptions: {
            radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                margin: 5,
                size: "30%",
                background: "transparent",
                image: undefined,
              },
              dataLabels: {
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
          labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
          legend: {
            show: true,
            floating: true,
            fontSize: "16px",
            position: "left",
            offsetX: 160,
            offsetY: 15,
            labels: {
              useSeriesColors: true,
            },
            markers: {
              size: 0,
            },
            formatter: function (seriesName, opts) {
              return (
                seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              );
            },
            itemMargin: {
              vertical: 3,
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: {
                  show: false,
                },
              },
            },
          ],
        },
      },
      {
        type: "bubble",
        series: [
          {
            name: "Bubble1",
            data: generateData(20, {
              min: 10,
              max: 60,
            }),
          },
          {
            name: "Bubble2",
            data: generateData(20, {
              min: 10,
              max: 60,
            }),
          },
          {
            name: "Bubble3",
            data: generateData(20, {
              min: 10,
              max: 60,
            }),
          },
          {
            name: "Bubble4",
            data: generateData(20, {
              min: 10,
              max: 60,
            }),
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "bubble",
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            opacity: 0.8,
          },
          title: {
            text: "Simple Bubble Chart",
          },
          xaxis: {
            tickAmount: 12,
            type: "category",
          },
          yaxis: {
            max: 70,
          },
        },
      },
      {
        type: "scatter",
        series: [
          {
            name: "SAMPLE A",
            data: [
              [16.4, 5.4],
              [21.7, 2],
              [25.4, 3],
              [19, 2],
              [10.9, 1],
              [13.6, 3.2],
              [10.9, 7.4],
              [10.9, 0],
              [10.9, 8.2],
              [16.4, 0],
              [16.4, 1.8],
              [13.6, 0.3],
              [13.6, 0],
              [29.9, 0],
              [27.1, 2.3],
              [16.4, 0],
              [13.6, 3.7],
              [10.9, 5.2],
              [16.4, 6.5],
              [10.9, 0],
              [24.5, 7.1],
              [10.9, 0],
              [8.1, 4.7],
              [19, 0],
              [21.7, 1.8],
              [27.1, 0],
              [24.5, 0],
              [27.1, 0],
              [29.9, 1.5],
              [27.1, 0.8],
              [22.1, 2],
            ],
          },
          {
            name: "SAMPLE B",
            data: [
              [36.4, 13.4],
              [1.7, 11],
              [5.4, 8],
              [9, 17],
              [1.9, 4],
              [3.6, 12.2],
              [1.9, 14.4],
              [1.9, 9],
              [1.9, 13.2],
              [1.4, 7],
              [6.4, 8.8],
              [3.6, 4.3],
              [1.6, 10],
              [9.9, 2],
              [7.1, 15],
              [1.4, 0],
              [3.6, 13.7],
              [1.9, 15.2],
              [6.4, 16.5],
              [0.9, 10],
              [4.5, 17.1],
              [10.9, 10],
              [0.1, 14.7],
              [9, 10],
              [12.7, 11.8],
              [2.1, 10],
              [2.5, 10],
              [27.1, 10],
              [2.9, 11.5],
              [7.1, 10.8],
              [2.1, 12],
            ],
          },
          {
            name: "SAMPLE C",
            data: [
              [21.7, 3],
              [23.6, 3.5],
              [24.6, 3],
              [29.9, 3],
              [21.7, 20],
              [23, 2],
              [10.9, 3],
              [28, 4],
              [27.1, 0.3],
              [16.4, 4],
              [13.6, 0],
              [19, 5],
              [22.4, 3],
              [24.5, 3],
              [32.6, 3],
              [27.1, 4],
              [29.6, 6],
              [31.6, 8],
              [21.6, 5],
              [20.9, 4],
              [22.4, 0],
              [32.6, 10.3],
              [29.7, 20.8],
              [24.5, 0.8],
              [21.4, 0],
              [21.7, 6.9],
              [28.6, 7.7],
              [15.4, 0],
              [18.1, 0],
              [33.4, 0],
              [16.4, 0],
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "scatter",
            zoom: {
              enabled: true,
              type: "xy",
            },
          },
          xaxis: {
            tickAmount: 10,
            labels: {
              formatter: function (val) {
                return parseFloat(val).toFixed(1);
              },
            },
          },
          yaxis: {
            tickAmount: 7,
          },
        },
      },
      {
        type: "scatter",
        series: [
          {
            name: "TEAM 1",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 60,
              }
            ),
          },
          {
            name: "TEAM 2",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              20,
              {
                min: 10,
                max: 60,
              }
            ),
          },
          {
            name: "TEAM 3",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              30,
              {
                min: 10,
                max: 60,
              }
            ),
          },
          {
            name: "TEAM 4",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              10,
              {
                min: 10,
                max: 60,
              }
            ),
          },
          {
            name: "TEAM 5",
            data: generateDayWiseTimeSeries(
              new Date("11 Feb 2017 GMT").getTime(),
              30,
              {
                min: 10,
                max: 60,
              }
            ),
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "scatter",
            zoom: {
              type: "xy",
            },
          },
          dataLabels: {
            enabled: false,
          },
          grid: {
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            max: 70,
          },
        },
      },
      {
        type: "heatmap",
        series: [
          {
            name: "Metric1",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric2",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric3",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric4",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric5",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric6",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric7",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric8",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric9",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "heatmap",
          },
          dataLabels: {
            enabled: false,
          },
          colors: ["#008FFB"],
          title: {
            text: "HeatMap Chart (Single color)",
          },
        },
      },
      {
        type: "heatmap",
        series: [
          {
            name: "Metric1",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric2",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric3",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric4",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric5",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric6",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric7",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric8",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
          {
            name: "Metric9",
            data: generateData(18, {
              min: 0,
              max: 90,
            }),
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "heatmap",
          },
          dataLabels: {
            enabled: false,
          },
          plotOptions: {
            heatmap: {
              colorScale: {
                inverse: true,
              },
            },
          },
          colors: [
            "#F3B415",
            "#F27036",
            "#663F59",
            "#6A6E94",
            "#4E88B4",
            "#00A7C6",
            "#18D8D8",
            "#A9D794",
            "#46AF78",
            "#A93F55",
            "#8C5E58",
            "#2176FF",
            "#33A1FD",
            "#7A918D",
            "#BAFF29",
          ],
          xaxis: {
            type: "category",
            categories: [
              "W1",
              "W2",
              "W3",
              "W4",
              "W5",
              "W6",
              "W7",
              "W8",
              "W9",
              "W10",
              "W11",
              "W12",
              "W13",
              "W14",
              "W15",
            ],
          },
          title: {
            text: "Color Scales flipped Vertically",
          },
        },
      },
      {
        type: "treemap",
        series: [
          {
            data: [
              {
                x: "New Delhi",
                y: 218,
              },
              {
                x: "Kolkata",
                y: 149,
              },
              {
                x: "Mumbai",
                y: 184,
              },
              {
                x: "Ahmedabad",
                y: 55,
              },
              {
                x: "Bangaluru",
                y: 84,
              },
              {
                x: "Pune",
                y: 31,
              },
              {
                x: "Chennai",
                y: 70,
              },
              {
                x: "Jaipur",
                y: 30,
              },
              {
                x: "Surat",
                y: 44,
              },
              {
                x: "Hyderabad",
                y: 68,
              },
              {
                x: "Lucknow",
                y: 28,
              },
              {
                x: "Indore",
                y: 19,
              },
              {
                x: "Kanpur",
                y: 29,
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          legend: {
            show: false,
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "treemap",
          },
          title: {
            text: "Basic Treemap",
          },
        },
      },
      {
        type: "treemap",
        series: [
          {
            name: "Desktops",
            data: [
              {
                x: "ABC",
                y: 10,
              },
              {
                x: "DEF",
                y: 60,
              },
              {
                x: "XYZ",
                y: 41,
              },
            ],
          },
          {
            name: "Mobile",
            data: [
              {
                x: "ABCD",
                y: 10,
              },
              {
                x: "DEFG",
                y: 20,
              },
              {
                x: "WXYZ",
                y: 51,
              },
              {
                x: "PQR",
                y: 30,
              },
              {
                x: "MNO",
                y: 20,
              },
              {
                x: "CDE",
                y: 30,
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          legend: {
            show: false,
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "treemap",
          },
          title: {
            text: "Multi-dimensional Treemap",
            align: "center",
          },
        },
      },
      {
        type: "treemap",
        series: [
          {
            data: [
              {
                x: "New Delhi",
                y: 218,
              },
              {
                x: "Kolkata",
                y: 149,
              },
              {
                x: "Mumbai",
                y: 184,
              },
              {
                x: "Ahmedabad",
                y: 55,
              },
              {
                x: "Bangaluru",
                y: 84,
              },
              {
                x: "Pune",
                y: 31,
              },
              {
                x: "Chennai",
                y: 70,
              },
              {
                x: "Jaipur",
                y: 30,
              },
              {
                x: "Surat",
                y: 44,
              },
              {
                x: "Hyderabad",
                y: 68,
              },
              {
                x: "Lucknow",
                y: 28,
              },
              {
                x: "Indore",
                y: 19,
              },
              {
                x: "Kanpur",
                y: 29,
              },
            ],
          },
        ],
        chartOptions: {
          theme: {
            mode: isDarkTest.value ? "dark" : "light",
          },
          legend: {
            show: false,
          },
          chart: {
            background: isDarkTest.value ? "rgb(30 41 59)" : "",
            height: 350,
            type: "treemap",
          },
          title: {
            text: "Distibuted Treemap (different color for each cell)",
            align: "center",
          },
          colors: [
            "#3B93A5",
            "#F7B844",
            "#ADD8C7",
            "#EC3C65",
            "#CDD7B6",
            "#C1F666",
            "#D43F97",
            "#1E5D8C",
            "#421243",
            "#7F94B0",
            "#EF6537",
            "#C0ADDB",
          ],
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false,
            },
          },
        },
      },
    ];

    return { data, selected };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10%;
  .item {
    max-width: 80%;
    min-width: 34vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 60px;
  }
}
</style>
