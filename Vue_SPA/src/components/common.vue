<script type="text/javascript">
import store from "../store/index";

//全局設定儲存登入者訊息
function SetVuex_Localstorage_ForLogin(Account, JWT) {
  store.dispatch("Update_Token", JWT);
  store.dispatch("Check_Login", true);
  store.dispatch("Update_Login_User", Account);

  window.localStorage.setItem("login", Account);
  window.localStorage.setItem(Account + "_JWT", JWT);
}
//全局設定刪除登出者訊息
function SetVuex_Localstorage_ForLogout(Account) {
  store.dispatch("Update_Token", "");
  store.dispatch("Check_Login", false);
  store.dispatch("Update_Login_User", "");
  store.dispatch("SetFBprofile", "");
  store.dispatch("SetFBauthorized", false);

  window.localStorage.removeItem("login");
  window.localStorage.removeItem("FBlogin");
  window.localStorage.removeItem(Account + "_JWT");
}

//全局設定FB登入資訊
function SetVuex_ForFBLogin(response, JWT) {
  store.dispatch("Check_Login", true);
  store.dispatch("SetFBauthorized", true);

  store.dispatch("SetFBprofile", response);
  store.dispatch("Update_Token", JWT);

  if (response != "") {
    store.dispatch("Update_Login_User", response.name);
    window.localStorage.setItem("FBlogin", response.name);
    window.localStorage.setItem("FBuserID",response.id);
    window.localStorage.setItem(response.name + "_JWT", JWT);
  } else store.dispatch("Update_Login_User", "");
}

// 暴露出这些属性和方法
export default {
  SetVuex_Localstorage_ForLogin,
  SetVuex_Localstorage_ForLogout,
  SetVuex_ForFBLogin,
};
</script>