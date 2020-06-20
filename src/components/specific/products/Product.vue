<template>
  <div :class="['product', { grid: getIsGrid }]">
    <div class="image">
      <img :src="getImageUrl" />
    </div>
    <div class="contents">
      <div class="name">{{ getName }}</div>
      <div class="style">{{ getStyle }}</div>
      <div class="price">
        &#8358;{{ getPrice }}
        <div class="per">/kg</div>
      </div>
    </div>
  </div>
</template>

<script>
import { isString, get, isNumber, defaults } from 'lodash';

export default {
  props: {
    productData: {
      type: Object,
      required: true,
      validator($data) {
        const imageUrl = get($data, 'imageUrl', null);
        const name = get($data, 'name', null);
        const price = get($data, 'price', null);
        const style = get($data, 'style', null);

        return isString(imageUrl) && isString(name) && isNumber(price) && isString(style);
      }
    }
  },
  computed: {
    getProductData() {
      return defaults(this.productData, {
        isGrid: false
      });
    },
    getImageUrl() {
      return this.productData.imageUrl;
    },
    getName() {
      return this.productData.name;
    },
    getPrice() {
      return this.productData.price;
    },
    getStyle() {
      return this.productData.style;
    },
    getIsGrid() {
      return this.productData.isGrid;
    }
  }
};
</script>

<style lang="less" scoped>
.product {
  width: 100%;
  height: 150px;
  display: flex;
  flex-wrap: nowrap;
  border-radius: 15px;
  overflow: hidden;

  > .image {
    position: relative;
    display: flex;
    width: 150px;
    height: 100%;
    background-color: rgb(100, 100, 100);

    > img {
      position: absolute;
      display: flex;
      top: 0;
      left: 0;
      width: 100%;
      object-fit: cover;
      background-color: inherit;
    }
  }

  > .contents {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 10px 15px;
    background-color: rgb(255, 255, 255);

    > * {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;
      margin-top: 5px;
    }

    > .name {
      font-size: 25px;
      font-weight: 900;
    }

    > .style {
      color: rgb(133, 133, 133);
      margin-top: 2px;
    }

    > .price {
      margin-top: 35px;
      font-weight: 900;
      font-size: 15px;

      > .per {
        display: flex;
        margin-left: 10px;
        font-weight: 300;
        font-size: 11px;
      }
    }
  }

  &.grid {
    width: 200px;
    height: auto;
    flex-wrap: wrap;
    border-radius: 10px;
    margin-left: 15px;
    overflow: hidden;

    > .image {
      width: 100%;
      height: 200px;
    }

    > .contents {
      width: 100%;
    }
  }
}
</style>
