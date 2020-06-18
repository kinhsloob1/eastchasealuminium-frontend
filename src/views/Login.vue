<template>
  <BaseLayout :top-nav-data="topNavData">
    <div class="container">
      <Login></Login>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import Login from '@/components/specific/Login.vue';

export default {
  components: {
    BaseLayout,
    Login
  },
  computed: {
    topNavData() {
      return {
        title: 'Login',
        showBack: true,
        showSearch: false
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
}
</style>
