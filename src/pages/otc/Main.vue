<template>
    <div class="content-wrap">
        <div class="container" id="List">
            <Row>
                <Col span="4">
                <Menu ref="navMenu" mode="vertical" width="auto" theme="light" :active-name="activeMenuName" @on-select="menuSelected" style="background:#fff;">
                    <MenuGroup :title="$t('otc.transaction')" class='tradelist'>
                        <template v-for="(coin,index) in coins">
                            <MenuItem :name="'coin-'+index" class="coinItem">
                                {{coin.unit}}
                            </MenuItem>
                        </template>
                    </MenuGroup>
                    <MenuItem name="ad">{{$t('otc.myad.title')}}</MenuItem>
                    <MenuItem name="order">{{$t('otc.myorder')}}</MenuItem>
                </Menu>
                </Col>
                <Col span="20">
                <!-- <keep-alive> -->
                <router-view></router-view>
                <!-- </keep-alive> -->
                </Col>
            </Row>
        </div>
    </div>
</template>
<style>
.tradelist.ivu-menu-item-group .ivu-menu-item-group-title {
  padding-left: 0px;
}
</style>

<style scoped>
.content-wrap {
  background: #eee;
  min-height: 680px;
  padding-top: 20px;
}
.container {
  width: 85%;
  margin: 0 auto;
  min-width: 1200px;
  background: white;
  padding-top: 30px;
}
</style>
<script>
export default {
  data() {
    return {
      coins: [[1]],
      activeMenuName: "coin-0"
    };
  },
  methods: {
    init() {
      this.$store.commit("navigate", "nav-otc");
      this.$http.post(this.host + this.api.otc.coin).then(response => {
        if (response.body.code == 0) {
          this.coins = response.body.data;
          this.$router.push("/otc/trade/" + this.coins[0].unit);
        }
      });
    },
    menuSelected(menuName) {
      if (menuName.startsWith("coin")) {
        var coin = this.coins[menuName.split("-")[1]];
        this.$router.push("/otc/trade/" + coin.unit);
      } else {
        this.$router.push("/otc/" + menuName);
      }
    }
  },
  created: function() {
    this.init();
  },
  mounted: function() {}
};
</script>
<style scoped>
.coinItem {
  border-radius: 2px;
}
.coinItem:hover {
  background: #2d8cf0;
  color: #000;
}
.coinItem.ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected {
  color: #2d8cf0;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #000;
  background: #2d8cf0;
}
</style>

