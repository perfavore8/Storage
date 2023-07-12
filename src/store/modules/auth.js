import { BaseURL, cacheName } from "@/composables/BaseURL";

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
          })
          .catch((err) => {
            console.error("Ошибка при сохранении переменной в кэш:", err);
          });
      }

      return json;
    },
  },
};
