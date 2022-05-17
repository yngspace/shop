import { PropType } from 'nuxt/dist/app/compat/capi'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Boolean,
      required: true
    },
    onValueChange: {
      type: Function as PropType<() => void>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return (): JSX.Element => (
      <div class={{
        'default-checkbox': true,
        active: props.modelValue,
        disabled: props.disabled
      }} onClick={props.onValueChange}>
        <div class="default-checkbox__rectangle">
          <span class="default-checkbox__checker"/>
        </div>
        {props.label ? <span class="default-checkbox__label">{props.label}</span> : null}
      </div>
    )
  }
})
