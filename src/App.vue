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
import axios from '@/utils/axios';

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
  async mounted() {
    try {
      const { data } = await axios.request({
        method: 'post',
        url: 'login',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          email: 'kingsloob1@gmail.com',
          password: 'password'
        }
      });

      console.log('data', data);
    } catch (e) {
      console.log('catch handler');
      console.log(e);
    }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
