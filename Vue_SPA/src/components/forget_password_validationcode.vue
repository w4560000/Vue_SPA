<template>
  <div class="login-forget-body">
    <div class="login-forget-outer">
      <div class="login-forget-wrapper-login">
        <div class="login-forget-inner-wrapper">
          <div class="login-forget-upper">
            <div class="logo"></div>
            <div class="div-forget">
              <form class="form-forget" @submit.prevent="forget_submit">
                <h2>{{forget_title}}</h2>
                <br>
                <h2>請輸入帳號以及註冊信箱！</h2>
                <div class="forget-result" >
                  <p>{{forget_result}}</p>
                  <em>{{UserData.Email}}</em>
                </div>
                <ul class="forget-input">
                  <li>
                    <input
                      id="forget-account"
                      ref="forget_account"
                      v-model="UserData.Account"
                      v-focus
                      @click="Focus_forget_Account_input"
                      @blur="forget_Account_placeholder(UserData.Account)"
                      v-on:keydown.9="forget_nextfocus('forget_email')"
                      :tabindex="forget_tabindex1"
                    >
                    <label
                      id="forget-account-input"
                      for="forget-account"
                      data-notice="請填入帳號"
                      @click="Focus_forget_Account_input"
                      :style="com_forget_Account_placeholder"
                      :class="{Account_alert : IsAccount_alert}"
                    >註冊時用的帳號</label>
                  </li>
                  <li>
                    <input
                      id="forget-email"
                      ref="forget_email"
                      v-model="UserData.Email"
                      @click="Focus_forget_Email_input"
                      @blur="forget_Email_placeholder(UserData.Email)"
                      v-on:keydown.9="forget_nextfocus('forget_submitbutton')"
                      :tabindex="forget_tabindex2"
                    >
                    <label
                      id="forget-email-input"
                      for="forget-email"
                      data-notice="請填入Email"
                      @click="Focus_forget_Email_input"
                      :style="com_forget_Email_placeholder"
                      :class="{Email_alert : IsEmail_alert}"
                    >註冊時用的 Email 信箱</label>
                  </li>
                </ul>
                <div class="forget-submit">
                  <input
                    type="submit"
                    class="forget-input-submit"
                    v-bind:value="submit_text"
                    ref="forget_submitbutton"
                    :tabindex="forget_tabindex3"
                    v-on:keydown.9="forget_nextfocus('forget_account')"
                    :style="com_forget_submitfocus"
                    @mouseover="forget_hoverbutton"
                    @mouseleave="forget_leavebutton"
                  >
                  <span class="backtologin" @click="backtologin">回上一頁</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="showModal"
      @close="showModal"
      :Response_Message_s="Response_Message"
      :showvalidation_message="showvalidation_message"
      :UserData="UserData"
      :Button_Message="Button_Message"
      v-on:forget_hiddenMessage="onforget_hiddenMessage"
      v-on:show_reset_password="onshow_reset_password"
      v-on:Reset_API_Response_Message="onReset_API_Response_Message"
    ></modal>
    <Loading v-if="IsLoading" @close="IsLoading"></Loading>
    <reset
      v-if="Is_Reset_password"
      :Reset_API_Response_Message="Reset_API_Response_Message"
      :Account="UserData.Account"
    ></reset>
  </div>
</template>

<script>
import loginSignupMessage from './login_Signup_Message';
import Loading from './loading/index';
import ResetPassword from './reset_password';

