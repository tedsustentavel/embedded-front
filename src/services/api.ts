import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:80",
  headers: { "x-username": "admin", "x-password": "admin" },
});
