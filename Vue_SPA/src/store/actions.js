export default {
  //更新JWT
  Update_Token({ commit }, payload) {
    commit("Update_Token", payload);
  },
  //確認是否登入
  Check_Login({ commit }, payload) {
    commit("Check_Login", payload);
  },
  //更新登入者ID
  Update_Login_User({ commit }, payload) {
    commit("Update_Login_User", payload);
  },
  //判斷Loading是否該出現
  SetLoading({ commit }, payload) {
    commit("SetLoading", payload);
  },
  //更新用FB登入的USER資訊
  SetFBprofile({ commit }, payload) {
    commit("SetFBprofile", payload);
  },
  //確認是否成功用FB登入
  SetFBauthorized({ commit }, payload) {
    commit("SetFBauthorized", payload);
  },
  //確認HEADER是否顯示
  updateIsShowHeader({ commit }, payload) {
    commit("updateIsShowHeader", payload);
  },
  //確認FOOTER是否顯示
  updateIsShowFooter({ commit }, payload) {
    commit("updateIsShowFooter", payload);
  },
  //取得大頭貼
  SetImageURL({commit} ,payload){
    commit("SetImageURL",payload);
  }
};
