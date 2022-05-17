import { Category } from '~~/types/categories'
import TheDefaultSelect from '~~/components/UI/input/TheDefaultSelect'
import { store } from '~~/store'
import TheRelationSelect from '~~/components/UI/input/TheRelationSelect'
import { Filter, FilterMeta } from '~~/types/filter'
import { LocationQueryRaw } from 'vue-router'
import TheSearchInput from '~~/components/UI/input/TheSearchInput'
import { PaginationType } from '~~/types'
import { Product, ProductMeta } from '~~/types/products'
import TheAdminProductCard from '../components/TheAdminProductCard'

export default defineComponent({
  async setup() {
    const { push } = useRouter()
    const route = useRoute()
    const query = ref<LocationQueryRaw>({ admin: 'true' })
    const filterMeta = new FilterMeta()
    const productMeta = new ProductMeta()
    const currentCategory = ref<Category|null>(null)
    const currentFilter = ref<Filter|null>(null)
    const productData = ref<PaginationType<Product>>(new PaginationType())
    const newProduct = ref<Product>(new Product())
    const generateRoute = () => {
      push({ name: route.name, query: query.value })
    }

    const load = async () => {
      if (route.query.categories) query.value.categories = route.query.categories
      if (route.query.type) query.value.type = route.query.type
      productData.value = await usePagination(productMeta.endpoint, query.value, productMeta)
    }
    await load()

    const onSumbit = async (item: Product, action: 'update'|'create') => {
      if (action === 'create') {
        try {
          await useAuthApi(productMeta.endpoint, {
            method: 'POST',
            body: { ...productMeta.dump(item) }
          })
          await load()
          newProduct.value = new Product()
        } catch (e) {}
      } else {
        try {
          await useAuthApi(productMeta.endpoint + item.id, {
            method: 'PATCH',
            body: { ...productMeta.dump(item) }
          })
          await load()
        } catch (e) {}
      }
    }

    const onDelete = async (item: Product, action: 'update'|'create') => {
      console.log(item, action)
    }

    watch(() => currentCategory.value, () => {
      if (currentCategory.value) {
        query.value.categories = currentCategory.value.slug
      } else delete query.value.categories

      currentFilter.value = null
      delete query.value.type
      generateRoute()
    })

    watch(() => currentFilter.value, () => {
      if (currentFilter.value) query.value.type = currentFilter.value.value
      else delete query.value.type
      generateRoute()
    })

    watch(route, async () => await load())

    return (): JSX.Element => (
      <div class="products">
        <h1>Редактировать Товары</h1>
        <div class="products__selected-option-row">
          <TheDefaultSelect
            modelValue={currentCategory.value}
            items={store.categories}
            placeholder="Выберите категорию"
            primaryKey="slug"
            onValueChange={(v: Category|null) => { currentCategory.value = v }}
          />
          <TheRelationSelect
            modelValue={currentFilter.value}
            placeholder="Выберите фильтр"
            onValueChange={(v: Filter|null) => { currentFilter.value = v }}
            ednpoint={`${filterMeta.endpoint}?categories=${currentCategory.value?.slug}`}
            disabled={!currentCategory.value}
          />
          <TheSearchInput
            placeholder='Искать'
          />
        </div>
        <div class="products__list">
          <TheAdminProductCard
            item={newProduct.value}
            action="create"
            submit={onSumbit}
            delete={onDelete}
          />
          {productData.value.result.map(item =>
            <TheAdminProductCard
              item={item}
              action="update"
              submit={onSumbit}
              delete={onDelete}
            />
          )}
        </div>
      </div>
    )
  }
})
