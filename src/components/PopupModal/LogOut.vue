<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>
        <v-card-text>
          로그아웃 하시겠습니까?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="logout"
          >
            동의
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
          >
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import Constant from "../../constant";

export default {
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    logout: function() {
      this.$store.dispatch(Constant.LOG_OUT);
      this.$router.replace({ name: "/login" });
    }
  }
};
</script>
