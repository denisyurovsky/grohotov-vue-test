<template>
  <div class="card-list__header">
<span>
  Просмотренные товары
</span>
    <div class="cart__buttons">
      <button class="buttons__prev" @click="showPrevItems"> &#65308; </button>
      <span>{{page}} / {{totalItems / 4}}</span>
      <button class="buttons__next" @click="showNextItems"> &#xFF1E; </button>
    </div>
  </div>
  <div class="cards-wrapper">
  <div v-for="(item) in items">
    <div class="card-wrapper">
    <img :src= item.img alt="image" />
    <div class="card__info">
      <span>{{item.name}}</span>
      <span>{{item.description}}</span>
    </div>
    <div class="card__prices">
      <span>{{item.price.min}}₽ - {{item.price.max}}₽</span>
      <span class="card__prices-eu"> {{item.euPrice.min}}€ - {{item.euPrice.max}}€</span>
    </div>
        <button @click ="addToCart(item.id)" class="card-button">
          добавить
        </button>
    </div>
  </div>
  </div>
</template>

<script>

export default {

  computed: {
    items: function () {
      return this.items
    },
    totalItems: function() {
      return this.$store.state.totalItems
    },
  },
  data() {
    return {
      page: 1
    }
    },
  props: {
    items: {
      type: Array,
      required: true
    }
  },methods: {
    addToCart: function (id) {
      return this.$store.commit('addToCart', {id: id})
    },
      showNextItems() {

      if (this.page >= this.totalItems / 4) {
        return;
      }
        this.page++
        this.$store.commit('nextItems', {page: this.page})
      },
      showPrevItems() {

      if (this.page <= 1) {
        return
        }
        this.page--
        this.$store.commit('prevItems', {page: this.page})
      }
    }
}
</script>

<style>

.card-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-list__header > span {
  font-weight: 600;
  font-size: 30px;
}

.buttons__prev, .buttons__next {
  border: none;
  width: 50px;
  height: 50px;
  background: #90A2B5;
  color: white;
  border-radius: 50%;
  font-size: 20px;
  margin: 20px;
}

.card-wrapper {
  padding: 25px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  background: #F6F8FA;
}

@media screen and (max-width: 840px) {
  .card-list__header {
    flex-direction: column;
    justify-content: space-evenly;
  }
}

.cards-wrapper {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 20px;
}
.card-wrapper img {
  height: 245px;
  width: 245px;
}

.card__info {
  margin-bottom: 60px;
}

.card__info span:first-child {
  font-size: 22px;
  font-weight: 700;
  color: #1F2432;
}

.card__prices {
  font-size: 22px;
  margin-bottom: 20px;
}

.card__prices-eu {
  font-size: 16px;
  color: #797B86;
}

.card__info, .card__prices{
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-button {
  font-size: 16px;
  color: white;
  border: none;
  height: 52px;
  background: #0069B4;
  border-radius: 4px;
  position: relative;
  bottom: 0
}
</style>