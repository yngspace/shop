import { PropType, Ref } from 'nuxt/dist/app/compat/capi'
import './style.sass'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    toggle: {
      type: Function as PropType<() => void>,
      required: true
    },
    body: {
      type: Function as PropType<() => JSX.Element>,
      required: true
    },
    footer: {
      type: Function as PropType<() => JSX.Element>,
      default: () => {}
    },
    onClickOutside: {
      type: Function as PropType<() => void>,
      default: () => {}
    }
  },
  setup(props) {
    const root = ref(null) as unknown as Ref<HTMLElement>
    const target = ref(null) as unknown as Ref<HTMLElement>

    useClickOutside(root, props.onClickOutside, target)

    return (): JSX.Element => (
      <>
        {props.active ? <div class={{
          'default-modal': true,
          active: props.active
        }} ref={target}>
          <div class="default-modal__content" ref={root}>
            <div class="default-modal__header">
              <span class="default-modal__title">{props.title}</span>
              <button class="default-modal__close" type="button" onClick={props.toggle}/>
            </div>
            <div class="default-modal__body">
              {props.body()}
            </div>
            <div class="default-modal__footer">
              {props.footer()}
            </div>
          </div>
        </div> : null}
      </>
    )
  }
})
