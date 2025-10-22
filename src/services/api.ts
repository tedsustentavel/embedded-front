import axios from "axios";

const STORAGE_KEY = "@webserver-baseurl";
const DEFAULT_BASE = "http://192.168.4.1";

function normalizeBase(input?: string | null) {
  if (!input) return DEFAULT_BASE;
  const trimmed = input.trim();
  if (!trimmed) return DEFAULT_BASE;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `http://${trimmed}`;
}

const initialBaseURL = normalizeBase(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : DEFAULT_BASE);

export const api = axios.create({
  baseURL: initialBaseURL,
});

export function setApiBaseURL(base: string) {
  const normalized = normalizeBase(base);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, normalized);
  }
  api.defaults.baseURL = normalized;
}
