import axios from "axios";
import { tracked, calculated } from "@vueent/reactive";
import { Service, registerService } from "@vueent/core";

import { Tokens } from "@/models/auth/tokens";

import * as api from "@/api/auth";

export interface RefreshWatcher {
  resolve: (tokens: Tokens) => void;
  reject: (reason?: unknown) => void;
}

export default class AuthorizationService extends Service {
  @tracked private _loading = false;
  @tracked private _tokens?: Tokens;
  private _refresherWatchers: RefreshWatcher[] = [];
  private _refreshing = false;

  @calculated public get loading() {
    return this._loading;
  }

  constructor() {
    super();

    const { accessToken, refreshToken } = this.loadLocalData();

    if (accessToken && refreshToken) {
      this.updateTokens({ accessToken, refreshToken });
    }
  }

  public async login(username: string, password: string) {
    let res;

    try {
      res = await api.login({ username, password });
    } catch (error) {
      //TODO: Add alert system
      throw error;
    }

    const { accessToken, refreshToken, user } = res;
  }

  public async register(username: string, password: string) {
    let res;

    try {
      res = await api.register({ username, password });
    } catch (error) {
      return;
    }
  }

  public async refresh(topLevelError?: unknown): Promise<Tokens> {
    const { accessToken, refreshToken, username } = this.loadLocalData();

    if (
      username &&
      refreshToken &&
      accessToken
      // TODO: && !isEqual(this._accountModel?.data, username)
    ) {
      const tokens: Tokens = { accessToken, refreshToken };

      // TODO:this.updateAccountModel(account);
      this.updateTokens(tokens);

      return tokens;
    } else if (this._refreshing)
      return new Promise((resolve, reject) =>
        this._refresherWatchers.push({ resolve, reject })
      );

    this.setRefreshing(true);

    let tokens: Tokens;

    if (!refreshToken) throw new Error("Could not load a refresh token");

    try {
      tokens = await api.refresh({ refreshToken });
    } catch (error) {
      this.setRefreshing(false);
      // TODO:this.logout();

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
      localStorage.setItem("access-token", tokens.accessToken);
      localStorage.setItem("refresh-token", tokens.refreshToken);
    }

    this._tokens = tokens;

    axios.defaults.headers.common["Authorization"] = tokens.accessToken;
  }

  private loadLocalData() {
    const data: {
      refreshToken?: string;
      accessToken?: string;
      username?: string;
    } = {
      refreshToken: undefined,
      accessToken: undefined,
      username: undefined,
    };

    data.refreshToken = localStorage.getItem("refreshToken") ?? undefined;

    if (!data.refreshToken) return data;

    data.accessToken = localStorage.getItem("accessToken") ?? undefined;

    if (!data.accessToken) return data;

    data.username = localStorage.getItem("username") ?? undefined;

    if (!data.username) return data;

    return data;
  }
}

registerService(AuthorizationService);
