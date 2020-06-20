<template>
  <LoggedLayout :top-nav-data="topNavData">
    <div class="container">
      <SelectCustomer></SelectCustomer>
    </div>
  </LoggedLayout>
</template>

<script>
import LoggedLayout from '@/components/layouts/LoggedLayout.vue';
import SelectCustomer from '@/components/specific/SelectCustomer.vue';

export default {
  components: {
    LoggedLayout,
    SelectCustomer
  },
  computed: {
    topNavData() {
      return {
        title: 'Select Customer'
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
