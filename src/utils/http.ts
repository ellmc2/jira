import qs from "qs";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
  customConfig?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += qs.stringify(data);
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登陆" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// 一个函数如果想要使用其他hook的话，它本身就需要是一个hook。
export const useHttp = () => {
  const { user } = useAuth();
  // TODO: Parameters Utility type 理解
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
