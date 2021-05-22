import { Base, BaseModel } from "@vueent/mix-models";

export interface Data {
  text: string;
  media?: unknown[];
  user: string;
  date: number;
}

class DataModel extends BaseModel<Data> {}

export class Model extends DataModel {
  constructor(initialData?: Data, react = true) {
    super(
      "name",
      initialData ?? { text: "", user: "", date: Date.now() },
      react
    );
  }
}

export type ModelType = Base<Data>;

export function create(basicData?: Data, react = true) {
  return new Model(basicData, react) as ModelType;
}
