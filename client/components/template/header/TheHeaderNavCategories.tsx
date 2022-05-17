import { PropType, Ref } from 'nuxt/dist/app/compat/capi'
import { NuxtLink } from '~~/.nuxt/components'
import { store } from '~~/store'
import { Category } from '~~/types/categories'
import { Filter, FilterMeta } from '~~/types/filter'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    onClickOutisde: {
      type: Function as PropType<() => void>,
      requided: true
    }
  },
  setup(props) {
    const route = useRoute()
    const filterMeta = new FilterMeta()
    const filterList = ref<Filter[]>([])
    const curentCategory = ref<Category>(new Category())
    const root = ref(null) as unknown as Ref<HTMLElement>
    const selectCategory = useDebounce((item: Category) => {
      if (curentCategory.value.slug === item.slug) return
      curentCategory.value = item
    }, 400)

    watch(() => curentCategory.value, async () => {
      if (!curentCategory.value.slug) return
      try {
        filterList.value = await useApi(filterMeta.endpoint, {
          params: { categories: curentCategory.value.slug }
        })
      } catch (e) {
        throwError('404')
      }
    })

    watch(() => props.active, (to) => {
      if (to === true && route.name === 'catalog-slug') {
        curentCategory.value = store.categories.find(item => item.slug === route.params.slug)
      } else {
        curentCategory.value = new Category()
        filterList.value = []
      }
    })

    useClickOutside(root, props.onClickOutisde)

    return (): JSX.Element => (
      <nav
        class={{
          'nav-categories': true,
          active: props.active
        }}
        style={{
          top: `${props.top}px`
        }}
        ref={root}
      >
        <div class="container">
          <div class="nav-categories__left">
            {store.categories?.map(item =>
              <div onMouseenter={() => selectCategory(item)}>
                <NuxtLink
                  class={{
                    'nav-categories__left-item': true,
                    active: curentCategory.value.slug === item.slug
                  }}
                  to={`/catalog/${item.slug}`}
                >
                  {item.name}
                </NuxtLink>
              </div>
            )}
          </div>
          <div class="nav-categories__right">
            {filterList.value.map(item =>
              <NuxtLink
                class={{
                  'nav-categories__right-item': true,
                  active: route.query.type === item.value
                }}
                to={{ path: `/catalog/${curentCategory.value.slug}`, query: { type: item.value } }}
              >
                {item.name}
              </NuxtLink>
            )}
          </div>
        </div>
      </nav>
    )
  }
})
