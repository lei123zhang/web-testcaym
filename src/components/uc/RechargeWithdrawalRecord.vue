<template>
    <Tabs >
        
        <TabPane label="充币记录"><Table  stripe :columns="tableColumnsRecharge" :data="tableRecharge" :loading="loading"></Table></TabPane>
        <TabPane label="提币记录"> <Table stripe :columns="tableColumnsWithdraw" :data="tableWithdraw" :loading="loading" :no-data-text="$t('common.nodata')"></Table></TabPane>
    </Tabs>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      tableRecharge: [],
      tableWithdraw: [],
      Rechargetransaction: {
        page: 0,
        pageSize: 10,
        total: 0,
        pageNo:1,
        type:0
      },
      Withdrawtransaction: {
        page: 0,
        pageSize: 10,
        total: 0,
        pageNo:1,
        type:0
      }
    };
  },
  methods: {
    getListRecharge(pageNo, pageSize, type) {
      //获取tableRecharge
      let params = this.Rechargetransaction;
    //   params["pageNo"] = pageNo;
    //   params["pageSize"] = pageSize;
    //   params["type"] = type;
      this.$http
        .post(this.host + "/uc/asset/transaction", params)
        .then(response => {
          var resp = response.body;
          if (resp.content) {
            // this.tableRecharge = resp.content;
            // this.dataCount = resp.totalElements;
            // this.loading = false;
          } else {
            this.$Message.error(resp.message);
          }
        });
    },
    getListWithdraw(pageNo) {
      //获取tableWithdraw
      let params = this.Withdrawtransaction;
    //   params["page"] = pageNo;
    //   params["pageSize"] = this.transaction.pageSize;

      this.$http
        .post(this.host + "/uc/withdraw/record", params)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
              console.log(resp)
            this.tableWithdraw = resp.data.content;
            // this.transaction.total = resp.data.totalElements;
            // this.transaction.page = resp.data.number;
            // this.loading = false;
          } else {
            this.$Message.error(resp.message);
          }
        });
    }
  },
  computed: {
    tableColumnsRecharge() {
      let columns = [];
      columns.push({
        title: this.$t("uc.finance.recharge.time"),
        key: "createTime"
      });
      columns.push({
        title: this.$t("uc.finance.recharge.symbol"),
        key: "symbol"
      });
      columns.push({
        title: this.$t("uc.finance.recharge.address"),
        key: "address"
      });
      columns.push({
        title: this.$t("uc.finance.recharge.amount"),
        key: "amount"
      });
      return columns;
    },
    tableColumnsWithdraw() {
      let columns = [];
      columns.push({
        title: this.$t("uc.finance.withdraw.time"),
        width: 180,
        key: "createTime"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.symbol"),
        key: "symbol",
        render: function(h, params) {
          return params.row.coin.unit;
        }
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.address"),
        key: "address"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.num"),
        key: "totalAmount"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.fee"),
        key: "fee"
      });
      columns.push({
        title: this.$t("uc.finance.withdraw.status"),
        key: "status",
        render: (h, params) => {
          let text = "";
          if (params.row.status == 0) {
            text = this.$t("uc.finance.withdraw.status_1");
          } else if (params.row.status == 1) {
            text = this.$t("uc.finance.withdraw.status_2");
          } else if (params.row.status == 2) {
            text = this.$t("uc.finance.withdraw.status_3");
          } else if (params.row.status == 3) {
            text = this.$t("uc.finance.withdraw.status_4");
          }
          return h("div", [h("p", text)]);
        }
      });
      return columns;
    }
    
  },
  created() {
    this.coinType = this.$route.query.name;
    // this.getMember();
    // this.getMoney();
    this.getListWithdraw();
    this.getListRecharge();
  }
};
</script>

<style>
</style>

