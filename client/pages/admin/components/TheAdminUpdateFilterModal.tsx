import { PropType } from 'nuxt/dist/app/compat/capi'
import TheDefaultModal from '~~/components/UI/modal/TheDefaultModal'
import { Category } from '~~/types/categories'
import { Filter } from '~~/types/filter'
import TheAdminFilterCard from './TheAdminFilterCard'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<Category>,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Function as PropType<() => void>,
      required: true
    },
    submit: {
      type: Function as PropType<(v: Filter, action: 'create'|'update') => void>,
      required: true
    },
    delete: {
      type: Function as PropType<(v: Filter) => void>,
      required: true
    },
    onClickOutside: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const newItem = ref<Filter>(new Filter())
    const onDelete = (item: Filter, action: 'create'|'update') => {
      if (action === 'create') {
        newItem.value = new Filter()
        return
      } else {
        props.delete(item, action)
      }
    }

    const onSubmit = (item: Filter, action: 'create'|'update') => {
      if (action === 'create') {
        newItem.value = new Filter()
        props.submit(item, action)
      } else {
        props.submit(item, action)
      }
    }

    const body = (): JSX.Element => (
      <div>
        <TheAdminFilterCard
          item={newItem.value}
          action="create"
          submit={onSubmit}
          delete={onDelete}
        />
        {props.item.filters.map(x =>
          <TheAdminFilterCard
            item={x}
            action="update"
            submit={onSubmit}
            delete={onDelete}
          />
        )}
      </div>
    )

    return (): JSX.Element => (
      <>
        <TheDefaultModal
          active={props.active}
          title="Редактровать фильтры"
          toggle={props.toggle}
          body={body}
          onClickOutside={props.onClickOutside}
        />
      </>
    )
  }
})
