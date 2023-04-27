<template>
  <div v-if="selectedTab" class="flex flex-col gap-4">
    <div class="flex flex-row items-center justify-between relative">
      <AppSeatchWithFilters class="absolute left-1/2 -translate-x-1/2" />
      <button class="btn btn_light_dark_blue self-end" @click="add()">
        Добавить
      </button>
    </div>

    <div class="grid grid-cols-2">
      <client-sections-fields
        :list="clientsList"
        :selected="selected"
        :selectedTab="selectedTab"
      />
      <div class="h-full relative" @click.self="closeAdd()">
        <transition name="modal">
          <component
            :is="selectedTab.component"
            :isNew="addNew"
            :item="selectedItem"
            v-if="selected.id || addNew"
            @close="closeAdd"
          />
        </transition>
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
import ClientSectionsFields from "./ClientSectionsFields.vue";
export default {
  components: {
    EditContactsSection,
    EditCompanySection,
    AppSeatchWithFilters,
    ClientSectionsFields,
  },
  props: {
    selectedTab: { type: Object, required: false },
  },
  setup(props) {
    const selectedTabComp = computed(() => props.selectedTab);
    watch(selectedTabComp, () => (getClientsList(), closeAdd()));

    const { clientsList, getClientsList } = useClients(selectedTabComp);

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

    getClientsList();

    return {
      selected,
      addNew,
      clientsList,
      add,
      closeAdd,
      selectedItem,
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
