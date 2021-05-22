import {
  Controller,
  registerController,
  injectService as service,
} from "@vueent/core";
import { tracked, calculated } from "@vueent/reactive";

import router from "@/router";
import { create as createLoginModel } from "@/models/auth/login";

import AuthorizationService from "@/services/authorization";

export default class LoginController extends Controller {
  @service(AuthorizationService) authorization!: AuthorizationService;

  @tracked private _item? = createLoginModel();

  @calculated public get loading() {
    return this.authorization.loading;
  }

  @calculated public get item() {
    return this._item;
  }

  public async login() {
    if (!this._item) return;

    this._item.v.touch();

    if (this._item.v.invalid) return;

    const { username, password } = this._item.data;

    try {
      await this.authorization.login(username, password);
    } catch (error) {
      return;
    }
    router.push("/");
  }

  public reset() {
    this._item?.destroy();
    this._item = undefined;
  }
}

registerController(LoginController);
