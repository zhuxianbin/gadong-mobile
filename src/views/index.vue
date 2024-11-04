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
              <div><Button size="normal" type="primary" round class="w-[80px]">提现</Button></div>
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
    <div class="my-[10px]">
      <div class="grid grid-cols-12 gap-[10px]">
        <div class="col-span-6">
          <div class="bg-white rounded-[8px] py-[10px] text-center">我要招工</div>
        </div>
        <div class="col-span-6">
          <div class="bg-white rounded-[8px] py-[10px] text-center">上班打卡</div>
        </div>
      </div>
    </div>
    <div>
      <div>
        <div>
          <List
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <Cell title="提现记录" value="全部" is-link />
            <Cell v-for="item in extractRecords" :key="item" title="提现至微信">
              <template #label>
                <div class="text-[12px]">2020-01-01 01:01:01</div>
              </template>
              <template #value>
                <div>
                  <div class="text-blue-500 text-[16px]">+40,000</div>
                  <div>累计提现50,000元</div>
                </div>
              </template>
            </Cell>
          </List>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Button, List, Cell } from "vant";
const finished = ref(false);
const loading = ref(false);

const extractRecords = ref<any>([]);

function onLoad() {
  extractRecords.value.push(1);
}
</script>

<style lang="less" scoped>
.page-home {
  padding: 10px;
  min-height: 100vh;
  //渐变背景色
  // background: linear-gradient(135deg, #91b7f5 0%, #ffffff 100%);
  background: linear-gradient(to bottom, #91b7f5 0px, white 400px);
}
</style>
