<template>
  <div>
    <div>
      <div>
        <div class="my-[15px]">
          <Form @submit="onSubmit">
            <CellGroup inset>
              <Field
                v-model="prms.phone"
                placeholder="手机号码"
                size="large"
                label="手机号码"
                name="username"
                :rules="[{ required: true, message: '请填写手机号码' }]"
              >
              </Field>
              <Field
                v-model="prms.code"
                placeholder="验证码"
                size="large"
                name="code"
                label="验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
              >
                <template #button>
                  <Button size="small" type="default" @click="doSendCode">{{ btnText }}</Button>
                </template>
              </Field>
              <Field
                v-model="prms.pass"
                type="password"
                placeholder="建议密码8-20个字符"
                label="新密码"
                size="large"
                :rules="[{ required: true, message: '请填写新密码' }]"
              />
            </CellGroup>
            <div class="my-[20px] mx-[15px]">
              <Button block type="primary" class="uu-btn-primary" native-type="submit">
                确 定
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, shallowRef } from "vue";
import { useCountDown } from "@vant/use";
import { useRoute, useRouter } from "vue-router";
import { Button, Form, CellGroup, Field, showSuccessToast } from "vant";

import { forget_pwd, verification } from "@/api/user";

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

const $route = useRoute();
const $router = useRouter();
const { redirect } = $route.query as { redirect: string };

const prms = reactive({
  phone: "",
  pass: "",
  code: "",
});
async function doSendCode() {
  await verification({
    phone: prms.phone.trim(),
    type: "",
  });
  countDown.reset();
  countDown.start();
}
async function onSubmit() {
  const { phone, pass, code } = prms;
  const { message }: any = await forget_pwd({ phone, pass, code });

  showSuccessToast(message);
  $router.back();
  countDown.reset();
}
</script>

<style lang="less" scoped></style>
