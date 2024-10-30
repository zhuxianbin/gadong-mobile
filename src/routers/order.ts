export default [
  {
    path: "/order",
    name: "order",
    redirect: "/order/home",
    component: () => import("@/views/order/index.vue"),
    children: [
      {
        path: "home",
        name: "order.home",
        meta: { title: "UU下单中心" },
        component: () => import("@/views/order/home.vue"),
      },
      {
        path: "mine",
        name: "order.mine",
        meta: { title: "我的" },
        component: () => import("@/views/order/mine.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/order/info/:id/:name",
    name: "order.info",
    meta: { keep_alive: true },
    component: () => import("@/views/order/info.vue"),
  },
  {
    path: "/order/pay/:id",
    name: "order.pay",
    meta: { title: "订单支付" },
    component: () => import("@/views/order/pay.vue"),
  },
  {
    path: "/order/list",
    name: "order.list",
    meta: { title: "我的订单" },
    component: () => import("@/views/order/list.vue"),
  },
];
