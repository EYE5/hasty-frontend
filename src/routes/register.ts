import {
  Controller,
  registerController,
  injectService as service,
} from "@vueent/core";
import { tracked, calculated } from "@vueent/reactive";

import router from "@/router";
import { create as createRegisterModel } from "@/models/auth/register";
import { Alert } from "@/models/utility/alert";

import AuthorizationService from "@/services/authorization";

export default class RegisterController extends Controller {
  @service(AuthorizationService) authorization!: AuthorizationService;

  @tracked private _item? = createRegisterModel();
  @tracked private _alert?: Alert;

  @calculated public get item() {
    return this._item;
  }

  @calculated public get alert() {
    return this._alert;
  }

  public async register() {
    if (!this._item) return;

    this._item.v.touch();

    if (this._item.v.invalid) return;

    this._alert = undefined;

    const { username, password } = this._item.data;

    try {
      await this.authorization.register(username, password);
    } catch (error) {
      this._alert = {
        type: "danger",
        title: "Ошибка регистрации",
        body: "Пользователь с таким именем уже зарегистрирован",
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

registerController(RegisterController);
