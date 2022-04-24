import Index from './modules/index/routes'
import Catalog from './modules/catalog/routes'
import Product from './modules/products/routes'
import Admin from './modules/admin/routes'

export default {
  extendRoutes(routes, resolve) {
    routes.push(
      ...Index(resolve),
      ...Catalog(resolve),
      ...Product(resolve),
      ...Admin(resolve)
    )
  }
}