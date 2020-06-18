<template>
  <div class="container">
    <button class="home">
      <HomeSvg class="icon" :view-box="viewBoxString" />
      <span class="text">Home</span>
    </button>
    <button class="store">
      <StoreSvg class="icon" :view-box="viewBoxString" />
      <span class="text">Store</span>
    </button>
    <button class="cart">
      <CartSvg class="icon" :view-box="viewBoxString" />
      <span class="text">Cart</span>
    </button>
    <button class="customers">
      <CustomerSvg class="icon" :view-box="viewBoxString" />
      <span class="text">Customers</span>
    </button>
    <button class="profile">
      <ProfileSvg class="icon" :view-box="viewBoxString" />
      <span class="text">Profile</span>
    </button>
  </div>
</template>

<script>
import HomeSvg from '@/assets/svg/001-home.svg';
import StoreSvg from '@/assets/svg/002-store.svg';
import CartSvg from '@/assets/svg/003-cart.svg';
import CustomerSvg from '@/assets/svg/004-group-of-students.svg';
import ProfileSvg from '@/assets/svg/005-user.svg';

export default {
  name: 'ButtomNav',
  components: {
    HomeSvg,
    StoreSvg,
    CartSvg,
    CustomerSvg,
    ProfileSvg
  },
  data() {
    return {
      viewBoxString: '0 0 512 512'
    };
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  background-color: rgb(255, 255, 255);
  border-radius: 20px 20px 0 0;
  box-shadow: 2px 2px 7px rgb(150, 150, 150);
  overflow: hidden;

  > button {
    background-color: inherit;
    display: flex;
    width: calc(100% / 5);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: unset;
    box-shadow: unset;

    > .icon {
      width: 40px;
      height: 40px;
    }

    > .text {
      display: flex;
      margin-top: 10px;
      justify-content: center;
      align-items: flex-start;
    }
  }
}
</style>
