<template>
  <div class="my-[15px]">
    <CellGroup inset>
      <template v-for="item in rows" :key="item.id">
        <Cell is-link :title="item.name" :to="{ name: 'cms.info', params: { id: item.id } }" />
      </template>
    </CellGroup>
  </div>
</template>

<script lang="ts" setup>
import { cms } from "@/api/cms";
import { CellGroup, Cell } from "vant";
import { watchEffect } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const $route = useRoute();
const rows = ref<{ id: string; name: string }[]>([]);

watchEffect(async () => {
  const { type } = $route.params;
  const { data } = await cms.list({ type: type });
  rows.value = data;
});
</script>

<style lang="less" scoped></style>
