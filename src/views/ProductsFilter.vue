<template>
  <LoggedLayout :top-nav-data="topNavData" :bottom-nav-data="bottomNavData">
    <div class="container">
      <ProductsFilter></ProductsFilter>
    </div>
  </LoggedLayout>
</template>

<script>
import LoggedLayout from '@/components/layouts/LoggedLayout.vue';
import ProductsFilter from '@/components/specific/products/Filter.vue';

export default {
  components: {
    LoggedLayout,
    ProductsFilter
  },
  computed: {
    topNavData() {
      return {
        headerTitle: 'Filter',
        showSearch: false
      };
    },
    bottomNavData() {
      return {
        show: false
      };
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
</style>
