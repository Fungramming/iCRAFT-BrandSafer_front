<template>
  <div id="admin">
    <customer-management></customer-management>
    <customer-account></customer-account>
  </div>
</template>

<script>
import CustomerManagement from '../components/Admin/CustomerManagement'
import CustomerAccount from '../components/Admin/CustomerAccount'

export default {
  components: {
    CustomerManagement,
    CustomerAccount,
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
