// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import api from './ajax/axios';

import store from './store/index';
import global from './components/common';
import responseStatusCodeEnum from './enum/ResponseStatusCodeEnum'
import mailEnum from './enum/MailEnum'

import FBSDK from './components/assets/application';

//  这样就可以通过$axios发起请求了（个人使用喜好）
Vue.prototype.api = api;
Vue.prototype.global = global;
Vue.prototype.store = store;
Vue.prototype.responseStatusCode = responseStatusCodeEnum;
Vue.prototype.mailEnum = mailEnum;

Vue.config.productionTip = false;

// 載入router前，先抓取localstorage的值，來判斷是否登錄過，並更新Vuex
router.beforeEach((to, from, next) => {
  var user = localStorage.getItem('login');
  var FBuser = localStorage.getItem('FBlogin');
  var Account = '';

  if (user != null) Account = user;
  else if (FBuser != null) Account = FBuser;

  if (user != null) {
    store.dispatch('Login_User', user);
    store.dispatch('Check_Login', true);
    store.dispatch('Update_Token', localStorage.getItem('JWT'));
  } else if (FBuser != null) {
    store.dispatch('Check_Login', true);
    store.dispatch('Login_User', FBuser);
    store.dispatch('Update_Token', localStorage.getItem('JWT'));
    store.dispatch('SetFBauthorized', true);

    var FBprofile = { name: FBuser, id: localStorage.getItem('FBuserID') };
    store.dispatch('SetFBprofile', FBprofile);
  }

  // 返回首頁時，顯示header&footer
  if (to.fullPath === '/') {
    store.dispatch('updateIsShowHeader', true);
    store.dispatch('updateIsShowFooter', true);
    if (Account !== '' && FBuser === null) {
      api.GetImage({ AccountName: Account })
        .then(response => {
          if (response.data.responseStatusCode === responseStatusCodeEnum.getAccountImageSuccess.statusCode) {
            store.dispatch('SetImageURL', response.data.data + `?random= + ${Math.random()}`);
          }
        });
    }
  }

  if (Account !== '') {
    // 載入頁面等同於user有在操作系統，幫他更新JWT
    api.ResponseJwt(global.SetAccountData({ Account: Account }));
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  FBSDK
});
