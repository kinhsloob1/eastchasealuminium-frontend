<template>
  <div class="topNav">
    <div class="controls">
      <BackSvg :view-box="viewBoxString" :class="['back', 'icon', { hidden: !getShowBack }]" />
      <div class="header-title">{{ getHeaderTitle }}</div>
      <SearchSvg :view-box="viewBoxString" :class="['search', 'icon', { hidden: !getShowSearch }]" />
    </div>
    <div v-show="hasTitle" class="title">{{ getTitle }}</div>
    <slot></slot>
  </div>
</template>

<script>
import BackSvg from '@/assets/svg/009-back-arrow.svg';
import SearchSvg from '@/assets/svg/010-search.svg';
import { defaults, isObject } from 'lodash';

export default {
  name: 'TopNav',
  components: {
    BackSvg,
    SearchSvg
  },
  inheritAttrs: false,
  props: {
    topNavData: {
      type: Object,
      default() {
        return {
          showBack: true,
          showSearch: false,
          title: '',
          headerTitle: ''
        };
      },
      required: false
    }
  },
  data() {
    return {
      viewBoxString: '0 0 512 512'
    };
  },
  computed: {
    getTopNavData() {
      return defaults(isObject(this.topNavData) ? this.topNavData : {}, {
        title: '',
        showSearch: false,
        showBack: true,
        headerTitle: ''
      });
    },
    getTitle() {
      return this.getTopNavData.title || '';
    },
    getShowSearch() {
      return this.getTopNavData.showSearch || false;
    },
    getShowBack() {
      return this.getTopNavData.showBack || true;
    },
    getHeaderTitle() {
      return this.getTopNavData.headerTitle || '';
    },
    hasTitle() {
      return !!this.getTitle.length;
    }
  }
};
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 20px 20px;
  box-shadow: 2px 2px 7px rgb(150, 150, 150);
  overflow: hidden;
  position: relative;
  overflow-y: auto;
  max-height: 100vh;
  z-index: 9999;

  > .controls {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    z-index: 1;

    > .icon {
      width: 30px;
      height: 30px;
      padding: 10px;

      &.hidden {
        visibility: hidden;
      }
    }

    > .back {
      margin-right: auto;
    }

    > .search {
      margin-left: auto;
    }

    > .header-title {
      margin-right: auto;
      margin-left: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 900;
      font-size: 20px;
      text-transform: capitalize;
    }
  }

  > .title {
    display: flex;
    width: 100%;
    margin: 15px;
    margin-top: 25px;
    margin-right: unset;
    font-size: 40px;
    font-weight: 900;
    text-transform: capitalize;
  }
}
</style>
