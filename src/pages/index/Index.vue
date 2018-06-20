<template>
    <div>
        <div id="fullpage" :class="{active:getTheme}">
            <div class="section" id="page1">
                <Carousel autoplay :arrow="showArrow" :autoplay-speed="speed" v-model="valueCal" loop>
                  <CarouselItem v-for="(item,index) in picList"><div :style="'background-image: url('+item.url+')'" class="carousel-item"><a v-show="item.linkUrl!=''&&item.linkUrl!='1'" style="display:block;width:100%;height: 100%;" :href="item.linkUrl" target="_blank"></a></div></CarouselItem>
                   
                </Carousel>
            </div>
            <Marquee></Marquee>
            <div class="section" id="page2">
                <div class="page2nav">
                    <ul class="brclearfix">
                        <li 
                        v-for="(item,index) in indexBtn" 
                        @click="addClass(index)" 
                        :class="{'active':index==choseBtn,'ivu-btn-   '
                        :index!=choseBtn}">
                        <span 
                        class="topnavIcon"
                        :style="`background:url(/src/assets/images/navIcon/${item.coin}.png) 0 0 / 20px 20px;`"
                        :class="item.coin"
                        ></span>
                        <span 
                        class="content"
                        >{{item.text}}</span>
                        </li>
                    </ul>
                </div>
                <div class="ptjy">
                    <Table id="USDT" class="usdtindex" v-show="true" :columns="coins.columns" :data="dataIndex"></Table>
                </div>
            </div>
            <div class="section" id="page3">
                <div class="page3warper">
                    <h1>{{$t("indexMes.index1.title")}}</h1>
                    <h3>{{$t("indexMes.index1.ms1")}}</h3>
                    <h3>{{$t("indexMes.index1.ms2")}}</h3>
                    <h3>{{$t("indexMes.index1.ms3")}}</h3>
                </div>
            </div>
            <div class="section" id="page4">
                <div class="page4warper">
                    <h1>{{$t("indexMes.index1.title")}}</h1>
                    <h3>1.{{$t("indexMes.index2.ms1")}}</h3>
                    <h3>2.{{$t("indexMes.index2.ms2")}}</h3>
                    <h3>3.{{$t("indexMes.index2.ms3")}}</h3>
                </div>
            </div>
            <div class="section" id="page6">
                <div class="page6warper">
                    <h1>ATC{{$t("indexMes.index2.title")}}</h1>
                    <h3>{{$t("indexMes.index3.ms1")}}</h3>
                    <h3>{{$t("indexMes.index3.ms2")}}</h3>
                    <h3>{{$t("indexMes.index3.ms3")}}</h3>
                </div>
            </div>
      </div>
      <div id="onlineservice">
        <!--<a href="http://kefu.caymanex.pro:80/im/text/15FwEk.html" target="_blank"></a>-->
      </div>
    </div>
</template>
<script>
var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
var moment = require("moment");

