<template>
  <div class="filters">
    <div class="filter origin">
      <div class="title">Origin</div>
      <div class="contents">
        <div v-for="origin in origins" :key="origin" class="item">
          <InputButton :name="origin" type="checkbox" @change.native.stop="updateSelectedOrigins">
            {{ origin }}
          </InputButton>
        </div>
      </div>
    </div>
    <div class="filter color">
      <div class="title">Color</div>
      <div class="grid">
        <div v-for="color in colors" :key="color" class="item">
          <prettyCheckBox
            class="p-pulse p-default"
            :name="color"
            color="danger-o"
            off-color="default-o"
            toggle
            @change.native.stop="updateSelectedColors"
          >
            {{ color }}
            <template #off-label>
              <label>{{ color }}</label>
            </template>
          </prettyCheckBox>
        </div>
      </div>
    </div>
    <div class="filter style">
      <div class="title">Style</div>
      <div class="contents">
        <div v-for="style in styles" :key="style" class="item">
          <InputButton :name="style" type="checkbox" @change.native.stop="updateSelectedStyles">
            {{ style }}
          </InputButton>
        </div>
      </div>
    </div>
    <div class="filter guage">
      <div class="title">Guage</div>
      <div class="grid">
        <div v-for="guage in guages" :key="guage" class="item">
          <prettyCheckBox
            class="p-pulse p-default"
            :name="guage"
            color="danger-o"
            off-color="default-o"
            toggle
            @change.native.stop="updateSelectedGuages"
          >
            {{ guage }}
            <template #off-label>
              <label>{{ guage }}</label>
            </template>
          </prettyCheckBox>
        </div>
      </div>
    </div>

    <div class="actions">
      <button class="discard"></button>
      <button class="apply"></button>
    </div>
  </div>
</template>

<script>
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import prettyCheckBox from 'pretty-checkbox-vue/check';
import InputButton from '@/components/specific/InputButton.vue';
import { union, pull, curry, round } from 'lodash';

export default {
  components: {
    prettyCheckBox,
    InputButton
  },
  data() {
    const guages = [];
    let current = 0.1;

    while (current <= 1) {
      guages.push(current);
      current += 0.05;
      current = round(current, 2);
    }

    return {
      origins: ['foreign', 'local', 'stucco'],
      colors: ['red', 'green', 'blue', 'pink', 'yellow', 'purple', 'dark', 'black'],
      styles: ['old embossed', 'new embossed'],
      guages,
      selected: {
        origins: [],
        colors: [],
        styles: [],
        guages: []
      }
    };
  },
  computed: {
    updateSelectedOrigins() {
      return curry(this.updateSelectedHandler)('origins');
    },
    updateSelectedColors() {
      return curry(this.updateSelectedHandler)('colors');
    },
    updateSelectedStyles() {
      return curry(this.updateSelectedHandler)('styles');
    },
    updateSelectedGuages() {
      return curry(this.updateSelectedHandler)('guages');
    }
  },
  methods: {
    updateSelectedHandler(storeName, e) {
      const name = e.target.getAttribute('name');
      const { [storeName]: store } = this.$data.selected;
      const input = e.target;

      this.$set(this.$data.selected, storeName, input.checked ? union(store, [name]) : pull(store, name));
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(248, 248, 248);

  > * {
    &:extend(.filters);
    padding: 15px;
    background-color: inherit;
    margin-bottom: 10px;

    > .title {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-weight: 700;
      text-transform: capitalize;
    }

    > .contents {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 1;
      align-items: center;
      width: 100%;
      white-space: pre-wrap;
      justify-items: flex-start;
      justify-content: flex-start;

      > .item {
        border: unset;
        display: inline-flex;
        padding: 0;
        margin: 20px 15px 0 0px;
      }
    }

    > .grid {
      display: grid;
      margin-top: 20px;
      width: 100%;
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
      grid-gap: 1rem;
    }

    &.filter:nth-child(odd) {
      background: rgb(255, 255, 255);
      box-shadow: 0px 3px 4px 0px rgb(100, 100, 100);
    }
  }
}
</style>
