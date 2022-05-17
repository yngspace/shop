import { UserMeta } from '~~/types/user'
import TheAdminAuth from './components/TheAdminAuth'
import TheAdminTabs from './components/TheAdminTabs'
import './style.sass'

export default defineComponent({
  async setup() {
    const userMeta = new UserMeta()
    const token = useCookie('token')
    const isAuth = ref<boolean>(false)
    try {
      await useAuthApi(userMeta.endpoint)
      isAuth.value = true
    } catch (e) {
      isAuth.value = false
    }

    const onAuth = (jwt: string) => {
      token.value = jwt
      isAuth.value = true
    }

    return (): JSX.Element => (
      <div class="admin">
        {isAuth.value
          ? <>
            <TheAdminTabs/>
            <NuxtPage/>
          </>
          : <TheAdminAuth onAuth={onAuth}/>
        }
      </div>
    )
  }
})
