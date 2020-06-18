<template>
  <div class="topNav">
    <div class="controls">
      <BackSvg v-if="showBack" :view-box="viewBoxString" class="back icon" />
      <SearchSvg v-if="showSearch" :view-box="viewBoxString" class="search icon" />
    </div>
    <div class="title">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script>
import BackSvg from '@/assets/svg/009-back-arrow.svg';
import SearchSvg from '@/assets/svg/010-search.svg';

export default {
  name: 'TopNav',
  components: {
    BackSvg,
    SearchSvg
  },
  inheritAttrs: false,
  props: {
    topNav: {
      type: Object,
      default() {
        return {
          showBack: true,
          showSearch: false,
          title: ''
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
    getData() {
      return this.topNav;
    },
    title() {
      return this.getData.title;
    },
    showSearch() {
      return this.getData.showSearch;
    },
    showBack() {
      return this.getData.showBack;
    }
  }
};
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 20px 20px;
  box-shadow: 2px 2px 7px rgb(150, 150, 150);
  overflow: hidden;
  z-index: 9999;

  > .controls {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;

    > .icon {
      width: 30px;
      height: 30px;
      padding: 10px;
    }

    > .back {
      margin-right: auto;
    }

    > .search {
      margin-left: auto;
    }
  }

  > .title {
    display: flex;
    width: 100%;
    margin: 10px;
    margin-right: unset;
    font-size: 40px;
    font-weight: 900;
    text-transform: capitalize;
  }
}
</style>
