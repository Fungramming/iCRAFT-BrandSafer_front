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
      <ul class="tab">
        <li class="active" @click="isActived">
          <router-link :to="{ name: 'dashboard' }" class="tab-btn" >
              <v-icon>dashboard</v-icon>
              <span>Dashboard</span>
          </router-link>
        </li>
        <li @click="isActived">
          <router-link :to="{ name: 'product' }" class="tab-btn" >
              <v-icon>label</v-icon>
              <span>제품</span>
          </router-link>
        </li>
        <li @click="isActived">
          <router-link :to="{ name: 'appv' }" class="tab-btn" >
              <v-icon>public</v-icon>
              <span>App</span>
          </router-link>
        </li>
        <li class="expandable" @click="isActived">
          <router-link to="" class="tab-btn">
              <v-icon>settings</v-icon>
              <span>관리자</span>
              <v-icon class="plus">keyboard_arrow_down</v-icon>
          </router-link>
          <ul class="sub-tab">
            <li class="active">
              <router-link :to="{ name: 'customerManagement'}" class="tab-btn" >
                  <span>고객사관리</span>
              </router-link>
            </li>
            <li class="expandable sub-sub-tab-title">
              <router-link to="" class="tab-btn" >
                  <span>계정</span>
                  <v-icon class="plus">keyboard_arrow_down</v-icon>
              </router-link>
              <ul class="sub-sub-tab">
                <li @click="isActived">
                  <router-link to="" class="tab-btn" >
                    <span>고객사 계정</span>
                  </router-link>
                </li>
                <li @click="isActived">
                  <router-link to="" class="tab-btn" >
                    <span>iCraft 계정관리</span>
                  </router-link>
                </li>
                <li @click="isActived">
                  <router-link to="" class="tab-btn" >
                    <span>계정 로그</span>
                  </router-link>
                </li>             
              </ul>
            </li>         
            <li>
              <router-link to="" class="tab-btn" >
                  <span>블랙리스트 App</span>
              </router-link>
            </li>
            <li>
            <router-link to="" class="tab-btn" >
                  <span>과다인증 알림</span>
              </router-link>
            </li>
            <li>
              <router-link to="" class="tab-btn" >
                  <span>난수관리</span>
              </router-link>
            </li>
            <li>
              <router-link to="" class="tab-btn" >
                  <span>유통업체</span>
              </router-link>
            </li>
            <li>
              <router-link to="" class="tab-btn" >
                  <span>태그타입 관리</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
     
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
      compTitle: "Dashboard",
      event: ""
    };
  },
  methods: {
    logout: function() {
      if (confirm("로그아웃 하시겠습니까?")) {
        this.$store.dispatch(Constant.LOG_OUT);
        this.$router.replace({ name: "login" });
      }
    },
    isActived: function(e) {
      let title = e.toElement.innerText;
      this.compTitle = title;
      let subTabTitle =
        e.toElement.parentNode.parentNode.parentNode.parentNode.className;
      let subSubTabTitle = e.toElement.parentNode.parentNode.className;
      console.log("subTabTitle :", subTabTitle);
      console.log("subSubTabTitle :", subSubTabTitle);
      let tab = document.getElementsByClassName("tab")[0];
      let subTab = document.getElementsByClassName("sub-tab")[0];
      let subSubTab = document.getElementsByClassName("sub-sub-tab")[0];
      function activedList(target) {
        return target.querySelectorAll(".active");
      }
      if (subTabTitle == "side-bar") {
        console.log("2 :", 2);
        if (activedList(tab).length > 0) {
          activedList(tab).forEach(element => {
            element.classList.remove("active");
          });
        }
        e.path[2].classList.add("active");
      } else if (subTabTitle == "expandable sub-sub-tab-title active") {
        if (activedList(subSubTab).length > 0) {
          activedList(subSubTab).forEach(element => {
            element.classList.remove("active");
          });
        }
        e.path[2].classList.add("active");
      } else if (subTabTitle == "expandable active") {
        if (activedList(subTab).length > 0) {
          activedList(subTab).forEach(element => {
            element.classList.remove("active");
          });
        }
        e.path[2].classList.add("active");
      }
    }
  }
};
</script>

<style lang="scss">
.top-bar {
  height: 63px;
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
    padding-left: 0;
    > li {
      width: 100%;
      height: 50px;
      .tab-btn {
        color: #596474;
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: left;
        &:hover {
          .v-icon {
            color: #fefefe;
          }
          span {
            &:hover {
              background: rgba(0, 0, 0, 0.14);
              color: #fefefe;
            }
          }
        }
        .v-icon {
          color: #596474;
          margin-right: 10px;
        }
        .plus {
          position: absolute;
          top: 13px;
          right: 5px;
          transform: rotate(90deg);
        }
        span {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          padding-top: 8px;
          padding-left: 55px;
          z-index: 100;
        }
      }
      &.active {
        background: rgba(0, 0, 0, 0.24);
        > .tab-btn {
          color: #fefefe;
          .v-icon {
            color: #fefefe;
          }
        }
      }
    }
    .expandable {
      overflow: hidden;
      .sub-tab,
      .sub-sub-tab {
        padding-left: 0;
        position: relative;
        -o-transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -ms-transition: all 0.3s ease;
        transition: all 0.3s ease;
        transform: translateX(-15px);
        opacity: 0.3;
        .tab-btn {
          display: block;
          height: 45px;
        }
        span {
          height: 45px;
        }
        li {
          height: 45px;
          &.active {
            background-color: rgba(0, 0, 0, 0.24);
            span {
              color: #fefefe;
            }
          }
        }
      }
      &.active {
        height: auto !important;
        .sub-tab {
          transform: translateX(0);
          opacity: 1;
          span {
            color: #596474;
          }
        }
        .active {
          .v-icon {
            color: #fefefe;
          }
          .sub-sub-tab {
            transform: translateX(0);
            opacity: 1;
            span {
              color: #596474;
            }
            .active {
              span {
                color: #fefefe;
              }
            }
          }
        }
      }
    }
  }
}

.footer {
  padding-right: 20px;
  span {
    color: white;
  }
}
</style>
