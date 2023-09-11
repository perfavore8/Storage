import store from "@/store";
import { computed } from "vue";

export const isTest = computed(() => store.state.account?.account?.id == 1);
