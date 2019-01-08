<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-message">{{Response_Message_s}}</div>
        <div class="validation-message" v-if="showvalidation_message">驗證信已寄至您的信箱，請查收！
          <br>並輸入驗證碼！
        </div>
        <div class="validation-code" v-if="showvalidation_message">
          <input
            type="text"
            id="first_validation_code"
            ref="firstvc"
            v-focus="showvalidation_message"
            :style="com_focus_first"
            v-on:keydown.9="nextfocus('svc')"
            :tabindex="tabindex1"
          >
          -
          <input
            type="text"
            id="second_validation_code"
            ref="svc"
            v-on:keydown.9="nextfocus('tvc')"
            :style="com_focus_second"
            :tabindex="tabindex2"
          >
          -
          <input
            type="text"
            id="third_validation_code"
            ref="tvc"
            v-on:keydown.9="nextfocus('fvc')"
            :style="com_focus_third"
            :tabindex="tabindex3"
          >
          -
          <input
            type="text"
            id="fourth_validation_code"
            ref="fvc"
            :style="com_focus_fourth"
            v-on:keydown.9="nextfocus('click')"
            :tabindex="tabindex4"
          >
        </div>
        <button
          class="modal-default-button"
          ref="click"
          @click="emitparent()"
          v-on:keydown.9="nextfocus('firstvc')"
          :tabindex="tabindex5"
        >OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["Response_Message_s", "showvalidation_message"],
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
      tabindex5: 5
    };
  },
  methods: {
    emitparent: function() {
      this.$emit("hiddenMessage", false);
    },
    nextfocus: function(ref) {
      if (ref == "svc") {
        this.focus_first_color = "rgb(56, 180, 76)";
        this.focus_second_color = "#f5548c";
        this.tabindex1 += 5;
      } else if (ref == "tvc") {
        this.focus_second_color = "rgb(56, 180, 76)";
        this.focus_third_color = "#f5548c";
        this.tabindex2 += 5;
      } else if (ref == "fvc") {
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
        this.tabindex5 += 5;
        if (this.tabindex5 == 10) {
          this.tabindex1 = 1;
          this.tabindex2 = 2;
          this.tabindex3 = 3;
          this.tabindex4 = 4;
          this.tabindex5 = 5;
        }
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