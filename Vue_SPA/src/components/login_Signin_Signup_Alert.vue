<template>
  <div class="alert-mask">
    <div class="alert-wrapper">
      <div class="alert-container">
        {{API_Response_Message}}
        <div class="success">
          <router-link to="/" v-focus=true>
            <span data-click="signup" @click="checkpath" >立即返回首頁！</span>
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
    return {};
  },
  methods: {
    //若是首頁跳出該ALERT，點擊後則關閉，因首頁無法跳回首頁
    checkpath: function() {
      if (this.$route.path == "/") {
        this.$emit("hiddenAlert", false);
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        // 聚焦元素
        el.focus();
      }
    }
  }
};
</script>
<style>
@import "../../css/login_signup_finish_alert.css";
</style>;
