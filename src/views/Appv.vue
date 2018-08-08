<template>
  <router-view></router-view>
</template>

<script>
import AppReleaseInfo from "../components/Appv/AppReleaseInfo.vue"
import AppLookup from "../components/Appv/AppLookup.vue"

export default {
  components: {
    AppReleaseInfo,
    AppLookup
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
