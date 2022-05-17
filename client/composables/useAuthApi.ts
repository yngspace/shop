import { UseFetchOptions } from 'nuxt/dist/app/composables'

export const useAuthApi = (url: string, params?: UseFetchOptions<any>): Promise<any> => {
  const config = useRuntimeConfig().public
  const token = useCookie('token')
  return $fetch(url, {
    ...params,
    baseURL: config.BASE_URL,
    headers: { token: `jwt ${token.value}` } 
  })
}
