import { EncodedData as User } from "@/models/user/user";
import { Data as Friend } from "@/models/user/friend";

export type Get = User;

export type GetFriends = Friend[];

export interface GetStatus {
  status: boolean | number;
}
