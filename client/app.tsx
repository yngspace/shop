import { NuxtLayout } from './.nuxt/components'
import { actions, mutations } from './store'

export default defineComponent({
  async setup() {
    const promises = [
      actions.getMeta(),
      actions.getCategories()
    ]
    await Promise.all(promises)

    return () => (
      <div>
        <NuxtLayout/>
      </div>
    )
  }
})
