<template>
  <button class="pill" :style="{ 'background-color': getBackgroundColor }">
    {{ getName }}
  </button>
</template>

<script>
import { isString, get, defaults } from 'lodash';

export default {
  props: {
    pillData: {
      required: true,
      type: Object,
      validator($data) {
        return isString(get($data, 'name', null));
      }
    }
  },
  computed: {
    getPillData() {
      return defaults(this.pillData, {
        color: 'rgb(8, 0, 54)'
      });
    },
    getName() {
      return this.getPillData.name;
    },
    getBackgroundColor() {
      return this.getPillData.color;
    }
  }
};
</script>

<style lang="less" scoped>
.pill {
  height: auto;
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  background-color: rgb(8, 0, 54);
  border-radius: 25px;
  color: rgb(255, 255, 255);
  padding: 15px 40px;
  outline: unset;
  border: unset;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
