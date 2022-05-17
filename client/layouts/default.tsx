import TheFooter from '~~/components/template/footer/TheFooter'
import TheHeader from '~~/components/template/header/TheHeader'

export default defineComponent({
  setup() {
    return () => (
      <div>
        <TheHeader/>
        <div class="screen">
          <NuxtPage class="screen__page container"/>
        </div>
        <TheFooter/>
      </div>
    )
  }
})
