import Cookies from "js-cookie";
import { get_user_info_by_token } from "@/api";
import { setStore } from "./store";

const TokenKey = "uu-token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: any) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function ualogin() {
  const [, data] = navigator.userAgent.split("&&");
  if (data) {
    const native: any = JSON.parse(data);
    native.token && setToken(native.token);
    window["_native" as any] = native;

    // getUserInfoByToken();

    return native;
  }
  return {};
}

export function getNativeByUA() {
  const [, data] = navigator.userAgent.split("&&");
  if (data) {
    const native = JSON.parse(data);
    return native;
  }
  return {};
}

export async function getUserInfoByToken() {
  const token = getToken();
  if (token) {
    const { data } = await get_user_info_by_token(token);
    setStore("user", data);
    return Promise.resolve(data);
  }
  return Promise.resolve({});
}
