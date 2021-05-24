import axios from "axios";
import { tracked, calculated } from "@vueent/reactive";
import {
  Service,
  registerService,
  injectService as service,
} from "@vueent/core";

import { Tokens } from "@/models/auth/tokens";
import * as api from "@/api/auth";
import UserService from "./user";

export interface RefreshWatcher {
  resolve: (tokens: Tokens) => void;
  reject: (reason?: unknown) => void;
}

export default class AuthorizationService extends Service {
  @service(UserService) user!: UserService;

  @tracked private _loading = false;
  @tracked private _tokens?: Tokens;
  private _refresherWatchers: RefreshWatcher[] = [];
  private _refreshing = false;

  @calculated public get loading() {
    return this._loading;
  }

  @calculated public get item() {
    return this.user.item;
  }

  constructor() {
    super();

    const { accessToken, refreshToken, id } = this.loadLocalData();

    if (accessToken && refreshToken) {
      this.updateTokens({ accessToken, refreshToken });
      this.user.getUser(id);
    }
  }

  public async login(username: string, password: string) {
    const res = await api.login({ username, password });

    const { accessToken, refreshToken, user } = res;

    this.user.setItem(user);

    this.saveLocalData(accessToken, refreshToken, user.id!);
  }

  public async register(username: string, password: string) {
    await api.register({ username, password });
  }

  public logout() {
    //TODO add route for logout

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");

    delete axios.defaults.headers.common["Authorization"];

    this.user.free();
  }

  public async refresh(topLevelError?: unknown): Promise<Tokens> {
    //TODO: Add username checking

    const { refreshToken, id } = this.loadLocalData();
    if (this._refreshing)
      return new Promise((resolve, reject) =>
        this._refresherWatchers.push({ resolve, reject })
      );

    this.setRefreshing(true);

    let tokens: Tokens;

    if (!refreshToken || !id) throw new Error("Could not load a refresh token");

    try {
      tokens = await api.refresh({ refreshToken, id });
    } catch (error) {
      this.setRefreshing(false);
      this.logout();

      throw topLevelError ?? error;
    }

    this._refresherWatchers.forEach((watcher) => watcher.resolve(tokens));
    this.setRefreshing(false);
    this.updateTokens(tokens, true);

    return tokens;
  }

  private setRefreshing(value: boolean) {
    this._refreshing = value;
    this._refresherWatchers = [];
  }

  private updateTokens(tokens: Tokens, save = false) {
    if (save) {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }

    this._tokens = tokens;

    axios.defaults.headers.common["Authorization"] = tokens.accessToken;
  }

  private loadLocalData() {
    const data: {
      refreshToken?: string;
      accessToken?: string;
      id?: string;
    } = {
      refreshToken: undefined,
      accessToken: undefined,
      id: undefined,
    };

    data.refreshToken = localStorage.getItem("refreshToken") ?? undefined;

    if (!data.refreshToken) return data;

    data.accessToken = localStorage.getItem("accessToken") ?? undefined;

    if (!data.accessToken) return data;

    data.id = localStorage.getItem("id") ?? undefined;

    if (!data.id) return data;

    return data;
  }

  private saveLocalData(accessToken: string, refreshToken: string, id: string) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("id", id);
  }
}

registerService(AuthorizationService);
