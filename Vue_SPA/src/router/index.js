import Vue from "vue";
import Router from "vue-router";
import gheader from "../components/gheader";
import login from "../components/login";
import login_signup from "../components/login_signup";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/"
    },

    {
      path: "/login",
      name: "login",
      component(resolve) {
        require.ensure(["../components/login.vue"], () => {
          resolve(require("../components/login.vue"));
        });
      }
    },
    {
      path: "/login_signup",
      name: "login_signup",
      component(resolve) {
        require.ensure(["../components/login_signup.vue"], () => {
          resolve(require("../components/login_signup.vue"));
        });
      }
    },
    {
      path: "/test",
      name:"test",
      component(resolve) {
        require.ensure(["../components/uploadimg.vue"], () => {
          resolve(require("../components/uploadimg.vue"));
        });
      }
    }
  ]
});
