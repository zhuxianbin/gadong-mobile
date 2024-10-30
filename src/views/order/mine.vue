<template>
  <div class="order-mine">
    <div class="user-info">
      <img v-if="$user.headimgurl" class="avatar" :src="$user.headimgurl" />
      <img v-else class="avatar" src="/static/images/order/order_avatar_man.png" />
      <div class="user-name-container">
        <span class="user-name">{{ $user.nickname }}</span>
        <div class="user-diamond">
          <img src="/static/images/order/order_diamond.png" />
          <span>{{ $user.mizuan }}</span>
        </div>
      </div>
      <div class="user-btn-recharge" @click="onRechargeClick">充值</div>
    </div>
    <div class="user-order">
      <span class="title">我的订单</span>
      <div class="all-order" @click="onOrderListClick(0)">
        <span>全部订单</span>
        <icon name="arrow" />
      </div>
      <Grid :border="false" clickable :icon-size="32">
        <GridItem
          icon="/static/images/order/order_status_1.png"
          text="待接单"
          @click="onOrderListClick(1)"
        />
        <GridItem
          icon="/static/images/order/order_status_2.png"
          text="待完成"
          @click="onOrderListClick(2)"
        />
        <GridItem
          icon="/static/images/order/order_status_3.png"
          text="已完成"
          @click="onOrderListClick(3)"
        />
        <GridItem
          icon="/static/images/order/order_service.png"
          text="售后"
          @click="onOrderListClick(4)"
        />
      </Grid>
    </div>

    <div class="user-order">
      <span class="title">客服</span>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { get_user_info_by_token } from "@/api";
import { getToken, native } from "@/utils/hybrid";
import { getStore, setStore } from "@/utils/store";
import { showSuccessToast, Grid, GridItem, Icon } from "vant";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const $user = ref<any>({});

function getUserInfo() {
  $user.value = getStore("user") || {};
  get_user_info_by_token(getToken()).then((res) => {
    $user.value = res.data || {};
    setStore("user", $user.value);
  });
}
function onOrderListClick(status: any) {
  $router.push({
    name: "order.list",
    query: { status },
  });
}
function onRechargeClick() {
  $router.push({
    name: "recharge",
  });
}
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

onMounted(() => {
  getUserInfo();
});
</script>

<style lang="less" scoped>
.order-mine {
  background-color: #e9f1fa;
  height: calc(100vh - 50px);
  overflow: auto;
  .title {
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: white;
  }
  .user-info {
    width: 100%;
    position: relative;
    background-color: white;
    .avatar {
      width: 60px;
      height: 60px;
      margin-left: 30px;
      margin-top: 30px;
      margin-bottom: 30px;
      border-radius: 30px;
    }
    .user-name-container {
      display: inline-block;
      margin-left: 16px;
      vertical-align: top;
      margin-top: 34px;
    }
    .user-name {
      font-size: 16px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #000000;
      line-height: 19px;
      -webkit-background-clip: text;
    }
    .user-diamond {
      margin-top: 10px;
      img {
        width: 23px;
      }
      span {
        vertical-align: middle;
        margin-left: 3px;
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #dc0150;
        line-height: 19px;
        -webkit-background-clip: text;
      }
    }
    .user-btn-recharge {
      position: absolute;
      top: 45px;
      right: 14px;
      height: 25px;
      line-height: 25px;
      padding-left: 14px;
      padding-right: 14px;
      box-sizing: border-box;
      background: linear-gradient(136deg, #ad02e8 0%, #0d14d6 100%);
      border-radius: 2010px 2010px 2010px 2010px;

      font-size: 14px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .user-order {
    position: relative;
    background: #ffffff;
    border-radius: 10px;
    margin-top: 12px;
    margin-left: 12px;
    margin-right: 12px;
    padding-bottom: 12px;
    .title {
      margin-left: 12px;
      margin-top: 12px;
      font-size: 17px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #000000;
      -webkit-background-clip: text;
    }
    .all-order {
      position: absolute;
      top: 12px;
      right: 12px;
      color: #b2b2b2;
      span {
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
      }
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
}
:deep(.van-grid-item__content) {
  padding-bottom: 0;
}
:deep(.van-grid-item__text) {
  font-size: 14px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;
  color: #1c1c1c;
}
</style>
