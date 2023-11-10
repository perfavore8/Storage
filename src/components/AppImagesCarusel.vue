<template>
  <div>
    <label v-if="item">{{ item }}:</label>
    <div
      class="group/img relative h-fit"
      :class="[sizeWindow === 'f' ? 'w-full' : 'w-fit']"
      v-if="imagesList?.length"
      :ref="(el) => (sizeWindow === 'f' ? (refComp = el) : null)"
    >
      <img
        :src="imagesList[images.selectedIdx]"
        class="rounded-md parentImg"
        :class="{
          'w-full h-auto': sizeWindow === 'f',
          'h-14 w-14': sizeWindow !== 'f',
        }"
        :alt="t('ostatki.error')"
      />
      <div
        class="hidden group-hover/img:block absolute z-[110] top-1/2 -translate-y-1/2 p-8 ring-1 ring-slate-500/50 rounded-xl bg-white"
        :class="[
          `${float}-0`,
          {
            'h-40 w-40': sizeWindow === 'm',
            'h-52 w-52': sizeWindow === 'l',
            'group-hover/img:hidden': sizeWindow === 'f',
          },
        ]"
        :ref="(el) => (sizeWindow === 'f' ? null : (refComp = el))"
      >
        <img
          :src="imagesList[images.selectedIdx]"
          class="w-full h-full rounded-xl"
          :alt="t('ostatki.error')"
        />
      </div>
    </div>
  </div>
  <Teleport :to="refComp" v-if="refComp !== null">
    <div
      v-if="imagesList.length > 1"
      class="absolute left-0 top-1/2 -translate-y-1/2 w-full flex flex-row justify-between p-1 h-full bg-transparent"
    >
      <button class="h-full" @click="images.pref(imagesList.length)">
        <span class="material-icons-outlined"> navigate_before </span>
      </button>
      <button class="h-full" @click="images.next(imagesList.length)">
        <span class="material-icons-outlined"> navigate_next </span>
      </button>
    </div>
    <div
      class="absolute bottom-2 left-1/2 -translate-x-1/2 font-medium text-slate-700/70"
    >
      <span>
        {{ images.selectedIdx + 1 + " / " + imagesList.length }}
      </span>
    </div>
  </Teleport>
</template>

<script>
import { reactive, ref } from "vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  props: {
    imagesList: { type: Array, default: () => [] },
    sizeWindow: {
      type: String,
      required: false,
      default: () => "l",
      validator: (value) => ["m", "l", "f"].includes(value),
    },
    float: {
      type: String,
      required: false,
      default: () => "left",
      validator: (value) => ["right", "left"].includes(value),
    },
    item: {
      type: String,
      required: false,
      default: () => "",
    },
  },
  setup() {
    const { t } = useLangConfiguration();

    const images = reactive({
      selectedIdx: 0,
      next: function (length) {
        let next = this.selectedIdx + 1;
        if (length <= next) next = 0;
        this.selectedIdx = next;
      },
      pref: function (length) {
        let pref = this.selectedIdx - 1;
        if (pref < 0) pref = length - 1;
        this.selectedIdx = pref;
      },
    });

    const refComp = ref(null);

    return { images, t, refComp };
  },
};
</script>

<style></style>
