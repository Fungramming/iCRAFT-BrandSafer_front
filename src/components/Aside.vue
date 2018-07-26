<template>
  <v-app id="inspire">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      clipped
      app
      clipped-right
    >
      <v-toolbar-side-icon class="hamBtn"  @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="logOutBtn"></v-icon>
    </v-toolbar>
    <div class="side-bar">
      <div class="header">        
        <img src="../assets/logo_small.png" alt="">
        <span>추적관리시스템</span>
      </div>
      <ul class="tab">
        <li>
          <router-link :to="{ name: 'dashboard' }">
            <!-- <v-btn class="list-title" color="grey lighten-1"> -->
              <v-icon>dashboard</v-icon>  
              Dashboard
            <!-- </v-btn> -->
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'product' }">
            <!-- <v-btn class="list-title" color="grey lighten-1"> -->
                <v-icon>label</v-icon>  
                제품
            <!-- </v-btn> -->
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'appv' }">
            <!-- <v-btn class="list-title" color="grey lighten-1"> -->
                <v-icon>public</v-icon>  
                App
            <!-- </v-btn> -->
          </router-link>
        </li>
        <li>
          <router-link to="">
            <!-- <v-btn class="list-title" color="grey lighten-1">             -->
                <v-icon>settings</v-icon>  
                관리자                
            <!-- </v-btn> -->
          </router-link>
          <ul>
            <li>
              <router-link to="">
                고객사관리
              </router-link>
            </li>
            <li>
              <router-link to="">
                계정
              </router-link>
              <ul>
                <li>
                  <router-link to="">       
                    고객사 계정           
                  </router-link>
                </li>
                <li>
                  <router-link to="">       
                    ICRAFT 계정관리  
                  </router-link>
                </li>
                <li>
                  <router-link to="">       
                    계정 로그           
                  </router-link>
                </li>
                <li>
                  <router-link to="">       
                    권한 관리
                  </router-link>
                </li>
              </ul>
            </li>
            <li>
              <router-link to="">
                블랙리스트 App
              </router-link>
            </li>
            <li>
              <router-link to="">
                과다인증 알림
              </router-link>
            </li>
            <li>
              <router-link to="">
                난수관리
              </router-link>
              <ul>
                <li>
                  <router-link to="">       
                    난수발권 관리        
                  </router-link>
                </li>
                <li>
                  <router-link to="">       
                    난수정보 조회
                  </router-link>
                </li>
                <li>
                  <router-link to="">       
                    관리자App 관리      
                  </router-link>
                </li>               
              </ul>
            </li>
            <li>
              <router-link to="">
                유동업체 관리
              </router-link>
            </li>
            <li>
              <router-link to="">
                태그타입 관리
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-footer color="blue-grey" class="white--text" app>
      <v-spacer></v-spacer>
      <span>&copy; 2018 ICRAFT</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    drawerRight: false,
    right: null,
    left: null
  })
};
</script>

<style lang="scss">
.hamBtn {
  position: relative;
  left: 235px;
}
.logOutBtn {
  float: right;
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
}
.tab {
  padding-top: 30px;
  padding-left: 0;
  height: 100%;
  li {
    .list-title {
      background-color: #252c36;
      margin: 0;
      width: 100%;
      .v-btn__content {
        justify-content: left;
      }
    }
    a {
      color: #f4f4f5;
      padding: 10px 20px;
      text-align: left;
      display: inline-block;
      width: 100%;
      &:hover {
        background-color: #252c36;
      }
    }
    .v-icon {
      // color: #646464;
      color: #f4f4f5;
      margin-right: 10px;
      font-size: 18px;
    }
  }
}
</style>
