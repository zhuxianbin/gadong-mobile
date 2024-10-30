import { RouterView } from "vue-router";

export default [
  // {
  //   path: "/cms",
  //   name: "cms",
  //   component: {
  //     template: `<router-view></router-view>`,
  //   },
  //   children: [
  {
    path: "/cms/list/:type",
    name: "cms.list",
    component: () => import("@/views/cms/index.vue"),
    props: true,
  },
  {
    path: "/cms/info/:id",
    name: "cms.info",
    component: () => import("@/views/cms/info.vue"),
    props: true,
  },
  //   ],
  // },
];
