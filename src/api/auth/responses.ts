import { Data as User } from "@/models/user/user";
import { Tokens } from "@/models/auth/tokens";

export interface Login {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type Refresh = Tokens;
