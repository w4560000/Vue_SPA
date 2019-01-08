<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-message">{{Response_Message_s}}</div>
        <div class="validation-message" v-if="showvalidation_message">驗證信已寄至您的信箱
          <br>
          {{User_Data.Email}}，請查收！
          <br>並輸入驗證碼！
        </div>
        <div class="validation-code" v-if="showvalidation_message">
          <div class="type_error" :style="com_show_error">{{error_message}}<br/>{{Response_error_message}}</div>
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
        >驗證</button>
      </div>
    </div>
    <alert v-if="Is_Signup_success" :Response_Message_f="Response_Message_f"></alert>
  </div>
</template>

<script>
import login_Signup_Finish_Alert from './login_Signup_Finish_Alert'
export default {
  components:{'alert' : login_Signup_Finish_Alert},
  props: {
    Response_Message_s: {
      type: String
    },
    showvalidation_message: { type: Boolean },
    User_Data: { type: Object }
  },
  data() {
    return {
      focus_first_color: "#f5548c",
      focus_second_color: "rgb(56, 180, 76)",
      focus_third_color: "rgb(56, 180, 76)",
      focus_fourth_color: "rgb(56, 180, 76)",
      tabindex1: 1,
      tabindex2: 2,
      tabindex3: 3,
      tabindex4: 4,
      tabindex5: 5,
      error_message: "",
      Response_error_message:"",
      Is_show_error: "hidden",
      Response_Message_f: "",
      Is_Signup_success: false,
      VerificationCode:""
    };
  },
  methods: {
    validation: function() {
      debugger;
      this.VerificationCode=this.$refs.firstvc.value +this.$refs.svc.value+this.$refs.tvc.value+this.$refs.fvc.value;
      if (this.error_message == "") {
        var _this = this;
        this.axios
          .post("https://localhost:44319/api/Account/SignupFinish", {
            Account: _this.User_Data.Account,
            VerificationCode: _this.VerificationCode
          })
          .then(data => {
            debugger;
            //this.$store.dispatch('update_token',data.data);
            _this.Response_Message_f = data.data;
            if (_this.Response_Message_f == "驗證成功！")
              _this.Is_Signup_success = true;
            else {
              _this.Is_show_error = "visible";
              _this.error_message = data.data.slice(0,5);
              _this.Response_error_message=data.data.slice(5);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      //this.$emit("hiddenMessage", false);
    },
    nextfocus: function(ref) {
      if (ref == "svc") {
        this.focus_first_color = "rgb(56, 180, 76)";
        this.focus_second_color = "#f5548c";
        this.focus_third_color = "rgb(56, 180, 76)";
        this.focus_fourth_color = "rgb(56, 180, 76)";
        this.tabindex1 += 5;
      } else if (ref == "tvc") {
        this.focus_first_color = "rgb(56, 180, 76)";
        this.focus_second_color = "rgb(56, 180, 76)";
        this.focus_third_color = "#f5548c";
        this.focus_fourth_color = "rgb(56, 180, 76)";
        this.tabindex2 += 5;
      } else if (ref == "fvc") {
        this.focus_first_color = "rgb(56, 180, 76)";
        this.focus_second_color = "rgb(56, 180, 76)";
        this.focus_third_color = "rgb(56, 180, 76)";
        this.focus_fourth_color = "#f5548c";
        this.tabindex3 += 5;
      } else if (ref == "click") {
        this.focus_first_color = "rgb(56, 180, 76)";
        this.focus_second_color = "rgb(56, 180, 76)";
        this.focus_third_color = "rgb(56, 180, 76)";
        this.focus_fourth_color = "rgb(56, 180, 76)";
        this.tabindex4 += 5;
      } else {
        this.focus_first_color = "#f5548c";
        this.focus_second_color = "rgb(56, 180, 76)";
        this.focus_third_color = "rgb(56, 180, 76)";
        this.focus_fourth_color = "rgb(56, 180, 76)";
        this.tabindex5 += 5;
        if (this.tabindex5 == 10) {
          this.tabindex1 = 1;
          this.tabindex2 = 2;
          this.tabindex3 = 3;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
        }
      }
    },
    inittabindex1: function() {
      this.tabindex1 = 1;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = "#f5548c";
      this.focus_second_color = "rgb(56, 180, 76)";
      this.focus_third_color = "rgb(56, 180, 76)";
      this.focus_fourth_color = "rgb(56, 180, 76)";
    },
    inittabindex2: function() {
      this.tabindex1 = 6;
      this.tabindex2 = 2;
      this.tabindex3 = 3;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = "rgb(56, 180, 76)";
      this.focus_second_color = "#f5548c";
      this.focus_third_color = "rgb(56, 180, 76)";
      this.focus_fourth_color = "rgb(56, 180, 76)";
    },
    inittabindex3: function() {
      this.tabindex1 = 6;
      this.tabindex2 = 7;
      this.tabindex3 = 3;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = "rgb(56, 180, 76)";
      this.focus_second_color = "rgb(56, 180, 76)";
      this.focus_third_color = "#f5548c";
      this.focus_fourth_color = "rgb(56, 180, 76)";
    },
    inittabindex4: function() {
      this.tabindex1 = 6;
      this.tabindex2 = 7;
      this.tabindex3 = 8;
      this.tabindex4 = 4;
      this.tabindex5 = 5;
      this.focus_first_color = "rgb(56, 180, 76)";
      this.focus_second_color = "rgb(56, 180, 76)";
      this.focus_third_color = "rgb(56, 180, 76)";
      this.focus_fourth_color = "#f5548c";
    },
    keycode: function(event) {
      if (event.key == "Tab") return true;
      var regex_Account_validation = new RegExp("^[0-9]+$");
      if (regex_Account_validation.test(event.key)) {
        if (document.activeElement.id == "first_validation_code") {
          this.tabindex1 = 6;
          this.tabindex2 = 2;
          this.tabindex3 = 3;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
          this.focus_first_color = "rgb(56, 180, 76)";
          this.focus_second_color = "#f5548c";
          this.focus_third_color = "rgb(56, 180, 76)";
          this.focus_fourth_color = "rgb(56, 180, 76)";
          this.$refs.svc.value = "";
          this.Is_show_error = "hidden";
          this.error_message="";
          this.$refs.svc.focus();
        } else if (document.activeElement.id == "second_validation_code") {
          this.tabindex1 = 6;
          this.tabindex2 = 7;
          this.tabindex3 = 3;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
          this.focus_first_color = "rgb(56, 180, 76)";
          this.focus_second_color = "rgb(56, 180, 76)";
          this.focus_third_color = "#f5548c";
          this.focus_fourth_color = "rgb(56, 180, 76)";
          this.$refs.tvc.value = "";
          this.Is_show_error = "hidden";
          this.error_message="";
          this.$refs.tvc.focus();
        } else if (document.activeElement.id == "third_validation_code") {
          this.tabindex1 = 6;
          this.tabindex2 = 7;
          this.tabindex3 = 8;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
          this.focus_first_color = "rgb(56, 180, 76)";
          this.focus_second_color = "rgb(56, 180, 76)";
          this.focus_third_color = "rgb(56, 180, 76)";
          this.focus_fourth_color = "#f5548c";
          this.$refs.fvc.value = "";
          this.Is_show_error = "hidden";
          this.error_message="";
          this.$refs.fvc.focus();
        } else if (document.activeElement.id == "fourth_validation_code") {
          this.tabindex1 = 6;
          this.tabindex2 = 7;
          this.tabindex3 = 8;
          this.tabindex4 = 9;
          this.tabindex5 = 5;
          this.focus_first_color = "rgb(56, 180, 76)";
          this.focus_second_color = "rgb(56, 180, 76)";
          this.focus_third_color = "rgb(56, 180, 76)";
          this.focus_fourth_color = "rgb(56, 180, 76)";
          this.Is_show_error = "hidden";
          this.error_message="";
          this.$refs.click.focus();
        }
      } else {
        this.Is_show_error = "visible";
        this.error_message = "驗證碼只能輸入數字！";
        if (document.activeElement.id == "first_validation_code") {
          this.$refs.firstvc.value = "";
          this.$refs.firstvc.focus();
          this.focus_first_color = "#FF0000";
        } else if (document.activeElement.id == "second_validation_code") {
          this.$refs.svc.value = "";
          this.$refs.svc.focus();
          this.focus_second_color = "#FF0000";
        } else if (document.activeElement.id == "third_validation_code") {
          this.$refs.tvc.value = "";
          this.$refs.tvc.focus();
          this.focus_third_color = "#FF0000";
        } else if (document.activeElement.id == "fourth_validation_code") {
          this.$refs.fvc.value = "";
          this.$refs.fvc.focus();
          this.focus_fourth_color = "#FF0000";
        }
      }
    },
    keybutton: function(event) {
      if (event.key != "Enter" && event.key != "Tab") {
        this.tabindex1 = 1;
        this.tabindex2 = 2;
        this.tabindex3 = 3;
        this.tabindex4 = 4;
        this.tabindex5 = 5;
        this.focus_first_color = "#f5548c";
        this.focus_second_color = "rgb(56, 180, 76)";
        this.focus_third_color = "rgb(56, 180, 76)";
        this.focus_fourth_color = "rgb(56, 180, 76)";
        this.$refs.firstvc.value = "";
        this.$refs.firstvc.focus();
      }
    }
  },
  computed: {
    com_focus_first() {
      return { border: "2px " + this.focus_first_color + " solid" };
    },
    com_focus_second() {
      return { border: "2px " + this.focus_second_color + " solid" };
    },
    com_focus_third() {
      return { border: "2px " + this.focus_third_color + " solid" };
    },
    com_focus_fourth() {
      return { border: "2px " + this.focus_fourth_color + " solid" };
    },
    com_show_error() {
      return { visibility: this.Is_show_error };
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
@import "../../css/login_signup_message.css";
</style>