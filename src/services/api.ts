import axios from "axios";

const STORAGE_KEY = "@webserver-baseurl";
const FALLBACK_BASE = "http://192.168.4.1";

function computeDefaultBase() {
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    // Se estiver rodando direto do dispositivo (HTTP), usar a própria origem
    if (window.location.protocol === "http:") {
      return origin;
    }
  }
  return FALLBACK_BASE;
}

function normalizeBase(input?: string | null) {
  if (!input) return computeDefaultBase();
  const trimmed = input.trim();
  if (!trimmed) return computeDefaultBase();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `http://${trimmed}`;
}

const initialBaseURL = normalizeBase(
  typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : FALLBACK_BASE
);

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
