import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'
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

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() b: FiltersCreatedDto) {
    return this.service.create(b)
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param() p, @Body() b: FiltersUpdatedDto) {
    return this.service.update(p.id, b)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param() p) {
    return this.service.delete(p.id)
  }
}
