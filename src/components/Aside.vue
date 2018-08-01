<template>
  <div>
    <v-toolbar
      class="top-bar"
      color="blue-grey"
      dark
      fixed
      clipped
      app
      clipped-right
    >
      <v-toolbar-side-icon class="hamBtn"  @click.stop="clickToggle"></v-toolbar-side-icon>
      <h2 class="component-title">{{compTitle}}</h2>
      <v-btn class="logOutBtn" fixed flat @click.stop="logout" >
        <v-icon >
          exit_to_app
        </v-icon>
      </v-btn>   
    </v-toolbar>
    <div class="side-bar" @mouseover="hoverToggle">
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
          <router-link :to="{ name: 'certList' }" class="tab-btn" >
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
                  <router-link :to="{ name: 'customerAccount'}" class="tab-btn" >
                    <span>고객사 계정</span>
                  </router-link>
                </li>
                <li @click="isActived">
                  <router-link :to="{ name: 'icraftAccount'}" class="tab-btn" >
                    <span>iCraft 계정관리</span>
                  </router-link>
                </li>
                <li @click="isActived">
                  <router-link :to="{ name: 'accountLog'}" class="tab-btn" >
                    <span>계정 로그</span>
                  </router-link>
                </li>
              </ul>
            </li>         
            <li>
              <router-link :to="{ name: 'blacklistApp'}" class="tab-btn" >
                <span>블랙리스트 App</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'warningList'}" class="tab-btn" >
                <span>과다인증 알림</span>
              </router-link>
            </li>
            <!-- <li>
              <router-link to="" class="tab-btn" >
                <span>난수관리</span>
              </router-link>
            </li> -->
            <li>
              <router-link :to="{ name: 'distributorManagement'}" class="tab-btn" >
                <span>유통업체 관리</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'tagtypeManagement'}" class="tab-btn" >
                <span>태그타입 관리</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'adminappManagement'}" class="tab-btn" >
                <span>관리자App 관리</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <span class="copy">&copy; 2018 ICRAFT</span>
      <!-- <v-btn class="closeBtn" fixed flat @click.stop="" > -->
        <button class="closeBtn" @click.stop="clickToggle">
          
          <v-icon >
            close  
          </v-icon>
        </button>
      <!-- </v-btn>    -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      compTitle: "Dashboard"
    };
  },
  methods: {
    logout: function() {},
    hoverToggle: function(e) {
      if (window.innerWidth > 500) {
        let sideBarWidth = e.path[0].offsetWidth;
        if (sideBarWidth < 62) {
          this.clickToggle();
        }
      }
    },
    clickToggle: function() {
      let sideBar = document.getElementsByClassName("side-bar")[0];
      let topBar = document.getElementsByClassName("top-bar")[0];
      let con = document.getElementsByClassName("contents")[0];
      if (sideBar.className == "side-bar") {
        sideBar.classList.add("active");
        topBar.classList.add("active");
        con.classList.add("active");
        if (this.$store.state.sideBar == true) {
          this.$store.state.sideBar = false;
        }
      } else {
        sideBar.classList.remove("active");
        topBar.classList.remove("active");
        con.classList.remove("active");
        if (this.$store.state.sideBar == false) {
          this.$store.state.sideBar = true;
        }
      }
    },
    isActived: function(e) {
      let title = e.toElement.innerText;
      this.compTitle = title;
      let subTabTitle =
        e.toElement.parentNode.parentNode.parentNode.parentNode.className;
      let tab = document.getElementsByClassName("tab")[0];
      let subTab = document.getElementsByClassName("sub-tab")[0];
      let subSubTab = document.getElementsByClassName("sub-sub-tab")[0];
      let activedList = function(target) {
        return target.querySelectorAll(".active");
      };
      if (subTabTitle == "side-bar") {
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
$phone: "(min-width: 0) and (max-width: 500px)";
.top-bar {
  height: 61px;
  .v-toolbar__content {
    height: 64px !important;
    padding-left: 245px;
    transition: padding 0.3s ease;
  }
  .component-title {
    color: #fefefe;
    line-height: 64px;
    font-weight: 400;
    margin-top: -2px;
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
  &.active {
    .v-toolbar__content {
      padding-left: 80px;
      @media #{$phone} {
        padding-left: 20px;
      }
    }
  }
}
.side-bar {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2c343f;
  width: 230px;
  height: 100%;
  overflow-x: hidden;
  z-index: 200;
  transition: width 0.3s ease;
  @media #{$phone} {
    width: 100%;
  }
  &.active {
    width: 60px;
    @media #{$phone} {
      width: 0;
    }
    span {
      opacity: 0;
    }
    .plus {
      opacity: 0;
    }
  }
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
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding-left: 60px;
      font-size: 18px;
      line-height: 60px;
      white-space: nowrap;
      transition: opacity 0.3s ease;
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
        padding: 10px 18px;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: left;
        .v-icon {
          background: inherit;
          color: #596474;
          margin-right: 10px;
          position: relative;
          z-index: 200;
        }
        span {
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          padding-top: 8px;
          padding-left: 61px;
          z-index: 300;
          white-space: nowrap;
          transition: opacity 0.3s ease;
        }
        .plus {
          position: absolute;
          top: 13px;
          right: 5px;
          transform: rotate(90deg);
          transition: all 0.3s ease;
          z-index: 100;
        }
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
      }
      &.active {
        background: rgba(0, 0, 0, 0.24);
        > .tab-btn {
          color: #fefefe;
          .v-icon {
            color: #fefefe;
          }
          .plus {
            transform: rotate(0);
          }
          span {
            text-shadow: 1.5px 1px #607d8b;
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
          .plus {
            transform: rotate(0);
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
  .copy {
    color: #e7eaee;
    display: block;
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 0;
    z-index: 100;
    text-align: center;
    white-space: nowrap;
    transition: opacity 0.3s ease;
  }
  .closeBtn {
    color: white;
    display: none;
    position: absolute;
    top: 15px;
    right: 0px;
    width: 50px;
    @media #{$phone} {
      display: inline-block;
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
