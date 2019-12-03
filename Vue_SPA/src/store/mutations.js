export default {
  Update_Token (state, payload) {
    state.Token = payload;
  },
  Check_Login (state, payload) {
    state.IsLogin = payload;
  },
  Login_User (state, payload) {
    state.Login_User = payload;
  },
  SetLoading (state, payload) {
    state.IsLoading = payload;
  },
  SetFBprofile (state, payload) {
    state.FBprofile = payload;
  },
  SetFBauthorized (state, payload) {
    state.FBauthorized = payload;
  },
  updateIsShowHeader (state, payload) {
    state.IsShowHeader = payload;
  },
  updateIsShowFooter (state, payload) {
    state.IsShowFooter = payload;
  },
  SetImageURL (state, payload) {
    state.ImageURL = payload;
  }
};