import SvgLine from "@components/exchange/SvgLine.vue";
import Marquee from "@components/index/Marquee.vue"
// import setCanvas from '@js/canvas.js';
// import setCanvas from "@js/canvas/canvas.js";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { SvgLine,Marquee },
  data() {
    let self = this;
    return {
      // theme:0,
      CNYRate: null,
      dataIndex: [],
      //当前市场上的交易币种，按交易对分
      coins: {
        _map: {},
        USDT: [],
        BTC: [],
        ETH: [],
        favor: [],
        columns: [
          {
            title: ' ',
            key: "collection",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: params.row.isFavor
                      ? "android-star"
                      : "android-star-outline",
                    size: 24
                  },
                  nativeOn: {
                    click: () => {
                      event.stopPropagation(); //阻止事件冒泡
                      if (this.isLogin) {
                        if (
                          event.currentTarget.className ==
                          "ivu-icon ivu-icon-android-star"
                        ) {
                          this.cancelCollect(params.index, params.row);
                          event.currentTarget.className ==
                            "ivu-icon ivu-icon-android-star-outline";
                        } else {
                          this.collect(params.index, params.row);
                          event.currentTarget.className =
                            "ivu-icon ivu-icon-android-star";
                        }
                      } else {
                        this.$Message.info(this.$t("common.logintip"));
                      }
                    }
                  }
                })
              ]);
            }
          },
          {
            title: self.$t("service.COIN"),
            align: "center",
            key: "coin",
            render: function(h, params) {
              const className = params.row.href + "icon" + " indexicon";
              var iconName = "";
              if (params.row.coin == "BTC") {
                iconName = "比特币";
              } else if (params.row.coin == "ETH") {
                iconName = "以太币";
              } else if (params.row.coin == "GCC") {
                iconName = "银河链";
              }
              return h("div", [
                h(
                  "span",
                  {
                    // attrs: {
                    //   class: className
                    // }
                  },
                  params.row.memberName
                ),
                h("span", {}, params.row.coin)
              ]);
            }
          },
          {
            title: self.$t("service.NewPrice"),
            align: "center",
            key: "price",
            width: "190",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: function(h, params) {
              var rmb = self.round(self.mul(params.row.price, 6.5), 2);
              if (self.CNYRate != null)
                rmb = self.round(self.mul(params.row.price, self.CNYRate), 2);
              const isgreen =
                parseFloat(params.row.rose) < 0 ? "none" : "inline-block";
              const nogreen =
                parseFloat(params.row.rose) < 0 ? "inline-block" : "none";
              return h("div", [
                h("span", {}, "$" + params.row.price + " /￥" + rmb),
                h(
                  "Icon",
                  {
                    props: {
                      type: "arrow-up-c"
                    },
                    style: {
                      display: isgreen,
                      fontSize: "16px",
                      marginLeft: "5px",
                      verticalAlign: "middle"
                    },
                    class: {
                      green: true
                    }
                  },
                  "↑"
                ),
                h(
                  "Icon",
                  {
                    props: {
                      type: "arrow-down-c"
                    },
                    style: {
                      display: nogreen,
                      fontSize: "16px",
                      marginLeft: "5px",
                      verticalAlign: "middle"
                    },
                    class: {
                      red: true
                    }
                  },
                  "↓"
                )
              ]);
            }
          },
          {
            title: self.$t("service.ExchangeNum"),
            align: "center",
            key: "volume",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            }
          },
          {
            title: self.$t("service.LowPrice"),
            align: "center",
            key: "low",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            }
          },
          {
            title: self.$t("service.Change"),
            align: "center",
            key: "rose",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
              let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: (h, params) => {
              const row = params.row;
              const className = parseFloat(row.rose) < 0 ? "red" : "green";
              return h(
                "span",
                {
                  attrs: {
                    class: className
                  }
                },
                row.rose
              );
            }
          },
          
          {
            title: self.$t("service.PriceTrend"),
            render: function(h, params) {
              return h(SvgLine, {
                props: {
                  values: params.row.trend,
                  width: 100,
                  height: 40
                }
              });
            }
          },
          {
            title: self.$t("service.Operate"),
            align: "center",
            key: "buyBtn",
            render: function(h, params) {
              return h("p", [
                h(
                  "a",
                  {
                    style: {
                      color: "#fff"
                    },
                    on: {
                      click: function() {
                        self.$router.push("/exchange/" + params.row.href);
                      }
                    }
                  },
                  [
                    h(
                      "Button",
                      {
                        attrs: {
                          class: 'buyBtn'
                        },
                        props: {
                          type: "primary",
                          long: true,
                          shape: "circle"
                        },
                        style: {
                          marginRight: "8px",
                          width: "80%",
                          // background: "#f7f7f8",
                          // border: "#d2d8e5"
                        }
                      },
                      self.$t("service.Exchange")
                    )
                  ]
                )
              ]);
            }
          }
        ]
      },
      indexBtn: [
        {
          text: this.$t("service.USDT"),
          coin:'USDT'
        },
        {
          text: this.$t("service.BTC"),
          coin:'BTC'
        },
        {
          text: this.$t("service.ETH"),
          coin:'ETH'
        },
        {
          text: this.$t("service.CUSTOM"),
          coin:'CUSTOM'
        }
      ],
      choseBtn: 0,
      valueCal: 0,
      showArrow: "never",
      speed: 5000,
      symbol: "",
      usdtData: [],
      usdtList: [],
      btcList: [],
      ethList: [],
      picList: [
        // {
        //   url:'../../assets/images/banner1.jpg'
        // },{
        //   url:'../../assets/images/banner2.jpg'
        // }
      ]
    };
  },
  created: function() {
    this.init();

    setTimeout(() => {
      $(".animateNum").countUp({
        time: 1000
      });
    }, 0);
  },
  computed: {
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    lang: function() {
      return this.$store.state.lang;
    },
    ...mapGetters([
        "getTheme"
    ])
  },
  watch: {
    lang: function() {
      this.updateLangData();
    }
  },
  mounted: function() {
    this.getCNYRate();
    this.getSymbol();
    // setCanvas.init("myCanvas");
  },
  methods: {
    updateLangData() {
      this.indexBtn = [
        {
          text: this.$t("service.USDT"),
          coin:'USDT'
        },
        {
          text: this.$t("service.BTC"),
          coin:'BTC'
        },
        {
          text: this.$t("service.ETH"),
          coin:'ETH'
        },
        {
          text: this.$t("service.CUSTOM"),
          coin:'CUSTOM'
        }
      ];

      this.coins.columns[0].title = this.$t("service.COIN");
      this.coins.columns[1].title = this.$t("service.NewPrice");
      this.coins.columns[2].title = this.$t("service.ExchangeNum");
      this.coins.columns[3].title = this.$t("service.OpenPrice");
      this.coins.columns[4].title = this.$t("service.Change");
      this.coins.columns[5].title = this.$t("service.PriceTrend");
      this.coins.columns[6].title = this.$t("service.Operate");
    },
    openActivity(url) {
      // console.log(url);
    },
    init() {
      this.$store.commit("navigate", "nav-index");
      this.$store.state.HeaderActiveName = "1-1";
      this.loadPicData();
      this.addClass(0);
    },
    getCNYRate() {
      this.$http
        .post(this.host + "/market/exchange-rate/usd-cny")
        .then(response => {
          var resp = response.body;
          this.CNYRate = resp.data;
        });
    },
    donwload(type) {
      const title = this.$t("common.tip");
      const content = "<p>" + this.$t("common.expect") + "</p>";
      this.$Modal.info({
        title: title,
        content: content,
        closable: true
      });
    },
    loadPicData() {
      let param = {};
      param["sysAdvertiseLocation"] = 1;
      this.$http
        .post(this.host + "/uc/ancillary/system/advertise", param)
        .then(response => {
          var result = response.body;
          if (result.code == 0 && result.data.length > 0) {
            this.picList = result.data;
          }
        });
    },
    getCoin(symbol) {
      return this.coins._map[symbol];

    },
    startWebsock() {
      var stompClient = null;
      var that = this;
      var socket = new SockJS(that.host + that.api.market.ws);
      stompClient = Stomp.over(socket);
      stompClient.debug = false;
      stompClient.connect({}, function(frame) {
        //订阅价格变化消息
        stompClient.subscribe("/topic/market/thumb", function(msg) {
          var resp = JSON.parse(msg.body);
          var coin = that.getCoin(resp.symbol);
          if (coin != null) {
            coin.price = resp.close.toFixed(2);
            coin.rose =
              resp.chg > 0
                ? "+" + (resp.chg * 100).toFixed(2) + "%"
                : (resp.chg * 100).toFixed(2) + "%";
            coin.close = resp.close.toFixed(2);
            coin.high = resp.high.toFixed(2);
            coin.low = resp.low.toFixed(2);
            coin.turnover = parseInt(resp.volume);
          }
          
          
        });
      });
    },
    round(v, e) {
      var t = 1;
      for (; e > 0; t *= 10, e--);
      for (; e < 0; t /= 10, e++);
      return Math.round(v * t) / t;
    },
    mul(a, b) {
      var c = 0,
        d = a.toString(),
        e = b.toString();
      try {
        c += d.split(".")[1].length;
      } catch (f) {}
      try {
        c += e.split(".")[1].length;
      } catch (f) {}
      return (
        Number(d.replace(".", "")) *
        Number(e.replace(".", "")) /
        Math.pow(10, c)
      );
    },
    addClass(index) {
      this.choseBtn = index;
      if (index == 0) {
        this.dataIndex = this.coins.USDT;
      } else if (index == 1) {
        this.dataIndex = this.coins.BTC;
      } else if (index == 2) {
        this.dataIndex = this.coins.ETH;
      } else if (index == 3) {
        if (this.isLogin) {
          this.dataIndex = this.coins.favor;
        } else {
          this.$router.push("/login");
        }
      }
    },
    getSymbol() {
      this.$http
        .post(this.host + this.api.market.thumbTrend, {})
        .then(response => {
          var resp = response.body;

          for (var i = 0; i < resp.length; i++) {
            var coin = resp[i];
            coin.price = resp[i].close;
            coin.rose =
              resp[i].chg > 0
                ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
                : (resp[i].chg * 100).toFixed(2) + "%";
            coin.coin = resp[i].symbol.split("/")[0];
            coin.base = resp[i].symbol.split("/")[1];
            coin.href = (coin.coin + "_" + coin.base).toLowerCase();

            coin.isFavor = false;
            this.coins._map[coin.symbol] = coin;
            this.coins[coin.base].push(coin);
            
          }
          if (this.isLogin) {
            this.getFavor();
          }
          this.startWebsock();
        });
    },
    getFavor() {
      //查询自选
      this.$http
        .post(this.host + this.api.exchange.favorFind, {})
        .then(response => {
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            var coin = this.getCoin(resp[i].symbol);
            if (coin != null) {
              coin.isFavor = true;
              this.coins.favor.push(coin);
            }
          }
        });
    },
    collect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      
      this.$http
        .post(this.host + this.api.exchange.favorAdd, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.do_favorite"));
            this.getCoin(row.symbol).isFavor = true;
            row.isFavor = true;
            this.coins.favor.push(row);
          }
        });
    },
    cancelCollect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorDelete, params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.cancel_favorite"));
            this.getCoin(row.symbol).isFavor = false;
            for (var i = 0; i < this.coins.favor.length; i++) {
              var favorCoin = this.coins.favor[i];
              if (favorCoin.symbol == row.symbol) {
                this.coins.favor.splice(i, 1);
                break;
              }
            }
          }
        });
    }
  }
};
</script>
<style>
/* @font-face{
         font-family： wendingxi;
         src: url('../../assets/fonts/wendingxi.ttf');
 } */
