<template>
  <div class="login-body">
    <div class="login-outer">
      <div class="login-wrapper-signup" ref="login_wrapper_signup" :style="com_height">
        <div class="login-inner-wrapper">
          <div class="logo"></div>
          <div class="form-wrapper">
            <h2 class="sign_up_string">註冊個人帳號</h2>
            <form id="login-signup-form" class="login-form" @submit.prevent="signup_submit">
              <div v-html="data_error" id="login-message" :class="{submit_error : Issubmit_error}"></div>
              <div class="login-result">
                <h2>註冊成功</h2>
                <p>認證信已寄至您的信箱！</p>
              </div>
              <ul class="login-signup-ul">
                <li>
                  <input
                    id="signup-account"
                    ref="Account"
                    v-model="UserData.Account"
                    @click="Focus_Account_input"
                    @blur="Account_placeholder(UserData.Account)"
                    v-on:keydown.9="signup_nextfocus('PassWord')"
                    :tabindex="signup_tabindex1"
                    type="text"
                    name="id"
                    maxlength="16"
                    v-focus="true"
                  >
                  <label
                    for="signup-account"
                    id="account-input"
                    @click="Focus_Account_input"
                    :style="com_Account_placeholder"
                    :class="{Account_alert : IsAccount_alert}"
                    data-notice="請填入帳號"
                  >帳號</label>
                </li>
                <li>
                  <input
                    id="signup-password"
                    ref="PassWord"
                    v-model="UserData.PassWord"
                    @click="Focus_PassWord_input"
                    @blur="PassWord_placeholder(UserData.PassWord)"
                    v-on:keydown.9="signup_nextfocus('Email')"
                    type="password"
                    name="passwd"
                    maxlength="16"
                    :tabindex="signup_tabindex2"
                  >
                  <label
                    for="login-signup-password"
                    id="password-input"
                    @click="Focus_PassWord_input"
                    :style="com_PassWord_placeholder"
                    :class="{PassWord_alert : IsPassWord_alert}"
                    data-notice="請填入密碼"
                  >密碼</label>
                </li>
                <li>
                  <input
                    id="signup-email"
                    ref="Email"
                    v-model="UserData.Email"
                    @click="Focus_Email_input"
                    @blur="Email_placeholder(UserData.Email)"
                    v-on:keydown.9="signup_nextfocus('submitbutton')"
                    :tabindex="signup_tabindex3"
                    type="e-mail"
                    name="email"
                  >
                  <label
                    for="login-signup-email"
                    id="email-input"
                    @click="Focus_Email_input"
                    :style="com_Email_placeholder"
                    :class="{Email_alert : IsEmail_alert}"
                    data-notice="請填入 Email"
                  >Email</label>
                </li>
              </ul>
              <p>
                按下註冊紐的同時，表示您已詳閱我們的
                <a href="https://google.com">資料使用政策與使用條款</a>！
              </p>
              <div class="button-wrapper">
                <input
                  type="submit"
                  class="signup-button"
                  ref="submitbutton"
                  value="註冊"
                  v-on:keydown.9="signup_nextfocus('Account')"
                  :tabindex="signup_tabindex4"
                  :style="com_signup_button_focus"
                  @mouseover="signup_hoverbutton"
                  @mouseleave="signup_leavebutton"
                >
              </div>
            </form>

            <div class="button-wrapper-shoping">
              <input type="button" class="button-shoping" value="繼續逛 Pinkoi">
            </div>
            <div class="back-to-main">已經有帳號了?
              <router-link to="/login">
                <em>馬上登入</em>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showModal"
      @close="showModal = false"
      :Response_Message_s="Response_Message"
      :showvalidation_message="showvalidation_message"
      :UserData="UserData"
      :Button_Message="Button_Message"
      v-on:forget_hiddenMessage="onhiddenMessage"
    ></modal>

    <Loading v-if="IsLoading" @close="IsLoading"></Loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import login_Signup_Message from './login_Signup_Message';
