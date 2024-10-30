export default [
  {
    path: "/shop",
    name: "shop",
    component: {
      render: (h) => h("router-view"),
    },
    children: [
      // {
      //   path: "mizuan",
      //   name: "shop.mizuan",
      //   component: () => import("@/views/shop/mizuan"),
      // },
      {
        path: "exchange",
        name: "shop.exchange",
        component: () => import("@/views/shop/exchange"),
        meta: {
          title: "金币兑换",
        },
      },
      {
        path: "exchange/logs",
        name: "shop.exchange.logs",
        component: () => import("@/views/shop/exchange/logs"),
        meta: {
          title: "金币兑换记录",
        },
      },
      {
        path: "exchange/rank",
        name: "shop.exchange.rank",
        component: () => import("@/views/shop/exchange/rank"),
        meta: {
          title: "金币兑换记录",
        },
      },
      //   {
      //     path: "info/:id",
      //     name: "shop.info",
      //     component: () => import("@/views/cms/info"),
      //     props: true,
      //   },
    ],
  },
];
