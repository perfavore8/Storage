<template>
  <div
    class="w-fit mt-20 pb-10 mx-auto text-left overflow-x-scroll max-w-[95vw]"
    :class="{ blur: isDataLoading }"
  >
    <div class="w-full flex flex-row gap-2">
      <template v-for="column in list" :key="column.id">
        <div
          class="flex flex-col shrink-0 w-80 rounded-md h-fit bg-slate-900/10"
          :style="{ 'background-color': column.bgColor }"
        >
          <div class="h10 flex flex-row items-baseline p-2 px-4 gap-2">
            <h2 class="font-semibold text-lg">
              {{ column.title }} {{ column.lastVisibleElIdx }}
            </h2>
            <small class="text-slate-700">
              (Сделок: {{ column.list.length }} | {{ column.totalSum }} ₽)
            </small>
          </div>
          <draggable
            class="flex flex-col gap-2 h-full p-2 pt-0 overflow-y-scroll max-h-[87vh]"
            :list="column.list"
            group="people"
            :item-key="id"
            :ref="(ref) => (column.ref = ref)"
          >
            <template #item="{ element, index }">
              <div
                class="p-2 rounded-md cursor-move bg-white flex flex-col gap-1 calla"
                :class="{
                  collapse:
                    index > column.lastVisibleElIdx + 5 ||
                    index < column.lastVisibleElIdx - 10,
                }"
                :ref="(ref) => (element.visible.ref = ref)"
              >
                {{ column.needDownloadNext }}
                <div class="card-header flex flex-row justify-between">
                  <h4 class="font-medium">
                    {{ element.name }}
                  </h4>
                  <span>{{ element.date }}</span>
                </div>
                <div
                  class="card-wrapper flex flex-col gap-0.5 leading-5 text-sm"
                >
                  <span class="text-base mb-0.5">
                    {{ element.responsible }}
                  </span>
                  <span>{{ element.castom1 }}</span>
                  <span>{{ element.castom2 }}</span>
                  <span>{{ element.castom3 }}</span>
                  <span>{{ element.castom4 }}</span>
                  <span>{{ element.castom5 }}</span>
                </div>
                <div
                  class="card-futter flex flex-row justify-between items-center"
                >
                  <span> {{ element.sum || 0 }} ₽ </span>
                  <div class="img_wrapper">
                    <img src="../../assets/favicon2.png" class="img" />

                    <div class="handle_cross" v-if="false"></div>
                  </div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import draggable from "vuedraggable";
