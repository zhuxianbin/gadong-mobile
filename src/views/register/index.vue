<template>
  <div class="page page-login">
    <div class="page-pad">
      <div class="panel-login">
        <div class="panel-title">手机号注册</div>
        <div class="panel-body">
          <Form @submit="onSubmit">
            <CellGroup inset class="!mx-0">
              <Field
                v-model="prms.phone"
                placeholder="手机号码"
                label="手机号码"
                size="large"
                label-width="20vw"
                :rules="[{ required: true, message: '请填写手机号码' }]"
              >
              </Field>
              <Field
                v-model="prms.code"
                placeholder="验证码"
                label="验证码"
                size="large"
                label-width="20vw"
                :rules="[{ required: true, message: '请填写验证码' }]"
              >
                <template #button>
                  <Button size="small" type="default" @click="doSendCode">{{ btnText }}</Button>
                </template>
              </Field>
              <Field
                v-model="prms.pass"
                type="password"
                placeholder="密码"
                label="密码"
                size="large"
                label-width="20vw"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </CellGroup>
            <div class="my-[20px]">
              <Row :gutter="10">
                <Col :span="8">
                  <Button round block type="primary" plain @click="$router.back()"> 返回 </Button>
                </Col>
                <Col :span="16">
                  <Button round block class="uu-btn-primary" type="primary" native-type="submit">
                    注册
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
      <!-- <div>
          <div>快捷登录</div>
        </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, shallowRef } from "vue";
import { useCountDown } from "@vant/use";
import { useRoute, useRouter } from "vue-router";
import { Button, Form, CellGroup, Field, Col, Row } from "vant";

import { registered, verification } from "@/api/user";

const $route = useRoute();
const $router = useRouter();

const btnText = shallowRef<string>("获取验证码");
const countDown = useCountDown({
  time: 300 * 1000,
  onChange: (current) => {
    btnText.value = `${current.seconds}s`;
  },
  onFinish: () => {
    btnText.value = "获取验证码";
  },
});

const { redirect } = $route.query as { redirect: string };

const prms = reactive({
  phone: "",
  pass: "",
  code: "",
});
async function doSendCode() {
  await verification({
    phone: prms.phone.trim(),
    type: "reg",
  });
  countDown.reset();
  countDown.start();
}
async function onSubmit() {
  const { phone, pass, code } = prms;
  const { data } = await registered({ phone, pass, code });
  console.log(data);
  //   setStore({ name: "user", content: data });
  //   setToken(data.token);
  //   if (redirect) {
  //     return $router.replace({ path: redirect });
  //   }
  $router.replace({ path: "/login" });
  countDown.reset();
}
</script>

<style lang="less" scoped>
.page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  &.page-login {
    background: url("/static/images/login-bg.jpg");
    background-size: 100%;
    background-position: top;
    color: #fff;
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
    background: rgba(215, 215, 215, 0.5);
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
