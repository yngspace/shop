import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
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

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() b: SettingsCreatedDto) {
    return this.service.create(b)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param() p, @Body() b: SettingsUpdatedDto) {
    return this.service.update(p.id, b)
  }
}
