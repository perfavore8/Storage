import router from "@/router";
import { reactive } from "vue";

const config = reactive({
  type: "",
  value: "",
});
export function useFollowAnalytics() {
  const dropConfig = () => {
    config.type = "";
    config.value = "";
  };

  const followStep1 = (type, value) => {
    config.type = type;
    config.value = value;
    router.push("/analytics");
  };

  const followStep2 = (fields, selectField, apply) => {
    const Field = fields.find((field) => field.name === config.type);
    if (Field === undefined || !config.type || !config.value) {
      dropConfig();
      return;
    }
    selectField(
      { name: config.value, value: config.value },
      Field.name,
      Field.id
    );
    apply();
    dropConfig();
  };

  return { followStep1, followStep2 };
}
