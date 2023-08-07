<template>
  <div class="list flex flex-row flex-wrap gap-6">
    <div
      v-for="(item, idx) in list"
      :key="item.id"
      class="card grow w-fit p-5 flex flex-col bg-white rounded-xl border border-solid border-slate-200/70 shadow-lg shadow-gray-400/10"
    >
      <div class="header mb-2">
        <h2 class="text-xs text-gray-400 font-semibold">{{ item.header }}</h2>
      </div>
      <div class="flex justify-between items-center gap-1">
        <div class="text" :ref="(el) => (textRefs[idx] = el)">
          <span class="text-sm text-slate-500">
            <span class="text-3xl test-slate-800 font-semibold">
              {{ item.firstNumber }}
            </span>
            из {{ item.secondNumber }}
          </span>
        </div>
        <div class="stat">
          <div
            v-if="item.stat"
            class="p-1 text-[10px] rounded flex items-center"
            :class="{
              'bg-green-50 text-green-700': item.stat.direction === 1,
              'bg-red-50 text-red-700': item.stat.direction === 0,
              'bg-gray-50 text-gray-600': item.stat.direction === 2,
            }"
          >
            <span class="inline-flex flex-row gap-1 items-center">
              <svg
                v-if="item.stat?.direction === 0"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path
                    d="M7.53 9.47a.75.75 0 0 0-1.06 1.06l2.293 2.293a1.75 1.75 0 0 0 2.474 0l1.586-1.586a.25.25 0 0 1 .354 0l2.012 2.013H14.5a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 .75-.75v-2.5a.75.75 0 0 0-1.5 0v.69l-2.013-2.013a1.75 1.75 0 0 0-2.474 0l-1.586 1.586a.25.25 0 0 1-.354 0L7.53 9.47Z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.943 1.25c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19h-.114ZM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62Z"
                    clip-rule="evenodd"
                  />
                </g>
              </svg>
              <svg
                v-else-if="item.stat?.direction === 1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <g fill="currentColor">
                  <path
                    d="M13.75 10c0 .414.336.75.75.75h.69l-2.013 2.013a.25.25 0 0 1-.354 0l-1.586-1.586a1.75 1.75 0 0 0-2.474 0L6.47 13.47a.75.75 0 1 0 1.06 1.06l2.293-2.293a.25.25 0 0 1 .354 0l1.586 1.586a1.75 1.75 0 0 0 2.474 0l2.013-2.012v.689a.75.75 0 0 0 1.5 0V10a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75Z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M11.943 1.25c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19h-.114ZM3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62Z"
                    clip-rule="evenodd"
                  />
                </g>
              </svg>
              {{ item.stat?.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
export default {
  props: { list: { type: Array, required: false } },
  setup(props) {
    onMounted(() => {
      props.list.forEach((item, idx) =>
        item.needInsertTest ? (textRefs[idx].innerHTML = item.text) : null
      );
    });
    const textRefs = reactive([]);

    return { textRefs };
  },
};
</script>

<style lang="scss" scoped>
.card {
  word-wrap: break-word;
  flex: 1 1 auto;
}
</style>
