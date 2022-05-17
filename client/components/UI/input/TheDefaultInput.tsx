import { PropType } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'text'|'password'|'email'|'phone'|'number'|'textarea'>,
      default: 'text'
    },
    onValueChange: {
      type: Function as PropType<(v: string) => void>,
      required: true
    },
    onBlur: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const showPassword = ref<boolean>(false)
    return (): JSX.Element => (
      <label class={{ 'default-input': true, error: props.error !== '' }}>
        <div class="default-input__top">
          <span class="default-input__label">{props.label}</span>
          <span class="default-input__error">{props.error}</span>
        </div>
        {!showPassword.value
          ? <input
            type={props.type}
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={props.modelValue}
            onInput={(e: any) => props.onValueChange(e.target.value)}
            onBlur={props.onBlur}
          />
          : <input
            type="text"
            placeholder={props.placeholder}
            disabled={props.disabled}
            value={props.modelValue}
            onInput={(e: any) => props.onValueChange(e.target.value)}
            onBlur={props.onBlur}
          />
        }
        {props.type === 'password'
          ? <span
            class="default-input__show-password"
            onClick={() => showPassword.value = !showPassword.value}
          >
            {showPassword.value ? 'Скрыть' : 'Показать'}
          </span>
          : null
        }
      </label>
    )
  }
})
