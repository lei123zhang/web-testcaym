<template>
<div style=" background: #ececec;padding: 81px;padding-top: 20px;">
  <div class="content">
    
<div style="width: 80%;margin: 0 auto;margin-bottom: 60px;">
    <div class="ident-title" v-if="certStatus === 0">
      <h3>{{$t("uc.merchCerti.apply.ms1")}}</h3>
      <p style="font-size: 14px;margin-top: 10px">{{$t("uc.merchCerti.apply.ms2")}}</p>
    </div>
  <div class="ident-title" v-else-if="certStatus == 1">
    <h3>{{$t("uc.merchCerti.apply.ms3")}}</h3>
  </div>
  <div class="ident-title" v-else-if="certStatus == 2">
    <h3>{{$t("uc.merchCerti.apply.ms4")}}</h3>
  </div>
  <div class="ident-title" v-else-if="certStatus == 3">
    <h3>{{$t("uc.merchCerti.apply.ms5")}}</h3>
  </div>
  <div class="ident-title" v-else-if="certStatus == 5">
    <h3>{{$t("uc.merchCerti.apply.ms6")}}</h3>
  </div>
  <div class="ident-title" v-else-if="certStatus == 6">
    <h3>{{$t("uc.merchCerti.apply.ms7")}}</h3>
  </div>
  <div class="ident-title" v-else-if="certStatus == 7">
    <h3>{{$t("uc.merchCerti.apply.ms8")}}</h3>
  </div>

    <Steps class="apply-step" :current="certStatus == 2 ? 3 : certStatus == 3 ? 2 : certStatus" :status="certStatus == 3 ? 'error' :'finish'" v-if="certStatus != 0 && certStatus != 5 && certStatus != 6 && certStatus != 7">
      <Step :title="$t('uc.merchCerti.title.title1')"></Step>
      <Step :title="$t('uc.merchCerti.title.title2')"></Step>
      <Step :title="certStatus == 1 || certStatus == 0  ? $t('uc.merchCerti.title.title3') : certStatus == 2 ? $t('uc.merchCerti.title.title4') : $t('uc.merchCerti.title.title5')"></Step>
    </Steps>

  <Steps class="apply-step" :current="certStatus == 5 ? 1 : certStatus == 6 ? 2 : 3" :status="certStatus == 6 ? 'error':'finish'"  v-if="certStatus == 5 || certStatus == 6 || certStatus == 7">
    <Step :title="$t('uc.merchCerti.title.title6')"></Step>
    <Step :title="$t('uc.merchCerti.title.title7')"></Step>
    <Step :title="certStatus == 5 ? $t('uc.merchCerti.title.title3') : certStatus == 6 ? $t('uc.merchCerti.title.title5') : $t('uc.merchCerti.title.title8')"></Step>
  </Steps>

  <div v-if="certStatus == 6" style="width: 500px;margin: 0 auto;text-align: center;">
    <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="modal_return=true" long size="large">{{$t("uc.merchCerti.button.button1")}}</Button>
    <div class="fail-reason" style="margin-top: 50px;font-size: 16px;">
      <Icon type="alert" color="red" size="16"/><span style="margin-left: 10px;">{{$t("uc.merchCerti.button.button2")}}:{{refuseReason}}</span>
    </div>
  </div>

  <div v-if="certStatus == 7" style="width: 500px;margin: 0 auto;text-align: center;">
    <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="modal_read=true" long size="large">{{$t("uc.merchCerti.button.button3")}}</Button>
  </div>

    <div v-if="certStatus == 3" style="width: 500px;margin: 0 auto;text-align: center;">
      <Button type="info" style="width: 120px;background:#313654;border-color:#313654" @click="modal_read=true" long size="large">{{$t("uc.merchCerti.button.button1")}}</Button>
      <div class="fail-reason" style="margin-top: 50px;font-size: 16px;">
        <Icon type="alert" color="red" size="16"/><span style="margin-left: 10px;">{{$t("uc.merchCerti.button.button2")}}:{{certReason}}</span>
      </div>
    </div>

    <div v-else-if="certStatus == 2" style="width: 500px;margin: 0 auto;text-align: center;">
      <Button type="info" style="width: 120px;background:#313654;border-color:#313654"  @click="publishAd" long size="large">{{$t("uc.merchCerti.button.button4")}}</Button>
      <div style="margin-top: 30px;font-size: 16px;text-align: center;">
        <a @click="returnAdit" style="color: #aaa;">{{$t("uc.merchCerti.button.button5")}}</a>
      </div>
    </div>
