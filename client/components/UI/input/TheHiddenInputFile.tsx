import { PropType, Ref } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
  props: {
    target: {
      type: [Object, null] as PropType<Ref<HTMLElement|null>>,
      default: null
    },
    onValueChange: {
      type: Function as PropType<(file: File) => void>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const onLoad = (target: HTMLInputElement) => {
      if (target.files && target.files.length) {
        const [file] = target.files
        props.onValueChange(file)
      }
    }

    const root = ref(null) as unknown as Ref<HTMLElement>

    if (props.target) {
      props.target.value.addEventListener('click', () => {
        root.value?.click()
      })
    }

    return (): JSX.Element => (
      <label class="hidden-input-file" ref={root}>
        <input
          disabled={props.disabled}
          type="file"
          onChange={(e: Event) => { onLoad(e.target as HTMLInputElement) }}
        />
      </label>
    )
  }
})
