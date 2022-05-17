import { PropType, Ref } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<(any[])>,
      required: true
    },
    titleKey: {
      type: String,
      default: 'name'
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    modelValue: {
      type: [Object, null],
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    onValueChange: {
      type: Function as PropType<(item: any) => void>,
      requred: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const root = ref(null) as unknown as Ref<HTMLElement>
    const isOpen = ref<boolean>(false)
    const toggle = () => {
      if (props.disabled) return
      isOpen.value = !isOpen.value
    }
    const selectItem = (e: Event, item: any|null) => {
      e.stopPropagation()

      if (props.modelValue && item[props.primaryKey] === props.modelValue[props.primaryKey]) {
        props.onValueChange(null)
      } else {
        props.onValueChange(item)
      }

      toggle()
    }

    const onClickOutside = () => {
      if (!isOpen.value) return
      isOpen.value = false
    }

    useClickOutside(root, onClickOutside)

    watch(() => isOpen.value, (to) => {
      if (to === true) props.callback()
    })

    return (): JSX.Element => (
      <div class={{
        'default-select': true,
        open: isOpen.value,
        disabled: props.disabled
      }} onClick={toggle} ref={root}>
        <div class="default-select__top">
          {props.modelValue
            ? <div class="default-select__selected">{props.modelValue[props.titleKey]}</div>
            : <div class="default-select__label">{props.placeholder}</div>
          }
        </div>
        <div class="default-select__options">
          {props.items.map(item =>
            <div class={{
              'default-select__options-item': true,
              active: props.modelValue && props.modelValue[props.primaryKey] === item[props.primaryKey]
            }} onClick={(e: Event) => selectItem(e, item)}>{item[props.titleKey]}</div>
          )}
        </div>
      </div>
    )
  }
})
