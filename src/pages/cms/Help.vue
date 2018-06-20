<template>
    <div class="help">
        <!-- <img src="../../assets/images/call.png"> -->
        <div class="help_container">
            <div class="help_container_wraper">
              <Col span="7">
              <router-link to="/notice">
               <div class="ivu-col-span-7-bg">
                <img src="../../assets/images/consult.png">
                </div>
                 
                <h2>{{$t('cms.noticecenter')}}</h2>
                <p>{{$t('cms.viewAnnoun')}}</p>
                 </router-link>
                <!-- <a href="tencent://message/?uin=924499270&site=qq&menu=yes">

                </a> -->
            </Col>
            <!-- <Col span="7">
            <div>
                <img src="../../assets/images/help.png">
                </div>
                 <router-link to="/newhelp">
                <h2>{{$t('cms.newshelp')}}</h2>
                 </router-link>
            </Col> -->
            <Col span="7" >
              <div @click="scrollApp">
                <div class="ivu-col-span-7-bg">
                 <img src="../../assets/images/wechats.png">
                </div>
                <h2  >{{$t('cms.appdownload')}}</h2>
                <p>{{$t('cms.qrcode')}}</p>
              </div>
            </Col>
            </div>
            
            <div v-show="isShowWeChat" style="position: absolute;right: 66px;">
              <img src="../../assets/images/wechats.png">
            </div>
            <Col span="24" style="color:#000;font-size:18px;">
                <p style="line-height:50px;">{{$t('cms.faq')}}</p>
                <div v-for="item in FAQList" class="faqlist" >
                    <div class="fqtitle"><p>{{item.title}}<span style="margin-left: 20px;">{{item.createTime}}</span></p></div>
                    <div class="fqcontent" v-html="item.content"></div>
                </div>
            </Col>
        </div>
    </div>
</template>
<style>
.help {
  background: white;
  /* background:url(/assets/images/help_bg.png) no-repeat center; */
  height: 100%;
  background-size: cover;
  position: relative;
  overflow: hidden;
}
.help_container {
  padding: 0 12%;
  min-height: 600px;
}
.help_container .help_container_wraper {
  display: flex;
  justify-content: space-around;
}
.help_container .help_container_wraper .ivu-col-span-7 {
  width: 544px;
  text-align: center;
  background: #fff;
  border: 1px solid #ececec;
  margin: 50px 2% 10px 2%;
  color: #000;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}
.help_container .help_container_wraper .ivu-col-span-7 div.ivu-col-span-7-bg {
  /* background: #fff !important ; */
  background: #121c3c;
}
.ivu-col-span-7 h2 {
  padding-top: 15px;
  line-height: 35px;
  font-size: 22px;
  font-weight: 500;
  color: #131313;
}
.ivu-col-span-7 p {
  font-size: 15px;
  line-height: 35px;
  padding-bottom: 40px;
  color: #484848;
}
.ivu-col-span-7 img {
  margin: 40px 0 20px;
  height: 42px;
}
.ivu-col-span-7 button {
  width: 50%;
  margin: 10px 0;
  color: #000;
  background: #fff;
  font-size: 15px;
}
.ivu-col-span-7 button:hover {
  background: #464650;
}
.help_container .ivu-table th {
  text-align: center;
  background: #a3a3a3;
  color: #28313e;
  border: 0;
}
.help_container .ivu-table td {
  background: none;
  text-align: center;
  background: #7c7c7c;
  opacity: 0.5;
}
.help_container .ivu-table tr:last-child td {
  border: 0;
}
.faqlist {
  text-align: left;
}
h2:hover {
  cursor: pointer;
}
.fqcontent p {
  padding: 10px 40px;
  text-align: left;
  text-indent: 2em;
}
.faqlist p {
  background: whitesmoke;
  line-height: 51px;
  padding: 0 15px;
}
.faqlist div {
  color: #777;
  font-size: 14px;
  line-height: 26px;
  padding: 15px 15px;
  word-wrap: break-word;
}
</style>
<script>
export default {
  data() {
    return {
      isShowWeChat: false,
      FAQContent: "",
      FAQList: []
    };
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("navigate", "nav-service");
      this.$store.state.HeaderActiveName = "1-7";

      this.loadFAQData();
    },
    loadFAQData() {
      let param = {};
      // param["sysHelpClassification"] = 1;
      this.$http.get(this.host + "/uc/ancillary/system/help").then(response => {
        var resp = response.body;
        console.log(resp)
        if (resp.code == 0) {
          this.FAQList = resp.data.filter(item => {
            return item.sysHelpClassification == 1&&item.status==0;
          });
          // this.FAQContent = resp.data.content;
        }
      });
    },
    showEwm() {
      // let onlinechatUrl = "http://kefu.caymanex.pro:80/im/text/15FwEk.html";

      // window.open(onlinechatUrl);
      //触发在线客服按钮的点击事件

      $("#YSF-BTN-HOLDER").trigger("click");
      return;
      // this.isShowWeChat = !this.isShowWeChat;
      const title = this.$t("common.tip");
      const content = "<p>" + this.$t("common.expect") + "</p>";
      this.$Modal.info({
        title: title,
        content: content,
        closable: true
      });
    },
    scrollApp() {
      this.$router.push("/");
      setTimeout(() => {
        document.getElementById("page5").scrollIntoView();
      }, 0);
    }
  }
};
</script>
