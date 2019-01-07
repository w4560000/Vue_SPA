// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import axios from "./ajax/axios";

import store from "./store/index";

//  这样就可以通过$axios发起请求了（个人使用喜好）
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

/*Vue.component("modal", {
  props: ["Response_Message"],
  template: "#modal-template",
  data(){
    return{
      Response_Message_s:''
    }
  }
  
});*/

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
});
