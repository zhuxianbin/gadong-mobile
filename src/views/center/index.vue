<template>
  <div>
    <div>
      <div class="my-header" :style="{ backgroundImage: `url(${$user.headimgurl})` }">
        <div class="relative z-2">
          <div class="py-[30px] px-[15px]">
            <div class="my-info">
              <div class="my-info-image">
                <Image
                  class="w-[80px] h-[80px]"
                  fit="cover"
                  round
                  position="left"
                  :src="$user.headimgurl"
                />
              </div>
              <div class="my-info-content">
                <div class="text-[18px] pt-[20px]">{{ $user.nickname }}</div>
                <div class="text-[14px] mt-[15px]">
                  ID:{{ $user.id }}
                  <!-- ● 关注: {{ $user.follows_num }} ● 粉丝: {{ $user.fans_num }} -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav relative z-3">
      <div class="m-[15px] rounded-xl overflow-hidden shadow">
        <Grid :border="false" column-num="2">
          <GridItem icon="/static/icons/my_exchange.png" to="/shop/exchange" text="UU商城" />
          <GridItem icon="/static/icons/my_qb.png" to="/center/wallet" text="我的钱包" />
        </Grid>
      </div>
      <div class="m-[15px] rounded-xl overflow-hidden shadow">
        <Grid :border="false" column-num="3">
          <!-- <GridItem icon="/static/icons/my_fj.png" text="我的房间" /> -->
          <GridItem icon="/static/icons/my_rw.png" to="/center/task" text="我的任务" />
          <GridItem icon="/static/icons/my_dj.png" to="/center/vip" text="我的等级" />
          <GridItem icon="/static/icons/order_service.png" to="/order" text="下单服务" />
        </Grid>
      </div>
      <div class="my-[10px]">
        <CellGroup inset>
          <Cell icon="question-o" title="意见反馈" to="/center/feedback" is-link />
          <Cell icon="setting-o" title="设置" to="/center/setting" is-link />
        </CellGroup>
      </div>
    </div>
    <Sign></Sign>
  </div>
</template>
<script lang="ts" setup>
// import { show_sign } from "@/api";
import { Icon, Grid, GridItem, Cell, CellGroup, Image } from "vant";
import { onMounted, ref } from "vue";
import { Sign } from "@/components";

import { get_user_info } from "@/api/user";

const $user = ref<any>({
  headimgurl: "",
}); // 用户信息对象，用于验证用户操作是否正确。在

onMounted(async () => {
  const { data } = await get_user_info();
  console.log(data);
  $user.value = data; // 将用户信息存储在变量中。在这个页面上显示用户的头像和等级。
});
</script>
<style lang="less" scoped>
.my-header {
  position: relative;
  z-index: 1;
  margin-bottom: -50px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 128, 255, 0.7);
    z-index: 2;
  }
}

.my-info {
  position: relative;
  padding-left: 100px;
  padding-right: 30px;
  height: 110px;

  .my-info-image {
    position: absolute;
    left: 0;
  }

  .my-info-content {
    color: #fff;
  }
}
</style>
