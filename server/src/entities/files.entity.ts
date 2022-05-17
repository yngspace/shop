import { Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { ProductsEntity } from './products.entity'

@Entity('files')
export class FilesEntity {
  @PrimaryColumn({
    unique: true
  })
  name: string

  @ManyToOne(() => ProductsEntity, x => x.photos, { onDelete: 'SET NULL' })
  products: ''
}
