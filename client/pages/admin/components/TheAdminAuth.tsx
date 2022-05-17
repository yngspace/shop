import { PropType } from 'nuxt/dist/app/compat/capi'
import TheDefaultInput from '~~/components/UI/input/TheDefaultInput'
import { User, UserMeta } from '~~/types/user'

export default defineComponent({
  props: {
    onAuth: {
      type: Function as PropType<(jwt: string) => void>
    }
  },
  setup(props) {
    const userMeta = new UserMeta()
    const user = ref<User>(new User())
    const submit = async (e: Event) => {
      e.preventDefault()

      try {
        const { token } = await useApi(userMeta.endpoint + 'login', {
          method: 'POST',
          body: { ...user.value }
        })
        props.onAuth(token)
      } catch (e) {
        alert('Ошибка')
      }
    }

    return (): JSX.Element => (
      <form class="auth-form" onSubmit={(e: Event) => submit(e)}>
        <h1>Авторизация</h1>
        <div class="auth-form__input-grout">
          <TheDefaultInput
            modelValue={user.value.login}
            onValueChange={(v: string) => { user.value.login = v }}
            label="Логин"
            placeholder="Введите логин"
            type="text"
          />
          <TheDefaultInput
            modelValue={user.value.password}
            onValueChange={(v: string) => { user.value.password = v }}
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
          />
          <button class="primary-button">Отправить</button>
        </div>
      </form>
    )
  }
})
