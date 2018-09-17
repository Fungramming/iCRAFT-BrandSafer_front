<template>
  <div>
    <v-toolbar
      class="top-bar active"
      color="blue-grey"
      dark
      fixed
      clipped
      app
      clipped-right
    >
      <v-toolbar-side-icon class="hamBtn"  @click.stop="clickToggle"></v-toolbar-side-icon>
      <h2 class="component-title">{{compTitle}}</h2>   
    </v-toolbar>
    <div class="logout-modal">
      <v-btn slot="activator" class="logOutBtn" fixed flat @click.stop="showModal">
        <v-icon >
          exit_to_app
        </v-icon>
      </v-btn>
      <modal :width="300" :height="150" name="logout" transition="pop-out">
        <v-card>
          <div class="modal-header">
            <img src="../assets/logo_small.png" alt="">
          </div>
          <p>로그아웃 하시겠습니까?</p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click.native="logout">로그아웃</v-btn>
            <v-btn color="green darken-1" flat @click.native="closeModal">취소</v-btn>
          </v-card-actions>
        </v-card>
      </modal>
    </div>
    <div class="side-bar active" @mouseover="hoverToggle">
      <div class="header">
        <img src="../assets/logo_small.png" alt="">
        <span>추적관리시스템</span>
      </div>
      <ul class="tab">
        <li @click="isActived">
          <router-link :to="{ name: 'dashboard' }" name="dashboard" class="tab-btn" >
              <v-icon>dashboard</v-icon>
              <span class="switch step1">Dashboard</span>
          </router-link>
        </li>
        <li v-if="tabList.tabB" class="expandable" @click="isActived">
          <router-link to="" name="certList" class="tab-btn" >
              <v-icon>label</v-icon>
              <span class="switch step1">제품</span>
              <v-icon class="plus">keyboard_arrow_down</v-icon>
          </router-link>
          <ul class="sub-tab">
            <li>
              <router-link :to="{ name: 'certList'}" name="certList" class="tab-btn" >
                  <span class="switch step2">제품인증 조회</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'certMap'}" name="certMap" class="tab-btn" >
                  <span class="switch step2">제품인증 지도</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li v-if="tabList.tabC" class="expandable" @click="isActived">
          <router-link to="" name="appv" class="tab-btn" >
              <v-icon>public</v-icon>
              <span class="switch step1">App</span>
              <v-icon class="plus">keyboard_arrow_down</v-icon>
          </router-link>
          <ul class="sub-tab">
            <li>
              <router-link :to="{ name: 'releaseInfo'}" name="releaseInfo" class="tab-btn" >
                  <span class="switch step2">App 출시정보</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'lookup'}" name="lookup" class="tab-btn" >
                  <span class="switch step2">App 조회</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li v-if="tabList.tabD" class="expandable" @click="isActived">
          <router-link to="" name="admin" class="tab-btn">
              <v-icon>settings</v-icon>
              <span class="switch step1">관리자</span>
              <v-icon class="plus">keyboard_arrow_down</v-icon>
          </router-link>
          <ul class="sub-tab">
            <li>
              <router-link :to="{ name: 'customerManagement'}" name="customerManagement" class="tab-btn" >
                  <span class="switch step2">고객사관리</span>
              </router-link>
            </li>
            <li class="expandable sub-sub-tab-title">
              <router-link to="" class="tab-btn" >
                  <span class="switch step2">계정</span>
                  <v-icon class="plus">keyboard_arrow_down</v-icon>
              </router-link>
              <ul class="sub-sub-tab">
                <!-- <li @click="isActived">
                  <router-link :to="{ name: 'customerAccount'}" name="customerAccount" class="tab-btn" >
                    <span class="switch step3">고객사 계정</span>
                  </router-link>
                </li> -->
                <li @click="isActived">
                  <router-link :to="{ name: 'icraftAccount'}" name="icraftAccount" class="tab-btn" >
                    <span class="switch step3">iCraft 계정관리</span>
                  </router-link>
                </li>
                <li @click="isActived">
                  <router-link :to="{ name: 'accountLog'}" name="accountLog" class="tab-btn" >
                    <span class="switch step3">계정 로그</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link :to="{ name: 'blacklistApp'}" name="blacklistApp" class="tab-btn" >
                <span class="switch step2">블랙리스트 App</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'warningList'}" name="warningList" class="tab-btn" >
                <span class="switch step2">과다인증 알림</span>
              </router-link>
            </li>
            <!-- <li>
              <router-link to="" class="tab-btn" >
                <span>난수관리</span>
              </router-link>
            </li> -->
            <li>
              <router-link :to="{ name: 'distributorManagement'}" name="distributorManagement" class="tab-btn" >
                <span class="switch step2">유통업체 관리</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'tagtypeManagement'}" name="tagtypeManagement" class="tab-btn" >
                <span class="switch step2">태그타입 관리</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name:'adminappManagement'}" name="adminappManagement" class="tab-btn" >
                <span class="switch step2">관리자App 관리</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
      <span class="copy">&copy; 2018 ICRAFT</span>
        <button class="closeBtn" @click.stop="clickToggle"> 
          <v-icon >
            close  
          </v-icon>
        </button>
    </div>
  </div>
