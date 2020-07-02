<template>
  <div :class="['product', { grid: getIsGrid }, { inCart: getInCart }]" @click="handleClick">
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
      <div :class="['instruction', { inCart: getInCart }]">
        {{ getInCart ? 'Already in cart.... click to edit' : 'click to add to cart' }}
      </div>
    </div>
  </div>
</template>

<script>
import { isString, isFinite, get, defaults } from 'lodash';

export default {
  props: {
    productData: {
      type: Object,
      required: true,
      validator($data) {
        const { id = null, imageUrl = null, name = null, price = null, style = null } = $data;
        return isFinite(id) && isString(imageUrl) && isString(name) && isFinite(price) && isString(style);
      }
    }
  },
  computed: {
    getProductData() {
      return defaults(this.productData, {
        isGrid: false,
        inCart: false
      });
    },
    getId() {
      return get(this.productData, 'id');
    },
    getImageUrl() {
      return get(this.getProductData, 'imageUrl');
    },
    getName() {
      return get(this.getProductData, 'name');
    },
    getPrice() {
      return get(this.getProductData, 'price', 0);
    },
    getStyle() {
      return get(this.getProductData, 'style');
    },
    getIsGrid() {
      return get(this.getProductData, 'isGrid');
    },
    getInCart() {
      return get(this.getProductData, 'inCart');
    }
  },
  methods: {
    handleClick() {
      return this.$emit('click', this.getProductData);
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
  cursor: pointer;
  overflow: hidden;
  align-items: flex-start;

  &:hover,
  &.inCart {
    box-shadow: 3px 3px 3px 0 rgb(100, 100, 100);
  }

  > .image {
    position: relative;
    display: flex;
    width: 150px;
    height: 100%;
    flex-shrink: 0;
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
    flex-shrink: 1;
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

    > .instruction {
      font-size: 15px;
      text-transform: capitalize;
      color: rgb(51, 51, 51);
      justify-content: flex-start;
      align-items: center;
      white-space: pre-wrap;
      margin-top: 5px;
      word-wrap: break-word;
      transition: all 0.3s ease-in;

      &.inCart {
        color: rgb(255, 36, 36);
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
