<template>
    <div class="topnav">
         <ul class="topNavList" >
            <li 
            v-for="item of coins.list"
            >
                <span 
                class="topnavIcon"
                :style="`background:url(/src/assets/images/navIcon/${item.coin}.png) 0 0 / 24px 24px;`"
                :class="item.coin"
                ></span>
                <span>{{item.coin}}</span>
                <span>￥{{item.close}}</span>
                <span
                class="indicators" 
                :class="{isTop:item.change>0}"></span>
            </li>
        </ul>  
    </div>
</template>
<script>

var Stomp = require("stompjs");
var SockJS = require("sockjs-client");
export default {
  data() {
    return {
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        favor: [],
        list: []
      }
    };
  },
  methods: {
    transform(obj) {
      var arr = [];
      for (var item in obj) {
        arr.push(obj[item]);
      }
      return arr;
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
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

          this.startWebsock();
        });
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
          that.$set(
            that.coins,
            "list",
            that.transform(that.coins._map).filter(item => {
              return item.base === "USDT";
            })
          );
        });
      });
    }
  },
  created() {
    this.getSymbol();
  },
  computed: {
    
  }
};
</script>
<style scoped>
.topnav {
  text-align: center;
  line-height: 25px;
  background: #1b262d;
}
.topnav .topNavList {
  display: flex;
  flex-direction: row;
  padding-left: 100px;
}
.topnav .topNavList li {
  width: 300px;
  font-size: 16px;
  color: #caccd2;
}
.topnav .topNavList li {
  width: 180px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: 54px;
  margin-right: 40px;
}
.topnav .topNavList li span.topnavIcon {
  display: flex;
  width: 24px;
  height: 24px;
}
.topnav .topNavList li .indicators {
  display: flex;
  width: 10px;
  height: 16px;
  background: url(../../assets/images/navIcon/down.png) no-repeat;
}
.topnav .topNavList li .indicators.isTop {
  display: flex;
  width: 10px;
  height: 16px;
  background: url(../../assets/images/navIcon/up.png) no-repeat;
}
</style>


