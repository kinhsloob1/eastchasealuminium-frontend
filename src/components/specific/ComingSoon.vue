<template>
  <div class="container">
    <div class="image">
      <img :src="getImage" />
    </div>
    <div class="text">coming soon !!!</div>
  </div>
</template>

<script>
import constructionImage from '@/assets/images/under-construction.png';

export default {
  computed: {
    getImage() {
      return constructionImage;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-size: 13px;
  font-weight: 900;
  color: rgb(80, 80, 80);
  background-color: rgb(255, 255, 255);
  flex-wrap: wrap;

  > .image {
    &:extend(.container);
    color: unset;
    height: auto;
    display: relative;

    > img {
      display: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      object-fit: cover;
      width: 60%;
      height: 50%;
    }
  }

  > .text {
    width: 100%;
    display: flex;
    font-size: 140%;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>
