<template>
  <div class="page">
    <div class="i-gold">
      <div class="i-gold-bg">
        <img src="/static/images/exchange/bg.png" />
      </div>
      <div class="i-gold-body">
        <div class="i-balance">
          <Row>
            <Col :span="12">
              <div class="t-center">
                <div class="i-gold-num">
                  {{ model.jinbi || 0 }}
                </div>
                <div class="text-[12px] i-gold-label">金币</div>
              </div>
            </Col>
            <Col :span="12">
              <div class="t-center">
                <div class="i-gold-num t-orange">
                  {{ model.mizuan || 0 }}
                </div>
                <div class="text-[12px] i-gold-label">米钻</div>
              </div>
            </Col>
          </Row>
        </div>

        <div class="i-links mt-[10px]">
          <div class="i-links-list pt-[5px]">
            <div class="i-links-item" @click="toggleLogs">
              <img class="i-links-img" src="/static/images/exchange/img-logs.png" />
              <span>兑换记录</span>
            </div>
            <div class="i-links-item" @click="$router.push({ name: 'shop.exchange.rank' })">
              <img class="i-links-img" src="/static/images/exchange/img-rank.png" />
              <span>排行榜</span>
            </div>
          </div>

          <div class="tap-to-gaoji">
            <img
              ref="ref-gaoji"
              class="animate__animated"
              :class="animate"
              @click="() => (active = '精品区')"
              src="/static/images/exchange/img-gaoji.png"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="panel-good">
      <Tabs v-model:active="active" sticky color="#3039F0" title-active-color="##3039F0">
        <template v-for="(data, key) in goods" :key="key">
          <Tab :title="`${key}`" :name="key">
            <div class="goods-list">
              <Row :gutter="10">
                <template v-for="item in data" :key="item.id">
                  <Col :span="8">
                    <div class="goods-item">
                      <div class="goods-pic">
                        <div @click="openDetail(item)">
                          <Image fit="contain" class="react-img" lazy-load :src="item.show_img" />
                        </div>
                        <div class="goods-name">{{ item.name }}</div>
                      </div>
                      <div class="good-info">
                        <div class="clearfix">
                          <div class="pull-left">
                            <div class="text-[12px]">
                              <template v-if="item.mz && item.mz > 0">
                                <div>
                                  <img
                                    class="icon-mz inline-block"
                                    src="/static/icons/my_wallet_mizuan.png"
                                  />
                                  {{ item.mz }}
                                </div>
                              </template>
                              <template v-if="item.jinbi && item.jinbi > 0">
                                <div>
                                  <img
                                    class="icon-mz inline-block"
                                    src="/static/icons/dh_jinbi.png"
                                  />
                                  {{ item.jinbi }}
                                </div>
                              </template>
                            </div>
                          </div>
                          <div class="pull-right">
                            <div class="t-right">
                              <div class="t-right text-[12px]">
                                剩:<span class="t-orange">{{ item.num }}</span>
                              </div>
                              <a class="btn-dh-mini" @click="openDetail(item)">兑换</a>
                            </div>
                          </div>
                        </div>
                        <!-- <Row>
                          <Col :span="14"> </Col>
                          <Col :span="10"> </Col>
                        </Row> -->
                      </div>
                    </div>
                  </Col>
                </template>
              </Row>
            </div>
          </Tab>
        </template>
      </Tabs>
    </div>
    <van-popup position="bottom" style="width: 100vw" round v-model:show="detail.show" closeable>
      <div class="popup-detail" v-if="detail.data">
        <div class="popup-detail-title">{{ detail.data.name }}</div>
        <div class="popup-detail-media">
          <img class="popup-detail-pic" :src="detail.data.show_img" />
        </div>
        <div class="popup-detail-desc">
          <div class="clearfix">
            <div class="pull-left">
              消耗:
              <span v-if="detail.data.mz" class="ml-5 mr-5">
                <img class="icon-mz inline-block" src="/static/icons/my_wallet_mizuan.png" />{{
                  detail.data.mz
                }}
              </span>
              <span v-if="detail.data.jinbi" class="ml-5 mr-5">
                <img class="icon-mz inline-block" src="/static/icons/dh_jinbi.png" />
                {{ detail.data.jinbi }}
              </span>
            </div>
            <div class="pull-right">剩余:{{ detail.data.num }}</div>
          </div>
          <div class="popup-detail-remark" v-show="detail.data.remark">
            {{ detail.data.remark }}
          </div>
        </div>
        <div>
          <van-button round block @click="doVerification(detail.data)" type="primary">
            兑换
          </van-button>
        </div>
      </div>
    </van-popup>
    <van-dialog
      v-model:show="showDialog"
      title="请输入验证码"
      show-cancel-button
      :before-close="beforeClose"
    >
      <Field
        v-model="imgCodeStr"
        maxlength="4"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <imgCode ref="$imgCode" />
        </template>
      </Field>
    </van-dialog>

    <van-popup
      position="bottom"
      style="width: 100vw; height: 80vh"
      round
      v-model:show="logs.show"
      closeable
    >
      <my-logs></my-logs>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import imgCode from "@/components/imgCode.vue";
