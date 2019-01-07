export default {
  update_token({ commit }, payload) {
    commit("update_token", payload.access_token);
  }
};
