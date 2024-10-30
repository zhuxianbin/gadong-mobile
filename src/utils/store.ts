import store from "store";
const keyName = "uu-";

/**
 * 存储localStorage
 */
export const setStore = (name: string, content: string) => {
  return store.set(keyName + name, content);
};
/**
 * 获取localStorage
 */

export const getStore = (name: string) => {
  return store.get(keyName + name);
};
/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  return store.remove(keyName + name);
};

/**
 * 清空全部localStorage
 */
export const clearStore = () => {
  return store.clearAll();
};
