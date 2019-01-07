import Vue from "vue";
import vuex from "vuex";

import actions from "./actions";
import state from "./state";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(vuex);

export default new vuex.Store({
  actions,
  state,
  mutations,
  getters,
  strict :true
});
