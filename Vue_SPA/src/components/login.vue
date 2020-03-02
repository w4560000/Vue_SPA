<template>
  <div class="login-body">
    <div class="login-outer">
      <div class="login-wrapper-login">
        <div class="login-inner-wrapper">
          <div class="login-upper">
            <div class="logo"></div>
            <div class="social-btn">
              <div class="inner-btn-wrapper">
                <div
                  class="social-login-btn"
                  :class="{'animation-toright':prev}"
                  v-if="prev"
                >
                  <a
                    class="m-button-fb"
                    @click="FBLogin"
                  >用Facebook登入</a>
                  <a class="m-button-weibo">
                    <i class="useless"></i>无法用Weibo登录
                  </a>
                </div>
                <div
                  class="social-login-btn"
                  :class="{'animation-toleft':!prev}"
                  v-if="!prev"
                >
                  <a class="m-button-twitter">
                    <i class="useless"></i>無法用Twitter登入
                  </a>
                  <a class="m-button-weixin">
                    <i class="useless"></i>無法用Weixin微信登入
                  </a>
                </div>
              </div>
            </div>
            <div class="prev-next">
              <i
                data-click="btn-back"
                :class="{'back':prev}"
                @click="prev=!prev;"
              ></i>
              <i
                data-click="btn-next"
                :class="{'next':!prev}"
                @click="prev=!prev;"
              ></i>
            </div>
            <p class="promo">加入會員 72 小時內首次購物享 95 折優惠！</p>
          </div>
          <div class="form-wrapper">
            <form
              id="login-form"
              @submit.prevent="login_submit"
            >
              <div class="login-message"></div>
              <div
                class="login-pinkoi-account"
                :class="{signin_error : IsSignin_error}"
              >{{Message}}</div>
              <ul>
                <li>
                  <input
                    id="login-id"
                    ref="Account"
                    v-model="UserData.Account"
                    @click="Focus_Account_input"
                    @blur="Account_placeholder(UserData.Account)"
                    v-on:keydown.9="login_nextfocus('PassWord')"
                    :tabindex="tabindex1"
                    v-focus="true"
                    maxlength="16"
                  >
                  <label
                    id="id-input"
                    @click="Focus_Account_input"
                    :style="com_Account_placeholder"
                    :class="{Login_Account_alert : IsLoginAccount_alert}"
                    data-notice="請填入帳號"
                  >帳號</label>
                </li>
                <li>
                  <input
                    id="login-password"
                    type="password"
                    ref="PassWord"
                    v-model="UserData.PassWord"
                    @click="Focus_PassWord_input"
                    @blur="PassWord_placeholder(UserData.PassWord)"
                    :tabindex="tabindex2"
                    v-on:keydown.9="login_nextfocus('submitbutton')"
                    maxlength="16"
                  >
                  <label
                    id="password-input"
                    @click="Focus_PassWord_input"
                    :style="com_PassWord_placeholder"
                    :class="{Login_PassWord_alert : IsLoginPassWord_alert}"
                    data-notice="請填入密碼"
                  >密碼</label>
                </li>
              </ul>
              <div class="button-wrapper">
                <input
                  type="submit"
                  class="login-submit"
                  ref="submitbutton"
                  value="登入"
                  :tabindex="tabindex3"
                  v-on:keydown.9="login_nextfocus('Account')"
                  :style="com_button_fucus"
                  @mouseover="hoverbutton"
                  @mouseleave="leavebutton"
                >
              </div>
            </form>
            <div class="login-help">
              <div class="login-problem">
                <span
                  data-click="forgetpassword"
                  @click="forget_password"
                >忘記密碼</span>
                <span
                  data-click="resend"
                  @click="forget_validation"
                >重寄認證信</span>
              </div>
              <div class="lower-block">還不是會員嗎?
                <router-link to="/login_signup">
                  <span data-click="signup">立刻註冊新帳號</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <alert
      v-if="Is_Signin_success"
      :API_Response_Message="API_Response_Message"
    ></alert>
    <modal
      v-if="showModal"
      @close="showModal = false"
      :Response_Message_s="Response_Message"
      :showvalidation_message="showvalidation_message"
      :UserData="UserData"
      :Button_Message="Button_Message"
      v-on:forget_hiddenMessage="onhiddenMessage"
    ></modal>
    <forget
      v-if="Is_click_forget"
      :forget_title="forget_title"
      :forget_result="forget_result"
      :submit_text="submit_text"
      :resendMailType="resendMailType"
      @close="Is_click_forget = false"
      v-on:hiddenforget="onhiddenforget"
    ></forget>
  </div>
