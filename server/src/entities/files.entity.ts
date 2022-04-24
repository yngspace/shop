import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ProductsEntity } from './products.entity'

@Entity('files')
export class FilesEntity {
  @PrimaryColumn({
    unique: true
  })
  name: string

  @ManyToOne(() => ProductsEntity, x => x.id, { onDelete: 'CASCADE' })
  products: string
}
