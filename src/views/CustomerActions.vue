<template>
  <LoggedLayout :top-nav-data="topNavData">
    <div class="container">
      <CustomerActions></CustomerActions>
    </div>
  </LoggedLayout>
</template>

<script>
import LoggedLayout from '@/components/layouts/LoggedLayout.vue';
import CustomerActions from '@/components/specific/CustomerActions.vue';

export default {
  components: {
    LoggedLayout,
    CustomerActions
  },
  computed: {
    topNavData() {
      return {
        title: 'what do you want to do?'
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
