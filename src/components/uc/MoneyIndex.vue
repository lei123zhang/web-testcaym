<template>
    <div class="nav-right moneyindex">
        <!-- <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
          <section class="totaAssets" style="padding: 32px 10px 32px 20px;background:#fff;margin-bottom:30px;">
            <div v-if="true"   class="hd hd_login" style="padding-left:38px;">
            <h3 style="padding-bottom:20px;font-size:20px;font-weight:normal;text-align:left;">总资产(USDT)：</h3>
            <b></b>
            <span style="color:#313654;font-size:20px;font-weight:500;">1111111</span>
            <span style="color:#8a8c95;padding-left:10px;font-size:20px;"> ≈ 1111111 CNY</span>
          </div>
          <div>aaa</div>
          </section>
            <div class="bill_box rightarea padding-right-clear">
                <div style="text-align:right;line-height:50px;font-size:14px;">
                  <Checkbox v-model="checked" @on-change="getMoney">
                   隐藏为0的币种
                  </Checkbox>
                </div>
                <div class="order-table">
                    <Table  :columns="tableColumnsMoney" :data="tableMoney" :loading="loading"></Table>
                </div>
            </div>
        </div> -->
        <RechargeWithdrawalRecord></RechargeWithdrawalRecord>
        <Modal v-model="modal" :title="$t('uc.finance.money.match')" @on-ok="matchGCC">
          <P style="font-weight: bold;padding: 10px 0;">{{$t('uc.finance.money.matchtip1')}}：{{GCCMatchAmount}}</p>
          <p>
            <span>{{$t('uc.finance.money.matchtip2')}}：</span><InputNumber style="width: 150px;" type="text" v-model="matchAmount" :placeholder="$t('uc.finance.money.matchtip2')"></InputNumber>
          </p>
        </Modal>
    </div>
