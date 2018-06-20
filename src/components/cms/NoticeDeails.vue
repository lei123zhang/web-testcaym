<template>
     <div class="article">
      <!--<img src="../../assets/images/wechats.png">-->
       <div class="content-wrap noticeList">
         <div v-for="notice,index in noticeList">
           <div class="header">
             <h2>{{notice.title}}</h2>
             <span></span>
           </div>
           <div class="content noticeList">
             <span v-html="notice.content"></span>
           </div>
         </div>
       </div>
      </div>
</template>
<script>
export default {
  name: "Details",
  data() {
    return {
      key: 0,
      noticeList: []
    };
  },
  computed: {
    helpindex: function() {
      let id = this.$route.query.id;
      if (typeof id != "undefined" && id != "") {
        return id;
      } else {
        return 1;
      }
    }
  },
  watch: {
    helpindex: function() {
      this.loadHelpByIndex();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loadHelpByIndex();
    },
    loadHelpByIndex() {
      let sysHelpfication = this.helpindex - 1;
      // if (sysHelpClassification == 1) sysHelpClassification=0;
      this.$http.get(this.host + "/uc/ancillary/system/help").then(response => {
        var result = response.body;

        if (result.code == 0 && result.data) {
          this.noticeList = result.data.filter(item => {
            return item.sysHelpClassification === sysHelpfication;
          });
        }
      });
    }
  }
};
</script>

<style>
.agreement {
  background-color: #f7f7fa;
}
.content-wrap.noticeList {
  font-family: 宋体;
  background: #fff;
  font-size: 16px;
  min-height: 240px;
}
.content-wrap.noticeList h2 {
  padding-top: 20px;
  font-size: 24px;
}
.content-wrap.noticeList .content.noticeList {
  padding: 30px 30px 40px 40px;
  text-align: left;
}
.content.noticeList span p {
  text-indent: 2em;
  font-size: 18px;
}
.content.noticeList span img {
  width: 830px;
  height: 1183px;
}
.agreement .agreen-cont {
  padding: 30px 0;
  padding-bottom: 30px;
}
.agreement .agreen-cont h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 100;
  margin: 10px 0;
}
.agreement .agreen-cont .h4 {
  line-height: 1.6;
}
.agreement .agreen-cont h4 {
  margin: 10px 0;
  font-size: 14px;
  font-weight: 100;
}
.agreement .agreen-cont p {
  line-height: 2;
}
</style>