import { useColor } from "@/composables/color";
import { useElementVisibility } from "@vueuse/core";
import store from "@/store";
export default {
  components: {
    draggable,
  },
  setup() {
    const { getRandomColor3 } = useColor();

    const list = ref([
      {
        id: 1,
        title: "Заголовок 1",
        ref: null,
        totalSum: computed(() => {
          const item = list.value.find((el) => el.id == 1);

          return item.list.reduce((acc, el) => (acc += Number(el.sum)), 0);
        }),
        list: [
          {
            id: 1,
            visible: { ref: null, value: null },
            name: "Сделка 11",
            sum: "12999",
            date: "21.07.2022",
            responsible: "Александр Иванов",
            castom4: "Кастомное поле 4",
            castom5: "Кастомное поле 5",
          },
          {
            id: 2,
            visible: { ref: null, value: null },
            name: "Сделка 12",
            sum: "750",
            date: "23.07.2022",
            responsible: "Екатерина Смирнова",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom3: "Кастомное поле 3",
            castom4: "Кастомное поле 4",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 13",
            sum: "1200",
            date: "24.05.2021",
            responsible: "Дмитрий Козлов",
            castom1: "Кастомное поле 1",
            castom4: "Кастомное поле 4",
            castom5: "Кастомное поле 5",
          },
        ],
      },
      {
        id: 2,
        title: "Заголовок 2",
        ref: null,
        totalSum: computed(() => {
          const item = list.value.find((el) => el.id == 2);

          return item.list.reduce((acc, el) => (acc += Number(el.sum)), 0);
        }),
        list: [
          {
            id: 1,
            visible: { ref: null, value: null },
            name: "Сделка 21",
            sum: "1800",
            date: "25.07.2023",
            responsible: "Ольга Петрова",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
          },
          {
            id: 2,
            visible: { ref: null, value: null },
            name: "Сделка 22",
            sum: "2500",
            date: "26.06.2023",
            responsible: "Иван Соколов",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 23",
            sum: "3500",
            date: "27.06.2023",
            responsible: "Анна Михайлова",
            castom3: "Кастомное поле 3",
            castom4: "Кастомное поле 4",
            castom5: "Кастомное поле 5",
          },
        ],
      },
      {
        id: 3,
        title: "Заголовок 3",
        ref: null,
        totalSum: computed(() => {
          const item = list.value.find((el) => el.id == 3);

          return item.list.reduce((acc, el) => (acc += Number(el.sum)), 0);
        }),
        lastVisibleElIdx: computed(() => {
          const item = list.value.find((el) => el.id == 3);
          const reversed = item.list.toReversed();
          const last = reversed.find((el) => el.visible.value);
          const idx = item.list.indexOf(last);

          return idx;
        }),
        needDownloadNext: computed(() => {
          const item = list.value.find((el) => el.id == 3);
          return item.list.length < item.lastVisibleElIdx + 5;
        }),
        list: [
          {
            id: 1,
            visible: { ref: null, value: null },
            name: "Сделка 31",
            sum: "4500",
            date: "28.07.2022",
            responsible: "Сергей Новиков",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom4: "Кастомное поле 4",
            castom5: "Кастомное поле 5",
          },
          {
            id: 2,
            visible: { ref: null, value: null },
            name: "Сделка 32",
            sum: "6000",
            date: "29.08.2020",
            responsible: "Наталья Павлова",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom3: "Кастомное поле 3",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
          {
            id: 3,
            visible: { ref: null, value: null },
            name: "Сделка 33",
            sum: "8000",
            date: "30.09.1200",
            responsible: "Михаил Федоров",
            castom1: "Кастомное поле 1",
            castom2: "Кастомное поле 2",
            castom5: "Кастомное поле 5",
          },
        ],
      },
    ]);

    const setColors = () => {
      list.value.map(
        (el) => (el.bgColor = computed(() => getRandomColor3("30")))
      );
    };
    setColors();

    const list2 = reactive([]);
    const setVisible = () => {
      list.value.forEach((col) =>
        col.list.forEach((item) => {
          if (item.visible.value === null)
            item.visible.value = useElementVisibility(item.visible.ref, {
              scrollTarget: col.ref,
            });
        })
      );
    };
    onMounted(() => setVisible());

    watch(
      () => list,
      () => {
        if (list.value[2].needDownloadNext) {
          for (let i = 0; i < 10; i++)
            list.value[2].list.push({
              id: 3,
              visible: { ref: null, value: null },
              name: "Сделка 33" + i,
              sum: "8000",
              date: "30.09.1200",
              responsible: "Михаил Федоров",
              castom1: "Кастомное поле 1",
              castom2: "Кастомное поле 2",
              castom5: "Кастомное поле 5",
            });
          nextTick(() => setVisible());
        }
      },
      { deep: true }
    );

    const updateList = () => {};

    const isDataLoading = computed(() => store.state.products.isLoading);

    return { list, list2, isDataLoading, updateList };
  },
};
</script>

<style lang="scss" scoped>
.sortable-ghost {
  @apply bg-slate-50 text-slate-400 border-slate-400/50;
}
.blur {
  transition: filter 0.2s ease-out;
  filter: blur(5px);
}
.img_wrapper {
  position: relative;
  // z-index: -1;
}
.img {
  object-fit: cover;
  width: 46px;
  padding: 4px;
  border: 1px solid #aeaeae;
  border-radius: 50%;
  object-fit: scale-down;
}
</style>
