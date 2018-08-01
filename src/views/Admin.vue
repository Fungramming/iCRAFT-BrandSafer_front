<template>
  <v-container fluid grid-list-md>
    <router-view></router-view>
  </v-container>
</template>

<script>
import CustomerManagement from "../components/Admin/CustomerManagement";
import CustomerAccount from "../components/Admin/CustomerAccount";

export default {
  components: {
    CustomerManagement,
    CustomerAccount
  },
  data() {
    return {
      key: "",
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
