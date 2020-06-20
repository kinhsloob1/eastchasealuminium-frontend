<template>
  <div class="controls">
    <button class="new-order">
      New Order
    </button>
    <button class="make-payment">
      Make Payment
    </button>
  </div>
</template>

<style lang="less" scoped>
.controls {
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
    outline: unset;
    border: unset;
    background-color: rgb(255, 0, 0);
    border-radius: 25px;
    font-weight: 900;
    text-transform: capitalize;
    color: rgb(255, 255, 255);
    margin-top: 15px;
  }
}
</style>
