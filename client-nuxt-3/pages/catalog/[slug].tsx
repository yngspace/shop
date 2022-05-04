import { ComputedRef } from 'nuxt/dist/app/compat/capi'
import { store } from '~~/store'
import { Filter } from '~~/types/filter'
import { Product } from '~~/types/product'
import { LocationQueryRaw } from 'vue-router'
import TheProductCard from './components/TheProductCard'
import TheSidebar from './components/TheSidebar'
import './styles/main.sass'

export default defineComponent({
  async setup() {
    const route = useRoute()
    const products = ref<Product[]>([])
    const filters = ref<Filter[]>([])

    const load = async () => {
      const reqParams: LocationQueryRaw = { categories: route.params.slug }
      if (route.query.type) reqParams.type = route.query.type
      const promises = [
        useApi('/products/', { params: reqParams }),
        useApi('/filters/', { params: reqParams })
      ]

      const [p, f] = await Promise.all(promises)
      products.value = p.result
      filters.value = f
    }
    await load()

    const title: ComputedRef<string> = computed((): string => {
      const currentCategoriesList = store.categories.filter(x => x.slug === route.params.slug)
      // if (currentCategoriesList.length) return 'Каталог: ' + currentCategoriesList[0].name
      return 'Каталог'
    })

    watch(route, async () => await load())

    return (): JSX.Element => (
      <div class="screen catalog">
        <div class="container grid">
          <TheSidebar list={filters.value}/>
          <div class="catalog-main">
            <h1>{title.value}</h1>
            <div class="product-list">
              {products.value.map(item =>
                <TheProductCard item={item}/>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
