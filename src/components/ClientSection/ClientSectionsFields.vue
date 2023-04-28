<template>
  <ul class="flex flex-col divide-y p-4 divide-gray-100 h-fit">
    <li
      v-for="item in list"
      :key="item.id"
      class="flex justify-between px-6 py-5 cursor-pointer rounded-xl hover:bg-slate-50"
      :class="{ 'bg-slate-100': selected.id === item.id }"
      @click="() => selected.select(item.id)"
    >
      <div class="min-w-0 flex-auto text-left">
        <p class="text-lg font-semibold leading-6 text-gray-800">
          {{ item?.fields?.[placeholders[selectedTab.value].title] }}
        </p>
        <p class="mt-1 truncate text-sm leading-5 text-gray-500">
          {{ item?.fields?.[placeholders[selectedTab.value].subTitle] }}
        </p>
      </div>
      <div class="sm:flex sm:flex-col sm:items-end">
        <p class="text-base leading-6 text-gray-900">
          {{ item?.fields?.[placeholders[selectedTab.value].descriton] }}
        </p>
        <div class="flex flex-row gap-2 items-center mt-1">
          <div
            class="w-4 h-4 rounded-full flex items-center justify-center"
            :style="{
              'background-color':
                getColor(
                  item?.fields?.[placeholders[selectedTab.value].subDescriton] *
                    10
                ) + '50',
            }"
          >
            <div
              class="w-2 h-2 rounded-full"
              :style="{
                'background-color':
                  getColor(
                    item?.fields?.[
                      placeholders[selectedTab.value].subDescriton
                    ] * 10
                  ) + '99',
              }"
            ></div>
          </div>
          <p class="text-sm leading-5 text-gray-500">
            {{ item?.fields?.[placeholders[selectedTab.value].subDescriton] }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { useClients } from "@/composables/clients";
import { computed } from "vue";
export default {
  props: {
    list: { type: Array, required: false, default: () => [] },
    selected: { type: Object, required: true },
    selectedTab: { type: Object, required: false },
  },
  setup(props) {
    const selectedTabComp = computed(() => props.selectedTab);
    const { getColor } = useClients(selectedTabComp);

    const placeholders = {
      Company: {
        title: "name",
        subTitle: "signatory",
        descriton: "director",
        subDescriton: "rating",
      },
      Contacts: {
        title: "name",
        subTitle: "phoneNumber",
        descriton: "position",
        subDescriton: "rating",
      },
    };

    return { placeholders, getColor };
  },
};
</script>

<style lang="scss" scoped></style>
