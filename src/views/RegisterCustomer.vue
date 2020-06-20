<template>
  <LoggedLayout :top-nav-data="topNavData">
    <div class="container">
      <RegisterCustomer></RegisterCustomer>
    </div>
  </LoggedLayout>
</template>

<script>
import LoggedLayout from '@/components/layouts/LoggedLayout.vue';
import RegisterCustomer from '@/components/specific/RegisterCustomer.vue';

export default {
  components: {
    LoggedLayout,
    RegisterCustomer
  },
  computed: {
    topNavData() {
      return {
        title: 'Register Customer'
      };
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  margin: 15px;
  margin-top: 40px;
}
</style>
