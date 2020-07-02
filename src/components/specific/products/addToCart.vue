<template>
  <div class="product">
    <div class="content">
      <div class="image"></div>
      <div class="details">
        <div class="name">{{ getName }}</div>
        <div class="style">{{ getStyle }}</div>
        <div class="price">{{ getPrice }}</div>
      </div>
    </div>
    <div class="inputs">
      <div class="input">
        <span class="title">Corrugation</span>
        <span class="field">
          <span class="block-wrapper">
            <vueSelect
              v-model="corrugationId"
              class="select"
              :reduce="({ id }) => id"
              placeholder="Corrugation type"
              :options="corrugations"
              :value="1"
              label="label"
            ></vueSelect>
          </span>
        </span>
      </div>
      <transition name="fade">
        <div v-show="showOnCost" class="input">
          <span class="title">On Cost</span>
          <div class="field multiple">
            <div class="block-wrapper">
              <vueSelect
                class="select"
                :reduce="({ id }) => id"
                placeholder="On Cost type"
                :options="onCosts"
                :value="getSelectedOnCostId"
                :clearable="false"
                :searchable="false"
                :no-drop="true"
                label="label"
              >
                <template #search>
                  <span></span>
                </template>
              </vueSelect>
            </div>

            <label>On cost value</label>
            <input ref="onCostValueInput" v-model="onCostValue" type="number" />
          </div>
        </div>
      </transition>
      <div class="input">
        <span class="title">Quantity (kg)</span>
        <span class="field input">
          <input v-model="quantity" type="number" placeholder="Quantity in KG" />
        </span>
      </div>
      <transition name="fade">
        <div v-show="hasDiscount" class="input">
          <div class="title">
            <button class="remove" @click="removeDiscount">
              &times;
            </button>
            Discount
          </div>
          <span class="field multiple">
            <div class="block-wrapper">
              <vueSelect
                v-model="discountId"
                class="select"
                :reduce="({ id }) => id"
                placeholder="Discount type"
                :options="discounts"
                label="label"
              >
              </vueSelect>
            </div>
            <label>Discount Value</label>
            <input v-model="discountValue" type="number" placeholder="Discount Value" />
          </span>
        </div>
      </transition>
    </div>
    <div class="amount">Total: &#8358;{{ getDisplayedAmount }}</div>
    <div class="actions">
      <transition name="fade">
        <button v-show="!hasDiscount" class="add-discount" @click="addDiscount">Add Discount</button>
      </transition>
    </div>
    <div class="controls">
      <button class="save active" @click="handleControl('save')">save</button>
      <button class="discard" @click="handleControl('discard')">Discard</button>
    </div>
  </div>
</template>

<script>
import 'vue-select/dist/vue-select.css';
import vueSelect from 'vue-select';
import { isFinite, isBoolean, isString, defaults, get, isNull, isObject, round } from 'lodash';