.ivu-icon-android-star {
  color: #bc9105;
}
.usdtindex .ivu-table-row td:nth-child(1),
.usdtindex.ivu-table-row td:nth-child(1) .ivu-table-cell div {
  width: 20px;
  padding: 0;
}
/* @font-face {
  font-family: "fangzheng";
  src: url("../../assets/fonts/GBK.ttf");
}
@font-face {
  font-family: "wendingcs";
  src: url("../../assets/fonts/wendingxi.ttf");
}
@font-face {
  font-family: "fangzhong";
  src: url("../../assets/fonts/fangzhong.ttf");
} */

@keyframes leftToRig {
  from {
    width: 0;
  }
  to {
    width: 40px;
  }
}
@keyframes slace {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
.indexicon {
  width: 25px;
  height: 25px;
  background-image: url(../../assets/images/gccicon.png);
  background-size: 100% 100%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.gcc_usdticon {
  background-image: url(../../assets/images/gccicon.png);
}

.btc_usdticon {
  background-image: url(../../assets/images/btcicon.png);
}

.eth_usdticon {
  background-image: url(../../assets/images/ethicon.png);
}
.eth_btcicon{
  background-image: url(../../assets/images/ethicon.png);
}
.green {
  color: #589065 !important;
}

.red {
  color: #ae4e54 !important;
}

.brclearfix:after {
  content: "";
  display: block;
  height: 0;
  overflow: hidden;
  clear: both;
}

#page1 {
  /* height: 865px; */
  background: #040f20;
  position: relative;
}

#actpage {
  background: #1b2957;
  display: flex;
  justify-content: center;
  align-items: center;
}
#actpage .postersWraper {
  width: 1300px;
  height: 490px;
  display: flex;
  justify-content: space-between;
}
#actpage .postersWraper .poster {
  width: 416px;
  height: 490px;
  background: #e8ebf4;
}
#actpage .postersWraper .poster .posterImg {
  width: 416px;
  height: 310px;
}
#actpage .postersWraper .poster .posConWra {
  font-family: "fangzheng";
  text-align: left;
  color: #021b3a;
  padding-left: 30px;
  font-size: 20px;
}
#actpage .postersWraper .poster .posConWra h3 {
  line-height: 80px;
}
#actpage .postersWraper .poster .posConWra p {
  color: #7e8c9f;
  font-size: 18px;
  line-height: 30px;
  font-family: "wendingcs";
}