import { mapGetters } from 'vuex';
export default {
  components: {
    modal: loginSignupMessage,
    Loading: Loading,
    reset: ResetPassword
  },
  props: {
    // 父元件props過來的參數
    forget_title: {
      type: String
    },
    forget_result: {
      type: String
    },
    submit_text: {
      type: String
    },
    resendMailType: {
      type: Number
    }
  },
  data () {
    return {
      // 使用者資訊
      UserData: {
        Account: '',
        Email: '',
        ResendMailType: 0
      },

      // 若帳號與信箱未填寫則提醒
      IsAccount_alert: false,
      IsEmail_alert: false,

      // tabindex
      forget_tabindex1: 1,
      forget_tabindex2: 2,
      forget_tabindex3: 3,

      // input&submit button的css data
      forget_Account_placeholder_color: 'transparent',
      forget_Account_Image_position: '-38',
      forget_Email_placeholder_color: '#bbb',
      forget_Email_Image_position: '-211',

      // submit button的hover css data
      forget_submit_transform_position: '0',
      forget_submit_box_shadow: 'none',

      // 驗證碼子元件&訊息
      showModal: false,
      Response_Message: '',

      // 驗證碼子元件的驗證碼div
      showvalidation_message: false,

      // 驗證碼子元件的button文字
      Button_Message: '',

      // Reset子元件&訊息
      Is_Reset_password: false,
      Reset_API_Response_Message: ''
    };
  },
  mounted () {
    debugger;
    this.UserData.ResendMailType = this.resendMailType;
  },
  methods: {
    // 返回上一頁
    backtologin: function () {
      this.$emit('hiddenforget', false);
    },
    // 送出submit的動作
    forget_submit: function () {
      if (this.UserData.Account === '') {
        this.IsAccount_alert = true;
        return;
      } else {
        this.IsAccount_alert = false;
      }
      if (this.UserData.Email === '') {
        this.IsEmail_alert = true;
        return;
      } else {
        this.IsEmail_alert = false;
      }

      // 若帳號與信箱都已填寫，並驗證，則傳送驗證信
      if (!this.IsAccount_alert && !this.IsEmail_alert) {
        var _this = this;
        debugger;
        this.api.ReSendEmailForReSetPassWord(this.global.SetAccountData(this.UserData))
          .then(response => {
            debugger;
            // 開啟驗證信子元件視窗
            _this.showModal = true;
            _this.Response_Message = _this.global.GetResponseMessage(response);

            // 先重置父元件tabindex
            _this.forget_tabindex1 = 0;
            _this.forget_tabindex2 = 0;
            _this.forget_tabindex3 = 0;

            if (response.data.responseStatusCode === _this.responseStatusCode.reSetPassWordVerificationCode.statusCode) {
              _this.showvalidation_message = true;
              _this.Button_Message = '驗證';
            } else {
              _this.Button_Message = '確認';
            }
          });
      }
    },
    // 若未Focus欄位，變換Icon顏色與樣式
    forget_Account_placeholder: function (key) {
      if (key === '') {
        this.forget_Account_placeholder_color = '#bbb';
        this.forget_Account_Image_position = '16';
        this.IsAccount_alert = false;
      }
    },
    forget_Email_placeholder: function (key) {
      if (key === '') {
        this.forget_Email_placeholder_color = '#bbb';
        this.forget_Email_Image_position = '-211';
        this.IsEmail_alert = false;
      }
    },
    // Focus 欄位
    Focus_forget_Account_input: function () {
      this.$refs.forget_account.focus();
      this.forget_Account_placeholder_color = 'transparent';
      this.forget_Account_Image_position = '-38';
      this.forget_tabindex1 = 1;
      this.forget_tabindex2 = 2;
      this.forget_tabindex3 = 3;
    },
    Focus_forget_Email_input: function () {
      this.$refs.forget_email.focus();
      this.forget_Email_placeholder_color = 'transparent';
      this.forget_Email_Image_position = '-264';
      this.forget_tabindex1 = 1;
      this.forget_tabindex2 = 2;
      this.forget_tabindex3 = 3;
    },
    // 按下Tab時的動作，變換新密碼欄位的icon樣式與submit button的css hover
    forget_nextfocus: function (ref) {
      if (ref === 'forget_email') {
        this.forget_tabindex1 += 3;

        this.forget_Email_placeholder_color = 'transparent';
        this.forget_Email_Image_position = '-264';
        this.forget_submit_transform_position = '0';
        this.forget_submit_box_shadow = 'none';
      } else if (ref === 'forget_submitbutton') {
        this.forget_tabindex2 += 3;

        this.forget_submit_transform_position = '-5';
        this.forget_submit_box_shadow = '0 0.3em #c41250';
      } else {
        this.forget_Account_placeholder_color = 'transparent';
        this.forget_Account_Image_position = '-38';
        this.forget_submit_transform_position = '0';
        this.forget_submit_box_shadow = 'none';
        this.forget_tabindex1 = 1;
        this.forget_tabindex2 = 2;
        this.forget_tabindex3 = 3;
      }
    },
    // 因submit button的css值已被data鎖定，故無法再css裡設定，這邊用js event來完成 滑鼠hover & leave的動作
    forget_hoverbutton: function () {
      this.forget_submit_transform_position = '-5';
      this.forget_submit_box_shadow = '0 0.3em #c41250';
    },
    forget_leavebutton: function () {
      this.forget_submit_transform_position = '0';
      this.forget_submit_box_shadow = 'none';
    },

    // 驗證碼子元件回傳的事件，用以關閉驗證碼子元件
    onforget_hiddenMessage: function (data) {
      this.showModal = data;
    },
    // 驗證碼子元件回傳的事件，回傳的message會當成Reset子元件的title
    onReset_API_Response_Message: function (data) {
      this.Reset_API_Response_Message = data;
    },
    // 驗證碼子元件回傳的事件，判斷是否開啟Reset子元件
    onshow_reset_password: function (data) {
      this.Is_Reset_password = data;
      if (data) {
        this.forget_tabindex1 = 0;
        this.forget_tabindex2 = 0;
        this.forget_tabindex3 = 0;
      }
    }
  },
  computed: {
    // 當前Account_planceholder狀態
    com_forget_Account_placeholder () {
      return {
        color: this.forget_Account_placeholder_color,
        'background-position': '0 ' + this.forget_Account_Image_position + 'px'
      };
    },
    // 當前Email_planceholder狀態
    com_forget_Email_placeholder () {
      return {
        color: this.forget_Email_placeholder_color,
        'background-position': '0 ' + this.forget_Email_Image_position + 'px'
      };
    },
    // 當前submit button hover的css
    com_forget_submitfocus () {
      return {
        transform:
          'translateY(' + this.forget_submit_transform_position + 'px)',
        'transition-duration': 0.15 + 's',
        'box-shadow': this.forget_submit_box_shadow
      };
    },
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
@import "../../css/forget.css";
</style>