</template>
<script>
import RechargeWithdrawalRecord from "@components/uc/RechargeWithdrawalRecord.vue";
export default {
  components: {RechargeWithdrawalRecord},
  data() {
    return {
      GCCMatchAmount: 0,
      matchAmount: 0,
      modal: false,
      loginmsg: this.$t("common.logintip"),
      loading: true,
      ordKeyword: "",
      tableMoney: [],
      checked: false
    };
  },
  methods: {
    getMoney() {
      //获取
      this.$http.post(this.host + "/uc/asset/wallet").then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          if(this.checked){
            this.tableMoney = resp.data.filter(item=>{
              return item.balance!==0;
            });
          }else{
            this.tableMoney = resp.data;
          }
          
          for (let i = 0; i < this.tableMoney.length; i++) {
            this.tableMoney[i]["coinType"] = this.tableMoney[i].coin.unit;
          }
          this.loading = false;
        } else {
          // this.$Message.error(resp.message);
          //  this.$Message.info(this.$t('common.logintip'));
          this.$Message.error(this.loginmsg);
        }
      });
    },
    getGCCMatchAmount() {
      //获取
      this.$http
        .post(this.host + "/uc/asset/wallet/match-check")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            this.GCCMatchAmount = resp.data;
          } else {
            // this.$Message.error(this.loginmsg);
          }
        });
    },
    showMatchDailog(row) {
      this.modal = true;
    },
    matchGCC() {
      if (this.matchAmount <= 0) {
        this.$Message.warning(this.$t("uc.finance.money.matcherr1"));
      } else if (this.matchAmount > this.GCCMatchAmount) {
        this.$Message.warning(this.$t("uc.finance.money.matcherr2"));
      } else {
        //配对
        let params = {};
        params["amount"] = this.matchAmount;
        this.$http
          .post(this.host + "/uc/asset/wallet/match", params)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.finance.money.matchsuccess"));
              this.GCCMatchAmount = this.GCCMatchAmount - this.matchAmount;
            } else {
              this.$Message.error(this.loginmsg);
            }
          });
      }
    }
  },
  created() {
    this.getMoney();
    this.getGCCMatchAmount();
  },
  computed: {
    tableColumnsMoney() {
      let self = this;
      let columns = [];
      columns.push({
        title: self.$t("service.COIN"),
        align: "center",
        key: "coinType",
        render: function(h, params) {
          const className = params.row.coinType + "icon" + " indexicon";
          return h("div", [
            h(
              "span",
              {
                attrs: {
                  class: className
                }
              },
              params.row.memberName
            ),
            h(
              "span",
              {
                attrs: {
                  class: "coinType"
                }
              },
              params.row.coinType
            )
          ]);
        }
      });

      // columns.push({
      //   title: this.$t("uc.finance.money.cointype"),
      //   align: 'center',
      //   key: "coinType"
      // });
      columns.push({
        title: this.$t("uc.finance.money.balance"),
        align: "center",
        key: "balance"
      });
      columns.push({
        title: this.$t("uc.finance.money.frozen"),
        align: "center",
        key: "frozenBalance"
      });
      columns.push({
        title: this.$t("uc.finance.money.operate"),
        key: "price1",
        align: "center",
        render: function(h, params) {
          var actions = [];
          if (params.row.coin.canRecharge == 1) {
            actions.push(
              h(
                "Button",
                {
                  props: {
                    size: "large"
                  },
                  on: {
                    click: function() {
                      self.$router.push(
                        "/finance/recharge?name=" + params.row.coin.unit
                      );
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.charge")
              )
            );
          }
          if (params.row.coin.canWithdraw == 1) {
            actions.push(
              h(
                "Button",
                {
                  props: {
                    size: "large"
                  },
                  on: {
                    click: function() {
                      self.$router.push(
                        "/finance/withdraw?name=" + params.row.coin.unit
                      );
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.pickup")
              )
            );
          }
          if (params.row.coin.unit.toUpperCase() == "GCC") {
            actions.push(
              h(
                "Button",
                {
                  props: {
                    size: "large"
                  },
                  on: {
                    click: function() {
                      self.showMatchDailog(params.row);
                      // self.$router.push('/finance/recharge?name=' + params.row.coin.unit);
                    }
                  },
                  style: {
                    marginRight: "8px"
                  }
                },
                self.$t("uc.finance.money.match")
              )
            );
          }
          return h("p", actions);
        }
      });
      return columns;
    }
  }
};
</script>
<style>
.moneyindex.nav-right {
  height: auto;
  overflow: hidden;
  padding: 0 34px;
}

.moneyindex .bill_box {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.moneyindex .rightarea {
  background: #fff;
  padding: 0 60px 74px 60px;
}

.moneyindex .rightarea .rightarea-top {
  line-height: 75px;
  border-bottom: #f1f1f1 solid 1px;
}

.moneyindex .rightarea .rightarea-con {
  padding-top: 30px;
  padding-bottom: 125px;
}

.moneyindex .rightarea .trade-process {
  line-height: 30px;
  padding: 0 15px;
  background: #f1f1f1;
  display: inline-block;
  position: relative;
  margin-right: 20px;
}

.moneyindex .rightarea .trade-process.active {
  color: #eb6f6c;
  background: #f9f5eb;
}

.moneyindex .rightarea .trade-process .icon {
  background: #fff;
  border-radius: 20px;
  height: 20px;
  width: 20px;
  display: inline-block;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
}

.moneyindex .rightarea .trade-process .arrow {
  position: absolute;
  top: 10px;
  right: -5px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #f1f1f1;
}

.moneyindex .rightarea .trade-process.active .arrow {
  border-left: 5px solid #f9f5eb;
}

.moneyindex .rightarea .rightarea-tabs {
  border: none;
}

.moneyindex .rightarea .rightarea-tabs li > a {
  width: 100%;
  height: 100%;
  padding: 0;
  margin-right: 0;
  font-size: 14px;
  color: #646464;
  border-radius: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.moneyindex .rightarea .rightarea-tabs li > a:hover {
  background-color: #fcfbfb;
}

.moneyindex .rightarea .rightarea-tabs li {
  width: 125px;
  height: 40px;
  position: relative;
  margin: -1px 0 0 -1px;
  border: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.moneyindex .rightarea .rightarea-tabs li.active {
  background-color: #fcfbfb;
}

.moneyindex .rightarea .rightarea-tabs li:last-child {
  border-right: 1px solid #f1f1f1;
}

.moneyindex .rightarea .rightarea-tabs li.active > a,
.moneyindex .rightarea .rightarea-tabs li:hover > a {
  color: #da2e22;
  border: none;
}

.moneyindex .rightarea .panel-tips {
  border: 3px solid #fdfaf3;
  color: #9e9e9e;
  font-size: 12px;
}

.moneyindex .rightarea .panel-tips .panel-header {
  background: #fdfaf3;
  line-height: 40px;
  margin-bottom: 15px;
}

.moneyindex .rightarea .panel-tips .panel-title {
  font-size: 16px;
}

.moneyindex .rightarea .recordtitle {
  cursor: pointer;
}

.moneyindex .order_box {
  width: 100%;
  background: #fff;
  height: 56px;
  line-height: 56px;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccf2ff;
  position: relative;
  text-align: left;
}

.moneyindex .order_box a {
  color: #8994a3;
  font-size: 16px;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 54px;
  display: inline-block;
}

.moneyindex .order_box .active {
  border-bottom: 2px solid #00b5f6;
}

.moneyindex .order_box .search {
  position: absolute;
  width: 300px;
  height: 32px;
  top: 12px;
  right: 0;
  display: flex;
  /* border: #c5cdd7 solid 1px; */
}
.moneyindex th.ivu-table-column-center,
.moneyindex th.ivu-table-column-left {
  line-height: 50px;
  color: #8e97ab;
}
.moneyindex .ivu-table-wrapper,
.moneyindex th.ivu-table-column-center {
  border: none;
}
.moneyindex .ivu-table-cell p {
  text-align: left;
}
.moneyindex .ivu-btn.ivu-btn-large {
  width: 29%;
  height: 32px;
  background: #f7f7f8;
}
.moneyindex .ivu-btn.ivu-btn-large.ivu-btn:hover {
  color: #ecedf6;
  background: #3f4fb2;
  border: 1px solid #3f4fb2;
}
.moneyindex .ivu-table-header th {
  text-align: center;
}
.moneyindex .ivu-table:before,
.moneyindex .ivu-table:after {
  height: 0;
}
.moneyindex tr.ivu-table-row {
  border-bottom: 1px solid #000;
  height: 84px;
  font-size: 14px;
}
.moneyindex .totaAssets {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.GCCicon {
  width: 20px;
  height: 20px;
  background-image: url(../../assets/images/gccicon.png);
}

.BTCicon {
  background-image: url(../../assets/images/btcicon.png);
}

.ETHicon {
  background-image: url(../../assets/images/ethicon.png);
}
.ethicon {
  background-image: url(../../assets/images/ethicon.png);
}
.indexicon {
  width: 25px;
  height: 25px;

  background-size: 100% 100%;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
.coinType {
  display: inline-block;
  width: 40px;
}
</style>
