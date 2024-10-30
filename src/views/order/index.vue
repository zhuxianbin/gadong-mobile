<template>
  <div>
    <router-view />

    <Tabbar v-model="$active" route active-color="#000000" inactive-color="#B7B8C4">
      <TabbarItem replace to="/order/home" name="home" icon="/static/images/order/order_home.png">
        <span>下单</span>
        <template #icon="props">
          <img
            :src="
              props.active
                ? '/static/images/order/order_home_s.png'
                : '/static/images/order/order_home.png'
            "
          />
        </template>
      </TabbarItem>
      <TabbarItem replace to="/order/mine" name="mine" icon="/static/images/order/order_mine.png">
        <span>我的</span>
        <template #icon="props">
          <img
            :src="
              props.active
                ? '/static/images/order/order_mine_s.png'
                : '/static/images/order/order_mine.png'
            "
          />
        </template>
      </TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import { Tabbar, TabbarItem } from "vant";
import { watchEffect } from "vue";
import { ref } from "vue";

const props = withDefaults(
  defineProps<{
    active: string;
  }>(),
  {
    active: "home",
  }
);
const $active = ref("home");
watchEffect(() => {
  $active.value = props.active;
});
</script>

<style lang="less" scoped></style>
