<template>
  <div class="p-8 flex items-center justify-center w-full h-full" v-if="isTest">
    <div
      v-if="!isCountrySelected"
      class="flex flex-row w-full justify-center gap-2"
    >
      <h1 class="text-xl text-slate-900">Вы не выбрали страну</h1>
      <a
        @click="routeToCountrySelect()"
        class="cursor-pointer text-blue-600 hover:border-b border-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M13.293 3.96a4.771 4.771 0 1 1 6.747 6.747l-3.03 3.03l-1.415-1.413l3.03-3.031a2.771 2.771 0 1 0-3.918-3.92l-3.031 3.031l-1.414-1.414l3.03-3.03Zm2.12 6.04l-5.415 5.414L8.584 14l5.414-5.414L15.413 10Zm-7.01 1.676l-3.03 3.031a2.771 2.771 0 1 0 3.92 3.92l3.03-3.031l1.414 1.414l-3.03 3.03a4.771 4.771 0 1 1-6.748-6.747l3.03-3.03l1.415 1.413Z"
          />
        </svg>
      </a>
    </div>
    <div
      class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-9 mx-auto isolate gap-8"
      v-else
    >
      <template v-for="item in list" :key="item.header">
        <PlansCard
          v-if="!item.showIfSelected || item.current"
          :item="item"
          :isRussia="isRussia"
          :select="select"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, reactive } from "vue";
import { isTest } from "@/composables/isTest";
import PlansCard from "./PlansCard.vue";
import store from "@/store";
import { useValidate } from "@/composables/validate";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: { PlansCard },
  props: { pagination: { type: Object } },
  setup(props) {
    const { t, tc } = useLangConfiguration();
    const { dateFormater } = useValidate();

    const list = reactive([
      {
        id: 0,
        accent: false,
        showIfSelected: true,
        current: computed(() => store.state.account.account.tarif == 0),
        header: "Демо 14",
        description: "",
        price: tc("tarifs.price", 1),
        period: t("tarifs.d"),
        priceSmall: t("tarifs.freePriceSmall"),
        advantages: [
          { text: t("tarifs.pos"), inf: true },
          { text: t("tarifs.zak"), inf: true },
        ],
      },
      {
        id: 3,
        accent: false,
        current: computed(() => store.state.account.account.tarif == 3),
        header: "Бесплатный",
        description: "",
        price: tc("tarifs.price", 1),
        period: "-1",
        advantages: [
          { text: t("tarifs.pol", { count: 1 }), type: 1 },
          { text: t("tarifs.pos2", { count: 30 }), type: 1 },
          { text: t("tarifs.ord", { count: 10 }), type: 1 },
          { text: t("tarifs.kontikomp", { count: 100 }), type: 1 },
          { text: t("tarifs.noApi"), type: 1 },
        ],
      },
      {
        id: 1,
        accent: false,
        showIfSelected: true,
        current: computed(() => store.state.account.account.tarif == 1),
        header: "Партнерский",
        description: "",
        price: tc("tarifs.price", 1),
        period: -1,
        advantages: [
          { text: t("tarifs.pos"), inf: true },
          { text: t("tarifs.zak"), inf: true },
          { text: t("tarifs.imp") },
        ],
      },
      {
        id: 2,
        accent: true,
        current: computed(() => store.state.account.account.tarif == 2),
        header: "Базовый",
        description: "",
        price: tc("tarifs.price", 2, { price: 70 }),
        period: t("tarifs.g"),
        priceSmall: t("tarifs.evry"),
        advantages: [
          { text: t("tarifs.pos"), inf: true },
          { text: t("tarifs.zak"), inf: true },
          { text: t("tarifs.imp") },
        ],
      },
    ]);

    const select = (id, source) => {
      console.log(id, source);
    };

    const setCurrent = async () => {
      const current = list.find((el) => el.current);
      if (!current) return;
      const users = await store.dispatch("getUsersList");
      const activeUsersCount = users.filter((user) => user.is_active).length;
      const usersPayed = store.state.account.account?.users_payed;
      const expiredAt = dateFormater(store.state.account.account?.expired_at, [
        "en-GB",
        { year: "numeric", month: "numeric", day: "numeric" },
      ]);
      current.advantages = [
        {
          text: t("tarifs.users", {
            // eslint-disable-next-line no-irregular-whitespace
            count: `${activeUsersCount} / ${usersPayed}`,
          }),
          type: 2,
        },
        { text: t("tarifs.exp", { date: `${expiredAt}` }), type: 2 },
        ...current.advantages,
      ];
    };
    setCurrent();

    const setHeaders = async () => {
      const tarifs = await store.dispatch("getTarifsList");
      list.map((el) => (el.header = tarifs[el.id]));
    };
    setHeaders();

    const isCountrySelected = computed(() =>
      Boolean(store.state.account.account?.config?.country)
    );

    const routeToCountrySelect = () => {
      const item = props.pagination.list.find((el) => el.value === "general");
      if (!item) return;
      props.pagination.select(item);
      nextTick(() => {
        const i = document.getElementById(123);
        i?.children?.[0]?.children?.[0]?.focus();
      });
    };

    const isRussia = computed(
      () => store.state.account.account?.config?.country === "Russia"
    );

    return {
      list,
      isTest,
      isCountrySelected,
      routeToCountrySelect,
      isRussia,
      select,
    };
  },
};
</script>

<style></style>