import myLogs from "./logs.vue";
import { getStore } from "@/utils/store";
import {
  jb_exchange_list,
  jb_vip_month,
  both_exchange,
  // jb_exchange, mz_exchange,
  exchangeConfigPlus,
} from "@/api/shop";
import {
  showImagePreview,
  Row,
  Col,
  Image,
  Popup as vanPopup,
  Button as vanButton,
  Tabs,
  Tab,
  Field,
  Dialog as vanDialog,
  showToast,
} from "vant";
import dayjs from "dayjs";
import { computed, nextTick, onMounted, reactive, ref, toRefs, unref } from "vue";

import { useRouter } from "vue-router";

const $router = useRouter();

const user = getStore("user") || { id: "" };

const $imgCode = ref<any>(null);
const config = ref({
  close_time: "00:00:00",
  enable: 1,
  id: 1,
  min: "0",
  open_time: "23:59:59",
});
const active = ref("");
const logs = reactive({
  show: false,
});
const model = ref({
  jinbi: 0,
  mizuan: 0,
});

const goods = ref<any>({});

const detail = reactive<any>({
  show: false,
  data: null,
});
const showDialog = ref(false);
const imgCodeStr = ref("");
const animate = ref("animate__tada");
const month_vip_rows = ref([]);

function toggleLogs() {
  logs.show = !logs.show;
}

function beforeClose(action: string): Promise<boolean> {
  const imgCode = unref($imgCode);
  return new Promise((resolve) => {
    if (action == "cancel") {
      return resolve(true);
    }

    if (action === "confirm") {
      if (imgCodeStr.value.length < 4) {
        showToast("请输入4位验证码！");
        return resolve(false);
      }

      if (imgCodeStr.value.toLocaleLowerCase() === imgCode.code.toLocaleLowerCase()) {
        imgCodeStr.value = "";
        imgCode.createCode();
        doExchange();
        return resolve(true);
      } else {
        showToast("验证码错误！");
        imgCodeStr.value = "";
        imgCode.createCode();
        return resolve(false);
      }
    }
  });
}

async function doImagePreview(item: any) {
  showImagePreview([item.show_img]);
}

function doVerification(item: any) {
  showDialog.value = true;
}

async function openDetail(item: any) {
  detail.data = item;
  await nextTick();
  detail.show = true;
}

//  const openJP = computed(()=>{

// const now = dayjs();
//       const st = dayjs(now.format(`YYYY-MM-DD ${this.config.open_time}`)) - 0;
//       const et = dayjs(now.format(`YYYY-MM-DD ${this.config.close_time}`)) - 0;
//       const dt = now - 0;
//       // console.log(this.config.enable === 1, this.model.jinbi > this.config.min, dt > st, dt < et);
//       // this.model.jinbi > this.config.min &&
//       return config.enable === 1 && dt > st && dt < et && isMonthVIP;
//  });
//  const isMonthVIP = computed(()=>{
//       return month_vip_rows.some((item) => item.id === user.id); // 这里需要检查一下
//     });

//   computed: {
//     // 是否开启精品屋

//     isMonthVIP() {
//       console.log(this.month_vip_rows, this.user, 123);
//       return this.month_vip_rows.some((item) => item.id === this.user.id); // 这里需要检查一下
//     },
//   },
//   methods: {
//     toJP() {
//       // if (this.openJP) {
//       this.active = "精品区";
//       // } else {
//       //   showToast("进入失败，精品区开放时间为每月1日至3日或您未入月排行榜前10名");
//       // }
//     },
//     async beforeClose(action, done) {
//       if (action == "cancel") {
//         return done();
//       } else {
//         if (this.imgCodeStr.length < 4) {
//           showToast("请输入4位验证码！");
//           return done(false);
//         }
//         if (this.imgCodeStr.toLocaleLowerCase() === this.$refs.imgCode.code.toLocaleLowerCase()) {
//           this.imgCodeStr = "";
//           this.$refs.imgCode.createCode();
//           this.doExchange();
//           return done();
//         } else {
//           showToast("验证码错误！");
//           this.imgCodeStr = "";
//           this.$refs.imgCode.createCode();
//           return done(false);
//         }
//       }
//     },

async function doExchange() {
  const item = detail.data;
  if (!item.num) {
    return showToast("商品库存不足");
  }

  const now = dayjs();
  item.stime = item.stime == "0000-00-00 00:00:00" ? null : item.stime;
  item.etime = item.etime == "0000-00-00 00:00:00" ? null : item.etime;

  if (item.stime) {
    // 如果活动还没开始
    const stimeOver = dayjs(item.stime).diff(now) > 0;
    if (stimeOver) {
      return showToast("活动未开始");
    }
  }

  if (item.etime) {
    // 如果活动已经结束
    const etimeOver = dayjs(item.etime).diff(now) < 0;
    if (etimeOver) {
      return showToast("活动已结束");
    }
  }

  // both_exchange
  // const api = item.mz > 0 ? mz_exchange : jb_exchange;
  await both_exchange({ id: item.id });
  showToast("兑换成功!");
  query_jb_exchange_list();
  detail.show = false;
}

