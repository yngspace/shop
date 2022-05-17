import { NuxtLink } from '~~/.nuxt/components'

export default defineComponent({
  setup() {
    const route = useRoute()
    const navList = [
      { name: 'Категории', link: '/admin/categories' },
      { name: 'Товары', link: '/admin/products' },
      { name: 'Настройки', link: '/admin/meta' },

    ]
    return (): JSX.Element => (
      <nav class="admin-nav">
        {navList.map(item =>
          <NuxtLink
            class={{
              'default-button': true,
              'primary-button': route.path === item.link
            }} to={item.link}>{item.name}</NuxtLink>
        )}
      </nav>
    )
  }
})