</div>
   <!--<div class="xian"></div>-->
   <!-- 认证商家 -->
   <div class="ipshang" :class="certStatus != 0 ? 'applying' : ''">
     <div class="ident-title" v-if="certStatus == 3">
       <h3 style="font-size: 20px">{{$t("uc.merchCerti.apply.ms1")}}</h3>
       <p style="font-size: 14px;margin-top: 10px">{{$t("uc.merchCerti.apply.ms2")}}</p>
     </div>
     <div class="ident-title" v-else-if="certStatus == 2">
       <h3>{{$t("uc.merchCerti.apply.ms9")}}</h3>
     </div>
      <Row style="margin-top:40px;">
        <Col span="8">
         <div class="business-function">
           <img alt="" src="../../assets/images/business_show.png" width="300px">
           <p style="padding: 20px 0;font-weight: 600;font-size: 18px">{{$t('uc.identity.seat')}}</p>
           <span style="font-size: 14px;">{{$t("uc.merchCerti.apply.ms10")}}</span>
         </div>
        </Col>
         <Col span="8">
         <div class="business-function">
           <img alt="" src="../../assets/images/business_service.png" width="300px">
           <p style="padding: 20px 0;font-weight: 600;font-size: 18px">{{$t('uc.identity.service')}}</p>
           <span style="font-size: 14px;">{{$t("uc.merchCerti.apply.ms11")}}</span>
         </div>
        </Col>
        <Col span="8">
         <div class="business-function" >
           <img alt="" src="../../assets/images/business_fee.png" width="300px">
           <p style="padding: 20px 0;font-weight: 600;font-size: 18px">{{$t('uc.identity.lowfee')}}</p>
           <span style="font-size: 14px;">{{$t("uc.merchCerti.apply.ms12")}}</span>
         </div>
        </Col>
    </Row>

     <div v-show="certStatus === 0" style="    text-align: center;font-size: 16px;margin-top:50px">
       <Checkbox v-model="single" ></Checkbox> <span>{{$t("uc.merchCerti.apply.ms13")}}</span><router-link target="_blank" to="/about-merchant" class="cur">{{$t('uc.identity.agreement')}}</router-link>
     </div>
     <div v-show="certStatus === 0" class="sq">
      <Button type="info"  @click="apply">{{$t("uc.merchCerti.apply.ms14")}}</Button>
      </div>
   </div>

