<template>
  <div class="register">
    <label for="name">Name</label>
    <input type="text" class="name" />

    <label for="phone">Phone</label>
    <input type="text" class="phone" />

    <label for="company">Company Name</label>
    <input type="text" class="company" />

    <div class="controls">
      <button class="new-customer">old customer?</button>
      <button class="register">
        Register
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.register {
  display: flex;
  width: 100%;
  height: auto;
  flex-wrap: wrap;

  > * {
    display: flex;
    width: 100%;
  }

  > label {
    margin-top: 15px;
    font-size: 12px;
    font-weight: 300;
    padding: 10px;
    padding-bottom: 0px;
    border-radius: 5px 5px 0 0;
    border: unset;
    background-color: rgb(255, 255, 255);
  }

  > input {
    &:extend(.register > label);
    margin-top: unset;
    font-size: 14px;
    font-weight: 600;
    padding-bottom: 10px;
    border-radius: 0 0 5px 5px;

    &:focus {
      border: unset;
      outline: unset;
    }
  }

  > .controls {
    margin-top: 50px;
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

    > .register {
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
