import './style.sass'
import TheHeaderMain from './TheHeaderMain'
import TheHeaderTop from './TheHeaderTop'
import TheNavCategories from './TheHeaderNavCategories'
import TheHeaderNav from './TheHeaderNav'
import { Ref } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
  setup() {
    const route = useRoute()
    const isOpen = ref<boolean>(false)
    const toggle = (): void => {
      setTimeout(() => {
        isOpen.value = !isOpen.value
      }, 0)
    }
    const onClickOutisde = (): void => {
      if (isOpen.value) isOpen.value = false
    }
    const header = ref(null) as unknown as Ref<HTMLElement>
    const headerHeight = ref<number>(0)

    onMounted(() => {
      headerHeight.value = header.value.getBoundingClientRect().height
    })

    watch(route, () => isOpen.value = false)

    return () => (
      <header class="header" ref={header}>
        <div class="container">
          <TheHeaderTop/>
          <TheHeaderMain
            toggle={toggle}
            isOpen={isOpen.value}
          />
          <TheHeaderNav/>
        </div>
        <TheNavCategories
          active={isOpen.value}
          top={headerHeight.value}
          onClickOutisde={onClickOutisde}
        />
      </header>
    )
  }
})
