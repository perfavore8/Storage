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
            @close="() => closeAdd(true)"
          />
        </transition>
      </div>
    </div>
  </div>
  <template v-if="confirmClose">
    <teleport to="body">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 border border-slate-300 rounded-lg shadow-md"
      >
        <span>Вы уверены что хотите выйти без сохранения?</span>
        <div class="flex flex-row gap-2 items-center justify-end mt-4">
          <button
            class="btn small_btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
            @click="closeAdd(true)"
          >
            Выйти
          </button>
          <button
            class="btn small_btn btn_light_dark_blue"
            @click="closeAdd(false)"
          >
            Сохранить
          </button>
        </div>
      </div>
    </teleport>
  </template>
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
        if (addNew.value) {
          closeAdd();
        } else {
          nextTick(() => (this.id = id));
        }
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

    const confirmClose = ref(false);
    const closeAdd = (confirm) => {
      if (addNew.value) {
        if (confirm === undefined) {
          confirmClose.value = true;
        } else if (confirm) {
          confirmClose.value = false;
          selected.ref = null;
          selected.id = null;
          addNew.value = false;
          getClientsList();
        } else {
          confirmClose.value = false;
        }
      } else {
        selected.ref = null;
        selected.id = null;
        addNew.value = false;
        getClientsList();
      }
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
      confirmClose,
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
