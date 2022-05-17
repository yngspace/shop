import { LocationQueryRaw } from 'vue-router'
import { usePagination } from '~~/composables/usePagination'
import { Product, ProductMeta } from '~~/types/products'
import { PaginationType } from '~~/types'
import TheProductCard from './components/TheProductCard'
import './style.sass'
import TheDefaultPagination from '~~/components/UI/pagination/TheDefaultPagination'

export default defineComponent({
  async setup() {
    const productMeta = new ProductMeta()
    const route = useRoute()
    const query = ref<LocationQueryRaw>({ perPage: 8 })
    const productData = ref<PaginationType<Product>>(new PaginationType())

    const load = async () => {
      query.value.categories = route.params.slug
      if (route.query.type) query.value.type = route.query.type
      else delete query.value.type
      if (route.query.page) query.value.page = route.query.page
      else delete query.value.page
      productData.value = await usePagination(productMeta.endpoint, query.value, productMeta)
    }
    await load()

    watch(route, async () => await load())

    return (): JSX.Element => (
      <div class="catalog">
        <h1>Каталог</h1>
        <div class="catalog__product-list">
          {productData.value.result.length
            ? productData.value.result.map(item =>
              <TheProductCard
                item={item}
              />
            )
            : <p>Ничего не найдено :(</p>
          }
        </div>
        <TheDefaultPagination
          page={productData.value.page}
          count={productData.value.count}
          totalPages={productData.value.totalPages}
          next={productData.value.next}
          prev={productData.value.prev}
        />
      </div>
    )
  }
})
