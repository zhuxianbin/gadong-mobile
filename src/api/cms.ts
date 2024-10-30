import request from "./request";
// api / one_page ? type = 4

export const cms = {
  info(params: { id: string }) {
    return request({
      url: "/api/one_page",
      params,
    });
  },
  list(params: { type: string | string[] }) {
    return request({
      url: "/api/list_page",
      params,
    });
  },
};
