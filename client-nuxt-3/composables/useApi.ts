import { UseFetchOptions } from 'nuxt/dist/app/composables'

export const useApi = (url: string, params?: UseFetchOptions<any>): Promise<any> => {
  const config = useRuntimeConfig().public
  return $fetch(url, { ...params, baseURL: config.BASE_URL })
}
