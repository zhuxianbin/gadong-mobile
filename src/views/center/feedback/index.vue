<template>
  <div class="p-[15px]">
    <div>
      <div>问题描述</div>
      <div class="my-[10px]">
        <Field
          class="rounded"
          v-model="content"
          rows="5"
          placeholder="请填写您遇到的问题或建议。。。"
          type="textarea"
          :maxlength="300"
          show-word-limit
        ></Field>
      </div>
      <div class="bg-[#fff] p-[10px] rounded">
        <Uploader :max-count="1" v-model="fileList" :after-read="afterRead" />
      </div>
      <div class="my-[10px]">
        <Button round block type="primary" @click="doSubmit">提 交</Button>
      </div>
    </div>
    <div class="my-[20px]">
      <div class="mb-[10px]"><span class="title">联系我们</span></div>
      <div>
        <Service />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Button, Field, Uploader, showSuccessToast, showConfirmDialog } from "vant";
import { feedback } from "@/api";
import { Service } from "@/components";

const content = ref<string>("");
const img = ref<string>("");
const fileList = ref<any>([]);

async function afterRead(file: { content: string }) {
  img.value = file.content;
  return file;
}

async function doSubmit() {
  await showConfirmDialog({
    title: "确认",
    message: "确认提交吗?",
  });
  await feedback({ content: content.value, img: img.value });
  showSuccessToast("提交成功");
}
</script>
