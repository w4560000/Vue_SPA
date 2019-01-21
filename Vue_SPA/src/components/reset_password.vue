<template>
  <div class="reset-mask">
    <div class="reset-wrapper">
      <div class="reset-container" ref="reset_container" :style="com_reset_height">
        {{Reset_API_Response_Message}}
        <div
          v-html="reset_error"
          id="reset-password-message"
          :class="{reset_password_error : Isreset_password_error}"
        ></div>

        <form class="reset-form" @submit.prevent="reset_password_submit">
          <ul class="reset-input">
            <li>
              <input
                id="reset-password"
                type="password"
                ref="reset_PassWord"
                v-model="PassWord"
                v-focus
                @click="reset_Focus_PassWord_input"
                @blur="reset_PassWord_placeholder(PassWord)"
                :tabindex="reset_tabindex1"
                v-on:keydown.9="reset_nextfocus('reset_submitbutton')"
                maxlength="16"
              >
              <label
                id="reset_password-input"
                @click="reset_Focus_PassWord_input"
                :style="com_reset_PassWord_placeholder"
                :class="{reset_PassWord_alert : IsresetPassWord_alert}"
                data-notice="請填入新密碼"
              >密碼</label>
            </li>
          </ul>
          <div class="reset-button-wrapper">
            <input
              type="submit"
              class="reset-submit"
              ref="reset_submitbutton"
              value="重設"
              :tabindex="reset_tabindex2"
              v-on:keydown.9="reset_nextfocus('reset_PassWord')"
              :style="com_reset_button_fucus"
              @mouseover="reset_hoverbutton"
              @mouseleave="reset_leavebutton"
            >
          </div>
        </form>
      </div>
    </div>
    <alert
      v-if="Is_ResetPassWord_success"
      :API_Response_Message="ResetPassWord_API_Response_Message"
    ></alert>
  </div>
</template>

