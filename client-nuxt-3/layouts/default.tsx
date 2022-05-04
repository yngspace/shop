import { TemplatesHeader } from '~~/.nuxt/components'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <TemplatesHeader/>
        <NuxtPage class="page-screen"/>
      </div>
    )
  }
})
