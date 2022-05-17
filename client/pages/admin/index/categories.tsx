import { Category, CategoryMeta } from '~~/types/categories'
import { Filter, FilterMeta } from '~~/types/filter'
import TheAdminCategoryCard from '../components/TheAdminCategoryCard'
import TheAdminUpdateFilterModal from '../components/TheAdminUpdateFilterModal'

export default defineComponent({
  async setup() {
    const categoryMeta = new CategoryMeta()
    const filterMeta = new FilterMeta()
    const categoryList = ref<Category[]>([])
    const newItem = ref<Category>(new Category())
    const currentCategory = ref<Category>(new Category())
    const isOpenWindow = ref<boolean>(false)
    const toggle = (item?: Category) => {
      if (item) currentCategory.value = item
      else currentCategory.value = new Category()
      isOpenWindow.value = !isOpenWindow.value
    }
    const onClickOutside = () => {
      isOpenWindow.value = false
    }

    try {
      categoryList.value = await useApi(categoryMeta.endpoint, { params: { admin: true } })
    } catch (e) {
      throwError('404')
    }

    const submit = async (item: Category, action: 'update'|'create'): Promise<void> => {
      if (action === 'create') {
        try {
          const result = await useAuthApi(categoryMeta.endpoint, {
            method: 'POST',
            body: { ...item }
          })
          categoryList.value.push(result)
          newItem.value = new Category()
        } catch (e) {}
      } else {
        try {
          const result = await useAuthApi(categoryMeta.endpoint + item.slug, {
            method: 'PATCH',
            body: { ...item }
          })
        } catch (e) {}
      }
    }

    const onDelete = async (item: Category, action: 'update'|'create'): Promise<void> => {
      if (action === 'create') {
        newItem.value = new Category()
      } else {
        try {
          await useAuthApi(categoryMeta.endpoint + item.slug, {
            method: 'DELETE'
          })
          categoryList.value = categoryList.value.filter(x => x.slug !== item.slug)
        } catch (e) {}
      }
    }

    const submitFilter = async (item: Filter, action: 'update'|'create'): Promise<void> => {
      const { slug } = currentCategory.value
      if (!slug) return
      else {
        item.categories = slug

        if (action === 'create') {
          try {
            const result = await useAuthApi(filterMeta.endpoint, {
              method: 'POST',
              body: { ...item }
            })
            currentCategory.value.filters.push(result)
          } catch (e) {}
        } else {
          try {
            await useAuthApi(filterMeta.endpoint + item.id, {
              method: 'PATCH',
              body: { ...item }
            })
          } catch (e) {}
        }
      }
    }

    const deleteFilter = async (item: Filter): Promise<void> => {
      try {
        await useAuthApi(filterMeta.endpoint + item.id, {
          method: 'DELETE'
        })
        currentCategory.value.filters = currentCategory.value.filters.filter(x => x.id !== item.id)
      } catch (e) {}
    }

    return (): JSX.Element => (
      <div class="categories">
        <h1>Редактировать Категории</h1>
        <div class="categories__list">
          <TheAdminCategoryCard
            item={newItem.value}
            action="create"
            delete={onDelete}
            submit={submit}
            updateFilter={toggle}
          />
          {categoryList.value.map(item =>
            <TheAdminCategoryCard
              item={item}
              action="update"
              delete={onDelete}
              submit={submit}
              updateFilter={toggle}
            />
          )}
        </div>
        {isOpenWindow.value ? <TheAdminUpdateFilterModal
          item={currentCategory.value}
          active={isOpenWindow.value}
          toggle={toggle}
          submit={submitFilter}
          delete={deleteFilter}
          onClickOutside={onClickOutside}
        /> : null}
      </div>
    )
  }
})
