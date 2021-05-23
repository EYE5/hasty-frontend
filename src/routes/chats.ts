import {
  Controller,
  registerController,
  injectService as service,
} from "@vueent/core";
import { tracked, calculated } from "@vueent/reactive";

import router from "@/router";

import UserService from "@/services/user";

export default class ChatsController extends Controller {
  @service(UserService) user!: UserService;

  public get items() {
    return this.user.item?.data.chats;
  }

  public item() {
    return this.user.item;
  }
}

registerController(ChatsController);
