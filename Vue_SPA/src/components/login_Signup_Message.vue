<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-message">{{Response_Message_s}}</div>
        <div class="validation-message" v-if="showvalidation_message">驗證信已寄至您的信箱，請查收！
          <br>並輸入驗證碼！
        </div>
        <div class="validation-code" v-if="showvalidation_message">
          <input type="text" id="first-validation-code" ref="fvc" v-focus="showvalidation_message">
          -
          <input type="text" id="second-validation-code" ref="svc">
          -
          <input type="text" id="third-validation-code" ref="tvc">
          -
          <input type="text" id="fourth-validation-code" ref="fvc">
        </div>
        <button class="modal-default-button" @click="emitparent()">OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["Response_Message_s", "showvalidation_message"],
  methods: {
    emitparent: function() {
      this.$emit("hiddenMessage", false);
    }
  },
  directives: {
    focus: {
     inserted: function (el) {
        // 聚焦元素
        el.focus()
        }
      
    }
  },
};
</script>


<style>
@import "../../css/login_signup_message.css";
</style>