<template>
  <div id="admin">
    <admin-customer></admin-customer>
  </div>
</template>

<script>
import AdminCustomer from '../components/Admin/AdminCustomer'

export default {
  components: {
    AdminCustomer,
  },
  data() {
    return {
      key: ""
    };
  }
};
</script>

<style lang="scss" scoped>
  #admin {
    margin: 25px;
  }
</style>
