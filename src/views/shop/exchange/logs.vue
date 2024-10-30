<template>
  <List finish>
    <Empty v-if="rows.length <= 0" description="暂无兑换记录"></Empty>
    <template v-for="log in rows" :key="log.time">
      <CellGroup :title="log.time">
        <template v-for="item in log.data" :key="item.id">
          <Cell>
            <template #title>{{ item.title }}</template>
            <div class="t-red">{{ -item.jinbi }} 金币</div>
            <!-- <template v-if="item.type === 10"> <span @click="copyText(item.code)" class="t-link">复制游戏码</span></template> -->
          </Cell>
        </template>
      </CellGroup>
    </template>
  </List>
</template>

<script lang="ts" setup>
import { jb_exchange_log } from "@/api/shop";
import { watchEffect, ref } from "vue";
import { Cell, CellGroup, Empty, List } from "vant";

const rows = ref<any[]>([]);
watchEffect(async () => {
  const { data } = await jb_exchange_log({ page: 1 });
  rows.value = data.map((log: any) => {
    log.data = log.data.map((item: any) => {
      if (item.type === 10) {
        const [, code] = item.title.split("游戏码：");
        console.log(code);
        item.code = code;
      }
      return item;
    });
    return log;
  });
});
</script>

<style></style>
