<template>
  <div class="p-[10px]">
    <div class="content-title">{{ model.name }}</div>
    <div class="content-body" v-html="model.content"></div>
  </div>
</template>

<script lang="ts" setup>
import { cms } from "@/api/cms";
import { ref, onMounted } from "vue";

const props = withDefaults(defineProps<{ id: string }>(), {});
const model = ref<any>({});

onMounted(async () => {
  const { data } = await cms.info({ id: props.id });
  // const [model] = data;
  model.value = data;
  document.title = data.name;
});
</script>

<style lang="less" scoped>
.content-title {
  text-align: left;
  font-size: 16px;
  line-height: 30px;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}
</style>
