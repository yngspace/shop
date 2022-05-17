import { store } from '~~/store'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <ul class="header__row header__row-top">
        <li class="header__item header__item--address">{store.meta.address}</li>
        <li class="header__item header__item--phone">
          <a href={`tel:${store.meta.phone}`}>{store.meta.phone}</a>
        </li>
        <li class="header__item header__item--time">{store.meta.workTime}</li>
        <li class="header__item header__item--email">
          <a href={`mailto:${store.meta.email}`}>{store.meta.email}</a>
        </li>
      </ul>
    )
  }
})
