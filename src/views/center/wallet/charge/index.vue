<template>
  <div class="page" :style="{ '--d': state.angle }">
    <div class="i-mizuan">
      <div class="text-[12px] i-mizuan-label">我的米钻</div>
      <div class="i-mizuan-num">{{ state.model.mizuan }}</div>
    </div>
    <div class="panel goods-list">
      <div class="panel-title">请选择充值金额</div>
      <div>
        <Row :gutter="12">
          <template v-for="item in state.goods" :key="item.id">
            <Col :span="12">
              <div
                class="goods"
                :class="{ active: state.form.goods_id === item.id }"
                @click="selectGoods(item)"
              >
                <div class="goods-inset">
                  <div class="text-[18px] mb-5">{{ item.mizuan }}米钻</div>
                  <div class="text-[12px] t-gray">{{ item.price }}元</div>
                </div>
              </div>
            </Col>
          </template>
        </Row>
      </div>
    </div>
    <div class="panel">
      <div class="panel-title">支付方式</div>
      <div>
        <RadioGroup v-model="state.form.type">
          <CellGroup inset>
            <template v-if="!browser.wechat">
              <Cell clickable @click="state.form.type = 1">
                <template #icon>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zhifubao"></use>
                  </svg>
                </template>
                <template #title><div class="ml-5">支付宝</div></template>
                <template #right-icon>
                  <Radio :name="1" />
                </template>
              </Cell>
            </template>
            <Cell clickable @click="state.form.type = 2">
              <template #icon>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixinzhifu"></use>
                </svg>
              </template>
              <template #title><div class="ml-5">微信</div></template>
              <template #right-icon>
                <Radio :name="2" />
              </template>
            </Cell>
          </CellGroup>
        </RadioGroup>
      </div>
    </div>

    <div class="actions">
      <Button round class="uu-btn-primary" block type="primary" @click="doPay">立即充值</Button>
      <div class="mt-[20px] text-center text-[12px]">
        已阅读并同意<a class="t-link" href="/#/cms/info/20">《用户充值协议》</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as shop from "@/api/shop";
import { web_rechargePay } from "@/api/pay";
import { Row, Col, Button, CellGroup, Cell, RadioGroup, Radio } from "vant";
import { reactive, onMounted } from "vue";
import { browser } from "@/utils";

const state = reactive<any>({
  model: {},
  goods: [],
  form: {
    goods_id: 1,
    type: 2,
  },
  angle: "", // ????
});

async function doPay() {
  const { data } = await web_rechargePay({ ...state.form });
  window.location.href = `${data.code}`;
}
function selectGoods(item: any) {
  state.form.goods_id = item.id;
}
async function queryGoodsList() {
  const { data } = await shop.queryGoodsList({});
  state.model = data;
  state.goods = data.goods;
}

onMounted(() => {
  queryGoodsList();
});
</script>

<style lang="less" scoped>
.page {
  padding: 16px;
  --d: 135deg;
}

.i-mizuan {
  height: 214px/2;
  border-radius: 10px;
  background: linear-gradient(var(--d), #9c2dd4, #103cf7);
  color: #fff;
  box-sizing: border-box;
  padding: 20px 18px;

  .i-mizuan-label {
    opacity: 0.6;
    margin-bottom: 15px;
  }
  .i-mizuan-num {
    font-size: 40px;
  }
}

.goods-list {
  margin: 24px 0;
}

.goods {
  box-sizing: border-box;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 12px;
  padding: 2px;

  &.active {
    background: linear-gradient(var(--d), #9c2dd4, #103cf7);
  }

  .goods-inset {
    padding: 12px;
    text-align: center;
    // background: rgba(255, 255, 255, 0.9);
    background: #fff;
    border-radius: 3px;
    // backdrop-filter: blur(10px);
  }
}

.panel {
  .panel-title {
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 14px;
  }
}
.actions {
  margin: 24px 0;
}

.icon {
  width: 26px;
  height: 26px;
  // vertical-align: 20px;
  fill: currentColor;
  overflow: hidden;
}
</style>
