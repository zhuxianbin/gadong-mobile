<template>
  <div class="py-[20px] px-[15px]">
    <div class="text-center mb-[20px]">
      <div>
        <Image width="20vw" height="20vw" round fit="cover" :src="$user.headimgurl"></Image>
      </div>
      <div>{{ $user.nickname }}</div>
    </div>
    <div class="border rounded-xl p-[15px] shadow">
      <div class="border-l-[4px] pl-[10px] border-color-[#8c33cb] leading-none mb-[10px]">
        会员等级
      </div>
      <div class="text-center text-[12px]">V值:{{ $user.vip_num }}</div>
      <div class="my-[10px]">
        <div class="grid grid-cols-24 gap-2">
          <div class="col-span-4 text-center">
            <img class="w-[50px]" :src="`/static/images/vip/vip_${$user.vip_level}.png`" />
          </div>
          <div class="col-span-16 pt-[10px]">
            <Progress
              :percentage="$percentage"
              color="#8c33cb"
              stroke-width="10"
              :show-pivot="false"
            ></Progress>
          </div>
          <div class="col-span-4 text-center">
            <img class="w-[50px]" :src="`/static/images/vip/vip_${$user.next_vip_level}.png`" />
          </div>
        </div>
      </div>
      <div class="text-center text-[12px]">
        距离下一级还需要 {{ $user.next_vip_num - $user.vip_num }} V值
      </div>
    </div>

    <div class="border rounded-xl p-[15px] shadow mt-[20px]">
      <div class="border-l-[4px] pl-[10px] border-color-[#ffcd00] leading-none mb-[10px]">
        VIP等级
      </div>
      <div class="text-[#999] text-[14px] leading-relaxed my-[10px]">
        VIP等级采用V值升级制度，用户每送出一个礼物可获得对应的V值，累计获得的V值，可以提升更高的VIP等级解锁相对应的特权
        (1V值=1米钻)。
      </div>
      <div>
        <table class="table-vip">
          <thead>
            <tr>
              <td>VIP等级</td>
              <td>V值</td>
              <td>VIP等级</td>
              <td>V值</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in $vipConfig">
              <tr>
                <template v-for="(vip, key) in item">
                  <td>
                    <img :src="`/static/images/vip/vip_${key}.png`" />
                  </td>
                  <td>{{ vip }}</td>
                </template>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { vip_center } from "@/api/user";
import { onMounted, ref, computed, unref } from "vue";
import { Image, Progress } from "vant";

const $user = ref<any>({
  headimgurl: "",
  id: null,
  next_vip_level: 0,
  next_vip_num: 0,
  nickname: "",
  vip_level: 0,
  vip_num: 0,
});

const $vipConfig = ref([
  { 1: 1000, 11: 400000 },
  { 2: 3000, 12: 600000 },
  { 3: 6000, 13: 1000000 },
  { 4: 9000, 14: 1500000 },
  { 5: 15000, 15: 3000000 },
  { 6: 30000, 16: 4500000 },
  { 7: 60000, 17: 6000000 },
  { 8: 100000, 18: 8000000 },
  { 9: 150000, 19: 10000000 },
  { 10: 200000, 20: 12000000 },
]);

const $percentage = computed(() => {
  const { next_vip_num, vip_num } = unref($user);
  return Math.floor((vip_num / next_vip_num) * 100);
});

onMounted(async () => {
  const { data } = await vip_center();
  //    await level_center();
  const {
    user: [info],
  } = data;

  $user.value = info;
});
</script>

<style lang="less" scoped>
.table-vip {
  width: 100%;
  border: 1px solid #ccc;
  th,
  td {
    text-align: center;
    border: 1px solid #ccc;
    padding: 5px 0;
    font-size: 14px;
  }

  img {
    width: 50px;
  }
}
</style>
