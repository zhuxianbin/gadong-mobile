<template>
  <Popup v-model:show="$show" round closeable :close-on-click-overlay="false">
    <div>
      <div class="p-[10px]">
        <div class="font-bold text-center my-10px">将米币兑换为米钻</div>
        <div class="text-14px text-gray-500 text-center">账户可兑换上限: {{ $data.mibi }}</div>
        <div class="mt-10px">
          <Form @submit="doSubmit">
            <CellGroup :border="false">
              <Field
                label="米币"
                label-width="10vw"
                input-align="center"
                placeholder="请输入兑换数量"
                v-model.number="$form.money"
                type="number"
                size="large"
                :rules="[
                  { required: true, message: '请填写兑换数量' },
                  { validator: checkMax, message: `请输入 1 到 ${$data.mibi} 之间的数字` },
                ]"
              >
                <template #button>
                  <Button size="mini" type="primary" plain @click="doAll"> 全部兑换 </Button>
                </template>
              </Field>
              <Cell title="可兑换米钻"> {{ $mizuan || 0 }} 米钻</Cell>
            </CellGroup>

            <div class="mt-[30px]">
              <Button round block type="primary" class="uu-btn-primary" native-type="submit">
                确认兑换
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </Popup>
</template>
<script setup lang="ts">
import {
  Popup,
  Form,
  Field,
  CellGroup,
  Cell,
  Button,
  showConfirmDialog,
  showSuccessToast,
} from "vant";
import { ref, unref } from "vue";
import { my_store, exchange } from "@/api/user";
import { computed } from "vue";

import { emitter } from "@/utils/emitter";

const $show = ref<boolean>(false);
const $data = ref<any>({
  mizuan: 0,
});
const $form = ref<any>({
  money: "",
});

// 表单对象。写死或实现更具体的操作。写成员的数组或
const $mizuan = computed(() => {
  const form = unref($form);
  return (form.money || 0) * 10;
});

function checkMax(val) {
  const mibi = $data.value.mibi || 0;
  return val <= mibi && val > 0;
}

function doAll() {
  const mibi = $data.value.mibi || 0;
  $form.value.money = mibi;
}

async function doSubmit() {
  console.log($form.value);
  const { money } = $form.value;
  const mizuan = $mizuan.value;

  await showConfirmDialog({
    title: "确认兑换",
    message: `确认使用 ${money}米币 兑换 ${mizuan}米钻 吗?`,
  });

  await exchange({ money: money });
  showSuccessToast("兑换成功");
  emitter.emit("exchangeSuccess", { money });
  $show.value = false;
}

async function queryMyStore() {
  const { data } = await my_store();
  $data.value = data.at(0);
}

defineExpose({
  show: async () => {
    await queryMyStore();
    $show.value = true;
  },
});
</script>
