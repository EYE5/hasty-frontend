import { Base, BaseModel } from "@vueent/mix-models";

export interface Data {
  id: string;
  username: string;
  userInfo: string;
  lastOnline: number;
  online: boolean;
  avatar?: string;
}

class DataModel extends BaseModel<Data> {}

export class Model extends DataModel {
  constructor(initialData?: Data, react = true) {
    super(
      "name",
      initialData ?? {
        id: "",
        username: "",
        userInfo: "",
        online: false,
        lastOnline: Date.now(),
      },
      react
    );
  }
}

export type ModelType = Base<Data>;

export function create(basicData?: Data, react = true) {
  return new Model(basicData, react) as ModelType;
}
