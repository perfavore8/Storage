import router from "@/router";
import { ref, watch } from "vue";
import { TOKEN } from "../composables/BaseURL";

export function usePhoneCode() {
  const phoneCode = ref();

  const codeLength = 6;

  watch(phoneCode, () => {
    const str = `${phoneCode.value}`;
    if (str.length == codeLength) {
      if (str === "111111") {
        localStorage.setItem(
          "SalesUpAuthToken",
          JSON.stringify(TOKEN.split(" ")[1])
        );
        router.push("/");
      }
    }
    if (str.length > codeLength) {
      phoneCode.value = parseInt(str.slice(0, codeLength));
    }
  });

  return { phoneCode, codeLength };
}
