import { tracked, calculated } from "@vueent/reactive";
import { Service, registerService } from "@vueent/core";

export default class LoadingService extends Service {
  @tracked private _loading = false;

  @calculated public get loading() {
    return this._loading;
  }

  public setLoading(value: boolean) {
    this._loading = value;
  }
}

registerService(LoadingService);
