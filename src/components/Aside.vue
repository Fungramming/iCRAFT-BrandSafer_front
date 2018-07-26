<template>
  <v-app>
    <v-toolbar
      class="top-bar"
      color="blue-grey"
      dark
      fixed
      clipped
      app
      clipped-right
    >
      <v-toolbar-side-icon class="hamBtn"  @click.stop=""></v-toolbar-side-icon>
      <h2 class="component-title">{{compTitle}}</h2>
      <v-btn class="logOutBtn" fixed flat @click.stop="logout" >
        <v-icon >
          exit_to_app
        </v-icon>
      </v-btn>   
    </v-toolbar>
    <div class="side-bar">
      <div class="header">
        <img src="../assets/logo_small.png" alt="">
        <span>추적관리시스템</span>
      </div>
      <v-list class="tab">
          <router-link :to="{ name: 'dashboard' }" >
            <v-list-tile @click="isActived">
              <v-icon>dashboard</v-icon>
              <v-list-tile-content>
                  <v-list-tile-title ref="a">
                    Dashboard
                  </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
           <router-link :to="{ name: 'product' }">
            <v-list-tile>
              <v-icon>label</v-icon>
              <v-list-tile-content>
                  <v-list-tile-title>
                    제품
                  </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
           <router-link :to="{ name: 'appv' }">
            <v-list-tile>
              <v-icon>public</v-icon>
              <v-list-tile-content>
                  <v-list-tile-title>
                    App
                  </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
          <v-list-group
            no-action
          >
            <v-list-tile slot="activator">
                <v-icon>settings</v-icon>
                <v-list-tile-content>
                  <v-list-tile-title>관리자</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <router-link :to="{ name: 'customerManagement'}">
              <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>고객사관리</v-list-tile-title>
                  </v-list-tile-content>
              </v-list-tile>
            </router-link>
            <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>계정</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>블랙리스트 App</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>과다인증 알림</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>난수관리</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>유동업체 관리</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>태그타입 관리</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
          </v-list-group>         
        </v-list>
    </div>
    <v-footer color="blue-grey" class="footer" app>
      <v-spacer></v-spacer>
      <span>&copy; 2018 ICRAFT</span>
    </v-footer>
  </v-app>
</template>

<script>
import Constant from "../constant";
export default {
  data() {
    return {
      compTitle: "Dashboard"
    };
  },
  methods: {
    logout: function() {
      if (confirm("로그아웃 하시겠습니까?")) {
        this.$store.dispatch(Constant.LOG_OUT);
        this.$router.replace({ name: "login" });
      }
    },
    isTitle: function(e) {
      let _this = e.path[0];
      let title = _this.children[1].innerText;
      this.compTitle = title;
    },
    isActived: function(e) {
      console.log("e :", e.path[5]);
      e.path[4].classList.add("active");
      console.log("this.$refs.el :", this.$refs);
      console.log(" this.$refs :", this.$refs.a.innerText);
    }
  }
};
</script>

<style lang="scss">
.top-bar {
  .component-title {
    position: absolute;
    top: 0;
    left: 303px;
    line-height: 64px;
    font-weight: 400;
  }
  .hamBtn {
    position: relative;
    left: 230px;
  }
  .logOutBtn {
    top: 15px;
    right: 0;
    &:before {
      left: 16px;
      width: 60%;
    }
    .v-ripple__container {
      left: 16px;
      width: 60%;
    }
  }
}
.side-bar {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #2c343f;
  width: 230px;
  height: 100%;
  overflow: hidden;
  z-index: 200;
  .header {
    background-color: rgba(255, 255, 255, 0.075);
    padding: 18px 20px;
    text-align: left;
    img {
      display: inline-block;
      position: relative;
      top: 3px;
      margin-right: 10px;
    }
    span {
      color: #e7eaee;
      font-size: 18px;
    }
  }
  .tab {
    background-color: #323c4b !important;
    padding-top: 30px;
    padding-left: 0;
    height: 100%;
    > a {
      display: inline-block;
      width: 100%;
      &.active {
        .v-list__tile {
          color: #fefefe !important;
          background: rgba(0, 0, 0, 0.24);
          .v-icon {
            color: #fefefe !important;
          }
        }
      }
    }
    .v-list__tile {
      color: #596474 !important;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
        .v-icon {
          color: #fefefe !important;
        }
      }
    }
    .v-icon {
      color: #596474 !important;
    }
    .v-list__tile__content {
      padding-left: 10px;
    }
    .v-list__group__header--active {
      .v-list__group__header__prepend-icon {
        i {
          color: #607d8b !important;
        }
      }
    }
    .v-list__group__items--no-action .v-list__tile {
      padding-left: 38px;
    }
    // li {
    //   .list-title {
    //     background-color: #252c36;
    //     margin: 0;
    //     width: 100%;
    //     .v-btn__content {
    //       justify-content: left;
    //     }
    //   }
    //   a {
    //     color: #f4f4f5;
    //     padding: 10px 20px;
    //     text-align: left;
    //     display: inline-block;
    //     width: 100%;
    //     &:hover {
    //       background-color: #252c36;
    //     }
    //   }
    //   .v-icon {
    //     // color: #646464;
    //     color: #f4f4f5;
    //     margin-right: 10px;
    //     font-size: 18px;
    //   }
    // }
  }
}

.footer {
  padding-right: 20px;
  span {
    color: white;
  }
}
</style>
