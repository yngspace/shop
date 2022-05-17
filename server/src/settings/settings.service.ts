import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SettingsEntity } from 'src/entities/settings.entity'
import { throwHttpException } from 'src/pipes/validation.pipe'
import { Repository } from 'typeorm'
import { SettingsCreatedDto, SettingsUpdatedDto } from './settings.dto'

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly repository: Repository<SettingsEntity>
  ) {}

  get() {
    return this.repository.findOne()
  }

  async create(body: SettingsCreatedDto) {
    const result = await this.repository.find()
    if (result.length) {
      result.forEach(item => this.repository.delete(item))
    }

    return this.repository.save(body)
  }

  async update(body: SettingsUpdatedDto) {
    const result = await this.repository.findOne()
    if (result) return await this.repository.save(body).then(() => this.repository.delete(result))
    else return this.repository.save(body)
  }
}
