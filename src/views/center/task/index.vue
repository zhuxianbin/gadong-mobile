<template>
  <div class="page">
    <div class="p-[10px]">
      <div class="rounded-lg shadow py-[10px] px-[10px] bg-[white] mb-[10px]">
        <div class="text-[14px] font-bold mb-[10px]">每日签到</div>
        <div>
          <div class="grid grid-cols-7 gap-[5px]">
            <template v-for="item in $signState.data">
              <div class="text-center">
                <div
                  class="bg-[#eee] rounded-sm px-[5px] py-[5px] mb-[5px] h-[60px]"
                  :class="{ 'bg-[#f75932] text-[#fff]': item.is_sign }"
                >
                  <div class="h-[35px]">
                    <img class="w-auto" :src="signIcon(item.is_sign)" />
                  </div>
                  <div class="text-[8px] mt-[5px]">{{ item.name }}</div>
                </div>
                <div class="text-[8px] text-gray-500">{{ item.day }}</div>
              </div>
            </template>
          </div>
        </div>
        <div class="mt-[15px] px-[40px]">
          <Button
            block
            round
            type="warning"
            class="uu-btn-warning"
            :disabled="$signState.is_sign"
            @click="doSign"
          >
            {{ $signState.is_sign ? "已签到" : "立即签到" }}
          </Button>
        </div>
      </div>

      <template v-if="$newTasks.length > 0">
        <div class="rounded-lg shadow py-[10px] bg-[white] mb-[10px]">
          <div class="text-[14px] font-bold px-[10px] mb-[10px]">新手任务</div>
          <div>
            <CellGroup :border="false">
              <template v-for="item in $newTasks">
                <Cell
                  :title="item.title"
                  center
                  title-style="flex:3"
                  :label="`+${item.jinbi}金币奖励`"
                >
                  <template #icon>
                    <img :src="item.img" class="w-[40px] h-[40px] mr-[10px]" />
                  </template>
                  <Button
                    size="small"
                    round
                    class="uu-btn-primary"
                    type="primary"
                    @click="doRecevice(item)"
                    >去完成</Button
                  >
                </Cell>
              </template>
            </CellGroup>
          </div>
        </div>
      </template>

      <div class="rounded-lg shadow py-[10px] bg-[white]">
        <div class="text-[14px] font-bold px-[10px] mb-[10px]">日常任务</div>
        <div>
          <CellGroup :border="false">
            <template v-for="item in $dailyTasks">
              <Cell
                :title="item.title"
                center
                title-style="flex:3"
                :label="`+${item.jinbi}金币奖励`"
              >
                <template #icon>
                  <img :src="item.img" class="w-[40px] h-[40px] mr-[10px]" />
                </template>

                <Button
                  size="small"
                  round
                  class="uu-btn-primary"
                  type="primary"
                  :disabled="item.recevice"
                  @click="doRecevice(item)"
                >
                  {{ getBtnText(item) }}</Button
                >
              </Cell>
            </template>
          </CellGroup>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { show_sign, sign, recevice_task, daily_task, new_task } from "@/api/user";
import { Button, CellGroup, Cell, showSuccessToast, showFailToast } from "vant";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";

const $router = useRouter();

const $signState = ref<any>({
  data: [],
  is_sign: 0,
  title: "",
});

const $newTasks = ref<any>([]);
const $dailyTasks = ref<any>([]);

function signIcon(is_sign) {
  return ["/static/images/gold.png", "/static/images/home_qd_cg.png"][is_sign];
}
function getBtnText(item) {
  if (item.recevice) return "已领取";
  return item.fin ? "领取" : "去完成";
}

async function doSign() {
  const { data } = await sign();
  showSuccessToast(data.title);
  querySign();
}

async function doRecevice(item) {
  if (item.fin) {
    const { message } = await recevice_task({ task_id: item.id });
    showSuccessToast(message);
    return queryTask();
  }

  // 以下为 去完成部分 不同业务处理的代码。
  if (item.id === 11) {
    return $router.push({ name: "center.wallet.charge" });
  }

  return showFailToast("此任务必须在APP客户端内完成");
}

async function querySign() {
  const { data } = await show_sign();
  $signState.value = data;
  return data;
}

async function queryTask() {
  const [{ data: newTasks }, { data: dailyTasks }] = await Promise.all([new_task(), daily_task()]);
  $newTasks.value = newTasks;
  $dailyTasks.value = dailyTasks.filter((item) => item.enable);
  return [];
}

onMounted(async () => {
  await querySign();
  await queryTask();
});
</script>
