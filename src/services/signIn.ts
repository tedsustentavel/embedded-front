import { api } from "./api";

export async function userAuth(username: string, password: string) {
  const result = await api.post("/auth", { username, password });

  return result;
}
