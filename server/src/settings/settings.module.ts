import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SettingsEntity } from 'src/entities/settings.entity'
import { SettingsController } from './settings.controller'
import { SettingsService } from './settings.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingsEntity])
  ],
  providers: [SettingsService],
  controllers: [SettingsController]
})
export class SettingsModule {}
