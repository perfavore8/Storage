<template>
  <div
    class="flex flex-col gap-4 justify-center items-center sticky top-[142px] w-full mx-auto"
  >
    <h2 class="font-semibold text-gray-700 w-full text-start">Данные заказа</h2>
    <div
      class="min-w-[40%] w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
    >
      <div class="flex flex-col pb-3 items-start w-full">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          Название
        </div>
        <input
          type="text"
          class="input"
          v-model="order.fields.name"
          @input="toggleSomeChange(true)"
        />
      </div>
      <div class="flex flex-col pb-3 items-start w-full">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          Статус
        </div>
        <SelectorVue
          :selected_option="selector.selected"
          :options_props="selector.list"
          @select="(option) => selector.select(option)"
        />
      </div>
      <div
        class="flex flex-col pb-3 items-start w-full"
        v-for="item in list"
        :key="item.label"
      >
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ item.label }}
        </div>
        <template v-if="item.component">
          <component
            :is="item.component"
            :selected_option="user_name.selected"
            :options_props="user_name.list"
            @select="(option) => user_name.select(option)"
          />
        </template>
        <div class="text-base font-medium" v-else>
          {{ total?.[item.value] }}
        </div>
      </div>
      <div class="flex flex-col pb-3 items-start w-full">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          Создан:
        </div>
        <div class="text-base font-medium">
          {{ dateFormater(order.created_at) }}
        </div>
      </div>
      <div class="flex flex-col pb-3 items-start w-full">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          Изменен:
        </div>
        <div class="text-base font-medium">
          {{ dateFormater(order.updated_at) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import SelectorVue from "../SelectorVue.vue";
import { useNewDeal } from "@/composables/newDeal";
import store from "@/store";
export default {
  components: { SelectorVue },
  props: { total: Object },
  setup(props) {
    const { order, toggleSomeChange, isOrederLoaded } = useNewDeal();

    const list = reactive([
      { label: "Сумма заказа:", value: "price" },
      { label: "Себестоимость:", value: "cost_price" },
      { label: "Прибыль:", value: "prib" },
      { label: "Сотрудник:", value: "user_name", component: "SelectorVue" },
    ]);

    const selector = reactive({
      selected: computed(() =>
        selector.list.find((el) => el.value == order.status_id)
      ),
      list: [],
      getStatuses: async function () {
        const stats = store.state.orders.pipelines.length
          ? store.state.orders.pipelines
          : await store.dispatch("ordersPipelinesList", {});
        const list = [];
        stats.map((stat) => {
          stat.value = "optgroup";
          list.push(stat);
          stat.statuses.map((s) => {
            s.value = s.id;
            s.optgroup = true;
            list.push(s);
          });
        });
        this.list.length = 0;
        this.list = list;
      },
      setSelected: function () {
        const catItem = this.list.find(
          (el) => el.is_system && el.value === "optgroup"
        );
        const idx = this.list.indexOf(catItem);
        order.status_id = this.list[idx + 1].id;
      },
      checkSelStat: function (id) {
        const ids = [];
        this.list.forEach((el) => ids.push(el.value));
        return ids.includes(id);
      },
      select: function (option) {
        order.status_id = option.value;
        toggleSomeChange(true);
      },
    });

    onMounted(async () => {
      const prom = new Promise((resolve) =>
        setInterval(() => (isOrederLoaded.value ? resolve() : null), 100)
      );
      await prom;
      await selector.getStatuses();
      if (!selector.checkSelStat(order.status_id)) selector.setSelected();
    });

    const user_name = reactive({
      selected: computed(
        () =>
          user_name.list.find((el) => el.id == order.user_id) ||
          user_name.list.find((el) => el.value == props.total?.user_name)
      ),
      list: [],
      getList: async function () {
        const res = await store.dispatch("getUsersList");
        this.list = [];
        res.forEach((user) => this.list.push({ ...user, value: user.name }));
      },
      select: function (option) {
        order.user_id = String(option.id);
        toggleSomeChange(true);
      },
    });
    user_name.getList();

    const dateFormater = (date) => {
      const res = new Date(date);
      const response = res.toLocaleString();
      return response === "Invalid Date" ? "" : response;
    };

    return { list, selector, order, user_name, toggleSomeChange, dateFormater };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
