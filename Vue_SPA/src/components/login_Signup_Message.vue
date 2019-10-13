<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-message">{{Response_Message_s}}</div>
        <div class="validation-message" v-if="showvalidation_message">驗證信已寄至您的信箱
          <br>
          {{UserData.Email}}，請查收！
          <br>並輸入驗證碼！
        </div>
        <div class="validation-code" v-if="showvalidation_message">
          <div class="type_error" :style="com_show_error">
            {{error_message}}
            <br>
            {{Response_error_message}}
          </div>
          <input
            type="text"
            id="first_validation_code"
            ref="firstvc"
            v-focus="showvalidation_message"
            :style="com_focus_first"
            v-on:keydown.9="nextfocus('svc')"
            :tabindex="tabindex1"
            maxlength="1"
            @click="inittabindex1"
            v-on:keyup="keycode"
          >
          -
          <input
            type="text"
            id="second_validation_code"
            ref="svc"
            v-on:keydown.9="nextfocus('tvc')"
            :style="com_focus_second"
            :tabindex="tabindex2"
            maxlength="1"
            @click="inittabindex2"
            v-on:keyup="keycode"
          >
          -
          <input
            type="text"
            id="third_validation_code"
            ref="tvc"
            v-on:keydown.9="nextfocus('fvc')"
            :style="com_focus_third"
            :tabindex="tabindex3"
            maxlength="1"
            @click="inittabindex3"
            v-on:keyup="keycode"
          >
          -
          <input
            type="text"
            id="fourth_validation_code"
            ref="fvc"
            :style="com_focus_fourth"
            v-on:keydown.9="nextfocus('click')"
            :tabindex="tabindex4"
            maxlength="1"
            @click="inittabindex4"
            v-on:keyup="keycode"
          >
        </div>
        <button
          class="modal-default-button"
          ref="click"
          @click="validation"
          v-on:keydown.9="nextfocus('firstvc')"
          :tabindex="tabindex5"
          v-on:keyup="keybutton"
          :style="com_validation_button_focus"
          @mouseover="validation_hoverbutton"
          @mouseleave="validation_leavebutton"
        >{{Button_Message}}</button>
      </div>
    </div>
    <alert v-if="Is_Signup_success" :API_Response_Message="API_Response_Message"></alert>
  </div>
</template>

