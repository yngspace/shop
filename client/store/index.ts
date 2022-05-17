import { Category, CategoryMeta } from '~~/types/categories'
import { Meta, MetaMeta } from '~~/types/meta'

export const store = reactive({
  meta: new Meta() as Meta,
  categories: [] as Category[]
})

export const actions = {
  async getMeta(): Promise<void> {
    try {
      const { endpoint } = new MetaMeta()
      mutations.setMeta(await useApi(endpoint))
    } catch (e) {
      throwError('404')
    }
  },
  async getCategories(): Promise<void> {
    try {
      const { endpoint } = new CategoryMeta()
      mutations.setCategories(await useApi(endpoint, { params: { active: true } }))
    } catch (e) {
      throwError('404')
    }
  }
}

export const mutations = {
  setMeta(data: Meta): void {
    store.meta = data
  },
  setCategories(data: Category[]): void {
    store.categories = data
  }
}
