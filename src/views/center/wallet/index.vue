<template>
  <div class="wallet">
    <div>
      <div class="wallet-box mizuan">
        <div class="text-left leading-none">
          <span class="text-[12px]">用于商城消费</span>
        </div>
        <div class="leading-none">
          <span class="text-[14px]">我的米钻</span>
        </div>
        <div class="my-[10px]">
          <span class="text-[32px]">{{ $model.mizuan }}</span>
        </div>
        <div>
          <div>
            <div>
              <Button
                class="w-[100px]"
                type="success"
                size="small"
                @click="$router.push({ name: 'center.wallet.charge' })"
              >
                充值
              </Button>
            </div>
            <!-- <div>
              <Button plain size="small"> 兑换 </Button>
            </div> -->
          </div>
        </div>
        <div class="wallet-box-logs" @click="$router.push({ name: 'center.wallet.logs' })">
          <span class="text-[12px]">明细记录</span>
        </div>
      </div>
    </div>
    <div>
      <div class="wallet-box mibi">
        <div class="text-left leading-none">
          <span class="text-[12px]">米钻收入</span>
        </div>
        <div class="leading-none">
          <span class="text-[14px]">米币余额</span>
        </div>

        <div class="my-[10px]">
          <span class="text-[32px]">{{ $model.mibi }}</span>
        </div>
        <div>
          <div class="w-[220px] mx-auto clearfix">
            <div class="pull-left">
              <Button class="w-[100px]" type="primary" plain size="mini" @click="doWithdrawal">
                提现
              </Button>
            </div>
            <div class="pull-right">
              <Button class="w-[100px]" type="primary" size="mini" @click="doExchangeMiBi">
                兑换
              </Button>
            </div>
          </div>
        </div>
        <div class="wallet-box-logs" @click="$router.push({ name: 'center.wallet.logs' })">
          <span class="text-[12px]">明细记录</span>
        </div>
      </div>
    </div>

    <div>
      <Service />
    </div>
    <PopupMiBi ref="$PopupMiBi"></PopupMiBi>
  </div>
</template>

<script setup lang="ts">
import { showFailToast } from "vant";
import { Button } from "vant";

import { Service } from "@/components";
import PopupMiBi from "./exchange/popup.mibi.vue";

import { my_store } from "@/api/user";
import { onMounted, ref, unref } from "vue";
import { useRouter } from "vue-router";

import { emitter } from "@/utils/emitter";

const $router = useRouter();

const $model = ref<any>({});
const $PopupMiBi = ref<any>();

onMounted(async () => {
  queryMyStore();
});

async function queryMyStore() {
  const { data } = await my_store();
  $model.value = data.at(0);
}

function doExchangeMiBi() {
  const PopupMiBi = unref($PopupMiBi);
  PopupMiBi.show();
}

function doWithdrawal() {
  showFailToast("用户如需提现请联系客服人员");
}

emitter.on("exchangeSuccess", () => {
  console.log(11111);
  queryMyStore();
});
</script>

<style lang="less" scoped>
.wallet {
  padding: 15px;
  .wallet-box {
    position: relative;
    text-align: center;
    color: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;

    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: top center;
    margin-bottom: 15px;

    .wallet-box-logs {
      position: absolute;
      right: 0;
      top: 10px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 25px 0 0 25px;
      line-height: 26px;
      font-size: 14px;

      padding: 0 10px 0 15px;
    }

    &.mizuan {
      background-image: url(/static/images/wallet_mizuan_bg.png);
    }
    &.mibi {
      background-image: url(/static/images/wallet_mibi_bg.png);
    }
  }
}
</style>
