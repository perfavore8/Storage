import { useCats } from "@/composables/cats";
import store from "@/store";
import { ref } from "vue";
import { computed, onMounted } from "vue";

export function useProductCard(copyItem, fields) {
  const { getAllFieldsInSubCat } = useCats();
  const allFieldsInSubCat = ref([]);

  const isLoading = ref(true);

  onMounted(async () => {
    isLoading.value = true;
    await store.dispatch("get_fields_properties");
    allFieldsInSubCat.value = getAllFieldsInSubCat(
      copyItem.fields?.category || copyItem.product?.fields?.category
    );
    isLoading.value = false;
  });

  const currentPrice = computed(() =>
    fields.find((el) => el.code === copyItem?.price_field)
  );

  const PRICES = computed(() => {
    const arr = [];
    fields.forEach((field) => {
      if (field.type === 11 && field?.lead_config?.visible)
        arr.push({ name: field.name, value: field.code });
    });
    return arr;
  });

  const IMAGES = computed(() => {
    const arr = [];
    fields.forEach((field) => {
      if (
        field.type === 15 &&
        field?.lead_config?.visible &&
        Array.isArray(copyItem.fields[field.code])
      )
        arr.push(...copyItem.fields[field.code]);
    });
    return arr;
  });

  return { allFieldsInSubCat, currentPrice, PRICES, IMAGES, isLoading };
}
