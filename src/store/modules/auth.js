import { BaseURL, cacheName } from "@/composables/BaseURL";
import { usePreparationQueryParams } from "@/composables/preparationQueryParams";
const { preparation_params } = usePreparationQueryParams();

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async authLogin(context, params) {
      const url = BaseURL + "auth/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const json = await res.json();

      if (json.success && json.access_token) {
        // Сохранение переменной в кэше
        caches
          .open(cacheName)
          .then((cache) => {
            const key = "TOKEN";
            const value = json.access_token;
            const data = new Response(value);

            cache.put(key, data);

            if (process.env.NODE_ENV === "development")
              console.log("Сохраненная переменная в кэш:", value);
          })
          .catch((err) => {
            if (process.env.NODE_ENV === "development")
              console.error("Ошибка при сохранении переменной в кэш:", err);
          });
      }

      return json;
    },
    async authRegistration(context, params) {
      const url = BaseURL + "auth/sign-up";
      const res = await fetch(url + preparation_params(params));
      if (!res.ok) return { success: false };
      const json = await res.json();

      return json;
    },
  },
};
