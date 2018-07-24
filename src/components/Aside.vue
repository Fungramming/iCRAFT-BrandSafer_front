<template>
  <div>
    <h1>aside</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 11
    };
  },
  created() {
    console.log("this.key :", this.key);
  }
};
</script>

<style scoped>
</style>
