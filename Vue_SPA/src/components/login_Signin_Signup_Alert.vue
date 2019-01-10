<template>
  <div class="alert-mask">
    <div class="alert-wrapper">
      <div class="alert-container">
        {{API_Response_Message}}
        <div class="success">
          <router-link to="/">
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
    API_Response_Message: {
      type: String
    }
  },
  data() {
    return {
    };
  }
};
</script>
<style>
@import "../../css/login_signup_finish_alert.css";
</style>;
