/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-console */
import { browser } from "./index";
// import { setToken } from "./auth";
// import Cookies from "js-cookie";
// const NativeKey = "xlg-native-object";

export function sendMessage(action: string, data = {}, callback: Function | undefined) {
  if (callback) {
    window[`fn_${action}` as any] = callback;
  }

  console.log("发送给app:", action, data);

  if (!!window.webkit) {
    console.log("判断到是原生浏览器");
    if (browser.ios) {
      console.log("判断到是原生ios浏览器");
      return window.webkit.messageHandlers[action].postMessage(data);
    }
    if (browser.android) {
      console.log("判断到是原生android浏览器");
      return window.webkit[action](JSON.stringify(data));
    }
  } else {
    console.log("判断当前不在app环境");
  }

  return console.log(action, data);
}

export function getNativeObject() {
  // let jsonStr = null;
  if (window.$app) {
    return window.$app;
  }

  const jsonStr = window.navigator.userAgent.split("&&")[1];
  // console.log(window.navigator.userAgent);
  return jsonStr ? JSON.parse(jsonStr) : {};
}

export function getToken() {
  return getNativeObject().token;
}

// export function openUrl(url) {
//   if (window["is-app-webview"])1231
//     return sendMessage("open", {
//       type: "web",
//       url
//     });

//   window.location.href = url;
// }

export function showMenu(list: any, cb?: Function) {
  //比如 list:["分享","编辑","收藏"]
  return sendMessage(
    "showMenu",
    {
      list,
    },
    cb
  );
}

// let userAgent = window.navigator.userAgent;

// Object.defineProperty(window.navigator, "userAgent", {
//   get: function() {
//     console.log(userAgent, "监听");
//     return userAgent;
//   },
//   set: function(value) {
//     console.log("监听到userAgent发生改变", value, this);
//     const { token } = getNativeObject();
//     token && setToken(token);
//     // archive.push({ val: temperature });
//   }
// });

export const native = {
  open(options?: any, cb?: Function) {
    return sendMessage("open", options, cb);
  },
  close(options?: any, cb?: Function) {
    return sendMessage("close", options, cb);
  },
};
