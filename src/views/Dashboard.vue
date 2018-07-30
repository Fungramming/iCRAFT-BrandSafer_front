<template>
  <div>
    <daily-status></daily-status>
  </div>
</template>

<script>
import DailyStatus from "../components/Dashboard/DailyStatus.vue";
export default {
  components: { DailyStatus },
  data() {
    return {
      key: "value"
    };
  }
};
</script>

<style scoped>
</style>
