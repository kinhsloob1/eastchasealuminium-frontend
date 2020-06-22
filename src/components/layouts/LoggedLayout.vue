<template>
  <base-layout :top-nav-data="getTopNavData">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <div v-show="getShowBottomNav" id="bottomNav">
        <BottomNav></BottomNav>
      </div>
    </template>
  </base-layout>
</template>

<script>
import { get, defaults, isObject } from 'lodash';
import BaseLayout from '@/components/layouts/BaseLayout.vue';
import BottomNav from '@/components/specific/BottomNav.vue';

export default {
  name: 'LoggedLayout',
  components: {
    BottomNav,
    BaseLayout
  },
  inheritAttrs: false,
  computed: {
    getTopNavData() {
      return this.$attrs['top-nav-data'];
    },
    getBottomNavData() {
      let bottomNavData = this.$attrs['bottom-nav-data'];
      if (!isObject(bottomNavData)) {
        bottomNavData = {};
      }

      return defaults(bottomNavData, {
        show: true
      });
    },
    getShowBottomNav() {
      return Boolean(get(this.getBottomNavData, 'show'));
    }
  }
};
</script>

<style lang="less" scoped>
#bottomNav {
  display: flex;
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  height: 90px;
  z-index: 100;
}
</style>
