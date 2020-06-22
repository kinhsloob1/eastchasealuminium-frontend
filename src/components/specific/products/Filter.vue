<template>
  <div class="filters">
    <div class="filter origin">
      <div class="title">Origin</div>
      <div class="contents">
        <prettyRadio
          v-for="{ name } in origins"
          :key="name"
          name="origin"
          class="inputs p-pulse p-switch"
          color="danger"
          off-color="default"
          toggle
        >
          {{ name }} (selected)
          <template #off-label>
            <label> {{ name }}</label>
          </template>
        </prettyRadio>
      </div>
    </div>
    <div class="filter color">
      <div class="title">Color</div>
      <div class="contents"></div>
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
import prettyRadio from 'pretty-checkbox-vue/radio';

export default {
  components: {
    prettyRadio
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
      ]
    };
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
      margin-top: 20px;
      width: 100%;
      white-space: pre-wrap;

      .inputs {
        display: inline-flex;
        width: auto;
        margin: 10px 0 0 15px;
        font-size: 20px;
      }
    }

    &.filter:nth-child(even) {
      background: rgb(255, 255, 255);
      box-shadow: 0px 3px 4px 0px rgb(100, 100, 100);
    }
  }
}
</style>
