import request from "./request";
/** 充值列表*/
export function queryGoodsList(data: any) {
  return request.post("/api/iosGoodsList", data);
}

/**
 * 兑换记录
 * @param {*} data
 * @returns
 * @Field("user_id") String user_id,
 * @Field("page") String page
 */
export function exchange_log(data: any) {
  return request.post("/api/exchange_log", data);
}

export function exchangeConfigPlus() {
  return request.get("/api/exchangeConfigPlus");
}
/**
 * 金币兑换记录
 */
export function jb_exchange_log(data: any) {
  return request.post("/api/jb_exchange_log", data);
}

/**
 * 兑换列表
 */
export function jb_exchange_list(data: any) {
  return request.post("/api/jb_exchange_list", data);
}

/**
 * 金币兑换
 */
export function jb_exchange(data: any) {
  return request.post("/api/jb_exchange", data);
}
/**
 * 米钻兑换
 */
export function mz_exchange(data: any) {
  return request.post("/api/mz_exchange", data);
}

/**
 * 混合兑换
 */
export function both_exchange(data: any) {
  return request.post("/api/both_exchange", data);
}

/**
 * 获取积分可兑换的礼物
 */
export function getAwardWaresList(data: any) {
  return request.post("/api/getAwardWaresList", data);
}

/**
 * 积分兑换礼物
 */
export function actionAwardExchange(data: any) {
  return request.post("/api/actionAwardExchange", data);
}

/**
 * 支付宝，微信
 * 1支付宝2微信
 */
export function rechargePay(data: any) {
  return request.post("/api/rechargePay", data);
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

export function gold_ranking(data: any) {
  return request.post("/api/gold_ranking", data);
}

// 获取月排行列表
export function getMonthRankList(data: any) {
  return request.post("/api/jb_vip_month_now", data);
}
// 获取月排行列表
export function jb_vip_month(data: any) {
  return request.post("/api/jb_vip_month", data);
}
