import { createApp } from "vue";

import Equal from "equal-vue";
import "equal-vue/dist/style.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";
import { useService } from "@vueent/core";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import AuthorizationService from "./services/authorization";
import { API_ROOT } from "./constants";

axios.defaults.baseURL = API_ROOT;

const accessToken = localStorage.getItem("accessToken");

if (accessToken) axios.defaults.headers.common["Authorization"] = accessToken;

/**
 * Refreshes access token if it is expired.
 *
 * @async
 *
 * @param {object} failedRequest
 */
const refreshAuthLogic = async (failedRequest: {
  response: { config: { headers: Record<string, string> } };
}) => {
  const tokens = await useService(AuthorizationService).refresh(failedRequest);

  failedRequest.response.config.headers["Authorization"] = tokens.accessToken;
};

// register the refresh interceptor of tokens
createAuthRefreshInterceptor(axios, refreshAuthLogic);

const app: Record<string, any> = createApp(App)
  .use(router)
  .use(Equal)

  .mount("#app");

axios.interceptors.request.use((config) => {
  app.$Loading.start();

  return config;
});

axios.interceptors.response.use(
  (response) => {
    app.$Loading.finish();

    return response;
  },
  (error) => {
    app.$Loading.finish();

    return error;
  }
);
