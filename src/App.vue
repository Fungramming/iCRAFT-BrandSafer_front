<template>
  <div id="app">
    <aside-tab v-if="this.isAuthenticated" :position-x="0" :position-y="0"  absolute class="aside" style="width:230px;"></aside-tab>
    <div :class="{active: true} " class="contents active">
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
    <v-progress-circular v-show ="isLoading"
    :size="50"
      class="progressBar"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <alert-modal></alert-modal>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { formatDate } from "./store/helper.js";
import AsideTab from "./components/Aside.vue";
import AlertModal from "./components/AlertModal/AlertModal.vue";

export default {
  components: { AsideTab, AlertModal },
  data() {
    return {
      logout: false
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapState(["isLoading"])
  },
  mounted() {
    this.$store.state.date = formatDate();
  },
  updated() {
    this.$store.state.urlName = this.$route.name;
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
  padding-left: 250px;
  padding-right: 20px;
  padding-top: 85px;
  padding-bottom: 30px;
  @media #{$phone} {
    padding-left: 10px;
    padding-right: 10px;
  }
  .v-card {
    background-color: #fff;
  }
  &.active {
    padding-left: 75px;
    @media #{$phone} {
      padding-left: 10px;
    }
  }
}
.progressBar {
  position: fixed !important;
  top: 50%;
  left: 50%;
}
</style>
