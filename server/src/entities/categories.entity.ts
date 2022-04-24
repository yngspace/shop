import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { FiltersEntity } from './filters.entity'
import { ProductsEntity } from './products.entity'

@Entity('categories')
export class CategoriesEntity {
  @PrimaryColumn({
    unique: true 
  })
  slug: string

  @Column()
  name: string

  @Column({ default: true })
  active: boolean

  @OneToMany(() => ProductsEntity, x => x.categories, { onDelete: 'SET NULL' })
  products: ProductsEntity[]

  @OneToMany(() => FiltersEntity, x => x.categories, { onDelete: 'SET NULL' })
  filters: FiltersEntity[]
}
