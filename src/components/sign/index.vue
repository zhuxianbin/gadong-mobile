<template>
  <Popup v-model:show="visible" class="!bg-transparent" close-on-popstate>
    <div class="w-[300px]">
      <template v-if="!success.show">
        <div class="relative pt-[40px]">
          <div class="absolute top-0 px-[30px]">
            <img class="w-full" src="/static/images/home_mrqd.png" />
          </div>
          <div class="bg-[#fff] rounded-xl p-[20px] pt-[50px]">
            <div class="grid grid-cols-4 gap-2">
              <template v-for="item in rows">
                <div class="text-center mb-[20px]">
                  <div class="bg-[#eee] rounded-sm px-[5px] py-[10px] mb-[5px]">
                    <div>
                      <img class="w-full" src="/static/images/gold.png" />
                    </div>
                    <div class="text-[12px] mt-[5px]">{{ item.name }}</div>
                  </div>
                  <div class="text-[12px] text-gray-500">{{ item.day }}</div>
                </div>
              </template>
            </div>
            <div class="px-[50px]">
              <Button block round type="primary" class="uu-btn-primary" @click="doSign">
                立即签到
              </Button>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="relative pt-[130px]">
          <div class="absolute top-0 z-0">
            <img class="w-full" src="/static/images/home_qdcg.png" />
          </div>
          <div class="relative p-[20px] pt-[50px] z-1">
            <div class="text-center">
              {{ success.title }}
            </div>
            <div class="text-center mt-[15px]">
              <!-- <div class="grid grid-cols-4 gap-2"> -->
              <template v-for="item in success.data">
                <div class="text-center mb-[20px] w-[70px] inline-block">
                  <div class="bg-[#f75932] rounded-sm px-[5px] py-[10px] mb-[5px]">
                    <div>
                      <img class="w-full" src="/static/images/gold.png" />
                    </div>
                    <div class="text-[12px] mt-[5px] text-[#fff]">{{ item.title }}</div>
                  </div>
                </div>
              </template>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </template>
    </div>
  </Popup>
</template>

<script setup lang="ts">
import { Popup, Button } from "vant";
import { onMounted, ref, reactive } from "vue";
import { show_sign, sign } from "@/api/user";
// import { showSuccessToast } from "vant";

const visible = ref(false);
const rows = ref<any>([]);

const success = reactive({
  show: false,
  title: "",
  data: [] as any[],
});

async function doSign() {
  const { data } = await sign();
  success.show = true;
  success.data = data.data;
  success.title = data.title;
  // showSuccessToast(data.title);
}

onMounted(async () => {
  const { data } = await show_sign();
  visible.value = !data.is_sign;
  rows.value = data.data;
});
</script>

<style scoped></style>
