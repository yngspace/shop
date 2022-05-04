import { TemplatesHeaderBottomBlock, TemplatesHeaderTopBlock } from '~~/.nuxt/components'
import './styles/main.sass'

export default defineComponent({
  setup() {
    return (): JSX.Element => (
      <header class="header">
        <TemplatesHeaderTopBlock/>
        <TemplatesHeaderBottomBlock/>
      </header>
    )
  }
})
