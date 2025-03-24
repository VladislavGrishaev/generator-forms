import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
 history: createWebHistory(import.meta.env.BASE_URL),
 routes: [
  {
   path: "/",
   name: "login",
    // @ts-ignore
   component: () => import("../pages/login.vue"),
  },
  {
   path: "/feedback",
   name: "server_form",
    // @ts-ignore
   component: () => import("../pages/server_form.vue"),
  },
   {
     path: "/registration",
     name: "registration",
     // @ts-ignore
     component: () => import("../pages/registration.vue"),
   },
   {
     path: "/subscribe",
     name: "subscribe",
     // @ts-ignore
     component: () => import("../pages/subscribe.vue"),
   },
 ],
});

export default router;