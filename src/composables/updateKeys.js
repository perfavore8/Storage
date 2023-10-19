import { ref } from "vue";

const OrderViewKey = ref(0);

export function useUpdateKeys() {
  return { OrderViewKey };
}
