import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { SettingsCreatedDto, SettingsUpdatedDto } from './settings.dto'
import { SettingsService } from './settings.service'

@Controller('/api/settings')
export class SettingsController {
  constructor(
    private readonly service: SettingsService
  ) {}

  @Get()
  get() {
    return this.service.get()
  }

  @Post()
  create(@Body() b: SettingsCreatedDto) {
    return this.service.create(b)
  }
  
  @Patch(':id')
  update(@Param() p, @Body() b: SettingsUpdatedDto) {
    return this.service.update(p.id, b)
  }
}
