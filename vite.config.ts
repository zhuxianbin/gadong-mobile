import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";

const root = process.cwd();
const env = loadEnv("", root);
const { VITE_PROXY } = env;
const proxy = VITE_PROXY ? JSON.parse(VITE_PROXY) : {};
export default defineConfig({
  plugins: [vue(), vueJsx(), WindiCSS()],
  resolve: {
    alias: [
      {
        find: "@", // 别名
        replacement: resolve(__dirname, "src"), // 别名对应地址
      },
    ],
  },
  server: {
    // Listening on all local IPs
    host: true,
    // Load proxy configuration from .env
    proxy,
  },
});
