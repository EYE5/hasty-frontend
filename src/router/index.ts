import { useService } from "@vueent/core";
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  RouteRecordRaw,
} from "vue-router";
import Login from "@/routes/login.vue";
import Register from "@/routes/register.vue";
import Chats from "@/routes/chats.vue";

import AuthorizationService from "@/services/authorization";

function ifNotAuthenticated() {
  const authenticated = Boolean(useService(AuthorizationService).item);

  if (!authenticated) return "/login";
}

function ifAuthenticated() {
  const authenticated = Boolean(useService(AuthorizationService).item);

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
  {
    path: "/",
    name: "Chats",
    component: Chats,
    beforeEnter: ifNotAuthenticated,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
