<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/*var componentmodal ={
  name:'test',
  template: "#modal-template",
  props:['Response_Message'],
  
  mounted() {
    debugger;
    this.Response_Message_s = this.Response_Message;
  },
  watch: {
    Response_Message: {
      deep: true,
      handler(nv, ov) {
        this.Response_Message_s = nv;
      }
    }
  },
  
}*/

export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*min-height: 938px;*/
}
</style>
