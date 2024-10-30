<template>
  <div class="rounded px-[15px] py-[5px] bg-[#fff]">
    <div class="user-order">
      <div class="user-service my-[15px]">
        <img src="/static/images/order/order_uu.png" />
        <span>客服ID：<span id="uuid">100260</span></span>
        <span class="copy" @click="onCopyClick('uuid')">复制</span>
      </div>
      <div class="user-service my-[15px]">
        <img src="/static/images/order/order_weixin.png" />
        <span>微信：<span id="wx">jun_168518</span></span>
        <span class="copy" @click="onCopyClick('wx')">复制</span>
      </div>
      <div class="user-service my-[15px]">
        <img src="/static/images/order/order_mobile.png" />
        <span>联系电话：<span id="phone">18906666621</span></span>
        <span class="copy" @click="onCopyClick('phone')">复制</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast } from "vant";

function onCopyClick(elementId: any) {
  const range = document.createRange();
  range.selectNode(document.getElementById(elementId) as any);
  const selection: any = window.getSelection();
  //移除之前选中内容
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  showSuccessToast("复制成功");
  selection.removeAllRanges();
}
</script>

<style scoped lang="less">
.user-order {
  .user-service {
    .copy {
      font-size: 11px;
      color: #999999;
      margin-left: 30px;
      background-color: #f5f5f5;
      border-radius: 8px;
      padding: 2px 6px;
    }
    img {
      width: 20px;
      height: 20px;
    }
    span {
      vertical-align: top;
      margin-top: 10px;
      margin-left: 14px;
      font-size: 14px;
      font-weight: 400;
      color: #1c1c1c;
      line-height: 22px;
    }
  }
}
</style>
