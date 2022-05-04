import { NuxtLink } from '~~/.nuxt/components'
import { store } from '~~/store'

export default (): JSX.Element => {
  return (
    <div class="header-top">
      <div class="container">
        <div class="grid">
          <div class="left row">
            <span class="icon icon--address"/>
            <span>{store.meta.address}</span>
          </div>
          <div class="center">
            <NuxtLink to="/" class="logo">AQUASHOP</NuxtLink>
          </div>
          <div class="right row">
            <div class="col row">
              <span class="icon icon--time"/>
              <span>{store.meta.workTime}</span>
            </div>
            <div class="col row">
              <span class="icon icon--phone"/>
              <span>{store.meta.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
