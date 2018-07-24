<template>
  <div class="login">
      <h1 class="logo">
        <img  src="../assets/logo.png" alt="브렌드세이퍼">
      </h1>
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-text-field
                v-model="message1"
                label="ID"
                clearable
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.login {
  border: 1px solid black;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  .logo {
  }
}
</style>
