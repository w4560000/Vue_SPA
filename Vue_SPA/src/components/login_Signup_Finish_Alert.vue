<template>
  <div class="alert-mask">
    <div class="alert-wrapper">
      <div class="alert-container">
        {{Response_Message_f}}
        <div class="success">
          <router-link to="/login_signup">
            <span data-click="signup">立即返回首頁！</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    Response_Message_f: {
      type: String
    }
  }
};
</script>
<style>
@import "../../css/login_signup_finish_alert.css";
</style>;
