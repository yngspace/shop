import { Entity, EntityMeta } from '.'
import { Filter } from './filter'

class Category extends Entity {
  slug: string = ''
  name: string = ''
  active: boolean = false
  filters?: Filter[] = []
}

class CategoryMeta extends EntityMeta<Category> {
  endpoint: string = '/categories/'
}

export {
  Category,
  CategoryMeta
}
