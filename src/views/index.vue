<template>
  <div>
    <Search shape="round" v-model="value" placeholder="请输入搜索关键词" />
    <Swipe>
      <SwipeItem>
        <img class="w-full" src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </SwipeItem>
      <SwipeItem>
        <img class="w-full" src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </SwipeItem>
      <SwipeItem>
        <img class="w-full" src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search, Swipe, SwipeItem } from "vant";
const value = ref(""); // 搜索框的值
</script>

<style scoped></style>
