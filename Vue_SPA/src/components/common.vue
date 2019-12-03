<script type="text/javascript">
import store from '../store/index';

// 全局設定儲存登入者訊息
function SetVuexLocalstorageForLogin (jwtData) {
  debugger;
  store.dispatch('Update_Token', jwtData.jwt);
  store.dispatch('Check_Login', true);
  store.dispatch('Login_User', jwtData.account);

  window.localStorage.setItem('login', jwtData.account);
  window.localStorage.setItem('Jwt', jwtData.jwt);
}

// 更新使用者的JWT
function UpdateUserJwt (jwt) {
  store.dispatch('Update_Token', jwt);
  window.localStorage.removeItem('Jwt');
  window.localStorage.setItem('Jwt', jwt);
}

// 全局設定FB登入資訊
function SetVuexForFBLogin (response, jwt) {
  store.dispatch('Check_Login', true);
  store.dispatch('SetFBauthorized', true);

  store.dispatch('SetFBprofile', response);
  store.dispatch('Update_Token', jwt);

  if (response !== '') {
    store.dispatch('Login_User', response.name);
    window.localStorage.setItem('IsFBUser', true);
    window.localStorage.setItem('FBlogin', response.name);
    window.localStorage.setItem('FBuserID', response.id);
    window.localStorage.setItem('Jwt', jwt);
  } else store.dispatch('Login_User', '');
}

// 更新FB使用者的JWT
function UpdateFBUserJwt (jwt) {
  store.dispatch('Update_Token', jwt);
  store.dispatch('Check_Login', true);
  window.localStorage.removeItem(window.localStorage.getItem('Jwt'));
  window.localStorage.setItem(window.localStorage.getItem('Jwt', jwt));
}

// 全局設定刪除登出者訊息
function SetVuexLocalstorageForLogout () {
  store.dispatch('Update_Token', '');
  store.dispatch('Check_Login', false);
  store.dispatch('Login_User', '');
  store.dispatch('SetFBprofile', '');
  store.dispatch('SetFBauthorized', false);

  window.localStorage.removeItem('login');
  window.localStorage.removeItem('FBlogin');
  window.localStorage.removeItem('Jwt');
}

// mapping成API viewModel
function SetAccountData (userData) {
  return {
    AccountName: userData.Account !== undefined ? userData.Account : null,
    PassWord: userData.PassWord !== undefined ? userData.PassWord : null,
    Email: userData.Email !== undefined ? userData.Email : null,
    VerificationCode: userData.VerificationCode !== undefined ? userData.VerificationCode : null,
    ResendMailType: userData.ResendMailType !== undefined ? userData.ResendMailType : 0,

    // 抓取localStorage 來判定是否從FB登入
    IsFacebookLogin: window.localStorage.getItem(window.localStorage.getItem('FBlogin') + '_JWT') !== null
  };
}

// API回傳訊息 轉換成string
function GetResponseMessage (responseData) {
  return Array.join(responseData.data.result);
}

/**
   * 傳入列舉值，取得value 所對應的列舉項目
   * @param {int} value 列舉值
   * @param {object} enumObj 列舉物件
   * @return {object} value 所對應的列舉項目
   */
function getEnumByValue (value, enumObj) {
  let result = null;
  const properties = Object.getOwnPropertyNames(enumObj);
  properties.forEach(x => {
    if (enumObj[x].value === value) {
      result = enumObj[x];
    }
  });

  return result;
}

// 暴露出这些属性和方法
export default {
  SetVuexLocalstorageForLogin,
  UpdateUserJwt,
  SetVuexForFBLogin,
  UpdateFBUserJwt,
  SetVuexLocalstorageForLogout,
  SetAccountData,
  GetResponseMessage,
  getEnumByValue
};
</script>
