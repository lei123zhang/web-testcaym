<template>
    <div class="nav-right aaaaa">
        <div class="nav-right col-xs-12 col-md-10 padding-right-clear">
            <div class="bill_box rightarea padding-right-clear record account-box">
              <!-- <ButtonGroup>
                <Button v-for="(list,index) in buttonLists" :key="list.text" class="btStyle" :class="{active:changeActive == index}" @click="actives(index)">{{list.text}}</Button>
              </ButtonGroup> -->
                <div class="message">
                    <p class="tips">{{$t('uc.extension.linkdesc')}}</p>
                    <div class="inner-box deposit-address">
                        
                        <div class="title">
                            <Input v-model="qrcode.value" readonly style="width: 400px;" size="large">
                              <span style="color: #969ca4;" slot="prepend">{{$t('uc.extension.linktitle')}}</span>
                            </Input>
                            <a v-clipboard:copy="qrcode.value" v-clipboard:success="onCopy" v-clipboard:error="onError" href="javascript:;" id="copyBtn" class="link-copy"><Button type="primary" style="width:130px;height:36px;background-color: #4f659d;">{{$t('uc.extension.copy')}}</Button></a>
                            <div style="font-size:14px;color: #495060;padding: 0 20px 0 50px;">您的推广码：</div>
                            <Input v-model="user.promotionCode" readonly style="width: 100px;" size="large"></Input>
                        </div>
                    </div>
                </div>
                <div class="message table" >
                  <div class="tableTip">
                    <div class="tableTipTilte">佣金明细</div>
                    <div>
                      <Input   placeholder="default size" style="width: 200px;" size="large"></Input>
                      <Button type="primary"  style="width:100px;height:36px;background-color: #4f659d;margin-left:10px;">{{$t('uc.finance.record.search')}}</Button>
                    </div>
                  </div>
                    <Table stripe :columns="tableDataList" :data="dataList" :loading="loading"></Table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      buttonLists: [
        {
          text: this.$t("uc.extension.title1")
        },
        {
          text: this.$t("uc.extension.title2")
        },
        {
          text: this.$t("uc.extension.title3")
        }
      ],
      currentCommission: "0.00",
      commissionPaying: "6%",
      changeActive: 0,
      qrcode: {
        value: "",
        size: 200
      },
      loading: true,
      tableDataList:[
         {
          title: this.$t("uc.extension.username"),
          key: "username",
          align: "center"
        },
        {
          title: this.$t("uc.extension.createdtime"),
          key: "createTime",
          align: "center"
        },
        {
          title: this.$t("uc.extension.userlevel"),
          key: "level",
          align: "center",
          render: function(h, params) {
            return parseInt(params.row.level) + 1 + "级";
          }
        },
         {
          title: this.$t("uc.extension.symbol"),
          key: "symbol",
          align: "center"
        },
        {
          title: this.$t("uc.extension.amount"),
          key: "amount",
          align: "center"
        },
        {
          title: this.$t("uc.extension.amounttime"),
          key: "createTime",
          align: "center"
        },
        {
          title: this.$t("uc.extension.remark"),
          key: "remark",
          align: "center"
        }
      ],
     
      dataList:[],
      dataPromoteMoney: []
    };
  },
  methods: {
    getList() {
      this.loading = false;
    },
    actives(index) {
      this.changeActive = index;
    },
    qrcodeM() {
      var promotionCode = this.user.promotionCode;
      this.qrcode.value = "http://www.caymanex.pro/#/register?agent=" + promotionCode;
    },
    onCopy(e) {
      this.$Message.success(this.$t("uc.extension.copy_msg1") + e.text);
    },
    onError(e) {
      this.$Message.error(this.$t("uc.extension.copy_msg2"));
    },
    getPromotionList() {
      this.$http.post(this.host + "/uc/promotion/record", {}).then(response => {
        var resp = response.body;
        if (resp.code == 0) {
          this.dataPromoteFriends = resp.data;
          if(this.dataPromoteFriends.length)this.dataList=this.data.concat(this.dataPromoteFriends)
          // this.$Message.error(resp.message);
        }
      });
    },
    getPromotionMoney() {
      this.$http
        .post(this.host + "/uc/promotion/reward/record", {})
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            console.log(resp)
            this.dataPromoteMoney = resp.data;
            if(this.dataPromoteMoney.length)this.dataList=this.data.concat(this.dataPromoteMoney)
          } else {
            // this.$Message.error(resp.message);
          }
        });
    }
  },
  created() {
    this.actives(this.changeActive);
    this.qrcodeM();
    this.getList();
    this.getPromotionList();
    this.getPromotionMoney();
  },
  computed: {
    user: function() {
      return JSON.parse(localStorage.getItem("MEMBER"));
    }
  }
};
</script>
<style>
.nav-right.aaaaa{
  width: 1300px;
  height: 500px;
  
  
}
.nav-right .btStyle {
  width: 174px;
  height: 42px;
  font-size: 1.125em;
  color: #a2a0a1;
  background: #fff;
  margin: 50px 0;
}
.nav-right .active {
  background: #49a6f6;
  color: #fff;
}
.rightarea .message {
  width: 96%;
  margin: 0 auto;
  font-size: 16px;
  color: #636363;
  padding: 40px;
  margin-bottom: 20px;
  background: #fff;
}
.nav-right .message .tips {
  color: #495060;
  text-align: left;
  font-size: 14px;
  padding-bottom: 40px;
  
}
.rightarea {
  
  padding-left: 15px !important;
  padding-right: 15px !important;
  margin-bottom: 60px !important;
}

.rightarea .rightarea-top {
  line-height: 75px;
  border-bottom: #f1f1f1 solid 1px;
}

.rightarea .rightarea-con {
  padding-top: 30px;
  padding-bottom: 125px;
}
.message .title .copy {
  user-select: text;
}
.message .title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.message .inner-box {
  display: table-cell;
  width: 100%;
}
.message a.link-copy {
  margin-left: 10px;
}
.message .describe {
  float: left;
  margin: 52px 36px 0 0;
}
.message .commission {
  padding-bottom: 50px;
  border-bottom: 1px dashed #e9e9e9;
}
.message .commission span {
  color: #ff3533;
}
.message .commission strong {
  font-size: 26px;
}
.message .tableTip{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e6ed;
  margin-bottom: 40px;
  padding: 10px 4px 0px 0;
}
.message .tableTip .tableTipTilte{
  color: #313654;
  font-size: 16px;
  line-height: 60px;
  width: 124px;
  border-bottom: 2px solid #313654;
}
.message.table>.ivu-table-wrapper,.message.table>.ivu-table-wrapper th.ivu-table-column-center{
 border: none;
}
.message.table>.ivu-table-wrapper th.ivu-table-column-center{
  color: #8e97ab;
  font-size: 16px;
  line-height: 48px;
  font-weight: normal;
}
.message.table>.ivu-table-wrapper .ivu-table:after{
  width: 0;
}
</style>

