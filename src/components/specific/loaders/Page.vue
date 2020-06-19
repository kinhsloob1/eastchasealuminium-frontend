<template>
  <Loading :active.sync="activeState" :can-cancel="false" :is-full-page="true" :opacity="1">
    <template #default>
      <div class="image">
        <img :src="loadingImage" />
      </div>
    </template>
    <template #after>
      <div class="text">loading... Please be patient</div>
    </template>
  </Loading>
</template>

<script>
import loadingImage from '@/assets/images/loading.gif';
import Loading from 'vue-loading-overlay';

export default {
  components: {
    Loading
  },
  data() {
    return {
      isActive: true
    };
  },
  computed: {
    activeState: {
      get() {
        return this.isActive;
      },
      set(value) {
        this.isActive = Boolean(value);
      }
    },
    loadingImage() {
      return loadingImage;
    }
  },
  mounted() {
    setTimeout(() => {
      this.activeState = false;
    }, 5000);
  }
};
</script>

<style lang="less" scoped>
.text {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: rgb(150, 150, 150);
  background-color: rgb(255, 255, 255);
}

.image {
  &:extend(.text);
  color: unset;
  display: relative;

  > img {
    display: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: cover;
    width: 150px;
    height: 60px;
  }
}
</style>
