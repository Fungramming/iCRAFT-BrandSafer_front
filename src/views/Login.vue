<template>
  <div class="login">
      <h1 class="logo">
        <img  src="../assets/logo.png" alt="브렌드세이퍼">
      </h1>
      <div class="login-bottom">
        <strong>추적관리시스템</strong>
        <span>Welcome, please login.</span>
        <v-text-field
          v-model="id"
          label="ID"
          clearable
          v-on:keyup.enter="onSubmit"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :type="'password'"
          label="PASSWORD"
          clearable
          v-on:keyup.enter="onSubmit"
        ></v-text-field>
        <!-- <v-radio-group v-model="selectedLang" class="lang-group" row>
          <v-radio class="lang-option" label="한국어" value="Korean"></v-radio>
          <v-radio class="lang-option" label="中文版" value="Chinese"></v-radio>
          <v-radio class="lang-option" label="English" value="English"></v-radio>
        </v-radio-group> -->
        <v-btn class="login-btn" @click.stop="onSubmit"><v-icon style="">launch</v-icon></v-btn>          
      </div>
      <footer>© iCraft21</footer>
      <transition>
        <div class="alert-modal">
          <v-alert
            :value="successModal"
            type="success"
          > 
          로그인 하였습니다.
          </v-alert>
          <v-alert
          :value="errorModal"
          type="error"
          >
          접속 실패! 아이디나 비밀번호를 다시 한번 확인해주세요.
          </v-alert>
        </div>
      </transition>
  </div>
</template>

<script>
import Constant from "../constant";

export default {
  data() {
    return {
      id: "",
      password: "",
      errors: [],
      successModal: false,
      errorModal: false
    };
  },
  mounted() {
    if (this.$route.query.redirect) {
      this.errors.push("로그인후 이용하실 수 있습니다.");
    } else if (this.$store.getters.isAuthenticated) {
      this.$router.replace({ name: "dashboard" });
    }
  },
  methods: {
    onSubmit() {
      // this.$store.state.tokken = 111;
      if (this.id && this.password) {
        this.$store
          .dispatch(Constant.LOG_IN, {
            username: this.id,
            password: this.password
          })
          .then(resp => {
            if (resp.status == 200) {
              this.successModal = true;
              this.$router.push({ name: "dashboard" });
            }
          })
          .catch(err => {
            if (err.status == 401) {
              this.errorModal = true;
            } else {
              alert(
                `접속실패!\n에러 코드: ${err.response.status}\n
              에러 메세지: ${err.response.message}`
              );
            }
          });
      }

      if (!this.id) {
        console.log("this.errors :", this.errors);
        this.errors.push("아이디를 입력해주세요.");
      } else if (!this.password) {
        this.errors.push("비밀번호를 입력해주세요.");
      }
    }
  }
};
</script>

<style lang="scss">
$primary-color: #173857;
.login {
  width: 600px;
  height: 400px;
  position: absolute;
  top: 45%;
  left: 50%;
  margin-left: -300px;
  margin-top: -200px;
  .logo {
    background-color: $primary-color;
    display: inline-block;
    width: 100%;
    padding: 15px 20px;
    img {
      float: left;
    }
  }
  .login-bottom {
    background-color: #fff;
    margin-bottom: 30px;
    padding: 40px 50px;
    height: 330px;
    position: relative;
    > * {
      display: block;
      text-align: left;
    }
    > strong {
      color: #646464;
      font-size: 30px;
    }
    > span {
      margin: 5px 0 30px 0;
      color: #646464;
    }
    .lang-group {
      margin: 0;
      padding-top: 10px;
    }
    .login-btn {
      background-color: $primary-color;
      color: #fff;
      float: right !important;
      margin: 0;
      font-size: 18px;
      position: absolute;
      bottom: 30px;
      right: 50px;
    }
  }
  footer {
    color: #999999;
    font-size: 15px;
    letter-spacing: -1px;
  }
}
.alert-modal {
  position: absolute;
  top: -4px;
  left: 0;
  width: 100%;
  height: 65px;
}
.v-alert.error {
  background-color: #ff5252;
  height: 100%;
}
.v-alert.success {
  background-color: #4caf50;
  height: 100%;
}
</style>
