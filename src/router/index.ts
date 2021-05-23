import { useService } from "@vueent/core";
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Login from "@/routes/login.vue";
import Register from "@/routes/register.vue";

import UserService from "@/services/user";

function ifNotAuthenticated() {
  const authenticated = Boolean(useService(UserService).item);

  if (!authenticated) return "/login";
}

function ifAuthenticated() {
  const authenticated = Boolean(useService(UserService).item);

  if (authenticated) return "/";
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
