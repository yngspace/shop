import { Entity, EntityMeta } from '.'
import { Category } from './categories'
import { Filter } from './filter'

interface IPhoto {
  name: string
}

class Product extends Entity {
  id: string = ''
  name: string = ''
  description: string = ''
  price: number = 0
  categories: Category|null = null
  filters: Filter|null = null
  photos: IPhoto[] = []
}

class ProductMeta extends EntityMeta<Product> {
  endpoint: string = '/products/'

  load(data: any): Product {
    const result = super.load(data)
    if (process.client) {
      const config = useRuntimeConfig().public
      result.photos = result.photos.map(item => {
        return {
          name: config.SERVER_HOST + item.name
        }
      })
    }

    return result
  }

  dump(item: Product): any {
    const result = super.dump(item)
    const config = useRuntimeConfig().public
    result.photos = result.photos.map(item => {
      return {
        name: item.name.split(config.SERVER_HOST)[1]
      }
    })
    if (item.categories) result.categories = item.categories.slug
    if (item.filters) result.filters = item.filters.id

    return result
  }
}

export {
  Product,
  ProductMeta
}
