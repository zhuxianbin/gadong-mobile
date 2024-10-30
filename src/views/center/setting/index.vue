<template>
  <div>
    <CellGroup class="my-[10px]">
      <Cell title="修改密码" is-link :to="{ name: 'center.setting.password' }" />
      <Cell title="注销账号" is-link @click="doLogOff" />
    </CellGroup>
    <CellGroup class="my-[10px]">
      <Cell title="协议与帮助" :to="{ name: 'cms.list', params: { type: 3 } }" is-link />
    </CellGroup>
    <CellGroup class="my-[10px]">
      <Cell title="退出登录" is-link @click="doLogout" />
    </CellGroup>
  </div>
</template>

<script lang="ts" setup>
import { Cell, CellGroup } from "vant";
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/auth";
import { doLogOff } from "./index";

const $router = useRouter();

function doLogout() {
  removeToken();
  $router.push({ name: "login" });
}
</script>
