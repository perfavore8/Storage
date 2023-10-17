<template>
  <div class="group/img relative w-fit h-fit" v-if="imagesList?.length">
    <img
      :src="imagesList[images.selectedIdx]"
      class="h-14 w-14 rounded-md"
      :alt="t('ostatki.error')"
    />
    <div
      class="hidden group-hover/img:block absolute z-[110] top-1/2 -translate-y-1/2 p-8 ring-1 ring-slate-500/50 rounded-xl bg-white"
      :class="[`h-${sizeWindow} w-${sizeWindow} ${float}-0`]"
    >
      <img
        :src="imagesList[images.selectedIdx]"
        class="w-full h-full rounded-xl"
        :alt="t('ostatki.error')"
      />
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
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useLangConfiguration } from "@/composables/langConfiguration";
export default {
  props: {
    imagesList: Array,
    sizeWindow: { type: Number, required: false, default: () => 52 },
    float: {
      type: String,
      required: false,
      default: () => "left",
      validator: (value) => ["right", "left"].includes(value),
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

    return { images, t };
  },
};
</script>

<style></style>
