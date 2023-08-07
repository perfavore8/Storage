<template>
  <ol role="list" class="flex items-center gap-4">
    <li v-for="(page, idx) in pages" :key="page.id">
      <div
        class="hover:text-gray-700 font-medium text-sm flex items-center"
        :class="[
          idx === 0
            ? 'text-gray-400'
            : idx === pages.length - 1
            ? 'text-gray-700'
            : 'text-gray-500',
        ]"
      >
        <span v-if="idx !== 0">/</span>
        <a
          aria-current="page"
          :class="{
            'ml-4': idx !== 0,
            'cursor-pointer': idx !== pages.length - 1,
          }"
          :ref="(el) => (linkRefs[idx] = el)"
          @click="page.select()"
        ></a>
      </div>
    </li>
  </ol>
</template>

<script>
import { onMounted, reactive } from "vue";
export default {
  props: {
    pages: { type: Array, required: true },
  },
  setup(props) {
    onMounted(() => {
      props.pages.forEach((page, idx) => (linkRefs[idx].innerHTML = page.text));
    });

    const linkRefs = reactive([]);

    return { linkRefs };
  },
};
</script>

<style></style>
