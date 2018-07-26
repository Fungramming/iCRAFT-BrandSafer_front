<template>
  <div id="app">
    <aside-tab v-if="this.isAuthenticated" style="width:230px;"></aside-tab>
    <router-view/>
  </div>
</template>
<script>
import AsideTab from "./components/Aside.vue";
import { mapGetters } from "vuex";

export default {
  components: { AsideTab },
  computed: mapGetters(["isAuthenticated"])
};
</script>

<style lang="scss">
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

* {
  font-family: "Spoqa Han Sans", "Spoqa Han Sans JP", "Sans-serif";
  box-sizing: border-box;
}
html,
body {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
ul,
li {
  list-style: none;
}
a {
  color: black;
  text-decoration: none;
}
</style>
