import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/views/LandingPage.vue";
import "nprogress/nprogress.css";
import nProgress from "nprogress";

nProgress.configure({
  showSpinner: false,
  easing: "ease",
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          component: () => import("@/views/AboutView.vue"),
        },
        {
          path: "/link",
          name: "link",
          component: () => import("@/views/LinkView.vue"),
        },
      ],
    }
  ],
});

router.beforeEach((to, from, next) => {
  nProgress.start();
  next();
});

router.afterEach((to, from, failure) => {
  nProgress.done();
});

export default router;
