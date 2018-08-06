<template>
  <router-view></router-view>
</template>

<script>
import ProductCertList from "../components/Product/ProductCertList";
import ProductCertMap from "../components/Product/ProductCertMap";

export default {
  components: {
    ProductCertList,
    ProductCertMap
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>
