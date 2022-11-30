import { createRouter, createWebHashHistory } from "vue-router";

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
    path: "/genesis",
    name: "genesis",
    component: () => import("../views/GenesisView.vue"),
  },
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
