import global from '../components/common';
import store from '../store/index';
import constant from '../components/constant/index'

// 引用axios
var axios = require('axios');
var root = constant.apiUrl;

var instance = axios.create({
  baseURL: root,
  timeout: 10000,
  withCredentials: true
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = 'origin-list';

// 全局封装错误处理函数
instance.interceptors.request.use(
  request => {
    if (window.localStorage.getItem('Jwt') !== null) {
      request.headers.post.Authorization = 'bearer ' + window.localStorage.getItem('Jwt');
    }

    // 在背景重置Jwt時 不跑Loading，其餘request則正常顯示Loading畫面s
    if (!(request.url.includes('ResponseJwt') || request.url.includes('CheckUserLoginTimeout'))) {
      store.dispatch('SetLoading', true);
    }

    return request
  },
  err => {
    return Promise.reject(err)
  }
);

// http response 拦截器
instance.interceptors.response.use(
  response => {
    // 若API回傳JWT 則馬上儲存
    if (response.data.jwtData.jwt !== null) {
      global.UpdateUserJwt(response.data.jwtData.jwt);
    }
    store.dispatch('SetLoading', false);

    return response;
  },
  error => {
    if (error.response) {
      console.log('请求错误', error.response.status);
      switch (error.response.status) {
        case 401:
          // store.dispatch('logout');
          console.log('401');
          break;
        case 404:
          console.log('接口不存在');
          break;
        case 500:
          console.log('服务器错误');
      }
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  }
);

const api = {
  instance,
  SignupAccount: (accountData) => instance.post('/Account/SignupAccount', accountData),
  Signin: (accountData) => instance.post('/Account/Signin', accountData),
  ResponseJwt: (accountData) => instance.post('/Account/ResponseJwt', accountData),
  CheckVerificationCodeForSignUp: (accountData) => instance.post('/Account/CheckVerificationCodeForSignUp', accountData),
  Logout: (accountData) => instance.post('/Account/Logout', accountData),
  ReSendEmailForReSetPassWord: (accountData) => instance.post('/Account/ReSendEmailForReSetPassWord', accountData),
  CheckVerificationCodeForReSetPassWord: (accountData) => instance.post('/Account/CheckVerificationCodeForReSetPassWord', accountData),
  ResetPassWord: (accountData) => instance.post('/Account/ResetPassWord', accountData),
  UpLoadImage: (uploadData) => instance.post('/Account/UpLoadImage', uploadData),
  GetImage: (accountData) => instance.post('/Account/GetImage', accountData),
  CheckUserLoginTimeout: (accountData) => instance.post('/Account/CheckUserLoginTimeout', accountData)
};

export default api;
