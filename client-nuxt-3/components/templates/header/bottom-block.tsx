import { NuxtLink } from '~~/.nuxt/components'
import { store } from '~~/store'

export default (): JSX.Element => {
  return (
    <nav class="header-bottom nav-list">
      {store.categories.map(item =>
        <NuxtLink
          class="nav-item"
          to={{ name: 'catalog-slug', params: { slug: item.slug } }}>
          {item.name}
        </NuxtLink>
      )}
      <NuxtLink class="nav-item cart">{store.cart.count}</NuxtLink>
    </nav>
  )
}
