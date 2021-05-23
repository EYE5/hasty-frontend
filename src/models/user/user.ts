import { Base, BaseModel } from "@vueent/mix-models";

import { Data as Chat } from "@/models/chat/chat";
import { ModelType as Friend, Data as FriendEncoded } from "./friend";

export interface Data {
  id?: "";
  username: string;
  userInfo: string;
  chats: Chat[];
  friends: Friend[];
  avatar?: string;
}

export interface EncodedData {
  id?: "";
  username: string;
  userInfo: string;
  chats: Chat[];
  friends: FriendEncoded[];
  avatar?: string;
}

class DataModel extends BaseModel<Data> {}

export class Model extends DataModel {
  constructor(initialData?: Data, react = true) {
    super(
      "name",
      initialData ?? {
        username: "",
        userInfo: "",
        chats: [],
        friends: [],
      },
      react
    );
  }
}

export type ModelType = Base<Data>;

export function create(basicData?: Data, react = true) {
  return new Model(basicData, react) as ModelType;
}
