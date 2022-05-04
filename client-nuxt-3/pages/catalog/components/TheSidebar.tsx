import { NuxtLink } from '~~/.nuxt/components'
import { Filter } from '~~/types/filter'
import { LocationQueryRaw } from 'vue-router'

interface Props {
  list: Filter[]
}

export default ({ list }: Props): JSX.Element => {
  const { name, query } = useRoute()
  const generateLink = (value: string): LocationQueryRaw => {
    const params: LocationQueryRaw = { ...query }
    params.type = value
    return params
  }

  return (
    <aside class="sidebar">
      <NuxtLink
        to={{ name: name }}
        class={{
          'sidebar-header': true,
          'active': !query.type
        }}>
        Фильтры
      </NuxtLink>
      <div class="sidebar-body">
        {list.map((item: Filter) =>
          <NuxtLink
            class={{
              'sidebar-item': true,
              'active': query.type === item.value
            }}
            to={{ name: name, query: generateLink(item.value) }}>
            {item.name}
          </NuxtLink>
        )}
      </div>
    </aside>
  )
}
