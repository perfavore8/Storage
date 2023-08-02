import { createRouter, createWebHashHistory } from "vue-router";
import { haveAnyTOKEN, useRedirectToAuth } from "@/composables/BaseURL";
import store from "../store";
import { useCheckDevMode } from "@/composables/checkDevMode";

const { isDev } = useCheckDevMode();
const { isTokenFail } = useRedirectToAuth();

const routes = [
  {
    path: "/remnants",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/qwe",
    name: "qwe",
    component: () => import("../views/QweView.vue"),
  },
  {
    path: "/archive",
    name: "archive",
    component: () => import("../views/ArchiveView.vue"),
  },
  {
    path: "/analytics",
    name: "analytics",
    component: () => import("../views/AnalyticsView.vue"),
  },
  {
    path: "/documents",
    name: "documents",
    component: () => import("../views/DocumentsView.vue"),
  },
  {
    path: "/genezis",
    name: "genezis",
    component: () => import("../views/GenezisView.vue"),
  },
  {
    path: "/amoCRM",
    name: "amoCRM",
    component: () => import("../views/AmoCrmView.vue"),
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("../views/OrdersView.vue"),
  },
  {
    path: "/Error_is_not_installed",
    name: "Error_is_not_installed",
    component: () => import("../views/ErrorIsNotInstalledView.vue"),
  },
  {
    path: "/Error_is_expired",
    name: "Error_is_expired",
    component: () => import("../views/ErrorIsExpiredView.vue"),
  },
  {
    path: "/Error_token_not_valid",
    name: "NotValidToken",
    component: () => import("../views/NotValidToken.vue"),
  },
  {
    path: "/authorization",
    name: "authorization",
    component: () => import("../views/AuthorizationView.vue"),
  },
  {
    path: "/addToDeal",
    name: "addToDeal",
    component: () => import("../views/AddToDealView.vue"),
  },
  {
    path: "/clients",
    name: "clients",
    component: () => import("../views/ClientsView.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (!haveAnyTOKEN() && to.path !== "/authorization") {
    next("/authorization");
    return;
  }
  if (to.path == "/authorization") {
    if (haveAnyTOKEN() && !isDev.value) {
      next(from.path === "/authorization" ? "/" : from.path);
      return;
    }
    next();
    return;
  }

  if (
    from.path === "/Error_token_not_valid" &&
    to.path !== "/Error_token_not_valid" &&
    isTokenFail.value
  ) {
    next("/Error_token_not_valid");
    return;
  }
  if (to.path === "/Error_token_not_valid" && !isTokenFail.value) {
    next("/");
    return;
  }

  const { res } = await store.dispatch("get_account");
  if (res.status == 403 && !haveAnyTOKEN()) {
    next("/authorization");
    return;
  }

  const account = store.state.account?.account;
  // if (!account?.install && to.path != "/Error_is_not_installed") {
  //   next("/Error_is_not_installed");
  //   return;
  // }

  if (
    // (account?.install && to.path == "/Error_is_not_installed") ||
    !account?.expired &&
    to.path == "/Error_is_expired"
  ) {
    next("/");
    return;
  }

  if (account?.expired && to.path != "/Error_is_expired") {
    next("/Error_is_expired"); // не забудь переключить !expired => expired
    return;
  }

  if (to.path == "/") {
    if (account.id == 148) {
      next("/documents");
      return;
    } else {
      next("/orders");
      return;
    }
  } else next();
});

export default router;
