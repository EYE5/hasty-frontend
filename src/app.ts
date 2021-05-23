import { watch } from "vue";
import {
  Controller,
  registerController,
  injectService as service,
} from "@vueent/core";
import { calculated } from "@vueent/reactive";

import router from "@/router";

import UserService from "@/services/user";
import LoadingService from "./services/loading";

export default class AppController extends Controller {
  @service(UserService) user!: UserService;
  @service(LoadingService) loading!: LoadingService;

  @calculated public get authenticated() {
    return Boolean(this.user.item);
  }

  @calculated public get isLoading() {
    return this.loading.loading; //????
  }

  public init() {
    watch(
      () => this.authenticated,
      (state, prevState) => {
        if (prevState && !state) router.replace("/login");
        else if (!prevState && state) router.replace("/");
      },
      { immediate: true }
    );
  }
}

registerController(AppController);
