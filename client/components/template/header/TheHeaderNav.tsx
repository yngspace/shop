import { NuxtLink } from '~~/.nuxt/components'

export default defineComponent({
  setup() {
    const route = useRoute()
    const navList = [
      { name: 'Главная', link: '/' },
      { name: 'О компании', link: '/about' },
      { name: 'Контакты', link: '/contacts' }
    ]
    return (): JSX.Element => (
      <nav class="header-nav">
        <ul class="header-nav__list">
          {navList.map(item =>
            <li class={{
              'header-nav__item': true,
              active: route.path === item.link
            }}>
              <NuxtLink to={item.link}>{item.name}</NuxtLink>
            </li>
          )}
        </ul>
      </nav>
    )
  }
})
