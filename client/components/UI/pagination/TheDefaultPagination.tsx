import { LocationQueryRaw } from 'vue-router'
import { NuxtLink } from '~~/.nuxt/components'
import './style.sass'

export default defineComponent({
  props: {
    count: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 0
    },
    next: {
      type: Boolean,
      default: false
    },
    prev: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const route = useRoute()
    const pages = ref<number[]>([])
    const setPages = () => {
      pages.value = []
      for (let i = 1; i <= props.totalPages; i += 1) pages.value.push(i)
    }
    setPages()
    watch(() => props.totalPages, () => setPages())

    const generateRoute = (page: number|null): LocationQueryRaw => {
      const query: LocationQueryRaw = { ...route.query, page }
      return query
    }
    return (): JSX.Element => (
      <>
        {props.totalPages > 1 ? <div class="default-pagination">
          <NuxtLink
            class={{
              'default-pagination__arrow default-pagination__arrow--prev': true,
              disabled: !props.prev
            }}
            to={{ name: route.name, query: generateRoute(props.prev ? props.page - 1 : props.page) }}>
            <svg data-v-772c080c="" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path data-v-772c080c="" fill-rule="evenodd" clip-rule="evenodd"
                d="M8.6084 2.06703L7.87939 1.30436L3.39101 6.00002L7.87939 10.6957L8.6084 9.933L4.84902 6.00002L8.6084 2.06703Z" fill="#005bff">
              </path>
            </svg>
          </NuxtLink>
          {pages.value.map((page, idx) =>
            <NuxtLink
              key={idx}
              class={{
                'default-pagination__page': true,
                active: props.page === page
              }}
              to={{ name: route.name, query: generateRoute(page) }}>
              {page}
            </NuxtLink>
          )}
          <NuxtLink
            class={{
              'default-pagination__arrow default-pagination__arrow--next': true,
              disabled: !props.next
            }}
            to={{ name: route.name, query: generateRoute(props.next ? props.page + 1 : props.page) }}>
            <svg data-v-772c080c="" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path data-v-772c080c="" fill-rule="evenodd" clip-rule="evenodd"
                d="M8.6084 2.06703L7.87939 1.30436L3.39101 6.00002L7.87939 10.6957L8.6084 9.933L4.84902 6.00002L8.6084 2.06703Z" fill="#005bff">
              </path>
            </svg>
          </NuxtLink>
        </div> : null}
      </>
    )
  }
})