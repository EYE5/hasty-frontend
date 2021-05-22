import { Base, BaseModel } from "@vueent/mix-models";

import { Data as Message } from "@/models/message/message";

export interface Data {
  name: string;
  users: string[];
  messages: Message[];
  avatar?: string;
}

class DataModel extends BaseModel<Data> {}

export class Model extends DataModel {
  constructor(initialData?: Data, react = true) {
    super("name", initialData ?? { name: "", users: [], messages: [] }, react);
  }
}

export type ModelType = Base<Data>;

export function create(basicData?: Data, react = true) {
  return new Model(basicData, react) as ModelType;
}
