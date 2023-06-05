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
    </div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import SelectorVue from "../SelectorVue.vue";
import { useNewDeal } from "@/composables/newDeal";
import store from "@/store";
export default {
  components: { SelectorVue },
  props: { total: Object },
  setup(props) {
    const { order } = useNewDeal();

    const list = reactive([
      { label: "Сумма заказа:", value: "price" },
      { label: "Себестоимость:", value: "cost_price" },
      { label: "Прибыль:", value: "prib" },
      { label: "Сотрудник:", value: "user_name", component: "SelectorVue" },
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

    const user_name = reactive({
      selected: computed(() =>
        user_name.list.find(
          (el) =>
            el.value ==
            (order.fields.user_name
              ? order.fields.user_name
              : props.total?.user_name)
        )
      ),
      list: [],
      getList: async function () {
        const res = await store.dispatch("getUsersList");
        this.list = [];
        res.forEach((user) => this.list.push({ ...user, value: user.name }));
      },
      select: function (option) {
        order.fields.user_name = option.value;
      },
    });
    user_name.getList();

    return { list, selector, order, user_name };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
</style>
