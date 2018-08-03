<template>
  <router-view></router-view>
</template>

<script>
import AppReleaseInfo from "../components/Appv/AppReleaseInfo.vue"

export default {
  components: {
    AppReleaseInfo
  },
  data() {
    return {
      key: ""
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
