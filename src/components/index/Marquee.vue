<template>
    <div class="marqueeWarp">
        <div class="iconWarp">
            <svg class="icon tongzhi" aria-hidden="true">
                 <use xlink:href="#icon-tongzhi"></use>
             </svg>
        </div>
    <vueSeamless 
    :data="listData" 
    :class-option="optionSingleHeightTime" 
    class="seamless-warp">
        <ul class="item">
            <li 
            v-for="item in listData">
                <span class="title" v-text="item.title"></span><span class="date" v-text="item.date"></span><span>[{{item.index}}/{{listData.length}}]</span>
            </li>
        </ul>
    </vueSeamless>
    </div>
</template>
<script>
import vueSeamless from "vue-seamless-scroll";
export default {
  components: {
    vueSeamless
  },
  data() {
    return {
      listData: [
        {
          title: "邀请用户得返佣，活动期间邀请好友进行实名认证成功即可获得平台奖励！",
          date: "",
          index:1
        },
        {
          title: "邀请用户得返佣，活动期间邀请好友进行实名认证成功即可获得平台奖励！",
          date: "",
          index:2
        },
        {
          title: "邀请用户得返佣，活动期间邀请好友进行实名认证成功即可获得平台奖励！",
          date: "",
          index:3
        }
      ]
    };
  },
  computed: {
    optionSingleHeightTime() {
      return {
        limitMoveNum:2,
        singleHeight: 22,
        waitTime: 2500
      };
    }
  }
};
</script>
<style scoped>
.marqueeWarp{
    padding:  15px 0 15px 144px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #16182e;
}
.tongzhi{
    font-size: 28px;
    color: #bdc0d3;
}
.tongzhi{
   display: flex;
     flex-direction: row;
     align-items: center; 
}

.seamless-warp {
        height: 20px;
        font-size: 14px;
        color: #bdc0d3;
        overflow: hidden;
 }
 .seamless-warp ul li{
     padding-left: 18px;
     min-width: 1000px;
     line-height: 22px;
     display: flex;
     flex-direction: row;
     align-items: center;
 }
</style>


