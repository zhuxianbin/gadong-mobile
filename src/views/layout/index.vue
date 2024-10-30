<template><router-view v-if="isReady"></router-view></template>
<script lang="ts" setup>
import { getUserInfoByToken } from "@/utils/auth";
import { onMounted } from "vue";
import { ref } from "vue";
const isReady = ref(false);
onMounted(async () => {
  const { data } = await getUserInfoByToken();
  isReady.value = true;
});
</script>
