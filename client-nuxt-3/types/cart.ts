interface CartItem {
  id: string
  name: string
  photo: string
  price: number
  count: number
}

interface Cart {
  items: CartItem[]
  totalPrice: number
  count: number
}

export {
  CartItem,
  Cart
}
