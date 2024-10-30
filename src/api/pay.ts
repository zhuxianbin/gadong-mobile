import request from "./request";

export function web_rechargePay(params: any) {
  return request.post("/api/web_rechargePay", params);
}
