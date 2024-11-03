import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import cms from "./cms";
import order from "./order";
import { getToken } from "@/utils/auth";

const pages: any = import.meta.glob("../views/**/*.vue");
console.log(pages);
const routes = Object.keys(pages).map((item: any) => {
  let str = item.match(/\/views(.*)\.vue$/)[1].toLowerCase();
  // console.log(str, "str");
  // if (str.substring(str.length - 5) == "index") {
  //   str = str.slice(0, -5); //去掉最后的index
  // }

  const path = str.replace("/index", "") || "/";
  const name = str.substring(1).replace(/\//g, ".");
  // console.log(`path: ${path}, name: ${name}`);

  return {
    path,
    component: pages[item],
    name: name.replace(/.index/g, ""),
  };
});
console.log(routes,pages,"routes",);
export const router = createRouter({
  history: createWebHashHistory(),
  routes: unique([
    ...routes,
    ...order,
    ...cms,
    // {
    //   path: "/",
    //   name: "index",
    //   component: pages['index'],
    // },
  ]),
});

function unique(arr: RouteRecordRaw[]): RouteRecordRaw[] {
  const temp: Record<string, RouteRecordRaw> = {};
  arr.forEach((item) => {
    temp[item.path] = item;
  });
  const newRoutes = Object.entries(temp).map((item) => item[1]);
  return newRoutes;
}

const whiteList = ["/login", "/register"];

router.beforeEach((to, from, next) => {
  const token = getToken();
  if (!token) {
    if (!whiteList.includes(to.path)) {
      return next({ path: "/login" });
    }
  }

  next();
});
