import { PropType } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onValueChange: {
      type: Function as PropType<(v: string) => void>,
      required: true
    },
    onValueClear: {
      type: Function as PropType<(v: string) => void>,
      required: true
    }
  },
  setup(props) {
    const onClear = (e: Event) => {
      e.preventDefault()

      if (props.disabled) return
      else props.onValueClear()
    }

    return (): JSX.Element => (
      <label class="edit-input">
        <div class="edit-input__left">
          {props.label ? <span class="edit-input__label">{props.label}</span> : null}
          <input
            type="text"
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => { props.onValueChange(e.target.value) }}
            disabled={props.disabled}
          />
        </div>
        <button class="edit-input__clear" type="button" onClick={(e: Event) => onClear(e)}>
          <img src="../../../assets/img/close-icon.svg" />
        </button>
      </label>
    )
  }
})
