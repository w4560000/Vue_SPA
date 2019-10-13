<script type="text/javascript">
import store from '../store/index';

// 全局設定儲存登入者訊息
function SetVuexLocalstorageForLogin (jwtData) {
  store.dispatch('Update_Token', jwtData.jwt);
  store.dispatch('Check_Login', true);
  store.dispatch('Update_Login_User', jwtData.account);

  window.localStorage.setItem('login', jwtData.account);
  window.localStorage.setItem(jwtData.account + '_JWT', jwtData.jwt);
}

// 更新使用者的JWT
function UpdateUserJwt (JWT) {
  store.dispatch('Update_Token', JWT);
  window.localStorage.removeItem(window.localStorage.getItem('login') + '_JWT');
  window.localStorage.setItem(window.localStorage.getItem('login') + '_JWT', JWT);
}

// 全局設定FB登入資訊
function SetVuexForFBLogin (response, JWT) {
  store.dispatch('Check_Login', true);
  store.dispatch('SetFBauthorized', true);

  store.dispatch('SetFBprofile', response);
  store.dispatch('Update_Token', JWT);

  if (response !== '') {
    store.dispatch('Update_Login_User', response.name);
    window.localStorage.setItem('IsFBUser', true);
    window.localStorage.setItem('FBlogin', response.name);
    window.localStorage.setItem('FBuserID', response.id);
    window.localStorage.setItem(response.name + '_JWT', JWT);
  } else store.dispatch('Update_Login_User', '');
}

// 更新FB使用者的JWT
function UpdateFBUserJwt (JWT) {
  store.dispatch('Update_Token', JWT);
  window.localStorage.removeItem(window.localStorage.getItem('FBlogin') + '_JWT');
  window.localStorage.setItem(window.localStorage.getItem('FBlogin') + '_JWT', JWT);
}

// 全局設定刪除登出者訊息
function SetVuexLocalstorageForLogout (Account) {
  store.dispatch('Update_Token', '');
  store.dispatch('Check_Login', false);
  store.dispatch('Update_Login_User', '');
  store.dispatch('SetFBprofile', '');
  store.dispatch('SetFBauthorized', false);

  window.localStorage.removeItem('login');
  window.localStorage.removeItem('FBlogin');
  window.localStorage.removeItem(Account + '_JWT');
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
    IsFacebookLogin: window.localStorage.getItem(window.localStorage.getItem('FBlogin') + '_JWT')
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
