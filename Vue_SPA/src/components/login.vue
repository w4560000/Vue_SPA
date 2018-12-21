<template>
  <div class="login-body">
    <div class="login-outer">
     <div class="login-wrapper">
      <div class="login-inner-wrapper">
        <div class="login-upper">
          <div class="logo"></div>
          <div class="social-btn">
            <div class="inner-btn-wrapper">
              <div class="social-login-btn">
                <a class="m-button-fb">&nbsp;&nbsp;&nbsp;用Facebook登入</a>
                <a class="m-button-weibo">&nbsp;&nbsp;&nbsp;无法用Weibo登录</a>
               </div>
              <div class="social-login-btn">
                <a class="m-button-twitter">&nbsp;&nbsp;&nbsp;無法用Twitter登入</a>
                <a class="m-button-weixin">&nbsp;&nbsp;&nbsp;無法用Weixin微信登入</a>
               </div>
             </div>
           </div>
          <div class="prev-next">
            <i data-click="btn-back" :class="{'back':!prev}"  @click="prev=!prev;"></i>
            <i data-click="btn-next" :class="{'next':prev}"  @click="prev=!prev;"></i>
           </div>
          <p class="promo">加入會員 72 小時內首次購物享 95 折優惠！</p>
         </div>
        <div class="form-wrapper">
          <form id="login-form">
            <div class="login-message"></div>
            <p class="login-pinkoi-account">或使用 Pinkoi 帳號登入</p>
            <ul>
              <li>
                <input id="login-id" autocomplete="off" type="text">
                <label for="login-id" data-notice="請填入帳號" data-error="請檢察帳號">帳號</label>
              </li>
              <li>
                <input id="login-password" autocomplete="off" type="text">
                <label for="login-passworf" data-notice="請填入密碼"></label>
              </li>
            </ul>
            <div class="button-wrapper">
              <input type="hidden" name="csrf">
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
              <span data-click="signup">立刻註冊新帳號</span>
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
  name: 'login',
  data () {
    return {
      prev: true
    }
  }
}
</script>

<style>
@import "../../css/login.css";
</style>
