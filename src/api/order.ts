import request from "./request";

export const order = {
  list(data: {}) {
    return request({
      url: "/api/game_class",
      method: "post",
      data,
    });
  },
  orderList(data: { page: number; page_size: number; status: number }) {
    return request({
      url: "/api/task_order_list",
      method: "post",
      data,
    });
  },
  createOrder(data: any) {
    return request({
      url: "/api/create_task_order",
      method: "post",
      data,
    });
  },
  cancelOrder(data: { id: any }) {
    return request({
      url: "/api/cancel_task_order",
      method: "post",
      data,
    });
  },
  finishOrder(data: { id: any }) {
    return request({
      url: "/api/finish_task_order",
      method: "post",
      data,
    });
  },
};
