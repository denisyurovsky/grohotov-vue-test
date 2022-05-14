<template>
  <div class="cart-title">
    Ваша корзина
    <span class="cart__total-items">
    Кол-во товаров: {{ totalItems }}
      <button @click="$store.commit('removeCart')">
        Очистить корзину
      </button>
  </span>
  </div>
  <div class="wrapper">
    <div class="cart-wrapper">
      <div v-if="!cart.length">Корзина пуста</div>
      <div v-else v-for="item in cart">
        <div class="cart__card">
          <div @click="removeItem(item.id)" class="card__cancel-button">&#10005;</div>
          <img :src=item.img alt="image"/>
          <div class="card__description">
        <span class="description__name">
          {{ item.name }}
        </span>
            <span class="description__info">
           {{ item.info }}
        </span>
            <span class="description__article">
          Артикул: {{ item.article }}
        </span>
          </div>
          <div class="card__count">
            <button @click="decrementItem(item.id)">-</button>
            <input :value=item.count />
            <button @click="incrementItem(item.id)">+</button>
            <div v-if="item.count > 1">{{ item.price.min }} ₽/шт.</div>
          </div>
          <div class="card__total-count">
            {{ item.price.min * item.count }} ₽
          </div>
        </div>
      </div>
    </div>
    <div class="total">
      <div>Итого</div>
      <div>
        <div class="total__wrapper">
          <span>Сумма заказа</span>
          <span>{{ totalPrice }} ₽</span>
        </div>
        <div class="total__wrapper">
          <span>Количество</span>
          <span>{{ totalItems }} шт.</span>
        </div>
        <div class="total__wrapper">
          <span>Установка</span>
          <span>{{ installation ? 'Да' : 'Нет' }}</span>
        </div>
        <hr>
        <div class=" total__wrapper total__total-price">
          <span>Сумма заказа</span>
          <span>{{ totalPrice }} ₽</span>
        </div>
      </div>
      <button class="card-button card-button__blue" @click="sendToServer">Оформить заказ</button>
      <button class="card-button card-button__white">Купить в 1 клик</button>
    </div>
  </div>
  <div class="cart__installation">
    <input v-model="installation" id="checkbox" type='checkbox'/>
    <img src="../assets/Group.png" alt="image"/>
    <div>
      <div>Установка</div>
      <label for="checkbox">Отметьте, если Вам необходима консультация профессионала по монтажу выбранных
        товаров.</label>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      installation: false
    }
  },
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalItems: function () {
      return this.$store.state.cart.reduce((acc, item) => {
        acc += item.count
        return acc
      }, 0)
    },
    totalPrice: function () {
      return this.$store.state.cart.reduce((acc, item) => {
        acc += item.price.min * item.count
        return acc
      }, 0)
    }
  },
  methods: {
    incrementItem: function (id) {
      return this.$store.commit('incrementItem', {id: id})
    },
    decrementItem: function (id) {
      return this.$store.commit('decrementItem', {id: id})
    },
    removeItem: function (id) {
      return this.$store.commit('removeItem', {id: id})
    },
    sendToServer: function() {
      const items = this.$store.state.cart.map((item) => {
        return {
          id: item.id,
          price: item.price.min,
          name: item.name,
          article: item.article,
          count: item.count
        }
      })
      console.log(items)
    }
  }
}
</script>

<style scoped>

.card-button {
  font-size: 16px;
  border: none;
  height: 52px;
  border-radius: 4px;
}

.card-button__blue {
  background: #0069B4;
  color: white;
}

.card-button__white {

  background: white;
  color: #0069B4;
  border: 1px solid #0069B4;
}

.wrapper {
  display: flex;
  width: 100%;
  align-items: center;
}

.total__total-price {
  font-weight: 600;
  font-size: 18px;
}

.total__total-price:last-child {
  font-weight: 700;
  font-size: 26px;
}

.total__wrapper {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 20px;
}

.total {
  background: #F6F8FA;
  border-radius: 5px;
  width: 100%;
  min-height: 460px;
  padding: 32px;
  font-weight: 600;
  font-size: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

@media screen and (max-width: 1260px) {
  .wrapper {
    flex-direction: column;
  }

  .total {
    min-width: 100%;
  }
}

.cart__installation {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cart-title button {
  position: absolute;
  right: 40px;
  top: 20px;
  border: none;
  text-decoration: underline;
  background: none;
}

.cart-title {
  font-weight: 700;
  font-size: 40px;
  position: relative;
  max-width: 800px;
  color: #1F2432;
}

.cart__card {
  display: flex;
  align-items: center;
  min-width: 100%;
  position: relative;
  gap: 40px;
  padding: 12px;
  border-bottom: 1px solid #C4C4C4;
}

.card__cancel-button {
  position: absolute;
  top: 8px;
  right: 8px;
}

.card__description {
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-wrap: break-word;
  max-width: 360px;
}

.description__name {
  font-weight: 600;
  font-size: 16px;
}

.description__info {
  font-size: 12px;
}

.description__article, .cart__total-items, .cart-title button, label {
  font-size: 14px;
  color: #797B86;
}

.cart__card img {
  min-width: 100px;
  min-height: 100px;
}

.cart-wrapper {
  min-width: 800px;
  display: flex;
  flex-direction: column;
  min-height: 125px;
  justify-content: center;
}

.card__count {
  height: 34px;
  width: 102px;
  border-radius: 4px;
}

.card__count button, input {
  height: 32px;
  width: 32px;
  border: none;
  background: #F6F8FA;
  text-align: center;
}
</style>