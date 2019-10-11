// 引用axios
var axios = require('axios');

// 配置API接口地址与服务器静态文件地址
// var root = 'https://bxwebside.azurewebsites.net';
var root = 'https://localhost:44319';

var instance = axios.create({
  baseURL: root,
  timeout: 10000,
  withCredentials: true
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = 'origin-list';

// 全局封装错误处理函数
instance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
instance.interceptors.response.use(
  response => {
    // 若API回傳JWT 則馬上儲存
    var user = localStorage.getItem('login');
    var FBuser = localStorage.getItem('FBlogin');

    if (response.data.jwt !== null || response.data.jwt !== undefined) {
      if (user != null) {
        window.localStorage.setItem(user + '_JWT', response.data.jwt);
      } else if (FBuser !== null) {
        window.localStorage.setItem(FBuser + '_JWT', response.data.jwt);
      }
    }

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
    return Promise.reject(error); // 返回接口返回的错误信息
  }
);

const api = {
  instance,
  SignupAccount: (accountData) => instance.post('/Account/SignupAccount', accountData),
  Signin: (accountData) => instance.post('/Account/Signin', accountData),
  ResponseJwt: (accountData) => instance.post('/Account/ResponseJwt', accountData),
  CheckVerificationCodeForSignUp: (accountData) => instance.post('/Account/CheckVerificationCodeForSignUp', accountData),
  ResponseJWT: (accountData) => instance.post('/Account/ResponseJWT', accountData),
  Logout: (accountData) => instance.post('/Account/Logout', accountData),
  ReSendEmailForReSetPassWord: (accountData) => instance.post('/Account/ReSendEmailForReSetPassWord', accountData),
  CheckVerificationCodeForReSetPassWord: (accountData) => instance.post('/Account/CheckVerificationCodeForReSetPassWord', accountData),
  ResetPassWord: (accountData) => instance.post('/Account/ResetPassWord', accountData),
  GetImage: (accountData) => instance.post('/Account/GetImage', accountData, {
    headers: {
      Authorization: 'bearer ' + localStorage.getItem(accountData.account + '_JWT')
    }
  })
};

export default api;
