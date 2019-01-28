<template>
  <div id="app">
    <v-header v-if="IsShowHeader"></v-header>
    <router-view></router-view>
    <v-footer v-if="IsShowFooter"></v-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gheader from './components/gheader'
import gfooter from './components/gfooter'
export default {
  name: "App",
  data(){
    return{}
  },
  mounted() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: "303337550271827",
        cookie: true,
        xfbml: true,
        version: "v2.9"
      });
      FB.AppEvents.logPageView();

      console.log("fbAsyncInit");

      FB.getLoginStatus(response => {
        console.log("res", response); // 這裡可以得到 fb 回傳的結果
      });
    };
  },
  components: {
    'v-header' :gheader,
    'v-footer' :gfooter,
  },
  computed:{
    ...mapGetters(["IsShowHeader"]),
    ...mapGetters(["IsShowFooter"]),
  }

};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*min-height: 938px;*/
}
</style>
