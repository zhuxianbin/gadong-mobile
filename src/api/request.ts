import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { showLoadingToast, showFailToast, closeToast } from "vant";
// import Bowser from "bowser";
import { getStore } from "@/utils/store";
// import dayjs from "dayjs";
import { getToken, ualogin } from "@/utils/auth";
// import { toFormData, guid } from "@/utils";
// import router from "@/routers";

// window.Bowser = Bowser;
let loading: any = null;
const { VITE_GLOB_API_URL } = import.meta.env;

const service = axios.create({
  baseURL: VITE_GLOB_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    // "Content-Type": "x-www-form-urlencoded",
  },
  withCredentials: true,
});

service.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    config.loading = showLoadingToast({
      forbidClick: true,
      duration: 0,
    });

    const token = getToken();
    const user = getStore("user") || {};
    const uainfo = ualogin();
    config.headers["device"] = `${uainfo.device || "web"}.h5`;
    config.headers["version"] = uainfo.version || "";
    if (token) {
      config.headers.token = token;
    }

    config.data = config.data || {};
    if (user.id) {
      config.data.user_id = user.id;
    }
    // console.log(config.headers, "config.headers");
    if (config.headers["Content-Type"] === "multipart/form-data") {
      const fd = new FormData();

      for (const key in config.data) {
        const element = config.data[key];
        fd.append(key, element);
      }

      config.data = fd;
    }

    return config;
  },
  () => {
    closeToast();
  }
);
service.interceptors.response.use(
  (res: AxiosResponse | any) => {
    res.config.loading.close();
    const { code, message } = res.data;
    if (code === 1) {
      return res.data;
    }

    showFailToast(message || "未知错误");
    return Promise.reject(message);
  },
  (err: any) => {
    closeToast();
    showFailToast(err.msg || "未知错误,请联系开发者");
    return Promise.reject(err);
  }
);

export default service;
