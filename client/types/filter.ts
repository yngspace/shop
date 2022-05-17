import { Entity, EntityMeta } from '.'

class Filter extends Entity {
  id: string = ''
  name: string = ''
  value: string = ''
  categories?: string = ''
  products?: string = ''
}

class FilterMeta extends EntityMeta<Filter> {
  endpoint: string = '/filters/'
}

export {
  Filter,
  FilterMeta
}
