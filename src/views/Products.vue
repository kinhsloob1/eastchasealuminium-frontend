<template>
  <LoggedLayout :top-nav-data="topNavData">
    <template #header>
      <transition name="fade" mode="out-in">
        <div v-if="showFilter" key="1" class="filter">
          <filter-element
            :default-selected="getFilterData"
            @remove:filter="removeFilter"
            @update:filter="updateFilter"
          ></filter-element>
        </div>
        <div v-else key="2" class="container">
          <div class="pills">
            <vue-scroll class="scroller" :ops="pills.scroll">
              <pillFilter v-for="i in 10" :key="i" class="pill" :pill-data="{ name: `Pill ${i}` }"></pillFilter>
            </vue-scroll>
          </div>
          <div class="filters">
            <div class="filter" @click="addFilter">
              <FilterSvg class="icon"></FilterSvg>
              Filters
            </div>
            <button class="grid-switch" @click="isGrid = !isGrid">
              <component :is="gridIcon" class="icon"></component>
            </button>
          </div>
        </div>
      </transition>
    </template>

    <div class="products">
      <Product
        v-for="i in 10"
        :key="i"
        :product-data="{ imageUrl: '', name: `Product ${i}`, style: 'Total embrossed', price: 4000, isGrid }"
      ></Product>
    </div>
  </LoggedLayout>
</template>

<script>
import LoggedLayout from '@/components/layouts/LoggedLayout.vue';
import Product from '@/components/specific/products/Product.vue';
import PillFilter from '@/components/specific/products/pillFilter.vue';
import FilterSvg from '@/assets/svg/006-filter.svg';
import ListSvg from '@/assets/svg/007-view-list-button.svg';
import GridSvg from '@/assets/svg/008-grid.svg';

export default {
  components: {
    LoggedLayout,
    Product,
    PillFilter,
    FilterSvg,
    FilterElement: () =>
      import(/* webpackChunkName: "product-filter",webpackPrefetch: 3 */ '@/components/specific/products/Filter.vue')
  },
  data() {
    return {
      isGrid: false,
      showFilter: false,
      filterData: {},
      productsTopNav: {
        headerTitle: 'All Products',
        showSearch: true
      },
      filterTopNav: {
        headerTitle: 'Filter',
        showSearch: false
      },
      pills: {
        scroll: {
          vuescroll: {
            mode: 'slide',
            sizeStrategy: 'percent',
            detectResize: true
          },
          scrollPanel: {
            initialScrollY: false,
            initialScrollX: false,
            scrollingX: true,
            scrollingY: false,
            speed: 1000,
            easing: undefined
          },
          rail: {
            background: '#01a99a',
            opacity: 0,
            size: '6px',
            specifyBorderRadius: false,
            gutterOfEnds: null,
            gutterOfSide: '2px',
            keepShow: false
          },
          bar: {
            showDelay: 500,
            onlyShowBarOnScroll: false,
            keepShow: false,
            background: '#c1c1c1',
            opacity: 0,
            specifyBorderRadius: false,
            minSize: 0,
            size: '6px',
            disable: false,
            hoverStyle: false
          }
        }
      }
    };
  },
  computed: {
    gridIcon() {
      return this.isGrid ? ListSvg : GridSvg;
    },
    topNavData() {
      return this.showFilter ? this.filterTopNav : this.productsTopNav;
    },
    getFilterData() {
      return this.filterData;
    }
  },
  methods: {
    removeFilter() {
      this.showFilter = false;
    },
    updateFilter(filterData) {
      this.showFilter = false;
      this.filterData = filterData;
    },
    addFilter() {
      this.showFilter = true;
    }
  }
};
</script>

<style lang="less" scoped>
.filter {
  display: flex;
  width: 100%;
}

.container {
  &:extend(.filter);
  flex-wrap: wrap;

  > .pills {
    display: flex;
    width: 100%;
    overflow: auto;
    flex-wrap: nowrap;
    margin: 15px 10px;
    white-space: nowrap;
  }

  .pill {
    margin-left: 20px;
  }

  > .filters {
    display: flex;
    background-color: rgb(245, 245, 245);
    margin-top: 20px;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    margin: 10px 25px;
    padding: 10px;

    > .filter {
      display: flex;
      margin-right: auto;
      align-items: center;
      cursor: pointer;

      > .icon {
        width: 30px;
        height: 30px;
        margin-right: 10px;
      }
    }

    .grid-switch {
      &:extend(.container > .filters > .filter);
      margin-right: unset;
      margin-left: auto;
      border: unset;
      outline: unset;

      > .icon {
        &:extend(.container > .filters > .filter > .icon);
        margin-right: 5px;
      }
    }
  }
}

.products {
  display: flex;
  width: 100%;
  margin: 15px;
  margin-top: 10px;
  flex-wrap: wrap;
  justify-content: center;

  > * {
    margin-top: 25px;
  }
}
</style>
