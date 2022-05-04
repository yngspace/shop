import { Cart, CartItem } from '~~/types/cart'
import { Categories } from '~~/types/categories'
import { Product } from '~~/types/product'
import { Settings } from '~~/types/settings'

export const store = reactive({
  meta: {} as Settings,
  categories: [] as Categories[],
  cart: {
    items: [],
    totalPrice: 0,
    count: 0
  } as Cart
})

export const mutations = {
  setMeta(meta: Settings): void {
    store.meta = meta
  },
  setCategories(categories: Categories[]): void {
    store.categories = categories
  }
}

export const actions = {
  async fetchMeta(): Promise<void> {
    mutations.setMeta(await useApi('/settings'))
  },
  async fetchCategories(): Promise<void> {
    mutations.setCategories(await useApi('/categories/'))
  },
  changeOrder(item: Product, action: 'add' | 'remove'): void {
    if (action === 'remove' && !store.cart.items.length) return

    let check = false
    for (let i = 0; i < store.cart.items.length; i++) {
      if (store.cart.items[i].id === item.id) {
        if (action === 'add') {
          store.cart.items[i].count += 1
          store.cart.items[i].price += item.price
          store.cart.totalPrice += item.price
        } else if (action === 'remove') {
          store.cart.items[i].count -= 1
          store.cart.items[i].price -= item.price
          if (store.cart.items[i].count === 0) {
            store.cart.items = store.cart.items.filter(x => x.id !== store.cart.items[i].id)
            store.cart.count -= 1
          }
          store.cart.totalPrice -= item.price
        }
        check = true
        break
      }
    }

    if (!check && action !== 'remove') {
      store.cart.items.push({
        id: item.id,
        name: item.name,
        price: item.price,
        photo: item.photos.length ? item.photos[0].name : '',
        count: 1
      })
      store.cart.totalPrice += item.price
      store.cart.count += 1
    }

    localStorage.setItem('cart', JSON.stringify(store.cart))
  },
  getInitialCart(): void {
    if (!localStorage.cart) return

    const data = JSON.parse(localStorage.getItem('cart'))
    store.cart = data
  }
}
