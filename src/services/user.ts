import { tracked, calculated } from "@vueent/reactive";
import { Service, registerService } from "@vueent/core";

import * as api from "@/api/user";
import {
  ModelType as UserModel,
  create as createUserModel,
  Data as User,
} from "@/models/user/user";

import { create as createFriendModel } from "@/models/user/friend";

export default class UserService extends Service {
  @tracked private _item?: UserModel;

  @calculated public get item() {
    console.log("calculated", this._item);
    return this._item;
  }

  public setItem(data: User) {
    this._item = createUserModel(data);
  }

  public free() {
    this._item?.destroy();
    this._item = undefined;
  }

  public async getUser(id?: string) {
    console.log(id);

    if (!this._item?.data.id && !id) return;

    const userId = id ? id : this._item!.data.id;

    let res;

    try {
      res = await api.get({ id: userId! });
    } catch (error) {
      return;
    }

    const friends = res.friends.map((item) => createFriendModel(item));

    this._item = createUserModel({
      ...res,
      friends,
    });

    console.log(this._item);
  }

  public async getFriends() {
    if (!this._item?.data.id) return;

    const id = this._item.data.id;

    let res;

    try {
      res = await api.getFriends({ id });
    } catch (error) {
      return;
    }

    this._item.data.friends.map((friend) => friend.destroy());
    this._item.data.friends = [];
    this._item.data.friends = res.map((friend) => createFriendModel(friend));
  }

  public async updateStatus() {
    if (!this._item?.data.id) return;

    const id = this._item.data.id;

    try {
      await api.updateStatus({ id });
    } catch (error) {
      return;
    }
  }

  public async getStatus(id: string) {
    if (!this._item) return;

    let res;

    try {
      res = await api.getStatus({ id });
    } catch (error) {
      return;
    }

    const idx = this._item?.data.friends.findIndex(
      (item) => item.data.id === id
    );

    if (!idx) return;

    if (typeof res === "boolean")
      this._item.data.friends[idx].data.online = res;
    else if (typeof res === "number") {
      this._item.data.friends[idx].data.online = false;
      this._item.data.friends[idx].data.lastOnline = res;
    }
  }
}

registerService(UserService);
