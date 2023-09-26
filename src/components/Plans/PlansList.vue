<template>
  <div class="p-8 flex items-center justify-center w-full h-full" v-if="true">
    <div
      class="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-9 mx-auto isolate gap-8"
    >
      <PlansCard v-for="item in list" :key="item.header" :item="item" />
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import PlansCard from "./PlansCard.vue";
import store from "@/store";
import { useValidate } from "@/composables/validate";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: { PlansCard },
  setup() {
    const { t } = useLangConfiguration();
    const { dateFormater } = useValidate();

    const list = reactive([
      {
        id: 0,
        accent: false,
        current: computed(() => store.state.account.account.tarif == 0),
        header: "Демо 14",
        description: "",
        price: t("tarifs.price", { price: 0 }),
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
        price: t("tarifs.price", { price: 0 }),
        period: "-1",
        advantages: [
          { text: t("tarifs.pol", { count: 1 }), type: 1 },
          { text: t("tarifs.pos2", { count: 30 }), type: 1 },
          { text: t("tarifs.ord", { count: 10 }), type: 1 },
        ],
      },
      {
        id: 2,
        accent: true,
        current: computed(() => store.state.account.account.tarif == 1), // <- 2
        header: "Базовый",
        description: "",
        price: t("tarifs.price", { price: 1700 }),
        period: t("tarifs.g"),
        priceSmall: t("tarifs.evry"),
        advantages: [
          { text: t("tarifs.pos"), inf: true },
          { text: t("tarifs.zak"), inf: true },
          { text: t("tarifs.imp") },
        ],
      },
    ]);

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

    return { list };
  },
};
</script>

<style></style>
