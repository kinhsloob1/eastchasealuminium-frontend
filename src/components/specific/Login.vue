<template>
  <div class="login">
    <label for="email">Email</label>
    <input type="email" class="email" />

    <label for="password">Password</label>
    <input type="password" class="password" />

    <button type="submit" class="submit">Login</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.login {
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
    &:extend(.login > label);
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

  > button {
    margin-top: 20px;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 0, 0);
    border-radius: 25px;
    font-size: 16px;
    justify-content: center;
    align-items: center;
    border: unset;
    outline: unset;
    padding: 15px;
  }
}
</style>