//     async jb_exchange_list() {
//       const { data } = await jb_exchange_list();
//       this.model = data;
//       const goods = data.data.reduce((obj, item) => {
//         if (item.tags) {
//           obj[item.tags] = obj[item.tags] || [];
//           obj[item.tags].push(item);
//         }
//         return obj;
//       }, {});
//       this.goods = goods;
//     },
//     async exchangeConfigPlus() {
//       const { data } = await exchangeConfigPlus();
//       this.config = data;
//       return data;
//     },

//     async jb_vip_month() {
//       const { data } = await jb_vip_month(); // 这里改一下
//       this.month_vip_rows = data;
//       return data;
//     },
//   },
//   async created() {
//     await this.exchangeConfigPlus();
//     await this.jb_vip_month();
//     this.jb_exchange_list();
//   },

// };

async function queryExchangeConfigPlus() {
  const { data } = await exchangeConfigPlus();
  config.value = data;
  return data;
}

async function query_jb_vip_month() {
  const { data } = await jb_vip_month({}); // 这里改一下
  month_vip_rows.value = data;
  return data;
}

async function query_jb_exchange_list() {
  const { data } = await jb_exchange_list({});
  model.value = data;
  const items = data.data.reduce((obj: any, item: any) => {
    if (item.tags) {
      obj[item.tags] = obj[item.tags] || [];
      obj[item.tags].push(item);
    }
    return obj;
  }, {});
  goods.value = items;
}

onMounted(async () => {
  await queryExchangeConfigPlus();
  await query_jb_vip_month();
  await query_jb_exchange_list();
});
</script>

<style lang="less" scoped>
.page {
  padding: 10px;
  background-image: linear-gradient(180deg, #ba56f8, #fff);
  background-size: 100% 100vw;
  background-repeat: no-repeat;

  :deep(.van-tabs__nav) {
    background-color: transparent;
  }
  :deep(.van-sticky--fixed) {
    background: #fff;
  }
}
.i-gold {
  position: relative;

  box-sizing: border-box;
  // padding: 20px 18px;

  .i-gold-bg {
    img {
      width: 100%;
    }
  }

  .i-gold-body {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  &-label {
    opacity: 0.6;
    // margin-bottom: 10px;
    // font-size: 13px;
    color: #777;
  }
  &-num {
    font-size: 30px;
  }

  .i-balance {
    padding: 10px 0 10px;
    color: #777;
  }

  // .i-gold-logs {
  //   position: absolute;
  //   right: 20px;
  //   top: 20px;
  //   font-size: 13px;
  // }

  .i-links {
    position: relative;
    padding: 0 10px;
    .tap-to-gaoji {
      position: absolute;
      top: 0;
      right: 10px;

      img {
        display: block;
        width: 84px;
      }
    }
  }

  .i-links-item {
    display: inline-block;
    width: 60px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 5px 0;
    margin-right: 10px;
  }
  .i-links-img {
    width: 34px;
    display: block;
    margin: 0 auto;
  }
}

.panel-good {
  border-radius: 10px;
  background-color: #fff;
  padding: 5px;
  margin-top: 10px;
  min-height: 100vh;
}

.goods-list {
  padding: 10px 0;
}

.goods-list-title {
  text-align: center;
  color: gray;
  line-height: 30px;
}

.goods-item {
  margin-bottom: 10px;
  border: 1px solid #ededed;
  border-radius: 5px;
  background-color: #fcfeff;

  .goods-pic {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .goods-name {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .good-info {
    padding: 5px;
    height: 50px;
    overflow: hidden;
  }
}

.react-img {
  display: block;
  margin: 0 auto;
  width: auto;
  height: 100px;
}

.popup-detail {
  padding: 15px;
  .popup-detail-media {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;
    // height: 50vh;
  }
  .popup-detail-pic {
    max-height: 100%;
    max-width: 100%;
    border-radius: 10px;
    overflow: hidden;
    margin: auto;
    display: block;
    box-shadow: 0 0 10px 0 #aaa;
  }

  .popup-detail-title {
    color: #f5762e;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }

  .popup-detail-desc {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .popup-detail-remark {
    border: 1px solid #f1f1f1;
    padding: 10px;
    font-size: 12px;
    margin-top: 10px;
    border-radius: 5px;
  }
}

.icon-mz {
  width: 12px;
}

.btn-dh-mini {
  display: inline-block;
  width: 32px;
  height: 16px;
  line-height: 16px;
  background: linear-gradient(129deg, #9b2cd3 0%, #2f38ef 100%);
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  text-align: center;
}
</style>
