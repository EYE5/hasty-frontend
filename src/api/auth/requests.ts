import { Data as LoginData } from "@/models/auth/login";
import { Data as RegisterData } from "@/models/auth/register";

export type Login = LoginData;

export type Register = RegisterData;

export interface Refresh {
  refreshToken: string;
  id: string;
}
