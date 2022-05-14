<template>
  <div class="main">
  <div class="header">
    <div class="cart-wrapper">
      <img src="./assets/cart.png" alt="cart image"/>
      <div class="cart-wrapper__cart">
        <div>Ваша корзина</div>
        <div class="cart__total-count">Кол-во товаров: {{totalCartItems}} </div>
        <div>{{totalPrice}}₽ </div>
      </div>
    </div>
  </div>
  <div class="navigation-wrapper">
    <span>Главная</span>
    <div class="arrow"></div>
    <div class="navigation__cart">Корзина</div>
  </div>
  <Cart v-bind:cart="cart"/>
  <cardList v-bind:items="items"/>
  </div>
</template>


<script>

import cardList from "@/components/cardList";
import Cart from "@/components/Cart"
export default {

  computed: {
    items: function () {
      return this.$store.state.items
    },
    totalCartItems: function () {
      return this.$store.state.cart.reduce((acc, item) => {
        acc += item.count
        return acc
      },0)
    },
    cart: function () {
      return this.$store.state.cart
    },
    totalItems: function() {
      return this.$store.state.totalItems
    },
    totalPrice: function () {
      return this.$store.state.cart.reduce((acc, item) => {
        acc += item.price.min * item.count
        return acc
      }, 0)
    }
  },
  components: {
    cardList,
    Cart,
  },
}
</script>
<style lang="scss">

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  font-family: 'Lato', sans-serif;
}

.header{
  display: flex;
  justify-content: end;
}

.header__cart{
  height: 96px;
  display: flex;
  flex-direction: row;

}

.cart-wrapper {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
}

.cart-wrapper img {
  width: 32px;
  height: 28px;
}

.cart__total-count {
  color: #797B86;
}

.navigation-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
}

.arrow {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 5px;
  border-color: transparent transparent transparent #797B86;
}

.main {
  margin: auto;
  padding: 80px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.navigation__cart {
  color: #797B86;
}

</style>
