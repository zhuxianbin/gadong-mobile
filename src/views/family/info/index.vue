<template>
  <div class="fml">
    <div class="fml-panel fml-top">
      <div class="fml-head">
        <div class="bg-head" :style="headStyle"></div>
        <div class="fml-logo">
          <img class="fml-logo-pic" :src="state.model.image" />
        </div>
      </div>
      <div class="progress">
        <div class="level-left">lv.{{ state.model.level }}</div>
        <div class="level-right">lv.{{ state.model.level + 1 }}</div>
        <van-progress
          class="progress-bar"
          :pivot-text="'' + state.model.vcount"
          :stroke-width="12"
          pivot-color="#9c2dd4"
          color="linear-gradient(135deg,#103cf7,#9c2dd4)"
          :percentage="+state.model.scale"
        />
      </div>
    </div>
    <div class="fml-panel">
      <div class="fml-panel-label">家族名称</div>
      <div class="fml-panel-content">
        <div>{{ state.model.name }}</div>
      </div>
    </div>
    <div class="fml-panel">
      <div class="fml-panel-label">家族介绍</div>
      <div class="fml-panel-content">
        <div>{{ state.model.introduce }}</div>
      </div>
    </div>
    <div class="fml-panel">
      <div class="fml-panel-label">家族公告</div>
      <div class="fml-panel-content">
        <div>{{ state.model.notice }}</div>
      </div>
    </div>
    <div class="fml-panel">
      <div class="fml-panel-label">家族成员({{ state.model.num }})</div>
      <div class="fml-panel-content">
        <Row>
          <template v-for="item in state.model.family_user_list" :key="item.family_user_id">
            <Col :span="4">
              <div class="hy">
                <div class="hy-pic">
                  <van-image
                    :src="item.headimgurl"
                    width="12vw"
                    height="12vw"
                    round
                    fit="cover"
                  ></van-image>
                </div>
                <div class="hy-name">
                  {{ item.nickname }}
                </div>
              </div>
            </Col>
          </template>
        </Row>
      </div>
    </div>
    <div class="footer-options">
      <div class="padd-10">
        <template v-if="canJoin">
          <Button round type="primary" block @click="doJoin">申请加入</Button>
        </template>
        <template v-if="isMember">
          <Row :gutter="10">
            <Col :span="12">
              <Button round type="primary" block @click="doDonate">家族捐献</Button></Col
            >
            <Col :span="12"
              ><Button round plain type="danger" block @click="doLeaveFamily">退出家族</Button></Col
            >
          </Row>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getStore } from "@/utils/store";
import { native } from "@/utils/hybrid";
import { Row, Col, Button, showConfirmDialog, showSuccessToast } from "vant";
import * as api from "@/api/index";
import { reactive } from "vue";
import { computed } from "vue";
import { onMounted } from "vue";

const props = withDefaults(defineProps<{ id: string }>(), {});
const user = getStore("user") || {};

const state = reactive({
  user,
  model: {
    name: "",
    num: 0,
    level: 0,
    introduce: "",
    family_user_list: [] as any,
    vcount: "",
    scale: "",
    image: "",
    notice: "",
  },
});

const headStyle = computed(() => {
  return {
    "background-image": `url(${state.model.image})`,
  };
});

const isMember = computed(() => {
  return state.model.family_user_list.some((item: any) => item.user_id === state.user.id);
});

const canJoin = computed(() => {
  return !isMember;
});

async function getFamilyDetail() {
  const { data } = await api.getFamilyDetail({ family_id: props.id });
  state.model = data;
}
async function getMyFamilyInfo() {
  await api.getMyFamilyInfo();
}

async function getFamilyMoreList() {
  await api.getFamilyMoreList({ family_id: props.id });
}
async function doLeaveFamily() {
  await showConfirmDialog({
    title: "操作确认",
    message: "确认退出该家族吗?",
  });
  await api.actionQuitFamily({ family_id: props.id });
  window.location.reload();
}
async function doDonate() {
  native.close();
}
async function doJoin() {
  await api.actionApplyFamily({ family_id: props.id });
  showSuccessToast("申请已提交,请耐心等待");
}

onMounted(() => {
  getFamilyDetail();
});
</script>

<style lang="less" scoped>
.fml-panel {
  background-color: #fff;
  padding: 15px;
  border-bottom: 1px solid #eee;

  .bg-head {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    filter: blur(10px);
    opacity: 0.618;
    z-index: 0;
  }

  &.fml-top {
    background-color: #000;
    text-align: center;
    padding: 0;
  }

  .fml-head {
    position: relative;
    padding: 20px;

    .fml-logo {
      position: relative;
      z-index: 2;
    }

    .fml-logo-pic {
      display: block;
      margin: 0 auto;
      border-radius: 10px;
      width: 80px;
      height: 80px;
    }
  }
  .progress {
    position: relative;
    padding: 5px 60px;
    background-color: rgba(255, 255, 255, 0.382);
    .level-left,
    .level-right {
      position: absolute;
      width: 60px;
      top: 4px;
      font-size: 12px;
      text-align: center;
      text-shadow: 1px 1px 2px #fff;
    }
    .level-left {
      left: 0;
    }
    .level-right {
      right: 0;
    }
  }

  .fml-panel-label {
    font-size: 12px;
    font-weight: 400;
    color: #666;
    margin-bottom: 10px;
  }

  .fml-panel-content {
    font-size: 14px;
  }

  .hy {
    text-align: center;
    margin-bottom: 10px;
    height: 100px;
    .hy-name {
      margin-top: 5px;
      font-size: 10px;
      color: #666;
    }
  }
}

.fml {
  padding-bottom: 80px;
  position: relative;
  width: 100vw;
  overflow: hidden;
  .footer-options {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    text-align: center;
  }

  .padd-10 {
    padding: 10px;
  }
}
</style>