<!-- 商家end -->
<!-- 发送邮件 -->
 <div class="mail" v-show="isShowMailt">
     <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input><br/>
     <Input v-model="value" placeholder="Enter something..." style="width:202px"></Input>
     <Button type="info">{{$t('uc.identity.sendcode')}}</Button><br/>
     <Button type="info" style="margin-top: 25px; width: 297px;">{{$t('uc.identity.confirm')}}</Button>
 </div>
 <!-- 邮件end -->
 </div>
 <!-- 提交审核中 -->
 <div class="submittedAudit"v-show="activeStepIndex === 1">
  <img src="../../assets/img/accomplish.png" alt="">
 </div>
  <!-- end -->
 <!-- 审核成功 -->
 <div class="auditSuccess" v-show="activeStepIndex === 2">
  <img src="../../assets/img/accomplish.png" alt="">
 </div>

  <Modal v-model="modal_read">
    <p slot="header">
      <span class="tit">如何申请成为商家?</span>
    </p>
    <div class="apply-note">
      <h3 style="padding-top: 10px;">第一步：按要求准备商家申请资料</h3>
      <p>准备如下申请资料：<br>手机号、微信号、QQ号、个人数字资产证明(图片)、数字资产交易证明(图片)</p>
      <h3>第二步：提交申请</h3>
      <p>完成需要填写和上传的商家认证审核资料，点击提交审核。</p>
      <h3>第三步：资料审核</h3>
      <p>我们将在3-5个工作日内对您的商家申请资料进行审核，请随时关注审核状态，可在提交页面查看。审核通过后，您即可在法币交易区发布广告。</p>
      <div style="text-align: left;padding: 30px 0;">
        <Checkbox v-model="agreeFrozen" ></Checkbox> <span>同意冻结<font color="#2AABFE">{{auditText}}</font>作为商家保证金</span>
      </div>
      <Button type="info" @click="apply2" long style="font-size: 16px;">申请成为商家</Button>
    </div>
    <p slot="footer">
      <!--<span style="text-align: left">-->
        <!--<Checkbox v-model="agreeFrozen" ></Checkbox> <span>同意冻结{{auditText}}作为商家保证金</span>-->
      <!--</span>-->
      <!--<Button type="info" @click="apply2">申请成为商家</Button>-->
    </p>
  </Modal>

  <Modal v-model="modal_apply">
    <p slot="header"></p>
    <div class="apply-content">
      <div class="apply-title">
        <h3>提交商家认证资料</h3>
        <p>请您将准备好的商家认证资料上传至平台并提交</p>
      </div>
      <Form class="apply-form" :model="apply_form" label-position="top">
        <FormItem label="手机号">
          <Input v-model="apply_form.telno"></Input>
        </FormItem>
        <FormItem label="微信号">
          <Input v-model="apply_form.wechat"></Input>
        </FormItem>
        <FormItem label="QQ号">
          <Input v-model="apply_form.qq"></Input>
        </FormItem>
        <Row>
          <Col span="8">
            <FormItem label="保证金币种">
              <Select v-model="apply_form.coinSymbol" placeholder="选择币种" @on-change="onCoinChange">
                <Option v-for="(item,index) in auditCurrency" :value="item.coin.unit"></Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8"><span>&nbsp;</span></Col>
          <Col span="8">
            <FormItem label="保证金数量">
              <Label v-model="apply_form.amount">{{apply_form.amount}}</Label>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Upload type="drag" ref="upload" :on-success="assetHandleSuccess" :headers="uploadHeaders" :action="uploadUrl" :on-remove="assetRemove">
              <span style="line-height: 100px;font-size: 50px">+</span>
            </Upload>
            <span>个人数字资产证明</span>
          </Col>
          <Col span="8"><span>&nbsp;</span></Col>
          <Col span="8">
            <Upload type="drag" ref="upload" :on-success="tradeHandleSuccess" :headers="uploadHeaders" :action="uploadUrl" :on-remove="tradeRemove">
              <span style="line-height: 100px;font-size: 50px">+</span>
            </Upload>
            <span>数字资产交易证明</span>
          </Col>
        </Row>
        <FormItem style="margin-top: 20px;">
          <Button style="width:100%;" type="info" @click="apply3('apply_form')" :disabled="applyBtn">立即申请</Button>
        </FormItem>
      </Form>
    </div>
    <p slot="footer"></p>
  </Modal>

  <Modal v-model="modal_return" @on-ok="returnAudit">
    <p slot="header" style="text-align: center;">提示</p>
    <p style="text-align: center;font-size: 14px;">您正在进行商家注销操作，确认提交申请操作后，将无法撤销。</p>
    <p style="text-align: center;font-size: 14px;">是否确认执行此操作？</p>
    <Input v-model="returnReason" type="textarea" placeholder="请填写取消原因" :rows="4"></Input>
  </Modal>
</div>


