<template>
  <div class="order-pay">
    <!--    <div class="order-pay-time">{{ timeStr }}</div>-->
    <CellGroup class="order-pay-info" :border="false">
      <Cell :border="false" title="游戏名称" :value="state.info.type_name" />
      <Cell :border="false" title="您的需求" :value="state.info.needs" />
      <Cell :border="false" title="联系方式" :value="state.info.phone" />
      <Cell :border="false" title="出价价格">
        <span style="color: #dc0150">{{ state.info.mz }}米钻</span>
      </Cell>
      <Cell :border="false" title="指定接单人" :value="state.info.appoint" />
    </CellGroup>
    <div class="order-pay-btn">
      <Button
        block
        round
        color="linear-gradient(136deg, #AD02E8 0%, #0D14D6 100%)"
        @click="onPayClick"
        >确认支付</Button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { order } from "@/api/order";
import { Button, CellGroup, Cell } from "vant";
import { onDeactivated } from "vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const $route = useRoute();
const $router = useRouter();

const state = reactive<any>({
  timer: null,
  time: 20 * 60, // 20分钟
  timeStr: "20: 00",
  info: {},
});

onMounted(() => {
  state.info = $route.params.info;
});

onDeactivated(() => {
  if (state.timer) {
    clearInterval(state.timer);
  }
});

function createTimer() {
  state.timer = setInterval(() => {
    state.time--;
    if (state.time <= 0) {
      clearInterval(state.timer);
    } else {
      const m = Math.floor(state.time / 60);
      const s = state.time % 60;
      state.timeStr = `${m > 9 ? m : "0" + m}:${s > 9 ? s : "0" + s}`;
    }
  }, 1000);
}
function onPayClick() {
  order.createOrder($route.params.info).then(() => {
    $router.replace({
      name: "order.list",
    });
  });
}
</script>

<style lang="less" scoped>
.order-pay {
  height: 100vh;
  background: #f8f8f8;
  overflow: auto;
  padding-top: 12px;
  box-sizing: border-box;
  .order-pay-time {
    height: 60px;
    line-height: 60px;
    background: #ffffff;
    text-align: center;

    font-size: 24px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #2f38ef;
  }
  .order-pay-info {
    background: #ffffff;
    margin-top: 12px;
  }
  .order-pay-btn {
    margin-top: 20px;
    margin-left: 38px;
    margin-right: 38px;
    box-sizing: border-box;
  }
}
:deep(.Cell__title) {
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #888888;
}
:deep(.Cell__value) {
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #000000;
}
</style>
