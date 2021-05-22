import { Base, BaseModel } from "@vueent/mix-models";

import { Data as Chat } from "@/models/chat/chat";

export interface Data {
  username: string;
  userInfo: string;
  lastOnline: number;
  online: boolean;
  chats: Chat[];
  friends: string[];
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
        online: false,
        lastOnline: Date.now(),
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
