import request from "./request";
/** 登录*/
export function login(data: any) {
  return request({
    url: "/api/login",
    method: "post",
    data,
  });
}

/**
 * 获取验证码
 * @param data { phone: string; type: number }
 * @returns
 */
export function verification(data: { phone: string; type: "reg" | "" }) {
  return request.post("/api/verification", data);
}
/** 验证验证码*/
export function is_verification(data: any) {
  return request.post("/api/is_verification", data);
}
/** 注册*/
export function registered(data: any) {
  return request.post("/api/registered", data);
}
/** 第三方注册*/
export function OtherRegister(data: any) {
  return request.post("/api/OtherRegister", data);
}
/** 第三方登录*/
export function OtherLogin(data: any) {
  return request.post("/api/OtherLogin", data);
}

/** forget_pwd*/
export function forget_pwd(data: { phone: string; code: string; pass: string }) {
  return request.post("/api/forget_pwd", data);
}

/** 注销 */
export function cancellation() {
  return request.post("/api/cancellation");
}

export function vip_center() {
  return request.post("/api/vip_center");
}

export function level_center() {
  return request.post("/api/level_center");
}

export function get_user_info() {
  return request.post("/api/get_user_info", {});
}

export function my_store() {
  return request.post("/api/my_store", {});
}

// 充值记录
export function pay_order_list(data: any) {
  return request.post("/api/pay_order_list", data);
}

// 礼物收入记录
export function getUserGiftList(data: any) {
  return request.post("/api/getUserGiftList", data);
}

// 打赏礼物记录
export function getUserSendGiftList(data: any) {
  return request.post("/api/getUserSendGiftList", data);
}

// 提现记录
export function tixian_log(data: any) {
  return request.post("/api/tixian_log", data);
}

// 兑换记录
export function exchange_log(data: any) {
  return request.post("/api/exchange_log", data);
}

/**
 * 新手任务
 */
export function new_task(data: any) {
  return request.post("/api/new_task", data);
}

/**
 * 日常任务
 */
export function daily_task(data: any) {
  return request.post("/api/daily_task", data);
}
/**
 * 领取任务奖励
 */
export function recevice_task(data: any) {
  return request.post("/api/recevice_task", data);
}

/**
 * 兑换米砖
 */
export function exchange(data: { money: string }) {
  return request.post("/api/exchange", data);
}

/**
 * 签到展示
 */
export function show_sign() {
  return request.post("/api/show_sign");
}

/**
 * 签到
 */
export function sign() {
  return request.post("/api/sign");
}
