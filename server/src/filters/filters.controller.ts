import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { FiltersCreatedDto, FiltersUpdatedDto } from './filters.dto'
import { FiltersService } from './filters.service'

@Controller('/api/filters')
export class FiltersController {
  constructor(
    private readonly service: FiltersService
  ) {}

  @Get()
  getAll(@Query() q) {
    return this.service.getAll(q)
  }

  @Get(':id')
  getOne(@Param() p) {
    return this.service.getOne(p.id)
  }

  @Post()
  create(@Body() b: FiltersCreatedDto) {
    return this.service.create(b)
  }

  @Patch(':id')
  update(@Param() p, @Body() b: FiltersUpdatedDto) {
    return this.service.update(p.id, b)
  }

  @Delete(':id')
  delete(@Param() p) {
    return this.service.delete(p.id)
  }
}
