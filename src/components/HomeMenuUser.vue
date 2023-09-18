<template>
  <div
    class="cont z-[999] flex flex-col items-stretch rounded-xl absolute top-[200%] right-0 min-w-[300px] overflow-hidden shadow-lg shadow-slate-500/10 bg-white origin-top"
  >
    <router-link :to="'/profile'">
      <div
        class="head bg-big-stone-100 w-full p-3 flex flex-row gap-3 items-center min-h-[72px]"
      >
        <img
          src="https://cdn1.iconfinder.com/data/icons/people-49/512/_formal_mustache_man-01-1024.png"
          ref="img"
          class="rounded-full w-12"
          v-if="isImgLoaded"
        />
        <span
          v-else
          class="material-icons-outlined text-slate-600"
          style="font-size: 50px"
        >
          account_circle
        </span>
        <h1 class="whitespace-nowrap font-bold text-xl text-slate-700">
          {{ userName }}
        </h1>
      </div>
    </router-link>
    <div class="main">
      <ul class="text-slate-600">
        <li v-if="!inFrame">
          <ImportStuffSelector
            class="!w-full"
            :options_props="availableUserAccounts.list"
            :selected_option="availableUserAccounts.selected"
            @select="(option) => availableUserAccounts.select(option.id)"
          />
        </li>
        <li @click="logOut()" v-if="!inFrame">
          <span class="material-icons-outlined"> logout </span>
          <span>{{ $t("HomeMenuUser.logout") }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import store from "@/store";
import { useLogOut } from "@/composables/logOut";
import { inFrame } from "@/composables/checkInFrame";
import { useAvailableUserAccounts } from "@/composables/availableUserAccounts";
import ImportStuffSelector from "./ImportStuffSelector.vue";

export default {
  components: { ImportStuffSelector },
  setup() {
    const { logOut } = useLogOut();
    const { availableUserAccounts } = useAvailableUserAccounts();

    const userName = computed(() => store.state.account.user?.name);

    const isImgLoaded = ref(true);
    const img = ref(null);
    onMounted(() => {
      img.value.onerror = () => (isImgLoaded.value = false);
    });

    return {
      userName,
      img,
      isImgLoaded,
      logOut,
      inFrame,
      availableUserAccounts,
    };
  },
};
</script>

<style>
ul {
  @apply space-y-2 cursor-pointer;
}
li {
  @apply h-[42px] flex flex-row items-center justify-start py-2 px-3 gap-3 hover:bg-slate-50 transition-all;
}
</style>
