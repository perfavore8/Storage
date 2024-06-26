<template>
  <div v-if="selectedTabComp" class="flex flex-col gap-4">
    <div class="flex flex-row items-center justify-between relative">
      <AppSearchWithFilters
        class="absolute left-1/2 -translate-x-1/2"
        :setOfInstructions="'clients'"
        :key="selectedTabComp"
        @emitParams="emitParams"
      />
      <button class="btn btn_light_dark_blue self-end" @click="add()">
        {{ $t("global.add") }}
      </button>
    </div>

    <div class="grid grid-cols-2">
      <div class="flex flex-col items-center">
        <client-sections-fields
          class="w-full"
          ref="refList"
          :list="clientsList"
          :selected="selected"
          :selectedTab="selectedTabComp"
        />
        <AppPaginator
          :page="page"
          @changePage="changePage"
          class="w-fit"
          v-if="clientsList.length"
        />
        <label v-if="clientsList.length == 0 && !isLoading" class="text">
          {{ t("global.nothingFound") }}
        </label>
      </div>
      <div class="h-full relative">
        <transition name="modal">
          <ClientsEditSection
            ref="target"
            :isNew="addNew"
            :item="selectedItem"
            v-if="selected.id || addNew"
            @close="() => closeAdd(true)"
            @follow="follow"
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
        <span>{{ $t("Clients.exitConfirm") }}</span>
        <div class="flex flex-row gap-2 items-center justify-end mt-4">
          <button
            class="btn small_btn bg-transparent focus-visible:underline focus-visible:underline-offset-4"
            @click="closeAdd(true)"
          >
            {{ $t("Clients.exit") }}
          </button>
          <button
            class="btn small_btn btn_light_dark_blue"
            @click="closeAdd(false), save()"
          >
            {{ $t("global.save") }}
          </button>
        </div>
      </div>
    </teleport>
  </template>
</template>

<script>
import ClientsEditSection from "./ClientsEditSection.vue";
import AppPaginator from "../AppPaginator.vue";
import AppSearchWithFilters from "../AppSearchWithFilters.vue";
import ClientSectionsFields from "./ClientSectionsFields.vue";
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useClients } from "@/composables/clients";
import { onClickOutside } from "@vueuse/core";
import { useClientsTabs } from "@/composables/clientsTabs";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  components: {
    ClientsEditSection,
    AppSearchWithFilters,
    ClientSectionsFields,
    AppPaginator,
  },
  setup() {
    const target = ref(null);
    const refList = ref(null);
    onClickOutside(target, () => closeAdd(), { ignore: [refList] });

    const { tabs } = useClientsTabs();
    const selectedTabComp = computed(() => tabs.selected);
    watch(
      selectedTabComp,
      () => (getClientsList(), getClientsFields(), closeAdd(true))
    );

    const { t } = useLangConfiguration();

    const {
      clientsList,
      getClientsList,
      getClientsFields,
      page,
      changePage,
      updateParams,
      isLoading,
    } = useClients(selectedTabComp);

    const emitParams = (params) => {
      updateParams(params);
      getClientsList();
    };

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
    const follow = (id) => {
      const oppsite = tabs.list.find(
        (el) => el.oppositeValue === selectedTabComp.value.value
      );
      tabs.select(oppsite);
      selected.select(id);
    };

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

    const save = () => {
      target.value?.accept();
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
      save,
      follow,
      selectedTabComp,
      page,
      changePage,
      emitParams,
      t,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/app.scss";
.add_section_selected {
  @apply bg-slate-100;
}
.text {
  position: relative;
  top: 20px;
  margin: 0 auto;
  @include font(500, 18px);
}
</style>