export default {
  components: {
    vueSelect
  },
  props: {
    product: {
      type: Object,
      required: true,
      validator(product) {
        const { id, name, imageUrl, price, inCart, quantity = null } = product;
        const isNew = !inCart;

        if (isFinite(id) && isString(imageUrl) && isFinite(price) && isString(name)) {
          if (isBoolean(isNew)) {
            if (!isNew) {
              if (isFinite(quantity)) {
                return true;
              }

              return false;
            }

            return true;
          }

          return false;
        }

        return false;
      }
    }
  },
  data: () => ({
    hasDiscount: false,
    corrugations: [
      {
        label: 'long span',
        id: 1,
        onCostId: 2
      }
    ],
    onCosts: [
      {
        label: 'fixed amount',
        id: 1
      },
      {
        label: 'fixed amount per (KG)',
        id: 2
      }
    ],
    discounts: [
      {
        label: 'fixed amount',
        id: 1
      },
      {
        label: 'percentage of total',
        id: 2
      }
    ],
    corrugationId: null,
    quantity: null,
    onCostValue: null,
    discountValue: null,
    discountId: null
  }),
  computed: {
    getProductData() {
      const inCart = get(this.product, 'inCart', null);
      const isNew = !isNull(inCart) ? !inCart : true;

      return defaults(this.product, {
        isNew
      });
    },
    getName() {
      return get(this.getProductData, 'name');
    },
    getImageUrl() {
      return get(this.getProductData, 'imageUrl');
    },
    getPrice() {
      return get(this.getProductData, 'price');
    },
    getStyle() {
      return get(this.getProductData, 'style');
    },
    getQuantity() {
      return get(this.$data, 'quantity');
    },
    getOnCostId() {
      return get(this.$data, 'onCostId');
    },
    getOnCostValue() {
      return this.onCostValue;
    },
    getCorrugationId() {
      return get(this.$data, 'corrugationId');
    },
    showOnCost() {
      return isFinite(this.getSelectedOnCostId);
    },
    getSelectedOnCostId() {
      const corrugationId = this.getCorrugationId;
      const corrugation = this.corrugations.find(({ id }) => corrugationId === id);
      let onCostId = null;
      // eslint-disable-next-line no-cond-assign
      if (isFinite(corrugationId) && isObject(corrugation) && (onCostId = get(corrugation, 'onCostId'))) {
        return onCostId;
      }

      return null;
    },
    getDiscountId() {
      return get(this.$data, 'discountId');
    },
    getDiscountValue() {
      return get(this.$data, 'discountValue');
    },
    getOnCostAmount() {
      const selectedOnCostId = this.getSelectedOnCostId;
      const value = this.getOnCostValue;
      const quantity = this.getQuantity;

      switch (selectedOnCostId) {
        case 1:
          return value;

        case 2:
          return value * quantity;

        default:
          return 0;
      }
    },
    getAmount() {
      return round(this.getAmountBeforeDiscount - this.getDiscountAmount, 2);
    },
    getAmountBeforeDiscount() {
      return this.getPrice * this.getQuantity + this.getOnCostAmount;
    },
    getDiscountAmount() {
      const selectedDiscountId = this.getDiscountId;
      const value = this.getDiscountValue;
      const amountBeforeDiscount = this.getAmountBeforeDiscount;

      switch (selectedDiscountId) {
        case 1:
          return value;

        case 2:
          return (value / 100) * amountBeforeDiscount;

        default:
          return 0;
      }
    },
    getDisplayedAmount() {
      const hasIntl = isObject(window.Intl);
      const amount = this.getAmount;

      if (!hasIntl) {
        return amount;
      }

      const numberFormat = Intl.NumberFormat('en-us');
      return numberFormat.format(amount);
    }
  },
  watch: {
    async showOnCost(recent) {
      await this.$nextTick();
      if (recent) {
        const { onCostValueInput } = this.$refs;
        onCostValueInput.focus({
          preventScroll: false
        });
      }
    }
  },
  mounted() {
    // eslint-disable-next-line no-underscore-dangle
    this.quantity = get(this.getProductData, 'quantity', 0);
  },
  methods: {
    addDiscount() {
      this.hasDiscount = true;
    },
    removeDiscount() {
      this.hasDiscount = false;
    },
    handleControl(key) {
      switch (key) {
        case 'save':
          this.$emit('update:cart', this.productData);
          break;
        default:
          this.$emit('remove:cart');
      }
    }
  }
};
</script>

