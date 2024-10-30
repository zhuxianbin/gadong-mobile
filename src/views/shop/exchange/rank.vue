<template>
  <div class="content-wrapper" :class="{ month: tabVal === 2 }">
    <div class="content-wrapper__header">
      <van-icon class="help-btn" name="question-o" @click="turnToHelpPage" />

      <div class="switch-tab">
        <div class="switch-tab__item" @click="switchRankType(1)">
          <div class="switch-btn" :class="{ active: tabVal === 1 }">总榜</div>
        </div>
        <div class="switch-tab__item" @click="switchRankType(2)">
          <div class="switch-btn" :class="{ active: tabVal === 2 }">月榜</div>
        </div>
      </div>
      <template v-if="rankList.length > 0">
        <div class="rank-top">
          <div class="rank-top__item top2">
            <div class="avatar-box">
              <div class="avatar">
                <img :src="rankList[1].headimgurl" alt="" />
              </div>
              <div class="rank-num">2</div>
            </div>
            <div class="rank-name">{{ rankList[1].nickname || "" }}</div>
            <div class="rank-id">ID: {{ rankList[1].id }}</div>
            <div class="rank-gold-num">
              <img src="/static/icons/dh_jinbi.png" alt="" />
              {{ rankList[1].jb_month || rankList[1].jinbi || 0 }}
              <span class="text-[12px]"></span>
            </div>
          </div>
          <div class="rank-top__item top1">
            <div class="avatar-box">
              <div class="avatar">
                <img :src="rankList[0].headimgurl" alt="" />
              </div>
              <div class="rank-num">1</div>
            </div>
            <div class="rank-name">{{ rankList[0].nickname || "" }}</div>
            <div class="rank-id">ID: {{ rankList[0].id }}</div>
            <div class="rank-gold-num">
              <img src="/static/icons/dh_jinbi.png" alt="" />

              {{ rankList[0].jb_month || rankList[0].jinbi || 0 }}
              <span class="text-[12px]"></span>
            </div>
          </div>
          <div class="rank-top__item top3">
            <div class="avatar-box">
              <div class="avatar">
                <img :src="rankList[2].headimgurl" alt="" />
              </div>
              <div class="rank-num">3</div>
            </div>
            <div class="rank-name">{{ rankList[2].nickname || "" }}</div>
            <div class="rank-id">ID: {{ rankList[2].id }}</div>
            <div class="rank-gold-num">
              <img src="/static/icons/dh_jinbi.png" alt="" />

              {{ rankList[2].jb_month || rankList[2].jinbi || 0 }}
              <span class="text-[12px]"></span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="rank-list">
      <div v-for="(item, index) in rankList" :key="index">
        <div class="rank-item" v-if="index > 2">
          <div class="rank-msg">
            <span class="rank-item__num text-[12px]">{{ index + 1 }}</span>
            <img class="rank-item__avatar" :src="item.headimgurl" alt="" />
            <span class="rank-item__name text-[14px]">{{ item.nickname }}</span>
          </div>
          <div class="rank-gold-num text-[14px]">
            <img src="/static/icons/dh_jinbi.png" alt="" />
            {{ item.jb_month || item.jinbi || 0 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { gold_ranking, getMonthRankList } from "@/api/shop";
import { onMounted, ref } from "vue";
const tabVal = ref(1);
const rankList = ref<any[]>([]);

async function query_gold_ranking() {
  const Handler = tabVal.value === 1 ? gold_ranking : getMonthRankList;
  let { data } = await Handler({ top: 5 });
  rankList.value = data;
  return data;
}

function switchRankType(type: number) {
  tabVal.value = type;
  rankList.value = [];
  query_gold_ranking();
}

function turnToHelpPage() {
  window.location.href = "https://m.yy12.com/#/cms/info/30";
}

onMounted(async () => {
  await query_gold_ranking();
});
</script>

<style lang="less" scoped>
.content-wrapper {
  background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content-wrapper__header {
    background: linear-gradient(#f5ac10, #f68928);
    padding: 30px 20px;
    color: #fff;
    position: relative;

    .help-btn {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 20px;
    }
  }

  .switch-tab {
    display: flex;
    .switch-tab__item {
      flex: 1;
      text-align: center;
      color: #fff;

      .switch-btn {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        padding: 6px 30px;
        border-radius: 30px;
        font-size: 14px;

        &.active {
          background: #fff;
          color: #f5a714;
        }
      }
    }
  }

  .rank-top {
    display: flex;
    align-items: flex-end;
    padding-top: 30px;

    .rank-top__item {
      flex: 1;
      text-align: center;

      .avatar-box {
        position: relative;

        .avatar {
          display: inline-block;
          width: 60px;
          height: 60px;
          border-radius: 60px;
          border: 2px solid #fff;
          overflow: hidden;
          text-align: center;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .rank-num {
          position: absolute;
          left: 50%;
          margin-left: -9px;
          bottom: 0;
          width: 18px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          background: #f1f1f1;
          border-radius: 18px;
          color: #999;
          box-sizing: border-box;
          border: 1px solid #fff;
        }
      }

      .rank-name {
        font-size: 14px;
        margin-top: 16px;
      }

      .rank-id {
        font-size: 12px;
        opacity: 0.6;
        margin: 4px 0;
        font-weight: 500;
      }

      .rank-gold-num {
        font-weight: 700;
        img {
          display: inline-block;
          width: 14px;
        }
      }

      &.top1 {
        .avatar {
          width: 80px;
          height: 80px;
        }

        .rank-num {
          width: 22px;
          height: 22px;
          line-height: 22px;
          margin-left: -11px;
          font-size: 14px;
          background: #edab00;
          color: #fff;
        }
      }
      &.top3 {
        .rank-num {
          background: #e96400;
          color: #fff;
        }
      }
    }
  }

  .rank-list {
    overflow-y: auto;
    flex: 1;
    .rank-item {
      display: flex;
      align-items: center;
      align-content: center;
      height: 60px;
      padding: 0 10px;
      border-bottom: 1px solid #eee;

      .rank-msg {
        flex: 1;
        display: flex;
        align-items: center;

        .rank-item__num {
          color: #000;
          font-weight: 700;
          min-width: 20px;
        }

        .rank-item__avatar {
          width: 40px;
          height: 40px;
          border-radius: 40px;
          display: inline-block;
          margin: 0 10px;
          overflow: hidden;
        }
      }

      .rank-gold-num {
        width: 120px;
        text-align: right;
        color: #f68f22;
        img {
          width: 18px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }

  &.month {
    .content-wrapper__header {
      background: linear-gradient(#b64bea, #6950fb);
    }

    .switch-tab__item .switch-btn.active {
      color: #ab4ced;
    }

    .rank-list .rank-gold-num {
      color: #844cf9;
    }
  }
}
</style>
