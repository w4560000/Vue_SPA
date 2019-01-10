// 配置API接口地址与服务器静态文件地址
var root = 'https://localhost:44319/api';
// 引用axios
var axios = require('axios')

var instance = axios.create({
  baseURL: root,
  timeout: 10000,
  withCredentials: true,
  
});
instance.defaults.headers.post['Content-Type'] = 'application/json'
//全局封装错误处理函数
instance.interceptors.request.use(
  config => {
    /*config.headers = {
      //'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
      //'Pragma' : 'no-cache',
      //'Expires': '0',
      //'Access-Control-Allow-Origin':'*'
    };*/
    // 在post请求发送出去之前，对其进行编码
    /*if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }*/
    return config;
  },
  err => {
    return Promise.reject(err);
  });
// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log("请求错误", error.response.status);
      switch (error.response.status) {
        case 401:
          // store.dispatch('logout');
          console.log("401");
          break;
        case 404:
          console.log('接口不存在');
          break;
        case 500:
          console.log('服务器错误');
      }
    }
    return Promise.reject(error);// 返回接口返回的错误信息
  });
  export default instance  
  
function getdata(method, url, params, success, failure) {
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: true, //跨域请求凭证验证。
    timeout: 3000
  })
    .then(function (res) {
      success(res.data);
    })
    .catch(function (err) {
      let res = err.response
      if (err) {
        console.log('api error, HTTP CODE: ' + res.status)
        failure(err.response.statusText)
        return
      }
    })
}
// 返回在vue模板中的调用接口
/*export default {
  get: function (url, params, success, failure) {
    return getdata('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return getdata('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return getdata('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return getdata('DELETE', url, params, success, failure)
  },
  root: root
 
}*/
