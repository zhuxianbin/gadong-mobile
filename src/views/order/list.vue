<template>
  <Tabs
    v-model:active="state.query.status"
    class="order-list"
    swipeable
    sticky
    title-active-color="#3039F0"
    title-inactive-color="#777777"
    line-height="6px"
    line-width="33px"
    @change="onTabChange"
  >
    <Tab v-for="tab in state.tabs" :key="tab.id" :title="tab.name" :name="tab.id"> </Tab>
    <PullRefresh v-model="state.refreshing" @refresh="onRefresh" class="pull-refresh">
      <List v-model="state.loading" :finished="state.finished" @load="onLoad">
        <div class="item" v-for="item in state.tabDataMap[state.query.status]" :key="item.id">
          <span class="name">{{ item.type_name }}</span>
          <span class="status" :class="`status${item.status}`">
            {{ statusFilter(item.status) }}
          </span>
          <div class="info">我的需求: {{ item.needs }}</div>
          <div class="info">联系方式: {{ item.phone }}</div>
          <div class="info">指定接单人: {{ item.appoint }}</div>
          <div class="info">下单时间: {{ item.create_time }}</div>
          <div class="price">实付款: {{ item.mz }} 米钻</div>
          <div class="btn" v-if="item.status === 1 || item.status === 2 || item.status === 4">
            <Button size="small" round plain @click="handleBtnClick(item)">
              {{ btnFilter(item.status) }}
            </Button>
          </div>
        </div>
      </List>
      <Empty v-if="state.empty" description="无订单" />
    </PullRefresh>
  </Tabs>
</template>

<script lang="ts" setup>
import { order } from "@/api/order";
import { Dialog, Tab, Tabs, List, PullRefresh, Button, Empty } from "vant";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

const $route = useRoute();
const state = reactive({
  loading: false,
  finished: false,
  refreshing: false,
  empty: false,
  query: {
    page: 1,
    page_size: 5,
    status: 0,
  },
  tabs: [
    {
      id: 0,
      name: "全部",
    },
    {
      id: 1,
      name: "待接单",
    },
    {
      id: 2,
      name: "待完成",
    },
    {
      id: 3,
      name: "已完成",
    },
    {
      id: 4,
      name: "售后",
    },
  ],
  data: [],
  tabDataMap: [] as any,
});

onMounted(() => {
  state.query.page = 0;

  state.query.status = +($route.query.status || state.tabs[0].id);
  // console.log(state.query.status, "$route.query.status");
  state.tabs.forEach((item) => {
    state.tabDataMap[item.id] = [];
  });
  // console.log(state.query, 111);
});

function onTabChange() {
  onRefresh();
}
function onRefresh() {
  // 清空列表数据
  state.finished = true;
  state.query.page = 0;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  state.loading = true;
  onLoad();
}

async function onLoad() {
  state.empty = false;
  state.query.page++;
  const active = state.query.status;
  try {
    const res = await order.orderList(state.query);

    if (active !== state.query.status) {
      return;
    }
    if (state.refreshing) {
      state.refreshing = false;
    }

    if (state.query.page === 1) {
      state.tabDataMap[active] = [];
    }

    state.tabDataMap[active] = state.tabDataMap[active].concat(res.data || []);
    state.loading = false;
    state.finished = res.data === undefined || res.data.length < state.query.page_size;
    state.empty = state.tabDataMap[state.query.status].length <= 0;
  } catch (err) {
    state.query.page--;
  }
}

async function handleBtnClick(item: any) {
  if (item.status === 1) {
    await Dialog.confirm({
      title: "提示",
      message: "确定要取消订单吗？",
    });

    order.cancelOrder({ id: item.id }).then(() => {
      onRefresh();
    });
  } else if (item.status === 2 || item.status === 4) {
    await Dialog.confirm({
      title: "提示",
      message: "确定要完成订单吗？",
    });
    order.finishOrder({ id: item.id }).then(() => {
      onRefresh();
    });
  }
}

function statusFilter(status: any) {
  if (status === 1) {
    return "待接单";
  } else if (status === 2) {
    return "待完成";
  } else if (status === 3) {
    return "已完成";
  } else if (status === 4) {
    return "售后";
  } else if (status === 5) {
    return "已取消";
  } else {
    return "";
  }
}

function btnFilter(status: any) {
  if (status === 1) {
    return "取消订单";
  } else if (status === 2) {
    return "确认完成";
  } else if (status === 4) {
    return "确认完成";
  } else {
    return "";
  }
}
</script>

<style lang="less" scoped>
.order-list {
  height: 100vh;
  background: #f8f8f8;
  overflow: auto;

  .item {
    margin-top: 12px;
    position: relative;
    background-color: white;
    padding: 10px 12px;

    .name {
      font-size: 17px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #000000;
      line-height: 22px;
    }

    .info {
      margin-top: 5px;
      font-size: 12px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #888888;
      line-height: 22px;
    }

    .price {
      text-align: right;
      margin-top: 5px;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #dc0150;
      line-height: 22px;
    }

    .btn {
      text-align: right;
      margin-top: 5px;
    }

    .status {
      position: absolute;
      top: 12px;
      right: 12px;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
    }

    .status1 {
      color: #2f38ef;
    }

    .status2 {
      color: #f3aa1b;
    }

    .status3 {
      color: #fb5f4a;
    }

    .status4 {
      color: #000000;
    }

    .status5 {
      color: #000000;
    }
  }

  .pull-refresh {
    height: calc(100vh - 44px);
    overflow: auto;
  }
}

:deep(.van-button) {
  width: 85px;
  height: 30px;
  border-radius: 15px;
  border: 1px solid #cccccc;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #000000;
}

:deep(.van-tabs__line) {
  background: linear-gradient(129deg, #9b2cd3 0%, #2f38ef 100%);
}
</style>