<style lang="less" scoped>
.product {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  background-color: rgb(255, 255, 255);

  > .content {
    &:extend(.product);
    margin: 0 10px 10px 10px;
    flex-wrap: nowrap;
    background-color: rgb(240, 240, 240);
    border-bottom: 5px solid rgb(0, 0, 0);

    > .image {
      display: inline-flex;
      position: relative;
      width: 150px;
      height: 180px;
      flex-shrink: 0;
      background: rgb(224, 224, 224);
    }

    > .details {
      display: inline-flex;
      flex-wrap: wrap;
      flex-grow: 1;
      padding: 20px 10px;
      align-items: flex-start;
      align-content: flex-start;

      > * {
        display: inline-flex;
        white-space: normal;
        width: 100%;
        word-wrap: break-word;
        text-transform: capitalize;

        &:not(:nth-child(1)) {
          margin-top: 5px;
        }
      }

      > .name {
        font-size: 30px;
        font-weight: 900;
      }

      > .style {
        font-size: 16px;
        font-weight: 600;
        color: rgb(146, 146, 146);
      }

      > .price {
        margin-top: 15px;
        font-weight: 900;
        font-size: 30px;

        &::before {
          content: ' \20A6';
        }
      }
    }

    &::v-deep > .vs__dropdown-toggle {
      width: 100%;
    }
  }

  > .inputs {
    &:extend(.product > .content);
    border-bottom: unset;
    flex-wrap: wrap;
    margin: unset;
    padding: 30px 25px 10px 25px;
    background-color: inherit;

    .block-wrapper {
      width: 100%;
      display: block;

      > .select {
        &::v-deep > .vs__dropdown-toggle {
          min-height: 40px;
        }
      }
    }

    > .input {
      display: flex;
      width: 100%;
      flex-wrap: nowrap;
      margin-top: 25px;

      > .title {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: flex-start;
        word-wrap: break-word;
        text-transform: capitalize;
        font-size: 18px;
        font-weight: 800;

        > .remove {
          display: flex;
          width: auto;
          justify-content: center;
          align-items: center;
          font-size: 30px;
          color: rgb(192, 27, 27);
          font-weight: 900;
          background-color: transparent;
          border: unset;
          outline: unset;
        }
      }

      > .field {
        display: flex;
        flex-wrap: wrap;
        flex-shrink: 0;
        height: auto;
        border: 2px solid rgb(100, 100, 100);
        border-radius: 10px;
        width: 60%;

        &.multiple {
          border: unset;

          > * {
            width: 100%;
            margin-top: 10px;
          }

          > input {
            border: 1px solid rgb(100, 100, 100);
            border-radius: 10px;
            margin-top: unset;

            &:focus {
              border: 1px solid rgb(192, 27, 27);
            }
          }
        }

        &.input {
          overflow: hidden;
        }

        > input {
          min-height: 40px;
          width: 100%;
          border: unset;
          outline: unset;

          &:disabled {
            background-color: rgba(100, 100, 100, 0.5);
          }
        }
      }
    }
  }

  > .amount {
    #flex;
    justify-content: center;
    margin: 25px 10px 0 10px;
    font-size: 30px;
    font-weight: 900;
    text-transform: uppercase;
  }

  > .actions {
    #flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    margin: 10px;

    > button {
      #flex;
      outline: unset;
      border: 1px solid rgba(100, 100, 100, 0.9);
      border-radius: 15px;
      background-color: rgba(255, 255, 255);
      color: rgb(0, 0, 0);
      justify-content: center;
      align-items: center;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 15px;
      transition: all 0.3s ease-in;
      margin: 15px 15px 0 0;
      width: auto;
      padding: 20px 15px;

      &.active,
      &:hover {
        background-color: rgb(192, 27, 27);
        color: rgb(224, 224, 224);
        border-color: rgb(224, 224, 224);
      }
    }
  }

  > .controls {
    #flex;
    flex-wrap: wrap;
    padding: 20px;
    margin-top: 20px;
    border: unset;
    box-shadow: 0 -1px 10px 0 rgb(182, 182, 182);

    > button {
      &:extend(.product > .actions > button);
      width: 100%;
      border-radius: 30px;
      margin: 10px 0 0 0;

      &.active {
        &:extend(.product > .actions > button.active);
      }
    }
  }

  #flex() {
    width: 100%;
    display: flex;
  }
}
</style>
