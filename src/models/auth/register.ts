import {
  Base,
  BaseModel,
  mix,
  Validate,
  mixValidate,
  ValidatePrivate,
  ValidationBase,
} from "@vueent/mix-models";
import v9s from "@/vendor/v9s";

export interface Data {
  username: string;
  password: string;
}

class DataModel extends BaseModel<Data> {}

const validations = {
  username: v9s.minLength(1, "Введите имя пользователя.").check,
  password: v9s.minLength(1, "Введите пароль.").check,
};

export interface Validations extends ValidationBase {
  readonly c: {
    username: ValidationBase;
    password: ValidationBase;
  };
}

export interface Model extends DataModel, ValidatePrivate<Validations> {}

export class Model extends mix<Data, typeof DataModel>(
  DataModel,

  mixValidate<Data, typeof DataModel, Validations>(validations)
) {
  constructor(initialData?: Data, react = true) {
    super("name", initialData ?? { username: "", password: "" }, react);
  }
}

export type ModelType = Base<Data> & Validate<Validations>;

export function create(basicData?: Data, react = true) {
  return new Model(basicData, react) as ModelType;
}
