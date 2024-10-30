<template>
  <div class="logs">
    <Tabs>
      <template v-for="item in tabs">
        <Tab :title="item.title">
          <List
            immediate-check
            :loading="$loading"
            :finished="item.finished"
            @load="() => item.api()"
          >
            <CellGroup>
              <template v-for="row in item.rows" :key="row.id">
                <Cell title-style="flex:2" :title="row.title" :label="row.label">
                  <span class="text-red-500">{{ row.value }}</span>
                </Cell>
              </template>
            </CellGroup>
          </List>
        </Tab>
      </template>
    </Tabs>
  </div>
</template>
<script setup lang="ts">
import { Tab, Tabs, List, CellGroup, Cell } from "vant";
import { ref, reactive, nextTick } from "vue";
import { pay_order_list, getUserGiftList, getUserSendGiftList } from "@/api/user";
import dayjs from "dayjs";

const $loading = ref<boolean>(false);
const tabs = reactive<any>([
  {
    title: "充值记录",
    rows: [] as any,
    page: 0,
    async api() {
      if (!$loading.value) {
        $loading.value = true;
        this.page++;
        const { data } = await pay_order_list({ page: this.page });
        this.finished = data.length <= 0;
        this.rows = [
          ...this.rows,
          ...data.map((item: any) => {
            return {
              id: item.id,
              title: "米钻充值",
              value: `+${Number(item.mizuan)}米钻`,
              label: dayjs(+`${item.paytime}000`).format("YYYY-MM-DD HH:mm"),
            };
          }),
        ];
        await nextTick();
        $loading.value = false;
      }
    },
    loading: false,
    finished: false,
  },
  {
    title: "礼物收入",
    rows: [] as any,
    page: 0,
    async api() {
      if (!$loading.value) {
        $loading.value = true;
        this.page++;
        const { data } = await getUserGiftList({ page: this.page });
        this.finished = data.length <= 0;
        this.rows = [
          ...this.rows,
          ...data.map((item: any) => {
            return {
              id: item.id,
              title: `${item.nickname}赠送 ${item.giftName}x${item.giftNum}`,
              value: `+${Number(item.giftPrice)}米钻`,
              label: dayjs(item.created_at).format("YYYY-MM-DD HH:mm"),
            };
          }),
        ];
        await nextTick();
        $loading.value = false;
      }
    },
    loading: false,
    finished: false,
  },
  {
    title: "打赏礼物",
    rows: [] as any,
    page: 0,
    async api() {
      if (!$loading.value) {
        $loading.value = true;
        this.page++;
        const { data } = await getUserSendGiftList({ page: this.page });
        this.finished = data.length <= 0;
        this.rows = [
          ...this.rows,
          ...data.map((item: any) => {
            return {
              id: item.id,
              title: `赠送${item.nickname} ${item.giftName}x${item.giftNum}`,
              value: `-${Number(item.giftPrice)}米钻`,
              label: dayjs(item.created_at).format("YYYY-MM-DD HH:mm"),
            };
          }),
        ];
        await nextTick();
        $loading.value = false;
      }
    },
    loading: false,
    finished: false,
  },
  //   { title: "米币兑换", rows: [] },
  //   { title: "米币提现", rows: [] },
]);
</script>
