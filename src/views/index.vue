<template>
  <div class="page-home">
    <div>
      <div>结算系统</div>
    </div>
    <div>
      <div>
        <div>
          <div>
            <div>头像</div>
          </div>
          <div>
            <div>张飒飒</div>
            <div>张飒飒</div>
          </div>
        </div>
        <div>
          <div>提醒</div>
          <div>信箱</div>
        </div>
      </div>
    </div>
    <div>
      <div class="bg-white rounded-[8px] p-[15px]">
        <div class="border-bottom-[1px] pb-[20px]">
          <div class="clearfix">
            <div class="pull-left">
              <div>
                <div>可提现招工津贴</div>
                <div class="text-[30px] font-bold">9,000</div>
              </div>
            </div>
            <div class="pull-right">
              <div><Button round>提现</Button></div>
            </div>
          </div>
        </div>
        <div class="py-20px">
          <div class="clearfix">
            <div class="pull-left w-[63%]">
              <div>基本部门业绩</div>
              <div>¥1,000</div>
            </div>
            <div class="pull-right w-[36%]">
              <div>考核部门业绩</div>
              <div>¥1,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="grid grid-cols -12 gap-[10px]">
        <div class="col-span-6">1</div>
        <div class="col-span-6">2</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button, Search, Swipe, SwipeItem } from "vant";
const value = ref(""); // 搜索框的值
39.106.154.159:8080
</script>

<style lang="less" scoped>
.page-home {
  padding: 10px;
}
</style>
