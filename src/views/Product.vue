<template>
  <v-container fluid grid-list-xl>
    <router-view></router-view>
  </v-container>
</template>

<script>
import ProductCertList from "../components/Product/ProductCertList"

export default {
  components: {
    ProductCertList
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>
