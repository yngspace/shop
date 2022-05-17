import { Ref } from 'nuxt/dist/app/compat/capi'

export default function useClickOutside (element: Ref<HTMLElement|null>, callback: () => void, target?: Ref<HTMLElement|null>) {
  const clickOutside = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath())
    const isClickOutside = path
      ? path.indexOf(element.value) < 0
      : !element.value?.contains(event.target)

    if (isClickOutside) callback()
  }

  onMounted(() => {
    if (target) {
      target.value.addEventListener('click', clickOutside)
    } else {
      document.addEventListener('click', clickOutside)
    }
  })

  onBeforeUnmount(() => {
    if (target) {
      target.value.addEventListener('click', clickOutside)
    } else {
      document.addEventListener('click', clickOutside)
    }
  })
}