#page2 {
  background: #fff;
  height: auto;
  min-height: 530px;
}

.page2nav {
  
  padding: 60px 10% 0 10%;
  /* background: #121f42; */
  line-height: 60px;
  font-size: 20px;
}
.page2nav ul.brclearfix{
  border: 1px solid #ddd;
  border-bottom: none;
  display: flex;
  flex-direction: row;
  font-size: 17px;
}

.page2nav li {
  box-sizing: border-box;
  width: 14%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #7e96b3;
  border-bottom: 2px solid rgba(255, 255, 255, 0);
}
.page2nav ul.brclearfix li span.content{
  padding-left: 16px;
}
.page2nav ul.brclearfix span.topnavIcon {
  display: flex;
  width: 20px;
  height: 20px;
}
.page2nav li.active {
  box-sizing: border-box;
  background: #fff;
  color: #1a3279;
  position: relative;
  border-bottom: 2px solid #5066a5;
}

/* .page2nav li.active::after {
    content: "";
    border-top: 10px solid #252e3e;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    position: absolute;
    bottom: -10px;
    left: 43%;
} */

#fullpage {
  background: #fff;
}
#fullpage.active{
  background: #1e213d;
}
.section {
  height: 575px;
  text-align: center;
  color: #fff;
}
#page3,#page4,#page6 {
  position: relative;
  padding: 0 330px;
  text-align: left;
  height: 520px;
  background:  url(../../assets/images/page3-bg.png) no-repeat 80% center;
}
#page3 .page3warper {
  position: absolute;
  top: 25%;
}
#page3 .page3warper h1,#page4 .page4warper h1,#page6 .page6warper h1 {
  
	height: 32px;
	font-family: MicrosoftYaHei;
	font-size: 32px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 44px;
	letter-spacing: 1px;
	color: #262c4b;
}
#page3 .page3warper h3,#page4 .page4warper h3,#page6 .page6warper h3 {
  color: #787c8e;
  font-family: MicrosoftYaHei;
	font-size: 16px;
  line-height: 34px;
  font-weight: normal;
	font-stretch: normal;
}
#page4 {
  background:  url(../../assets/images/page3-bg.png) no-repeat 20% center;
}
#page4 .page4warper {
  position: absolute;
  right: 20%;
  top: 25%;
}

