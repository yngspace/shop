import { PropType } from 'nuxt/dist/app/compat/capi'
import TheDefaultCheckbox from '~~/components/UI/input/TheDefaultCheckbox'
import TheEditInput from '~~/components/UI/input/TheEditInput'
import { Category } from '~~/types/categories'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Category>
    },
    action: {
      type: String as PropType<'update'|'create'>
    },
    submit: {
      type: Function as PropType<(item: Category, action: 'update'|'create') => void>,
      required: true
    },
    delete: {
      type: Function as PropType<(item: Category, action: 'update'|'create') => void>,
      required: true
    },
    updateFilter: {
      type: Function as PropType<(item: Category) => void>,
      requred: true
    }
  },
  setup(props) {
    const submit = (e: Event) => {
      e.preventDefault()
      props.submit(props.item, props.action)
    }

    const onDelete = (e: Event) => {
      e.preventDefault()
      props.delete(props.item, props.action)
    }

    return (): JSX.Element => (
      <form class={{
        'categories-form': true,
        create: props.action === 'create'
      }}>
        <TheEditInput
          modelValue={props.item.name}
          onValueChange={(v: string) => { props.item.name = v }}
          onValueClear={() => { props.item.name = '' }}
          placeholder='Введите Название'
          label="Название"
        />
        <TheEditInput
          modelValue={props.item.slug}
          onValueChange={(v: string) => { props.item.slug = v }}
          onValueClear={() => { props.item.slug = '' }}
          placeholder='Введите Слаг'
          label="Слаг"
          disabled={true}
        />
        <TheDefaultCheckbox
          modelValue={props.item.active}
          label="Показывать"
          onValueChange={() => { props.item.active = !props.item.active }}
        />
        <div
          class="categories-form__filter"
          onClick={() => { props.action === 'update' ? props.updateFilter(props.item) : null }}
        >
          <span>{'Кол-во фильтров: ' + props.item.filters.length}</span>
        </div>
        <button class="red-button" type='button' onClick={(e: Event) => onDelete(e)}>Удалить</button>
        <button class="primary-button" type='submit' onClick={(e: Event) => submit(e)}>Сохранить</button>
      </form>
    )
  }
})
