import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('settings')
export class SettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  phone: string

  @Column()
  email: string

  @Column()
  address: string

  @Column()
  workTime: string
}
