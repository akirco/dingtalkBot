import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import 'nprogress/nprogress.css'
import nProgress from "nprogress";

nProgress.configure({
  showSpinner:false,
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
});

router.beforeEach((to,from,next)=>{
  console.log(to);
  nProgress.start();
  next()
});

router.afterEach((to,from,failure)=>{
  nProgress.done();
})

export default router;
