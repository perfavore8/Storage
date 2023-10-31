<template>
  <draggable
    class="flex flex-col h-full p-0 ml-4 min-h-[8px] level"
    :list="list"
    group="pe"
    :item-key="id"
    @end="moveItem"
  >
    <template #item="{ element }">
      <div @dragstart="isDragged = element.id" @dragend="isDragged = null">
        <div
          class="rounded-md cursor-move bg-white flex flex-row items-center justify-between gap-4 px-4 py-2 border border-slate-300"
          :class="{ darag: isDragged == element.id }"
        >
          <slot :element="element">{{ element.name }}</slot>
        </div>
        <AppDrag
          :list="element.list"
          :class="{ 'mt-2': element.list.length }"
          v-slot="{ element: el2 }"
          @customMove="(item_id, parent_id) => customMove(item_id, parent_id)"
        >
          <slot :element="el2">{{ element.name }}</slot>
        </AppDrag>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import AppDrag from "@/components/AppDrag";
import { ref } from "vue";
export default {
  components: { draggable, AppDrag },
  props: { list: Array },
  setup(props, context) {
    const isDragged = ref(null);

    const moveItem = (e) => {
      const parent_id = e?.to?.parentElement?.__draggable_context?.element?.id;
      const item_id = e?.item?._underlying_vm_?.id;
      context.emit("customMove", item_id, parent_id);
    };
    const customMove = (item_id, parent_id) => {
      context.emit("customMove", item_id, parent_id);
    };

    return { isDragged, moveItem, customMove };
  },
};
</script>

<style lang="scss" scoped>
.level {
  width: calc(100% - 16px);
}
.sortable-ghost > .darag {
  @apply bg-slate-50 text-slate-400;
  border: 1px solid rgb(134, 183, 254);
}
</style>
