import { PropType } from 'nuxt/dist/app/compat/capi'
import TheDefaultSelect from './TheDefaultSelect'

export default defineComponent({
  props: {
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
    ednpoint: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  async setup(props) {
    const items = ref<any[]>([])
    const load = async () => {
      try {
        items.value = await useApi(props.ednpoint)
      } catch (e) {}
    }

    return (): JSX.Element => (
      <div class="relation-select">
        <TheDefaultSelect
          titleKey={props.titleKey}
          primaryKey={props.primaryKey}
          modelValue={props.modelValue}
          placeholder={props.placeholder}
          onValueChange={props.onValueChange}
          items={items.value}
          disabled={props.disabled}
          callback={load}
        />
      </div>
    )
  }
})
