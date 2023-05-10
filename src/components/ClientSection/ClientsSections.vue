<template>
  <div v-if="selectedTab" class="flex flex-col gap-4">
    <div class="flex flex-row items-center justify-between relative">
      <AppSeatchWithFilters
        class="absolute left-1/2 -translate-x-1/2"
        :key="selectedTab"
      />
      <button class="btn btn_light_dark_blue self-end" @click="add()">
        Добавить
      </button>
    </div>

    <div class="grid grid-cols-2">
      <client-sections-fields
        ref="refList"
        :list="clientsList"
        :selected="selected"
        :selectedTab="selectedTab"
      />
      <div class="h-full relative">
        <transition name="modal">
          <ClientsEditSection
            ref="target"
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
import ClientsEditSection from "./ClientsEditSection.vue";
import AppSeatchWithFilters from "../AppSearchWithFilters.vue";
import ClientSectionsFields from "./ClientSectionsFields.vue";
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useClients } from "@/composables/clients";
import { onClickOutside } from "@vueuse/core";
export default {
  components: {
    ClientsEditSection,
    AppSeatchWithFilters,
    ClientSectionsFields,
  },
  props: {
    selectedTab: { type: Object, required: false },
  },
  setup(props) {
    const target = ref(null);
    const refList = ref(null);
    onClickOutside(target, () => closeAdd(), { ignore: [refList] });

    const selectedTabComp = computed(() => props.selectedTab);
    watch(
      selectedTabComp,
      () => (getClientsList(), getClientsFields(), closeAdd())
    );

    const { clientsList, getClientsList, getClientsFields } =
      useClients(selectedTabComp);

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
      getClientsList();
    };

    getClientsList();

    return {
      target,
      refList,
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