#fullpage.active #page1,#fullpage.active #page2,
#fullpage.active #page3,#fullpage.active #page4,
#fullpage.active #page5{
  background-color: #1e213d;
}
#fullpage.active th,#fullpage.active td{
  background-color: #1e213d;
}
#fullpage.active .usdtindex,#fullpage.active td,#fullpage.active th{
  border-color: #34385d;
}
#fullpage.active .ivu-table::before,#fullpage.active .ivu-table::after{
  background: #34385d;
}
#fullpage.active .ivu-table{
  color: #7f89a3;
}
#fullpage.active .page2nav ul.brclearfix{
  border-color: #34385d;
}
#fullpage.active .page2nav li.active{
  background:none;
  color: #3f5dba;
}
#page6 {
  position: relative;
  padding: 0 330px;
  text-align: left;
  height: 520px;
  background:  url(../../assets/images/page3-bg.png) no-repeat 80% center;
}
#page6 .page6warper {
  position: absolute;
  top: 25%;
}
#page6 .page6warper h1 {
  font-size: 36px;
  font-family: "GBK";
  font-weight: 500;
  margin-bottom: 10px;
}
#page3 .page3warper h1,
#page4 .page4warper h1,
#page6 .page6warper h1 {
  margin-bottom: 30px;
}

