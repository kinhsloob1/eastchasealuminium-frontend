<template>
  <div class="select">
    <input type="text" class="search" placeholder="Customer details" />
    <div class="display-container">
      <button v-for="i in 5" :key="i" class="customer">Okafor & sons</button>
    </div>
    <div class="controls">
      <button class="new-customer">New customer?</button>
      <button class="next">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.select {
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;

  > .search {
    &:extend(.select);
    height: 50px;
    border-radius: 10px;
    border: 1px solid rgb(58, 0, 58);
    background-color: rgb(255, 255, 255);
    overflow: hidden;
    padding-left: 20px;

    &:focus {
      border: 1px solid rgb(58, 0, 58);
      outline: unset;
    }
  }

  > .display-container {
    &:extend(.select);
    background-color: rgb(255, 255, 255);
    flex-wrap: wrap;
    padding: 15px;

    > .customer {
      &:extend(.select > .display-container);
      justify-content: flex-start;
      align-items: center;
      outline: unset;
      border: unset;
      width: 100%;
    }
  }

  > .controls {
    margin-top: 100px;
    margin-bottom: 10px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    > button {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      padding: 15px 10px;
      background-color: transparent;
      outline: unset;
      border: unset;
    }

    > .next {
      background-color: rgb(255, 0, 0);
      border-radius: 25px;
      font-weight: 900;
      text-transform: uppercase;
      color: rgb(255, 255, 255);
      margin-top: 15px;
    }
  }
}
</style>
