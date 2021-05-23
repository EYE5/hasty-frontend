import axios from "axios";

import * as requests from "./requests";
import * as responses from "./responses";

export async function login(data: requests.Login): Promise<responses.Login> {
  const res = await axios.post("/login", data);

  return res.data;
}

export async function register(data: requests.Register) {
  await axios.post("/register", data);
}

export async function refresh(
  data: requests.Refresh
): Promise<responses.Refresh> {
  const res = await axios.post("/refresh", data);

  return res.data;
}