</template>
<script>
export default {
   data(){
       return {
          loginmsg:this.$t('common.logintip'),
          single: false,
          value:'',
          isShowShang:true,
          isShowMailt:false,
          isShowSubmitted:false,
          isShowSuccess:false,
          activeStepIndex:0,
          emailAdress:'kefu@ATC.pro',
          steps:[this.$t('uc.identity.prepare'),this.$t('uc.identity.review'),this.$t('uc.identity.passed')],
         certStatus:0,  //认证申请状态，0:未申请，1：审核中，2：已认证，3：认证失败
         certReason:'',
         auditCurrency:'',
         auditText:'',
         modal_read:false,
         modal_return:false,
          agreeFrozen:false,
          modal_apply:false,
          applyBtn:false,
          apply_form:{
            telno:"",
            wechat:"",
            qq:"",
            coinSymbol:"",
            amount:"",
            assetData:"",
            tradeData:"",
          },
         uploadHeaders:{'x-auth-token':localStorage.getItem('TOKEN')},
         uploadUrl:this.host+'/uc/upload/oss/image',
         returnReason:'',
         refuseReason:'',
       }
   },
 methods: {
   islogin(){
     let self = this
     this.$http.post(this.host + '/uc/approve/security/setting').then(response => {
       var resp = response.body;
       if (resp.code == 0) {
         if (resp.data.realName == null || resp.data.realName == "") {
           this.$Message.warning(this.$t('otc.publishad.submittip1'));
           self.$router.push('/uc/safe');
         } else if (resp.data.phoneVerified == 0) {
           this.$Message.warning(this.$t('otc.publishad.submittip2'));
           self.$router.push('/uc/safe');
         } else if (resp.data.fundsVerified == 0) {
           this.$Message.warning(this.$t('otc.publishad.submittip3'));
           self.$router.push('/uc/safe');
         }
       } else {
         this.$Message.error(resp.message);
       }
     })
   },
    timer() {
        setInterval(()=>{
            this.getSetting();
        },10000)
    },
     publishAd(){
       this.$router.push('/otc/ad/create');
     },
   returnAdit(){
      this.modal_return = true;
   },
   returnAudit(){
     var params = {};
     params["detail"] = this.returnReason;
     this.$http.post(this.host + '/uc/approve/cancel/business',params).then(res =>{
         let resp = res.body;
         if (resp.code == 0) {
           this.$Message.success("提交成功!");
           this.modal_return = false;
           this.getSetting();
         }else {
           this.$Message.error(resp.message);
         }
       });
   },
   getAudiCoin(symbol) {
     var coin = null;
     for (var i=0;i<this.auditCurrency.length;i++) {
       if (symbol == this.auditCurrency[i].coin.unit) {
         coin = this.auditCurrency[i];
         break;
       }
     }
     return coin;
   },
   onCoinChange(value){
     var coin = this.getAudiCoin(value);
     if (coin != null) {
       this.apply_form.amount = coin.amount;
     }
   },
    getSetting() {
         this.$http.get(this.host + this.api.uc.identification)
         .then(res =>{
              let certifiedBusinessStatus = res.body.data.certifiedBusinessStatus;
              this.activeStepIndex = certifiedBusinessStatus;
              this.certStatus = certifiedBusinessStatus;
              this.certReason = res.body.data.detail;
              this.refuseReason = res.body.data.reason;
         })
        .catch(function (error) {

         });
    },
     assetHandleSuccess(res,file){
        this.apply_form.assetData = res.data;
     },
     tradeHandleSuccess(res,file){
       this.apply_form.tradeData = res.data;
     },
     assetRemove(file,fileList){
       this.apply_form.assetData = "";
     },
     tradeRemove(file,fileList){
       this.apply_form.tradeData = "";
     },
   getAuthFound(){
     this.$http.get(this.host + "/uc/approve/business-auth-deposit/list").then(res =>{
          var resp = res.body;
         if (resp.code == 0) {
           this.auditCurrency = resp.data;
           var tempText = "";
           for (var i=0;i<resp.data.length;i++) {
             if (i == 0) {
               this.apply_form.coinSymbol = resp.data[i].coin.unit;
               this.apply_form.amount = resp.data[i].amount;
             }
              tempText += resp.data[i].amount + '个'+resp.data[i].coin.unit;
              if (i < resp.data.length - 1) tempText += '或';
           }
           this.auditText = tempText;
         }
       })
   },
     apply(){
       let stasingle =  this.single
       if(stasingle == false){
         this.$Message.warning(this.$t('uc.identity.approve'));
         return;
       }
       this.modal_read=true;
       return;

      this.$http.get(this.host + this.api.uc.apply).then(res =>{
          var resp = res.body;
          if (resp.code == 0) {
              this.$Message.success(resp.message);
              this.activeStepIndex = 1;
          }else {
              this.$Message.warning(resp.message);
          }
         }).catch(function (error) {
             this.$Message.error(error);
         });
  },
   apply2(){
     let agreeFrozen =  this.agreeFrozen;
     if(agreeFrozen == false){
       this.$Message.warning("请同意冻结相应数量的币");
       return;
     }
     this.modal_read=false;
     this.modal_apply=true;
   },
   apply3(form){
     if (this.apply_form.telno == "") {
       this.$Message.error("请填写手机号");
       return;
     }
     if (this.apply_form.wechat == "") {
       this.$Message.error("请填写微信号");
       return;
     }
     if (this.apply_form.qq == "") {
       this.$Message.error("请填写qq号");
       return;
     }
     if (this.apply_form.assetData == "") {
       this.$Message.error("请上传资产证明");
       return;
     }
     if (this.apply_form.tradeData == "") {
       this.$Message.error("请上传交易证明");
       return;
     }
     var params = {};
     params["businessAuthDepositId"] = this.getAudiCoin(this.apply_form.coinSymbol).id;
     params["json"] = JSON.stringify(this.apply_form);
     this.$http.post(this.host + "/uc/approve/certified/business/apply",params).then(res =>{
       var resp = res.body;
       if (resp.code == 0) {
         this.$Message.success("提交成功!");
         this.modal_apply = false;
         this.certStatus = 1;
       }else {
         this.$Message.error(resp.message);
       }
     })
   }

},
  created(){
 //this.timer();
    this.islogin();
    this.getSetting();
    this.getAuthFound();
}

};
</script>

