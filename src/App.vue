<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    const loader = this.$loading.show({
      loader: 'bars',
      width: 200,
      height: 500
    });

    setTimeout(() => {
      loader.hide();
    }, 3000);

    console.log(this.$data.$isMobileOnly);
  }
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background-color: rgb(245, 245, 245);

  > #app {
    &:extend(body);
  }
}
</style>
