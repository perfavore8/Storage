import store from "@/store";
import { reactive } from "vue";
import { computed } from "vue";

export function useCats() {
  const cats = computed(() => store.state.categories.fields_properties);
  const getSubCatsForId = (catId) => {
    const currentCat = cats.value.find((cat) => cat.id === catId);
    if (currentCat === undefined) return [];
    const res = [];
    currentCat.levels.forEach((id) => {
      if (id === 0) return;
      const cat = cats.value.find((el) => el.id === id);
      if (cat) res.push(cat);
    });
    return res;
  };

  const hash = reactive({});

  const getAllFieldsInSubCat = (catId) => {
    if (hash[catId]) return hash[catId];
    const res = [];
    const allCats = getSubCatsForId(catId);
    allCats.forEach((cat) => {
      if (!cat.fields_id_2?.length) return;
      cat.fields_id_2?.forEach((fieldId) => res.push(fieldId));
    });
    hash[catId] = res;
    return res;
  };

  return { getAllFieldsInSubCat };
}
