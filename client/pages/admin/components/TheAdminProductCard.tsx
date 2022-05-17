import { PropType } from 'nuxt/dist/app/compat/capi'
import TheDefaultSelect from '~~/components/UI/input/TheDefaultSelect'
import TheEditInput from '~~/components/UI/input/TheEditInput'
import TheHiddenInputFile from '~~/components/UI/input/TheHiddenInputFile'
import TheRelationSelect from '~~/components/UI/input/TheRelationSelect'
import { store } from '~~/store'
import { Category } from '~~/types/categories'
import { Filter, FilterMeta } from '~~/types/filter'
import { Product } from '~~/types/products'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true
    },
    action: {
      type: String as PropType<'update'|'create'>,
      required: true
    },
    submit: {
      type: Function as PropType<(item: Product, action: 'update'|'create') => void>,
      required: true
    },
    delete: {
      type: Function as PropType<(item: Product, action: 'update'|'create') => void>,
      required: true
    }
  },
  setup(props) {
    const config = useRuntimeConfig().public
    if (process.server) props.item.photos = props.item.photos.map(item => {
      return {
        name: config.SERVER_HOST + item.name
      }
    })

    const filterMeta = new FilterMeta()
    const currentCategory = ref<Category|null>(null)
    const currentFilter = ref<Filter|null>(null)
    watch(currentCategory, () => {
      currentFilter.value = null
    })

    const loadFile = async (file: File): Promise<void> => {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await useApi('/files/', { method: 'POST', body: formData })
        response.name = config.SERVER_HOST + response.name
        props.item.photos.push(response)
        props.submit(props.item, props.action)
      } catch (e) {}
    }

    const onSubmit = (e: Event) => {
      e.preventDefault()

      props.submit(props.item, props.action)
    }

    return (): JSX.Element => (
      <form class={{
        'products__form categories-form': true,
        create: props.action === 'create'
      }} onSubmit={(e: Event) => { onSubmit(e) }}>
        <div class="product-form__img">
          {props.item.photos.length
            ? <img class="product-card__image" src={props.item.photos[0].name}/>
            : <div class="hidden-input-file-container">
              <div class="default-product-img"/>
              <TheHiddenInputFile
                onValueChange={(f: File) => { loadFile(f) }}
                disabled={props.action === 'create'}
              />
            </div>
          }
        </div>
        <TheEditInput
          modelValue={props.item.name}
          onValueChange={(v: string) => { props.item.name = v }}
          onValueClear={() => { props.item.name = '' }}
          label="Название"
          placeholder="Введите название"
        />
        <TheEditInput
          modelValue={props.item.description}
          onValueChange={(v: string) => { props.item.description = v }}
          onValueClear={() => { props.item.description = '' }}
          label="Описание"
          placeholder="Введите Описание"
        />
        <TheEditInput
          modelValue={props.item.price.toString()}
          onValueChange={(v: string) => { props.item.price = parseInt(v) }}
          onValueClear={() => { props.item.price = 0 }}
          label="Стоимость"
          placeholder="Введите Стоимость"
        />
        <TheDefaultSelect
          modelValue={props.item.categories}
          items={store.categories}
          placeholder="Выберите категорию"
          primaryKey="slug"
          onValueChange={(v: Category|null) => { props.item.categories = v }}
        />
        <TheRelationSelect
          modelValue={props.item.filters}
          placeholder="Выберите фильтр"
          onValueChange={(v: Filter|null) => { props.item.filters = v }}
          ednpoint={`${filterMeta.endpoint}?categories=${props.item.categories?.slug}`}
          disabled={!props.item.categories}
        />
        <button onClick={() => props.delete(props.item, props.action)} class="red-button" type='button'>Удалить</button>
        <button class="primary-button" type='submit'>Сохранить</button>
      </form>
    )
  }
})