.carousel-item {
  background-repeat: no-repeat;
  background-position: center;
  height: 575px;
  background-size: cover;
}

.demo-carousel1 {
  background: url(../../assets/images/banner1.jpg) no-repeat center;
  height: 575px;
  background-size: cover;
}

.demo-carousel2 {
  background: url(../../assets/images/banner2.jpg) no-repeat center;
  height: 575px;
  background-size: cover;
}

.demo-carousel-btn {
  width: 100%;
  height: 100%;
  padding-top: 345px;
}

.demo-carousel1 a {
  display: inline-block;
  width: 250px;
  height: 55px;
  margin: 0 15px;
}

.purchase {
  background: url(../../assets/images/purchase.png) no-repeat;
}

.register {
  background: url(../../assets/images/register.png) no-repeat;
}

.ptjy {
  height: 100%;
  margin: 0 10% 30px;
  /* padding-top: 25px; */
}

.usdt {
  float: left;
  width: 100%;
}

.usdt_icon {
  float: left;
  width: 18%;
  height: 290px;
  background: #1d293a;
  padding-top: 125px;
  margin: 5px;
}

.ptjy ul {
  float: left;
  width: 80%;
  background: #1e213d;
}

.ptjy ul li {
  float: left;
  width: 15%;
  height: 140px;
  background: #1d293a;
  margin: 5px;
  cursor: pointer;
}

.ptjy ul li a {
  color: #fff;
}

.ptjy ul li:hover {
  box-shadow: 0 8px 16px rgba(29, 41, 255, 0.4);
}

.ptjy ul li.rise label {
  color: #32b114;
}

.ptjy ul li.drop label {
  color: #e01a1a;
}

.ptjy ul li span,
.ptjy ul li label {
  display: block;
  padding: 10px 0;
  cursor: pointer;
}
.buyBtn{
  width: 116px;
	height: 30px;
	background-color: #f7f7f8;
	border-radius: 14px;
	border: solid 1px #d2d8e5;
  color: #525967;
}
.buyBtn:hover{
  width: 116px;
	height: 30px;
	background-color: #435ca3;
	border-radius: 14px;
	border: solid 1px #5066a5;
  color: #ffffff;
}
.ptjy ul li label img {
  vertical-align: middle;
}

.btc,
.eth {
  float: left;
  width: 100%;
  margin-top: 10px;
}

.btc_icon,
.eth_icon {
  float: left;
  width: 18%;
  height: 140px;
  background: #1d293a;
  padding-top: 50px;
  margin: 5px;
}

#nav {
  position: fixed;
  right: 10%;
  top: 50%;
  z-index: 100;
}

#nav ul li {
  display: block;
  /* width: 120px; */
  height: 25px;
  margin: 7px;
  position: relative;
  padding-right: 20px;
  text-align: right;
  color: #fff;
}

#nav ul li span {
  display: none;
}

#nav ul li a {
  top: 2px;
  right: 2px;
  width: 8px;
  height: 8px;
  background: url(../../assets/images/page.png) no-repeat;
  position: absolute;
  z-index: 1;
}

#nav ul li a:hover,
#nav ul li a.active {
  top: 0;
  right: -3px;
  width: 18px;
  height: 18px;
  background: url(../../assets/images/page_active.png) no-repeat;
  position: absolute;
  z-index: 1;
}

@-webkit-keyframes fadeinB {
  0% {
    top: 50%;
    opacity: 0;
  }
  100% {
    top: 30%;
    opacity: 1;
  }
}

@keyframes fadeinB {
  0% {
    top: 50%;
    opacity: 0;
  }
  100% {
    top: 30%;
    opacity: 1;
  }
}

@-webkit-keyframes fadeinA {
  0% {
    top: 60%;
    opacity: 0;
  }
  100% {
    top: 40%;
    opacity: 1;
  }
}

@keyframes fadeinA {
  0% {
    top: 60%;
    opacity: 0;
  }
  100% {
    top: 40%;
    opacity: 1;
  }
}

</style>
