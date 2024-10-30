<template>
  <div class="order-info">
    <div class="order-info-tip">请仔细填写您的信息</div>
    <div class="order-info-form">
      <div class="label"><span style="color: #ff0000">*</span>您的需求</div>
      <Field
        v-model="state.temp.needs"
        type="textarea"
        autosize
        clearable
        placeholder="游戏账号保养、天梯排位升段、日常任务服务、找大神一起玩、完美通关剧情"
      />
      <div class="label"><span style="color: #ff0000">*</span>联系方式</div>
      <Field v-model="state.temp.phone" type="tel" clearable placeholder="如微信号码、电话号码" />
      <div class="label"><span style="color: #ff0000">*</span>出价</div>
      <div>
        <Field
          v-model="state.temp.mz"
          style="width: calc(100% - 36px); display: inline-block"
          type="number"
          clearable
          placeholder="可联系客服评估价格"
        />
        <img
          style="width: 23px; vertical-align: top; margin-top: 20px; margin-left: 6px"
          src="/static/images/order/order_diamond.png"
        />
      </div>
      <div class="label">指定接单人</div>
      <Field v-model="state.temp.appoint" clearable placeholder="请输入" />
    </div>
    <div style="text-align: center">
      <Checkbox class="order-info-protocol" v-model="state.checked" shape="square">
        已阅读，并同意<span style="color: #490ddc" @click="onProtocolClick">
          《订单服务协议》
        </span>
      </Checkbox>
    </div>
    <div class="order-info-btn">
      <Button
        block
        round
        color="linear-gradient(136deg, #AD02E8 0%, #0D14D6 100%)"
        @click="onPayClick"
      >
        立即下单
      </Button>
    </div>
    <div class="order-info-btn">
      <Button block round plain color="#2512D9" @click="onCallClick">联系客服</Button>
    </div>
    <Popup v-model:show="state.serviceVisible" round position="bottom" class="service-info">
      <div class="title">客服</div>
      <div class="user-service">
        <img src="/static/images/order/order_uu.png" />
        <span>UUID：<span id="uuid">100260</span></span>
        <span class="copy" @click="onCopyClick('uuid')">复制</span>
      </div>
      <div class="user-service">
        <img src="/static/images/order/order_weixin.png" />
        <span>微信：<span id="wx">zhjsh921205</span></span>
        <span class="copy" @click="onCopyClick('wx')">复制</span>
      </div>
      <div class="user-service">
        <img src="/static/images/order/order_mobile.png" />
        <span>联系电话：<span id="phone">17695659687</span></span>
        <span class="copy" @click="onCopyClick('phone')">复制</span>
      </div>
    </Popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { showFailToast, showSuccessToast, Popup, Button, Checkbox, Field } from "vant";
import { getStore, setStore } from "@/utils/store";

import { useRouter, useRoute } from "vue-router";
import { reactive } from "vue";

const $router = useRouter();
const $route = useRoute();

const state = reactive<any>({
  serviceVisible: false,
  checked: false,
  temp: {
    type: "",
    type_name: "",
  },
});

onMounted(() => {
  document.title = `${$route.params.name || "UU下单"}`;
  state.temp = getStore("orderInfo") || {};
  state.temp.type = $route.params.id || "";
  state.temp.type_name = $route.params.name || "";
  setStore("orderInfo", "");
});

function onProtocolClick() {
  setStore("orderInfo", state.temp);
  window.location.href = "https://web.yiyougame.net/index/index/godlist?id=31";
}
function onCallClick() {
  state.serviceVisible = true;
}
function onCopyClick(elementId: any) {
  const range: any = document.createRange();
  range.selectNode(document.getElementById(elementId));
  const selection: any = window.getSelection();
  //移除之前选中内容
  if (selection.rangeCount > 0) selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  showSuccessToast("复制成功");
  selection.removeAllRanges();
}
function onPayClick() {
  if (!state.temp.needs) {
    showFailToast("请填写您的需求");
    return;
  }
  if (!state.temp.phone) {
    showFailToast("请填写联系方式");
    return;
  }
  if (!state.temp.mz) {
    showFailToast("请填写出价");
    return;
  }
  if (!state.checked) {
    showFailToast("请先阅读并勾选协议");
    return;
  }
  $router.push({
    name: "order.pay",
    params: { info: state.temp },
  });
}
</script>

<style lang="less" scoped>
.order-info {
  height: 100vh;
  overflow: auto;
  background: linear-gradient(180deg, #78ccff 0%, #c8bbfc 100%);

  .order-info-tip {
    display: inline-block;
    background: linear-gradient(136deg, #ad02e8 0%, #0d14d6 100%);
    border-radius: 0 20px 0 0;
    padding: 5px 35px 5px 13px;
    margin-top: 12px;
    margin-left: 18px;

    font-size: 17px;
    font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
    font-weight: 400;
    color: #ffffff;
  }
  .order-info-form {
    background-color: white;
    border-radius: 10px;
    margin-left: 8px;
    margin-right: 8px;
    padding-left: 11px;
    padding-right: 11px;
    padding-bottom: 18px;
    box-sizing: border-box;
    .label {
      display: inline-block;
      margin-top: 14px;
      font-size: 17px;
      font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
      font-weight: 400;
      color: #000000;
    }
  }
  .order-info-protocol {
    margin-top: 10px;
    display: inline-flex;
  }
  .order-info-btn {
    margin-top: 12px;
    margin-left: 38px;
    margin-right: 38px;
    box-sizing: border-box;
  }
}

.service-info {
  padding-top: 12px;
  padding-bottom: 20px;
  .title {
    padding-left: 12px;
    padding-bottom: 12px;
    font-size: 17px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #000000;
    -webkit-background-clip: text;
  }
  .user-service {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 9px;
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
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #1c1c1c;
      line-height: 22px;
    }
    a {
      font-size: 14px;
      color: #1c1c1c;
    }
  }
}

:deep(.van-cell) {
  margin-top: 3px;
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  border: 1px solid #9dd4ff;
}
:deep(.van-checkbox__icon .van-icon) {
  background-color: white;
}
:deep(.van-checkbox__icon--checked .van-icon) {
  color: #fff;
  background: linear-gradient(136deg, #ad02e8 0%, #0d14d6 100%);
  border-color: #ad02e8;
}

:deep(.van-checkbox__label) {
  font-size: 12px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #ffffff;
}
:deep(.van-button--plain) {
  background-color: transparent;
}
</style>
