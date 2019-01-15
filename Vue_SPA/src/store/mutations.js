export default {
  Update_Token(state, payload) {
    state.Token = payload;
  },
  Check_Login(state, payload) {
    state.IsLogin = payload;
  },
  Update_Login_User(state, payload) {
    state.Login_User = payload;
  }
};
