import {
  Controller,
  registerController,
  injectService as service,
} from "@vueent/core";
import { tracked, calculated } from "@vueent/reactive";

import router from "@/router";
import { create as createLoginModel } from "@/models/auth/login";
import { Alert } from "@/models/utility/alert";

import AuthorizationService from "@/services/authorization";

export default class LoginController extends Controller {
  @service(AuthorizationService) authorization!: AuthorizationService;

  @tracked private _item? = createLoginModel();
  @tracked private _alert?: Alert;

  @calculated public get item() {
    return this._item;
  }

  @calculated public get alert() {
    return this._alert;
  }

  public async login() {
    if (!this._item) return;

    this._item.v.touch();

    if (this._item.v.invalid) return;

    this._alert = undefined;

    const { username, password } = this._item.data;

    try {
      await this.authorization.login(username, password);
    } catch (error) {
      this._alert = {
        type: "danger",
        title: "Ошибка авторизации",
        body: "Введенные данные пользователя не верны",
      };

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
