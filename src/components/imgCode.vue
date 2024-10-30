<template>
  <div id="imgCodeBox" @click="createCode">
    <canvas id="v_container" width="100" height="100"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const code = ref("");

onMounted(() => {
  createCode();
});

function createCode() {
  const getElementById = document.getElementById.bind(document);
  const { clientWidth, clientHeight } = getElementById("imgCodeBox") as HTMLElement;
  const canvas: HTMLCanvasElement = getElementById("v_container") as HTMLCanvasElement; //获取画布
  canvas.width = clientWidth;
  canvas.height = clientHeight;
  code.value = "";

  let codeLength = 4; //验证码的长度，可变
  let selectChar = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(
    ","
  ); //所有候选组成验证码的字符

  for (let i = 0; i < codeLength; i++) {
    let charIndex = Math.floor(Math.random() * 36);
    code.value += selectChar[charIndex];
  }
  if (canvas) {
    let ctx: any = canvas.getContext("2d");
    ctx.clearRect(0, 0, clientWidth, clientHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, clientWidth, clientHeight);
    ctx.font = clientHeight / 1.7 + "px arial";
    // 创建渐变
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // 用渐变填色
    ctx.strokeStyle = gradient;
    ctx.strokeText(code.value, clientWidth / 5, clientHeight / 1.5); //画布上添加验证码
  }
  console.log(code.value);
}

defineExpose({
  code,
  createCode,
});
</script>

<style scoped>
#imgCodeBox {
  width: 20vw;
  height: 8vw;
  border: 1px solid #eee;
  overflow: hidden;
  border-radius: 4px;
}
</style>
