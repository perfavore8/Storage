<template>
  <div
    class="flex flex-col gap-4 justify-center items-center sticky top-[142px]"
  >
    <div
      class="max-w-md min-w-[40%] w-fit text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
    >
      <div class="flex flex-col pb-3 items-start w-full">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          Название
        </div>
        <input type="text" class="input" v-model="order.fields.name" />
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
        <div class="text-base font-medium">{{ total?.[item.value] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import SelectorVue from "../SelectorVue.vue";
import { useNewDeal } from "@/composables/newDeal";
export default {
  components: { SelectorVue },
  props: { total: Object },
  setup() {
    const { order } = useNewDeal();

    const list = reactive([
      { label: "Сумма заказа:", value: "price" },
      { label: "Себестоимость:", value: "cost_price" },
      { label: "Прибыль:", value: "prib" },
      { label: "Сотрудник:", value: "user_name" },
    ]);

    const selector = reactive({
      selected: computed(() =>
        selector.list.find((el) => el.value == order.status)
      ),
      list: [
        { name: "Открытый", value: 0 },
        { name: "Успешный", value: 1 },
        { name: "Отменен", value: 2 },
        { name: "Удален", value: 3 },
      ],
      select: function (option) {
        order.status = option.value;
      },
    });

    return { list, selector, order };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
