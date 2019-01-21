// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import axios from "./ajax/axios";

import store from "./store/index";
import global from "./components/common";

axios.interceptors.request.use(function(config) {
  //若在重設密碼頁面，不載入Loading，因在父元件有設定Loading，故子元件(ResetPassWord)ajax時也會載入，在此排除掉
  //目前只有在傳送驗證信時，載入Loading，因寄信response時間較久
  if (config.url.indexOf("ResetPassWord") >= 0) {
    store.dispatch("SetLoading", false);
  } else {
    store.dispatch("SetLoading", true);
  }

  return config;
});

axios.interceptors.response.use(response => {
  if (response.status == "200") store.dispatch("SetLoading", false);

  return response;
});

//  这样就可以通过$axios发起请求了（个人使用喜好）
Vue.prototype.axios = axios;
Vue.prototype.global = global;

Vue.config.productionTip = false;

//載入router前，先抓取localstorage的值，來判斷是否登錄過，並更新Vuex
router.beforeEach((to, from, next) => {
  var user = localStorage.getItem("login");
  if (user != null) {
    store.dispatch("Update_Login_User", user);
    store.dispatch("Check_Login", true);
    store.dispatch("Update_Token", localStorage.getItem(user + "_JWT"));
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
});
