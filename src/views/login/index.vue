<template>
  <div class="page page-login">
    <div class="page-pad">
      <div class="panel-login">
        <div class="panel-title">结算系统</div>
        <div class="panel-body">
          <form class="uu-form">
            <div class="uu-form-item">
              <label>手机号码</label>
              <div class="uu-input">
                <input v-model="prms.phone" placeholder="请输入手机号码" />
              </div>
            </div>
            <div class="uu-form-item" style="margin-top: 22px">
              <label>密码</label>
              <div class="uu-input">
                <input v-model="prms.pass" type="text" onfocus="this.type = 'password'"  placeholder="请输入登录密码"  />
              </div>
            </div>
            <div style="margin: 32px 0 16px">
              <Button block round class="uu-btn-primary" type="primary" @click="doLogin">
                登 录
              </Button>
            </div>
            <div class="clearfix mt-[40px]">
              <!-- <div class="pull-left">忘记密码?</div> -->
              <!-- <div class="pull-right">
                <a href="/#/register">立即注册</a>
              </div> -->
            </div>
          </form>
        </div>
      </div>
      <!-- <div>
        <div>快捷登录</div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button } from "vant";

import { login } from "@/api/user";
import { setStore } from "@/utils/store";
import { setToken } from "@/utils/auth";

const $route = useRoute();
const $router = useRouter();
const { redirect } = $route.query as { redirect: string };

const prms = reactive({
  phone: "",
  pass: "",
});

async function doLogin() {
  const { phone, pass } = prms;
  const { data } = await login({ phone, pass });
  setStore("user", data);
  setToken(data.token);
  if (redirect) {
    return $router.replace({ path: redirect });
  }
  $router.replace({ name: "center" });
}
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  &.page-login {
    // background: url("/static/images/login-bg.jpg");
    background-size: 100%;
    background-position: top;
    // color: #fff;
    animation-name: bgzoom;
    animation-duration: 50s;
    animation-delay: 0;
    animation-fill-mode: both;
    animation-timing-function: linear;
    animation-direction: alternate;
    animation-iteration-count: infinite;
  }

  .page-pad {
    padding: 30px;
  }

  .panel-login {  
    padding: 100px 0 0 0;
  }

  .panel-title {
    font-size: 26px;
    line-height: 1;
    font-weight: 400;
    margin-bottom: 32px;
  }

  .uu-form-item {
    label {
      display: block;
      font-size: 12px;
      line-height: 1;
      opacity: 0.9;
      margin-bottom: 10px;
    }
  }

  .uu-input {
    position: relative;
    // background: rgba(215, 215, 215, 0.5);
    height: 48px;
    border-radius: 8px;

    input {
      background: transparent;
      border: 0;
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      font-size: 18px;
      border-bottom:1px solid #ccc;
    }
  }
}

@keyframes bgzoom {
  0% {
    background-size: 100%;
  }
  100% {
    background-size: 120%;
  }
}
</style>