import Loading from './loading/index';
export default {
  components: { modal: login_Signup_Message, Loading: Loading },
  name: 'login_signup',
  data () {
    return {
      // 子元件-驗證碼的資料
      showModal: false,
      Response_Message: '',
      showvalidation_message: false,
      Button_Message: '',

      // 預設帳號密碼文字和位置
      Account_placeholder_color: 'transparent',
      Account_Image_position: '-38',
      PassWord_placeholder_color: '#bbb',
      PassWord_Image_position: '-93',
      Email_placeholder_color: '#bbb',
      Email_Image_position: '-211',
      wrapper_height: 563,
      // 帳號、密碼、信箱 格式錯誤 ALERT
      data_error: '',
      data_error_br: 0,
      data_error_br_count: 0,

      // 帳號、密碼、信箱 未填寫 ALERT
      Account_opacity: '0',
      PassWord_opacity: '0',
      Email_opacity: '0',

      // 錯誤alert顯示
      Issubmit_error: false,
      IsAccount_alert: false,
      IsPassWord_alert: false,
      IsEmail_alert: false,
      // 使用者資料
      UserData: {
        Account: '',
        PassWord: '',
        Email: ''
      },

      // setting type tab 的順序
      signup_tabindex1: 1,
      signup_tabindex2: 2,
      signup_tabindex3: 3,
      signup_tabindex4: 4,

      // submit button的css hover data
      signup_submit_transform_position: '0',
      signup_submit_box_shadow: 'none'
    };
  },
  methods: {
    // 子元件傳來的值: 判斷是否隱藏子元件
    onhiddenMessage: function (data) {
      this.showModal = data;
    },
    // Focus時，變更Input icon
    Focus_Account_input: function () {
      this.$refs.Account.focus();
      this.Account_placeholder_color = 'transparent';
      this.Account_Image_position = '-38';
      this.signup_tabindex1 = 1;
      this.signup_tabindex2 = 2;
      this.signup_tabindex3 = 3;
      this.signup_tabindex4 = 4;
    },
    Focus_PassWord_input: function () {
      this.$refs.PassWord.focus();
      this.PassWord_placeholder_color = 'transparent';
      this.PassWord_Image_position = '-154';
      this.signup_tabindex1 = 5;
      this.signup_tabindex2 = 2;
      this.signup_tabindex3 = 3;
      this.signup_tabindex4 = 4;
    },
    Focus_Email_input: function () {
      this.$refs.Email.focus();
      this.Email_placeholder_color = 'transparent';
      this.Email_Image_position = '-264';
      this.signup_tabindex1 = 5;
      this.signup_tabindex2 = 6;
      this.signup_tabindex3 = 3;
      this.signup_tabindex4 = 4;
    },

    // 若Input未輸入值，則Icon返回黑色和提示字出現
    Account_placeholder: function (key) {
      if (key === '') {
        this.Account_placeholder_color = '#bbb';
        this.Account_Image_position = '16';
        this.IsAccount_alert = false;
      }
    },
    PassWord_placeholder: function (key) {
      if (key === '') {
        this.PassWord_placeholder_color = '#bbb';
        this.PassWord_Image_position = '-93';
      }
    },
    Email_placeholder: function (key) {
      if (key === '') {
        this.Email_placeholder_color = '#bbb';
        this.Email_Image_position = '-211';
      }
    },

    // 點擊Tab時的動作
    signup_nextfocus: function (ref) {
      if (ref === 'Account') {
        this.Account_placeholder_color = 'transparent';
        this.Account_Image_position = '-38';
        this.signup_submit_transform_position = '0';
        this.signup_submit_box_shadow = 'none';
        this.signup_tabindex4 += 4;
      } else if (ref === 'PassWord') {
        this.PassWord_placeholder_color = 'transparent';
        this.PassWord_Image_position = '-154';
        this.signup_tabindex1 += 4;
      } else if (ref === 'Email') {
        this.Email_placeholder_color = 'transparent';
        this.Email_Image_position = '-264';
        this.signup_tabindex2 += 4;
      } else {
        this.signup_submit_transform_position = '-5';
        this.signup_submit_box_shadow = '0 0.3em #c41250';
      }
      if (this.signup_tabindex4 === 8) {
        this.signup_tabindex1 = 1;
        this.signup_tabindex2 = 2;
        this.signup_tabindex3 = 3;
        this.signup_tabindex4 = 4;
      }
    },

    // 註冊submit
    signup_submit: function () {
      this.data_error = '';
      this.data_error_br = 0;
      this.data_error_br_count = 0;
      this.Issubmit_error = false;
      this.showvalidation_message = false;

      // 若Input沒有填寫，則Alert
      if (this.UserData.Account === '') {
        this.IsAccount_alert = true;
        return;
      } else {
        this.IsAccount_alert = false;
      }

      if (this.UserData.PassWord === '') {
        this.IsPassWord_alert = true;
        return;
      } else {
        this.IsPassWord_alert = false;
      }

      if (this.UserData.Email === '') {
        this.IsEmail_alert = true;
        return;
      } else {
        this.IsEmail_alert = false;
      }

      // 若Input都已填寫，則進行Regex驗證輸入格式
      if (
        this.IsAccount_alert === false &&
        this.IsPassWord_alert === false &&
        this.IsEmail_alert === false
      ) {
        var regexAccountValidation = new RegExp('^.[A-Za-z0-9]+$');
        var regexLengthValidation = new RegExp('.{6,16}');
        var regexPassWordValidation = new RegExp(
          '^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d][^\\s]+$'
        );
        var regexEmailValidation = new RegExp(
          '^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$'
        );
        if (
          this.UserData.Account &&
          !regexAccountValidation.test(this.UserData.Account) &&
          regexLengthValidation.test(this.UserData.Account)
        ) {
          this.Issubmit_error = true;
          this.data_error = '帳號只能是英文字母、數字！';
          this.data_error_br += 1;
        }
        if (
          this.UserData.Account &&
          !regexAccountValidation.test(this.UserData.Account) &&
          !regexLengthValidation.test(this.UserData.Account)
        ) {
          this.Issubmit_error = true;
          this.data_error =
            '帳號只能是英文字母、數字且至少要 6 碼以上，16 碼以下！';
          this.data_error_br += 1;
        }
        if (
          this.UserData.Account &&
          regexAccountValidation.test(this.UserData.Account) &&
          !regexLengthValidation.test(this.UserData.Account)
        ) {
          this.Issubmit_error = true;
          this.data_error += '帳號至少要 6 碼以上，16 碼以下！';
          this.data_error_br += 1;
        }
        if (
          this.UserData.PassWord &&
          !regexPassWordValidation.test(this.UserData.PassWord) &&
          regexLengthValidation.test(this.UserData.PassWord)
        ) {
          this.Issubmit_error = true;
          if (this.data_error !== '') {
            this.data_error +=
              '<br/>密碼限英文大小寫或數字，且不含標點符號與空格';
            this.data_error_br_count += 1;
          } else {
            this.Issubmit_error = true;
            this.data_error += '密碼限英文大小寫或數字，且不含標點符號與空格';
            this.data_error_br += 1;
          }
        }
        if (
          this.UserData.PassWord &&
          regexPassWordValidation.test(this.UserData.PassWord) &&
          !regexLengthValidation.test(this.UserData.PassWord)
        ) {
          if (this.data_error !== '') {
            this.data_error += '<br/>密碼至少要 6 碼以上，16 碼以下！';
            this.data_error_br_count += 1;
          } else {
            this.Issubmit_error = true;
            this.data_error += '密碼至少要 6 碼以上，16 碼以下！';
            this.data_error_br += 1;
          }
        }
        if (
          this.UserData.PassWord &&
          !regexPassWordValidation.test(this.UserData.PassWord) &&
          !regexLengthValidation.test(this.UserData.PassWord)
        ) {
          if (this.data_error !== '') {
            this.data_error +=
              '<br/>密碼限英文大小寫或數字，並不含標點符號與空格，且至少要 6 碼以上，16 碼以下！';
            this.data_error_br_count += 1;
          } else {
            this.Issubmit_error = true;
            this.data_error +=
              '密碼限英文大小寫或數字，並不含標點符號與空格，且至少要 6 碼以上，16 碼以下！';
            this.data_error_br += 1;
          }
        }
        if (
          this.UserData.Email &&
          !regexEmailValidation.test(this.UserData.Email)
        ) {
          if (this.data_error !== '') {
            this.data_error += '<br/>請確認E-mail是否填寫正確！';
            this.data_error_br_count += 1;
          } else {
            this.Issubmit_error = true;
            this.data_error += '請確認E-mail是否填寫正確！';
            this.data_error_br += 1;
          }
        }

        // 若資料都已填寫並通過驗證，則傳參數至後端註冊
        if (this.data_error === '') {
          var _this = this;
          this.api.SignupAccount(this.global.SetAccountData(_this.UserData))
            .then(response => {
              // 驗證碼子元件&訊息
              _this.showModal = true;
              _this.Response_Message = _this.global.GetResponseMessage(response);

              // 先重置父元件tabindex，防止干擾子元件的tabindex
              _this.signup_tabindex1 = 0;
              _this.signup_tabindex2 = 0;
              _this.signup_tabindex3 = 0;
              _this.signup_tabindex4 = 0;

              if (response.data.responseStatusCode === _this.responseStatusCode.signupSuccess.statusCode) {
                // 註冊成功則開啟驗證碼input，不成功則當成錯誤訊息alert視窗
                _this.showvalidation_message = true;
                _this.Button_Message = '驗證';
              } else {
                _this.Button_Message = '確認';
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    },
    // 因submit button的css值已被data鎖定，故無法再css裡設定，這邊用js event來完成 滑鼠hover & leave的動作
    signup_hoverbutton: function () {
      this.signup_submit_transform_position = '-5';
      this.signup_submit_box_shadow = '0 0.3em #c41250';
    },
    signup_leavebutton: function () {
      this.signup_submit_transform_position = '0';
      this.signup_submit_box_shadow = 'none';
    }
  },
  // 獲取視窗高度
  mounted () {
    this.wrapper_height = parseInt(this.$refs.login_wrapper_signup.style.height.replace(
      /px/,
      ''
    ));
  },
  computed: {
    // 判斷Regex回傳error的字是否跨行，若跨行則拉高整體body的高度，防止畫面跑掉
    com_height () {
      var heightCurrent =
        this.wrapper_height +
        this.data_error_br * 100 +
        this.data_error_br_count * 10;
      return { height: heightCurrent + 'px' };
    },
    com_Account_placeholder () {
      // 當前Account_planceholder狀態
      return {
        color: this.Account_placeholder_color,
        'background-position': '0 ' + this.Account_Image_position + 'px'
      };
    },
    com_PassWord_placeholder () {
      // 當前PassWord_planceholder狀態
      return {
        color: this.PassWord_placeholder_color,
        'background-position': '0 ' + this.PassWord_Image_position + 'px'
      };
    },
    com_Email_placeholder () {
      // 當前Email_planceholder狀態
      return {
        color: this.Email_placeholder_color,
        'background-position': '0 ' + this.Email_Image_position + 'px'
      };
    },
    // 當前submit button hover的css
    com_signup_button_focus () {
      return {
        transform:
          'translateY(' + this.signup_submit_transform_position + 'px)',
        'transition-duration': 0.15 + 's',
        'box-shadow': this.signup_submit_box_shadow
      };
    },
    // Vuex取得Token
    ...mapGetters(['Token']),
    ...mapGetters(['IsLoading'])
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
@import "../../css/login_signup.css";
</style>
