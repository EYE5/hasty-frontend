import axios from "axios";

import * as requests from "./requests";
import * as responses from "./responses";

export async function get(data: requests.Get): Promise<responses.Get> {
  const res = await axios.get(
    `/get_user?id=${data.id}${data.remote ? "remote=true" : ""}`
  );

  return res.data;
}

export async function getFriends(
  data: requests.GetFriends
): Promise<responses.GetFriends> {
  const res = await axios.get(`/get_friends?id=${data.id}`);

  return res.data;
}

export async function getStatus(
  data: requests.GetStatus
): Promise<responses.GetStatus> {
  const res = await axios.get(`/get_status?id=${data.id}`);

  return res.data;
}

export async function updateStatus(
  data: requests.UpdateStatus
): Promise<responses.GetStatus> {
  const res = await axios.post("/refresh_status", data);

  return res.data;
}
