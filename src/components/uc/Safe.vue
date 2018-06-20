<template>
    <div class="nav-right padding-right-clear">
        <div class="col-xs-12 padding-right-clear padding-left-clear rightarea user account-box">
            <div class="col-xs-12 rightarea-con">
                <div class="user-top-icon">
                    <div class="user-icons">
                        <div class="user-face user-avatar-public">
                            <span class="user-avatar-in">{{usernameS}}</span>
                        </div>
                        <div class="user-name" style="line-height:52px">
                            {{user.username}}
                        </div>
                    </div>
                    <Row class="user-right">
                        <Col span="8">
                        <svg class="icon anquandengji" aria-hidden="true">
                                  <use xlink:href="#icon-anquandengji"></use>
                                </svg>
                        <div class="itp" v-if="user.realVerified==0&&user.phoneVerified==0&&user.fundsVerified==0">{{$t('uc.safe.safelevel_low')}}</div>
                        <div class="itp" v-else-if="user.realVerified==1&&user.phoneVerified==1&&user.fundsVerified==1">{{$t('uc.safe.safelevel_high')}}</div>
                        <div class="itp" v-else>{{$t('uc.safe.safelevel_medium')}}</div>
                        </Col>
                    </Row>
                </div>
                <section class="accountContent">
                    <div class="account-in">
                        <!-- 1 -->
                        <div class="account-item" style="display:none">
                            <div class="account-item-in">
                                <Icon type="person" style="font-size: 18px;color: #00b5f6;"></Icon>
                                <span class="card-number">{{$t('uc.safe.nickname')}}</span>
                                <p class="bankInfo" style="color: grey;">
                                    bearbaby
                                </p>
                                <span>{{$t('uc.safe.binded')}}</span>
                            </div>
                        </div>
                        <!-- 6 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <div class="card"></div>
                                <span class="card-number">{{$t('uc.safe.verified')}}</span>
                                <p v-if="user.realVerified==1" class="bankInfo" style="color: grey;">{{user.realName}}</p>
                                <p v-else class="bankInfo" style="color: grey;">
                                  {{$t('uc.safe.verifiedtip')}}
                                </p>
                                <span v-if="user.realVerified==1">{{$t('uc.safe.binded')}}</span>
                                <span v-else-if="user.realAuditing==1">{{$t('uc.safe.binding')}}</span>
                                <a class="btn" @click="showItem(6)" v-else-if="user.realVerified==0&&user.realAuditing==0&&user.realNameRejectReason!=null" :title="user.realNameRejectReason">{{$t('uc.safe.binderr')}}</a>
                                <a v-else class="btn" @click="showItem(6)">{{$t('uc.safe.bind')}}</a>
                            </div>
                            <div class="account-detail idCard"  v-show="choseItem==6">
                                <div class="detail-list" style="width: 100%;">
                                    <Form ref="formValidate6" :model="formValidate6" :rules="ruleValidate" :label-width="85">
                                        <!-- 真实姓名 -->
                                        <div class="cardWarp">
                                          <FormItem :label="$t('uc.safe.realname')" prop="realName" class="lableTitle">
                                            <Input v-model="formValidate6.realName" size="large"></Input>
                                          </FormItem>
                                          <!-- 身份证号 -->
                                          <FormItem :label="$t('uc.safe.idcard')" prop="idCard">
                                            <Input v-model="formValidate6.idCard" size="large"></Input>
                                          </FormItem>
                                        </div>
                                        
                                        <div class="uploadArWarp">
                                            <Col class="uploadAr" span="8">
                                                <input type="hidden" name="imgPreview" :value="imgPreview" />
                                                
                                                <!-- <img id="frontCardImg" style="width: 270px;height: 175px;" :src="frontCardImg"> -->
                                                <div class="acc_sc">
                                                  <Upload  type="drag" ref="upload" :on-success="frontHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                      <span class="uploadPic" >+</span>
                                                      <div>{{$t('uc.safe.upload_positive')}}</div>
                                                  </Upload>
                                                    <!-- <Upload ref="upload" :on-success="frontHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload> -->
                                                </div>
                                            </Col>
                                            <Col class="uploadAr" span="8">
                                                <input type="hidden" name="imgNext" :value="imgNext" />
                                                
                                                <!-- <img id="backCardImg" style="width: 270px;height: 175px;" :src="backCardImg"> -->
                                                <div class="acc_sc">
                                                    <Upload type="drag" ref="upload" :on-success="backHandleSuccess" :headers="uploadHeaders" :action="uploadUrl" >
                                                      <span class="uploadPic" >+</span>
                                                      <div>{{$t('uc.safe.upload_negative')}}</div>
                                                  </Upload>
                                                    <!-- <Upload ref="upload" :on-success="backHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload> -->
                                                </div>
                                            </Col>
                                            <Col  class="uploadAr" span="8">
                                                <input type="hidden" name="imgLast" :value="imgLast" />
                                                
                                                <!-- <img id="handCardImg" style="width: 270px;height: 175px;" :src="handCardImg"> -->
                                                <div class="acc_sc">
                                                  <Upload  type="drag" ref="upload" :on-success="handHandleSuccess" :headers="uploadHeaders" :action="uploadUrl" >
                                                      <span class="uploadPic">+</span>
                                                      <div>{{$t('uc.safe.upload_hand')}}</div>
                                                  </Upload>
                                                    <!-- <Upload ref="upload" :on-success="handHandleSuccess" :headers="uploadHeaders" :action="uploadUrl">
                                                        <Button type="ghost" icon="ios-cloud-upload-outline">{{$t('uc.safe.upload')}}</Button>
                                                    </Upload> -->
                                                </div>
                                            </Col>
                                        </div>
                                        <!-- Button -->
                                        <FormItem class="uploadBtn">
                                            <Button type="primary" @click="handleSubmit('formValidate6')" style="margin-left: -85px">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('formValidate6')" style="margin-left: 35px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 2 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <div class="email"></div>
                                <span class="card-number">{{$t('uc.safe.email')}}</span>
                                <p v-if="user.emailVerified==1" class="bankInfo" style="color: grey;">
                                    {{user.email}}
                                </p>
                                <p v-else class="bankInfo" style="color: grey;">
                                  {{$t('uc.safe.bindemail')}}
                                </p>
                                <span v-if="user.emailVerified==1">{{$t('uc.safe.binded')}}</span>
                                <a v-else class="btn" @click="showItem(2)">{{$t('uc.safe.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==2">
                                <div class="detail-list">
                                    <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate" :label-width="110">
                                        <!-- mail -->
                                        <FormItem :label="$t('uc.safe.email')" prop="mail">
                                            <Input v-model="formValidate2.mail" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem :label="$t('uc.safe.loginpwd')" prop="password">
                                            <Input v-model="formValidate2.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <FormItem :label="$t('uc.safe.emailcode')" prop="vailCode1">
                                            <Input v-model="formValidate2.vailCode1" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(1)" :disabled="sendMsgDisabled1">
                                                    <span v-if="sendMsgDisabled1">{{time1+$t('uc.safe.second')}}</span>
                                                    <span v-if="!sendMsgDisabled1">{{$t('uc.safe.clickget')}}</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate2')">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('formValidate2')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 3 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <div class="phone"></div>
                                <span class="card-number">{{$t('uc.safe.phone')}}</span>
                                <p v-if="user.phoneVerified==1" class="bankInfo" style="color: grey;">
                                    {{user.mobilePhone}}
                                </p>
                                <p v-else class="bankInfo" style="color: grey;">
                                  {{$t('uc.safe.bindphone')}}
                                </p>
                                <span v-if="user.phoneVerified==1">{{$t('uc.safe.binded')}}</span>
                                <a v-else class="btn" @click="showItem(3)">{{$t('uc.safe.bind')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==3">
                                <div class="detail-list">
                                    <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate" :label-width="110">
                                        <!-- 手机 -->
                                        <FormItem :label="$t('uc.safe.phone')" prop="mobile">
                                            <Input v-model="formValidate3.mobile" size="large"></Input>
                                        </FormItem>
                                        <!-- 登录密码 -->
                                        <FormItem :label="$t('uc.safe.loginpwd')" prop="password">
                                            <Input v-model="formValidate3.password" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode2">
                                            <Input v-model="formValidate3.vailCode2" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(2)" :disabled="sendMsgDisabled2">
                                                    <span v-if="sendMsgDisabled2">{{time2+$t('uc.safe.second')}}</span>
                                                    <span v-if="!sendMsgDisabled2">{{$t('uc.safe.clickget')}}</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate3')">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('formValidate3')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                         <!-- 谷歌 -->
                        <div class="account-item google">
                            <div class="account-item-in">
                                <div class="googlebg"></div>
                                <span class="card-number">{{$t('uc.safe.bingdGoogle')}}</span>
                                <p class="bankInfo" style="color: grey;">
                                  {{$t('uc.safe.logintip')}}
                                </p>

                                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">{{$t('uc.safe.bind')}}</a>
                                <a class="btn" v-else-if="user.googleStatus==0" @click="showItem(8)">{{$t('uc.safe.bindTip')}}</a>
                                <a class="btn" v-else @click="showItem(8)">{{$t('uc.safe.edit')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==8" >
                              <Spin size="large" fix v-if="spinShow"></Spin>
                              <div class="detail-list">
                                
                                    <Form ref="googleQr" :model="googleQr" >
                                        <div class="introduce"><h4>谷歌验证器</h4><span>是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码 ,验证码可用于登录、提现、修改安全设置等操作的安全验证</span></div>
                                        <h5>1、下载谷歌验证器APP</h5>
                                        <ul>
                                          <li>iOS用户登录App Store搜索"Authenticator"下载。</li>
                                          <li>安卓用户登录应用商店或使用手机浏览器搜索"谷歌验证器”下载。</li>
                                        </ul>
                                        <h5>2、打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌</h5>
                                        <div  class="googleQrWarp">
                                          <div class="googleQrPicBor" >
                                            <qriously class="googleQrPic" :value="googleQr.qrPic" :size="115" />
                                          </div>
                                          <div class="googleQrText">
                                              <h4>密钥</h4>
                                              <div class="copyQr">
                                                <div style="padding-right:24px;">{{googleQr.qrText}}</div> 
                                                <a
                                                v-clipboard:copy="googleQr.qrText"
                                                v-clipboard:success="onCopy"
                                                v-clipboard:error="onError"
                                                >复制</a>
                                                </div>
                                           </div>
                                        </div>
                                        <h5 style="margin-bottom:14px;">3、输入谷歌验证器中6位验证码</h5>
                                        <FormItem :label="$t('')"  prop="vailCode3" style="width:454px;margin-bottom:34px;padding-left:24px;" >
                                          <Input v-model="googleQr.sendQr">
                                              <span slot="prepend">请输入谷歌验证码</span>
                                          </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem style="padding-left:24px;">
                                            <Button type="primary" @click="handleSubmit('googleQr')">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('googleQr')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 4 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <div class="locked"></div>
                                <span class="card-number">{{$t('uc.safe.loginpwd')}}</span>
                                <p class="bankInfo" style="color: grey;">
                                  {{$t('uc.safe.logintip')}}
                                </p>

                                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">{{$t('uc.safe.edit')}}</a>
                                <a class="btn" v-else @click="showItem(4)">{{$t('uc.safe.edit')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==4">
                                <div class="detail-list">
                                    <Form ref="formValidate4" :model="formValidate4" :rules="ruleValidate" :label-width="85">
                                        <!-- oldPw -->
                                        <FormItem :label="$t('uc.safe.oldpwd')" prop="oldPw">
                                            <Input v-model="formValidate4.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPw -->
                                        <FormItem :label="$t('uc.safe.newpwd')" prop="newPw">
                                            <Input v-model="formValidate4.newPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newPwConfirm -->
                                        <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newPwConfirm">
                                            <Input v-model="formValidate4.newPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 手机验证码 -->
                                        <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode3">
                                            <Input v-model="formValidate4.vailCode3" size="large">
                                            <!-- <Button slot="append">点击获取</Button> -->
                                            <div class="timebox" slot="append">
                                                <Button @click="send(3)" :disabled="sendMsgDisabled3">
                                                    <span v-if="sendMsgDisabled3">{{time3+$t('uc.safe.second')}}</span>
                                                    <span v-if="!sendMsgDisabled3">{{$t('uc.safe.clickget')}}</span>
                                                </Button>
                                            </div>
                                            </Input>
                                        </FormItem>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate4')">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('formValidate4')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <!-- 5 -->
                        <div class="account-item">
                            <div class="account-item-in">
                                <div class="combination"></div>
                                <span class="card-number">{{$t('uc.safe.fundpwd')}}</span>
                                <p class="bankInfo" style="color: grey;">
                                  {{$t('uc.safe.fundtip')}}
                                </p>
                                <a class="btn" v-if="user.phoneVerified==0" @click="noPhone">{{$t('uc.safe.set')}}</a>
                                <a class="btn" v-else-if="user.fundsVerified==0" @click="showItem(5)">{{$t('uc.safe.set')}}</a>
                                <a class="btn" v-else @click="showItemFundpwd()">{{$t('uc.safe.edit')}}</a>
                            </div>
                            <div class="account-detail" v-show="choseItem==5">
                                <!-- 设置 -->
                                <div class="detail-list" v-show="user.fundsVerified!=1">
                                    <Form ref="formValidate7" :model="formValidate7" :rules="ruleValidate" :label-width="85">
                                        <!-- newMPw -->
                                        <FormItem :label="$t('uc.safe.fundpwd')" prop="pw7">
                                            <Input v-model="formValidate7.pw7" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem :label="$t('uc.safe.confirmpwd')" prop="pw7Confirm">
                                            <Input v-model="formValidate7.pw7Confirm" size="large" type="password"></Input>
                                        </FormItem>

                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate7')">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('formValidate7')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                                <!-- 修改 -->
                                <div class="detail-list" v-show="user.fundsVerified==1  && !fGetBackFundpwd">
                                    <Form ref="formValidate5" :model="formValidate5" :rules="ruleValidate" :label-width="85">
                                        <!-- oldPw -->
                                        <FormItem :label="$t('uc.safe.oldfundpwd')" prop="oldPw">
                                            <Input v-model="formValidate5.oldPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPw -->
                                        <FormItem :label="$t('uc.safe.newfundpwd')" prop="newMPw">
                                            <Input v-model="formValidate5.newMPw" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- newMPwConfirm -->
                                        <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newMPwConfirm">
                                            <Input v-model="formValidate5.newMPwConfirm" size="large" type="password"></Input>
                                        </FormItem>
                                        <!-- 邮箱验证码 -->
                                        <!--<FormItem :label="$t('uc.safe.phonecode')" prop="vailCode5">-->
                                            <!--<Input v-model="formValidate5.vailCode5" size="large">-->
                                            <!--<div class="timebox" slot="append">-->
                                                <!--<Button @click="send(5)" :disabled="sendMsgDisabled5">-->
                                                    <!--<span v-if="sendMsgDisabled5">{{time5+$t('uc.safe.second')}}</span>-->
                                                    <!--<span v-if="!sendMsgDisabled5">{{$t('uc.safe.clickget')}}</span>-->
                                                <!--</Button>-->
                                            <!--</div>-->
                                            <!--</Input>-->
                                        <!--</FormItem>-->
                                        <p style="text-align:right;"><a @click="handleReset('formValidate8');fGetBackFundpwd=!fGetBackFundpwd">忘记密码?</a></p>
                                        <!-- Button -->
                                        <FormItem>
                                            <Button type="primary" @click="handleSubmit('formValidate5')">{{$t('uc.safe.save')}}</Button>
                                            <Button type="ghost" @click="handleReset('formValidate5')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                                <!-- 找回 -->
                                <div class="detail-list" v-show="user.fundsVerified==1 && fGetBackFundpwd">
                                  <Form ref="formValidate8" :model="formValidate8" :rules="ruleValidate" :label-width="85">
                                    <!-- newMPw -->
                                    <FormItem :label="$t('uc.safe.newfundpwd')" prop="newMPw8">
                                      <Input v-model="formValidate8.newMPw8" size="large" type="password"></Input>
                                    </FormItem>
                                    <!-- newMPwConfirm -->
                                    <FormItem :label="$t('uc.safe.confirmnewpwd')" prop="newMPwConfirm8">
                                      <Input v-model="formValidate8.newMPwConfirm8" size="large" type="password"></Input>
                                    </FormItem>
                                    <!-- 邮箱验证码 -->
                                    <FormItem :label="$t('uc.safe.phonecode')" prop="vailCode5">
                                      <Input v-model="formValidate8.vailCode5" size="large">
                                      <div class="timebox" slot="append">
                                        <Button @click="send(5)" :disabled="sendMsgDisabled5">
                                          <span v-if="sendMsgDisabled5">{{time5+$t('uc.safe.second')}}</span>
                                          <span v-if="!sendMsgDisabled5">{{$t('uc.safe.clickget')}}</span>
                                        </Button>
                                      </div>
                                      </Input>
                                    </FormItem>
                                    <!-- Button -->
                                    <FormItem>
                                      <Button type="primary" @click="handleSubmit('formValidate8')">{{$t('uc.safe.save')}}</Button>
                                      <Button type="ghost" @click="handleReset('formValidate8')" style="margin-left: 8px">{{$t('uc.safe.reset')}}</Button>
                                    </FormItem>
                                  </Form>
                                </div>
                            </div>
                        </div>

                        <!--  -->
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {},
  data() {
    const validatePass = (rule, value, callback) => {
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){8,20}$/;
      if (value === "") {
        callback(new Error(this.$t("uc.safe.hybrid")));
      } else if (!reg.test(value)) {
        callback(new Error(this.$t("uc.safe.hybrid")));
      } else {
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.newpwdmsg2")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.newpwdmsg2")));
      } else if (value !== this.formValidate4.newPw) {
        callback(new Error(this.$t("uc.safe.newpwdmsg2")));
      } else {
        callback();
      }
    };
    const validateMPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else {
        callback();
      }
    };
    const validateMPassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (value !== this.formValidate5.newMPw) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    const validatepw7 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else {
        callback();
      }
    };
    const validatepw7check = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (value !== this.formValidate7.pw7) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    const validateMPass8 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg1")));
      } else {
        callback();
      }
    };
    const validateMPassCheck8 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (!/([a-zA-Z0-9]){6,18}/.test(value)) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else if (value !== this.formValidate8.newMPw8) {
        callback(new Error(this.$t("uc.safe.pwdmsg2")));
      } else {
        callback();
      }
    };
    return {
      spinShow:false,
      fGetBackFundpwd: false,
      imgPreview: "",
      imgNext: "",
      imgLast: "",
      loginmsg: this.$t("common.logintip"),

      frontCardImg: require("../../assets/images/frontCardImg.png"),
      backCardImg: require("../../assets/images/backCardImg.png"),
      handCardImg: require("../../assets/images/HandCardImg.png"),

      uploadHeaders: { "x-auth-token": localStorage.getItem("TOKEN") },
      uploadUrl: this.host + "/uc/upload/oss/image",
      googleQr:{
        qrPic:'',
        qrText:'',
        sendQr:''
      },
      usernameS: "",
      user: {},
      choseItem: 6,
      accountValue: "1",
      formValidate2: {
        mail: "",
        vailCode1: "",
        password: ""
      },
      formValidate3: {
        mobile: "",
        vailCode2: "",
        password: ""
      },
      formValidate4: {
        oldPw: "",
        newPw: "",
        newPwConfirm: "",
        vailCode3: ""
      },
      formValidate5: {
        oldPw: "",
        newMPw: "",
        newMPwConfirm: ""
        // vailCode5: '',
      },
      formValidate6: {
        realName: "",
        idCard: ""
      },
      formValidate7: {
        pw7: "",
        pw7Confirm: ""
      },
      formValidate8: {
        newMPw8: "",
        newMPwConfirm8: "",
        vailCode5: ""
      },
      ruleValidate: {
        mail: [
          {
            required: true,
            type: "email",
            message: this.$t("uc.safe.emailtip"),
            trigger: "blur"
          }
        ],
        vailCode1: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: this.$t("uc.safe.telnotip"),
            trigger: "blur"
          }
        ],
        vailCode2: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ],
        vailCode3: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          }
        ],
        oldPw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.oldpwdtip"),
            trigger: "blur"
          }
        ],
        newPw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.hybrid"),
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        newPwConfirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.newpwdmsg2"),
            trigger: "blur"
          },
          { validator: validatePassCheck, trigger: "blur" }
        ],
        newMPw: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          },
          { validator: validateMPass, trigger: "blur" }
        ],
        newMPwConfirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg2"),
            trigger: "blur"
          },
          { validator: validateMPassCheck, trigger: "blur" }
        ],
        pw7: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          },
          { validator: validatepw7, trigger: "blur" }
        ],
        pw7Confirm: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg2"),
            trigger: "blur"
          },
          { validator: validatepw7check, trigger: "blur" }
        ],
        vailCode5: [
          {
            required: true,
            message: this.$t("uc.safe.codetip"),
            trigger: "blur"
          }
        ],
        realName: [
          {
            required: true,
            message: this.$t("uc.safe.realnametip"),
            trigger: "blur"
          }
        ],
        idCard: [
          {
            required: true,
            message: this.$t("uc.safe.idcardtip"),
            trigger: "blur"
          }
        ],
        newMPw8: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg1"),
            trigger: "blur"
          },
          { validator: validateMPass8, trigger: "blur" }
        ],
        newMPwConfirm8: [
          {
            required: true,
            type: "string",
            min: 6,
            message: this.$t("uc.safe.pwdmsg2"),
            trigger: "blur"
          },
          { validator: validateMPassCheck8, trigger: "blur" }
        ]
      },
      time1: 60, // 发送验证码倒计时
      time2: 60, // 发送验证码倒计时
      time3: 60, // 发送验证码倒计时
      time5: 60, // 发送验证码倒计时
      sendMsgDisabled1: false,
      sendMsgDisabled2: false,
      sendMsgDisabled3: false,
      sendMsgDisabled5: false
    };
  },
  methods: {
    onCopy: function (e) {
      this.$Message.success('This is a success tip');
    },
    onError: function (e) {
      this.$Message.success('This is a success tip');
    },
    frontHandleSuccess(res, file) {
      this.frontCardImg = this.imgPreview = res.data;
    },
    backHandleSuccess(res, file) {
      this.backCardImg = this.imgNext = res.data;
    },
    handHandleSuccess(res, file) {
      this.handCardImg = this.imgLast = res.data;
    },
    noPhone() {
      this.$Message.info(this.$t("uc.safe.bindphonetip"));
      this.showItem(3);
    },
    showItemFundpwd() {
      this.fGetBackFundpwd = false;
      this.handleReset("formValidate5");
      this.showItem(5);
    },
    renderPw() {
      this.$Modal.confirm({
        title: this.$t("uc.safe.resetfundpwd"),
        onOk: () => {
          this.$Message.info("Clicked ok");
        },
        render: h => {
          return h("Input", {
            props: {
              value: this.value,
              autofocus: true
            },
            on: {
              input: val => {
                this.value = val;
              }
            }
          });
        }
      });
    },
    submit(name) {
      //实名认证
      if (name == "formValidate6") {
        if (this.imgPreview == "") {
          this.$Message.error(this.$t("uc.safe.upload_positivetip"));
          return false;
        }
        if (this.imgNext == "") {
          this.$Message.error(this.$t("uc.safe.upload_negativetip"));
          return false;
        }
        if (this.imgLast == "") {
          this.$Message.error(this.$t("uc.safe.upload_handtip"));
          return false;
        }

        if (!this.isCardNo(this.formValidate6.idCard)) {
          return;
        }
        let param = {};
        param["realName"] = this.formValidate6.realName;
        param["idCard"] = this.formValidate6.idCard;
        param["idCardFront"] = this.imgPreview;
        param["idCardBack"] = this.imgNext;
        param["handHeldIdCard"] = this.imgLast;
        this.$http
          .post(this.host + "/uc/approve/real/name", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.member.realName = this.formValidate6.realName;
              this.$store.commit("setMember", this.member);
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //邮箱认证
      if (name == "formValidate2") {
        let param = {};
        param["email"] = this.formValidate2.mail;
        param["code"] = this.formValidate2.vailCode1;
        param["password"] = this.formValidate2.password;
        this.$http
          .post(this.host + "/uc/approve/bind/email", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //手机认证
      if (name == "formValidate3") {
        let param = {};
        param["phone"] = this.formValidate3.mobile;
        param["code"] = this.formValidate3.vailCode2;
        param["password"] = this.formValidate3.password;
        this.$http
          .post(this.host + "/uc/approve/bind/phone", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //登录密码
      if (name == "formValidate4") {
        let param = {};
        param["oldPassword"] = this.formValidate4.oldPw;
        param["newPassword"] = this.formValidate4.newPw;
        param["code"] = this.formValidate4.vailCode3;
        this.$http
          .post(this.host + "/uc/approve/update/password", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.getMember();
              this.choseItem = 0;
              localStorage.removeItem("MEMBER");
              localStorage.removeItem("TOKEN");
              this.$store.state.showLogout = true;
              this.$store.state.showLogin = false;
              let self = this;
              setTimeout(() => {
                self.$router.push("/login");
              }, 2000);
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //修改资金密码
      if (name == "formValidate5") {
        let param = {};
        param["oldPassword"] = this.formValidate5.oldPw;
        param["newPassword"] = this.formValidate5.newMPw;
        // param['code'] = this.formValidate5.vailCode5
        this.$http
          .post(this.host + "/uc/approve/update/transaction/password", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.handleReset("formValidate5");
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //设置资金密码
      if (name == "formValidate7") {
        let param = {};
        param["jyPassword"] = this.formValidate7.pw7;
        this.$http
          .post(this.host + "/uc/approve/transaction/password", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //找回资金密码
      if (name == "formValidate8") {
        let param = {};
        param["newPassword"] = this.formValidate8.newMPw8;
        param["code"] = this.formValidate8.vailCode5;
        this.$http
          .post(this.host + "/uc/approve/reset/transaction/password", param)
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.fGetBackFundpwd = false;
              this.handleReset("formValidate5");
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
      //绑定谷歌
      if (name == "googleQr") {
        let param = {};
        param["secret"] = this.googleQr.qrText;
        param["codes"] = this.googleQr.sendQr;
        this.$http
          .post(this.host + this.api.uc.bindingGoogel, param)
          .then(response => {
            
            var resp = response.body;
            
            if (resp.code == 0) {
              this.$Message.success(this.$t("uc.safe.save_success"));
              this.getMember();
              this.choseItem = 0;
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    handleSubmit(name) {
      this.submit(name);
      this.$refs[name].validate(valid => {
        if (valid) {
        } else {
          this.$Message.error(this.$t("uc.safe.save_failure"));
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    showItem(index) {
      this.choseItem = index;
    },
    send(index) {
      let me = this;
      if (index == 1) {
        if (this.formValidate2.mail) {
          //获取邮箱code
          this.$http
            .post(this.host + "/uc/bind/email/code", {
              email: this.formValidate2.mail
            })
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                me.sendMsgDisabled1 = true;
                let interval = window.setInterval(function() {
                  if (me.time1-- <= 0) {
                    me.time1 = 60;
                    me.sendMsgDisabled1 = false;
                    window.clearInterval(interval);
                  }
                }, 1000);
              } else {
                this.$Message.error(resp.message);
              }
            });
        } else {
          this.$refs.formValidate2.validateField("mail");
        }
      } else if (index == 2) {
        if (this.formValidate3.mobile) {
          //获取手机code
          this.$http
            .post(this.host + "/uc/mobile/bind/code", {
              phone: this.formValidate3.mobile
            })
            .then(response => {
              var resp = response.body;
              if (resp.code == 0) {
                me.sendMsgDisabled2 = true;
                let interval = window.setInterval(function() {
                  if (me.time2-- <= 0) {
                    me.time2 = 60;
                    me.sendMsgDisabled2 = false;
                    window.clearInterval(interval);
                  }
                }, 1000);
              } else {
                this.$Message.error(resp.message);
              }
            });
        } else {
          this.$refs.formValidate3.validateField("mobile");
        }
      } else if (index == 3) {
        //登录密码获取手机code
        this.$http
          .post(this.host + "/uc/mobile/update/password/code")
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              me.sendMsgDisabled3 = true;
              let interval = window.setInterval(function() {
                if (me.time3-- <= 0) {
                  me.time3 = 60;
                  me.sendMsgDisabled3 = false;
                  window.clearInterval(interval);
                }
              }, 1000);
            } else {
              this.$Message.error(resp.message);
            }
          });
      } else if (index == 5) {
        //资金密码获取手机code
        this.$http
          .post(this.host + "/uc/mobile/transaction/code")
          .then(response => {
            var resp = response.body;
            if (resp.code == 0) {
              me.sendMsgDisabled5 = true;
              let interval = window.setInterval(function() {
                if (me.time5-- <= 0) {
                  me.time5 = 60;
                  me.sendMsgDisabled5 = false;
                  window.clearInterval(interval);
                }
              }, 1000);
            } else {
              this.$Message.error(resp.message);
            }
          });
      }
    },
    getMember() {
      //获取个人安全信息
      var self = this;
      this.$http
        .post(this.host + "/uc/approve/security/setting")
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            console.log(resp)
            this.user = resp.data;
            this.usernameS = (this.user.username + "").slice(0, 1);
          } else {
            this.$Message.error(this.loginmsg);
            // this.$Message.error(this.$t('common.logintip'));
          }
        });
    },
    isCardNo(card) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(card) === false) {
        this.$Message.error("身份证号不正确");
        return false;
      } else {
        return true;
      }
    },
    //获取谷歌验证码
    getQr(){
      this.$http
        .get(this.host + this.api.uc.getGoogleQR)
        .then(response => {
          var resp = response.body;
          if (resp.code == 0) {
            let {link:qrPic,secret:qrText} = resp.data;
            this.googleQr.qrPic=qrPic;
            this.googleQr.qrText=qrText;
            this.spinShow=false;
          } else {
            this.$Message.error(this.loginmsg);
            // this.$Message.error(this.$t('common.logintip'));
          }
        });
    }
  },
  computed: {
    member: function() {
      return this.$store.getters.member;
    }
  },
  beforeCreate() {
    if (!this.$store.getters.isLogin) {
      this.$router.push("/login");
    }
  },
  created() {
    this.getMember();
    this.getQr()
  }
};
</script>
<style scoped>
.card,.combination,.email,.phone,.googlebg,.locked{
  width: 40px;
  height: 24px;
  
}
.card{
  background: url(../../assets/images/security/card.png) no-repeat center center;
  background-size: 32px 24px;
}
.combination{
  height: 30px;
  background: url(../../assets/images/security/combination.png) no-repeat center center;
  background-size: 30px 30px;
}
.email{
  background: url(../../assets/images/security/email.png) no-repeat center center;
  background-size: 28px 22px;
}
.phone{
  
  height: 29px;
  background: url(../../assets/images/security/phone.png) no-repeat center center;
  background-size: 22px 29px;
}
.googlebg{
  background: url(../../assets/images/security/googlebg.png) no-repeat center center;
  background-size: 24px 24px;
}
.locked{
  height: 30px;
  background: url(../../assets/images/security/locked.png) no-repeat center center;
  background-size: 30px 30px;
}
 .account-box .account-in .account-item .account-detail {
  position: relative;
  padding: 30px 30px;
  background: #f9f9fa;
  margin: 30px 0;
  border: 1px solid #d6d6dd;
  border-radius: 8px;
  -moz-box-shadow:0px 0px 2px #999999; -webkit-box-shadow:0px 0px 2px #999999; box-shadow:0px 0px 2px #999999;
}
.account-box .account-in .account-item .account-detail:before{
    position: absolute;
      display: inline-block;
      top: -10px;
      right:  14%;
      width: 0;
      height: 0px;
      content: '';
      border-style: solid;
      border-width: 10px;
      border-color: #f9f9fa #f9f9fa transparent transparent;
      transform: rotate(-45deg);
      box-shadow: 2px -2px 2px #dddddd;
      }
.account-box .account-in .account-item .account-detail .detail-list {
  width: 40%;
  color: #969ca4;;
  font-size: 14px;
  margin: 0 auto;
}
.account-box .account-in .account-item.google .account-detail .detail-list {
  text-align: left;
  margin: 0;
  width: 100%; 
}

.account-box .account-in .account-item.google .account-detail .detail-list .googleQrWarp{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  margin-bottom: 22px;
}
.account-box .account-in .account-item.google .account-detail .detail-list .googleQrWarp .googleQrPicBor{
  width: 134px;
  height: 134px;
  border: 1px solid #c6cbd7;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.account-box .account-in .account-item.google .account-detail .detail-list  .googleQrText h4{
  padding: 10px 0;
}
.account-box
  .account-in
  .account-item
  .account-detail
  .detail-list
  .input-control {
  margin-bottom: 10px;
  height: 45px;
}
.account-box .account-in .account-item .account-detail .detail-list .introduce{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}
.account-box .account-in .account-item .account-detail .detail-list h4,
.account-box .account-in .account-item .account-detail .detail-list h5{
  padding: 20px 0;
  font-size: 16px;
  color: #495060;
  font-weight: normal;
}
.account-box .account-in .account-item .account-detail .detail-list li{
  padding: 5px 0;
  list-style: disc;
  margin-left: 20px;
}
.account-box .account-in .account-item .account-detail .detail-list .googleQrText{
  margin-left: 36px;
}
.account-box .account-in .account-item .account-detail .detail-list .googleQrText .copyQr{
  display: flex;
  flex-direction: row;
  color: #495060;
  font-size: 16px;
  
}
.detail-list .input-control .ivu-input-group-prepend {
  width: 63px;
}

.detail-list .input-control .ivu-input {
  height: 45px;
}

.account-box .account-in .account-item {
  margin-bottom: 10px;
}

.account-box .account-in .account-item .account-item-in {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 15px 30px 15px 50px;
  background-color: white;
  -webkit-box-shadow: 0 4px 0 0 rgba(69, 112, 128, 0.06);
  box-shadow: 0 4px 0 0 rgba(69, 112, 128, 0.06);
  font-size: 14px;
  color: #242a4a;
}

.account-box .account-in .account-item .account-item-in .icons {
  height: 17px;
  width: 17px;
  display: inline-block;
  margin-top: -1px;
  background-size: 100% 100%;
}

.account-box .account-in .account-item .account-item-in .yesImg {
  background-image: url(../../assets/img/overicon.png);
}

.icons.noImg {
  background-image: url(../../assets/img/noicon.png);
}

.account-box .account-in .account-item .account-item-in .card-number {
  width: 142px;
  height: 40px;
  margin-right: 15px;
  border-right: 1px dashed #d0d5de;
  padding: 0 15px;
  line-height: 40px;
  text-align: left;
  display: inline-block;
}

.account-box .account-in .account-item .account-item-in .bankInfo {
  width: 70%;
  text-align: left;
}

.account-box .account-in .account-item .account-item-in .btn {
  padding: 8px 10px;
  cursor: pointer;
}

.tips-g {
  color: #8994a3;
  font-size: 12px;
}

.gr {
  color: #b4b4b4;
}

.m1 {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: url(../../assets/img/m1.png);
  background-size: 100% 100%;
  vertical-align: middle;
  margin-right: 5px;
}

.m2 {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: url(../../assets/img/m2.png);
  background-size: 100% 100%;
  vertical-align: middle;
  margin-right: 5px;
}

.anquandengji {
  font-size: 24px;
  color: #000;
}

.itp {
  display: inline-block;
}

.user-right {
  width: 80%;
}

.nav-right {
  padding-left: 15px;
}

.nav-right .padding-right-clear {
  padding-left: 15px;
}

.rightarea {
  background: #fff;
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

.rightarea .trade-process {
  line-height: 30px;
  padding: 0 15px;
  background: #f1f1f1;
  display: inline-block;
  position: relative;
  margin-right: 20px;
}

.rightarea .trade-process.active {
  color: #eb6f6c;
  background: #f9f5eb;
}

.rightarea .trade-process .icon {
  background: #fff;
  border-radius: 20px;
  height: 20px;
  width: 20px;
  display: inline-block;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
}

.rightarea .trade-process .arrow {
  position: absolute;
  top: 10px;
  right: -5px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid #f1f1f1;
}

.rightarea .trade-process.active .arrow {
  border-left: 5px solid #f9f5eb;
}

.rightarea .rightarea-tabs {
  border: none;
}

.rightarea .rightarea-tabs li > a {
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

.rightarea .rightarea-tabs li > a:hover {
  background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li {
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

.rightarea .rightarea-tabs li.active {
  background-color: #fcfbfb;
}

.rightarea .rightarea-tabs li:last-child {
  border-right: 1px solid #f1f1f1;
}

.rightarea .rightarea-tabs li.active > a,
.rightarea .rightarea-tabs li:hover > a {
  color: #da2e22;
  border: none;
}

.rightarea .panel-tips {
  border: 3px solid #fdfaf3;
  color: #9e9e9e;
  font-size: 12px;
}

.rightarea .panel-tips .panel-header {
  background: #fdfaf3;
  line-height: 40px;
  margin-bottom: 15px;
}

.rightarea .panel-tips .panel-title {
  font-size: 16px;
}

.rightarea .recordtitle {
  cursor: pointer;
}

.user .user-top-icon {
  height: 120px;
  border-bottom: 1px dashed #ebeff5;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 50px;
}

.user .top-icon {
  /* background: url("../../images/user/userplist.png") no-repeat 0 0; */
  width: 75px;
  height: 75px;
  display: inline-block;
}

.user .top-icon.intro {
  background-position: 0 -670px;
}

.user .user-info {
  padding: 0px 10px;
  background-color: #fff;
  color: #0d214e;
}

.user .user-info .user-info-top {
  border-bottom: 1px dashed #ebeff5;
  padding-bottom: 20px;
}

.user .user-info h5 {
  font-size: 18px;
}

.user .user-info h5 .iconfont {
  font-size: 20px;
  color: #e24a64;
  margin-left: 10px;
}

.user-avatar {
  display: flex;
  justify-content: space-between;
}

.user-icons {
  display: flex;
  align-self: center;
  width: 190px;
}

.user-icons .icons-in {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-color: #00b5f6;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.user-icons .icons-in em {
  color: white;
  font-size: 20px;
  font-style: normal;
}

.user-icons .user-name {
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  /* align-items: center; */
  flex-direction: column;
}

.user-icons .user-name span {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 125px;
  height: 24px;
  overflow: hidden;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
}

.user-top-icon .trade-info {
  width: 420px;
  padding-left: 30px;
  display: flex;
}

.user-top-icon .trade-info .item {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.user-top-icon .trade-info .item.capital {
  width: 60%;
}

.user-icons .user-name span.uid {
  color: #8994a3;
  font-size: 12px;
}

.circle-info {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px solid #ebeff5;
  margin-left: 14px;
}

.circle-info span {
  font-weight: bolder;
}

.circle-info p {
  color: #8994a3;
  margin: 0;
  padding: 0;
}

.circle-info p.count {
  color: #0d214e;
  font-size: 14px;
  font-weight: 600;
}

.user-avatar-public {
  background: #fff;
  border-radius: 50%;
  height: 52px;
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 5px 0 rgba(71, 78, 114, 0.24);
  position: relative;
}

.user-avatar-public > .user-avatar-in {
  background: #4f659d;
  border-radius: 50%;
  height: 42px;
  width: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
/* 按钮 */
.ivu-btn-primary,.ivu-btn-ghost{
  font-size: 14px;
  width: 170px;
  height: 42px;
}
.ivu-btn-primary{
  background: #4f659d;
}
/* 身份证验证 */
.account-box .account-in .account-item .account-detail.idCard{
 padding: 50px 130px;
}
.cardWarp{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.cardWarp .ivu-form-item.ivu-form-item-required{
  width: 45%;
}
.account-box .account-in .account-item .account-detail.idCard .uploadArWarp{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 300px;
  margin-top: 40px;
}
.account-box .account-in .account-item .account-detail.idCard .uploadAr{
  width: 30%;
  height: auto;
}
.account-box .account-in .account-item .account-detail.idCard .uploadAr span.uploadPic{
  margin-top: 40px;
  display: inline-block;
  border: 2px solid #d8dbe2;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  line-height: 50px;font-size: 50px;
  color: #d1d1d1;
}
.account-box .account-in .account-item .account-detail.idCard .uploadAr div{
  line-height: 60px;
  margin-bottom: 20px;
}
.account-box .account-in .account-item .account-detail.idCard .uploadBtn .ivu-btn.ivu-btn-primary,
.account-box .account-in .account-item .account-detail.idCard .uploadBtn .ivu-btn.ivu-btn-ghost{
  width: 48%;
}

</style>

