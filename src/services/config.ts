import { api } from "./api";

export async function getSidebarPages() {
  const result = await api.get("/page/list", {
    headers: {
      // "Cache-Control": "no-cache",
      // "Pragma": "no-cache",
      "x-username": localStorage.getItem("@webserver-user"),
      "x-password": localStorage.getItem("@webserver-password"),
      
    },
  });

  return result;
}

export async function getConfig(pageName: string) {
  const result = await api.get(`/page/schema/${pageName}`, {
    headers: {
      // "Cache-Control": "no-cache",
      // "Pragma": "no-cache",
      "x-username": localStorage.getItem("@webserver-user"),
      "x-password": localStorage.getItem("@webserver-password"),
    },
  });

  return result;
}

export async function postConfig(pageName: string, data: any) {
  const result = await api.put(`/page/param/${pageName}`, data, {
    headers: {
      // "Cache-Control": "no-cache",
      // "Pragma": "no-cache",
      "x-username": localStorage.getItem("@webserver-user"),
      "x-password": localStorage.getItem("@webserver-password"),
    },
  });

  return result;
}
