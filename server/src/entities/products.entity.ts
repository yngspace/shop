import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoriesEntity } from './categories.entity'
import { FilesEntity } from './files.entity'
import { FiltersEntity } from './filters.entity'

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  price: number

  @ManyToOne(() => CategoriesEntity, x => x.slug, { onDelete: 'SET NULL' })
  categories: string

  @ManyToOne(() => FiltersEntity, x => x.id, { onDelete: 'SET NULL' })
  filters: string

  @OneToMany(() => FilesEntity, x => x.products, { onDelete: 'CASCADE', eager: true })
  photos: FilesEntity[]
}