<style scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  height: 100%;
  background: #fff;
}
.ip .ivu-col {
  line-height: 37px;
  text-align: left;
  padding-left: 139px;
}
.ipshang {
}
.ipshang.applying {
  background: #f5f5f5;
  padding: 40px 0;
}
.sq {
  width: 1200px;
  margin-top: 50px;
  text-align: center;
  margin-bottom: 50px;
}
.xian {
  width: 100%;
  height: 1px;
  margin-top: 105px;
  border-top: 1px #ececec dotted;
}
.sq button {
  height: 50px;
  font-size: 18px;
  width: 450px;
}
.tit {
  font-size: 16px;
  line-height: 25px;
  border-left: 5px solid #3faef5;
  padding-left: 15px;
}
.plancon {
  width: 64%;
  margin: 49px auto;
  position: relative;
}
.plan {
  position: absolute;
  height: 36px;
  width: 100%;
  top: -13px;
}
.plans {
  position: absolute;
  height: 36px;
  width: 100%;
  top: 13px;
}
.plan div {
  z-index: 99;
  float: left;
  width: 33.33%;
  color: white;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background: url("../../assets/img/2.png") center no-repeat;
  background-size: contain;
}
.action {
  z-index: 99999 !important;
  float: left;
  width: 25%;
  height: 31px;
  line-height: 31px;
  text-align: center;
  background-size: contain;
  background: url("../../assets/img/1.png") center no-repeat !important;
}
.plans div {
  z-index: 99;
  float: left;
  width: 33.333%;
  height: 53px;
  line-height: 53px;
  font-size: 14px;
  text-align: center;
  background-size: contain;
}
.plancon span {
  background: #ececec;
  height: 1px;
  width: 65%;
  display: inherit;
  margin: 0 auto;
}
.ivu-col-span-8 p {
  font-size: 19px;
}
.peakfire {
  width: 1000px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  border: 1px solid #eaeaea;
  margin-top: 43px;
  padding-left: 25px;
}
.peakfire span {
  color: #3faef5;
}
.mail {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  line-height: 50px;
  display: none;
}
.submittedAudit {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.auditSuccess {
  width: 1000px;
  margin: 87px auto;
  text-align: center;
  display: none;
}
.apply-note{
  font-size: 14px;
}
  .apply-note h3{
    padding: 20px 0;font-size: 16px;
  }
.apply-note ul{
  list-style: initial;
  padding-left: 20px;
}
.apply-content{
  width: 80%;
  margin: 0 auto;
}
.apply-title{
  text-align: center;
}
.apply-title h3{
  font-size: 20px;
}
.apply-title p{
  font-size: 14px;
  padding: 10px 0;
}
.ident-title{
  text-align: center;
  font-size: 20px;
}
  .apply-step{
    padding: 50px 0;
    margin-left: 150px;
  }
  .apply-step .ivu-steps-title{
    display: block;
  }
  .business-function{
    width: 300px;
    margin: 0 auto;
    border: 1px solid #d4d4d4;
    padding-bottom: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

</style>
<style>
  .ivu-form-item{
    margin-bottom: 15px;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner {
    background-color: #313654 !important;
    border-color: #313654 !important;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner>.ivu-steps-icon, .ivu-steps-item.ivu-steps-status-finish .ivu-steps-head-inner span {
    color: #fff !important;
  }
  .ivu-steps-item.ivu-steps-status-process .ivu-steps-head-inner {
    border-color: #313654 !important;
    background-color: #313654 !important;
  }
  .ivu-steps-item.ivu-steps-status-finish .ivu-steps-tail>i:after {
    background: #313654 !important;
  }
</style>


