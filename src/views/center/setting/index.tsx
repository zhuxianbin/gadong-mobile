import { cancellation } from "@/api/user";
import { showDialog } from "vant";

export async function doLogOff() {
  await showDialog({
    title: "申请注销账号",
    message() {
      return (<div class='text-[13px] leading-relaxed'>
        <div >为了保障您的账户、财产安全，请先确认一下信息</div>
        <div class='text-[15px] my-[10px]'>1、账户安全</div>
        <div class='indent'>账户注销后，您的身份信息、账号信息、用户权益、订单记录将被清空且无法恢复。</div>
        <div class='text-[15px] my-[10px]'>2、财产安全</div>
        <div class='indent'>账号注销后、该账号下记录将被清空，并不可恢复。再次注册成功后也无法挽回。</div>
        <div class='text-[#e7ac4b] my-[10px] indent'>点击下方的【确认注销】按钮 ，即表示您已认真阅读以上注意事项并确认注销</div>
      </div>);
    },
    messageAlign: "left",
    showCancelButton: true,
    confirmButtonText: "确认注销",
    cancelButtonText: "暂不注销"
  });
  await cancellation();
}
