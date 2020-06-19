<template>
  <div class="container">
    <header ref="header">
      <TopNav :top-nav="getTopNavData">
        <template #default>
          <slot name="header"></slot>
        </template>
      </TopNav>
    </header>
    <div class="main" :style="mainStyle">
      <slot></slot>
    </div>
    <footer ref="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import TopNav from '@/components/specific/TopNav.vue';

export default {
  name: 'BaseLayout',
  components: {
    TopNav
  },
  inheritAttrs: false,
  props: {
    topNavData: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      heights: {
        header: 0,
        footer: 0
      }
    };
  },
  computed: {
    getTopNavData() {
      return this.topNavData;
    },
    mainStyle() {
      return {
        'margin-top': `${this.heights.header + 10}px`,
        'margin-bottom': `${this.heights.footer + 10}px`
      };
    }
  },
  mounted() {
    const { header, footer } = this.$refs;
    this.heights.header = header.getBoundingClientRect().height;
    this.heights.footer = footer.getBoundingClientRect().height;
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;

  & > * {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  > header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
  }

  > footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 3;
  }

  > .main {
    position: relative;
    z-index: 1;
  }
}
</style>
