import { createStore } from 'vuex'
import {nanoid} from "nanoid";

const initialState = [
  {
    id: nanoid(),
    name: 'BXC',
    article: 'G2H1065',
    description: 'Вытяжное устройство для механической системы вентиляции',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 6_848,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/bxc.png'),
  },
  {
    id: nanoid(),
    name: 'G2H',
    article: 'G2H1065',
    description: 'Многофункциональное вытяжное устройство для естественной и гибридной вентиляции',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 10000 ,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/g2h.png'),
  },
  {
    id: nanoid(),
    name: 'GHN',
    article: 'G2H1065',
    description: 'Вытяжное устройство с датчиком присутствия',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 7_499,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/ghn.png'),
  },
  {
    id: nanoid(),
    name: 'TDA',
    article: 'G2H1065',
    description: 'Вытяжное устройство с датчиком присутствия',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 3499 ,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/tda.png'),
  },
  {
    id: nanoid(),
    name: 'BXC v2',
    article: 'G2H1065',
    description: 'Вытяжное устройство для механической системы вентиляции',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 6_848 ,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/bxc.png'),
  },
  {
    id: nanoid(),
    name: 'G2H v2',
    article: 'G2H1065',
    description: 'Многофункциональное вытяжное устройство для естественной и гибридной вентиляции',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 7_499 ,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/g2h.png'),
  },
  {
    id: nanoid(),
    name: 'GHN v2',
    article: 'G2H1065',
    description: 'Вытяжное устройство с датчиком присутствия',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 6_848 ,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/ghn.png'),
  },
  {
    id: nanoid(),
    name: 'TDA v2',
    article: 'G2H1065',
    description: 'Вытяжное устройство с датчиком присутствия',
    info: '12-72/168 м3/ч / гидрорегулируемый расход // от датчика присутствия',
    price: {
      min: 6_848 ,
      max: 56_584
    },
    euPrice: {
      min: 77.60,
      max: 643.86
    },
    img: require('@/assets/tda.png'),
  },
]

export default createStore({
  state: {
    items: initialState.slice(0,4),
    cart: [],
    totalItems: initialState.length
  },
  getters: {
      getItems: state => state.items,
      getCart: state => state.cart,
      getTotalItems: state => state.totalItems,
  },
  mutations: {
    removeItem(state,payload) {
      return state.cart = state.cart.filter(item => item.id !==payload.id)
    },
    incrementItem(state,payload) {
      const itemToIncr = state.cart.filter((item) => item?.id == payload.id)
      itemToIncr[0].count += 1

    },
    decrementItem(state,payload) {
      const itemToIncr = state.cart.filter((item) => item?.id == payload.id)

      if (itemToIncr[0].count == 1) {
        return state.cart = state.cart.filter(item => item.id !==payload.id)
      }
      itemToIncr[0].count -= 1
    },
    removeCart(state) {
      return state.cart = []
    },
    addToCart(state, payload) {
      const isInCart = state.cart.filter((item) => item?.id == payload.id)

      if (isInCart.length) {
        return isInCart[0]['count'] += 1
      }

      const item = state.items.filter((item) => item.id == payload.id)
      const newItem = {...item[0], count: 1}

     state.cart.push(newItem)
    },
    nextItems(state, payload) {
      state.items = initialState.slice(4*(payload.page - 1), payload.page*4)

    }, prevItems(state, payload) {
      state.items = initialState.slice(4*(payload.page -1), payload.page*4)

    }
  },
  actions: {
  },
  modules: {
  }
})