<script>
import loginSigninSignupAlert from './login_Signin_Signup_Alert';
export default {
  components: { alert: loginSigninSignupAlert },
  props: {
    // 從註冊頁面props API回傳是否註冊成功的訊息
    Response_Message_s: {
      type: String
    },
    // 從註冊頁面props 若註冊成功則開啟驗證碼div
    showvalidation_message: { type: Boolean },
    // 從註冊頁面props UserData
    UserData: { type: Object },
    Button_Message: {
      type: String
    }
  },
  data () {
    return {
      // 驗證碼的外框顏色，依照是否focus來變換
      focus_first_color: '#f5548c',
      focus_second_color: 'rgb(56, 180, 76)',
      focus_third_color: 'rgb(56, 180, 76)',
      focus_fourth_color: 'rgb(56, 180, 76)',

      // 4位驗證碼和submit的tab排序
      tabindex1: 1,
      tabindex2: 2,
      tabindex3: 3,
      tabindex4: 4,
      tabindex5: 5,

      // 前端regex驗證帳密&email 格式輸入是否正確
      error_message: '',

      // API回傳驗證錯誤訊息
      Response_error_message: '',

      // 判斷API回傳驗證錯誤訊息的DIV是否隱藏
      Is_show_error: 'hidden',

      // 若API回傳驗證成功，則開啟partial view 通知驗證成功!
      Response_Message_f: '',

      // 判別驗證成功的partial view是否開啟
      Is_Signup_success: false,

      // 4位驗證碼，統整為string，方便API POST
      VerificationCode: '',

      validation_submit_transform_position: '0',
      validation_submit_box_shadow: 'none'
    };
  },
  methods: {
    // POST至API 確認驗證碼是否正確
    validation: function () {
      // 若為確認，則代表該視窗當成ALERT ERROR MESSAGE來使用，點擊後則關閉回到上一頁
      if (this.Button_Message === '確認') {
        this.$emit('forget_hiddenMessage', false);
        return;
      }

      this.UserData.VerificationCode =
        this.$refs.firstvc.value +
        this.$refs.svc.value +
        this.$refs.tvc.value +
        this.$refs.fvc.value;

      if (this.error_message === '') {
        var _this = this;
        this.api.CheckVerificationCodeForSignUp(this.global.SetAccountData(this.UserData))
          .then(response => {
            if (response.data.responseStatusCode === _this.responseStatusCode.validateSuccess.statusCode) {
              if (_this.Response_Message_s === _this.responseStatusCode.reSetPassWordVerificationCode.message) {
                _this.$emit('forget_hiddenMessage', false);
                _this.$emit('show_reset_password', true);
                _this.$emit('Reset_API_Response_Message', '請輸入新密碼！');
              } else {
                _this.tabindex1 = 0;
                _this.tabindex2 = 0;
                _this.tabindex3 = 0;
                _this.tabindex4 = 0;
                _this.tabindex5 = 0;

                _this.Is_Signup_success = true;
                _this.API_Response_Message = _this.global.GetResponseMessage(response);
              }
            } else {
              // 若驗證不成功，error div開啟
              _this.Is_show_error = 'visible';
              _this.Response_error_message = _this.global.GetResponseMessage(response);
            }
          });
      }
    },

    // 若focus在驗證碼的input時，keyup 'Tab'鍵來操作input的css
    nextfocus: function (ref) {
      if (ref === 'svc') {
        this.focus_first_color = 'rgb(56, 180, 76)';
        this.focus_second_color = '#f5548c';
        this.focus_third_color = 'rgb(56, 180, 76)';
        this.focus_fourth_color = 'rgb(56, 180, 76)';
        this.tabindex1 += 5;
      } else if (ref === 'tvc') {
        this.focus_first_color = 'rgb(56, 180, 76)';
        this.focus_second_color = 'rgb(56, 180, 76)';
        this.focus_third_color = '#f5548c';
        this.focus_fourth_color = 'rgb(56, 180, 76)';
        this.tabindex2 += 5;
      } else if (ref === 'fvc') {
        this.focus_first_color = 'rgb(56, 180, 76)';
        this.focus_second_color = 'rgb(56, 180, 76)';
        this.focus_third_color = 'rgb(56, 180, 76)';
        this.focus_fourth_color = '#f5548c';
        this.tabindex3 += 5;
      } else if (ref === 'click') {
        this.focus_first_color = 'rgb(56, 180, 76)';
        this.focus_second_color = 'rgb(56, 180, 76)';
        this.focus_third_color = 'rgb(56, 180, 76)';
        this.focus_fourth_color = 'rgb(56, 180, 76)';

        this.validation_submit_transform_position = '-5';
        this.validation_submit_box_shadow = '0 0.3em #c41250';
        this.tabindex4 += 5;
      } else {
        this.focus_first_color = '#f5548c';
        this.focus_second_color = 'rgb(56, 180, 76)';
        this.focus_third_color = 'rgb(56, 180, 76)';
        this.focus_fourth_color = 'rgb(56, 180, 76)';
        this.validation_submit_transform_position = '0';
        this.validation_submit_box_shadow = 'none';
        this.tabindex5 += 5;
      }
      if (this.tabindex5 === 10) {
        this.tabindex1 = 1;
        this.tabindex2 = 2;
        this.tabindex3 = 3;
        this.tabindex4 = 4;
        this.tabindex5 = 5;
      }
    },
    // 當input被click時，init tabindex，防止user因隨便點擊input使得tabindex大亂
    inittabindex1: function () {
      this.tabindex1 = 1;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = '#f5548c';
      this.focus_second_color = 'rgb(56, 180, 76)';
      this.focus_third_color = 'rgb(56, 180, 76)';
      this.focus_fourth_color = 'rgb(56, 180, 76)';
    },
    inittabindex2: function () {
      this.tabindex1 = 6;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = 'rgb(56, 180, 76)';
      this.focus_second_color = '#f5548c';
      this.focus_third_color = 'rgb(56, 180, 76)';
      this.focus_fourth_color = 'rgb(56, 180, 76)';
    },
    inittabindex3: function () {
      this.tabindex1 = 6;
      this.tabindex2 = 7;
      this.tabindex3 = 3;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = 'rgb(56, 180, 76)';
      this.focus_second_color = 'rgb(56, 180, 76)';
      this.focus_third_color = '#f5548c';
      this.focus_fourth_color = 'rgb(56, 180, 76)';
    },
    inittabindex4: function () {
      this.tabindex1 = 6;
      this.tabindex2 = 7;
      this.tabindex3 = 8;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = 'rgb(56, 180, 76)';
      this.focus_second_color = 'rgb(56, 180, 76)';
      this.focus_third_color = 'rgb(56, 180, 76)';
      this.focus_fourth_color = '#f5548c';
    },
    // input 和 submit type 任何鍵時，觸發的method
    // 1.按Tab，則不動作
    // 2.若按數字=>判別是否符合regex字串=>判別當前focus element id =>依照各個input設定tabindex & css border
    // 若輸入非數字，則提醒輸入錯誤，並留在原地不跳轉input。
    keycode: function (event) {
      if (event.key === 'Tab') {
        return;
      }
      var regexAccountValidation = new RegExp('^[0-9]+$');
      if (regexAccountValidation.test(event.key)) {
        if (document.activeElement.id === 'first_validation_code') {
          this.tabindex1 = 6;
          this.tabindex2 = 2;
          this.tabindex3 = 3;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
          this.focus_first_color = 'rgb(56, 180, 76)';
          this.focus_second_color = '#f5548c';
          this.focus_third_color = 'rgb(56, 180, 76)';
          this.focus_fourth_color = 'rgb(56, 180, 76)';
          this.$refs.svc.value = '';
          this.Is_show_error = 'hidden';
          this.error_message = '';
          this.$refs.svc.focus();
        } else if (document.activeElement.id === 'second_validation_code') {
          this.tabindex1 = 6;
          this.tabindex2 = 7;
          this.tabindex3 = 3;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
          this.focus_first_color = 'rgb(56, 180, 76)';
          this.focus_second_color = 'rgb(56, 180, 76)';
          this.focus_third_color = '#f5548c';
          this.focus_fourth_color = 'rgb(56, 180, 76)';
          this.$refs.tvc.value = '';
          this.Is_show_error = 'hidden';
          this.error_message = '';
          this.$refs.tvc.focus();
        } else if (document.activeElement.id === 'third_validation_code') {
          this.tabindex1 = 6;
          this.tabindex2 = 7;
          this.tabindex3 = 8;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
          this.focus_first_color = 'rgb(56, 180, 76)';
          this.focus_second_color = 'rgb(56, 180, 76)';
          this.focus_third_color = 'rgb(56, 180, 76)';
          this.focus_fourth_color = '#f5548c';
          this.$refs.fvc.value = '';
          this.Is_show_error = 'hidden';
          this.error_message = '';
          this.$refs.fvc.focus();
        } else if (document.activeElement.id === 'fourth_validation_code') {
          this.tabindex1 = 6;
          this.tabindex2 = 7;
          this.tabindex3 = 8;
          this.tabindex4 = 9;
          this.tabindex5 = 5;
          this.focus_first_color = 'rgb(56, 180, 76)';
          this.focus_second_color = 'rgb(56, 180, 76)';
          this.focus_third_color = 'rgb(56, 180, 76)';
          this.focus_fourth_color = 'rgb(56, 180, 76)';
          this.Is_show_error = 'hidden';
          this.error_message = '';
          this.validation_submit_transform_position = '-5';
          this.validation_submit_box_shadow = '0 0.3em #c41250';
          this.$refs.click.focus();
        }
      } else {
        this.Is_show_error = 'visible';
        this.error_message = '驗證碼只能輸入數字！';
        if (document.activeElement.id === 'first_validation_code') {
          this.$refs.firstvc.value = '';
          this.$refs.firstvc.focus();
          this.focus_first_color = '#FF0000';
        } else if (document.activeElement.id === 'second_validation_code') {
          this.$refs.svc.value = '';
          this.$refs.svc.focus();
          this.focus_second_color = '#FF0000';
        } else if (document.activeElement.id === 'third_validation_code') {
          this.$refs.tvc.value = '';
          this.$refs.tvc.focus();
          this.focus_third_color = '#FF0000';
        } else if (document.activeElement.id === 'fourth_validation_code') {
          this.$refs.fvc.value = '';
          this.$refs.fvc.focus();
          this.focus_fourth_color = '#FF0000';
        }
      }
    },
    // 判別submit  keyup 任何鍵的method(除了Enter & Tab不動作外，其餘按鍵都會重製tabindex & css border，並focus回input 1)
    keybutton: function (event) {
      if (event.key !== 'Enter' && event.key !== 'Tab') {
        this.tabindex1 = 1;
        this.tabindex2 = 2;
        this.tabindex3 = 3;
        this.tabindex4 = 4;
        this.tabindex5 = 5;
        this.focus_first_color = '#f5548c';
        this.focus_second_color = 'rgb(56, 180, 76)';
        this.focus_third_color = 'rgb(56, 180, 76)';
        this.focus_fourth_color = 'rgb(56, 180, 76)';
        this.$refs.firstvc.value = '';
        this.validation_submit_transform_position = '0';
        this.validation_submit_box_shadow = 'none';

        this.$refs.firstvc.focus();
      }
    },
    // 因submit button的css值已被data鎖定，故無法再css裡設定，這邊用js event來完成 滑鼠hover & leave的動作
    validation_hoverbutton: function () {
      this.validation_submit_transform_position = '-5';
      this.validation_submit_box_shadow = '0 0.3em #c41250';
    },
    validation_leavebutton: function () {
      this.validation_submit_transform_position = '0';
      this.validation_submit_box_shadow = 'none';
    }
  },
  computed: {
    // 動態變換input 的 border
    com_focus_first () {
      return { border: '2px ' + this.focus_first_color + ' solid' };
    },
    com_focus_second () {
      return { border: '2px ' + this.focus_second_color + ' solid' };
    },
    com_focus_third () {
      return { border: '2px ' + this.focus_third_color + ' solid' };
    },
    com_focus_fourth () {
      return { border: '2px ' + this.focus_fourth_color + ' solid' };
    },
    // 動態變換error div 的顯示與否
    com_show_error () {
      return { visibility: this.Is_show_error };
    },
    com_validation_button_focus () {
      return {
        transform:
          'translateY(' + this.validation_submit_transform_position + 'px)',
        'transition-duration': 0.15 + 's',
        'box-shadow': this.validation_submit_box_shadow
      };
    }
  },
  // 自建 vue function
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
@import "../../css/login_signup_message.css";
</style>
