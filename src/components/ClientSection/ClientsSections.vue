<template>
  <div v-if="selectedTab" class="flex flex-col gap-4">
    <div class="flex flex-row items-center justify-between relative">
      <AppSeatchWithFilters class="absolute left-1/2 -translate-x-1/2" />
      <button class="btn btn_light_dark_blue self-end" @click="add()">
        Добавить
      </button>
    </div>

    <div class="grid grid-cols-2">
      <ul class="flex flex-col divide-y p-4 divide-gray-100">
        <li
          v-for="item in clientsList"
          :key="item.id"
          class="flex justify-between px-6 py-5 cursor-pointer rounded-xl hover:bg-slate-50"
          :class="{ 'bg-slate-100': selected.id === item.id }"
          @click="() => selected.select(item.id)"
        >
          <div class="min-w-0 flex-auto text-left">
            <p class="text-lg font-semibold leading-6 text-gray-800">
              {{ item[placeholders[selectedTab.value].title] }}
            </p>
            <p class="mt-1 truncate text-sm leading-5 text-gray-500">
              {{ item[placeholders[selectedTab.value].subTitle] }}
            </p>
          </div>
          <div class="sm:flex sm:flex-col sm:items-end">
            <p class="text-base leading-6 text-gray-900">
              {{ item[placeholders[selectedTab.value].descriton] }}
            </p>
            <div class="flex flex-row gap-2 items-center mt-1">
              <div
                class="w-4 h-4 rounded-full flex items-center justify-center"
                :style="{
                  'background-color':
                    getColor(
                      item[placeholders[selectedTab.value].subDescriton] * 10
                    ) + '50',
                }"
              >
                <div
                  class="w-2 h-2 rounded-full"
                  :style="{
                    'background-color':
                      getColor(
                        item[placeholders[selectedTab.value].subDescriton] * 10
                      ) + '99',
                  }"
                ></div>
              </div>
              <p class="text-sm leading-5 text-gray-500">
                {{ item[placeholders[selectedTab.value].subDescriton] }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="h-full" @click.self="closeAdd()">
        <component
          :is="selectedTab.component"
          :isNew="addNew"
          :item="selectedItem"
          v-if="selected.id || addNew"
          @close="closeAdd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EditContactsSection from "./EditContactsSection.vue";
import EditCompanySection from "./EditCompanySection.vue";
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useClients } from "@/composables/clients";
import AppSeatchWithFilters from "../AppSearchWithFilters.vue";
export default {
  components: {
    EditContactsSection,
    EditCompanySection,
    AppSeatchWithFilters,
  },
  props: {
    selectedTab: { type: Object, required: false },
  },
  setup(props) {
    const { clientsList, getClientsList, getColor } = useClients();

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

    const selected = reactive({
      ref: null,
      id: null,
      select: function (id) {
        addNew.value = false;
        nextTick(() => (this.id = id));
      },
    });
    const selectedItem = computed(() =>
      clientsList.find((el) => el.id === selected.id)
    );

    const addNew = ref(false);
    const add = () => {
      selected.ref = null;
      selected.id = null;
      nextTick(() => (addNew.value = true));
    };
    const closeAdd = () => {
      selected.ref = null;
      selected.id = null;
      addNew.value = false;
    };

    getClientsList(props.selectedTab.value);
    const selectedTabComp = computed(() => props.selectedTab);
    watch(
      selectedTabComp,
      () => (getClientsList(props.selectedTab.value), closeAdd())
    );

    return {
      selected,
      addNew,
      clientsList,
      add,
      closeAdd,
      placeholders,
      selectedItem,
      getColor,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.add_section_selected {
  @apply bg-slate-100;
}
</style>
