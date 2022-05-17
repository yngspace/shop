import { PropType } from 'nuxt/dist/app/compat/capi'
import { Product } from '~~/types/products'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true,
    }
  },
  setup(props) {
    const config = useRuntimeConfig().public
    const photos = computed<string[]>(() => {
      if (process.client) return props.item.photos.map(item => item.name)
      else {
        return props.item.photos.map(item => config.SERVER_HOST + item.name)
      }
    })

    return (): JSX.Element => (
      <div class="product-card">
        <div class="product-card__photos">
          {photos.value
            ? photos.value.map(p => <img class="product-card__image" src={p}/>)
            : <div class="default-product-img"/>
          }
        </div>
        <div class="product-card__body">
          <span class="product-card__price">
            <span>{props.item.price}</span>
            <span>Руб</span>
          </span>
          <span class="product-card__title">{props.item.name}</span>
        </div>
        <div class="product-card__foter">
          <button class="add-button" disabled>-</button>
          <span class="product-card__count">0</span>
          <button class="remove-button">+</button>
        </div>
      </div>
    )
  }
})
