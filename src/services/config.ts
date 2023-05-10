import { api } from "./api";

export async function getConfig() {
  const result = await api.get("/config");

  return result;
}

export async function postConfig() {
  const result = await api.post("/config");

  return result;
}