</template>

<script>
import {
  hoverFunc,
  clickFunc,
  activingFunc,
  redirectTabFunc
} from "./AsideHelper";
import Constant from "../constant";
export default {
  data() {
    return {
      userRole: "",
      compTitle: "Dashboard",
      dialog: false,
      tabList: {
        tabA: true,
        tabB: true,
        tabC: true,
        tabD: true
      }
    };
  },
  mounted() {
    this.userRole = this.$store.state.user.role_name;
    this.defaultTab();
  },
  methods: {
    showModal() {
      this.$modal.show("logout");
    },
    closeModal() {
      let vModal = this.$children[2];
      console.log("vModal :", vModal);
      vModal.visible = false;
    },
    logout: function() {
      this.$store.dispatch(Constant.LOG_OUT).then(() => {
        this.dialog = false;
        this.$router.push({ name: "login" });
      });
    },
    hoverToggle: function(e) {
      hoverFunc(e);
      let sideBarWidth = e.path[0].offsetWidth;
      if (sideBarWidth < 62) {
        this.clickToggle();
      }
    },
    clickToggle: function() {
      this.$store.state.sideBar = clickFunc();
    },
    isActived: function(e) {
      this.compTitle = activingFunc(e);
    },
    defaultTab() {
      // CustomerUser / CustomerAdmin / iCraftUser / iCraftAdministrator / iCraftSuperAdmin
      if (this.userRole == "CustomerUser") {
        this.tabList.tabD = false;
      }
      redirectTabFunc(this);
    }
  }
};
</script>

<style lang="scss">
$phone: "(min-width: 0) and (max-width: 500px)";
.top-bar {
  .v-toolbar__content {
    height: 64px !important;
    padding-left: 245px;
    transition: padding 0.3s ease;
    height: 61px;
    @media #{$phone} {
      padding-left: 20px;
    }
  }
  .component-title {
    color: #fefefe;
    line-height: 64px;
    font-weight: 400;
    margin-top: -2px;
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
// 로그아웃 모달
.logout-modal {
  .logOutBtn {
    color: white;
    top: 15px;
    right: 0;
    z-index: 200;
    &:before {
      left: 16px;
      width: 60%;
    }
    .v-ripple__container {
      left: 16px;
      width: 60%;
    }
  }
  .v-card {
    height: 100%;
    .modal-header {
      background-color: #607d8b;
      height: 40px;
      img {
        background-color: #3c434d;
        padding: 10px;
      }
    }
    p {
      margin: 0;
      padding-top: 20px;
      text-align: center !important;
      font-size: 22px;
    }
    .v-card__actions {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
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
  z-index: 300;
  transition: width, left 0.3s ease;
  @media #{$phone} {
    width: 100%;
    left: -100%;
  }
  &.active {
    width: 60px;
    @media #{$phone} {
      width: 100%;
      left: 0;
    }
    span {
      opacity: 0;
      @media #{$phone} {
        opacity: 1;
      }
    }
    .plus {
      opacity: 0;
      @media #{$phone} {
        opacity: 1;
      }
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
