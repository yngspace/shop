import { ComputedRef } from 'nuxt/dist/app/compat/capi'
import { actions, store } from '~~/store'
import { Product } from '~~/types/product'

interface Props {
  item: Product
}

export default ({ item }: Props) => {
  const config = useRuntimeConfig().public
  const imgUrl: ComputedRef<string> = computed((): string => {
    if (item.photos.length) return config.SERVER_HOST + item.photos[0].name
    return ''
  })

  const count = computed(() => {
    const current = store.cart.items.find((x) => x.id === item.id)
    if (current) return current.count
    return 0
  })

  return (
    <div class="product-card">
      {imgUrl.value
        ? <img
          class="product-card-image"
          src={imgUrl.value}
        />
        : <div class="product-card-image product-card-image--default"/>
      }
      <div class="product-card-body">
        <p class="title">{item.name}</p>
        <div class="line"/>
        <div class="row">
          <span class="price">{item.price}</span>
          <span class="remove" onClick={() => actions.changeOrder(item, 'remove')}>-</span>
          <span class="count">{count.value}</span>
          <span class="add" onClick={() => actions.changeOrder(item, 'add')}>+</span>
        </div>
      </div>
    </div>
  )
}
