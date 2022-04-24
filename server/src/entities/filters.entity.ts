import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoriesEntity } from './categories.entity'
import { ProductsEntity } from './products.entity'

@Entity('filters')
export class FiltersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  value: string

  @ManyToOne(() => CategoriesEntity, x => x.slug, { onDelete: 'SET NULL' })
  categories: string

  @OneToMany(() => ProductsEntity, x => x.filters, { onDelete: 'SET NULL' })
  products: ProductsEntity[]
}
