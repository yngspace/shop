import { NuxtLayout } from './.nuxt/components'
import { actions } from './store'

export default defineComponent({
  async setup() {
    onMounted(() => actions.getInitialCart())
    const promises = [
      actions.fetchCategories(),
      actions.fetchMeta()
    ]
    await Promise.all(promises)

    return () => (
      <div>
        <NuxtLayout/>
      </div>
    )
  }
})
