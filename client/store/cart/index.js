export const mutations = {
  setInitialData(state, data) {
    state.items = data
    state.count = data.length
  },
  clearOrder(state) {
    state.items = []
    state.count = 0
  },
  changeCart(state, data) {
    if (data.item.count === 0) {
      state.items = state.items.filter((x) => x.id !== data.item.id)
      state.count -= 1
      localStorage.setItem('cart', JSON.stringify(state.items))
    } else {
      state.items[data.idx] = data.item
      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  },
  setItem(state, item) {
    state.items.push(item)
    state.count += 1
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  changeTotalPrice(state, price) {
    state.totalPrice = price
  }
}

export const actions = {
  getInitialData({ commit }) {
    if (!localStorage.cart) return
    const cart = JSON.parse(localStorage.getItem('cart'))
    const totalPrice = cart.reduce((acc, x) => acc + (x.count * x.price), 0)
    commit('setInitialData', cart)
    commit('changeTotalPrice', totalPrice)
  },
  getProduct({ commit, state }, data) {
    const { item, action } = data
    let check = false
    for (let i = 0; i < state.items.length; i += 1) {
      if (state.items[i].id === item.id) {
        check = true
        const count = action === 'add' ? state.items[i].count + 1 : state.items[i].count - 1
        const price = action === 'add' ? state.totalPrice + item.price : state.totalPrice - item.price
        commit('changeCart', {
          item: { ...item, count },
          idx: i
        })
        commit('changeTotalPrice', price)
        break
      }
    }

    if (!check) {
      const cartItem = { ...item, count: 1 }
      commit('setItem', cartItem)
      commit('changeTotalPrice', state.totalPrice + item.price)
    }
  }
}

export const getters = {
  countCart(state) {
    return state.count
  },
  cartItems(state) {
    return state.items
  }
}

export const state = () => ({
  count: 0,
  items: [],
  totalPrice: 0
})
