<template>
  <PullRefresh v-model="refreshing" @refresh="onRefresh" class="order-home">
    <List class="pb-12" v-model="loading" :finished="finished" finished-text="" @load="onLoad">
      <div class="item" v-for="item in list" :key="item.id">
        <img :src="item.img_logo_url || item.img" />
        <span class="title">{{ item.gname }}</span>
        <div class="btn" @click="onInfoLick(item)">
          <div class="btn-inner">
            <span>我要下单</span>
          </div>
        </div>
      </div>
    </List>
  </PullRefresh>
</template>

<script setup lang="ts">
import { order } from "@/api/order";
import { PullRefresh, List } from "vant";
import { ref } from "vue";
import { useRouter } from "vue-router";
const $router = useRouter();

const list = ref<any>([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

function onRefresh() {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
}
async function onLoad() {
  const res = await order.list({});
  if (refreshing.value) {
    list.value = [];
    refreshing.value = false;
  }

  list.value = res.data || [];

  loading.value = false;
  finished.value = true;
}
function onInfoLick(data: any) {
  $router.push({
    name: "order.info",
    params: {
      id: data.id,
      name: data.gname,
    },
  });
}
</script>

<style lang="less" scoped>
.order-home {
  height: calc(100vh - 50px);
  overflow: auto;
  background: linear-gradient(180deg, #78ccff 0%, #c8bbfc 100%);

  .item {
    margin: 20px 20px 0px 20px;
    position: relative;
    background-color: white;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 10px;
  }
  .pb-12 {
    padding-bottom: 12px;
  }
  img {
    height: 60px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .title {
    flex: 1;
    margin-left: 15px;
    font-size: 17px;
    font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
    font-weight: 400;
    color: #000000;
    line-height: 22px;
    -webkit-background-clip: text;
  }
  .btn {
    width: 62px;
    height: 62px;
    padding: 4px;
    box-sizing: border-box;
    background: linear-gradient(180deg, rgba(152, 236, 255, 1) 0%, rgba(183, 91, 255, 1) 100%);
    border-radius: 100px 100px 100px 100px;

    .btn-inner {
      width: 54px;
      height: 54px;
      padding: 8px 10px;
      box-sizing: border-box;
      border-radius: 100px 100px 100px 100px;
      background: linear-gradient(312deg, #0015d4 0%, #ba00e9 100%);
      text-align: center;
      span {
        display: inline-block;
        font-size: 14px;
        // font-family: YouSheBiaoTiHei-Regular, YouSheBiaoTiHei;
        font-weight: 400;
        color: #ffffff;
        -webkit-background-clip: text;
      }
    }
  }
}
</style>