<script>
//載入alert子元件
import login_Signin_Signup_Alert from "./login_Signin_Signup_Alert";
export default {
  //載入alert子元件
  components: { alert: login_Signin_Signup_Alert },

  //接收父元件(fotget_password_validationcode)的參數
  props: {
    Reset_API_Response_Message: {
      type: String
    },
    Account: {
      type: String
    }
  },
  data() {
    return {
      //新密碼
      PassWord: "",

      //Input與submit button的 tabindex
      reset_tabindex1: 1,
      reset_tabindex2: 2,

      //若新密碼欄位為空，則提醒!
      IsresetPassWord_alert: false,
      //新密碼是否通過Regex 測試
      Isreset_password_error: false,

      //input與submit button的css屬性預設
      Reset_PassWord_placeholder_color: "transparent",
      Reset_PassWord_Image_position: "-154",
      Reset_submit_transform_position: "0",
      Reset_submit_box_shadow: "none",

      //修改密碼成功後的Response_Message
      ResetPassWord_API_Response_Message: "",

      //是否修改密碼成功，若成功開啟小視窗告知
      Is_ResetPassWord_success: false,

      //依照Regex錯誤代碼來加減視窗的高度
      reset_error: "",
      reset_error_br: 0,
      reset_error_br_count: 0,

      //視窗預設高度
      reset_container_height: 178
    };
  },
  methods: {
    //Focus 新密碼欄位
    reset_Focus_PassWord_input: function() {
      this.$refs.reset_PassWord.focus();
      this.Reset_PassWord_placeholder_color = "transparent";
      this.Reset_PassWord_Image_position = "-154";
      this.reset_tabindex1 = 1;
      this.reset_tabindex2 = 2;
    },
    //若未Focus新密碼欄位，變換Icon顏色與樣式
    reset_PassWord_placeholder: function(key) {
      if (key == "") {
        this.Reset_PassWord_placeholder_color = "#bbb";
        this.Reset_PassWord_Image_position = "-93";
      } else {
        this.Reset_PassWord_placeholder_color = "transparent";
        this.Reset_PassWord_Image_position = "-154";
        this.Reset_submit_box_shadow = "0 0.3em #c41250";
        this.reset_tabindex1 += 2;
      }
    },
    //按下Tab時的動作，變換新密碼欄位的icon樣式與submit button的css hover
    reset_nextfocus: function(ref) {
      if (ref == "reset_PassWord") {
        this.Reset_PassWord_placeholder_color = "transparent";
        this.Reset_PassWord_Image_position = "-154";
        this.Reset_submit_transform_position = "0";
        this.Reset_submit_box_shadow = "none";
        this.reset_tabindex2 += 2;
      } else if (ref == "reset_submitbutton") {
        this.Reset_PassWord_placeholder_color = "#bbb";
        this.Reset_PassWord_Image_position = "-93";
        this.Reset_submit_transform_position = "-5";
        this.Reset_submit_box_shadow = "0 0.3em #c41250";
        this.reset_tabindex1 += 2;
      }
      if (this.reset_tabindex2 == 3) {
        this.reset_tabindex1 = 1;
        this.reset_tabindex2 = 2;
      }
    },
    //因submit button的css值已被data鎖定，故無法再css裡設定，這邊用js event來完成 滑鼠hover & leave的動作
    reset_hoverbutton: function() {
      this.Reset_submit_transform_position = "-5";
      this.Reset_submit_box_shadow = "0 0.3em #c41250";
    },
    reset_leavebutton: function() {
      this.Reset_submit_transform_position = "0";
      this.Reset_submit_box_shadow = "none";
    },

    //送出submit的動作
    reset_password_submit: function() {
      //先重置錯誤訊息，已防止頁面失控
      this.reset_error = "";
      this.reset_error_br = 0;
      this.reset_error_br_count = 0;
      this.Isreset_password_error = false;
      
      //若新密碼欄位為空，則提醒!
      if (this.PassWord == "") this.IsresetPassWord_alert = true;
      else this.IsresetPassWord_alert = false;

      //Regex的判斷字串
      var regex_length_validation = new RegExp(".{6,16}");

      var regex_PassWord_validation = new RegExp(
        "^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d][^\\s]+$"
      );
      if (
        this.PassWord &&
        !regex_PassWord_validation.test(this.PassWord) &&
        regex_length_validation.test(this.PassWord)
      ) {
        this.Isreset_password_error = true;
        if (this.reset_error != "") {
          this.reset_error +=
            "<br/>密碼限英文大小寫或數字，且不含標點符號與空格";
          this.reset_error_br_count += 1;
        } else {
          this.Isreset_password_error = true;
          this.reset_error += "密碼限英文大小寫或數字，且不含標點符號與空格";
          this.reset_error_br += 1;
        }
      }
      if (
        this.PassWord &&
        regex_PassWord_validation.test(this.PassWord) &&
        !regex_length_validation.test(this.PassWord)
      ) {
        if (this.reset_error != "") {
          this.reset_error += "<br/>密碼至少要 6 碼以上，16 碼以下！";
          this.reset_error_br_count += 1;
        } else {
          this.Isreset_password_error = true;
          this.reset_error += "密碼至少要 6 碼以上，16 碼以下！";
          this.reset_error_br += 1;
        }
      }

      if (
          this.PassWord &&
          !regex_PassWord_validation.test(this.PassWord) &&
          !regex_length_validation.test(this.PassWord)
        ) {
          if (this.reset_error != "") {
            this.reset_error +=
              "<br/>密碼限英文大小寫或數字，並不含標點符號與空格，且至少要 6 碼以上，16 碼以下！";
            this.reset_error_br_count += 1;
          } else {
            this.Isreset_password_error = true;
            this.reset_error +=
              "密碼限英文大小寫或數字，並不含標點符號與空格，且至少要 6 碼以上，16 碼以下！";
            this.reset_error_br += 1;
          }
        }

      //若新密碼欄位不為空且通過Regex驗證，則ajax至後端更新密碼
      if (
        this.IsresetPassWord_alert == false &&
        this.Isreset_password_error == false
      ) {
        var _this = this;
        this.axios
          .post("/Account/ResetPassWord", {
            Account: _this.Account,
            PassWord: _this.PassWord
          })
          .then(data => {

            //因要開啟子元件，父元件的tabindex先歸零，防止干擾
            _this.reset_tabindex1 = 0;
            _this.reset_tabindex2 = 0;

            //開啟子元件&訊息
            _this.Is_ResetPassWord_success = true;
            _this.ResetPassWord_API_Response_Message = data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  //獲取視窗高度
  mounted() {
    this.reset_container_height = parseInt(
      this.$refs.reset_container.style.height.replace(/px/, "")
    );
  },
  computed: {
    com_reset_PassWord_placeholder() {
      //當前PassWord_planceholder狀態
      return {
        color: this.Reset_PassWord_placeholder_color,
        "background-position": "0 " + this.Reset_PassWord_Image_position + "px"
      };
    },
    //當前submit button hover的css
    com_reset_button_fucus() {
      return {
        transform: "translateY(" + this.Reset_submit_transform_position + "px)",
        "transition-duration": 0.15 + "s",
        "box-shadow": this.Reset_submit_box_shadow
      };
    },
    //當前視窗的高度，依照Regex錯誤message來增減高度
    com_reset_height() {
      var height_current =
        this.reset_container_height +
        this.reset_error_br * 100 +
        this.reset_error_br_count * 10;
      return { height: height_current + "px" };
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
@import "../../css/reset_password.css";
</style>