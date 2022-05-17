import { PropType } from 'nuxt/dist/app/compat/capi'
import { NuxtLink } from '~~/.nuxt/components'
import TheSearchInput from '~~/components/UI/input/TheSearchInput'

export default defineComponent({
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    toggle: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    return (): JSX.Element => (
      <div class="header__row header__row--main">
        <NuxtLink class="header__item header__item--logo" to="/">AQUASHOP</NuxtLink>
        <div class="header__item header__item--button">
          <button class={{
            'primary-button primary-button--catalog': true,
            'catalog-icon--trigger active': props.isOpen

          }} onClick={props.toggle}>
            <span class="catalog-icon">
              <span class="catalog-icon__line catalog-icon__line--1"/>
              <span class="catalog-icon__line catalog-icon__line--2"/>
              <span class="catalog-icon__line catalog-icon__line--3"/>
            </span>
            Каталог
          </button>
        </div>
        <div class="header__item header__item--search">
          <TheSearchInput
            placeholder='Искать'
          />
        </div>
        <div class="header__item header__item--cart">
          <img src="../../../assets/img/cart-icon.svg" alt="Корзина" />
        </div>
      </div>
    )
  }
})
