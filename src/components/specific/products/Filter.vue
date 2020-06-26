<template>
  <div class="filters-d">
    <div class="filter origin">
      <div class="title">Origin</div>
      <div class="contents">
        <div v-for="origin in origins" :key="origin" class="item">
          <InputButton
            :name="origin"
            type="checkbox"
            :checked="checkChecked('origins', origin)"
            @change.native.stop="updateSelectedOrigins"
          >
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
            :checked="checkChecked('colors', color)"
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
          <InputButton
            :name="style"
            type="checkbox"
            :checked="checkChecked('styles', style)"
            @change.native.stop="updateSelectedStyles"
          >
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
            :checked="checkChecked('guages', guage)"
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
      <InputButton name="discard" type="checkbox" :styles="discardButtonStyles" @change.native.stop="runAction">
        Discard
      </InputButton>
      <InputButton name="apply" type="checkbox" :styles="applyButtonStyles" @change.native.stop="runAction">
        Apply
      </InputButton>
    </div>
  </div>
</template>

<script>
import 'pretty-checkbox/dist/pretty-checkbox.min.css';
import prettyCheckBox from 'pretty-checkbox-vue/check';
import InputButton from '@/components/specific/InputButton.vue';
import { union, pull, curry, round, get, indexOf } from 'lodash';

export default {
  components: {
    prettyCheckBox,
    InputButton
  },
  props: {
    defaultSelected: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data() {
    const guages = [];
    const styles = {
      borderRadius: '30px',
      padding: '15px 30px'
    };
    let current = 0.1;

    while (current <= 1) {
      guages.push(String(current));
      current += 0.05;
      current = round(current, 2);
    }

    return {
      origins: ['foreign', 'local', 'stucco'],
      colors: ['red', 'green', 'blue', 'pink', 'yellow', 'purple', 'dark', 'black'],
      styles: ['old embossed', 'new embossed'],
      guages,
      discardShowShadw: false,
      discardButtonStyles: {
        ...styles
      },
      applyButtonStyles: {
        ...styles,
        backgroundColor: 'rgb(204, 50, 50)',
        color: 'rgb(255,255,255)',
        boxShadow: '0 3px 3px 0 rgb(100,100,100)'
      },
      selected: null
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
    },
    getDefaultSelected() {
      const list = ['origins', 'colors', 'styles', 'guages'];
      const selected = this.defaultSelected;
      const filtered = {};

      list.forEach((item) => {
        filtered[item] = get(selected, item, []);
      });
      return filtered;
    },
    checkChecked() {
      const defaultSelected = this.getDefaultSelected;
      return (key, name) => {
        const isChecked = indexOf(get(defaultSelected, key, []), name, 0) !== -1;
        return isChecked;
      };
    }
  },
  mounted() {
    this.$set(this.$data, 'selected', this.getDefaultSelected);
  },
  methods: {
    updateSelectedHandler(storeName, e) {
      const name = e.target.getAttribute('name');
      const { [storeName]: store } = this.$data.selected;
      const input = e.target;

      this.$set(this.$data.selected, storeName, input.checked ? union(store, [name]) : pull(store, name));
    },
    runAction(e) {
      const button = e.target.getAttribute('name');

      switch (button) {
        case 'discard':
          this.$emit('remove:filter');
          break;
        default:
          this.$emit('update:filter', this.$data.selected);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.filters-d {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  background-color: rgb(248, 248, 248);

  > * {
    &:extend(.filters-d);
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

  > .actions {
    display: flex;
    width: 100%;
    margin-bottom: unset;
    margin-top: 15px;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 -3px 5px 0 rgb(100, 100, 100);

    > * {
      margin-right: 20px;
    }
  }
}
</style>
