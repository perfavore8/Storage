<template>
  <div
    class="flex flex-col gap-4 justify-center items-center top-[142px] w-full mx-auto mt-4"
    :class="[isPublicOrder ? 'public' : 'sticky privat']"
  >
    <h2
      class="font-semibold text-gray-700 w-full"
      :class="[isPublicOrder ? 'text-center font-bold text-2xl' : 'text-start']"
    >
      {{ isPublicOrder ? order.fields.name : $t("newOrder.dan") }}
    </h2>
    <div
      class="min-w-[40%] text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
      :class="[
        isPublicOrder
          ? 'w-full mr-auto grid grid-cols-1 md:grid-cols-2 gap-2 items-start'
          : 'w-full',
      ]"
    >
      <div class="item" v-if="!isPublicOrder">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ $t("newOrder.name") }}
        </div>
        <input
          type="text"
          class="input"
          v-model="order.fields.name"
          @input="toggleSomeChange(true)"
        />
      </div>
      <div class="item">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ $t("newOrder.stat") }}
        </div>
        <div class="text-base font-medium" v-if="isPublicOrder">
          {{ selector.selected?.name }}
        </div>
        <AppInputSelect
          v-else
          :selected="selector.selected"
          :list="selector.list"
          :haveStackedOpgroup="true"
          :dropStackedIdxAfterOpen="true"
          :SelectedInTitle="true"
          @select="(option) => selector.select(option)"
        />
      </div>
      <div
        class="item"
        :class="[isPublicOrder && idx === 0 && 'md:!border-t-0']"
        v-for="(item, idx) in list"
        :key="item.label"
      >
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ item.label }}
        </div>
        <template v-if="item.component">
          <div class="text-base font-medium" v-if="isPublicOrder">
            {{ user_name.selected?.name }}
          </div>
          <component
            v-else
            :is="item.component"
            :selected_option="user_name.selected"
            :options_props="user_name.list"
            @select="(option) => user_name.select(option)"
          />
        </template>
        <div class="text-base font-medium" v-else>
          <template v-if="item.value === 'price' && isPublicOrder">
            {{
              checkIsNull(order.custom_price)
                ? total?.[item.value]
                : order.custom_price
            }}
          </template>
          <input
            type="text"
            class="input"
            v-else-if="
              item.value === 'price' &&
              config?.manual_budget_editing &&
              !isPublicOrder
            "
            v-model="order.custom_price"
            :placeholder="total?.[item.value]"
            @change="toggleSomeChange(true)"
          />
          <template v-else>
            {{ total?.[item.value] }}
          </template>
        </div>
      </div>
      <div class="item">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ $t("newOrder.soz") }}
        </div>
        <div class="text-base font-medium">
          {{ dateFormater(order.created_at) }}
        </div>
      </div>
      <div class="item" v-if="!isPublicOrder">
        <div class="mb-1 text-gray-500 md:text-base dark:text-gray-400">
          {{ $t("newOrder.izm") }}
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
import { useLangConfiguration } from "@/composables/langConfiguration";
import AppInputSelect from "../AppInputSelect.vue";
import router from "@/router";
import { waitForNonAsyncFunction } from "@/composables/waitForNonAsyncFunction";
import { isPublicOrder } from "@/components/PublicOrder";
import { useValidate } from "@/composables/validate";
export default {
  components: { SelectorVue, AppInputSelect },
  props: { total: Object },
  setup(props) {
    const { t } = useLangConfiguration();
    const { order, toggleSomeChange, isOrederLoaded, saveOrder, someChange } =
      useNewDeal();
    const { checkIsNull } = useValidate();

    const list = reactive([
      { label: t("newOrder.sum"), value: "price" },
      { label: t("newOrder.cp"), value: "cost_price" },
      { label: t("newOrder.prib"), value: "prib" },
      {
        label: t("newOrder.sotr"),
        value: "user_name",
        component: "SelectorVue",
      },
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
          if (stat.value === -1) return;
          stat.value = "optgroup";
          list.push(stat);
          stat.statuses.map((s) => {
            s.value = s.id;
            s.optgroup = true;
            if (s.type !== 3) list.push(s);
          });
        });
        this.list.length = 0;
        this.list = list;
      },
      setSelected: function () {
        const pipelineId = router?.currentRoute?.value?.params?.pipelineId;
        const catItem = this.list.find(
          (el) =>
            (!pipelineId ? el.is_system : el.id === Number(pipelineId)) &&
            el.value === "optgroup"
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
      await waitForNonAsyncFunction(isOrederLoaded);
      await Promise.all([user_name.getList(), selector.getStatuses()]);
      user_name.setSelected();
      if (!selector.checkSelStat(order.status_id)) selector.setSelected();
      if (someChange.value) saveOrder();
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
      setSelected: function () {
        if (this.selected) return;
        const curUser = this.list.find((us) => us.id === user.value?.id);
        if (!curUser) return;
        this.select(curUser);
      },
      select: function (option) {
        order.user_id = option.id;
        toggleSomeChange(true);
      },
    });

    const dateFormater = (date) => {
      const res = new Date(date);
      const response = res.toLocaleString();
      return response === "Invalid Date" ? "" : response;
    };

    const config = computed(() => store.state.account.account?.config);
    const user = computed(() => store.state.account.user);

    return {
      list,
      selector,
      order,
      user_name,
      toggleSomeChange,
      dateFormater,
      config,
      isPublicOrder,
      checkIsNull,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.item {
  @apply flex;
}
.public {
  .item {
    @apply flex-row justify-between pt-3 items-start w-11/12;
  }
}
.privat {
  .item {
    @apply flex-col pb-3 items-start w-full;
  }
}
</style>
