<template>
  <div class="login-body">
    <div class="login-outer">
      <div class="login-wrapper-signup" :style="com_height">
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
                    v-model="User_Data.Account"
                    @click="Focus_Account_input"
                    @blur="Account_placeholder(User_Data.Account)"
                    type="text"
                    name="id"
                    maxlength="16"
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
                    v-model="User_Data.PassWord"
                    @click="Focus_PassWord_input"
                    @blur="PassWord_placeholder(User_Data.PassWord)"
                    type="password"
                    name="passwd"
                    maxlength="16"
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
                    v-model="User_Data.Email"
                    @click="Focus_Email_input"
                    @blur="Email_placeholder(User_Data.Email)"
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
                  {{Token}}
                </li>
              </ul>
              <p>
                按下註冊紐的同時，表示您已詳閱我們的
                <a href="https://google.com">資料使用政策與使用條款</a>！
              </p>
              <div class="button-wrapper">
                <input type="submit" class="signup-button" value="註冊">
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
      :User_Data="User_Data"
      v-on:hiddenMessage="onhiddenMessage"
    ></modal>

    <Loading v-if="IsLoading" @close="IsLoading"></Loading>
  </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import login_Signup_Message from "./login_Signup_Message";
import Loading from "./loading/index";
export default {
  components: { modal: login_Signup_Message, Loading: Loading },
  name: "login_signup",
  data() {
    return {
      showModal: false,
      Response_Message: "",
      showvalidation_message: false,
      //預設帳號密碼文字和位置
      Account_placeholder_color: "#bbb",
      Account_Image_position: "16",
      PassWord_placeholder_color: "#bbb",
      PassWord_Image_position: "-93",
      Email_placeholder_color: "#bbb",
      Email_Image_position: "-211",
      wrapper_height: 563,
      //帳號、密碼、信箱 格式錯誤 ALERT
      data_error: "",
      data_error_br: 0,
      data_error_br_count: 0,
      //PassWord_error:"密碼限英文大小寫或數字，但不含標點符號與空格。總長度至少 6 碼以上！",
      //Email_error:"請檢察 Email是否正確！",

      //帳號、密碼、信箱 未填寫 ALERT
      Account_opacity: "0",
      PassWord_opacity: "0",
      Email_opacity: "0",

      //錯誤alert顯示
      Issubmit_error: false,
      IsAccount_alert: false,
      IsPassWord_alert: false,
      IsEmail_alert: false,
      //使用者資料
      User_Data: {
        Account: "",
        PassWord: "",
        Email: ""
      }
    };
  },
  methods: {
    onhiddenMessage: function(data) {
      // 更新 showModal 為子組件修改的新數值
      this.showModal = data;
    },
    Focus_Account_input: function() {
      this.$refs.Account.focus();
      this.Account_placeholder_color = "transparent";
      this.Account_Image_position = "-38";
    },
    Focus_PassWord_input: function() {
      this.$refs.PassWord.focus();
      this.PassWord_placeholder_color = "transparent";
      this.PassWord_Image_position = "-154";
    },
    Focus_Email_input: function() {
      this.$refs.Email.focus();
      this.Email_placeholder_color = "transparent";
      this.Email_Image_position = "-264";
    },
    Account_placeholder: function(key) {
      //blur Account input 若未輸入帳號，則placeholder("帳號")顯示
      if (key == "") {
        this.Account_placeholder_color = "#bbb";
        this.Account_Image_position = "16";
        this.IsAccount_alert = false;
      }
    },
    PassWord_placeholder: function(key) {
      //blur Account input 若未輸入帳號，dsddf則placeholder("帳號")顯示
      if (key == "") {
        this.PassWord_placeholder_color = "#bbb";
        this.PassWord_Image_position = "-93";
      }
    },
    Email_placeholder: function(key) {
      //blur Account input 若未輸入帳號，則placeholder("帳號")顯示
      if (key == "") {
        this.Email_placeholder_color = "#bbb";
        this.Email_Image_position = "-211";
      }
    },

    signup_submit: function() {
      this.data_error = "";
      this.data_error_br = 0;
      this.data_error_br_count = 0;
      this.Issubmit_error = false;
      this.showvalidation_message = false;

      if (this.User_Data.Account == "") this.IsAccount_alert = true;
      else this.IsAccount_alert = false;

      if (this.User_Data.PassWord == "") this.IsPassWord_alert = true;
      else this.IsPassWord_alert = false;

      if (this.User_Data.Email == "") this.IsEmail_alert = true;
      else this.IsEmail_alert = false;

      var regex_Account_validation = new RegExp("^.[A-Za-z0-9]+$");
      var regex_length_validation = new RegExp(".{6,16}");
      var regex_PassWord_validation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d][^\\s]+$"
      );
      var regex_Email_validation = new RegExp(
        "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z]+$"
      );
      if (
        this.User_Data.Account &&
        !regex_Account_validation.test(this.User_Data.Account) &&
        regex_length_validation.test(this.User_Data.Account)
      ) {
        this.Issubmit_error = true;
        this.data_error = "帳號只能是英文字母、數字！";
        this.data_error_br += 1;
      }
      if (
        this.User_Data.Account &&
        !regex_Account_validation.test(this.User_Data.Account) &&
        !regex_length_validation.test(this.User_Data.Account)
      ) {
        this.Issubmit_error = true;
        this.data_error =
          "帳號只能是英文字母、數字且至少要 6 碼以上，16 碼以下！";
        this.data_error_br += 1;
      }
      if (
        this.User_Data.Account &&
        regex_Account_validation.test(this.User_Data.Account) &&
        !regex_length_validation.test(this.User_Data.Account)
      ) {
        this.Issubmit_error = true;
        this.data_error += "帳號至少要 6 碼以上，16 碼以下！";
        this.data_error_br += 1;
      }
      if (
        this.User_Data.PassWord &&
        !regex_PassWord_validation.test(this.User_Data.PassWord) &&
        regex_length_validation.test(this.User_Data.PassWord)
      ) {
        this.Issubmit_error = true;
        if (this.data_error != "") {
          this.data_error +=
            "<br/>密碼限英文大小寫或數字，且不含標點符號與空格";
          this.data_error_br_count += 1;
        } else {
          this.Issubmit_error = true;
          this.data_error += "密碼限英文大小寫或數字，且不含標點符號與空格";
          this.data_error_br += 1;
        }
      }
      if (
        this.User_Data.PassWord &&
        regex_PassWord_validation.test(this.User_Data.PassWord) &&
        !regex_length_validation.test(this.User_Data.PassWord)
      ) {
        if (this.data_error != "") {
          this.data_error += "<br/>密碼至少要 6 碼以上，16 碼以下！";
          this.data_error_br_count += 1;
        } else {
          this.Issubmit_error = true;
          this.data_error += "密碼至少要 6 碼以上，16 碼以下！";
          this.data_error_br += 1;
        }
      }
      if (
        this.User_Data.PassWord &&
        !regex_PassWord_validation.test(this.User_Data.PassWord) &&
        !regex_length_validation.test(this.User_Data.PassWord)
      ) {
        if (this.data_error != "") {
          this.data_error +=
            "<br/>密碼限英文大小寫或數字，並不含標點符號與空格，且至少要 6 碼以上，16 碼以下！";
          this.data_error_br_count += 1;
        } else {
          this.Issubmit_error = true;
          this.data_error +=
            "密碼限英文大小寫或數字，並不含標點符號與空格，且至少要 6 碼以上，16 碼以下！";
          this.data_error_br += 1;
        }
      }
      if (
        this.User_Data.Email &&
        !regex_Email_validation.test(this.User_Data.Email)
      ) {
        if (this.data_error != "") {
          this.data_error += "<br/>請確認E-mail是否填寫正確！";
          this.data_error_br_count += 1;
        } else {
          this.Issubmit_error = true;
          this.data_error += "請確認E-mail是否填寫正確！";
          this.data_error_br += 1;
        }
      }

      if (this.data_error == "") {
        var _this = this;
        this.axios
          .post("/Account/SignupAccount", {
            Account: _this.User_Data.Account,
            PassWord: _this.User_Data.PassWord,
            Email: _this.User_Data.Email
          })
          .then(data => {
            //this.$store.dispatch('update_token',data.data);
            _this.showModal = true;
            _this.Response_Message = data.data;
            if (_this.Response_Message == "註冊成功！")
              _this.showvalidation_message = true;

            //更新Vuex
            this.$store.dispatch("Update_Token", data.data.jwt);
            this.$store.dispatch("Check_Login", true);
            this.$store.dispatch("Update_Login_User", _this.User_Data.Account);

            //更新localstorage
            window.localStorage.setItem("login", _this.User_Data.Account);
            window.localStorage.setItem(
              _this.User_Data.Account + "_JWT",
              data.data.jwt
            );
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  computed: {
    com_height() {
      var height_current =
        this.wrapper_height +
        this.data_error_br * 100 +
        this.data_error_br_count * 10;
      return { height: height_current + "px" };
    },
    com_Account_placeholder() {
      //判別當前Account_planceholder狀態
      return {
        color: this.Account_placeholder_color,
        "background-position": "0 " + this.Account_Image_position + "px"
      };
    },
    com_PassWord_placeholder() {
      //判別當前PassWord_planceholder狀態
      return {
        color: this.PassWord_placeholder_color,
        "background-position": "0 " + this.PassWord_Image_position + "px"
      };
    },
    com_Email_placeholder() {
      return {
        color: this.Email_placeholder_color,
        "background-position": "0 " + this.Email_Image_position + "px"
      };
    },
    ...mapGetters(["Token"]),
    ...mapGetters(["IsLoading"])
  }
};
</script>



<style>
@import "../../css/login_signup.css";
</style>