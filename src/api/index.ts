import { showToast } from "vant";
import request from "./request";

/** 获取轮播*/
export function carousel(data: any) {
  return request.post("/api/carousel", data);
}
/** 获取热门列表*/
export function is_popular(data: any) {
  return request.post("/api/is_popular", data);
}

/**
 * * 排行榜
 * @Field("class") String type,
   @Field("type") String date,
   @Field("user_id") String user_id);
 */
export function ranking(data: any) {
  return request.post("/api/ranking", data);
}

/**
 *
 * @param url 目标下载接口
 * @param query 查询参数
 * @param fileName 文件名称
 * @returns {*}
 */
export function downBlobFile(url: any, query: any, fileName: any) {
  return request({
    url: url,
    method: "get",
    responseType: "blob",
    params: query,
  }).then((response: { data: any }) => {
    // 处理返回的文件流
    const blob = response.data;
    if (blob && blob.size === 0) {
      showToast("内容为空，无法下载");
      return;
    }
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    window.setTimeout(function () {
      URL.revokeObjectURL(blob);
      document.body.removeChild(link);
    }, 0);
  });
}

/** 获取家族详情*/
export function getFamilyDetail({ family_id }: any) {
  return request.post("/api/getFamilyDetail", { family_id });
}
/** 获取更多家族详情*/
export function getFamilyMoreList({ family_id }: any) {
  return request.post("/api/getFamilyMoreList", { family_id });
}
/** 获取我的家族*/
export function getMyFamilyInfo() {
  return request.post("/api/getMyFamilyInfo");
}

/** 退出群*/
export function actionQuitFamily({ family_id }: any) {
  return request.post("/api/actionQuitFamily", { family_id });
}

/** 申请加入家族*/
export function actionApplyFamily({ family_id }: any) {
  return request.post("/api/actionApplyFamily", { family_id });
}

export function get_user_info_by_token(token: any) {
  return request.post("/api/get_user_info_by_token", { token });
}

export function feedback(data: { content: string; img: string }) {
  return request.post("/api/feedback", data);
}