</template>

<script>
import loginSigninSignupAlert from './login_Signin_Signup_Alert';
import loginSignupMessage from './login_Signup_Message';
import loginforget from './forget_password_validationcode';
export default {
  components: {
    alert: loginSigninSignupAlert,
    modal: loginSignupMessage,
    forget: loginforget
  },
  name: 'login',
  data () {
    return {
      prev: true, // 控制登入btn的按鈕，true = (該頁面為fb_wb_bt)，false = (該頁面為tw_wx_bt)

      // 預設帳號密碼文字和位置
      Account_placeholder_color: 'transparent',
      Account_Image_position: '-38',
      PassWord_placeholder_color: '#bbb',
      PassWord_Image_position: '-93',

      submit_transform_position: '0',
      submit_box_shadow: 'none',
      // 判斷是否登入成功&API Response
      Is_Signin_success: false,
      API_Response_Message: '',

      // 若登入失敗，則在原視窗顯示error
      IsSignin_error: false,

      // 使用者資料
      UserData: {
        Account: '',
        PassWord: '',
        Email: ''
      },

      Message: '使用 Pinkoi 帳號登入',

      // setting click tab鍵的排序
      tabindex1: 1,
      tabindex2: 2,
      tabindex3: 3,

      // 若input 輸入為空的alert
      IsLoginAccount_alert: false,
      IsLoginPassWord_alert: false,

      // 若註冊後，卻未驗證，則登入時會開啟子元件-驗證碼視窗
      showModal: false,
      Response_Message: '',
      showvalidation_message: false,
      Button_Message: '',

      // 點擊忘記密碼or重寄驗證信則開啟子元件 -forget視窗
      Is_click_forget: false,
      forget_title: '',
      forget_result: '',
      submit_text: '',

      // 存取點擊忘記密碼或重傳驗證信時的動作
      resendMailType: 0
    };
  },
  methods: {
    // 子元件傳來的值: 判斷是否隱藏子元件
    onhiddenMessage: function (data) {
      this.showModal = data;
    },
    // Focus Input時的動作
    Focus_Account_input: function () {
      this.$refs.Account.focus();
      this.Account_placeholder_color = 'transparent';
      this.Account_Image_position = '-38';
      this.Message = '使用 Pinkoi 帳號登入';
      this.IsSignin_error = false;
      this.tabindex1 = 1;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
    },
    Focus_PassWord_input: function () {
      this.$refs.PassWord.focus();
      this.PassWord_placeholder_color = 'transparent';
      this.PassWord_Image_position = '-154';
      this.Message = '使用 Pinkoi 帳號登入';
      this.IsSignin_error = false;
      this.tabindex1 = 4;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
    },
    // 若未Focus新密碼欄位，變換Icon顏色與樣式
    Account_placeholder: function (key) {
      if (key === '') {
        this.Account_placeholder_color = '#bbb';
        this.Account_Image_position = '16';
      } else {
        this.Account_placeholder_color = 'transparent';
        this.Account_Image_position = '-38';
      }
    },
    PassWord_placeholder: function (key) {
      if (key === '') {
        this.PassWord_placeholder_color = '#bbb';
        this.PassWord_Image_position = '-93';
      } else {
        this.PassWord_placeholder_color = 'transparent';
        this.PassWord_Image_position = '-154';
      }
    },
    // 送出submit的動作
    login_submit: function () {
      if (this.UserData.Account === '') {
        this.IsLoginAccount_alert = true;
        return;
      } else {
        this.IsLoginAccount_alert = false;
      }

      if (this.UserData.PassWord === '') {
        this.IsLoginPassWord_alert = true;
        return;
      } else {
        this.IsLoginPassWord_alert = false;
      }
      if (
        this.IsLoginAccount_alert === false &&
        this.IsLoginPassWord_alert === false
      ) {
        var _this = this;
        this.api.Signin(this.global.SetAccountData(_this.UserData))
          .then(response => {
            if (response.data.responseStatusCode === _this.responseStatusCode.signinSuccess.statusCode) {
              _this.API_Response_Message = _this.global.GetResponseMessage(response);
              _this.Is_Signin_success = true;
              _this.global.SetVuexLocalstorageForLogin(response.data.jwtData);
            } else if (response.data.responseStatusCode === _this.responseStatusCode.emailUnAuthentication.statusCode) {
              _this.showModal = true;
              _this.Response_Message = response.data.result.join('，');
              _this.showvalidation_message = true;
              _this.Button_Message = '驗證';
            } else {
              _this.IsSignin_error = true;
              _this.Message = response.data.result.join('，');
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 點擊tab時的動作
    login_nextfocus: function (ref) {
      if (ref === 'Account') {
        this.Account_placeholder_color = 'transparent';
        this.Account_Image_position = '-38';
        this.submit_transform_position = '0';
        this.submit_box_shadow = 'none';

        this.tabindex3 += 3;
      } else if (ref === 'PassWord') {
        this.PassWord_placeholder_color = 'transparent';
        this.PassWord_Image_position = '-154';
        this.tabindex1 += 3;
      } else if (ref === 'submitbutton') {
        this.submit_transform_position = '-5';
        this.submit_box_shadow = '0 0.3em #c41250';
      }
      if (this.tabindex3 === 6) {
        this.tabindex1 = 1;
        this.tabindex2 = 2;
        this.tabindex3 = 3;
      }
    },
    // setting 子元件的data
    forget_password: function () {
      this.Is_click_forget = true;
      this.forget_title = '忘記密碼？';
      this.forget_result = '已將更換新密碼的資訊寄至您的信箱！';
      this.submit_text = '重設密碼';
      this.tabindex1 = 0;
      this.tabindex2 = 0;
      this.tabindex3 = 0;
      this.resendMailType = this.mailEnum.reSetPassWord;
    },
    forget_validation: function () {
      this.Is_click_forget = true;
      this.forget_title = '未收到驗證碼？';
      this.forget_result = '已將驗證碼寄至您的信箱！';
      this.submit_text = '重新寄送認證信';
      this.tabindex1 = 0;
      this.tabindex2 = 0;
      this.tabindex3 = 0;
      this.resendMailType = this.mailEnum.reSendVerificationCode;
    },
    // 子元件-forget回傳的值，用以判斷是否隱藏子元件
    onhiddenforget: function (data) {
      this.Is_click_forget = data;

      // 返回時，自動focus Account欄位
      this.$refs.Account.focus();
      this.Account_placeholder_color = 'transparent';
      this.Account_Image_position = '-38';
      this.tabindex1 = 1;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
    },
    // 因submit button的css值已被data鎖定，故無法再css裡設定，這邊用js event來完成 滑鼠hover & leave的動作
    hoverbutton: function () {
      this.submit_transform_position = '-5';
      this.submit_box_shadow = '0 0.3em #c41250';
    },
    leavebutton: function () {
      this.submit_transform_position = '0';
      this.submit_box_shadow = 'none';
    },
    FBLogin: function () {
      this.store.dispatch('SetLoading', true);
      var _this = this;
      FB.login(
        function (response) {
          _this.statusChangeCallback(response);
        },
        {
          scope: 'email, public_profile',
          return_scopes: true
        }
      );
    },

    statusChangeCallback (response) {
      var _this = this;
      if (response.status === 'connected') {
        FB.api('/me?fields=name,id', function (response) {
          _this.UserData.Account = response.name;
          _this.api.ResponseJwt(_this.global.SetAccountData(_this.UserData, true))
            .then(data => {
              // 儲存登入資訊至Vuex&Localstorage
              _this.global.SetVuexForFBLogin(
                response,
                data.data.jwt
              );
              _this.API_Response_Message = 'Facebook登入成功！';
              _this.Is_Signin_success = true;
              _this.store.dispatch('SetLoading', true);
            });
        });
      } else {
        _this.global.SetVuex_Localstorage_ForFBLoginProfile('');
      }
    }
  },
  computed: {
    com_Account_placeholder () {
      // 判別當前Account_planceholder狀態
      return {
        color: this.Account_placeholder_color,
        'background-position': '0 ' + this.Account_Image_position + 'px'
      };
    },
    com_PassWord_placeholder () {
      // 判別當前PassWord_planceholder狀態
      return {
        color: this.PassWord_placeholder_color,
        'background-position': '0 ' + this.PassWord_Image_position + 'px'
      };
    },
    // 當前submit button hover的css
    com_button_fucus () {
      return {
        transform: 'translateY(' + this.submit_transform_position + 'px)',
        'transition-duration': 0.15 + 's',
        'box-shadow': this.submit_box_shadow
      };
    }
  },

  directives: {
    focus: {
      inserted: function (el) {
        // 聚焦元素
        el.focus();
      }
    }
  }
};
</script>

<style>
@import "../../css/login.css";
</style>
