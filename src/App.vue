<template>
  <div v-if="isMobile" id="app">
    <PageLoading></PageLoading>
    <router-view></router-view>
  </div>
  <ComingSoon v-else></ComingSoon>
</template>

<script>
import PageLoading from '@/components/specific/loaders/Page.vue';
import ComingSoon from '@/components/specific/ComingSoon.vue';

export default {
  components: {
    PageLoading,
    ComingSoon
  },
  computed: {
    isMobile() {
      return this.$mq === 'mobile';
    }
  },
  mounted() {
    /*
    const loader = this.$loading.show({
      loader: 'bars',
      width: 200,
      height: 500,
      opacity: 1
    });

    setTimeout(() => {
      loader.hide();
    }, 3000);

    console.log(this.$data.$isMobileOnly);
    */
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: rgb(245, 245, 245);

  > #app {
    &:extend(body);
  }
}
</style>
