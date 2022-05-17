import { PropType } from 'nuxt/dist/app/compat/capi'
import TheEditInput from '~~/components/UI/input/TheEditInput'
import { Filter } from '~~/types/filter'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Filter>,
      required: true
    },
    action: {
      type: String as PropType<'update'|'create'>,
      required: true
    },
    submit: {
      type: Function as PropType<(v: Filter, action: 'create'|'update') => void>,
      required: true
    },
    delete: {
      type: Function as PropType<(v: Filter, action: 'create'|'update') => void>,
      required: true
    }
  },
  setup(props) {
    return (): JSX.Element => (
      <form class={{
        'categories-form': true,
        create: props.action === 'create'
      }}>
        <TheEditInput
          modelValue={props.item.name}
          label="Название"
          placeholder="Введите название"
          onValueChange={(v: string) => { props.item.name = v }}
          onValueClear={() => { props.item.name = '' }}
        />
        <TheEditInput
          modelValue={props.item.value}
          label="Название Слаг"
          placeholder="Введите Слаг"
          onValueChange={(v: string) => { props.item.value = v }}
          onValueClear={() => { props.item.value = '' }}
          disabled={true}
        />
        <button onClick={() => { props.delete(props.item, props.action) }} type="button" class="red-button">Удалить</button>
        <button onClick={() => { props.submit(props.item, props.action) }} type="button" class="primary-button">Сохранить</button>
      </form>
    )
  }
})
