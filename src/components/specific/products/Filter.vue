<template>
  <div class="filters">
    <div class="filter origin">
      <div class="title">Origin</div>
      <div class="contents">
        <div v-for="{ name } in origins" :key="name" class="item">
          <InputButton :name="name" type="checkbox" :data-name="name" @change.native.stop="updateSelectedOrigins">
            {{ name }}
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
            :data-name="color"
            color="danger-o"
            off-color="default-o"
            toggle
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
      <div class="contents"></div>
    </div>
    <div class="filter guage">
      <div class="title">Guage</div>
      <div class="contents"></div>
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
import { union, pull } from 'lodash';

export default {
  components: {
    prettyCheckBox,
    InputButton
  },
  data() {
    return {
      origins: [
        {
          name: 'foreign'
        },
        {
          name: 'local'
        },
        {
          name: 'stucco',
          allowColor: false
        }
      ],
      colors: ['red', 'green', 'blue', 'pink', 'yellow', 'purple', 'dark', 'black'],
      selected: {
        origins: [],
        colors: [],
        styless: [],
        guages: []
      }
    };
  },
  methods: {
    updateSelectedOrigins(e) {
      const { name } = e.target.dataset;
      const { origins } = this.$data.selected;
      const input = e.target;

      this.$set(this.$data.selected, 'origins', input.checked ? union(origins, [name]) : pull(origins, name));
    }
  }
};
</script>

<style lang="less" scoped>
.filters {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: rgb(245, 245, 245);

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

      > .item {
        display: inline-block;
      }
    }

    &.filter:nth-child(odd) {
      background: rgb(255, 255, 255);
      box-shadow: 0px 3px 4px 0px rgb(100, 100, 100);
    }
  }
}
</style>
