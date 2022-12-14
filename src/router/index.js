import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  // { path: "/", redirect: "/home" },
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
    path: "/instructions",
    name: "instructions",
    component: () => import("../views/InstructionsView.vue"),
  },
  {
    path: "/genezis",
    name: "genezis",
    component: () => import("../views/GenezisView.vue"),
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
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch("get_account");
  if (
    !store.state.account?.account?.install &&
    to.path != "/Error_is_not_installed"
  )
    next("/Error_is_not_installed");
  if (
    (store.state.account?.account?.install &&
      to.path == "/Error_is_not_installed") ||
    (!store.state.account?.account?.expired && to.path == "/Error_is_expired")
  )
    next("/");
  if (!store.state.account?.account?.expired && to.path != "/Error_is_expired")
    next("/Error_is_expired"); // не забудь переключить !expired => expired
  else next();
});

export default router;
