import { LocationQueryRaw } from 'vue-router'
import { EntityMeta, PaginationType } from '~~/types'

export async function usePagination<T>(endpoint: string, params: LocationQueryRaw, meta?: EntityMeta<T>): Promise<PaginationType<T>> {
  const response = await useApi(endpoint, { params })
  return new PaginationType(response, meta)
}
