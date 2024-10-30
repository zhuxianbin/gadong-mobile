import { createApp } from "vue";
import "virtual:windi.css";
import "animate.css";
import "vant/lib/index.css";
import "@/styles/index.less";
import App from "./App.vue";
import { router } from "./routers";
import { Lazyload, allowMultipleToast } from "vant";
import { getNativeByUA } from "./utils/auth";

allowMultipleToast();

async function setup() {
  const { debug } = getNativeByUA();

  const app = createApp(App);
  app.use(router);
  app.use(Lazyload);

  app.mount("#app");

  const { DEV } = import.meta.env;
  if (DEV || debug) {
    const VConsole = await import("vconsole");
    new VConsole.default();
  }

  return app;
}

setup();
