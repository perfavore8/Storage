import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  { path: "/", redirect: "/home" },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
