<template>
  <div class="login-body">
    <div class="login-outer">
      <div class="login-wrapper-login">
        <div class="login-inner-wrapper" >
          <div class="login-upper" >
            <div class="logo"></div>
            <div class="social-btn">
              <div class="inner-btn-wrapper">
                <div class="social-login-btn" :class="{'animation-toright':prev}" v-if="prev">
                  <a class="m-button-fb">用Facebook登入</a>
                  <a class="m-button-weibo">
                    <i class="useless"></i>无法用Weibo登录
                  </a>
                </div>
                <div class="social-login-btn" :class="{'animation-toleft':!prev}" v-if="!prev">
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
              <i data-click="btn-back" :class="{'back':prev}" @click="prev=!prev;"></i>
              <i data-click="btn-next" :class="{'next':!prev}" @click="prev=!prev;"></i>
            </div>
            <p class="promo">加入會員 72 小時內首次購物享 95 折優惠！</p>
          </div>
          <div class="form-wrapper">
            <form id="login-form">
              <div class="login-message"></div>
              <p class="login-pinkoi-account">或使用 Pinkoi 帳號登入</p>
              <ul>
                <li>
                  <input
                    id="login-id"
                    ref="Account"
                    v-model="User_Data.Account"
                    @click="Focus_Account_input"
                    @blur="Account_placeholder(User_Data.Account)"
                  >
                  <label
                    id="id-input"
                    @click="Focus_Account_input"
                    :style="com_Account_placeholder"
                  >帳號</label>
                </li>
                <li>
                  <input
                    id="login-password"
                    ref="PassWord"
                    v-model="User_Data.PassWord"
                    @click="Focus_PassWord_input"
                    @blur="PassWord_placeholder(User_Data.PassWord)"
                  >
                  <label
                    id="password-input"
                    @click="Focus_PassWord_input"
                    :style="com_PassWord_placeholder"
                  >密碼</label>
                </li>
              </ul>
              <div class="button-wrapper">
                <input type="submit" class="login-submit" value="登入">
              </div>
            </form>
            <div class="login-help">
              <div class="login-problem">
                <span data-click="forgetpassword">忘記密碼</span>
                <span data-click="resend">重寄認證信</span>
              </div>
              <div class="lower-block">
                還不是會員嗎?
                <router-link  to="/login_signup">
                <span data-click="signup">立刻註冊新帳號</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      prev: true, //控制登入btn的按鈕，true = (該頁面為fb_wb_bt)，false = (該頁面為tw_wx_bt)

      //預設帳號密碼文字和位置
      Account_placeholder_color: "#bbb",
      Account_Image_position: "16",
      PassWord_placeholder_color: "#bbb",
      PassWord_Image_position: "-93",

      //使用者資料
      User_Data: {
        Account: "",
        PassWord: ""
      }
    };
  },
  methods: {
    Focus_Account_input: function() {
      //Focus Account input 隱藏placeholder("帳號")&帳號icon變換
      this.$refs.Account.focus();
      this.Account_placeholder_color = "transparent";
      this.Account_Image_position = "-38";
    },
    Focus_PassWord_input: function() {
      //Focus PassWord input 隱藏placeholder("密碼")&密碼icon變換
      this.$refs.PassWord.focus();
      this.PassWord_placeholder_color = "transparent";
      this.PassWord_Image_position = "-154";
    },
    Account_placeholder: function(key) {
      //blur Account input 若未輸入帳號，則placeholder("帳號")顯示
      if (key == "") {
        this.Account_placeholder_color = "#bbb";
        this.Account_Image_position = "16";
      }
    },
    PassWord_placeholder: function(key) {
      //blur PassWord input 若為輸入密碼，則planceholder("密碼")顯示
      if (key == "") {
        this.PassWord_placeholder_color = "#bbb";
        this.PassWord_Image_position = "-93";
      }
    }
  },
  computed: {
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
    }
  }
};
</script>

<style>
@import "../../css/login.css";
</style>
