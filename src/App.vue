<template>
  <div id="app">
    <aside-tab v-if="this.isAuthenticated" :position-x="0" :position-y="0"  absolute class="aside" style="width:230px;"></aside-tab>
    <div :class="{active: this.$store.state.sideBar} " class="contents">
      <router-view/>
    </div>
    <log-out v-if="false"></log-out>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import AsideTab from "./components/Aside.vue";
import LogOut from "./components/PopupModal/LogOut.vue";

export default {
  components: { AsideTab, LogOut },
  computed: mapGetters(["isAuthenticated"]),
  beforeCreate() {
    // window.localStorage.clear();
  }
};
</script>

<style lang="scss">
@import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);
$phone: "(min-width: 0) and (max-width: 500px)";

* {
  font-family: "Spoqa Han Sans", "Sans-serif";
  box-sizing: border-box;
}
html,
body {
  background-color: #fdfdfd;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 16px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
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

.aside {
  position: absolute;
  top: 0;
  left: 0;
}
.contents {
  height: 100%;
  padding-left: 80px;
  padding-right: 20px;
  padding-top: 80px;
  @media #{$phone} {
    padding-left: 10px;
    padding-right: 10px;
  }
  .v-card {
    background-color: #fff;
  }
  &.active {
    padding-left: 250px;
  }
}
</style>
