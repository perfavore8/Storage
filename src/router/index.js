import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

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
    path: "/authorization",
    name: "authorization",
    component: () => import("../views/AuthorizationView.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("get_account");
  const account = store.state.account?.account;
  if (!account?.install && to.path != "/Error_is_not_installed")
    next("/Error_is_not_installed");
  if (
    (account?.install && to.path == "/Error_is_not_installed") ||
    (!account?.expired && to.path == "/Error_is_expired")
  )
    next("/");
  if (account?.expired && to.path != "/Error_is_expired")
    next("/Error_is_expired"); // не забудь переключить !expired => expired
  if (to.path == "/") {
    if (account.id == 148) {
      next("/documents");
    } else {
      next("/orders");
    }
  } else next();
});

export default router;
