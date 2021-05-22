import { Data } from "@/models/auth/login";

export type Login = Data;

export interface Register {
  username: string;
  password: string;
}

export interface Refresh {
  refreshToken: string;
}
