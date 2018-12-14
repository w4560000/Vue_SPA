<template>
  <div class="login-body">
    <div class="login-wrapper">
      <div class="login-inner-wrapper">
        <div class="login-upper">
          <div class="logo"></div>
          <div class="social-btn">
            <div class="inner-btn-wrapper">
              <div class="social-login-btn">
                <a class="m-button-fb"></a>
                <a class="m-button-weibo"></a>
              </div>
              <div class="social-login-btn">
                <a class="m-button-twitter"></a>
                <a class="m-button-weixin"></a>
              </div>
            </div>
          </div>
          <div class="prev-next">
            <i data-click="btn-prev"></i>
            <i data-click="btn-next"></i>
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
</template>

<script>
export default {
  name: 'login',
  data () {
    return {}
  }
}
</script>
